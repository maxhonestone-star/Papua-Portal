import { NextRequest, NextResponse } from 'next/server';
import { lokerData, lokerCategories, Loker } from '@/data/loker';
import { scrapeJobListings } from '@/lib/job-scraper';
import { JobRecommendationEngine, parseUserProfile } from '@/lib/job-recommendation';

// Cache for loker data
let cachedLokerData: Loker[] = [];
let lastLokerFetch = 0;
const LOKER_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

// Enterprise-level job scraper with AI enhancement
async function fetchFromJobPortals() {
  try {
    // Use AI-powered scraper to get enterprise jobs
    const scraperResult = await scrapeJobListings({
      maxResults: 15,
      aiEnhance: !!process.env.GEMINI_API_KEY_1,
      preferredCategories: [],
    });

    // Combine with static data for complete listing
    const combinedJobs = [...lokerData, ...scraperResult.jobs];
    
    // Deduplicate by company + title
    const seen = new Set<string>();
    const uniqueJobs = combinedJobs.filter((job) => {
      const key = `${job.perusahaan}-${job.judul}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    console.log(`[Job Scraper] Fetched ${scraperResult.jobs.length} new jobs from ${scraperResult.sources.length} sources`);
    if (Object.keys(scraperResult.trends).length > 0) {
      console.log('[Job Trends]', scraperResult.trends);
    }

    return uniqueJobs;
  } catch (error) {
    console.error('Job scraper error, falling back to static data:', error);
    return lokerData;
  }
}

// Get fresh loker data with caching
async function getFreshLokerData() {
  const now = Date.now();
  
  if (cachedLokerData.length > 0 && (now - lastLokerFetch) < LOKER_CACHE_DURATION) {
    return cachedLokerData;
  }
  
  const freshData = await fetchFromJobPortals();
  if (freshData) {
    cachedLokerData = freshData;
    lastLokerFetch = now;
    return freshData;
  }
  
  return lokerData;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get('kategori');
    const provinsi = searchParams.get('provinsi');
    const search = searchParams.get('search');
    const forceRefresh = searchParams.get('refresh') === 'true';

    // Force refresh cache if requested
    if (forceRefresh) {
      cachedLokerData = [];
      lastLokerFetch = 0;
    }

    let data = await getFreshLokerData();

    // Filter by kategori if specified
    if (kategori && kategori !== 'Semua') {
      data = data.filter((item: Loker) => item.kategori === kategori);
    }

    // Filter by provinsi if specified
    if (provinsi) {
      data = data.filter((item: Loker) => 
        item.provinsi.toLowerCase().includes(provinsi.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(provinsi.toLowerCase())
      );
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      data = data.filter((item: Loker) =>
        item.judul.toLowerCase().includes(searchLower) ||
        item.perusahaan.toLowerCase().includes(searchLower) ||
        item.deskripsi.toLowerCase().includes(searchLower) ||
        item.kategori.toLowerCase().includes(searchLower)
      );
    }

    // Sort by posted date (newest first) and urgent status
    data.sort((a: Loker, b: Loker) => {
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });

    return NextResponse.json({
      success: true,
      data: data,
      categories: lokerCategories,
      timestamp: new Date().toISOString(),
      lastFetch: new Date(lastLokerFetch).toISOString(),
      cacheDuration: LOKER_CACHE_DURATION,
      totalJobs: data.length,
      message: "Lowongan kerja Papua 2026 - Enterprise AI-Powered Scraper",
      source: "Multiple job portals + AI enhancement"
    });

  } catch (error) {
    console.error('Error fetching loker data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch loker data'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { judul, perusahaan, lokasi, provinsi, kategori, tipe, gaji, deskripsi, persyaratan, kontak, deadline } = body;

    // In production, this would save to database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: "Lowongan kerja berhasil ditambahkan",
      data: {
        id: Date.now(), // Temporary ID
        judul,
        perusahaan,
        lokasi,
        provinsi,
        kategori,
        tipe,
        gaji,
        deskripsi,
        persyaratan,
        kontak,
        deadline,
        postedDate: new Date().toISOString().split('T')[0]
      }
    });

  } catch (error) {
    console.error('Error adding loker:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add loker'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/loker/recommend
 * Job recommendations based on user profile
 * Smart matching menggunakan AI recommendation engine
 */
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Recommendation engine endpoint
    if (action === 'recommend') {
      const body = await request.json();
      const userProfile = parseUserProfile(body);

      if (!userProfile) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid user profile data'
          },
          { status: 400 }
        );
      }

      // Get all available jobs
      const allJobs = await getFreshLokerData();

      // Generate recommendations
      const recommendations = JobRecommendationEngine.recommendJobs(
        allJobs,
        userProfile,
        10
      );

      return NextResponse.json({
        success: true,
        data: {
          userProfile,
          recommendations: recommendations.map((rec) => ({
            job: rec.job,
            matchScore: rec.matchScore,
            matchReasons: rec.matchReasons,
            skillGaps: rec.skillGaps,
            salaryGap: rec.salaryGap,
          })),
          matchStats: {
            totalJobsAnalyzed: allJobs.length,
            topMatch: recommendations[0]?.matchScore ?? 0,
            averageMatch:
              recommendations.length > 0
                ? Math.round(
                    recommendations.reduce((sum, r) => sum + r.matchScore, 0) /
                      recommendations.length
                  )
                : 0,
          },
        },
        message: 'Job recommendations berhasil digenerate',
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid action'
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate recommendations'
      },
      { status: 500 }
    );
  }
}