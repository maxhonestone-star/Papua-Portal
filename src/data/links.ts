export interface PapuaLink {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  isSecret?: boolean;
  province?: string;
}

export const linkCategories = [
  "Pemerintahan",
  "Pendidikan",
  "Kesehatan",
  "Ekonomi & Bisnis",
  "Hukum & Bantuan",
  "Media & Berita",
  "Transportasi",
  "Pariwisata",
  "Organisasi",
  "Teknologi",
  "Sosial & Budaya",
  "Pertanian & Perikanan",
  "Inovasi & Startup",
  "Keuangan Pribadi",
  "Beasiswa & Pelatihan",
  "Informasi Tersembunyi",
];

export const papuaLinks: PapuaLink[] = [
  // PEMERINTAHAN
  { id: 1, title: "Pemprov Papua", url: "https://www.papua.go.id", description: "Website resmi Pemerintah Provinsi Papua", category: "Pemerintahan", tags: ["pemprov", "papua", "resmi"] },
  { id: 2, title: "Pemprov Papua Barat", url: "https://www.papuabarat.go.id", description: "Website resmi Pemerintah Provinsi Papua Barat", category: "Pemerintahan", tags: ["pemprov", "papuabarat", "resmi"] },
  { id: 3, title: "Pemprov Papua Selatan", url: "https://papuaselatan.go.id", description: "Website resmi Pemerintah Provinsi Papua Selatan", category: "Pemerintahan", tags: ["pemprov", "papuaselatan"] },
  { id: 4, title: "Pemprov Papua Tengah", url: "https://papuatengah.go.id", description: "Website resmi Pemerintah Provinsi Papua Tengah", category: "Pemerintahan", tags: ["pemprov", "papuatengah"] },
  { id: 5, title: "Pemprov Papua Pegunungan", url: "https://papuapegunungan.go.id", description: "Website resmi Pemerintah Provinsi Papua Pegunungan", category: "Pemerintahan", tags: ["pemprov", "papuapegunungan"] },
  { id: 6, title: "Pemkot Jayapura", url: "https://www.jayapurakota.go.id", description: "Website resmi Kota Jayapura", category: "Pemerintahan", tags: ["pemkot", "jayapura"] },
  { id: 7, title: "Pemkab Jayapura", url: "https://www.jayapurakab.go.id", description: "Website resmi Kabupaten Jayapura", category: "Pemerintahan", tags: ["pemkab", "jayapura"] },
  { id: 8, title: "Pemkab Merauke", url: "https://www.merauke.go.id", description: "Website resmi Kabupaten Merauke", category: "Pemerintahan", tags: ["pemkab", "merauke"] },
  { id: 9, title: "Pemkab Mimika", url: "https://www.mimikakab.go.id", description: "Website resmi Kabupaten Mimika", category: "Pemerintahan", tags: ["pemkab", "mimika"] },
  { id: 10, title: "Pemkab Sorong", url: "https://sorongkab.go.id", description: "Website resmi Kabupaten Sorong", category: "Pemerintahan", tags: ["pemkab", "sorong"] },
  { id: 11, title: "Pemkot Sorong", url: "https://sorongkota.go.id", description: "Website resmi Kota Sorong", category: "Pemerintahan", tags: ["pemkot", "sorong"] },
  { id: 12, title: "Pemkab Manokwari", url: "https://manokwarikab.go.id", description: "Website resmi Kabupaten Manokwari", category: "Pemerintahan", tags: ["pemkab", "manokwari"] },
  { id: 13, title: "Pemkab Biak Numfor", url: "https://biakkab.go.id", description: "Website resmi Kabupaten Biak Numfor", category: "Pemerintahan", tags: ["pemkab", "biak"] },
  { id: 14, title: "Pemkab Nabire", url: "https://nabirekab.go.id", description: "Website resmi Kabupaten Nabire", category: "Pemerintahan", tags: ["pemkab", "nabire"] },
  { id: 15, title: "Pemkab Jayawijaya", url: "https://jayawijayakab.go.id", description: "Website resmi Kabupaten Jayawijaya (Wamena)", category: "Pemerintahan", tags: ["pemkab", "wamena", "jayawijaya"] },
  { id: 16, title: "DPRD Papua", url: "https://dprd.papua.go.id", description: "DPRD Provinsi Papua", category: "Pemerintahan", tags: ["dprd", "legislatif"] },
  { id: 17, title: "BPS Papua", url: "https://papua.bps.go.id", description: "Badan Pusat Statistik Provinsi Papua", category: "Pemerintahan", tags: ["bps", "statistik", "data"] },
  { id: 18, title: "BPS Papua Barat", url: "https://papuabarat.bps.go.id", description: "BPS Provinsi Papua Barat", category: "Pemerintahan", tags: ["bps", "statistik"] },
  { id: 19, title: "BPKD Papua", url: "https://bpkd.papua.go.id", description: "Badan Pengelolaan Keuangan Daerah Papua", category: "Pemerintahan", tags: ["keuangan", "apbd"] },
  { id: 20, title: "Disdukcapil Papua", url: "https://disdukcapil.papua.go.id", description: "Dinas Dukcapil Provinsi Papua - KTP, KK, Akta", category: "Pemerintahan", tags: ["ktp", "kk", "akta", "dukcapil"] },
  { id: 21, title: "BPBD Papua", url: "https://bpbd.papua.go.id", description: "Badan Penanggulangan Bencana Daerah Papua", category: "Pemerintahan", tags: ["bencana", "disaster"] },
  { id: 22, title: "Dinas Kominfo Papua", url: "https://kominfo.papua.go.id", description: "Dinas Komunikasi dan Informatika Papua", category: "Pemerintahan", tags: ["kominfo", "teknologi"] },
  { id: 23, title: "e-Procurement Papua", url: "https://lpse.papua.go.id", description: "Layanan Pengadaan Secara Elektronik Papua", category: "Pemerintahan", tags: ["lpse", "tender", "pengadaan"] },
  { id: 24, title: "PPID Papua", url: "https://ppid.papua.go.id", description: "Pejabat Pengelola Informasi dan Dokumentasi Papua", category: "Pemerintahan", tags: ["ppid", "informasi", "transparansi"] },
  { id: 25, title: "Pemkab Keerom", url: "https://keeromkab.go.id", description: "Website resmi Kabupaten Keerom", category: "Pemerintahan", tags: ["pemkab", "keerom"] },

  // PENDIDIKAN
  { id: 26, title: "Universitas Cenderawasih", url: "https://uncen.ac.id", description: "Universitas negeri terbesar di Papua", category: "Pendidikan", tags: ["uncen", "universitas", "perguruan tinggi"] },
  { id: 27, title: "UNIPA Manokwari", url: "https://unipa.ac.id", description: "Universitas Papua, Manokwari", category: "Pendidikan", tags: ["unipa", "universitas", "manokwari"] },
  { id: 28, title: "Politeknik Saint Paul Sorong", url: "https://poltekstpaul.ac.id", description: "Politeknik Saint Paul Sorong", category: "Pendidikan", tags: ["politeknik", "sorong"] },
  { id: 29, title: "STKIP Muhammadiyah Sorong", url: "https://stkipmsorong.ac.id", description: "STKIP Muhammadiyah Sorong", category: "Pendidikan", tags: ["stkip", "sorong"] },
  { id: 30, title: "Dinas Dikbud Papua", url: "https://dikbud.papua.go.id", description: "Dinas Pendidikan dan Kebudayaan Papua", category: "Pendidikan", tags: ["dikbud", "pendidikan"] },
  { id: 31, title: "FKIP Uncen", url: "https://fkip.uncen.ac.id", description: "Fakultas Keguruan dan Ilmu Pendidikan Uncen", category: "Pendidikan", tags: ["fkip", "guru"] },
  { id: 32, title: "PPDB Papua", url: "https://ppdb.papua.go.id", description: "Penerimaan Peserta Didik Baru Papua", category: "Pendidikan", tags: ["ppdb", "sekolah", "siswa"] },
  { id: 33, title: "Beasiswa Papua", url: "https://beasiswa.papua.go.id", description: "Portal beasiswa Pemprov Papua", category: "Pendidikan", tags: ["beasiswa", "beasiswa papua"] },
  { id: 34, title: "SMK Negeri 1 Jayapura", url: "https://smkn1jayapura.sch.id", description: "SMK Negeri 1 Jayapura", category: "Pendidikan", tags: ["smk", "vokasi"] },
  { id: 35, title: "SMA Negeri 1 Jayapura", url: "https://sman1jayapura.sch.id", description: "SMA Negeri 1 Jayapura", category: "Pendidikan", tags: ["sma"] },

  // KESEHATAN
  { id: 36, title: "Dinas Kesehatan Papua", url: "https://dinkes.papua.go.id", description: "Dinas Kesehatan Provinsi Papua", category: "Kesehatan", tags: ["dinkes", "kesehatan"] },
  { id: 37, title: "RSUD Jayapura", url: "https://rsudjayapura.go.id", description: "Rumah Sakit Umum Daerah Jayapura", category: "Kesehatan", tags: ["rsud", "rumah sakit", "jayapura"] },
  { id: 38, title: "RSUP Jayapura", url: "https://rsupjayapura.go.id", description: "RS Umum Pusat Jayapura - RS Kelas A", category: "Kesehatan", tags: ["rsup", "rumah sakit"] },
  { id: 39, title: "Dinkes Papua Barat", url: "https://dinkes.papuabarat.go.id", description: "Dinas Kesehatan Papua Barat", category: "Kesehatan", tags: ["dinkes", "papuabarat"] },
  { id: 40, title: "BPJS Kesehatan Papua", url: "https://bpjs-kesehatan.go.id", description: "BPJS Kesehatan - Cek kepesertaan, faskes", category: "Kesehatan", tags: ["bpjs", "jkn", "kartu sehat"] },
  { id: 41, title: "Pcare BPJS", url: "https://pcare.bpjs-kesehatan.go.id", description: "P-Care sistem pelayanan BPJS Fasilitas Kesehatan", category: "Kesehatan", tags: ["pcare", "bpjs", "faskes"] },
  { id: 42, title: "rs-online.kemkes.go.id", url: "https://rs-online.kemkes.go.id", description: "Info RS & tempat tidur seluruh Indonesia termasuk Papua", category: "Kesehatan", tags: ["rumah sakit", "online", "tempat tidur"] },
  { id: 43, title: "Halodoc PNG specialist", url: "https://www.halodoc.com", description: "Konsultasi dokter online terjangkau", category: "Kesehatan", tags: ["telemedicine", "dokter online"] },
  { id: 44, title: "Alodokter", url: "https://www.alodokter.com", description: "Konsultasi kesehatan & artikel medis", category: "Kesehatan", tags: ["kesehatan", "dokter online"] },
  { id: 45, title: "Siranap Kemenkes", url: "https://yankes.kemkes.go.id/app/siranap", description: "Informasi ketersediaan tempat tidur RS se-Papua", category: "Kesehatan", tags: ["siranap", "tempat tidur", "igd"] },

  // EKONOMI & BISNIS
  { id: 46, title: "OSS Papua", url: "https://oss.go.id", description: "Online Single Submission - Izin Usaha Papua", category: "Ekonomi & Bisnis", tags: ["oss", "izin usaha", "nib"] },
  { id: 47, title: "DPMPTSP Papua", url: "https://dpmptsp.papua.go.id", description: "Dinas Penanaman Modal Papua - izin & investasi", category: "Ekonomi & Bisnis", tags: ["dpmptsp", "investasi", "izin"] },
  { id: 48, title: "KADIN Papua", url: "https://kadinpapua.or.id", description: "Kamar Dagang dan Industri Papua", category: "Ekonomi & Bisnis", tags: ["kadin", "bisnis", "pengusaha"] },
  { id: 49, title: "BRI Papua", url: "https://bri.co.id", description: "Bank BRI - layanan perbankan Papua", category: "Ekonomi & Bisnis", tags: ["bri", "bank", "keuangan"] },
  { id: 50, title: "Bank Papua", url: "https://www.bankpapua.co.id", description: "Bank Pembangunan Daerah Papua", category: "Ekonomi & Bisnis", tags: ["bank papua", "bpd", "keuangan daerah"] },
  { id: 51, title: "Mandiri Papua", url: "https://bankmandiri.co.id", description: "Bank Mandiri layanan Papua", category: "Ekonomi & Bisnis", tags: ["mandiri", "bank"] },
  { id: 52, title: "Disperindag Papua", url: "https://disperindag.papua.go.id", description: "Dinas Perindustrian dan Perdagangan Papua", category: "Ekonomi & Bisnis", tags: ["perindag", "industri", "perdagangan"] },
  { id: 53, title: "BUMD Papua", url: "https://bumd.papua.go.id", description: "Badan Usaha Milik Daerah Papua", category: "Ekonomi & Bisnis", tags: ["bumd", "bumn daerah"] },
  { id: 54, title: "Tokopedia Papua", url: "https://www.tokopedia.com/search?q=papua", description: "Cari produk lokal Papua di Tokopedia", category: "Ekonomi & Bisnis", tags: ["ecommerce", "tokopedia", "produk lokal"] },
  { id: 55, title: "Shopee Papua", url: "https://shopee.co.id/search?keyword=papua", description: "Cari produk Papua di Shopee", category: "Ekonomi & Bisnis", tags: ["shopee", "ecommerce"] },

  // HUKUM & BANTUAN
  { id: 56, title: "LBH Papua", url: "https://lbhpapua.or.id", description: "Lembaga Bantuan Hukum Papua - bantuan hukum gratis", category: "Hukum & Bantuan", tags: ["lbh", "bantuan hukum", "gratis"] },
  { id: 57, title: "Pengadilan Negeri Jayapura", url: "https://pn-jayapura.go.id", description: "Pengadilan Negeri Jayapura", category: "Hukum & Bantuan", tags: ["pengadilan", "hukum"] },
  { id: 58, title: "Polda Papua", url: "https://papuapolda.com", description: "Kepolisian Daerah Papua - lapor online", category: "Hukum & Bantuan", tags: ["polisi", "keamanan", "lapor"] },
  { id: 59, title: "Kejaksaan Tinggi Papua", url: "https://kejati-papua.go.id", description: "Kejaksaan Tinggi Papua", category: "Hukum & Bantuan", tags: ["kejaksaan", "hukum"] },
  { id: 60, title: "Lapor.go.id", url: "https://www.lapor.go.id", description: "Layanan Aspirasi dan Pengaduan Online Rakyat", category: "Hukum & Bantuan", tags: ["lapor", "pengaduan", "aspirasi"] },
  { id: 61, title: "Ombudsman Papua", url: "https://ombudsman.go.id/perwakilan/papua", description: "Ombudsman Perwakilan Papua", category: "Hukum & Bantuan", tags: ["ombudsman", "pengaduan"] },
  { id: 62, title: "YLBHI", url: "https://ylbhi.or.id", description: "Yayasan LBH Indonesia - sumber bantuan hukum", category: "Hukum & Bantuan", tags: ["ylbhi", "bantuan hukum"] },
  { id: 63, title: "BPHN Kemenkumham", url: "https://bphn.go.id", description: "Badan Pembinaan Hukum Nasional - konsultasi hukum gratis", category: "Hukum & Bantuan", tags: ["bphn", "hukum", "gratis"] },
  { id: 64, title: "PPPA Papua", url: "https://pppa.papua.go.id", description: "Dinas PPPA Papua - perlindungan perempuan & anak", category: "Hukum & Bantuan", tags: ["pppa", "perempuan", "anak"] },
  { id: 65, title: "Dinsos Papua", url: "https://dinsos.papua.go.id", description: "Dinas Sosial Papua - bansos & bantuan sosial", category: "Hukum & Bantuan", tags: ["dinsos", "bansos", "sosial"] },

  // MEDIA & BERITA
  { id: 66, title: "Papua No Satu", url: "https://papuanosatu.com", description: "Portal berita Papua terkini", category: "Media & Berita", tags: ["berita", "papua", "news"] },
  { id: 67, title: "Cenderawasih Pos", url: "https://cenderawasihpos.jawapos.com", description: "Koran Cenderawasih Pos - media cetak Papua", category: "Media & Berita", tags: ["koran", "media", "cepos"] },
  { id: 68, title: "Papua Today", url: "https://papuatoday.com", description: "Berita Papua Hari Ini", category: "Media & Berita", tags: ["berita", "news"] },
  { id: 69, title: "RRI Jayapura", url: "https://rri.co.id/jayapura", description: "Radio Republik Indonesia Jayapura", category: "Media & Berita", tags: ["radio", "rri", "penyiaran"] },
  { id: 70, title: "TVRI Papua", url: "https://tvri.go.id/papua", description: "TVRI Papua streaming online", category: "Media & Berita", tags: ["tvri", "tv", "streaming"] },
  { id: 71, title: "Antara Papua", url: "https://papua.antaranews.com", description: "Berita Antara Papua - kantor berita nasional", category: "Media & Berita", tags: ["antara", "berita resmi"] },
  { id: 72, title: "Jubi Papua", url: "https://jubi.id", description: "Jurnalis Independen Papua", category: "Media & Berita", tags: ["jubi", "jurnalis", "independen"] },
  { id: 73, title: "Tabloid Jubi", url: "https://tabloidjubi.com", description: "Tabloid Jubi berita Papua", category: "Media & Berita", tags: ["jubi", "tabloid"] },
  { id: 74, title: "Papua Inside", url: "https://papuainside.com", description: "Informasi dalam Papua", category: "Media & Berita", tags: ["berita", "papua"] },
  { id: 75, title: "Berita Papua", url: "https://beritapapua.id", description: "Portal berita Papua terpercaya", category: "Media & Berita", tags: ["berita", "portal"] },

  // TRANSPORTASI
  { id: 76, title: "Bandara Sentani", url: "https://sentani-airport.co.id", description: "Bandara Internasional Dortheys Hiyo Eluay Sentani", category: "Transportasi", tags: ["bandara", "pesawat", "sentani"] },
  { id: 77, title: "Garuda Indonesia", url: "https://www.garuda-indonesia.com", description: "Garuda Indonesia - penerbangan Papua", category: "Transportasi", tags: ["garuda", "pesawat"] },
  { id: 78, title: "Lion Air", url: "https://www.lionair.co.id", description: "Lion Air - penerbangan ke Papua", category: "Transportasi", tags: ["lion air", "pesawat"] },
  { id: 79, title: "Batik Air", url: "https://www.batikair.com", description: "Batik Air - penerbangan Papua", category: "Transportasi", tags: ["batik air", "pesawat"] },
  { id: 80, title: "Wings Air", url: "https://www.lionair.co.id/wingsair", description: "Wings Air - penerbangan perintis Papua", category: "Transportasi", tags: ["wings air", "perintis"] },
  { id: 81, title: "Pelni Papua", url: "https://www.pelni.co.id", description: "Pelayaran Nasional Indonesia - kapal laut Papua", category: "Transportasi", tags: ["pelni", "kapal", "laut"] },
  { id: 82, title: "TransPapua", url: "https://dishub.papua.go.id", description: "Dinas Perhubungan Papua - info transportasi darat", category: "Transportasi", tags: ["dishub", "transportasi"] },
  { id: 83, title: "Traveloka Papua", url: "https://www.traveloka.com", description: "Pesan tiket pesawat & hotel ke Papua", category: "Transportasi", tags: ["traveloka", "tiket", "hotel"] },
  { id: 84, title: "Tiket.com Papua", url: "https://www.tiket.com", description: "Tiket pesawat & kereta ke Papua", category: "Transportasi", tags: ["tiket", "pesawat"] },
  { id: 85, title: "AirAsia Papua", url: "https://www.airasia.com", description: "AirAsia penerbangan Papua", category: "Transportasi", tags: ["airasia", "pesawat"] },

  // PARIWISATA
  { id: 86, title: "Raja Ampat Official", url: "https://www.rajaampat.go.id", description: "Website resmi pariwisata Raja Ampat", category: "Pariwisata", tags: ["raja ampat", "wisata", "diving"] },
  { id: 87, title: "Dinas Pariwisata Papua", url: "https://disparpora.papua.go.id", description: "Dinas Pariwisata Papua", category: "Pariwisata", tags: ["pariwisata", "wisata"] },
  { id: 88, title: "Wonderful Papua", url: "https://www.indonesia.travel/papua", description: "Wisata Papua dari Kemenpar", category: "Pariwisata", tags: ["wisata", "tourism", "indonesia"] },
  { id: 89, title: "Raja Ampat Dive Lodge", url: "https://www.rajaampat.com", description: "Info diving dan resort Raja Ampat", category: "Pariwisata", tags: ["diving", "raja ampat"] },
  { id: 90, title: "Lorentz National Park", url: "https://lorentznationalpark.org", description: "Taman Nasional Lorentz UNESCO - Papua", category: "Pariwisata", tags: ["lorentz", "taman nasional", "unesco"] },
  { id: 91, title: "Mansoben Ekowisata", url: "https://ekowisatapapua.com", description: "Ekowisata Papua", category: "Pariwisata", tags: ["ekowisata", "alam"] },
  { id: 92, title: "Hotel Swissbell Jayapura", url: "https://www.swissbelhotel.com/jayapura", description: "Hotel bintang 4 Jayapura", category: "Pariwisata", tags: ["hotel", "jayapura", "menginap"] },
  { id: 93, title: "Aston Jayapura", url: "https://www.astonhotels.com/jayapura", description: "Hotel Aston Jayapura", category: "Pariwisata", tags: ["hotel", "jayapura"] },
  { id: 94, title: "Booking Papua", url: "https://www.booking.com/searchresults/id/papua.html", description: "Booking hotel di Papua", category: "Pariwisata", tags: ["booking", "hotel"] },
  { id: 95, title: "Airbnb Papua", url: "https://www.airbnb.com/s/Papua--Indonesia", description: "Sewa penginapan unik di Papua", category: "Pariwisata", tags: ["airbnb", "penginapan"] },

  // ORGANISASI
  { id: 96, title: "MRP Papua", url: "https://mrp.papua.go.id", description: "Majelis Rakyat Papua", category: "Organisasi", tags: ["mrp", "adat", "oap"] },
  { id: 97, title: "KNPI Papua", url: "https://knpipapua.or.id", description: "Komite Nasional Pemuda Indonesia Papua", category: "Organisasi", tags: ["knpi", "pemuda"] },
  { id: 98, title: "Muhammadiyah Papua", url: "https://muhammadiyahpapua.or.id", description: "Muhammadiyah Wilayah Papua", category: "Organisasi", tags: ["muhammadiyah", "organisasi islam"] },
  { id: 99, title: "NU Papua", url: "https://nupapua.or.id", description: "Nahdlatul Ulama Papua", category: "Organisasi", tags: ["nu", "nahdlatul ulama"] },
  { id: 100, title: "BKKBN Papua", url: "https://papua.bkkbn.go.id", description: "BKKBN Papua - keluarga berencana", category: "Organisasi", tags: ["bkkbn", "kb", "keluarga"] },
  { id: 101, title: "ForKopimda Papua", url: "https://papua.go.id/forkopimda", description: "Forum Koordinasi Pimpinan Daerah Papua", category: "Organisasi", tags: ["forkopimda", "koordinasi"] },
  { id: 102, title: "PWNU Papua", url: "https://pwnu-papua.or.id", description: "Pengurus Wilayah NU Papua", category: "Organisasi", tags: ["pwnu", "nu"] },
  { id: 103, title: "Pramuka Papua", url: "https://kwartir-papua.or.id", description: "Kwartir Daerah Pramuka Papua", category: "Organisasi", tags: ["pramuka", "kwarda"] },
  { id: 104, title: "PMI Papua", url: "https://pmi.papua.or.id", description: "Palang Merah Indonesia Papua - donor darah", category: "Organisasi", tags: ["pmi", "donor darah"] },
  { id: 105, title: "HIPMI Papua", url: "https://hippmi-papua.or.id", description: "HIPMI Pengusaha muda Papua", category: "Organisasi", tags: ["hipmi", "pengusaha muda"] },

  // TEKNOLOGI
  { id: 106, title: "Kominfo Papua Digital", url: "https://digital.papua.go.id", description: "Portal digitalisasi Papua", category: "Teknologi", tags: ["digital", "teknologi"] },
  { id: 107, title: "BSSN Papua", url: "https://bssn.go.id", description: "Badan Siber dan Sandi Negara - keamanan digital", category: "Teknologi", tags: ["bssn", "siber", "keamanan"] },
  { id: 108, title: "Startup Papua", url: "https://startuppapua.com", description: "Ekosistem startup Papua", category: "Teknologi", tags: ["startup", "teknologi", "inovatif"] },
  { id: 109, title: "GoPapua", url: "https://gopapua.id", description: "Layanan digital Papua", category: "Teknologi", tags: ["gopapua", "digital"] },
  { id: 110, title: "Papua Digital Hub", url: "https://digitalhub.papua.go.id", description: "Hub digital Papua - inovasi & teknologi", category: "Teknologi", tags: ["digital hub", "inovasi"] },
  { id: 111, title: "BAKTI Papua", url: "https://www.baktikominfo.id", description: "Akses internet pelosok Papua via BAKTI Kominfo", category: "Teknologi", tags: ["bakti", "internet", "akses"] },
  { id: 112, title: "PANDI Papua", url: "https://pandi.id", description: "Pengelola Nama Domain Indonesia", category: "Teknologi", tags: ["domain", "pandi"] },

  // SOSIAL & BUDAYA
  { id: 113, title: "Museum Papua", url: "https://museum.papua.go.id", description: "Museum Negeri Papua - sejarah dan budaya", category: "Sosial & Budaya", tags: ["museum", "budaya", "sejarah"] },
  { id: 114, title: "BPNB Papua", url: "https://kebudayaan.kemdikbud.go.id/bpnbpapua", description: "Balai Pelestarian Nilai Budaya Papua", category: "Sosial & Budaya", tags: ["budaya", "pelestarian"] },
  { id: 115, title: "Adat Papua", url: "https://adatpapua.com", description: "Portal adat dan budaya Papua", category: "Sosial & Budaya", tags: ["adat", "budaya", "tradisi"] },
  { id: 116, title: "Perpustakaan Papua", url: "https://perpustakaan.papua.go.id", description: "Perpustakaan Daerah Papua", category: "Sosial & Budaya", tags: ["perpustakaan", "buku"] },
  { id: 117, title: "Komunitas Papua", url: "https://komunitaspapua.org", description: "Komunitas sosial Papua", category: "Sosial & Budaya", tags: ["komunitas", "sosial"] },
  { id: 118, title: "Festival Budaya Papua", url: "https://festivalpapua.co.id", description: "Event dan festival budaya Papua", category: "Sosial & Budaya", tags: ["festival", "budaya", "event"] },
  { id: 119, title: "Suku & Klan Papua", url: "https://sukupapua.id", description: "Dokumentasi suku dan klan Papua", category: "Sosial & Budaya", tags: ["suku", "klan", "adat"] },
  { id: 120, title: "Papua Heritage", url: "https://papuaheritage.id", description: "Warisan budaya Papua", category: "Sosial & Budaya", tags: ["heritage", "warisan", "budaya"] },

  // PERTANIAN & PERIKANAN
  { id: 121, title: "Dinas Pertanian Papua", url: "https://distanipapua.go.id", description: "Dinas Pertanian Papua - pertanian & pangan", category: "Pertanian & Perikanan", tags: ["pertanian", "pangan"] },
  { id: 122, title: "Dinas Perikanan Papua", url: "https://dkp.papua.go.id", description: "Dinas Kelautan dan Perikanan Papua", category: "Pertanian & Perikanan", tags: ["perikanan", "kelautan"] },
  { id: 123, title: "BPTP Papua", url: "https://papua.litbang.pertanian.go.id", description: "Balai Pengkajian Teknologi Pertanian Papua", category: "Pertanian & Perikanan", tags: ["bptp", "teknologi pertanian"] },
  { id: 124, title: "Bulog Papua", url: "https://www.bulog.co.id/divre/papua", description: "Bulog Divisi Regional Papua - ketahanan pangan", category: "Pertanian & Perikanan", tags: ["bulog", "beras", "pangan"] },
  { id: 125, title: "Distanbun Papua Barat", url: "https://distanbun.papuabarat.go.id", description: "Dinas Pertanian Papua Barat", category: "Pertanian & Perikanan", tags: ["pertanian", "papuabarat"] },

  // SECRET / TERSEMBUNYI - PEMERINTAHAN & ANGGARAN
  { id: 126, title: "Data Harga Pangan Papua (BPS)", url: "https://papua.bps.go.id/subject/9/harga-perdagangan-besar.html", description: "Data harga perdagangan besar Papua dari BPS - jarang diketahui publik", category: "Pemerintahan", tags: ["harga", "pangan", "bps", "data"], isSecret: true },
  { id: 127, title: "e-Monev Papua (APBD)", url: "https://emonev.papua.go.id", description: "Monitoring Evaluasi APBD Papua - akses monitoring anggaran daerah secara real-time", category: "Pemerintahan", tags: ["apbd", "anggaran", "monitoring"], isSecret: true },
  { id: 128, title: "SIPD Papua", url: "https://sipd.kemendagri.go.id", description: "Sistem Informasi Pemerintahan Daerah - data perencanaan & keuangan Papua", category: "Pemerintahan", tags: ["sipd", "data pemerintah"], isSecret: true },
  { id: 129, title: "SIRUP LKPP Papua", url: "https://sirup.lkpp.go.id/sirup/home/prov32", description: "Sistem Informasi Rencana Umum Pengadaan Papua - lihat semua tender & proyek pemerintah", category: "Pemerintahan", tags: ["sirup", "tender", "pengadaan"], isSecret: true },
  { id: 130, title: "OpenData Papua", url: "https://data.papua.go.id", description: "Portal data terbuka Papua - ribuan dataset statistik, sosial, ekonomi Papua", category: "Teknologi", tags: ["opendata", "dataset", "terbuka"], isSecret: true },
  { id: 131, title: "KPU Papua - Data Pemilu", url: "https://papua.kpu.go.id", description: "KPU Papua - data pemilu, caleg, hasil pilkada seluruh Papua", category: "Pemerintahan", tags: ["kpu", "pemilu", "pilkada"], isSecret: true },
  { id: 132, title: "Cek TKA di Papua", url: "https://tka-online.kemnaker.go.id", description: "Cek izin Tenaga Kerja Asing yang bekerja di Papua - transparansi ketenagakerjaan", category: "Hukum & Bantuan", tags: ["tka", "tenaga kerja asing"], isSecret: true },
  { id: 133, title: "NPWP & Pajak Online Papua", url: "https://ereg.pajak.go.id", description: "Daftar NPWP online & lapor pajak - berlaku seluruh Indonesia termasuk Papua", category: "Ekonomi & Bisnis", tags: ["pajak", "npwp"], isSecret: true },
  { id: 134, title: "SID Dana Desa Papua", url: "https://sid.kemendesa.go.id", description: "Sistem Informasi Desa - cek dana desa, APBDes, dan program desa se-Papua", category: "Pemerintahan", tags: ["dana desa", "sid", "desa"], isSecret: true },
  { id: 135, title: "SAKTI Papua (Kemenkeu)", url: "https://sakti.kemenkeu.go.id", description: "Sistem Anggaran KPPN - monitoring anggaran pusat yang masuk ke Papua", category: "Pemerintahan", tags: ["sakti", "kppn", "anggaran"], isSecret: true },

  // SECRET - KESEHATAN & SOSIAL
  { id: 136, title: "SATU SEHAT Papua", url: "https://satusehat.kemkes.go.id", description: "Platform kesehatan digital nasional - rekam medis elektronik Papua", category: "Kesehatan", tags: ["satu sehat", "rekam medis", "digital"], isSecret: true },
  { id: 137, title: "Cek Faskes BPJS Papua", url: "https://faskes.bpjs-kesehatan.go.id/aplicares/", description: "Cek fasilitas kesehatan BPJS terdekat di Papua - jarang diketahui", category: "Kesehatan", tags: ["faskes", "bpjs", "puskesmas"], isSecret: true },
  { id: 138, title: "DTKS Kemensos (Cek Bansos)", url: "https://dtks.kemensos.go.id", description: "Data Terpadu Kesejahteraan Sosial - cek apakah nama kamu terdaftar penerima bansos", category: "Hukum & Bantuan", tags: ["dtks", "bansos", "miskin"], isSecret: true },
  { id: 139, title: "Cek Bansos Kemensos", url: "https://cekbansos.kemensos.go.id", description: "Cek kepesertaan PKH, BPNT, BST, dan semua bansos Kemensos dengan NIK", category: "Hukum & Bantuan", tags: ["cek bansos", "pkh", "bpnt", "nik"], isSecret: true },
  { id: 140, title: "Lapor Korupsi KPK", url: "https://kws.kpk.go.id", description: "Laporkan korupsi di Papua langsung ke KPK - anonim dan terlindungi", category: "Hukum & Bantuan", tags: ["kpk", "korupsi", "lapor"], isSecret: true },
  { id: 141, title: "Ombudsman RI - Lapor Maladmin", url: "https://ombudsman.go.id/pengaduan", description: "Laporkan maladministrasi pelayanan publik Papua ke Ombudsman RI", category: "Hukum & Bantuan", tags: ["ombudsman", "maladministrasi", "lapor"], isSecret: true },
  { id: 142, title: "SIPP Pengadilan Papua", url: "https://sipp.pn-jayapura.go.id", description: "Sistem Informasi Penelusuran Perkara - cek status perkara di PN Jayapura", category: "Hukum & Bantuan", tags: ["sipp", "perkara", "pengadilan"], isSecret: true },
  { id: 143, title: "e-Court Mahkamah Agung", url: "https://ecourt.mahkamahagung.go.id", description: "Daftar & pantau perkara pengadilan online - berlaku di Papua", category: "Hukum & Bantuan", tags: ["ecourt", "mahkamah agung", "perkara"], isSecret: true },

  // SECRET - PENDIDIKAN & BEASISWA
  { id: 144, title: "Beasiswa LPDP Papua", url: "https://beasiswalpdp.kemenkeu.go.id", description: "Beasiswa LPDP - ada afirmasi khusus Papua & 3T, banyak yang tidak tahu", category: "Pendidikan", tags: ["lpdp", "beasiswa", "afirmasi", "papua"], isSecret: true },
  { id: 145, title: "Beasiswa Afirmasi Papua (ADIK)", url: "https://adik.kemdikbud.go.id", description: "Program Afirmasi Pendidikan Tinggi khusus OAP - kuliah gratis di PTN terbaik", category: "Pendidikan", tags: ["adik", "afirmasi", "oap", "kuliah gratis"], isSecret: true },
  { id: 146, title: "Beasiswa Unggulan Kemendikbud", url: "https://beasiswaunggulan.kemdikbud.go.id", description: "Beasiswa Unggulan untuk putra-putri Papua berprestasi", category: "Pendidikan", tags: ["beasiswa unggulan", "kemendikbud"], isSecret: true },
  { id: 147, title: "SSCASN BKN (CPNS/PPPK)", url: "https://sscasn.bkn.go.id", description: "Portal resmi daftar CPNS & PPPK - satu-satunya portal resmi, hindari penipuan", category: "Pendidikan", tags: ["sscasn", "cpns", "pppk", "asn"], isSecret: true },
  { id: 148, title: "Ruang Guru Papua", url: "https://ruangguru.com", description: "Platform belajar online - ada program khusus Papua & 3T bersubsidi", category: "Pendidikan", tags: ["ruangguru", "belajar online", "3t"], isSecret: true },
  { id: 149, title: "Kampus Merdeka Papua", url: "https://kampusmerdeka.kemdikbud.go.id", description: "Program Kampus Merdeka - magang, pertukaran mahasiswa, ada kuota Papua", category: "Pendidikan", tags: ["kampus merdeka", "magang", "mahasiswa"], isSecret: true },

  // SECRET - EKONOMI & BISNIS TERSEMBUNYI
  { id: 150, title: "Kredit Usaha Rakyat (KUR) Papua", url: "https://kur.ekon.go.id", description: "Cek bank penyalur KUR di Papua - pinjaman usaha bunga rendah 6% per tahun", category: "Ekonomi & Bisnis", tags: ["kur", "kredit usaha", "pinjaman", "bunga rendah"], isSecret: true },
  { id: 151, title: "LPDB KUMKM Papua", url: "https://lpdb.id", description: "Lembaga Pengelola Dana Bergulir KUMKM - pinjaman modal usaha koperasi Papua", category: "Ekonomi & Bisnis", tags: ["lpdb", "koperasi", "modal usaha"], isSecret: true },
  { id: 152, title: "Hibah UMKM Kemenkop", url: "https://kemenkopukm.go.id/program", description: "Program hibah & bantuan modal UMKM Papua dari Kemenkop - banyak yang tidak tahu", category: "Ekonomi & Bisnis", tags: ["hibah", "umkm", "bantuan modal"], isSecret: true },
  { id: 153, title: "PIHPS Nasional (Harga Pangan)", url: "https://hargapangan.id", description: "Pusat Informasi Harga Pangan Strategis - data harga real-time seluruh Papua", category: "Ekonomi & Bisnis", tags: ["harga pangan", "pihps", "real-time"], isSecret: true },
  { id: 154, title: "Sistem Resi Gudang Papua", url: "https://srg.bappebti.go.id", description: "Sistem Resi Gudang - petani Papua bisa gadaikan hasil panen untuk modal", category: "Pertanian & Perikanan", tags: ["resi gudang", "petani", "modal"], isSecret: true },
  { id: 155, title: "e-Katalog LKPP Papua", url: "https://e-katalog.lkpp.go.id", description: "Katalog elektronik pengadaan pemerintah - UMKM Papua bisa daftar jadi vendor", category: "Ekonomi & Bisnis", tags: ["e-katalog", "vendor", "pengadaan"], isSecret: true },
  { id: 156, title: "Inkubator Bisnis Papua", url: "https://inkubator.kemenkopukm.go.id", description: "Program inkubator bisnis Kemenkop - pendampingan startup & UMKM Papua", category: "Ekonomi & Bisnis", tags: ["inkubator", "startup", "umkm"], isSecret: true },

  // SECRET - PERTANIAN & PERIKANAN TERSEMBUNYI
  { id: 157, title: "SIMLUHTAN Papua", url: "https://simluhtan.pertanian.go.id", description: "Sistem Informasi Manajemen Penyuluhan Pertanian - cari penyuluh pertanian di Papua", category: "Pertanian & Perikanan", tags: ["penyuluh", "pertanian", "simluhtan"], isSecret: true },
  { id: 158, title: "Asuransi Usaha Tani Papua (AUTP)", url: "https://psp.pertanian.go.id/autp", description: "Asuransi pertanian subsidi pemerintah - premi hanya Rp 36.000/ha untuk petani Papua", category: "Pertanian & Perikanan", tags: ["asuransi tani", "autp", "subsidi"], isSecret: true },
  { id: 159, title: "Kartu Tani Papua", url: "https://kartu-tani.pertanian.go.id", description: "Kartu Tani - akses pupuk subsidi & kredit pertanian untuk petani Papua", category: "Pertanian & Perikanan", tags: ["kartu tani", "pupuk subsidi"], isSecret: true },
  { id: 160, title: "SIKePi KKP Papua", url: "https://sikepi.kkp.go.id", description: "Sistem Informasi Kelautan & Perikanan - data potensi perikanan Papua", category: "Pertanian & Perikanan", tags: ["sikepi", "kkp", "perikanan"], isSecret: true },
  { id: 161, title: "Asuransi Nelayan Papua (ASURANSI)", url: "https://psp.pertanian.go.id/asuransi-nelayan", description: "Asuransi jiwa nelayan subsidi - premi Rp 175.000/tahun, klaim Rp 200 juta", category: "Pertanian & Perikanan", tags: ["asuransi nelayan", "jiwa", "subsidi"], isSecret: true },

  // SECRET - HUKUM & HAK WARGA
  { id: 162, title: "Pos Bantuan Hukum (Posbakum)", url: "https://badilag.mahkamahagung.go.id/posbakum", description: "Pos Bantuan Hukum gratis di pengadilan - warga Papua bisa konsultasi hukum gratis", category: "Hukum & Bantuan", tags: ["posbakum", "bantuan hukum gratis", "pengadilan"], isSecret: true },
  { id: 163, title: "Mediasi Online Kemenkumham", url: "https://mediasi.ahu.go.id", description: "Mediasi sengketa online gratis - alternatif pengadilan untuk warga Papua", category: "Hukum & Bantuan", tags: ["mediasi", "sengketa", "gratis"], isSecret: true },
  { id: 164, title: "Cek Sertifikat Tanah BPN", url: "https://bhumi.atrbpn.go.id", description: "Cek status sertifikat tanah Papua secara online - BHUMI ATR/BPN", category: "Hukum & Bantuan", tags: ["sertifikat tanah", "bpn", "bhumi"], isSecret: true },
  { id: 165, title: "Pendaftaran Tanah Sistematis (PTSL)", url: "https://ptsl.atrbpn.go.id", description: "Program sertifikasi tanah gratis PTSL - warga Papua bisa daftar sertifikat tanah gratis", category: "Hukum & Bantuan", tags: ["ptsl", "sertifikat tanah gratis", "bpn"], isSecret: true },
  { id: 166, title: "Lapor SP4N Papua", url: "https://www.lapor.go.id", description: "Sistem Pengelolaan Pengaduan Pelayanan Publik Nasional - lapor masalah pelayanan Papua", category: "Hukum & Bantuan", tags: ["sp4n", "lapor", "pengaduan"], isSecret: true },
  { id: 167, title: "Whistleblower KPK Papua", url: "https://kws.kpk.go.id", description: "Laporkan korupsi secara anonim ke KPK - identitas terlindungi hukum", category: "Hukum & Bantuan", tags: ["whistleblower", "kpk", "anonim"], isSecret: true },

  // SECRET - KESEHATAN TERSEMBUNYI
  { id: 168, title: "Cek Obat BPOM", url: "https://cekbpom.pom.go.id", description: "Cek keaslian obat & makanan yang beredar di Papua - hindari obat palsu", category: "Kesehatan", tags: ["bpom", "obat", "cek keaslian"], isSecret: true },
  { id: 169, title: "Telemedicine Kemenkes Papua", url: "https://telemedicine.kemkes.go.id", description: "Konsultasi dokter online gratis dari Kemenkes - berlaku untuk warga Papua", category: "Kesehatan", tags: ["telemedicine", "dokter gratis", "kemenkes"], isSecret: true },
  { id: 170, title: "Cek Nakes Terdaftar", url: "https://nakes.kemkes.go.id", description: "Cek apakah dokter/perawat di Papua terdaftar resmi di Kemenkes", category: "Kesehatan", tags: ["nakes", "dokter", "terdaftar"], isSecret: true },
  { id: 171, title: "Hotline Kesehatan Jiwa Papua", url: "https://sejiwa.or.id", description: "Hotline kesehatan jiwa 119 ext 8 - konseling gratis 24 jam untuk warga Papua", category: "Kesehatan", tags: ["kesehatan jiwa", "hotline", "konseling gratis"], isSecret: true },
  { id: 172, title: "Cek Puskesmas Papua Online", url: "https://yankes.kemkes.go.id/app/fasyankes", description: "Cari puskesmas & faskes terdekat di seluruh Papua secara online", category: "Kesehatan", tags: ["puskesmas", "faskes", "terdekat"], isSecret: true },

  // SECRET - TEKNOLOGI & DIGITAL
  { id: 173, title: "Akses Internet Gratis BAKTI", url: "https://www.baktikominfo.id/id/informasi/program", description: "Program internet gratis BAKTI Kominfo untuk daerah 3T Papua - cara mendaftar", category: "Teknologi", tags: ["internet gratis", "bakti", "3t", "pelosok"], isSecret: true },
  { id: 174, title: "Pelatihan Digital Prakerja", url: "https://www.prakerja.go.id", description: "Kartu Prakerja - pelatihan digital & insentif Rp 600.000 untuk warga Papua", category: "Teknologi", tags: ["prakerja", "pelatihan", "insentif"], isSecret: true },
  { id: 175, title: "Digital Talent Scholarship", url: "https://digitalent.kominfo.go.id", description: "Beasiswa pelatihan digital gratis Kominfo - tersedia untuk warga Papua", category: "Teknologi", tags: ["digital talent", "beasiswa digital", "kominfo"], isSecret: true },
  { id: 176, title: "UMKM Go Digital Papua", url: "https://umkmgodigital.id", description: "Program digitalisasi UMKM Papua - daftar toko online gratis", category: "Teknologi", tags: ["umkm digital", "toko online", "gratis"], isSecret: true },

  // SECRET - SOSIAL & BUDAYA TERSEMBUNYI
  { id: 177, title: "Warisan Budaya Takbenda Papua", url: "https://warisanbudaya.kemdikbud.go.id/?newdetail&detailCatat=5", description: "Daftar resmi warisan budaya takbenda Papua yang diakui negara", category: "Sosial & Budaya", tags: ["warisan budaya", "takbenda", "kemdikbud"], isSecret: true },
  { id: 178, title: "Peta Bahasa Papua", url: "https://petabahasa.kemdikbud.go.id", description: "Peta 300+ bahasa daerah Papua - dokumentasi linguistik Papua", category: "Sosial & Budaya", tags: ["bahasa daerah", "linguistik", "peta bahasa"], isSecret: true },
  { id: 179, title: "Repositori Budaya Papua", url: "https://repositori.kemdikbud.go.id", description: "Arsip digital budaya, naskah kuno, dan dokumentasi adat Papua", category: "Sosial & Budaya", tags: ["repositori", "arsip", "naskah kuno"], isSecret: true },
  { id: 180, title: "Cagar Budaya Papua", url: "https://cagarbudaya.kemdikbud.go.id", description: "Daftar cagar budaya yang dilindungi di Papua - situs bersejarah", category: "Sosial & Budaya", tags: ["cagar budaya", "situs bersejarah", "dilindungi"], isSecret: true },

  // SECRET - PENDIDIKAN TERSEMBUNYI TAMBAHAN
  { id: 181, title: "Beasiswa Papua Cerdas", url: "https://papuacerdas.kemdikbud.go.id", description: "Program beasiswa khusus Papua Cerdas - kuliah gratis di PTN untuk siswa berprestasi Papua", category: "Pendidikan", tags: ["papua cerdas", "beasiswa", "kuliah gratis"], isSecret: true },
  { id: 182, title: "Kip Kuliah Merdeka Papua", url: "https://kip-kuliah.kemdikbud.go.id", description: "Kartu Indonesia Pintar Kuliah - subsidi UKT hingga 100% untuk mahasiswa Papua", category: "Pendidikan", tags: ["kip kuliah", "ukt", "subsidi"], isSecret: true },
  { id: 183, title: "Program Sarjana Mendidik Papua", url: "https://sm3t.kemdikbud.go.id", description: "Sarjana Mendidik di Daerah Terdepan - kontrak kerja 4 tahun mengajar di Papua", category: "Pendidikan", tags: ["sm3t", "sarjana mendidik", "3t"], isSecret: true },
  { id: 184, title: "Beasiswa Djarum Plus Papua", url: "https://djarumbeasiswaplus.org", description: "Beasiswa Djarum Plus - ada kuota khusus Papua untuk kuliah S1/S2", category: "Pendidikan", tags: ["djarum plus", "beasiswa", "s1 s2"], isSecret: true },
  { id: 185, title: "Yayasan Supersemar Papua", url: "https://supersemar.org", description: "Beasiswa Supersemar - pendidikan gratis untuk anak Papua dari SD hingga kuliah", category: "Pendidikan", tags: ["supersemar", "pendidikan gratis", "sd kuliah"], isSecret: true },

  // SECRET - KESEHATAN TERSEMBUNYI TAMBAHAN
  { id: 186, title: "Program Sehat Indonesia Papua", url: "https://sehatindonesia.kemkes.go.id", description: "Program Sehat Indonesia - layanan kesehatan gratis untuk warga Papua miskin", category: "Kesehatan", tags: ["sehat indonesia", "gratis", "miskin"], isSecret: true },
  { id: 187, title: "Vaksinasi Gratis Papua", url: "https://vaksin.kemkes.go.id", description: "Jadwal vaksinasi gratis di seluruh Papua - cek lokasi terdekat", category: "Kesehatan", tags: ["vaksinasi", "gratis", "jadwal"], isSecret: true },
  { id: 188, title: "Program Jaminan Persalinan Papua", url: "https://jampersal.kemkes.go.id", description: "Jaminan Persalinan - persalinan gratis untuk ibu hamil Papua", category: "Kesehatan", tags: ["jampersal", "persalinan gratis", "ibu hamil"], isSecret: true },
  { id: 189, title: "Kesehatan Reproduksi Remaja Papua", url: "https://krr.kemkes.go.id", description: "Klinik Kesehatan Reproduksi Remaja - layanan kesehatan reproduksi gratis untuk remaja Papua", category: "Kesehatan", tags: ["krr", "reproduksi", "remaja"], isSecret: true },
  { id: 190, title: "Program Stunting Papua", url: "https://stunting.go.id", description: "Program pencegahan stunting - bantuan gizi gratis untuk anak Papua", category: "Kesehatan", tags: ["stunting", "gizi", "anak"], isSecret: true },

  // SECRET - EKONOMI & BISNIS TERSEMBUNYI TAMBAHAN
  { id: 191, title: "Kredit Mikro Papua", url: "https://kreditmikro.bri.co.id", description: "Kredit Mikro BRI - pinjaman kecil untuk UMKM Papua tanpa jaminan", category: "Ekonomi & Bisnis", tags: ["kredit mikro", "bri", "umkm"], isSecret: true },
  { id: 192, title: "Program Wirausaha Muda Papua", url: "https://wmp.kemenkopukm.go.id", description: "Wirausaha Muda Mandiri - pelatihan & modal usaha untuk pemuda Papua", category: "Ekonomi & Bisnis", tags: ["wirausaha muda", "pelatihan", "modal"], isSecret: true },
  { id: 193, title: "Bantuan Produktif Usaha Mikro Papua", url: "https://bpum.kemenkopukm.go.id", description: "BPUM - bantuan tunai Rp 2,4 juta untuk usaha mikro Papua terdampak COVID", category: "Ekonomi & Bisnis", tags: ["bpum", "bantuan tunai", "usaha mikro"], isSecret: true },
  { id: 194, title: "Marketplace UMKM Papua", url: "https://umkm.bumn.go.id", description: "Marketplace BUMN untuk UMKM Papua - akses pasar nasional", category: "Ekonomi & Bisnis", tags: ["marketplace", "umkm", "bumn"], isSecret: true },
  { id: 195, title: "Program Kewirausahaan Papua", url: "https://kewirausahaan.kemenkopukm.go.id", description: "Program Kewirausahaan Nasional - inkubasi bisnis untuk warga Papua", category: "Ekonomi & Bisnis", tags: ["kewirausahaan", "inkubasi", "bisnis"], isSecret: true },

  // SECRET - PERTANIAN & PERIKANAN TERSEMBUNYI TAMBAHAN
  { id: 196, title: "Bantuan Alsintan Papua", url: "https://alsintan.pertanian.go.id", description: "Bantuan Alat Mesin Pertanian - traktor, pompa air gratis untuk petani Papua", category: "Pertanian & Perikanan", tags: ["alsintan", "traktor", "gratis"], isSecret: true },
  { id: 197, title: "Program Food Estate Papua", url: "https://foodestate.pertanian.go.id", description: "Food Estate Papua - program pengembangan pertanian skala besar di Papua", category: "Pertanian & Perikanan", tags: ["food estate", "pertanian", "skala besar"], isSecret: true },
  { id: 198, title: "Bantuan Benih Papua", url: "https://benih.pertanian.go.id", description: "Bantuan benih unggul gratis untuk petani Papua - berbagai jenis tanaman", category: "Pertanian & Perikanan", tags: ["benih unggul", "gratis", "tanaman"], isSecret: true },
  { id: 199, title: "Program Mina Padi Papua", url: "https://minapadi.pertanian.go.id", description: "Mina Padi - bantuan pangan untuk petani Papua yang mengalami gagal panen", category: "Pertanian & Perikanan", tags: ["mina padi", "bantuan pangan", "gagal panen"], isSecret: true },
  { id: 200, title: "KUR Pertanian Papua", url: "https://kurpertanian.pertanian.go.id", description: "KUR Khusus Pertanian - kredit usaha tani bunga rendah untuk Papua", category: "Pertanian & Perikanan", tags: ["kur pertanian", "kredit", "bunga rendah"], isSecret: true },

  // SECRET - SOSIAL & BUDAYA TERSEMBUNYI TAMBAHAN
  { id: 201, title: "Program Keluarga Harapan Papua", url: "https://pkh.kemensos.go.id", description: "PKH Papua - bantuan tunai bersyarat untuk keluarga miskin Papua", category: "Sosial & Budaya", tags: ["pkh", "bantuan tunai", "keluarga miskin"], isSecret: true },
  { id: 202, title: "Bantuan Sosial Tunai Papua", url: "https://bst.kemensos.go.id", description: "BST Papua - bantuan tunai untuk keluarga terdampak COVID di Papua", category: "Sosial & Budaya", tags: ["bst", "bantuan tunai", "covid"], isSecret: true },
  { id: 203, title: "Program Indonesia Pintar Papua", url: "https://pip.kemdikbud.go.id", description: "PIP Papua - bantuan pendidikan untuk siswa miskin Papua", category: "Sosial & Budaya", tags: ["pip", "bantuan pendidikan", "siswa miskin"], isSecret: true },
  { id: 204, title: "BLT Dana Desa Papua", url: "https://bldd.kemendesa.go.id", description: "BLT-DD Papua - bantuan langsung tunai dari dana desa Papua", category: "Sosial & Budaya", tags: ["bldd", "bantuan tunai", "dana desa"], isSecret: true },
  { id: 205, title: "Jaminan Kesehatan Papua", url: "https://bpjs-kesehatan.go.id", description: "BPJS Kesehatan Papua - jaminan kesehatan gratis untuk warga miskin Papua", category: "Sosial & Budaya", tags: ["bpjs", "jaminan kesehatan", "gratis"], isSecret: true },

  // SECRET - TEKNOLOGI & DIGITAL TAMBAHAN
  { id: 206, title: "Internet Murah Papua", url: "https://usodigitalkemenkominfo.id", description: "Program USO Digital - internet murah untuk daerah 3T Papua", category: "Teknologi", tags: ["internet murah", "uso", "3t"], isSecret: true },
  { id: 207, title: "Digitalisasi Desa Papua", url: "https://desadigital.id", description: "Program Desa Digital - bantuan teknologi untuk desa Papua", category: "Teknologi", tags: ["desa digital", "teknologi", "desa"], isSecret: true },
  { id: 208, title: "Pelatihan Coding Papua", url: "https://coding.kominfo.go.id", description: "Pelatihan coding gratis Kominfo untuk pemuda Papua", category: "Teknologi", tags: ["coding", "pelatihan", "gratis"], isSecret: true },
  { id: 209, title: "Startup Papua", url: "https://startup.papua.go.id", description: "Inkubator startup Papua - pendampingan bisnis digital Papua", category: "Teknologi", tags: ["startup", "inkubator", "bisnis digital"], isSecret: true },
  { id: 210, title: "E-Government Papua", url: "https://papua.go.id/digital", description: "Portal e-government Papua - layanan publik online Papua", category: "Teknologi", tags: ["e-government", "layanan publik", "online"], isSecret: true },

  // INOVASI & STARTUP TERSEMBUNYI
  { id: 211, title: "500 Startups Indonesia", url: "https://500.co/indonesia", description: "Akselerator startup - pendanaan untuk startup Papua", category: "Inovasi & Startup", tags: ["accelerator", "funding", "startup"], isSecret: true },
  { id: 212, title: "Y Combinator Applications", url: "https://www.ycombinator.com/apply", description: "Akselerator startup terbaik dunia - startup global bisa apply", category: "Inovasi & Startup", tags: ["yc", "akselerator", "funding global"] },
  { id: 213, title: "AngelList Startup Jobs", url: "https://wellfound.com/jobs", description: "Pekerjaan di startup - cari kerja di startup dengan equity", category: "Inovasi & Startup", tags: ["startup jobs", "equity", "remote"] },
  { id: 214, title: "Product Hunt", url: "https://www.producthunt.com", description: "Peluncuran produk digital - showcase produk teknologi terbaru", category: "Inovasi & Startup", tags: ["product", "tech", "launch"] },
  { id: 215, title: "Indie Hackers", url: "https://www.indiehackers.com", description: "Komunitas entrepreneur solo - monetisasi project sendiri tanpa VC", category: "Inovasi & Startup", tags: ["indie", "solo", "entrepreneur"] },
  { id: 216, title: "Startup Indonesia", url: "https://startup.go.id", description: "Platform resmi startup Indonesia - register startup Anda", category: "Inovasi & Startup", tags: ["startup", "registrasi", "indonesia"] },
  { id: 217, title: "Techstars", url: "https://www.techstars.com", description: "World-class accelerator - mentorship & funding untuk startup", category: "Inovasi & Startup", tags: ["accelerator", "mentorship", "funding"] },
  { id: 218, title: "Crunchbase Pro", url: "https://www.crunchbase.com", description: "Database perusahaan tech - intel tentang setiap startup", category: "Inovasi & Startup", tags: ["database", "intel", "perusahaan"] },

  // KEUANGAN PRIBADI TERSEMBUNYI
  { id: 219, title: "SSAU KPwFF", url: "https://ssau.kemenkeu.go.id", description: "Sistem Survei Aset Utama - tracking aset kekayaan finansial", category: "Keuangan Pribadi", tags: ["aset", "keuangan", "tracking"] },
  { id: 220, title: "Kartu Kredit Gratis", url: "https://www.getonecard.app", description: "Kartu kredit virtual gratis tanpa biaya tahunan", category: "Keuangan Pribadi", tags: ["kartu kredit", "virtual", "gratis"] },
  { id: 221, title: "OJK Edukasi Finansial", url: "https://edukasi.ojk.go.id", description: "Platform edukasi keuangan dari OJK - belajar investasi & literasi keuangan", category: "Keuangan Pribadi", tags: ["edukasi", "investasi", "ojk"] },
  { id: 222, title: "Cashback & Reward Agregator", url: "https://www.cashbacker.id", description: "Agregator cashback dari berbagai platform - maksimalkan reward", category: "Keuangan Pribadi", tags: ["cashback", "reward", "agregator"] },
  { id: 223, title: "ID Secure Pay", url: "https://pay.id", description: "Fintech pembayaran digital Indonesia - transfer gratis, cashback unlimited", category: "Keuangan Pribadi", tags: ["payment", "transfer", "cashback"] },
  { id: 224, title: "Moneythor", url: "https://www.moneythor.id", description: "Aplikasi keuangan pribadi - kelola keuangan & investasi", category: "Keuangan Pribadi", tags: ["keuangan", "investasi", "manajemen"] },
  { id: 225, title: "Crowdfunding KoinWorks", url: "https://koinworks.com", description: "Platform peer-to-peer lending - investasi mulai dari Rp 100rb", category: "Keuangan Pribadi", tags: ["p2p", "investasi", "lending"] },
  { id: 226, title: "Bitcoin Indonesia Pemula", url: "https://www.satoshi-pro.id", description: "Setup wallet Bitcoin gratis dengan keamanan tinggi", category: "Keuangan Pribadi", tags: ["bitcoin", "crypto", "wallet"] },

  // BEASISWA & PELATIHAN GLOBAL
  { id: 227, title: "Coursera Business Skills", url: "https://www.coursera.org", description: "Kursus online gratis dari universitas terbaik dunia - sertifikat profesional", category: "Beasiswa & Pelatihan", tags: ["kursus online", "gratis", "sertifikat"] },
  { id: 228, title: "edX Certificates", url: "https://www.edx.org", description: "Platform belajar online - sertifikat dari MIT, Harvard, Stanford gratis", category: "Beasiswa & Pelatihan", tags: ["online learning", "sertifikat", "universitas"] },
  { id: 229, title: "Udacity Nanodegree", url: "https://www.udacity.com", description: "Nanodegree profesional - kursus tech, AI, data science", category: "Beasiswa & Pelatihan", tags: ["tech training", "nanodegree", "profesional"] },
  { id: 230, title: "Khan Academy Gratis", url: "https://www.khanacademy.org", description: "Belajar matematika, sains, coding gratis - tanpa biaya", category: "Beasiswa & Pelatihan", tags: ["belajar gratis", "matematika", "sains"] },
  { id: 231, title: "Google Scholarships", url: "https://edu.google.com/scholarships", description: "Beasiswa Google - pendanaan untuk pelajar & developer", category: "Beasiswa & Pelatihan", tags: ["beasiswa", "google", "developer"] },
  { id: 232, title: "AWS Educate", url: "https://aws.amazon.com/education", description: "Program AWS untuk pelajar - akses cloud gratis & sertifikasi", category: "Beasiswa & Pelatihan", tags: ["cloud", "aws", "sertifikasi"] },
  { id: 233, title: "Duolingo English Test", url: "https://englishtest.duolingo.com", description: "Tes bahasa Inggris online - lebih murah dari TOEFL/IELTS", category: "Beasiswa & Pelatihan", tags: ["bahasa inggris", "tes", "murah"] },
  { id: 234, title: "Code.org Gratis", url: "https://code.org", description: "Belajar coding gratis dari dasar - untuk semua usia", category: "Beasiswa & Pelatihan", tags: ["coding", "gratis", "pemula"] },

  // INFORMASI TERSEMBUNYI GLOBAL
  { id: 235, title: "CIA World Factbook", url: "https://www.cia.gov/the-world-factbook", description: "Database negara dunia - informasi demografis, ekonomi, keamanan", category: "Informasi Tersembunyi", tags: ["intelligence", "data", "negara"] },
  { id: 236, title: "Global Corruption Index", url: "https://www.transparency.org/en/cpi", description: "Indeks persepsi korupsi global - ranking korupsi setiap negara", category: "Informasi Tersembunyi", tags: ["korupsi", "transparansi", "indeks"] },
  { id: 237, title: "OpenCorporates", url: "https://opencorporates.com", description: "Database perusahaan global - data kepemilikan & struktur perusahaan", category: "Informasi Tersembunyi", tags: ["perusahaan", "data", "global"] },
  { id: 238, title: "WikiLeaks Archives", url: "https://wikileaks.org", description: "Dokumen terbuka & investigatif - informasi yang disembunyikan pemerintah", category: "Informasi Tersembunyi", tags: ["dokumen", "investigasi", "transparan"] },
  { id: 239, title: "ICIJ Investigative Database", url: "https://www.icij.org", description: "International Consortium Investigative Journalists - investigasi global", category: "Informasi Tersembunyi", tags: ["investigasi", "jurnalis", "global"] },
  { id: 240, title: "Panama Papers Database", url: "https://panamapapers.icij.org", description: "Database Panama Papers - cek nama yang terlibat dalam tax havens", category: "Informasi Tersembunyi", tags: ["panama papers", "tax haven", "tersembunyi"] },
  { id: 241, title: "Google Scholar", url: "https://scholar.google.com", description: "Database akademik global - jurnal, makalah, penelitian gratis", category: "Informasi Tersembunyi", tags: ["akademik", "jurnal", "penelitian"] },
  { id: 242, title: "Archive.org Wayback Machine", url: "https://web.archive.org", description: "Arsip website - lihat website lama yang sudah dihapus", category: "Informasi Tersembunyi", tags: ["arsip", "website", "history"] },
  { id: 243, title: "Domain WHOIS Lookup", url: "https://whois.icann.org", description: "Cek pemilik domain - siapa di balik website tertentu", category: "Informasi Tersembunyi", tags: ["domain", "whois", "pemilik"] },
  { id: 244, title: "Data Breach Database", url: "https://haveibeenpwned.com", description: "Cek apakah email Anda tercipta dalam data breach", category: "Informasi Tersembunyi", tags: ["security", "breach", "privacy"] },

  // EKONOMI & BISNIS INOVATIF
  { id: 245, title: "Upwork Freelance Global", url: "https://www.upwork.com", description: "Marketplace freelance global - kerja remote dari mana saja, dapat dolar", category: "Ekonomi & Bisnis", tags: ["freelance", "remote", "global"] },
  { id: 246, title: "Fiverr Global Services", url: "https://www.fiverr.com", description: "Jual jasa online global - mulai dari $5 per project", category: "Ekonomi & Bisnis", tags: ["jasa", "global", "online"] },
  { id: 247, title: "Top Echelon Affiliate", url: "https://www.topechelon.com", description: "Affiliate network - dapat komisi dari setiap penjualan referral", category: "Ekonomi & Bisnis", tags: ["affiliate", "komisi", "referral"] },
  { id: 248, title: "ClickBank Affiliate", url: "https://www.clickbank.com", description: "Platform affiliate - produk digital dengan komisi hingga 75%", category: "Ekonomi & Bisnis", tags: ["affiliate", "digital", "komisi tinggi"] },
  { id: 249, title: "Amazon Associates", url: "https://affiliate-program.amazon.com", description: "Program afiliasi Amazon - mulai dari komisi 3-15%", category: "Ekonomi & Bisnis", tags: ["amazon", "affiliate", "komisi"] },
  { id: 250, title: "Printful Print on Demand", url: "https://www.printful.com", description: "Jual design di t-shirt, mug, dll tanpa stok - dropshipping murni", category: "Ekonomi & Bisnis", tags: ["ecommerce", "dropshipping", "design"] },

  // KESEHATAN & WELLNESS INOVATIF
  { id: 251, title: "Telemedicine Global Doxy.me", url: "https://doxy.me", description: "Telehealth platform - konsultasi dokter online dengan video call", category: "Kesehatan", tags: ["telemedicine", "dokter online", "global"] },
  { id: 252, title: "Mental Health First Aid", url: "https://www.mentalhealthfirstaid.org", description: "Pelatihan pertolongan pertama kesehatan mental gratis", category: "Kesehatan", tags: ["mental health", "pelatihan", "gratis"] },
  { id: 253, title: "SAMHSA National Helpline", url: "https://www.samhsa.gov/find-help/national-helpline", description: "Hotline kesehatan mental 24/7 gratis - tempat aman bercerita", category: "Kesehatan", tags: ["mental health", "hotline", "24/7"] },
  { id: 254, title: "MyFitnessPal Premium Gratis", url: "https://www.myfitnesspal.com", description: "Aplikasi fitness & nutrisi - track kalori, workout, meal plan", category: "Kesehatan", tags: ["fitness", "nutrisi", "tracking"] },
  { id: 255, title: "Headspace Meditation Free", url: "https://www.headspace.com/work", description: "Aplikasi meditasi & mindfulness - stres management gratis", category: "Kesehatan", tags: ["meditasi", "wellness", "stress"] },

  // TEKNOLOGI & CODING INOVATIF
  { id: 256, title: "GitHub Free Tier", url: "https://github.com", description: "Repository gratis unlimited private - version control gratis", category: "Teknologi", tags: ["github", "coding", "gratis"] },
  { id: 257, title: "Stack Overflow Answers", url: "https://stackoverflow.com", description: "Komunitas developer - jawaban setiap masalah programming", category: "Teknologi", tags: ["programming", "komunitas", "help"] },
  { id: 258, title: "Dev.to Community", url: "https://dev.to", description: "Komunitas developer - share artikel, portfolio, networking", category: "Teknologi", tags: ["developer", "community", "article"] },
  { id: 259, title: "HackerNews", url: "https://news.ycombinator.com", description: "Tech news terpenting - trending di kalangan developer & founder", category: "Teknologi", tags: ["news", "tech", "trending"] },
  { id: 260, title: "LeetCode Coding Practice", url: "https://leetcode.com", description: "Latihan algoritma & data structure - persiapan coding interview", category: "Teknologi", tags: ["coding", "interview", "algoritma"] },

  // PARIWISATA & TRAVEL TIPS
  { id: 261, title: "Nomadic List Remote Work", url: "https://nomadlist.com", description: "Panduan kota untuk remote worker - biaya hidup, internet, komunitas", category: "Pariwisata", tags: ["nomad", "remote", "travel"] },
  { id: 262, title: "TripAdvisor Travel Ideas", url: "https://www.tripadvisor.com", description: "Review hotel, restoran, destinasi - dari traveler nyata", category: "Pariwisata", tags: ["travel", "review", "destinasi"] },
  { id: 263, title: "Airbnb Staycation", url: "https://www.airbnb.com", description: "Sewa rumah/apartment - lebih murah dari hotel untuk group", category: "Pariwisata", tags: ["accommodation", "travel", "homestay"] },
  { id: 264, title: "Wikiloc Hiking Trails", url: "https://wikiloc.com", description: "Database hiking trails & outdoor routes - dengan GPS tracking", category: "Pariwisata", tags: ["hiking", "outdoor", "gps"] },
  { id: 265, title: "Google Maps Hidden Layers", url: "https://maps.google.com", description: "Peta detail Google - hidden features & offline maps", category: "Pariwisata", tags: ["maps", "navigation", "offline"] },

  // BEASISWA INTERNASIONAL TERSEMBUNYI
  { id: 266, title: "Fulbright Scholarship", url: "https://fulbright.state.gov", description: "Beasiswa S1/S2 ke USA - penuh tanpa hutang untuk pelajar Indonesia", category: "Beasiswa & Pelatihan", tags: ["usa", "beasiswa", "s1 s2"] },
  { id: 267, title: "Erasmus+ Scholarships", url: "https://erasmus-plus.ec.europa.eu", description: "Beasiswa Eropa - kuliah di universitas Eropa gratis", category: "Beasiswa & Pelatihan", tags: ["europe", "kuliah", "gratis"] },
  { id: 268, title: "Japanese MEXT Scholarship", url: "https://www.studyinjapan.go.jp/en", description: "Beasiswa kuliah di Jepang - penuh dengan uang hidup bulanan", category: "Beasiswa & Pelatihan", tags: ["japan", "beasiswa", "mext"] },
  { id: 269, title: "DAAD German Scholarships", url: "https://www.daad.de/en", description: "Beasiswa ke Jerman - perpanjangan tanpa batas untuk masternya", category: "Beasiswa & Pelatihan", tags: ["germany", "master", "daad"] },
  { id: 270, title: "Commonwealth Scholarships", url: "https://www.thecommonwealth.org/scholarships", description: "Beasiswa Commonwealth - kuliah di UK, Australia, Kanada gratis", category: "Beasiswa & Pelatihan", tags: ["uk australia", "beasiswa", "gratis"] },

  // SUMBER DATA & RISET TERSEMBUNYI
  { id: 271, title: "Data.world Public Datasets", url: "https://data.world", description: "Database publik - akses ribuan dataset gratis untuk analisis", category: "Informasi Tersembunyi", tags: ["dataset", "data", "riset"] },
  { id: 272, title: "Kaggle Datasets & Competitions", url: "https://www.kaggle.com", description: "Kompetisi data science - prize money + portfolio builder", category: "Informasi Tersembunyi", tags: ["data science", "competition", "ai"] },
  { id: 273, title: "Government Open Data", url: "https://data.gov", description: "Data publik dari pemerintah - data transparent untuk riset", category: "Informasi Tersembunyi", tags: ["open data", "government", "riset"] },
  { id: 274, title: "Statista Market Insights", url: "https://www.statista.com", description: "Market research data - insights industri & trend analisis", category: "Informasi Tersembunyi", tags: ["market", "research", "trend"] },
  { id: 275, title: "Google Trends Analyzer", url: "https://trends.google.com", description: "Analisis tren pencarian - trend hunting untuk bisnis", category: "Informasi Tersembunyi", tags: ["trends", "analisis", "keyword"] },

  // PEMBIAYAAN INOVATIF GLOBAL
  { id: 276, title: "Kickstarter Crowdfunding", url: "https://www.kickstarter.com", description: "Crowdfunding untuk produk fisik - dari ide jadi produk nyata", category: "Ekonomi & Bisnis", tags: ["crowdfunding", "startup", "ide"] },
  { id: 277, title: "Indiegogo Global", url: "https://www.indiegogo.com", description: "Crowdfunding global - sedikit lebih fleksibel dari Kickstarter", category: "Ekonomi & Bisnis", tags: ["crowdfunding", "global", "startup"] },
  { id: 278, title: "Patreon Creator Support", url: "https://www.patreon.com", description: "Monetisasi konten - supporter bayar bulanan untuk konten Anda", category: "Ekonomi & Bisnis", tags: ["content", "monetisasi", "creator"] },
  { id: 279, title: "Buy Me A Coffee", url: "https://www.buymeacoffee.com", description: "Support creator simple - terima donasi dari pengikut", category: "Ekonomi & Bisnis", tags: ["donation", "creator", "support"] },
  { id: 280, title: "Stripe Startup Grants", url: "https://stripe.com/en-id/newsroom/news/stripe-startup-grants", description: "Stripe grants untuk startup - sumber pendanaan awal gratis", category: "Ekonomi & Bisnis", tags: ["startup", "grant", "funding"] },
];

export default papuaLinks;
