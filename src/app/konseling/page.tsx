"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AVAILABLE_NICHE, KonselingOutput } from "@/lib/konseling-types";
import { Brain, Loader2, ChevronDown, ChevronUp, AlertTriangle, Sparkles, BookOpen, Copy, Check } from "lucide-react";

const nicheEmoji: Record<string, string> = {
  "Keuangan": "💰",
  "Ekonomi": "📊",
  "Sosial": "👥",
  "Politik": "🏛️",
  "Keamanan": "🛡️",
  "Kesehatan": "🏥",
  "Hukum": "⚖️",
  "Budaya & Adat": "🦅",
  "Pendidikan": "📚",
  "Karir & Bisnis": "💼",
  "Spiritual": "✨",
  "Psikologi": "🧠",
};

const exampleQuestions = [
  "Saya kehilangan pekerjaan di Papua dan tidak tahu harus memulai bisnis apa dengan modal terbatas di kampung.",
  "Tanah adat keluarga kami terancam diambil oleh perusahaan tambang. Apa yang harus kami lakukan?",
  "Anak saya ingin kuliah tapi kami tidak mampu biaya. Bagaimana caranya agar bisa tetap kuliah?",
  "Saya merasa tertekan secara mental karena konflik keluarga dan tekanan ekonomi yang berkepanjangan.",
  "Saya ingin memulai usaha perikanan di Raja Ampat tapi tidak tahu dari mana mulai.",
];

export default function KonselingPage() {
  const [masalah, setMasalah] = useState("");
  const [latarBelakang, setLatarBelakang] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<string[]>(["Psikologi", "Karir & Bisnis"]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<KonselingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string[]>(["pengantar"]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  const toggleNiche = (niche: string) => {
    setSelectedNiche((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const toggleSection = (key: string) => {
    setExpandedSection((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = async () => {
    if (masalah.trim().length < 20) {
      setError("Ceritakan masalahmu lebih detail (minimal 20 karakter)");
      return;
    }
    if (selectedNiche.length === 0) {
      setError("Pilih minimal 1 perspektif analisis");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/konseling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          masalah: masalah.trim(),
          latar_belakang: latarBelakang.trim(),
          niche: selectedNiche,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mendapatkan respons AI");
      }

      setResult(data);
      setExpandedSection(["pengantar", "analisis_mendalam", "langkah_konkrit"]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const SectionToggle = ({ id, title, icon }: { id: string; title: string; icon: string }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors rounded-xl"
    >
      <h3 className="text-white font-bold text-base flex items-center gap-2">
        <span>{icon}</span> {title}
      </h3>
      {expandedSection.includes(id) ? (
        <ChevronUp size={16} className="text-gray-500" />
      ) : (
        <ChevronDown size={16} className="text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-papua">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-400 mb-4 border border-purple-500/20">
              <Sparkles size={14} />
              <span>AI Konseling Powered by Google Gemini</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              🧠 Konseling <span className="text-gradient">AI Papua</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ceritakan masalahmu. AI kami akan menganalisis dari berbagai sudut pandang ahli
              dan memberikan solusi super deep yang konkrit untuk situasimu.
            </p>
          </div>

          {!result ? (
            <div className="space-y-5">
              {/* Input Form */}
              <div className="glass-card rounded-2xl p-6 border border-purple-500/20">
                <label className="block text-white font-semibold text-sm mb-3">
                  📝 Ceritakan Masalahmu <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="input-masalah"
                  name="input-masalah"
                  value={masalah}
                  onChange={(e) => setMasalah(e.target.value)}
                  placeholder="Ceritakan masalah atau pertanyaanmu secara detail. Semakin detail, semakin akurat analisis AI..."
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 text-sm leading-relaxed resize-none"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-gray-600 text-xs">{masalah.length} karakter (min. 20)</p>
                  <div className="flex flex-wrap gap-1">
                    {exampleQuestions.slice(0, 2).map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setMasalah(q)}
                        className="text-xs text-purple-400/70 hover:text-purple-300 transition-colors px-2 py-1 rounded bg-purple-500/10"
                      >
                        Contoh {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Latar belakang */}
              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <label className="block text-white font-semibold text-sm mb-3">
                  📌 Latar Belakang Tambahan <span className="text-gray-600">(opsional)</span>
                </label>
                <textarea
                  id="input-latar-belakang"
                  name="input-latar-belakang"
                  value={latarBelakang}
                  onChange={(e) => setLatarBelakang(e.target.value)}
                  placeholder="Tambahkan konteks: lokasi, usia, profesi, situasi keluarga, atau detail relevan lainnya..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 text-sm resize-none"
                />
              </div>

              {/* Niche Selection */}
              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <label className="block text-white font-semibold text-sm mb-1">
                  🎯 Perspektif Analisis <span className="text-red-400">*</span>
                </label>
                <p className="text-gray-500 text-xs mb-4">
                  Pilih bidang keahlian yang ingin menganalisis masalahmu ({selectedNiche.length} dipilih)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {AVAILABLE_NICHE.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => toggleNiche(niche)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        selectedNiche.includes(niche)
                          ? "bg-purple-600/30 border-purple-500/50 text-purple-200"
                          : "bg-white/3 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{nicheEmoji[niche] || "🔍"}</span>
                      <span className="text-xs">{niche}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setSelectedNiche(AVAILABLE_NICHE)}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Pilih Semua
                  </button>
                  <span className="text-gray-600">•</span>
                  <button
                    onClick={() => setSelectedNiche([])}
                    className="text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    Hapus Semua
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Disclaimer */}
              <div className="glass rounded-xl p-4 border border-amber-500/20 bg-amber-500/5 flex gap-3">
                <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-amber-300/70 text-xs">
                  <strong>Disclaimer:</strong> Papua Konseling AI bersifat informatif dan edukatif.
                  Untuk masalah hukum serius, konsultasikan ke LBH Papua. Untuk krisis kesehatan mental,
                  hubungi RSJ Abepura: (0967) 591-192. AI tidak menggantikan profesional terlatih.
                  Data Anda tidak disimpan.
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || masalah.trim().length < 20 || selectedNiche.length === 0}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all hover:scale-[1.01] shadow-xl shadow-purple-900/20 flex items-center justify-center gap-3 text-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menganalisis masalahmu dari {selectedNiche.length} perspektif ahli...
                  </>
                ) : (
                  <>
                    <Brain size={18} />
                    Mulai Analisis AI ({selectedNiche.length} perspektif)
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Back button */}
              <button
                onClick={() => { setResult(null); setExpandedSection([]); }}
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mb-2"
              >
                ← Konseling Baru
              </button>

              {/* Result header */}
              <div className="glass-card rounded-2xl p-5 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center">
                    <Brain size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold">Papua Konseling AI</h2>
                    <p className="text-gray-500 text-xs">Analisis dari {selectedNiche.length} perspektif ahli</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedNiche.map((n) => (
                    <span key={n} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {nicheEmoji[n]} {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pengantar */}
              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <button
                    onClick={() => toggleSection("pengantar")}
                    className="flex-1 flex items-center justify-between text-left"
                  >
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span>💬</span> Pengantar & Pemahaman Masalah
                    </h3>
                    {expandedSection.includes("pengantar") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSection.includes("pengantar") && (
                    <button
                      onClick={() => copyToClipboard(result.pengantar, "pengantar")}
                      className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy teks"
                    >
                      {copiedSection === "pengantar" ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Copy size={18} className="text-gray-400 hover:text-white" />
                      )}
                    </button>
                  )}
                </div>
                {expandedSection.includes("pengantar") && (
                  <div className="px-5 pb-5">
                    <div className="prose-papua text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {result.pengantar}
                    </div>
                  </div>
                )}
              </div>

              {/* Analisis */}
              <div className="glass-card rounded-2xl border border-blue-500/20 overflow-hidden">
                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <button
                    onClick={() => toggleSection("analisis_mendalam")}
                    className="flex-1 flex items-center justify-between text-left"
                  >
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span>🔬</span> Analisis Super Deep
                    </h3>
                    {expandedSection.includes("analisis_mendalam") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSection.includes("analisis_mendalam") && (
                    <button
                      onClick={() => copyToClipboard(result.analisis_mendalam, "analisis_mendalam")}
                      className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy teks"
                    >
                      {copiedSection === "analisis_mendalam" ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Copy size={18} className="text-gray-400 hover:text-white" />
                      )}
                    </button>
                  )}
                </div>
                {expandedSection.includes("analisis_mendalam") && (
                  <div className="px-5 pb-5">
                    <div className="prose-papua text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {result.analisis_mendalam}
                    </div>
                  </div>
                )}
              </div>

              {/* Saran per Niche */}
              {Object.keys(result.saran_per_niche).length > 0 && (
                <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                  <SectionToggle id="saran_niche" title="Saran dari Setiap Perspektif Ahli" icon="🎯" />
                  {expandedSection.includes("saran_niche") && (
                    <div className="px-5 pb-5 space-y-4">
                      {Object.entries(result.saran_per_niche).map(([niche, saran]) => (
                        <div key={niche} className="glass rounded-xl p-4 border border-white/10">
                          <h4 className="text-white font-semibold text-sm mb-2">
                            {nicheEmoji[niche] || "🔍"} {niche}
                          </h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{saran}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Prediksi */}
              <div className="glass-card rounded-2xl border border-amber-500/20 overflow-hidden">
                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <button
                    onClick={() => toggleSection("prediksi")}
                    className="flex-1 flex items-center justify-between text-left"
                  >
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span>🔮</span> Prediksi Masa Depan
                    </h3>
                    {expandedSection.includes("prediksi") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSection.includes("prediksi") && (
                    <button
                      onClick={() => copyToClipboard(result.prediksi_masa_depan, "prediksi")}
                      className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy teks"
                    >
                      {copiedSection === "prediksi" ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Copy size={18} className="text-gray-400 hover:text-white" />
                      )}
                    </button>
                  )}
                </div>
                {expandedSection.includes("prediksi") && (
                  <div className="px-5 pb-5">
                    <div className="prose-papua text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {result.prediksi_masa_depan}
                    </div>
                  </div>
                )}
              </div>

              {/* Kesimpulan */}
              <div className="glass-card rounded-2xl border border-emerald-500/20 overflow-hidden">
                <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <button
                    onClick={() => toggleSection("kesimpulan")}
                    className="flex-1 flex items-center justify-between text-left"
                  >
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span>✅</span> Kesimpulan
                    </h3>
                    {expandedSection.includes("kesimpulan") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedSection.includes("kesimpulan") && (
                    <button
                      onClick={() => copyToClipboard(result.kesimpulan, "kesimpulan")}
                      className="ml-2 p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy teks"
                    >
                      {copiedSection === "kesimpulan" ? (
                        <Check size={18} className="text-green-400" />
                      ) : (
                        <Copy size={18} className="text-gray-400 hover:text-white" />
                      )}
                    </button>
                  )}
                </div>
                {expandedSection.includes("kesimpulan") && (
                  <div className="px-5 pb-5">
                    <div className="prose-papua text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {result.kesimpulan}
                    </div>
                  </div>
                )}
              </div>

              {/* Langkah Konkrit */}
              {result.langkah_konkrit.length > 0 && (
                <div className="glass-card rounded-2xl border border-purple-500/20 overflow-hidden">
                  <SectionToggle id="langkah_konkrit" title="Langkah-Langkah Konkrit" icon="🚀" />
                  {expandedSection.includes("langkah_konkrit") && (
                    <div className="px-5 pb-5 space-y-4">
                      {result.langkah_konkrit.map((langkah, i) => (
                        <div key={i} className="glass rounded-xl p-4 border border-white/10">
                          <h4 className="text-white font-bold text-sm mb-3">
                            <span className="text-purple-400 mr-2">{i + 1}.</span>
                            {langkah.judul}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                              <div className="text-blue-400 text-xs font-semibold mb-1">🎯 TAKTIS (Pendekatan)</div>
                              <p className="text-gray-300 text-sm">{langkah.taktis}</p>
                            </div>
                            <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                              <div className="text-emerald-400 text-xs font-semibold mb-1">⚙️ TEKNIS (Cara Konkrit)</div>
                              <p className="text-gray-300 text-sm">{langkah.teknis}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Disclaimer */}
              {result.disclaimer && (
                <div className="glass rounded-xl p-4 border border-amber-500/20 bg-amber-500/5 flex gap-3">
                  <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-300/70 text-xs">{result.disclaimer}</p>
                </div>
              )}

              {/* Action */}
              <button
                onClick={() => { setResult(null); setMasalah(""); setLatarBelakang(""); setExpandedSection(["pengantar"]); }}
                className="w-full py-3 glass border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-600/20 font-semibold rounded-xl transition-all text-sm"
              >
                🔄 Mulai Konseling Baru
              </button>
            </div>
          )}

          {/* How it works */}
          {!result && (
            <div className="mt-10 glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <BookOpen size={18} /> Cara Kerja Konseling AI Papua
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: "1", icon: "📝", title: "Ceritakan Masalah", desc: "Tulis masalah atau pertanyaanmu secara detail. Semakin detail, semakin baik."  },
                  { step: "2", icon: "🎯", title: "Pilih Perspektif", desc: "Pilih dari 12 bidang keahlian yang ingin menganalisis masalahmu." },
                  { step: "3", icon: "🧠", title: "Analisis AI", desc: "Google Gemini menganalisis dari semua perspektif dan menghasilkan solusi konkrit." },
                ].map((s) => (
                  <div key={s.step} className="text-center p-4">
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 text-xs font-bold flex items-center justify-center mx-auto mb-2">{s.step}</div>
                    <h4 className="text-white font-semibold text-sm mb-1">{s.title}</h4>
                    <p className="text-gray-500 text-xs">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
