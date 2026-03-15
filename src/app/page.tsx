"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Masukkan Smart Link kamu di sini
const ADSTERRA_SMART_LINK = "https://www.effectivegatecpm.com/tvqnevd65z?key=ab0f8aae20f425b8cb36f7e7a88fe5b7";

const features = [
  {
    href: "/link-deep",
    icon: "🔗",
    title: "Link Deep Papua",
    desc: "180+ link penting & tersembunyi seluruh Papua. Termasuk link rahasia pemerintah, beasiswa tersembunyi, bantuan hukum gratis, dan banyak lagi yang jarang diketahui.",
    badge: "180+ Link",
    color: "bg-gradient-feature-1",
    borderColor: "border-blue-500/20",
    btnColor: "bg-blue-600 hover:bg-blue-500",
    tags: ["Pemerintahan", "Kesehatan", "Beasiswa", "Hukum"],
  },
  {
    href: "/harga-sembako",
    icon: "🛒",
    title: "Harga Sembako",
    desc: "Pantau harga 30 komoditas di 30+ kabupaten/kota seluruh 6 provinsi Papua. Data representatif berdasarkan estimasi pasar nyata.",
    badge: "30+ Kab/Kota",
    color: "bg-gradient-feature-2",
    borderColor: "border-emerald-500/20",
    btnColor: "bg-emerald-600 hover:bg-emerald-500",
    tags: ["Beras", "Daging", "Sayuran", "BBM"],
  },
  {
    href: "/lowongan-kerja",
    icon: "💼",
    title: "Lowongan Kerja",
    desc: "35+ loker terkini se-Papua dari semua 6 provinsi. CPNS, PPPK, BUMN, tambang, kesehatan, pendidikan, konstruksi, dan banyak bidang lainnya.",
    badge: "35+ Loker Aktif",
    color: "bg-gradient-feature-3",
    borderColor: "border-amber-500/20",
    btnColor: "bg-amber-600 hover:bg-amber-500",
    tags: ["CPNS", "PPPK", "Tambang", "Kesehatan"],
  },
  {
    href: "/cek-bansos",
    icon: "🤝",
    title: "Cek Bansos",
    desc: "18 program bansos lengkap: PKH, BPNT, BLT-DD, PIP, KIP Kuliah, Rutilahu, BPUM, Prakerja, Beasiswa OTSUS, ADik Papua, dan program OTSUS lainnya.",
    badge: "18 Program",
    color: "bg-gradient-feature-4",
    borderColor: "border-rose-500/20",
    btnColor: "bg-rose-600 hover:bg-rose-500",
    tags: ["PKH", "BPNT", "OTSUS", "ADik"],
  },
  {
    href: "/konseling",
    icon: "🧠",
    title: "Konseling AI Papua",
    desc: "Konseling enterprise-grade berbasis Gemini Pro. Analisis mendalam dari 12 perspektif ahli. Output yang menyentuh hati dan berdampak nyata bagi kehidupan.",
    badge: "Enterprise AI",
    color: "bg-gradient-feature-5",
    borderColor: "border-purple-500/20",
    btnColor: "bg-purple-600 hover:bg-purple-500",
    tags: ["Keuangan", "Hukum", "Psikologi", "Karir"],
  },
];

const stats = [
  { value: "6", label: "Provinsi Papua", icon: "🗺️" },
  { value: "180+", label: "Link Tersembunyi", icon: "🔗" },
  { value: "30+", label: "Kab/Kota Harga", icon: "🛒" },
  { value: "12", label: "Niche AI Expert", icon: "🧠" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filteredFeatures = useMemo(
    () => features.filter((feature) =>
      feature.title.toLowerCase().includes(search.toLowerCase()) ||
      feature.desc.toLowerCase().includes(search.toLowerCase()) ||
      feature.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    ),
    [search]
  );

  return (
    <div className="min-h-screen bg-gradient-papua">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden bg-gradient-papua-enhanced">
        {/* === HOLOGRAM ELEMENTS TETAP SAMA SEPERTI KODE KAMU === */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(0,255,200,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,200,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
            Papua <span className="text-gradient">Portal</span>
          </h1>

          {/* CTA Buttons - DI SINI SMART LINK KAMU BEKERJA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href={ADSTERRA_SMART_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-900/30"
            >
              🔗 Jelajahi Link Deep (Cek Info)
            </a>
            <Link
              href="/konseling"
              className="px-8 py-4 glass border border-purple-500/30 text-purple-300 hover:text-white font-semibold rounded-xl transition-all hover:bg-purple-600/20"
            >
              🧠 Coba Konseling AI
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-4 text-center card-glow-fire">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-gray-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === IKLAN NATIVE BANNER ADSTERRA (DI TENGAH HALAMAN) === */}
      <div className="flex justify-center my-10 px-4">
        <div className="w-full max-w-4xl p-4 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
             <p className="text-[10px] text-gray-600 mb-2 text-center uppercase tracking-widest">Sponsored Content</p>
             <div id="container-2ccd4bd103e10a34cd07774571d5fb20" className="min-h-[150px] flex justify-center items-center text-gray-500 italic">
                {/* Iklan Native akan dimuat di sini oleh Script di layout.tsx */}
                Memuat Informasi...
             </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature, i) => (
              <Link
                key={feature.href}
                href={feature.href}
                className={`group glass-card rounded-2xl p-6 border ${feature.borderColor} hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`${feature.color} rounded-xl p-4 inline-flex mb-4`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.desc}</p>
                <div className={`${feature.btnColor} text-white text-sm font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2`}>
                  Buka Fitur →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Ad Space - Smart Link Lagi */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <a href={ADSTERRA_SMART_LINK} target="_blank" rel="noopener noreferrer">
            <div className="relative glass-card rounded-3xl p-10 border border-orange-500/20 text-center hover:bg-orange-500/5 transition-all">
                <h2 className="text-2xl font-black text-white mb-3 uppercase">🔥 Info Penting Beasiswa Papua 2026</h2>
                <p className="text-gray-400">Klik di sini untuk melihat daftar penerima bantuan OTSUS terbaru.</p>
            </div>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
