# 🚗 Ahl Al-Markabat — Frontend Deployment Guide

This is the production-ready React / Vite / TypeScript frontend for the **Ahl Al-Markabat (أهل المركبات)** Automotive Platform.

---

## 📦 Quick Start (Local Development)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) or [http://localhost:3001](http://localhost:3001) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The compiled static bundle will be created in the `dist/` directory.

---

## 🚀 Deploying to Vercel (1-Click)

1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. Set Framework Preset to **Vite**.
5. Add Environment Variables (Optional if connecting to live backend):
   - `VITE_API_URL`: `https://api.yourdomain.com`
   - `VITE_WS_URL`: `wss://api.yourdomain.com`
6. Click **Deploy**!

---

## 🌐 Deploying to Netlify / Cloudflare Pages

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: `20.x` or `22.x`

---

## ✨ Features Included
- Bilingual UI (Arabic RTL & English LTR).
- 6-Step Service Booking Flow with Searchable 24-Brand Automotive Database.
- 24/7 Roadside Emergency SOS with GPS dispatch & Guest-to-Account onboarding.
- Quotation Request & Multi-Offer bidding comparisons.
- Service Provider & Admin Dashboards (Kanban Work Orders, DVI digital inspections, KYC, Financial Take-Rate ledger).
- Integrated AI Symptom Diagnostic Assistant modal.
