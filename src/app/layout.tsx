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
  description: "Portal Super App Papua: Link Deep, Harga Sembako, Lowongan Kerja, Cek Bansos, dan Konseling AI untuk seluruh masyarakat Papua.",
  keywords: "papua, portal, link, sembako, loker, bansos, konseling, jayapura, sorong, papua barat",
  openGraph: {
    title: "Papua Portal - Super App Papua",
    description: "5-in-1 Super App untuk masyarakat Papua",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LINK PENGHASIL CUAN (SMART LINK)
  const smartLink = "https://www.effectivegatecpm.com/tvqnevd65z?key=ab0f8aae20f425b8cb36f7e7a88fe5b7";

  return (
    <html lang="id">
      <head>
        {/* 1. ADSTERRA POPUNDER (OTOMATIS JALAN) */}
        <Script 
          id="adsterra-popunder"
          src="https://pl28920194.effectivegatecpm.com/23/77/09/23770909aaf7a0011f76b3f64b09553f.js" 
          strategy="afterInteractive" 
        />
        
        {/* 2. ADSTERRA SOCIAL BAR (MELAYANG) */}
        <Script 
          id="adsterra-social-bar"
          src="https://pl28920196.effectivegatecpm.com/e4/fd/33/e4fd335d2067dc079c885568b282ca0c.js" 
          strategy="lazyOnload" 
        />
      </head>
      
      <body className={`${inter.variable} antialiased font-inter bg-black text-white`}>
        <LanguageProvider>
          {/* TOMBOL SMART LINK MELAYANG (BOUNCE ANIMATION) */}
          <div className="fixed bottom-24 right-5 z-50">
             <a href={smartLink} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-black px-5 py-3 rounded-full font-extrabold shadow-[0_0_20px_rgba(234,179,8,0.5)] animate-bounce text-sm flex items-center gap-2 border-2 border-white">
                🔥 INFO PENTING PAPUA
             </a>
          </div>

          {/* IKLAN BANNER ATAS (NATIVE) */}
          <div className="flex justify-center pt-4 bg-black">
            <div id="container-2ccd4bd103e10a34cd07774571d5fb20"></div>
          </div>

          {/* ISI KONTEN UTAMA */}
          <main className="min-h-screen">
            {children}
          </main>
          
          <AIChat />

          {/* IKLAN BANNER BAWAH (NATIVE) */}
          <div className="flex justify-center pb-10 bg-black border-t border-gray-800 pt-6">
            <div id="container-2ccd4bd103e10a34cd07774571d5fb20-dual">
               {/* Container ini akan diisi script di bawah */}
               <div id="container-2ccd4bd103e10a34cd07774571d5fb20"></div>
            </div>
          </div>

        </LanguageProvider>
        
        {/* 3. ADSTERRA NATIVE SCRIPT (UNTUK BANNER) */}
        <Script 
          id="adsterra-native"
          src="https://pl28920201.effectivegatecpm.com/2ccd4bd103e10a34cd07774571d5fb20/invoke.js"
          strategy="lazyOnload"
          data-cfasync="false"
        />
      </body>
    </html>
  );
}
