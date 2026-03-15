"use client";

import Script from "next/script";

export function AdsScripts() {
  return (
    <>
      {/* Popunder */}
      <Script 
        id="adsterra-popunder"
        src="https://pl28920194.effectivegatecpm.com/23/77/09/23770909aaf7a0011f76b3f64b09553f.js" 
        strategy="afterInteractive" 
      />
      {/* Social Bar */}
      <Script 
        id="adsterra-social-bar"
        src="https://pl28920196.effectivegatecpm.com/e4/fd/33/e4fd335d2067dc079c885568b282ca0c.js" 
        strategy="lazyOnload" 
      />
    </>
  );
}
