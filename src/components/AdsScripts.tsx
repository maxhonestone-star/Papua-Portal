"use client";

import Script from "next/script";

// PERHATIKAN: Kata 'export' di bawah ini adalah kunci agar error kamu hilang!
export function AdsScripts() {
  return (
    <>
      {/* Popunder Adsterra - Mesin Uang 1 */}
      <Script
        id="adsterra-popunder"
        strategy="afterInteractive"
        src="//www.effectivegatecpm.com/71/85/3c/71853c0721759550275816912304859a.js"
      />

      {/* Social Bar / Floating Ad - Mesin Uang 2 */}
      <Script
        id="adsterra-social-bar"
        strategy="lazyOnload"
        src="//pl25836814.highrevenuegate.com/3c/71/85/3c71853c0721759550275816912304859a.js"
      />
    </>
  );
}
