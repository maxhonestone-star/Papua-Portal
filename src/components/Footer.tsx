import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🦅</span>
              <span className="font-bold text-white text-lg">Papua Portal</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Super App untuk seluruh masyarakat Papua. Informasi terpercaya, solusi nyata.
            </p>
            <p className="text-gray-600 text-xs mt-3">
              🌍 Dibuat dengan ❤️ untuk Papua
            </p>
          </div>

          {/* Fitur */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Fitur Utama</h4>
            <ul className="space-y-2">
              {[
                { href: "/link-deep", label: "🔗 Link Deep Papua" },
                { href: "/harga-sembako", label: "🛒 Harga Sembako" },
                { href: "/lowongan-kerja", label: "💼 Lowongan Kerja" },
                { href: "/cek-bansos", label: "🤝 Cek Bansos" },
                { href: "/konseling", label: "🧠 Konseling AI" },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Provinsi Papua */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Provinsi Papua</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>🏔️ Papua (Jayapura)</li>
              <li>🏔️ Papua Barat (Manokwari)</li>
              <li>🌊 Papua Barat Daya (Sorong)</li>
              <li>⛰️ Papua Pegunungan (Wamena)</li>
              <li>🌿 Papua Tengah (Nabire)</li>
              <li>🦘 Papua Selatan (Merauke)</li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Informasi</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>📊 Data diperbarui berkala</li>
              <li>🤖 AI powered by Gemini</li>
              <li>🔒 Tidak ada data yang disimpan</li>
              <li>💯 Gratis selamanya</li>
              <li>🚀 Open Source</li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-yellow-400 text-xs">
                ⚠️ Data harga & loker bersifat informatif. Selalu verifikasi ke sumber resmi.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2024 Papua Portal. Untuk Papua yang Lebih Maju 🇮🇩
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>Dibuat untuk 6 Provinsi Papua</span>
            <span>•</span>
            <span>Deploy: GitHub + Cloudflare Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
