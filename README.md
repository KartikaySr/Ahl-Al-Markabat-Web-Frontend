# Ahl Al Markabat — Frontend Web Application
**أهل المركبات — المنصة المتكاملة لخدمات وصيانة المركبات (Palestine & Regional)**  
**Version**: 1.0.0 | **Stack**: React 18 + Vite 6 + TypeScript + Tailwind CSS

This is the official frontend web application for **Ahl Al Markabat**, connecting vehicle owners with certified service providers, workshops, spare parts marketplace, and emergency roadside recovery.

---

## 🚀 Quickstart Guide

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Open your browser at:
# http://localhost:5173
```

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧭 Key Features & Navigation Modules

1. **Public Discovery & Marketplace**:
   - **Hero & Search Engine**: City & service taxonomy discovery
   - **Interactive Provider Directory & Map**: Leaflet GPS map with filterable workshops
   - **Spare Parts Marketplace**: Filter by brand, vehicle compatibility, OEM warranty, and checkout
   - **Quote Comparison Matrix**: Compare diagnostic and repair bids across multiple garages
   - **Request a Quote Flow**: Submit vehicle issue with photos and urgency

2. **Customer Ownership Portal & Garage**:
   - **Digital Garage**: Vehicle master records (VIN, license plate, mileage, fuel type)
   - **Live Booking Telemetry**: Real-time driver GPS tracking, status milestones, and ETA
   - **Emergency Roadside (SOS)**: Instant flatbed towing, tire change, battery boost dispatch
   - **Vehicle Service History**: Cryptographic and digital logs of previous maintenance

3. **Workshop Management SaaS (Provider Portal)**:
   - **Work Orders & Kanban**: Track job progress from intake to inspection, repair, and handover
   - **Digital Vehicle Inspection (DVI)**: Multi-point vehicle checkups with photo evidence
   - **Technician Dispatch**: Assign work orders to specialized bay mechanics
   - **Parts Inventory**: Track spare parts stock levels and reorder thresholds

4. **Super Admin Governance Portal**:
   - **Operational & Financial KPIs**: Gross GMV, platform take-rate (10%), dispute resolution
   - **Provider KYC Verification**: Document verification, trade license approvals
   - **Regional Configuration**: Multi-currency (ILS, JOD, SAR, AED), multilingual (Arabic/English) with full RTL support

---

## 🛠️ Architecture & Tech Stack

- **Framework**: React 18 with Vite 6 (HMR, TypeScript)
- **Styling**: Tailwind CSS v3 with custom automotive theme & RTL mirroring support
- **Icons**: Lucide React
- **Mapping**: Leaflet with custom interactive markers
- **State Management**: React Context (`AppContext.tsx`) with localStorage persistence
- **Internationalization**: Bilingual Arabic (RTL) & English (LTR) engine

---

## 🔗 Connecting to the Backend API

By default, the application runs with rich, realistic mock data contracts. To connect to the live or mock REST API server:
1. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```
2. The frontend will communicate with all versioned `/api/v1/*` endpoints.

---

## 📄 License
Proprietary — Ahl Al Markabat Platform. All rights reserved.
