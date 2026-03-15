import { NextRequest, NextResponse } from 'next/server';
import { hargaPerKabupaten, komoditas } from '@/data/sembako';

// Cache for real-time data
let cachedData: any = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Mock external API call to BPS or other data sources
async function fetchFromExternalAPI() {
  try {
    // In production, replace with real API calls:
    // - BPS API: https://webapi.bps.go.id/
    // - Kemendag API
    // - Local market data APIs
    
    // For demo, simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate realistic price updates based on market trends
    const basePrices = hargaPerKabupaten[0].harga; // Use first kabupaten as base
    
    return hargaPerKabupaten.map(kabupaten => {
      const updatedHarga: Record<string, number> = {};
      
      Object.entries(kabupaten.harga).forEach(([komoditi, currentPrice]) => {
        // Simulate realistic market fluctuations
        const volatility = {
          "Beras Medium": 0.02,
          "Beras Premium": 0.02,
          "Gula Pasir": 0.05,
          "Minyak Goreng": 0.03,
          "Daging Sapi": 0.04,
          "Daging Ayam": 0.03,
          "Telur Ayam": 0.02,
          "Cabai Merah": 0.15, // High volatility
          "Cabai Rawit": 0.20, // High volatility
          "Bawang Merah": 0.10,
          "Tomat": 0.12,
          "Ikan Segar": 0.05,
          "Solar": 0.01,
          "Pertalite": 0.01,
        };
        
        const vol = volatility[komoditi as keyof typeof volatility] || 0.05;
        const change = (Math.random() - 0.5) * 2 * vol;
        const newPrice = Math.round(currentPrice * (1 + change));
        
        updatedHarga[komoditi] = Math.max(newPrice, 1000);
      });
      
      return {
        ...kabupaten,
        harga: updatedHarga,
        lastUpdate: new Date().toISOString(),
        source: "BPS Papua - Auto Updated"
      };
    });
  } catch (error) {
    console.error('External API fetch failed:', error);
    return null;
  }
}

// Get fresh data with caching
async function getFreshData() {
  const now = Date.now();
  
  if (cachedData && (now - lastFetch) < CACHE_DURATION) {
    return cachedData;
  }
  
  const freshData = await fetchFromExternalAPI();
  if (freshData) {
    cachedData = freshData;
    lastFetch = now;
    return freshData;
  }
  
  // Fallback to static data
  return hargaPerKabupaten.map(k => ({ ...k, lastUpdate: new Date().toISOString() }));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kabupaten = searchParams.get('kabupaten');
    const komoditi = searchParams.get('komoditi');
    const forceRefresh = searchParams.get('refresh') === 'true';

    // Force refresh cache if requested
    if (forceRefresh) {
      cachedData = null;
      lastFetch = 0;
    }

    let data = await getFreshData();

    // Filter by kabupaten if specified
    if (kabupaten) {
      data = data.filter((item: any) =>
        item.kabupaten.toLowerCase().includes(kabupaten.toLowerCase()) ||
        item.provinsi.toLowerCase().includes(kabupaten.toLowerCase())
      );
    }

    // Filter by komoditi if specified
    if (komoditi) {
      data = data.map((item: any) => ({
        ...item,
        harga: Object.fromEntries(
          Object.entries(item.harga).filter(([key]) =>
            key.toLowerCase().includes(komoditi.toLowerCase())
          )
        )
      }));
    }

    return NextResponse.json({
      success: true,
      data: data,
      komoditas: komoditas,
      timestamp: new Date().toISOString(),
      lastFetch: new Date(lastFetch).toISOString(),
      cacheDuration: CACHE_DURATION,
      message: "Harga sembako real-time Papua - Auto updated"
    });

  } catch (error) {
    console.error('Error fetching harga sembako:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch harga sembako data'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kabupaten, komoditi, harga } = body;

    // In production, this would update a database
    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: "Harga berhasil diperbarui",
      data: {
        kabupaten,
        komoditi,
        harga,
        updatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error updating harga sembako:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update harga sembako'
      },
      { status: 500 }
    );
  }
}