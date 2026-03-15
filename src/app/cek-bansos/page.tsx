"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import programBansos from "@/data/bansos";
import { CheckCircle, ExternalLink, AlertTriangle, Info } from "lucide-react";

export default function CekBansosPage() {
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [cekResult, setCekResult] = useState<null | "found" | "not-found" | "demo">(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cek" | "info">("cek");

  const handleCek = () => {
    if (!nik || nik.length < 16) {
      alert("NIK harus 16 digit");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulasi - karena tidak ada backend, arahkan ke situs resmi
      setCekResult("demo");
    }, 1500);
  };

  const prog = selectedProgram ? programBansos.find((p) => p.id === selectedProgram) : null;

  return (
    <div className="min-h-screen bg-gradient-papua">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-rose-400 mb-4 border border-rose-500/20">
              <span>🤝</span>
              <span>{programBansos.length} Program Bansos Tersedia</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              🤝 Cek <span className="text-gradient">Bansos</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cek kepesertaan bantuan sosial dan pelajari semua program bansos yang bisa kamu dapatkan sebagai warga Papua.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 glass-card rounded-xl p-1 border border-white/10 w-fit mx-auto">
            <button
              onClick={() => setActiveTab("cek")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "cek" ? "bg-rose-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              🔍 Cek NIK
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === "info" ? "bg-rose-600 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              📋 Info Program
            </button>
          </div>

          {activeTab === "cek" && (
            <div>
              {/* Cek Form */}
              <div className="glass-card rounded-2xl p-6 border border-rose-500/20 mb-6">
                <h2 className="text-white font-bold text-lg mb-4">🔍 Cek Kepesertaan Bansos (NIK)</h2>

                <div className="glass rounded-xl p-4 border border-amber-500/20 bg-amber-500/5 mb-5 flex gap-3">
                  <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-amber-300/80 text-sm">
                    <strong>Penting:</strong> Portal ini akan mengarahkan ke situs resmi Kemensos.
                    Untuk keamanan data, jangan masukkan NIK di situs yang tidak resmi.
                    Data yang anda masukkan di sini <strong>tidak disimpan</strong>.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="input-nik" className="block text-xs text-gray-500 mb-2">NIK (16 digit)</label>
                    <input
                      id="input-nik"
                      name="input-nik"
                      type="text"
                      maxLength={16}
                      value={nik}
                      onChange={(e) => setNik(e.target.value.replace(/\D/g, ""))}
                      placeholder="Masukkan 16 digit NIK"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 text-sm tracking-wider"
                    />
                  </div>
                  <div>
                    <label htmlFor="input-nama" className="block text-xs text-gray-500 mb-2">Nama Lengkap (opsional)</label>
                    <input
                      id="input-nama"
                      name="input-nama"
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Nama sesuai KTP"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-rose-500/50 text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCek}
                  disabled={isLoading || nik.length < 16}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-900 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-sm"
                >
                  {isLoading ? "⏳ Mengecek..." : "🔍 Cek Bansos Saya"}
                </button>
              </div>

              {/* Demo Result */}
              {cekResult === "demo" && (
                <div className="space-y-4">
                  <div className="glass-card rounded-xl p-5 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <Info size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-bold mb-2">Cara Cek Bansos yang Benar</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Untuk mengecek kepesertaan bansos secara akurat, gunakan situs resmi berikut:
                        </p>
                        <div className="space-y-3">
                          {[
                            { nama: "cekbansos.kemensos.go.id", url: "https://cekbansos.kemensos.go.id", desc: "Cek PKH, BPNT, BST resmi Kemensos", label: "Paling Lengkap" },
                            { nama: "pip.kemdikbud.go.id", url: "https://pip.kemdikbud.go.id", desc: "Cek KIP/PIP untuk siswa", label: "Siswa" },
                            { nama: "kip-kuliah.kemdikbud.go.id", url: "https://kip-kuliah.kemdikbud.go.id", desc: "Cek KIP Kuliah untuk mahasiswa", label: "Mahasiswa" },
                            { nama: "bpjs-kesehatan.go.id", url: "https://bpjs-kesehatan.go.id", desc: "Cek kepesertaan JKN/BPJS Kesehatan", label: "Kesehatan" },
                          ].map((site) => (
                            <a
                              key={site.url}
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 transition-all group"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-white font-medium text-sm">{site.nama}</span>
                                  <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">{site.label}</span>
                                </div>
                                <p className="text-gray-500 text-xs mt-0.5">{site.desc}</p>
                              </div>
                              <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Offline options */}
                  <div className="glass rounded-xl p-4 border border-white/10">
                    <h4 className="text-white font-semibold text-sm mb-3">📍 Cara Cek Offline (Khusus Papua)</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>• Kunjungi <strong className="text-gray-300">Kantor Dinas Sosial</strong> kabupaten/kota setempat</p>
                      <p>• Hubungi <strong className="text-gray-300">Pendamping PKH</strong> di desa/kelurahan anda</p>
                      <p>• Tanyakan ke <strong className="text-gray-300">Kepala Kampung/Desa</strong> untuk BLT-DD</p>
                      <p>• Hubungi <strong className="text-gray-300">PT Pos Indonesia</strong> terdekat untuk cek status pencairan</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "info" && (
            <div>
              {!selectedProgram ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {programBansos.map((prog) => (
                    <button
                      key={prog.id}
                      onClick={() => setSelectedProgram(prog.id)}
                      className="glass-card rounded-xl p-4 border border-white/10 hover:border-rose-500/30 transition-all text-left group hover:scale-[1.01]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{prog.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white text-sm group-hover:text-rose-300 transition-colors">
                              {prog.singkatan}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-500 border border-white/10">
                              {prog.kategori}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5">{prog.nama}</p>
                          <p className="text-gray-500 text-xs mt-2 line-clamp-2">{prog.deskripsi}</p>
                          <div className="mt-2 text-emerald-400 text-xs font-medium">{prog.besaran}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                prog && (
                  <div>
                    <button
                      onClick={() => setSelectedProgram(null)}
                      className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
                    >
                      ← Kembali ke daftar program
                    </button>

                    <div className="glass-card rounded-2xl border border-rose-500/20 overflow-hidden">
                      <div className="p-6 border-b border-white/10 flex items-start gap-4">
                        <span className="text-5xl">{prog.emoji}</span>
                        <div>
                          <h2 className="text-2xl font-black text-white">{prog.singkatan}</h2>
                          <p className="text-gray-400 text-sm">{prog.nama}</p>
                          <p className="text-gray-500 text-xs mt-1">Penyelenggara: {prog.penyelenggara}</p>
                        </div>
                      </div>

                      <div className="p-6 space-y-5">
                        <div>
                          <h3 className="text-white font-semibold text-sm mb-2">📝 Deskripsi</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{prog.deskripsi}</p>
                        </div>

                        <div className="glass rounded-xl p-4 border border-emerald-500/20 bg-emerald-500/5">
                          <h3 className="text-emerald-400 font-semibold text-sm mb-1">💰 Besaran Bantuan</h3>
                          <p className="text-white font-bold">{prog.besaran}</p>
                        </div>

                        <div>
                          <h3 className="text-white font-semibold text-sm mb-2">✅ Syarat Penerima</h3>
                          <ul className="space-y-2">
                            {prog.syarat.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                                <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-white font-semibold text-sm mb-2">🔍 Cara Cek</h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{prog.cara_cek}</p>
                        </div>

                        <a
                          href={prog.link_resmi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 rounded-xl bg-rose-600/20 border border-rose-500/30 hover:bg-rose-600/30 transition-all group"
                        >
                          <div>
                            <div className="text-white font-semibold text-sm">🌐 Link Resmi</div>
                            <div className="text-rose-300 text-xs">{prog.link_resmi}</div>
                          </div>
                          <ExternalLink size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* General Tips */}
          <div className="glass rounded-2xl p-6 border border-white/10 mt-8">
            <h3 className="text-white font-bold text-lg mb-4">📌 Panduan Umum Bansos Papua</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <p>📲 <strong className="text-gray-300">DTKS</strong> — Pastikan data keluarga terdaftar di Data Terpadu Kesejahteraan Sosial. Daftar lewat Dinas Sosial setempat.</p>
              <p>🏦 <strong className="text-gray-300">Rekening Bank</strong> — Siapkan rekening Himbara (BRI, BNI, Mandiri, BTN) untuk pencairan bansos.</p>
              <p>🆔 <strong className="text-gray-300">Dokumen Lengkap</strong> — NIK, KK, KTP aktif adalah syarat utama semua program bansos.</p>
              <p>📞 <strong className="text-gray-300">Hotline Kemensos</strong> — Call center 1500-299 untuk pengaduan terkait bansos.</p>
              <p>🦅 <strong className="text-gray-300">OAP</strong> — Orang Asli Papua berhak mendapat bansos OTSUS khusus. Hubungi Dinsos Papua setempat.</p>
              <p>⚠️ <strong className="text-gray-300">Anti Penipuan</strong> — Bansos resmi tidak dipungut biaya apapun. Laporkan penipuan ke Polda Papua.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
