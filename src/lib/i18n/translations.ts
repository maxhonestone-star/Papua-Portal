export type Language = 'id' | 'en';

export interface Translation {
  // Navigation
  home: string;
  linkDeep: string;
  hargaSembako: string;
  lowonganKerja: string;
  cekBansos: string;
  konselingAI: string;
  login: string;

  // Common
  search: string;
  filter: string;
  loading: string;
  error: string;
  noData: string;
  back: string;

  // Home page
  welcome: string;
  homeDescription: string;
  getStarted: string;

  // Features
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;

  // Auth
  signIn: string;
  signUp: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  forgotPassword: string;
  createAccount: string;
  alreadyHaveAccount: string;

  // Jobs
  jobs: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  jobDescription: string;
  requirements: string;
  apply: string;
  deadline: string;

  // Links
  links: string;
  categories: string;
  all: string;
  government: string;
  education: string;
  health: string;
  business: string;
  legal: string;
  media: string;
  transport: string;
  tourism: string;
  organization: string;
  technology: string;
  social: string;
  agriculture: string;

  // Prices
  prices: string;
  commodity: string;
  price: string;
  unit: string;
  lastUpdate: string;
  province: string;

  // Bansos
  bansos: string;
  checkEligibility: string;
  program: string;
  amount: string;
  bansosRequirements: string;
  howToCheck: string;

  // Counseling
  counseling: string;
  askQuestion: string;
  typeMessage: string;
  send: string;
}

export const translations: Record<Language, Translation> = {
  id: {
    // Navigation
    home: "Beranda",
    linkDeep: "Link Deep",
    hargaSembako: "Harga Sembako",
    lowonganKerja: "Lowongan Kerja",
    cekBansos: "Cek Bansos",
    konselingAI: "Konseling AI",
    login: "Masuk",

    // Common
    search: "Cari",
    filter: "Filter",
    loading: "Memuat...",
    error: "Terjadi kesalahan",
    noData: "Tidak ada data",
    back: "Kembali",

    // Home page
    welcome: "Selamat Datang di Papua Portal",
    homeDescription: "Super App untuk masyarakat Papua dengan fitur lengkap dan modern",
    getStarted: "Mulai Sekarang",

    // Features
    feature1: "Link Deep Tersembunyi",
    feature2: "Harga Sembako Real-time",
    feature3: "Lowongan Kerja Terbaru",
    feature4: "Cek Program Bansos",
    feature5: "Konseling AI 24/7",

    // Auth
    signIn: "Masuk",
    signUp: "Daftar",
    email: "Email",
    password: "Password",
    name: "Nama",
    phone: "Telepon",
    forgotPassword: "Lupa password?",
    createAccount: "Buat akun",
    alreadyHaveAccount: "Sudah punya akun?",

    // Jobs
    jobs: "Lowongan Kerja",
    jobTitle: "Judul Pekerjaan",
    company: "Perusahaan",
    location: "Lokasi",
    salary: "Gaji",
    jobDescription: "Deskripsi",
    requirements: "Persyaratan",
    apply: "Lamar",
    deadline: "Batas Waktu",

    // Links
    links: "Link Deep",
    categories: "Kategori",
    all: "Semua",
    government: "Pemerintah",
    education: "Pendidikan",
    health: "Kesehatan",
    business: "Bisnis",
    legal: "Hukum",
    media: "Media",
    transport: "Transportasi",
    tourism: "Pariwisata",
    organization: "Organisasi",
    technology: "Teknologi",
    social: "Sosial & Budaya",
    agriculture: "Pertanian & Perikanan",

    // Prices
    prices: "Harga Sembako",
    commodity: "Komoditas",
    price: "Harga",
    unit: "Satuan",
    lastUpdate: "Terakhir Update",
    province: "Provinsi",

    // Bansos
    bansos: "Program Bansos",
    checkEligibility: "Cek Kelayakan",
    program: "Program",
    amount: "Besaran",
    bansosRequirements: "Syarat",
    howToCheck: "Cara Cek",

    // Counseling
    counseling: "Konseling AI",
    askQuestion: "Tanyakan Pertanyaan",
    typeMessage: "Ketik pesan Anda...",
    send: "Kirim",
  },
  en: {
    // Navigation
    home: "Home",
    linkDeep: "Deep Links",
    hargaSembako: "Food Prices",
    lowonganKerja: "Job Vacancies",
    cekBansos: "Check Social Aid",
    konselingAI: "AI Counseling",
    login: "Login",

    // Common
    search: "Search",
    filter: "Filter",
    loading: "Loading...",
    error: "An error occurred",
    noData: "No data available",
    back: "Back",

    // Home page
    welcome: "Welcome to Papua Portal",
    homeDescription: "Super App for Papua community with complete and modern features",
    getStarted: "Get Started",

    // Features
    feature1: "Hidden Deep Links",
    feature2: "Real-time Food Prices",
    feature3: "Latest Job Vacancies",
    feature4: "Check Social Aid Programs",
    feature5: "24/7 AI Counseling",

    // Auth
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone",
    forgotPassword: "Forgot password?",
    createAccount: "Create account",
    alreadyHaveAccount: "Already have an account?",

    // Jobs
    jobs: "Job Vacancies",
    jobTitle: "Job Title",
    company: "Company",
    location: "Location",
    salary: "Salary",
    jobDescription: "Description",
    requirements: "Requirements",
    apply: "Apply",
    deadline: "Deadline",

    // Links
    links: "Deep Links",
    categories: "Categories",
    all: "All",
    government: "Government",
    education: "Education",
    health: "Health",
    business: "Business",
    legal: "Legal",
    media: "Media",
    transport: "Transport",
    tourism: "Tourism",
    organization: "Organization",
    technology: "Technology",
    social: "Social & Culture",
    agriculture: "Agriculture & Fisheries",

    // Prices
    prices: "Food Prices",
    commodity: "Commodity",
    price: "Price",
    unit: "Unit",
    lastUpdate: "Last Update",
    province: "Province",

    // Bansos
    bansos: "Social Aid Programs",
    checkEligibility: "Check Eligibility",
    program: "Program",
    amount: "Amount",
    bansosRequirements: "Requirements",
    howToCheck: "How to Check",

    // Counseling
    counseling: "AI Counseling",
    askQuestion: "Ask a Question",
    typeMessage: "Type your message...",
    send: "Send",
  },
};