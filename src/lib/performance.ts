/**
 * PERFORMANCE OPTIMIZATION & CACHING
 * - Server-side caching for analytics/exports
 * - Client-side caching strategies
 * - Image optimization
 * - Code splitting hints
 * - Performance metrics collection
 */

/**
 * ===== SERVER-SIDE CACHE MANAGEMENT =====
 */
export class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private ttl: number; // Time to live in milliseconds

  constructor(ttlMinutes: number = 60) {
    this.ttl = ttlMinutes * 60 * 1000;
  }

  set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): any | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if expired
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }

  invalidatePattern(pattern: RegExp): void {
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    this.cache.clear();
  }

  // For debugging
  getStats(): { keys: number; memoryEstimate: string } {
    return {
      keys: this.cache.size,
      memoryEstimate: `${Math.round(
        (JSON.stringify([...this.cache]).length / 1024 / 1024) * 100
      ) / 100}MB`,
    };
  }
}

// Global cache instance
export const globalCache = new CacheManager(60); // 60 minute TTL

/**
 * ===== CACHED QUERY FUNCTIONS =====
 */

import { searchLoker, searchBansos, compareSembakoPrices } from "./search-filter";
import { analyzeLokerData, analyzeBansosData, analyzeSembakoPrices } from "./data-export";

export function getCachedLokerSearch(options: any) {
  const cacheKey = `loker:search:${JSON.stringify(options)}`;

  let result = globalCache.get(cacheKey);
  if (!result) {
    result = searchLoker(options);
    globalCache.set(cacheKey, result);
  }

  return result;
}

export function getCachedBansosSearch(options: any) {
  const cacheKey = `bansos:search:${JSON.stringify(options)}`;

  let result = globalCache.get(cacheKey);
  if (!result) {
    result = searchBansos(options);
    globalCache.set(cacheKey, result);
  }

  return result;
}

export function getCachedLokerAnalytics() {
  const cacheKey = "loker:analytics";

  let result = globalCache.get(cacheKey);
  if (!result) {
    result = analyzeLokerData();
    globalCache.set(cacheKey, result);
  }

  return result;
}

export function getCachedBansosAnalytics() {
  const cacheKey = "bansos:analytics";

  let result = globalCache.get(cacheKey);
  if (!result) {
    result = analyzeBansosData();
    globalCache.set(cacheKey, result);
  }

  return result;
}

export function getCachedSembakoAnalytics() {
  const cacheKey = "sembako:analytics";

  let result = globalCache.get(cacheKey);
  if (!result) {
    result = analyzeSembakoPrices();
    globalCache.set(cacheKey, result);
  }

  return result;
}

// Invalidate caches when data changes
export function invalidateAllCaches(): void {
  globalCache.invalidatePattern(/^(loker|bansos|sembako):.*$/);
}

export function invalidateLokerCaches(): void {
  globalCache.invalidatePattern(/^loker:/);
}

export function invalidateBansosCaches(): void {
  globalCache.invalidatePattern(/^bansos:/);
}

export function invalidateSembakoCaches(): void {
  globalCache.invalidatePattern(/^sembako:/);
}

/**
 * ===== CLIENT-SIDE CACHING (localStorage) =====
 */

export class ClientCache {
  private prefix: string = "papuaportal_";

  set(key: string, data: any, minutesTTL: number = 60): void {
    const entry = {
      data,
      timestamp: Date.now(),
      ttl: minutesTTL * 60 * 1000,
    };
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch (e) {
      console.warn("LocalStorage quota exceeded or unavailable");
    }
  }

  get(key: string): any | null {
    try {
      const entry = localStorage.getItem(this.prefix + key);
      if (!entry) return null;

      const parsed = JSON.parse(entry);
      const isExpired = Date.now() - parsed.timestamp > parsed.ttl;

      if (isExpired) {
        this.remove(key);
        return null;
      }

      return parsed.data;
    } catch (e) {
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(this.prefix)
    );
    keys.forEach((key) => localStorage.removeItem(key));
  }
}

export const clientCache = new ClientCache();

/**
 * ===== IMAGE OPTIMIZATION HINTS =====
 */

export interface ImageOptimizationConfig {
  width?: number;
  height?: number;
  quality?: number; // 1-100
  format?: "webp" | "avif" | "jpg" | "png";
  sizes?: string; // Responsive sizes
}

export function generateImageUrl(
  src: string,
  config: ImageOptimizationConfig = {}
): string {
  // Example: Using Cloudinary or similar image service
  const { width, height, quality = 80, format = "webp" } = config;

  const params = new URLSearchParams();
  if (width) params.append("w", width.toString());
  if (height) params.append("h", height.toString());
  if (quality) params.append("q", quality.toString());
  params.append("f", format);

  // For local Next.js Image optimization, just return src
  // For external CDN, build URL with parameters
  return `${src}${params.toString() ? "?" + params.toString() : ""}`;
}

export const imageOptimizationHints = {
  thumbnail: {
    width: 200,
    height: 200,
    quality: 70,
    format: "webp" as const,
  },
  preview: {
    width: 500,
    height: 500,
    quality: 75,
    format: "webp" as const,
  },
  full: {
    width: 1200,
    height: 800,
    quality: 85,
    format: "webp" as const,
  },
  og: {
    width: 1200,
    height: 630,
    quality: 85,
    format: "jpg" as const,
  },
};

/**
 * ===== PERFORMANCE METRICS COLLECTION =====
 */

export interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  interactiveTime: number;
}

export function collectPerformanceMetrics(): Partial<PerformanceMetrics> {
  if (typeof window === "undefined") return {};

  const navigation = performance.getEntriesByType("navigation")[0] as any;
  const paintEntries = performance.getEntriesByType("paint");

  const fcp = paintEntries.find((entry) => entry.name === "first-contentful-paint");
  const lcp = performance.getEntriesByType("largest-contentful-paint")[0] as any;

  return {
    pageLoadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0,
    firstContentfulPaint: fcp?.startTime || 0,
    largestContentfulPaint: lcp?.startTime || 0,
    // CLS requires PerformanceObserver, see below
  };
}

/**
 * ===== CORE WEB VITALS TRACKING =====
 * Collect: LCP, FID/INP, CLS
 */
export class WebVitalsTracker {
  private metrics: Partial<PerformanceMetrics> = {};

  constructor() {
    if (typeof window === "undefined") return;

    this.trackCLS();
    this.trackLCP();
  }

  private trackLCP(): void {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });

      observer.observe({ entryTypes: ["largest-contentful-paint"] });
    } catch (e) {
      console.warn("LCP tracking failed");
    }
  }

  private trackCLS(): void {
    if (!window.PerformanceObserver) return;

    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cumulativeLayoutShift = clsValue;
          }
        }
      });

      observer.observe({ entryTypes: ["layout-shift"] });
    } catch (e) {
      console.warn("CLS tracking failed");
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return this.metrics;
  }
}

/**
 * ===== CODE SPLITTING HINTS =====
 * Suggest which components should be lazy-loaded
 */
export const codeSplittingHints = {
  pages: {
    "loker": { priority: "high", component: "LokerPage" },
    "bansos": { priority: "high", component: "BansosPage" },
    "harga-sembako": { priority: "high", component: "SembakoPage" },
    "konseling": { priority: "medium", component: "KonselingPage" },
    "cek-bansos": { priority: "low", component: "CekBansosPage" },
  },
  components: {
    "AdvancedSearch": { lazy: true, preload: false },
    "DataExportModal": { lazy: true, preload: false },
    "AnalyticsDashboard": { lazy: true, preload: false },
    "PriceComparison": { lazy: true, preload: true }, // Preload on sembako page
    "JobFilterWidget": { lazy: true, preload: true }, // Preload on loker page
  },
};

/**
 * ===== BUNDLE SIZE ANALYSIS HINTS =====
 */
export const bundleSizeTargets = {
  main: "200KB", // Main bundle
  lib: "150KB", // Lib utilities
  components: "100KB", // Component bundle
  data: "50KB", // Data files
};

export default {
  CacheManager,
  globalCache,
  getCachedLokerSearch,
  getCachedBansosSearch,
  getCachedLokerAnalytics,
  getCachedBansosAnalytics,
  getCachedSembakoAnalytics,
  invalidateAllCaches,
  ClientCache,
  clientCache,
  collectPerformanceMetrics,
  WebVitalsTracker,
};
