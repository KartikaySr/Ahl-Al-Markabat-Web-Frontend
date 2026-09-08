import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Wrench,
  DollarSign,
  Calendar as CalendarIcon,
  FileText,
  Users,
  Package,
  CreditCard,
  Car,
  Star,
  Settings as SettingsIcon,
  Building2,
  Bell,
  CheckCircle2,
  Menu,
  X,
  Inbox,
  Sparkles,
  ChevronDown,
  TrendingUp,
  Megaphone,
  ShieldCheck,
  Search,
} from 'lucide-react';

import { ProviderOverviewTab } from './tabs/ProviderOverviewTab';
import { ProviderBookingRequestsTab } from './tabs/ProviderBookingRequestsTab';
import { ProviderJobsTab } from './tabs/ProviderJobsTab';
import { ProviderCalendarTab } from './tabs/ProviderCalendarTab';
import { ProviderCustomersTab } from './tabs/ProviderCustomersTab';
import { ProviderEarningsTab } from './tabs/ProviderEarningsTab';
import { ProviderWorkOrderTab } from './tabs/ProviderWorkOrderTab';
import { ProviderSettingsTab } from './tabs/ProviderSettingsTab';
import { ProviderQuotesTab } from './tabs/ProviderQuotesTab';
import { ProviderTechniciansTab } from './tabs/ProviderTechniciansTab';
import { ProviderInventoryTab } from './tabs/ProviderInventoryTab';
import { ProviderVehicleDetailsTab } from './tabs/ProviderVehicleDetailsTab';
import { ProviderReviewsTab } from './tabs/ProviderReviewsTab';
import { ProviderServicesTab } from './tabs/ProviderServicesTab';
import { ProviderInvoicesTab } from './tabs/ProviderInvoicesTab';
import { ProviderMessagesTab } from './tabs/ProviderMessagesTab';
import { ProviderMarketingTab } from './tabs/ProviderMarketingTab';
import { ProviderSuppliersTab } from './tabs/ProviderSuppliersTab';
import { ProviderBranchesTab } from './tabs/ProviderBranchesTab';
import { ProviderReportsTab } from './tabs/ProviderReportsTab';

export const ProviderDashboard: React.FC = () => {
  const {
    language,
    t,
    user,
    providerProfile,
    branches,
    selectedBranchId,
    setSelectedBranchId,
    selectedBranch,
    jobs,
    placedBookings,
    showToast,
  } = useApp();
  const workshopDisplayName = user?.name || providerProfile?.name || 'Erlindo Garage';
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const [currentTab, setCurrentTab] = useState<
    | 'overview'
    | 'booking-requests'
    | 'jobs'
    | 'work-order'
    | 'calendar'
    | 'customers'
    | 'services'
    | 'vehicles'
    | 'technicians'
    | 'earnings'
    | 'inventory'
    | 'quotes'
    | 'invoices'
    | 'reviews'
    | 'messages'
    | 'marketing'
    | 'suppliers'
    | 'branches'
    | 'reports'
    | 'promotions'
    | 'settings'
  >('overview');

  const [selectedJobId, setSelectedJobId] = useState<string>('AML-2025-1248');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const menuSections = [
    {
      titleAr: 'عمليات الورشة',
      titleEn: 'Workshop Floor Ops',
      items: [
        { id: 'overview', labelAr: 'لوحة التحكم', labelEn: 'Dashboard Overview', icon: LayoutDashboard },
        { id: 'booking-requests', labelAr: 'طلبات الحجز', labelEn: 'Incoming Requests', icon: Inbox, badge: isNewUser ? (placedBookings.length > 0 ? String(placedBookings.length) : undefined) : '23' },
        { id: 'jobs', labelAr: 'أوامر العمل والخدمات', labelEn: 'Work Orders & Jobs', icon: Wrench, badge: isNewUser ? (jobs.length > 0 ? String(jobs.length) : undefined) : '236' },
        { id: 'calendar', labelAr: 'التقويم ومسارات العمل', labelEn: 'Bays & Calendar', icon: CalendarIcon, badge: isNewUser ? undefined : '8' },
      ],
    },
    {
      titleAr: 'العملاء وعروض الأسعار',
      titleEn: 'Customers & CRM',
      items: [
        { id: 'customers', labelAr: 'قاعدة العملاء', labelEn: 'Customer CRM', icon: Users },
        { id: 'vehicles', labelAr: 'سجلات المركبات', labelEn: 'Vehicles Serviced', icon: Car },
        { id: 'quotes', labelAr: 'عروض الأسعار (RFQ)', labelEn: 'Quotations', icon: FileText, badge: isNewUser ? undefined : '4' },
        { id: 'messages', labelAr: 'المحادثات المباشرة', labelEn: 'Live Advisor Chat', icon: Megaphone, badge: isNewUser ? undefined : '12' },
        { id: 'reviews', labelAr: 'التقييمات والسمعة', labelEn: 'Customer Reviews', icon: Star, badge: isNewUser ? undefined : '4.9 ★' },
      ],
    },
    {
      titleAr: 'المخزون وسلسلة التوريد',
      titleEn: 'Inventory & Supply',
      items: [
        { id: 'inventory', labelAr: 'المخزون وقطع الغيار', labelEn: 'Parts Inventory', icon: Package },
        { id: 'suppliers', labelAr: 'الموردين وأوامر الشراء', labelEn: 'Suppliers & POs', icon: Building2 },
      ],
    },
    {
      titleAr: 'المالية والفواتير',
      titleEn: 'Financials & POS',
      items: [
        { id: 'invoices', labelAr: 'الفواتير الضريبية', labelEn: 'VAT Invoices & POS', icon: CreditCard },
        { id: 'earnings', labelAr: 'الأرباح والتحويلات', labelEn: 'Earnings & Payouts', icon: DollarSign },
        { id: 'reports', labelAr: 'التقارير والتحليلات', labelEn: 'Reports & Analytics', icon: TrendingUp },
      ],
    },
    {
      titleAr: 'إدارة وتخصيص الورشة',
      titleEn: 'Management & Settings',
      items: [
        { id: 'technicians', labelAr: 'الفنيين وفريق العمل', labelEn: 'Technicians & Bays', icon: Users },
        { id: 'services', labelAr: 'الخدمات والأسعار', labelEn: 'Service Catalog', icon: Sparkles },
        { id: 'marketing', labelAr: 'التسويق والعروض', labelEn: 'Promotions & Deals', icon: Megaphone },
        { id: 'branches', labelAr: 'إدارة شبكة الفروع', labelEn: 'Multi-Branch Network', icon: Building2, badge: branches.length.toString() },
        { id: 'settings', labelAr: 'إعدادات الورشة والتوثيق', labelEn: 'Settings & KYC', icon: SettingsIcon },
      ],
    },
  ];

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentTab('work-order');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-900 font-sans">
      {/* 1. Left Dark Navy Sidebar (Desktop) */}
      <aside className="w-64 bg-[#0B1528] text-white flex flex-col justify-between p-4 shrink-0 border-e border-slate-800 hidden md:flex min-h-screen sticky top-0 h-screen overflow-y-auto scrollbar-none">
        <div className="space-y-5">
          {/* Logo & Workshop Identity */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-sm">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <strong className="text-xs font-black text-white block truncate" title={workshopDisplayName}>{workshopDisplayName}</strong>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              </div>
              <span className="text-[10px] text-amber-400 block font-bold truncate">
                {user?.city || (isNewUser ? (language === 'ar' ? 'الفرع الرئيسي' : 'Main Hub') : 'Dubai & Ramallah')}
              </span>
            </div>
          </div>

          {/* Categorized Navigation Menu */}
          <nav className="space-y-4">
            {menuSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black px-3 block">
                  {language === 'ar' ? section.titleAr : section.titleEn}
                </span>

                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    currentTab === item.id || (item.id === 'jobs' && currentTab === 'work-order');

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id as any);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-500/30 text-blue-200 border border-blue-400/40">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom Cards: Support & Verified Badge */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-700/80 space-y-2 text-start">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">Need Assistance?</span>
            </div>
            <p className="text-[10px] text-slate-300">Our support team is here 24/7 to help you.</p>
            <button
              onClick={() => showToast(language === 'ar' ? 'خط الدعم الفني: +970 59 123 4567 (متاح 24/7)' : 'Support Hotline: +970 59 123 4567 (24/7 Available)', 'info')}
              className="w-full py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-[11px] rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              Contact Support
            </button>
          </div>

          <div className="bg-slate-900/50 p-3 rounded-2xl border border-slate-800 flex items-center justify-between text-start">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <strong className="text-[11px] text-slate-200 block font-bold">Verified Provider</strong>
                <span className="text-[9px] text-slate-400 block">AHL AL MARKABAT Platform</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('settings')}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[9px] font-bold"
            >
              Learn More
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 md:hidden flex"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-72 bg-[#0B1528] text-white h-full p-4 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-xs font-black text-white block truncate max-w-[150px]">{workshopDisplayName}</strong>
                    <span className="text-[10px] text-amber-400 block font-bold truncate">
                      {user?.city || (isNewUser ? (language === 'ar' ? 'الفرع الرئيسي' : 'Main Hub') : 'Ramallah, Palestine')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-4">
                {menuSections.map((section, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black px-3 block">
                      {language === 'ar' ? section.titleAr : section.titleEn}
                    </span>

                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        currentTab === item.id || (item.id === 'jobs' && currentTab === 'work-order');

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setCurrentTab(item.id as any);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4" />
                            <span>{language === 'ar' ? item.labelAr : item.labelEn}</span>
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-500/30 text-blue-200 border border-blue-400/40">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar matching Mockups */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Garage Name & Branch Selector */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800">
              <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              {isNewUser || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser && branches.length <= 1) ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-slate-900">📍 {workshopDisplayName}</span>
                  <span className="text-slate-400 text-[10px]">({user?.city || (language === 'ar' ? 'الفرع الرئيسي' : 'Main Hub')})</span>
                </div>
              ) : (
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="bg-transparent border-none text-xs font-black text-slate-900 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">🏢 {language === 'ar' ? 'جميع الفروع (Consolidated)' : 'All Branches (Consolidated)'}</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      📍 {language === 'ar' ? b.nameAr : b.name} ({language === 'ar' ? b.cityAr : b.city})
                    </option>
                  ))}
                </select>
              )}
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Tab Shortcuts */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-600 pe-3 border-e border-slate-200">
              <button
                onClick={() => setCurrentTab('overview')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentTab === 'overview' ? 'bg-slate-100 text-blue-600 font-black' : 'hover:bg-slate-50'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentTab('booking-requests')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentTab === 'booking-requests' ? 'bg-slate-100 text-blue-600 font-black' : 'hover:bg-slate-50'
                }`}
              >
                {isNewUser ? (placedBookings.length > 0 ? `Requests (${placedBookings.length})` : 'Requests') : 'Requests (23)'}
              </button>
              <button
                onClick={() => setCurrentTab('jobs')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentTab === 'jobs' ? 'bg-slate-100 text-blue-600 font-black' : 'hover:bg-slate-50'
                }`}
              >
                {isNewUser ? (jobs.length > 0 ? `Jobs (${jobs.length})` : 'Jobs') : 'Jobs (236)'}
              </button>
              <button
                onClick={() => setCurrentTab('calendar')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentTab === 'calendar' ? 'bg-slate-100 text-blue-600 font-black' : 'hover:bg-slate-50'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setCurrentTab('customers')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  currentTab === 'customers' ? 'bg-slate-100 text-blue-600 font-black' : 'hover:bg-slate-50'
                }`}
              >
                Customers
              </button>
            </div>

            {/* Switch Workspace */}
            {branches.length > 1 && !isNewUser && (
              <button
                onClick={() => {
                  if (selectedBranchId === 'all') {
                    setSelectedBranchId(branches[0]?.id || 'all');
                  } else {
                    const currentIndex = branches.findIndex((b) => b.id === selectedBranchId);
                    const nextIndex = (currentIndex + 1) % (branches.length + 1);
                    if (nextIndex === branches.length) {
                      setSelectedBranchId('all');
                    } else {
                      setSelectedBranchId(branches[nextIndex].id);
                    }
                  }
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700"
              >
                <span>{language === 'ar' ? 'تبديل مسار الفرع' : 'Switch Branch'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            )}

            {/* Notifications Bell */}
            <button
              onClick={() => setCurrentTab('overview')}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {!isNewUser && (
                <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black flex items-center justify-center">
                  8
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 ps-2 border-s border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Mohammed A."
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
              <div className="hidden sm:block text-start">
                <strong className="text-xs font-black text-slate-900 block leading-tight max-w-[130px] truncate" title={workshopDisplayName}>{workshopDisplayName}</strong>
                <span className="text-[10px] text-slate-400 block">Owner / Lead Tech</span>
              </div>
            </div>
          </div>
        </header>

        {/* 4. Tab Views Content */}
        <main className="p-4 sm:p-8 space-y-6 flex-1">
          {/* TAB 1: OVERVIEW (Image 1) */}
          {currentTab === 'overview' && (
            <ProviderOverviewTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />
          )}

          {/* TAB 2: BOOKING REQUESTS (Image 2) */}
          {currentTab === 'booking-requests' && (
            <ProviderBookingRequestsTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />
          )}

          {/* TAB 3: JOBS MANAGEMENT (Image 3) */}
          {currentTab === 'jobs' && (
            <ProviderJobsTab
              onSelectJob={handleSelectJob}
              onNavigateTab={(tab) => setCurrentTab(tab as any)}
            />
          )}

          {/* TAB 4: CALENDAR & APPOINTMENTS (Image 4) */}
          {currentTab === 'calendar' && (
            <ProviderCalendarTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />
          )}

          {/* TAB 5: CUSTOMERS & CRM (Image 5) */}
          {currentTab === 'customers' && (
            <ProviderCustomersTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />
          )}

          {/* TAB 6: WORK ORDER / DVI */}
          {currentTab === 'work-order' && (
            <ProviderWorkOrderTab
              jobId={selectedJobId}
              onBack={() => setCurrentTab('jobs')}
            />
          )}

          {/* TAB 7: EARNINGS & PAYOUTS */}
          {currentTab === 'earnings' && <ProviderEarningsTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 8: QUOTES & ESTIMATES */}
          {currentTab === 'quotes' && <ProviderQuotesTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 9: TECHNICIANS & TEAM */}
          {currentTab === 'technicians' && <ProviderTechniciansTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 10: INVENTORY & SPARE PARTS */}
          {currentTab === 'inventory' && <ProviderInventoryTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 11: CUSTOMER VEHICLE DETAILS */}
          {currentTab === 'vehicles' && <ProviderVehicleDetailsTab onBack={() => setCurrentTab('customers')} onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 12: SERVICES & PRICING */}
          {currentTab === 'services' && <ProviderServicesTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 13: REVIEWS & REPUTATION */}
          {currentTab === 'reviews' && <ProviderReviewsTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 14: INVOICES & BILLING */}
          {currentTab === 'invoices' && <ProviderInvoicesTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 15: MESSAGES & CUSTOMER CHAT */}
          {currentTab === 'messages' && <ProviderMessagesTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 16: MARKETING, PROMOTIONS & COUPONS */}
          {currentTab === 'marketing' && <ProviderMarketingTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 17: SUPPLIERS & PURCHASE ORDERS */}
          {currentTab === 'suppliers' && <ProviderSuppliersTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 18: BRANCHES / WORKSHOPS MANAGEMENT */}
          {currentTab === 'branches' && <ProviderBranchesTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 19: REPORTS & ADVANCED ANALYTICS */}
          {currentTab === 'reports' && <ProviderReportsTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />}

          {/* TAB 20: PROFILE & SETTINGS / PROMOTIONS */}
          {(currentTab === 'settings' || currentTab === 'promotions') && (
            <ProviderSettingsTab onNavigateTab={(tab) => setCurrentTab(tab as any)} />
          )}
        </main>

        {/* Global Footer */}
        <footer className="bg-[#070E1E] text-white pt-10 pb-6 px-4 sm:px-8 border-t border-slate-800 text-xs">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-sm font-black text-white block">أهل المركبات</strong>
                  <span className="text-[10px] text-amber-400 block font-bold">AHL AL MARKABAT</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Your Vehicle. In Expert Hands</p>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <span>📘</span>
                <span>📸</span>
                <span>💬</span>
                <span>💼</span>
                <span>▶️</span>
              </div>
            </div>

            <div>
              <strong className="font-bold text-white block mb-3">For Providers</strong>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('overview')}>Provider Dashboard</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('booking-requests')}>Bookings</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('jobs')}>Jobs</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('earnings')}>Earnings</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('reviews')}>Reviews</li>
              </ul>
            </div>

            <div>
              <strong className="font-bold text-white block mb-3">Business Tools</strong>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('inventory')}>Inventory</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('quotes')}>Quotes</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('customers')}>Customers</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('earnings')}>Reports</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setCurrentTab('settings')}>Marketing Tools</li>
              </ul>
            </div>

            <div className="space-y-2">
              <strong className="font-bold text-white block">We're Here to Help</strong>
              <span className="text-slate-400 text-[11px] block">24/7 Support Available</span>
              <span className="text-white font-bold block">+970 59 123 4567</span>
              <span className="text-slate-400 text-[11px] block">support@ahlalmarkabat.com</span>
              <div className="flex items-center gap-2 pt-2">
                <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[9px] font-bold">
                  Google Play
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[9px] font-bold">
                  App Store
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>© 2025 AHL AL MARKABAT. All rights reserved.</span>
            <span>Made with ❤️ in Palestine</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
