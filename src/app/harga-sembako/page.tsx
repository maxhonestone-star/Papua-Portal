"use client";

import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { komoditas, HargaKabupaten } from "@/data/sembako";
import { Search, TrendingUp, TrendingDown, Minus, MapPin, Info, RefreshCw } from "lucide-react";

const formatRupiah = (val: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(val);

const getProvinsiColor = (prov: string) => {
  const colors: Record<string, string> = {
    "Papua": "text-blue-400 bg-blue-400/10",
    "Papua Barat": "text-green-400 bg-green-400/10",
    "Papua Barat Daya": "text-cyan-400 bg-cyan-400/10",
    "Papua Pegunungan": "text-purple-400 bg-purple-400/10",
    "Papua Tengah": "text-amber-400 bg-amber-400/10",
    "Papua Selatan": "text-rose-400 bg-rose-400/10",
  };
  return colors[prov] || "text-gray-400 bg-gray-400/10";
};

export default function HargaSembakoPage() {
  const [hargaPerKabupaten, setHargaPerKabupaten] = useState<HargaKabupaten[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [compareKabupaten, setCompareKabupaten] = useState("");
  const [search, setSearch] = useState("");

  // Fetch data from API
  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const url = forceRefresh 
        ? '/api/harga-sembako?refresh=true' 
        : '/api/harga-sembako';
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setHargaPerKabupaten(data.data);
        setLastUpdate(data.timestamp);
        if (!selectedKabupaten && data.data.length > 0) {
          setSelectedKabupaten(data.data[0].kabupaten);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to static data
      const { hargaPerKabupaten: staticData } = await import('@/data/sembako');
      setHargaPerKabupaten(staticData);
      if (!selectedKabupaten && staticData.length > 0) {
        setSelectedKabupaten(staticData[0].kabupaten);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto refresh every 5 minutes
    const interval = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const currentData = useMemo(
    () => hargaPerKabupaten.find((h) => h.kabupaten === selectedKabupaten)!,
    [selectedKabupaten]
  );

  const compareData = useMemo(
    () => compareKabupaten ? hargaPerKabupaten.find((h) => h.kabupaten === compareKabupaten) : null,
    [compareKabupaten]
  );

  const filteredKomoditas = useMemo(
    () => komoditas.filter((k) =>
      k.nama.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const avgHarga: Record<string, number> = {};
  komoditas.forEach((k) => {
    const vals = hargaPerKabupaten.map((h) => h.harga[k.nama]).filter(Boolean);
    avgHarga[k.nama] = vals.reduce((a, b) => a + b, 0) / vals.length;
  });

  const getDiffIcon = (current: number, avg: number) => {
    const diff = ((current - avg) / avg) * 100;
    if (diff > 10) return <TrendingUp size={12} className="text-red-400" />;
    if (diff < -10) return <TrendingDown size={12} className="text-green-400" />;
    return <Minus size={12} className="text-gray-500" />;
  };

  const getDiffClass = (current: number, avg: number) => {
    const diff = ((current - avg) / avg) * 100;
    if (diff > 10) return "text-red-400";
    if (diff < -10) return "text-green-400";
    return "text-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-papua">
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-emerald-400 mb-4 border border-emerald-500/20">
              <span>📊</span>
              <span>{komoditas.length} Komoditas × {hargaPerKabupaten.length} Kabupaten/Kota</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              🛒 Harga <span className="text-gradient">Sembako</span> Papua
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              Pantau harga bahan pokok per kabupaten/kota di 6 provinsi Papua.
              Data diperbarui otomatis setiap jam dari sumber resmi BPS.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <span>Terakhir update: {lastUpdate ? new Date(lastUpdate).toLocaleString('id-ID') : 'Loading...'}</span>
              <button
                onClick={() => fetchData(true)}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 transition-all disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass rounded-xl p-4 border border-amber-500/20 bg-amber-500/5 mb-6 flex gap-3">
            <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-amber-300/80 text-sm">
              Data harga bersifat <strong>representatif & informatif</strong> berdasarkan estimasi pasar Papua.
              Harga aktual dapat berbeda. Selalu cek harga terkini di pasar setempat atau PIHPS Nasional.
            </p>
          </div>

          {/* Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="glass-card rounded-xl p-4 border border-white/10">
              <label className="block text-xs text-gray-500 mb-2 font-medium">📍 Pilih Kabupaten/Kota</label>
              <select                id="select-kabupaten"
                name="select-kabupaten"                value={selectedKabupaten}
                onChange={(e) => setSelectedKabupaten(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500/50 text-sm"
              >
                {hargaPerKabupaten.map((h) => (
                  <option key={h.kabupaten} value={h.kabupaten} className="bg-gray-900">
                    {h.kabupaten} ({h.provinsi})
                  </option>
                ))}
              </select>

              {currentData && (
                <div className="mt-2 flex items-center gap-2">
                  <MapPin size={12} className="text-gray-500" />
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getProvinsiColor(currentData.provinsi)}`}>
                    {currentData.provinsi}
                  </span>
                  <span className="text-gray-600 text-xs">Update: {currentData.lastUpdate}</span>
                </div>
              )}
            </div>

            <div className="glass-card rounded-xl p-4 border border-white/10">
              <label className="block text-xs text-gray-500 mb-2 font-medium">⚖️ Bandingkan Dengan (Opsional)</label>
              <select                id="select-compare"
                name="select-compare"                value={compareKabupaten}
                onChange={(e) => setCompareKabupaten(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-blue-500/50 text-sm"
              >
                <option value="" className="bg-gray-900">-- Tidak Dibandingkan --</option>
                {hargaPerKabupaten
                  .filter((h) => h.kabupaten !== selectedKabupaten)
                  .map((h) => (
                    <option key={h.kabupaten} value={h.kabupaten} className="bg-gray-900">
                      {h.kabupaten} ({h.provinsi})
                    </option>
                  ))}
              </select>
              {!compareKabupaten && (
                <p className="text-gray-600 text-xs mt-2">Pilih kabupaten lain untuk membandingkan harga</p>
              )}
            </div>
          </div>

          {/* Search komoditas */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              id="search-harga"
              name="search-harga"
              type="text"
              placeholder="Cari komoditas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 text-sm"
            />
          </div>

          {/* Harga Table */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-bold text-white text-sm">
                Daftar Harga — {currentData?.kabupaten}
                {compareData && <span className="text-gray-500"> vs {compareData.kabupaten}</span>}
              </h2>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><TrendingUp size={10} className="text-red-400" /> Di atas rata-rata</span>
                <span className="flex items-center gap-1"><TrendingDown size={10} className="text-green-400" /> Di bawah rata-rata</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Komoditas</th>
                    <th className="text-left py-3 px-4 text-gray-500 font-medium">Satuan</th>
                    <th className="text-right py-3 px-4 text-gray-500 font-medium">{currentData?.kabupaten}</th>
                    {compareData && (
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">{compareData.kabupaten}</th>
                    )}
                    {compareData && (
                      <th className="text-right py-3 px-4 text-gray-500 font-medium">Selisih</th>
                    )}
                    <th className="text-right py-3 px-4 text-gray-500 font-medium">vs Rata-rata</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKomoditas.map((k, i) => {
                    const harga1 = currentData?.harga[k.nama] || 0;
                    const harga2 = compareData?.harga[k.nama] || 0;
                    const avg = avgHarga[k.nama] || 0;
                    const selisih = harga2 ? harga1 - harga2 : 0;

                    return (
                      <tr
                        key={k.nama}
                        className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{k.emoji}</span>
                            <span className="text-white font-medium">{k.nama}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-500">/{k.satuan}</td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-semibold ${getDiffClass(harga1, avg)}`}>
                            {formatRupiah(harga1)}
                          </span>
                        </td>
                        {compareData && (
                          <td className="py-3 px-4 text-right">
                            <span className={`font-semibold ${getDiffClass(harga2, avg)}`}>
                              {formatRupiah(harga2)}
                            </span>
                          </td>
                        )}
                        {compareData && (
                          <td className="py-3 px-4 text-right">
                            <span className={selisih > 0 ? "text-red-400" : selisih < 0 ? "text-green-400" : "text-gray-500"}>
                              {selisih > 0 ? "+" : ""}{formatRupiah(selisih)}
                            </span>
                          </td>
                        )}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {getDiffIcon(harga1, avg)}
                            <span className="text-gray-600 text-xs">{formatRupiah(Math.round(avg))}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="glass rounded-xl p-4 border border-emerald-500/20 bg-emerald-500/5">
              <div className="text-emerald-400 font-bold text-lg mb-1">🟢 Harga Terjangkau</div>
              <p className="text-gray-400 text-sm">
                Kota-kota pesisir seperti Jayapura, Merauke, dan Sorong umumnya memiliki harga sembako lebih terjangkau daripada daerah pegunungan.
              </p>
            </div>
            <div className="glass rounded-xl p-4 border border-red-500/20 bg-red-500/5">
              <div className="text-red-400 font-bold text-lg mb-1">🔴 Harga Tinggi</div>
              <p className="text-gray-400 text-sm">
                Daerah pegunungan seperti Wamena (Jayawijaya) memiliki harga 2-3x lebih mahal karena biaya transportasi udara yang tinggi.
              </p>
            </div>
            <div className="glass rounded-xl p-4 border border-blue-500/20 bg-blue-500/5">
              <div className="text-blue-400 font-bold text-lg mb-1">📈 Monitoring Harga</div>
              <p className="text-gray-400 text-sm">
                Untuk data harga real-time resmi, kunjungi{" "}
                <a href="https://hargapangan.id" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  hargapangan.id
                </a>{" "}
                atau PIHPS Nasional.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
