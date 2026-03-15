import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AIChat } from "@/components/AIChat";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Papua Portal - Super App Papua",
  description: "Portal Super App Papua: Link Deep, Harga Sembako, Lowongan Kerja, Cek Bansos, dan Konseling AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const smartLink = "https://www.effectivegatecpm.com/tvqnevd65z?key=ab0f8aae20f425b8cb36f7e7a88fe5b7";

  return (
    <html lang="id">
      <head>
        {/* Iklan Langsung Di Sini (Tanpa Import AdsScripts yang bikin eror) */}
        <Script 
          id="adsterra-popunder"
          src="https://pl28920194.effectivegatecpm.com/23/77/09/23770909aaf7a0011f76b3f64b09553f.js" 
          strategy="afterInteractive" 
        />
        <Script 
          id="adsterra-social-bar"
          src="https://pl28920196.effectivegatecpm.com/e4/fd/33/e4fd335d2067dc079c885568b282ca0c.js" 
          strategy="lazyOnload" 
        />
      </head>
      <body className={`${inter.variable} antialiased font-inter`}>
        <LanguageProvider>
          {children}
          <AIChat />
        </LanguageProvider>
        
        {/* Banner Iklan Bawah */}
        <div className="flex justify-center my-4">
          <div id="container-2ccd4bd103e10a34cd07774571d5fb20"></div>
        </div>
        <Script 
          id="adsterra-native"
          src="https://pl28920201.effectivegatecpm.com/2ccd4bd103e10a34cd07774571d5fb20/invoke.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
