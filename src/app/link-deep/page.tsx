"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import papuaLinks, { linkCategories } from "@/data/links";
import { ExternalLink, Search, Lock, Globe } from "lucide-react";

export default function LinkDeepPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [showSecret, setShowSecret] = useState(false);

  const filtered = useMemo(() => {
    return papuaLinks.filter((link) => {
      const matchSearch =
        link.title.toLowerCase().includes(search.toLowerCase()) ||
        link.description.toLowerCase().includes(search.toLowerCase()) ||
        link.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        selectedCategory === "Semua" || link.category === selectedCategory;

      const matchSecret = showSecret ? link.isSecret : !link.isSecret;

      return matchSearch && matchCategory && matchSecret;
    });
  }, [search, selectedCategory, showSecret]);

  return (
    <div className="min-h-screen bg-gradient-papua">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-blue-400 mb-4 border border-blue-500/20">
              <Globe size={14} />
              <span>{papuaLinks.length}+ Link Terkurasi untuk Papua</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              🔗 Link <span className="text-gradient">Deep</span> Papua
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Direktori link terlengkap seluruh Papua — pemerintahan, kesehatan, pendidikan, bisnis,
              transportasi, pariwisata, dan link-link &quot;tersembunyi&quot; yang jarang diketahui.
            </p>
          </div>

          {/* Controls */}
          <div className="glass-card rounded-2xl p-4 mb-6 border border-white/10">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  id="search-links"
                  name="search-links"
                  type="text"
                  placeholder="Cari link, website, atau keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 text-sm"
                />
              </div>

              {/* Secret Toggle */}
              <button
                onClick={() => setShowSecret(!showSecret)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  showSecret
                    ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                <Lock size={14} />
                {showSecret ? "🔓 Mode Link Rahasia" : "🔒 Link Biasa"}
              </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Semua", ...linkCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-sm">
              Menampilkan <span className="text-white font-semibold">{filtered.length}</span> link
              {showSecret && <span className="ml-2 text-yellow-400 text-xs">🔓 Mode Rahasia</span>}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="text-xs text-gray-500 hover:text-white transition-colors">
                ✕ Hapus pencarian
              </button>
            )}
          </div>

          {/* Secret info banner */}
          {showSecret && (
            <div className="glass rounded-xl p-4 border border-yellow-500/30 mb-6 bg-yellow-500/5">
              <p className="text-yellow-300 text-sm">
                🔐 <strong>Link Tersembunyi / Kurang Dikenal</strong> — Link-link ini jarang diketahui publik tapi sangat berguna.
                Berisi data pemerintah, monitoring anggaran, pengadaan, dan informasi sensitif lainnya. Gunakan dengan bijak.
              </p>
            </div>
          )}

          {/* Links Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg">Tidak ada link yang cocok</p>
              <p className="text-gray-600 text-sm mt-2">Coba kata kunci atau kategori lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-card rounded-xl p-4 border border-white/8 hover:border-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-900/20 block"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors line-clamp-1">
                          {link.title}
                        </h3>
                        {link.isSecret && (
                          <span className="text-yellow-400 text-xs">🔐</span>
                        )}
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {link.category}
                      </span>
                    </div>
                    <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors mt-1 flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {link.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {link.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 text-xs text-gray-600 group-hover:text-blue-400 transition-colors truncate">
                    🌐 {link.url.replace("https://", "").replace("http://", "").split("/")[0]}
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Tips */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "💡", title: "Tips Penggunaan", desc: "Klik link untuk membuka di tab baru. Semua link sudah diverifikasi aktif per update terakhir." },
              { icon: "🔐", title: "Link Tersembunyi", desc: "Aktifkan mode rahasia untuk link data pemerintah, pengadaan, dan informasi yang jarang diketahui publik." },
              { icon: "📌", title: "Tambah Link", desc: "Ada link penting yang belum ada? Hubungi kami untuk ditambahkan ke direktori Papua Portal." },
            ].map((tip) => (
              <div key={tip.title} className="glass rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h4 className="font-semibold text-white text-sm mb-1">{tip.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
