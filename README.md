# 🚗 Ahl Al-Markabat (أهل المركبات) — Web Frontend Application
> **The Premier All-in-One Automotive Services, Workshop SaaS & Spare Parts Platform**  
> *Target Region: Palestine (القدس، رام الله، الخليل، نابلس، بيت لحم) & Middle East*

[![React Version](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)

---

## 📑 Executive Summary

**Ahl Al-Markabat (أهل المركبات)** is an enterprise-grade digital automotive ecosystem that unifies vehicle owners, certified repair workshops, parts distributors, and roadside emergency recovery under a single high-performance web platform.

This repository contains the **complete production web frontend**, built with **React 18**, **TypeScript**, **Vite 6**, and **Tailwind CSS**. It includes full multi-role access (Consumer Portal, Workshop SaaS Suite, and Super Admin Governance Hub), bilingual Arabic (RTL) and English (LTR) localization, interactive GPS mapping, and an integrated AI symptom diagnostic engine.

---

## 🌟 Key Platform Capabilities

```
+-----------------------------------------------------------------------------------------+
|                               AHL AL-MARKABAT WEB PLATFORM                              |
+----------------------------+-----------------------------+------------------------------+
|     PUBLIC & MARKETPLACE   |    CUSTOMER DIGITAL GARAGE  |     WORKSHOP SAAS SUITE      |
|  - 24-Brand Car Database   |  - Multi-Vehicle Garage     |  - Work Orders & Bay Kanban  |
|  - 6-Step Service Booking  |  - Live GPS Service Track   |  - OBD-II DVI Inspections    |
|  - Spare Parts E-Commerce  |  - Service History & Logs   |  - Parts Inventory & Alerts  |
|  - Quote Comparison Matrix |  - Digital Mulkiya & Docs   |  - Technician Workload Rota  |
|  - 24/7 Roadside SOS Tow   |  - Quotations & Approvals   |  - Multi-Branch & Invoicing  |
+----------------------------+-----------------------------+------------------------------+
|                              SUPER ADMIN & PLATFORM GOVERNANCE                          |
|    GMV & Revenue Take-Rate (10%) | Provider KYC Approvals | Dispute Resolution & Ledger |
+-----------------------------------------------------------------------------------------+
```

1. **🌐 Public Discovery & E-Commerce Marketplace**:
   - Comprehensive marketplace for OEM and aftermarket spare parts with vehicle fitment checks.
   - 6-step streamlined service booking wizard with date/time slot picker and workshop assignment.
   - Interactive OpenStreetMap/Leaflet GPS directory of certified service centers across Palestinian cities.
   - Multi-garage bidding system: Submit a repair request with photos and compare competitive quotes.
   - 24/7 Roadside Emergency (SOS) with instant location pinpointing, flatbed towing, battery jump, and fuel delivery dispatch.

2. **👤 Customer Ownership Portal ("Digital Garage")**:
   - **My Garage**: Track multiple vehicles by VIN, license plate, mileage, transmission, and fuel type.
   - **Live Telemetry & Booking Tracker**: Real-time status milestones (Accepted -> En Route -> In Bay -> Completed).
   - **Service History & Invoices**: Digital cryptographic service logs and downloadable invoices.
   - **Document Vault**: Manage vehicle insurance policies, Mulkiya registration, and inspection certificates.

3. **🔧 Workshop SaaS System (Service Provider Operating System)**:
   - **Work Order Management (Kanban)**: Track job progress across 5 stages (Intake, In Progress, DVI, Ready, Handover).
   - **Digital Vehicle Inspection (DVI)**: Multi-point interactive vehicle checkup with photo evidence and severity grading.
   - **Technician Bay Allocation**: Assign mechanics to repair bays, monitor active hours, and track efficiency.
   - **Inventory Management**: Track spare parts stock levels, SKU codes, minimum stock alerts, and supplier purchase orders.
   - **Financial Ledger & Invoices**: Automated invoice generation with VAT calculation, payment receipts, and bank payout tracking.
   - **Branch Operations**: Manage multiple branches, operating hours, GPS coordinates, and contact personnel.

4. **👑 Super Admin Governance Hub**:
   - Platform-wide GMV metrics, gross profit, and automated 10% platform commission ledger.
   - Provider KYC verification pipeline (Commercial Register, Trade License, Insurance verification).
   - User & workshop account management with suspension/activation toggles.

5. **🤖 AI Automotive Diagnostic Engine**:
   - Interactive natural-language vehicle symptom troubleshooter.
   - Probable root-cause analyzer with severity score, estimated repair costs, and direct workshop booking recommendation.

6. **📱 In-Browser Mobile App Simulators**:
   - Embedded interactive mobile viewports demonstrating the native Customer & Provider mobile app experiences directly in the web browser.

---

## 📂 Comprehensive Codebase Structure

Below is the complete file organization of this repository with descriptions of each component's responsibility:

```
Ahl-Al-Markabat-Web-Frontend/
├── public/                                  # Static media & public brand assets
│   ├── images/                              # High-resolution gallery & mockup assets
│   │   ├── categories/                      # Service category imagery
│   │   ├── mobile/                          # Mobile UI previews
│   │   ├── parts/                           # Spare parts catalog photos
│   │   ├── vehicles/                        # Vehicle manufacturer emblems
│   │   └── web/                             # Web portal design mockups
│   ├── favicon.svg                          # Browser tab icon
│   ├── logo.png / logo-dark.png             # Brand logo variants (Light/Dark/Night)
│   └── SAMPLESERVICEPROVIDER[1-2].png       # Sample workshop branding assets
│
├── src/                                     # Core Application Source Code
│   ├── components/                          # UI Component Library (Modular Architecture)
│   │   │
│   │   ├── admin/                           # Super Admin Governance Module
│   │   │   └── AdminDashboard.tsx           # Platform KPIs, KYC approvals, dispute management, fee ledgers
│   │   │
│   │   ├── ai/                              # Artificial Intelligence Modules
│   │   │   └── AIAssistantModal.tsx         # Interactive symptom diagnostic chat & cost estimation modal
│   │   │
│   │   ├── auth/                            # Authentication & Access Control
│   │   │   └── AuthModal.tsx                # Unified login/register modal with 1-click demo role switcher
│   │   │
│   │   ├── booking/                         # Booking & Appointment Modules
│   │   │   └── QuickBookingModal.tsx        # Fast-track 3-step booking modal for urgent repairs
│   │   │
│   │   ├── common/                          # Reusable Global UI Elements
│   │   │   ├── BrandEmblem.tsx              # Vector emblems for 24+ automotive manufacturers
│   │   │   ├── Footer.tsx                   # Multi-column public footer with locale & legal links
│   │   │   ├── Header.tsx                   # Responsive navigation bar with role switcher & notifications
│   │   │   ├── LeafletMap.tsx               # OpenStreetMap/Leaflet integration for workshop & GPS tracking
│   │   │   ├── Logo.tsx                     # Scalable SVG brand logo component
│   │   │   ├── NotificationDropdown.tsx     # Real-time bell notification drawer
│   │   │   ├── RatingStars.tsx              # Dynamic review star rating display
│   │   │   └── Toast.tsx                    # System toast notification banner
│   │   │
│   │   ├── customer/                        # Customer Portal & Sub-Views
│   │   │   ├── CustomerDashboard.tsx        # Main customer tab routing controller
│   │   │   ├── CustomerPortalPage.tsx       # Standalone customer portal wrapper
│   │   │   ├── NotificationsCenterPage.tsx  # Dedicated customer notifications management
│   │   │   ├── VehicleServiceHistoryPage.tsx# Deep-dive vehicle maintenance logs & cryptographic stamps
│   │   │   └── tabs/                        # Customer Portal Tabs
│   │   │       ├── CustomerAlertsTab.tsx    # Maintenance reminders, inspection & insurance expiry alerts
│   │   │       ├── CustomerAnalyticsTab.tsx # Vehicle cost-of-ownership & maintenance expense charts
│   │   │       ├── CustomerBookingsTab.tsx  # Upcoming & past appointment timeline with live statuses
│   │   │       ├── CustomerDocumentsTab.tsx # Digital document vault (Mulkiya, insurance, inspection PDFs)
│   │   │       ├── CustomerGarageTab.tsx    # Digital garage: vehicle specs, VIN details, odometer updates
│   │   │       ├── CustomerHistoryTab.tsx   # Chronological repair & diagnostic history logs
│   │   │       ├── CustomerInvoicesTab.tsx  # Downloadable repair invoices and receipts
│   │   │       ├── CustomerMarketplaceTab.tsx # Spare parts purchase history and shipping tracking
│   │   │       ├── CustomerMessagesTab.tsx  # Live messaging inbox with workshop service advisors
│   │   │       ├── CustomerProfileTab.tsx   # Account settings, notification preferences, passwords
│   │   │       ├── CustomerQuotationsTab.tsx# Multi-workshop bids, price comparisons, and approvals
│   │   │       ├── CustomerWarrantiesTab.tsx# Active warranties on installed parts and labor
│   │   │       └── CustomerWorkshopsTab.tsx # Saved favorite certified service centers
│   │   │
│   │   ├── emergency/                       # Roadside Assistance
│   │   │   └── EmergencySOSModal.tsx        # 24/7 GPS roadside rescue (Towing, Battery, Tire, Fuel)
│   │   │
│   │   ├── garage/                          # Vehicle Garage Module
│   │   │   └── MyGarageView.tsx             # Standalone garage view wrapper
│   │   │
│   │   ├── marketplace/                     # Parts Marketplace Modules
│   │   │   └── QuickPartsCheckoutModal.tsx  # Fast 1-click spare part checkout modal with VIN verification
│   │   │
│   │   ├── mobile/                          # Interactive Mobile Simulators
│   │   │   ├── CustomerAppSimulator.tsx     # In-browser interactive preview of Customer Mobile App
│   │   │   └── ProviderAppSimulator.tsx     # In-browser interactive preview of Workshop Mobile App
│   │   │
│   │   ├── mockups/                         # Wireframe & Design Blueprint Explorer
│   │   │   └── MockupsExplorer.tsx          # Design showcase of 54+ high-fidelity screens
│   │   │
│   │   ├── provider/                        # Workshop Management SaaS (Provider Portal)
│   │   │   ├── ProviderDashboard.tsx        # Provider SaaS sidebar & tab routing controller
│   │   │   └── tabs/                        # Workshop Management Sub-Modules (20 Tabs)
│   │   │       ├── ProviderOverviewTab.tsx  # Daily revenue, active bays, throughput & KPI cards
│   │   │       ├── ProviderJobsTab.tsx      # Kanban board of active work orders across repair stages
│   │   │       ├── ProviderBookingRequestsTab.tsx # Incoming booking requests (Accept / Reschedule / Reject)
│   │   │       ├── ProviderQuotesTab.tsx    # Create and submit detailed repair quotations to customers
│   │   │       ├── ProviderWorkOrderTab.tsx # Work order editor (Labor hours, spare parts, mechanic assignment)
│   │   │       ├── ProviderVehicleDetailsTab.tsx # OBD-II Digital Vehicle Inspection (DVI) report generator
│   │   │       ├── ProviderCalendarTab.tsx  # Bay scheduling calendar and mechanic shift planner
│   │   │       ├── ProviderCustomersTab.tsx # Customer CRM database, vehicle fleet records, notes
│   │   │       ├── ProviderInventoryTab.tsx # Parts inventory, stock depletion alerts, SKU barcodes
│   │   │       ├── ProviderTechniciansTab.tsx # Technician roster, bay certifications, productivity metrics
│   │   │       ├── ProviderBranchesTab.tsx  # Multi-location branch configuration and opening hours
│   │   │       ├── ProviderInvoicesTab.tsx  # Workshop invoice billing, VAT tax, and payment status
│   │   │       ├── ProviderEarningsTab.tsx  # Payouts ledger, platform fee deductions, bank settlements
│   │   │       ├── ProviderReviewsTab.tsx   # Customer ratings, verified reviews, and reply management
│   │   │       ├── ProviderServicesTab.tsx  # Service catalog pricing (Oil change, brake service, overhaul)
│   │   │       ├── ProviderMarketingTab.tsx # Promo codes, loyalty campaigns, seasonal discounts
│   │   │       ├── ProviderReportsTab.tsx   # Revenue trends, parts margins, and labor utilization reports
│   │   │       ├── ProviderSettingsTab.tsx  # Workshop trade license, tax ID, branding, working hours
│   │   │       ├── ProviderSuppliersTab.tsx # Wholesale parts distributors directory and purchase orders
│   │   │       └── ProviderMessagesTab.tsx  # Real-time chat with vehicle owners
│   │   │
│   │   └── public/                          # Public-Facing Web Pages & Sections
│   │       ├── HomePage.tsx                 # Dynamic landing page with hero, search, and feature sections
│   │       ├── HeroSection.tsx              # Search bar by city/service with instant booking triggers
│   │       ├── CategoriesGrid.tsx           # 8 core automotive service categories with instant filters
│   │       ├── DigitalGaragePreviewSection.tsx # Public teaser of the digital vehicle management suite
│   │       ├── EmergencyBannerSection.tsx   # 24/7 Roadside SOS quick banner
│   │       ├── HowItWorksSection.tsx        # 4-step consumer journey explainer
│   │       ├── FeaturedProductsSection.tsx  # Best-selling OEM & aftermarket parts carousel
│   │       ├── FeaturedProvidersSection.tsx # Top-rated certified garages showcase
│   │       ├── TestimonialsSection.tsx      # Customer reviews and social proof
│   │       ├── AppDownloadSection.tsx       # Mobile app download links with QR codes
│   │       ├── AIAssistantBannerSection.tsx # AI symptom troubleshooter CTA
│   │       ├── FAQSection.tsx               # Expandable automotive FAQ accordion
│   │       ├── MarketplacePage.tsx          # Full e-commerce spare parts catalog with filters
│   │       ├── ProductDetailPage.tsx        # Detailed part specs, OEM fitment table, add-to-cart
│   │       ├── CartCheckoutPage.tsx         # Shopping cart, shipping address, payment method selection
│   │       ├── TrackOrderPage.tsx           # Order lookup with courier tracking milestones
│   │       ├── BookServicePage.tsx          # 6-step comprehensive service booking wizard
│   │       ├── BookingConfirmedPage.tsx     # Booking confirmation screen with calendar export
│   │       ├── TrackBookingPage.tsx         # Real-time technician GPS tracking & service milestones
│   │       ├── ProviderDirectory.tsx        # Searchable workshop directory with map & grid views
│   │       ├── ProviderDetailModal.tsx      # Workshop profile modal (services, gallery, team, reviews)
│   │       ├── RequestQuotePage.tsx         # Multi-garage quote request form with photo upload
│   │       ├── QuoteComparisonView.tsx      # Side-by-side bid comparison matrix
│   │       ├── QuoteRequestModal.tsx        # Fast quote modal
│   │       ├── BecomeProviderPage.tsx       # Workshop partnership landing page & registration
│   │       ├── FleetSolutionsPage.tsx       # B2B enterprise fleet maintenance solutions
│   │       ├── PricingPage.tsx              # Transparent SaaS pricing & platform commission tiers
│   │       ├── AboutPage.tsx                # Company mission, leadership, regional vision
│   │       ├── ContactPage.tsx              # Contact form, branch offices, customer support desk
│   │       └── HelpCenterPage.tsx           # Knowledge base, warranty claims, dispute tickets
│   │
│   ├── context/                             # Global State Management
│   │   └── AppContext.tsx                   # Central React Context managing authentication, active role,
│   │                                        # vehicles, bookings, quotations, cart, notifications,
│   │                                        # theme (light/dark), language (ar/en), and currency
│   │
│   ├── data/                                # Data Models & Demo Datasets
│   │   ├── authCredentials.ts               # Predefined test accounts with 1-click login support
│   │   ├── mockData.ts                      # 2,000+ lines of realistic mock data (workshops, bookings, DVI)
│   │   ├── mockupsData.ts                   # Screen catalog for the Mockup Explorer
│   │   ├── partsCatalog.ts                  # 100+ spare parts with OEM numbers, categories & fitment
│   │   └── vehicleDatabase.ts               # 24 global car brands, 150+ models, engine types & years
│   │
│   ├── i18n/                                # Internationalization Engine
│   │   └── index.ts                         # Complete Arabic (RTL) & English (LTR) translation dictionary
│   │
│   ├── services/                            # API Clients & Service Layer
│   │   ├── api/                             # Modular REST API Endpoint Handlers
│   │   │   ├── aiApi.ts                     # AI diagnostics & troubleshooting endpoints
│   │   │   ├── authApi.ts                   # Login, register, profile, and password endpoints
│   │   │   ├── bookingsJobsApi.ts           # Service booking & job management endpoints
│   │   │   ├── emergencyApi.ts              # Roadside SOS dispatch endpoints
│   │   │   ├── financeApi.ts                # Invoicing, payouts, and commission endpoints
│   │   │   ├── inspectionsApi.ts            # Digital Vehicle Inspection (DVI) endpoints
│   │   │   ├── marketplaceApi.ts            # Spare parts catalog & order endpoints
│   │   │   ├── offersApi.ts                 # Workshop bids & quotation endpoints
│   │   │   ├── requestsApi.ts               # Customer quote requests endpoints
│   │   │   ├── vehiclesApi.ts               # Digital garage vehicle CRUD endpoints
│   │   │   └── workshopApi.ts               # Workshop profile, bays, and staff endpoints
│   │   ├── aiDiagnosticEngine.ts            # Heuristic & rule-based automotive diagnostic analyzer
│   │   ├── apiClient.ts                     # Axios/Fetch API client wrapper with JWT & error handling
│   │   ├── index.ts                         # Unified services export barrel
│   │   └── socketService.ts                 # Real-time WebSocket / Socket.IO client for live telemetry
│   │
│   ├── types/                               # TypeScript Definitions
│   │   └── index.ts                         # Domain types for Roles, Vehicles, Work Orders, DVI, Parts, etc.
│   │
│   ├── App.tsx                              # Root application component with view routing & modals
│   ├── index.css                            # Tailwind CSS directives & global custom styles
│   └── main.tsx                             # React 18 DOM entry point & StrictMode wrapper
│
├── .env.example                             # Environment variables template
├── .gitignore                               # Git ignore rules (excludes node_modules, dist, .env)
├── docker-compose.yml                       # Docker container definition
├── index.html                               # HTML5 entry template with viewport & fonts
├── package.json                             # Dependencies, scripts, and project metadata
├── postcss.config.js                        # PostCSS configuration for Tailwind CSS
├── tailwind.config.js                       # Custom automotive color palette & RTL theme configuration
├── tsconfig.json                            # TypeScript compiler settings
├── vercel.json                              # Vercel SPA rewrite routing configuration
└── vite.config.ts                           # Vite configuration with React plugin & build optimizations
```

---

## 🔑 Demo Access Credentials (1-Click Login)

The platform comes equipped with pre-configured accounts for each user persona. You can log in manually using the credentials below or click the **"Quick Demo Login"** buttons in the authentication modal:

| Persona | Email | Password | Pre-Configured Capabilities |
| :--- | :--- | :--- | :--- |
| **🚗 Customer (Vehicle Owner)** | `customer@ahlalmarkabat.com` | `Customer@2026` | Digital garage, service history, quote comparisons, live tracking |
| **🔧 Workshop Manager (Provider)** | `provider@ahlalmarkabat.com` | `Provider@2026` | Full Workshop SaaS, Kanban work orders, DVI inspections, inventory |
| **👑 Super Admin (Platform Owner)** | `admin@ahlalmarkabat.com` | `Admin@2026` | Financial overview, KYC workshop approvals, user management |

*Alternative Accepted Passwords for Testing*: `Customer@2026`, `Provider@2026`, `Admin@2026`.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **React 18.3** | Functional components, hooks, concurrent rendering |
| **Language** | **TypeScript 5.7** | Strict type checking, interfaces for all domain entities |
| **Build Tool** | **Vite 6.1** | Lightning-fast Hot Module Replacement (HMR) and optimized rollup bundle |
| **Styling** | **Tailwind CSS 3.4** | Utility-first CSS with custom brand design system and dark mode support |
| **Icons** | **Lucide React** | Clean, consistent SVG icon set for modern web interfaces |
| **Mapping** | **Leaflet 1.9** | Interactive OpenStreetMap GPS workshop directory & driver tracking |
| **State Management** | **React Context + Hooks** | Centralized `AppContext` with `localStorage` persistence |
| **Real-Time** | **Socket.io Client 4.8** | Real-time vehicle telemetry, status updates, and live chat |
| **Special Effects** | **Canvas Confetti** | Delightful micro-animations on booking and order completion |

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or later (Recommended: `v20.x` or `v22.x`)
- **npm**: `v9.0.0` or later (or `pnpm` / `yarn`)

### 2. Installation
Clone the repository and install all dependencies:

```bash
# Clone the repository
git clone https://github.com/KartikaySr/Ahl-Al-Markabat-Web-Frontend.git

# Navigate into the project folder
cd Ahl-Al-Markabat-Web-Frontend

# Install dependencies
npm install
```

### 3. Running the Development Server
Start the local Vite development server:

```bash
npm run dev
```

The application will launch at: **`http://localhost:5173`** (or `http://localhost:3000`).

---

## ⚙️ Environment Configuration

The frontend is designed to run seamlessly out-of-the-box using rich mock contracts. To connect to a live backend API server:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Configure the API endpoints in `.env`:
   ```env
   # Backend REST API Base URL
   VITE_API_BASE_URL=http://localhost:5000/api/v1

   # WebSocket / Socket.IO Live Telemetry URL
   VITE_SOCKET_URL=http://localhost:5000

   # Default Platform Language ('ar' or 'en')
   VITE_DEFAULT_LANGUAGE=ar

   # Default Currency ('ILS', 'JOD', 'SAR', 'AED', 'USD')
   VITE_DEFAULT_CURRENCY=ILS
   ```

---

## 🚢 Building & Deployment

### 1. Production Build
Compile the TypeScript code and generate an optimized static bundle in the `dist/` directory:

```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

### 2. One-Click Cloud Deployments

#### 🚀 Deploy to Vercel (Recommended)
1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. The included [`vercel.json`](file:///d:/AMD%20RYZEN%207%205700G/Documents/AhlALmarkabat_SericeProvider/AhlAlmarkabat_Service%20Provider%20Deployment/AhlAlMarkabat_Frontend_Clean_Production/vercel.json) automatically handles Single Page Application (SPA) client-side routing.

#### 🌐 Deploy to Netlify
1. Import this repository into [Netlify](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Add a `_redirects` rule if needed: `/* /index.html 200`.

#### 🐳 Docker Container Deployment
A `docker-compose.yml` file is included in the root directory. To run using Docker:
```bash
docker compose up -d --build
```

---

## 🎨 Design System & Localization

### 1. Bilingual Architecture (Arabic & English)
- **Arabic First**: Native RTL layout with mirrored spacing, flex directions, and typography.
- **English Support**: Instant one-click switch to LTR layout with comprehensive dictionary mapping.
- **Multi-Currency Support**: Switch between **ILS (₪)**, **JOD (د.أ)**, **SAR (ر.س)**, **AED (د.إ)**, and **USD ($)**.

### 2. Automotive Color Tokens
- **Brand Primary (Royal Amber / Gold)**: `amber-500` / `amber-600` (Automotive trust & performance)
- **Dark Night Palette**: `slate-900` / `zinc-900` (Modern luxury vehicle aesthetic)
- **Status Indicators**: Green (Completed/Pass), Amber (In Progress/Warning), Red (Critical/Fail), Blue (Scheduled).

---

## 📄 Handover & Ownership Notes

This frontend repository has been structured according to industry best practices:
- **Clean Separation of Concerns**: Modular components, separated data layers, dedicated types, and service abstraction.
- **Zero Hardcoded Secrets**: All sensitive configurations are managed through standard Vite environment variables.
- **Production Ready**: Fully linted, type-safe with TypeScript, and free of unnecessary bloatware.

---

<div align="center">
  <b>Ahl Al-Markabat (أهل المركبات) — Redefining Automotive Services in the Region</b>
  <br>
  <sub>Copyright © 2026 Ahl Al-Markabat Platform. All Rights Reserved.</sub>
</div>
