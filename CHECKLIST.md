# ⚡ QUICK COPY CHECKLIST

Copy file-file di bawah dari project utama ke folder `FOR_GITHUB`:

## Root Files (9 files):
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `next.config.ts`
- [ ] `tailwind.config.ts`
- [ ] `postcss.config.mjs`
- [ ] `eslint.config.mjs`
- [ ] `.gitignore`
- [ ] `.env.example`
- [ ] `README.md`

## Folders (Drag semua isinya):
- [ ] `src/` → `FOR_GITHUB/src/`
- [ ] `public/` → `FOR_GITHUB/public/`
- [ ] `DEPLOY/` → `FOR_GITHUB/DEPLOY/` (optional)

## After Copy:
1. Open PowerShell di `FOR_GITHUB` folder
2. Run:
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/papua-portal.git
git push -u origin main
```

3. Done! Cek di GitHub.com

---

**JANGAN LUPA:** Sebelum push, pastikan tidak ada `.env.local` atau `node_modules/` yang ikutan!
