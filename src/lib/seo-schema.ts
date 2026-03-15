/**
 * STRUCTURED DATA & SEO OPTIMIZATION
 * JSON-LD schema.org markup for better search engine visibility
 * Improves: Google Rich Snippets, Knowledge Graph, Local Search rankings
 */

/**
 * ===== JOB LISTING SCHEMA (JobPosting) =====
 * For Google Jobs, LinkedIn integration, Indeed syndication  
 */
export function generateJobPostingSchema(job: any) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.judul,
    "description": job.deskripsi,
    "datePosted": job.postedDate,
    "validThrough": job.deadline,
    "employmentType": mapJobType(job.tipe),
    "baseSalary": {
      "@type": "PriceSpecification",
      "currency": "IDR",
      "priceCurrency": "IDR",
      "price": extractSalary(job.gaji),
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.lokasi,
        "addressRegion": job.provinsi,
        "addressCountry": "ID",
      },
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.perusahaan,
      "sameAs": `https://papuaportal.id/lowongan-kerja?search=${encodeURIComponent(
        job.perusahaan
      )}`,
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": "ID",
    },
  };
}

function mapJobType(
  type: string
): "FULL_TIME" | "PART_TIME" | "CONTRACT_TEMP" | "TEMPORARY" | "INTERNSHIP" {
  const mapping: Record<string, any> = {
    "Full Time": "FULL_TIME",
    "Part Time": "PART_TIME",
    Kontrak: "CONTRACT_TEMP",
    Freelance: "TEMPORARY",
    Internship: "INTERNSHIP",
    CPNS: "FULL_TIME",
    BUMN: "FULL_TIME",
  };
  return mapping[type] || "FULL_TIME";
}

function extractSalary(gajiStr: string | undefined): string {
  if (!gajiStr) return "0";
  const match = gajiStr.match(/(\d+)/);
  return match ? match[1] : "0";
}

/**
 * ===== ORGANIZATION SCHEMA (Papua Portal) =====
 * Corporate schema for homepage/about pages
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Papua Portal",
    "url": "https://papuaportal.id",
    "image":
      "https://papuaportal.id/logo.png",
    "description":
      "Platform informasi Papua: Lowongan Kerja, Bansos, Harga Sembako, Konseling AI, Deep Links Global",
    "sameAs": [
      "https://github.com/pnuaha/papua-portal",
      "https://www.facebook.com/papuaportal",
      "https://www.instagram.com/papuaportal",
    ],
    "contact": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@papuaportal.id",
      "telephone": "+62-XXX-XXX-XXXX",
    },
    "areaServed": [
      "Papua",
      "Papua Barat",
      "Papua Pegunungan",
      "Papua Selatan",
      "Papua Tengah",
      "Papua Barat Daya",
    ],
    "founder": {
      "@type": "Person",
      "name": "Papua Community",
    },
  };
}

/**
 * ===== LOCAL BUSINESS SCHEMA (untuk regional pages) =====
 */
export function generateLocalBusinessSchema(kabupaten: string, provinsi: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Papua Portal - ${kabupaten}`,
    "description": `Informasi lokal Papua Portal di ${kabupaten}, ${provinsi}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": kabupaten,
      "addressRegion": provinsi,
      "addressCountry": "ID",
    },
    "areaServed": provinsi,
    "url": `https://papuaportal.id/region/${encodeURIComponent(kabupaten)}`,
  };
}

/**
 * ===== BREADCRUMB SCHEMA (navigation trail) =====
 */
export function generateBreadcrumbSchema(path: string[]) {
  const itemListElement = path.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item,
    "item": `https://papuaportal.id/${path
      .slice(0, index + 1)
      .join("/")}`,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement,
  };
}

/**
 * ===== FAQ SCHEMA (for featured snippets) =====
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * ===== ARTICLE SCHEMA (blog/news posts) =====
 */
export function generateArticleSchema(article: {
  title: string;
  content: string;
  author: string;
  datePublished: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": article.image,
    "datePublished": article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "articleBody": article.content,
  };
}

/**
 * ===== HTML HELPER: Insert JSON-LD in <head> =====
 */
export function createJsonLdTag(schema: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(
    schema,
    null,
    2
  )}</script>`;
}

/**
 * ===== META TAGS HELPER: OpenGraph + Twitter Cards =====
 */
export function generateMetaTags(page: {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}) {
  return {
    // OpenGraph (Facebook, LinkedIn)
    "og:title": page.title,
    "og:description": page.description,
    "og:image": page.image,
    "og:url": page.url,
    "og:type": page.type,
    
    // Twitter Card
    "twitter:card": "summary_large_image",
    "twitter:title": page.title,
    "twitter:description": page.description,
    "twitter:image": page.image,
    
    // Standard
    description: page.description,
    keywords:
      "Papua, Lowongan Kerja, Bansos, Harga Sembako, Konseling AI, Indonesia",
  };
}

/**
 * ===== SITEMAP GENERATION =====
 */
export function generateSitemap(pages: Array<{ url: string; lastmod?: string; priority?: number }>) {
  const urlEntries = pages
    .map(
      (page) =>
        `  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ""}
    ${page.priority ? `<priority>${page.priority}</priority>` : ""}
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * ===== ROBOTS.TXT GENERATION =====
 */
export function generateRobotsTxt() {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://papuaportal.id/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /`;
}

/**
 * ===== ALTERNATIVE: Insert in Next.js Head =====
 * Usage in pages/_document.tsx or pages/[page].tsx
 */
export function getHeadTags(schema: unknown, metaTags: Record<string, string>) {
  return {
    jsonLd: schema,
    metaTags: Object.entries(metaTags).map(([key, value]) => ({
      property: key,
      content: value,
    })),
  };
}

export default {
  generateJobPostingSchema,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  createJsonLdTag,
  generateMetaTags,
  generateSitemap,
  generateRobotsTxt,
  getHeadTags,
};
