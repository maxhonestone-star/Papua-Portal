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
  // Masukkan Smart Link kamu di sini agar mudah diganti jika perlu
  const smartLink = "https://www.effectivegatecpm.com/tvqnevd65z?key=ab0f8aae20f425b8cb36f7e7a88fe5b7";

  return (
    <html lang="id">
      <head>
        {/* 1. Adstera Popunder */}
        <Script 
          src="https://pl28920194.effectivegatecpm.com/23/77/09/23770909aaf7a0011f76b3f64b09553f.js" 
          strategy="afterInteractive" 
        />
        {/* 2. Adstera Social Bar */}
        <Script 
          src="https://pl28920196.effectivegatecpm.com/e4/fd/33/e4fd335d2067dc079c885568b282ca0c.js" 
          strategy="lazyOnload" 
        />
      </head>
      <body className={`${inter.variable} antialiased font-inter`}>
        <LanguageProvider>
          {/* Tombol Floating untuk Smart Link (Penghasil Cuan Tambahan) */}
          <div className="fixed bottom-24 right-5 z-50">
             <a href={smartLink} target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-bold shadow-lg animate-bounce text-sm">
                🔥 Info Penting Papua
             </a>
          </div>

          {children}
          
          {/* AI Assistant Chatbox */}
          <AIChat />
        </LanguageProvider>
        
        {/* 3. Adstera Native Async Container (Iklan Banner) */}
        <div className="flex justify-center my-4">
          <div id="container-2ccd4bd103e10a34cd07774571d5fb20"></div>
        </div>
        
        {/* 4. Adstera Native Async Script */}
        <Script 
          src="https://pl28920201.effectivegatecpm.com/2ccd4bd103e10a34cd07774571d5fb20/invoke.js"
          strategy="lazyOnload"
          data-cfasync="false"
        />
      </body>
    </html>
  );
}