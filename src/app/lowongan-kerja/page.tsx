"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { lokerCategories, Loker } from "@/data/loker";
import { Search, MapPin, Calendar, Briefcase, Clock, RefreshCw } from "lucide-react";

const tipeBadgeColor: Record<string, string> = {
  "Full Time": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Part Time": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Kontrak": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Freelance": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Internship": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "CPNS": "bg-red-500/20 text-red-300 border-red-500/30",
  "BUMN": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export default function LokerPage() {
  const [lokerData, setLokerData] = useState<Loker[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedProvinsi, setSelectedProvinsi] = useState("Semua");
  const [expanded, setExpanded] = useState<number | null>(null);

  // Fetch data from API
  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== "Semua") params.append('kategori', selectedCategory);
      if (selectedProvinsi !== "Semua") params.append('provinsi', selectedProvinsi);
      if (search) params.append('search', search);
      if (forceRefresh) params.append('refresh', 'true');
      
      const url = `/api/loker${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setLokerData(data.data);
        setLastUpdate(data.timestamp);
      }
    } catch (error) {
      console.error('Error fetching loker data:', error);
      // Fallback to static data
      const { lokerData: staticData } = await import('@/data/loker');
      setLokerData(staticData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto refresh every 6 hours
    const interval = setInterval(() => {
      fetchData();
    }, 6 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [selectedCategory, selectedProvinsi, search]);

  const provinsiList = ["Semua", ...Array.from(new Set(lokerData.map((l) => l.provinsi)))];

  const filtered = useMemo(() => {
    return lokerData;
  }, [lokerData]);

  const isDeadlineSoon = (deadline: string) => {
    const days = (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return days <= 7 && days >= 0;
  };

  const isExpired = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-papua">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-amber-400 mb-4 border border-amber-500/20">
              <Briefcase size={14} />
              <span>{lokerData.length} Lowongan Tersedia di Papua</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              💼 Lowongan <span className="text-gradient">Kerja</span> Papua
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              Info loker terkini seluruh Papua — CPNS, BUMN, pertambangan, kesehatan, pendidikan,
              teknologi, dan berbagai bidang lainnya. Data diperbarui otomatis setiap 6 jam.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>Terakhir update: {lastUpdate ? new Date(lastUpdate).toLocaleString('id-ID') : 'Loading...'}</span>
              <button
                onClick={() => fetchData(true)}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 hover:text-amber-200 transition-all disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="glass-card rounded-2xl p-4 mb-6 border border-white/10">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  id="search-loker"
                  name="search-loker"
                  type="text"
                  placeholder="Cari lowongan, perusahaan, atau jabatan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 text-sm"
                />
              </div>
              <select
                id="select-provinsi"
                name="select-provinsi"
                value={selectedProvinsi}
                onChange={(e) => setSelectedProvinsi(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none text-sm min-w-[180px]"
              >
                {provinsiList.map((p) => (
                  <option key={p} value={p} className="bg-gray-900">{p}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {lokerCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-amber-600 text-white"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm">
              <span className="text-white font-semibold">{filtered.length}</span> lowongan ditemukan
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> Urgent
              <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block ml-2"></span> Segera Tutup
            </div>
          </div>

          {/* Loker Cards */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">💼</div>
                <p className="text-gray-400 text-lg">Tidak ada lowongan yang cocok</p>
              </div>
            ) : (
              filtered.map((loker) => (
                <div
                  key={loker.id}
                  className={`glass-card rounded-2xl border transition-all ${
                    loker.urgent
                      ? "border-red-500/30"
                      : isDeadlineSoon(loker.deadline)
                      ? "border-yellow-500/30"
                      : "border-white/10"
                  }`}
                >
                  <div
                    className="p-5 cursor-pointer"
                    onClick={() => setExpanded(expanded === loker.id ? null : loker.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          {loker.urgent && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-semibold">
                              🔥 URGENT
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${tipeBadgeColor[loker.tipe] || "bg-gray-500/20 text-gray-300"}`}>
                            {loker.tipe}
                          </span>
                          {isDeadlineSoon(loker.deadline) && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                              ⚠️ Segera Tutup
                            </span>
                          )}
                          {isExpired(loker.deadline) && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30">
                              Kadaluarsa
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-white text-lg leading-tight">
                          {loker.judul}
                        </h3>
                        <p className="text-blue-400 font-medium text-sm mt-0.5">{loker.perusahaan}</p>

                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {loker.lokasi}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={11} /> Deadline: {loker.deadline}
                          </span>
                          {loker.gaji && (
                            <span className="text-emerald-400 flex items-center gap-1">
                              💰 {loker.gaji}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-500 border border-white/10">
                          {loker.kategori}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {expanded === loker.id ? "▲ Tutup" : "▼ Detail"}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mt-3 line-clamp-2">{loker.deskripsi}</p>
                  </div>

                  {/* Expanded detail */}
                  {expanded === loker.id && (
                    <div className="px-5 pb-5 border-t border-white/10 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-2">📋 Deskripsi Lengkap</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{loker.deskripsi}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-2">✅ Persyaratan</h4>
                          <ul className="space-y-1">
                            {loker.persyaratan.map((p, i) => (
                              <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                <span className="text-emerald-400 flex-shrink-0">•</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
                        <div className="text-sm text-gray-500">
                          📞 <span className="text-gray-300">{loker.kontak}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock size={12} />
                          Diposting: {loker.postedDate}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Tips */}
          <div className="glass rounded-2xl p-6 border border-white/10 mt-10">
            <h3 className="text-white font-bold text-lg mb-4">💡 Tips Melamar Kerja di Papua</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">1.</span>
                <span>Selalu cek langsung ke website resmi perusahaan atau instansi terkait untuk memastikan lowongan masih aktif.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">2.</span>
                <span>Untuk CPNS, daftar di <a href="https://sscasn.bkn.go.id" target="_blank" className="text-blue-400 hover:underline">sscasn.bkn.go.id</a> — satu-satunya portal resmi CPNS.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">3.</span>
                <span>Hati-hati penipuan! Rekrutmen resmi tidak memungut biaya. Laporkan ke Polda Papua jika ada yang mencurigakan.</span>
              </div>
              <div className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">4.</span>
                <span>Untuk loker Papua, bergabung di grup Telegram/WhatsApp &quot;Loker Papua&quot; atau cek Jobstreet, LinkedIn, dan Indeed filter Papua.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
