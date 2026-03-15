"use client";

import Script from "next/script";

// Pastikan ada kata 'export' sebelum 'function'
export function AdsScripts() {
  return (
    <>
      {/* Popunder Adsterra */}
      <Script
        id="adsterra-popunder"
        strategy="afterInteractive"
        src="//www.effectivegatecpm.com/71/85/3c/71853c0721759550275816912304859a.js"
      />

      {/* Social Bar / Floating Ad */}
      <Script
        id="adsterra-social-bar"
        strategy="lazyOnload"
        src="//pl25836814.highrevenuegate.com/3c/71/85/3c71853c0721759550275816912304859a.js"
      />
    </>
  );
}
