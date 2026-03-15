import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { AIChat } from "@/components/AIChat";
import { AdsScripts } from "@/components/AdsScripts";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", });

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

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} antialiased font-inter`}> 
        <LanguageProvider>
          {children}
          {/* AI Assistant Chatbox - Always Available */}
          <AIChat />
          {/* Adstera Ad Scripts - Popunder, Social Bar, Native Async */}
          <AdsScripts />
        </LanguageProvider>
      </body>
    </html>
  );
}