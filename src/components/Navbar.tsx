"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/link-deep", label: "Link Deep", icon: "🔗" },
  { href: "/harga-sembako", label: "Harga Sembako", icon: "🛒" },
  { href: "/lowongan-kerja", label: "Loker", icon: "💼" },
  { href: "/cek-bansos", label: "Cek Bansos", icon: "🤝" },
  { href: "/konseling", label: "Konseling AI", icon: "🧠" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 transform-gpu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 group-hover:rotate-y-12 transition-all duration-300 transform-gpu hover:shadow-2xl hover:shadow-blue-500/25">
              🦅
            </div>
            <span className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
              Papua <span className="text-gradient group-hover:animate-pulse">Portal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform-gpu hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${
                  pathname === item.href
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-md hover:shadow-white/10"
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <span className="text-base transform transition-transform duration-300 group-hover:rotate-y-180">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform-gpu hover:scale-105 hover:-translate-y-1 hover:shadow-lg text-gray-400 hover:text-white hover:bg-white/5 hover:shadow-md hover:shadow-white/10"
              title={`Switch to ${language === 'id' ? 'English' : 'Bahasa Indonesia'}`}
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>


          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all duration-300 transform-gpu hover:scale-110 hover:rotate-90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform-gpu hover:scale-105 hover:translate-x-2 ${
                  pathname === item.href
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="transform transition-transform duration-300 hover:rotate-12">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform-gpu hover:scale-105 hover:translate-x-2 text-gray-400 hover:text-white hover:bg-white/5 w-full text-left"
            >
              <Globe size={16} />
              {language === 'id' ? 'English' : 'Bahasa Indonesia'}
            </button>


          </div>
        </div>
      )}
    </nav>
  );
}
