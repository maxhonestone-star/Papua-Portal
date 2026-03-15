/**
 * EXTERNAL API INTEGRATIONS & WEBHOOKS
 * - Government agency API integrations
 * - NGO data sharing webhooks
 * - Research institution data exports
 * - Analytics event tracking
 * - Webhook delivery system
 */

/**
 * ===== WEBHOOK EVENT TYPES =====
 */
export enum WebhookEventType {
  // Loker events
  LOKER_CREATED = "loker.created",
  LOKER_UPDATED = "loker.updated",
  LOKER_EXPIRED = "loker.expired",
  LOKER_MARKED_URGENT = "loker.marked_urgent",

  // Bansos events
  BANSOS_ADDED = "bansos.added",
  BANSOS_UPDATED = "bansos.updated",
  BANSOS_DEADLINE_APPROACHING = "bansos.deadline_approaching",

  // Sembako events
  SEMBAKO_PRICE_UPDATED = "sembako.price_updated",
  SEMBAKO_PRICE_ALERT = "sembako.price_alert", // When price increases significantly

  // Analytics events
  ANALYTICS_GENERATED = "analytics.generated",
  EXPORT_REQUESTED = "export.requested",
  REPORT_GENERATED = "report.generated",
}

/**
 * ===== WEBHOOK PAYLOAD STRUCTURE =====
 */
export interface WebhookPayload {
  event: WebhookEventType;
  timestamp: string;
  version: string;
  data: any;
  source: "loker" | "bansos" | "sembako" | "analytics";
}

/**
 * ===== WEBHOOK MANAGER =====
 */

interface WebhookSubscription {
  id: string;
  url: string;
  events: WebhookEventType[];
  active: boolean;
  secret?: string; // For HMAC signature
  retryPolicy?: { maxRetries: number; backoffMultiplier: number };
}

export class WebhookManager {
  private subscriptions: Map<string, WebhookSubscription> = new Map();

  subscribe(
    id: string,
    url: string,
    events: WebhookEventType[],
    secret?: string
  ): WebhookSubscription {
    const subscription: WebhookSubscription = {
      id,
      url,
      events,
      active: true,
      secret,
      retryPolicy: { maxRetries: 3, backoffMultiplier: 2 },
    };

    this.subscriptions.set(id, subscription);
    return subscription;
  }

  unsubscribe(id: string): boolean {
    return this.subscriptions.delete(id);
  }

  async dispatch(payload: WebhookPayload): Promise<void> {
    const subscribers = [...this.subscriptions.values()].filter(
      (sub) =>
        sub.active && sub.events.includes(payload.event)
    );

    for (const subscriber of subscribers) {
      await this.deliverWebhook(subscriber, payload);
    }
  }

  private async deliverWebhook(
    subscription: WebhookSubscription,
    payload: WebhookPayload,
    attempt: number = 1
  ): Promise<void> {
    try {
      const signature = subscription.secret
        ? createHmacSignature(JSON.stringify(payload), subscription.secret)
        : undefined;

      const response = await fetch(subscription.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(signature && { "X-Papua-Signature": signature }),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok && attempt < (subscription.retryPolicy?.maxRetries || 1)) {
        // Retry with exponential backoff
        const delay =
          Math.pow(subscription.retryPolicy?.backoffMultiplier || 2, attempt - 1) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        await this.deliverWebhook(subscription, payload, attempt + 1);
      }
    } catch (error) {
      console.error(
        `Webhook delivery failed for ${subscription.id}:`,
        error
      );
    }
  }
}

export const webhookManager = new WebhookManager();

/**
 * ===== API CLIENT FOR GOVERNMENT INTEGRATION =====
 * Example: Ministry of Labor, Social Affairs, etc.
 */

export interface GovernmentAPIConfig {
  apiKey: string;
  endpoint: string;
  ministry: "labor" | "social" | "commerce" | "agriculture";
}

export class GovernmentAPIClient {
  private config: GovernmentAPIConfig;

  constructor(config: GovernmentAPIConfig) {
    this.config = config;
  }

  /**
   * Submit job listings to national employment database
   */
  async submitJobListings(jobs: any[]): Promise<any> {
    return this.post("/jobs/bulk", {
      source: "papua_portal",
      jobs: jobs.map((job) => ({
        id: job.id,
        title: job.judul,
        company: job.perusahaan,
        location: job.lokasi,
        province: job.provinsi,
        type: job.tipe,
        salaryRange: job.gaji,
        submittedAt: new Date().toISOString(),
      })),
    });
  }

  /**
   * Sync social assistance programs
   */
  async syncBansosPrograms(programs: any[]): Promise<any> {
    return this.post("/assistance/sync", {
      source: "papua_portal",
      programs: programs.map((p) => ({
        id: p.id,
        name: p.nama,
        category: p.kategori,
        amount: p.besaran,
        requirements: p.syarat,
      })),
    });
  }

  /**
   * Report commodity prices for official statistics
   */
  async reportCommodityPrices(prices: any[]): Promise<any> {
    return this.post("/prices/report", {
      source: "papua_portal",
      reportDate: new Date().toISOString(),
      region: "Papua",
      prices,
    });
  }

  private async post(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${this.config.endpoint}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Government API error: ${response.statusText}`);
    }

    return response.json();
  }
}

/**
 * ===== NGO DATA SHARING PROTOCOL =====
 */

export interface NGODataPackage {
  id: string;
  organization: string;
  sourceData: "loker" | "bansos" | "sembako" | "all";
  frequency: "daily" | "weekly" | "monthly";
  format: "csv" | "json" | "excel";
  encryptionRequired?: boolean;
}

export class NGODataManager {
  async createDataPackage(config: NGODataPackage): Promise<string> {
    // Generate secure download URL with limited TTL
    const packageId = generateSecureId();
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    return `/api/ngo-data/${packageId}?expires=${expiryTime.getTime()}`;
  }

  async scheduleRecurringExport(config: NGODataPackage): Promise<void> {
    // Schedule periodic exports (daily, weekly, monthly)
    console.log(
      `Scheduled recurring export for ${config.organization}:`,
      config.frequency
    );
    // Implementation would use a job queue (Bull, Sidekiq, etc.)
  }

  async validateNGOAccess(orgId: string, apiKey: string): Promise<boolean> {
    // Verify NGO credentials
    return true; // Mock implementation
  }
}

export const ngoDataManager = new NGODataManager();

/**
 * ===== RESEARCH INSTITUTION API =====
 * For academic use, anonymous data exports
 */

export interface ResearchDatasetConfig {
  title: string;
  researchers: string[];
  institution: string;
  purpose: string;
  includedFields: string[];
  anonymized: boolean;
}

export class ResearchDatasetManager {
  async createResearchDataset(
    config: ResearchDatasetConfig
  ): Promise<{ datasetId: string; downloadUrl: string }> {
    const datasetId = generateSecureId();

    // Log research use
    logResearchAccess({
      datasetId,
      institution: config.institution,
      purpose: config.purpose,
      timestamp: new Date().toISOString(),
    });

    return {
      datasetId,
      downloadUrl: `/api/research-data/${datasetId}`,
    };
  }

  async generateCodebook(datasetId: string): Promise<string> {
    // Generate comprehensive data dictionary
    return `# Papua Portal Research Dataset - Codebook\n\n## Variables\n...`;
  }

  async createDataUseAgreement(datasetId: string): Promise<string> {
    // Generate DUA document
    return `DATA USE AGREEMENT - Dataset ${datasetId}\n\n...`;
  }
}

export const researchDatasetManager = new ResearchDatasetManager();

/**
 * ===== ANALYTICS EVENT TRACKING =====
 */

export enum AnalyticsEventType {
  SEARCH = "search",
  FILTER = "filter",
  EXPORT = "export",
  VIEW = "view",
  SHARE = "share",
  DOWNLOAD = "download",
}

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  source: "loker" | "bansos" | "sembako" | "konseling";
  userId?: string; // Anonymous by default
  metadata?: Record<string, any>;
  timestamp: string;
}

export class AnalyticsTracker {
  private events: AnalyticsEvent[] = [];
  private readonly batchSize = 50;
  private flushInterval: NodeJS.Timeout | null = null;

  constructor(flushIntervalMs: number = 60000) {
    // Flush every 60 seconds
    if (typeof window !== "undefined") {
      this.flushInterval = setInterval(() => this.flush(), flushIntervalMs);
    }
  }

  track(event: Omit<AnalyticsEvent, "timestamp">): void {
    this.events.push({
      ...event,
      timestamp: new Date().toISOString(),
    });

    if (this.events.length >= this.batchSize) {
      this.flush();
    }
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: eventsToSend }),
      });
    } catch (error) {
      console.error("Analytics flush failed:", error);
      // Re-add events to queue for retry
      this.events.unshift(...eventsToSend);
    }
  }

  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }
}

export const analyticsTracker = new AnalyticsTracker();

/**
 * ===== RATE LIMITING =====
 */

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // milliseconds
  keyGenerator?: (req: any) => string;
}

export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];

    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.config.windowMs
    );

    if (validTimestamps.length >= this.config.maxRequests) {
      return false;
    }

    validTimestamps.push(now);
    this.requests.set(identifier, validTimestamps);
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const timestamps = this.requests.get(identifier) || [];
    return Math.max(0, this.config.maxRequests - timestamps.length);
  }
}

/**
 * ===== HELPER FUNCTIONS =====
 */

function createHmacSignature(body: string, secret: string): string {
  const crypto = require("crypto");
  return (
    "sha256=" +
    crypto.createHmac("sha256", secret).update(body).digest("hex")
  );
}

function generateSecureId(): string {
  const crypto = require("crypto");
  return crypto.randomBytes(16).toString("hex");
}

function logResearchAccess(log: any): void {
  // Log to database or file for audit trail
  console.log("Research access logged:", log);
}

export default {
  WebhookEventType,
  WebhookManager,
  webhookManager,
  GovernmentAPIClient,
  NGODataManager,
  ngoDataManager,
  ResearchDatasetManager,
  researchDatasetManager,
  AnalyticsTracker,
  analyticsTracker,
  RateLimiter,
};
