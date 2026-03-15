"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
        {/* === HOLOGRAM BACKGROUND ELEMENTS === */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Deep space glow */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute top-40 left-1/2 w-64 h-64 bg-rose-600/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-orange-600/8 rounded-full blur-3xl" />

          {/* Hologram grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,200,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,200,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />

          {/* Hologram Papua Map - Right side */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-80 h-80 opacity-[0.06] hidden lg:block">
            <svg viewBox="0 0 400 300" className="w-full h-full animate-hologram" fill="none">
              {/* Simplified Papua island shape */}
              <path d="M50,150 Q80,80 150,70 Q200,60 250,90 Q300,110 350,100 Q380,95 390,120 Q395,140 370,160 Q340,180 300,170 Q260,160 220,180 Q180,200 150,190 Q100,180 70,200 Q40,210 30,180 Q20,160 50,150Z" 
                stroke="rgba(0,255,200,0.8)" strokeWidth="2" fill="rgba(0,255,200,0.05)" />
              {/* Papua Barat */}
              <path d="M50,150 Q30,130 20,110 Q15,90 40,80 Q70,70 90,90 Q100,110 80,130Z" 
                stroke="rgba(0,200,255,0.6)" strokeWidth="1.5" fill="rgba(0,200,255,0.03)" />
              {/* Dots for cities */}
              <circle cx="180" cy="130" r="4" fill="rgba(0,255,200,0.9)" className="animate-pulse" />
              <circle cx="280" cy="120" r="3" fill="rgba(0,200,255,0.8)" className="animate-pulse" />
              <circle cx="100" cy="140" r="3" fill="rgba(100,200,255,0.7)" className="animate-pulse" />
              <circle cx="320" cy="150" r="3" fill="rgba(0,255,150,0.7)" className="animate-pulse" />
              {/* Scan line */}
              <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(0,255,200,0.3)" strokeWidth="1" strokeDasharray="5,10" />
              {/* Grid overlay */}
              <line x1="200" y1="0" x2="200" y2="300" stroke="rgba(0,255,200,0.1)" strokeWidth="0.5" />
              <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(0,255,200,0.1)" strokeWidth="0.5" />
            </svg>
            {/* Hologram scan line */}
            <div className="hologram-scan-line" />
          </div>

          {/* Tifa Drum 3D Hologram - Left side */}
          <div className="absolute left-8 top-1/3 hidden xl:block opacity-[0.08]">
            <div className="relative w-24 h-40 animate-float-slow">
              {/* Tifa body */}
              <div className="absolute inset-0 rounded-full tifa-3d" style={{
                borderRadius: '40% 40% 50% 50% / 30% 30% 70% 70%',
                background: 'linear-gradient(135deg, rgba(180,100,20,0.6), rgba(80,40,5,0.8))',
                border: '1px solid rgba(255,180,50,0.3)',
                boxShadow: '0 0 20px rgba(255,150,0,0.2), inset 0 2px 4px rgba(255,255,255,0.1)'
              }} />
              {/* Tifa top membrane */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-8 rounded-full" style={{
                background: 'radial-gradient(ellipse, rgba(200,150,50,0.5), rgba(100,60,10,0.8))',
                border: '1px solid rgba(255,200,80,0.4)'
              }} />
              {/* Tifa patterns */}
              <div className="absolute inset-x-2 top-10 bottom-10 flex flex-col justify-around">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-px" style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,180,50,0.4), transparent)'
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Floating particles - fire effect */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + (i % 3) * 3}px`,
                height: `${4 + (i % 3) * 3}px`,
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 4) * 15}%`,
                background: i % 2 === 0 
                  ? `rgba(255, ${100 + i * 20}, 0, 0.6)` 
                  : `rgba(0, ${200 + i * 10}, ${150 + i * 10}, 0.4)`,
                animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                filter: `blur(${i % 2}px)`,
                boxShadow: i % 2 === 0 
                  ? `0 0 ${8 + i * 2}px rgba(255, 100, 0, 0.5)` 
                  : `0 0 ${6 + i * 2}px rgba(0, 200, 150, 0.4)`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-orange-400 mb-6 border border-orange-500/30"
            style={{ boxShadow: '0 0 20px rgba(255,100,0,0.15)' }}>
            {/* Cenderawasih Berapi-api SVG */}
            <span className="animate-fire-glow inline-block text-xl">
              <svg width="28" height="28" viewBox="0 0 100 100" className="inline-block">
                {/* Body */}
                <ellipse cx="50" cy="55" rx="18" ry="22" fill="#1a0a00" stroke="#ff6600" strokeWidth="1.5"/>
                {/* Head */}
                <circle cx="50" cy="30" r="12" fill="#1a0a00" stroke="#ff8800" strokeWidth="1.5"/>
                {/* Beak */}
                <path d="M50,25 L62,28 L50,32Z" fill="#ffaa00"/>
                {/* Eye */}
                <circle cx="55" cy="27" r="3" fill="#ff4400"/>
                <circle cx="56" cy="26" r="1" fill="#ffcc00"/>
                {/* Wings */}
                <path d="M32,50 Q20,35 15,25 Q25,30 35,45Z" fill="#ff4400" opacity="0.9"/>
                <path d="M68,50 Q80,35 85,25 Q75,30 65,45Z" fill="#ff4400" opacity="0.9"/>
                {/* Long tail feathers - Cenderawasih */}
                <path d="M42,75 Q35,90 25,110 Q30,108 38,95 Q40,88 44,80Z" fill="#ff6600" opacity="0.8"/>
                <path d="M50,77 Q50,95 45,120 Q50,118 52,100 Q53,90 52,80Z" fill="#ff8800" opacity="0.9"/>
                <path d="M58,75 Q65,90 75,110 Q70,108 62,95 Q60,88 56,80Z" fill="#ff6600" opacity="0.8"/>
                {/* Fire particles */}
                <circle cx="30" cy="20" r="3" fill="#ffaa00" opacity="0.7" className="animate-pulse"/>
                <circle cx="70" cy="18" r="2" fill="#ff6600" opacity="0.6" className="animate-pulse"/>
                <circle cx="50" cy="10" r="4" fill="#ffcc00" opacity="0.8" className="animate-pulse"/>
                {/* Fire glow */}
                <ellipse cx="50" cy="50" rx="25" ry="30" fill="none" stroke="#ff4400" strokeWidth="0.5" opacity="0.4"/>
              </svg>
            </span>
            <span className="font-medium">Super App Terlengkap untuk Masyarakat Papua</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
            Papua{" "}
            <span className="text-gradient">Portal</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-4 font-light">
            5 dalam 1 — Link, Harga, Loker, Bansos, Konseling AI
          </p>

          <p className="text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform informasi terlengkap dan terpercaya untuk masyarakat 6 Provinsi Papua.
            Semua yang kamu butuhkan, dalam satu portal. <strong className="text-gray-300">Gratis. Selamanya.</strong>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/link-deep"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-900/30"
            >
              🔗 Jelajahi Link Deep
            </Link>
            <Link
              href="/konseling"
              className="px-8 py-4 glass border border-purple-500/30 text-purple-300 hover:text-white font-semibold rounded-xl transition-all hover:bg-purple-600/20"
            >
              🧠 Coba Konseling AI
            </Link>
          </div>

          {/* Stats */}
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

        {/* === CENDERAWASIH BERAPI-API HERO VISUAL === */}
        <div className="relative max-w-5xl mx-auto mt-16 flex justify-center">
          <div className="relative w-full max-w-2xl">
            {/* Outer fire ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border border-orange-500/20 animate-spin-slow" 
                style={{ boxShadow: '0 0 40px rgba(255,100,0,0.1)' }} />
              <div className="absolute w-48 h-48 rounded-full border border-orange-400/15 animate-counter-spin" />
            </div>

            {/* Central Cenderawasih SVG - Large */}
            <div className="flex justify-center relative z-10">
              <div className="animate-fire-glow relative">
                <svg width="200" height="220" viewBox="0 0 200 220" className="drop-shadow-2xl">
                  {/* Fire aura background */}
                  <defs>
                    <radialGradient id="fireAura" cx="50%" cy="60%" r="50%">
                      <stop offset="0%" stopColor="#ff6600" stopOpacity="0.3"/>
                      <stop offset="50%" stopColor="#ff3300" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="#ff0000" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="bodyGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor="#2d1a00"/>
                      <stop offset="100%" stopColor="#0d0500"/>
                    </radialGradient>
                    <filter id="fireBlur">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                  </defs>
                  
                  {/* Fire aura */}
                  <ellipse cx="100" cy="130" rx="80" ry="90" fill="url(#fireAura)"/>
                  
                  {/* Flame particles around bird */}
                  <circle cx="40" cy="60" r="6" fill="#ff8800" opacity="0.7" className="animate-pulse"/>
                  <circle cx="160" cy="55" r="5" fill="#ffaa00" opacity="0.6" className="animate-pulse"/>
                  <circle cx="100" cy="20" r="8" fill="#ffcc00" opacity="0.8" className="animate-pulse"/>
                  <circle cx="30" cy="100" r="4" fill="#ff6600" opacity="0.5" className="animate-pulse"/>
                  <circle cx="170" cy="95" r="4" fill="#ff4400" opacity="0.5" className="animate-pulse"/>
                  
                  {/* Wings - spread wide */}
                  <path d="M65,100 Q30,70 10,50 Q20,60 30,80 Q45,95 60,105Z" 
                    fill="#cc3300" stroke="#ff6600" strokeWidth="1"/>
                  <path d="M135,100 Q170,70 190,50 Q180,60 170,80 Q155,95 140,105Z" 
                    fill="#cc3300" stroke="#ff6600" strokeWidth="1"/>
                  {/* Wing details */}
                  <path d="M65,100 Q40,75 20,60" stroke="#ff8800" strokeWidth="0.8" fill="none" opacity="0.6"/>
                  <path d="M135,100 Q160,75 180,60" stroke="#ff8800" strokeWidth="0.8" fill="none" opacity="0.6"/>
                  
                  {/* Body */}
                  <ellipse cx="100" cy="115" rx="35" ry="45" fill="url(#bodyGrad)" stroke="#ff6600" strokeWidth="1.5"/>
                  
                  {/* Chest pattern */}
                  <path d="M85,95 Q100,88 115,95 Q110,110 100,115 Q90,110 85,95Z" 
                    fill="#ff4400" opacity="0.4"/>
                  
                  {/* Head */}
                  <circle cx="100" cy="65" r="25" fill="url(#bodyGrad)" stroke="#ff8800" strokeWidth="1.5"/>
                  
                  {/* Crown feathers */}
                  <path d="M85,45 Q80,25 75,15 Q82,28 88,42Z" fill="#ffaa00" opacity="0.9"/>
                  <path d="M100,42 Q100,20 100,8 Q103,22 103,40Z" fill="#ffcc00" opacity="0.95"/>
                  <path d="M115,45 Q120,25 125,15 Q118,28 112,42Z" fill="#ffaa00" opacity="0.9"/>
                  
                  {/* Beak */}
                  <path d="M100,58 L120,63 L100,70Z" fill="#ffaa00" stroke="#ff8800" strokeWidth="0.5"/>
                  
                  {/* Eye */}
                  <circle cx="110" cy="58" r="6" fill="#ff2200"/>
                  <circle cx="112" cy="56" r="2.5" fill="#ffcc00"/>
                  <circle cx="113" cy="55" r="1" fill="white"/>
                  
                  {/* Long decorative tail feathers - Cenderawasih signature */}
                  <path d="M85,155 Q70,175 55,210 Q65,205 75,185 Q80,170 88,158Z" 
                    fill="#ff5500" stroke="#ff8800" strokeWidth="0.8" opacity="0.85"/>
                  <path d="M92,158 Q88,180 82,215 Q90,210 94,190 Q96,175 95,162Z" 
                    fill="#ff7700" stroke="#ffaa00" strokeWidth="0.8" opacity="0.9"/>
                  <path d="M100,160 Q100,185 98,220 Q103,215 104,195 Q105,178 103,163Z" 
                    fill="#ff9900" stroke="#ffcc00" strokeWidth="1" opacity="0.95"/>
                  <path d="M108,158 Q112,180 118,215 Q110,210 106,190 Q104,175 105,162Z" 
                    fill="#ff7700" stroke="#ffaa00" strokeWidth="0.8" opacity="0.9"/>
                  <path d="M115,155 Q130,175 145,210 Q135,205 125,185 Q120,170 112,158Z" 
                    fill="#ff5500" stroke="#ff8800" strokeWidth="0.8" opacity="0.85"/>
                  
                  {/* Fire glow overlay */}
                  <ellipse cx="100" cy="110" rx="50" ry="60" fill="none" 
                    stroke="#ff4400" strokeWidth="1" opacity="0.3"/>
                  <ellipse cx="100" cy="110" rx="65" ry="75" fill="none" 
                    stroke="#ff6600" strokeWidth="0.5" opacity="0.2"/>
                </svg>
              </div>
            </div>

            {/* Orbiting elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-48 h-48">
                {/* Orbit 1 - Province dots */}
                {["Papua", "Papua Barat", "Papua Tengah", "Papua Selatan", "Papua Pegunungan", "Papua Barat Daya"].map((prov, i) => (
                  <div
                    key={prov}
                    className="absolute w-2 h-2 rounded-full bg-orange-400"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `rotate(${i * 60}deg) translateX(90px) rotate(-${i * 60}deg)`,
                      boxShadow: '0 0 8px rgba(255,150,0,0.8)',
                      marginTop: '-4px',
                      marginLeft: '-4px',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Semua Fitur Papua Portal</h2>
            <p className="text-gray-500">Pilih fitur yang kamu butuhkan</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                id="search-features"
                name="search-features"
                type="text"
                placeholder="Cari fitur atau tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                🔍
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature, i) => (
              <Link
                key={feature.href}
                href={feature.href}
                className={`group glass-card rounded-2xl p-6 border ${feature.borderColor} hover:scale-[1.02] transition-all duration-300 hover:shadow-xl ${
                  i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className={`${feature.color} rounded-xl p-4 inline-flex mb-4`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400 ml-2 flex-shrink-0">
                    {feature.badge}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {feature.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {feature.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`${feature.btnColor} text-white text-sm font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 transition-colors`}>
                  Buka Fitur →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Papua Provinces */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              🗺️ Melayani 6 Provinsi Papua
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { nama: "Papua", ibu: "Jayapura", emoji: "🏙️" },
                { nama: "Papua Barat", ibu: "Manokwari", emoji: "🌿" },
                { nama: "Papua Barat Daya", ibu: "Sorong", emoji: "🌊" },
                { nama: "Papua Pegunungan", ibu: "Wamena", emoji: "⛰️" },
                { nama: "Papua Tengah", ibu: "Nabire", emoji: "🌾" },
                { nama: "Papua Selatan", ibu: "Merauke", emoji: "🦘" },
              ].map((prov) => (
                <div key={prov.nama} className="text-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-3xl mb-2">{prov.emoji}</div>
                  <div className="text-white font-semibold text-xs">{prov.nama}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{prov.ibu}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Konseling */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card rounded-3xl p-10 border border-purple-500/20 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/20 pointer-events-none" />
            <div className="relative">
              <div className="text-5xl mb-4">🧠</div>
              <h2 className="text-3xl font-black text-white mb-3">
                Ada Masalah? <span className="text-gradient">Konseling AI</span> Siap Bantu
              </h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Ceritakan masalahmu — soal keuangan, karir, hukum, kesehatan, atau masalah hidup lainnya.
                AI kami akan menganalisis dari berbagai sudut pandang ahli dan memberikan solusi konkrit.
              </p>
              <Link
                href="/konseling"
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-xl shadow-purple-900/30"
              >
                🚀 Mulai Konseling Sekarang
              </Link>
              <p className="text-gray-600 text-xs mt-4">Gratis • Rahasia • Powered by Google Gemini AI</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
