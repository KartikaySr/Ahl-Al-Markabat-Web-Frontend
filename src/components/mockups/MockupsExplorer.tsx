import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  WEB_MOCKUP_SCREENS,
  MOBILE_MOCKUP_SCREENS,
  BRAND_ASSETS,
  MockupScreen,
  BrandAsset,
  ALL_MOCKUPS_COUNT,
} from '../../data/mockupsData';
import {
  Layers,
  Smartphone,
  Monitor,
  FileText,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Building2,
  Filter,
  Eye,
  Info,
  Download,
} from 'lucide-react';

export const MockupsExplorer: React.FC = () => {
  const { language, t } = useApp();
  const [activeTab, setActiveTab] = useState<'web' | 'mobile' | 'brand' | 'facilities' | 'srs'>('web');
  const [webCategoryFilter, setWebCategoryFilter] = useState<'all' | 'customer' | 'provider' | 'admin'>('all');
  const [mobileCategoryFilter, setMobileCategoryFilter] = useState<'all' | 'customer' | 'provider'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lightbox State
  const [selectedScreen, setSelectedScreen] = useState<MockupScreen | null>(null);
  const [selectedBrandAsset, setSelectedBrandAsset] = useState<BrandAsset | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Filtered Web Screens
  const filteredWebScreens = WEB_MOCKUP_SCREENS.filter((s) => {
    const matchesCategory =
      webCategoryFilter === 'all' ||
      (webCategoryFilter === 'customer' && s.category === 'web_customer') ||
      (webCategoryFilter === 'provider' && s.category === 'web_provider') ||
      (webCategoryFilter === 'admin' && s.category === 'web_admin');

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      s.number.toString().includes(q) ||
      s.titleAr.toLowerCase().includes(q) ||
      s.titleEn.toLowerCase().includes(q) ||
      (s.epicId && s.epicId.toLowerCase().includes(q)) ||
      s.moduleAr.toLowerCase().includes(q) ||
      s.moduleEn.toLowerCase().includes(q) ||
      s.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Filtered Mobile Screens
  const filteredMobileScreens = MOBILE_MOCKUP_SCREENS.filter((s) => {
    const matchesCategory =
      mobileCategoryFilter === 'all' ||
      (mobileCategoryFilter === 'customer' && s.category === 'mobile_customer') ||
      (mobileCategoryFilter === 'provider' && s.category === 'mobile_provider');

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      s.number.toString().includes(q) ||
      s.titleAr.toLowerCase().includes(q) ||
      s.titleEn.toLowerCase().includes(q) ||
      (s.epicId && s.epicId.toLowerCase().includes(q)) ||
      s.tags.some((tag) => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedScreen) return;

      if (e.key === 'Escape') {
        setSelectedScreen(null);
        setSelectedBrandAsset(null);
      } else if (e.key === 'ArrowRight') {
        navigateScreen('next');
      } else if (e.key === 'ArrowLeft') {
        navigateScreen('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedScreen, activeTab, filteredWebScreens, filteredMobileScreens]);

  const navigateScreen = (direction: 'next' | 'prev') => {
    if (!selectedScreen) return;

    const list = selectedScreen.category.startsWith('web') ? WEB_MOCKUP_SCREENS : MOBILE_MOCKUP_SCREENS;
    const currentIndex = list.findIndex((s) => s.id === selectedScreen.id);
    if (currentIndex === -1) return;

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = list.length - 1;
    if (newIndex >= list.length) newIndex = 0;

    setSelectedScreen(list[newIndex]);
    setZoomLevel(1);
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="py-8 lg:py-12 bg-slate-950 text-white min-h-screen">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Top Header Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 rounded-3xl border border-amber-400/20 shadow-2xl space-y-4">
          <div className="absolute -top-24 -end-24 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>AAM Visual Assets & Architecture Gallery • {ALL_MOCKUPS_COUNT.total} Assets</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {language === 'ar' ? 'معرض التصاميم ونماذج الشاشات المعتمدة' : 'Official UI/UX Mockup Specification'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {language === 'ar'
                  ? 'استعراض كافة الشاشات والنماذج التفاعلية المعتمدة للمنصة: 54 شاشة ويب للحاسوب واللوحي، 60 شاشة لتطبيقات الهواتف الذكية (iOS/Android)، ودليل الهوية ونظام التصميم والصور المعتمدة.'
                  : 'Complete directory of 54 Web Screens, 60 Mobile Screens, Brand Design System tokens, and verified workshop facilities.'}
              </p>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 text-center min-w-[90px]">
                <span className="block text-xl font-black text-amber-400">{ALL_MOCKUPS_COUNT.web}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Web Screens</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 text-center min-w-[90px]">
                <span className="block text-xl font-black text-blue-400">{ALL_MOCKUPS_COUNT.mobile}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Mobile Screens</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 text-center min-w-[90px]">
                <span className="block text-xl font-black text-emerald-400">{ALL_MOCKUPS_COUNT.brand}</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Brand & Facilities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          {/* Main Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('web');
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'web'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>{language === 'ar' ? 'شاشات الويب (54)' : 'Web Screens (54)'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('mobile');
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'mobile'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{language === 'ar' ? 'شاشات الهواتف (60)' : 'Mobile Screens (60)'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('brand');
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'brand'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'ar' ? 'الهوية ونظام التصميم' : 'Brand & Styles'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('facilities');
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'facilities'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{language === 'ar' ? 'الورش والمنشآت المعتمدة' : 'Verified Facilities'}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('srs');
                setSearchQuery('');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'srs'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/20 scale-[1.02]'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'ar' ? 'مواصفات SRS والتسليم' : 'SRS Specifications'}</span>
            </button>
          </div>

          {/* Search Box */}
          {activeTab !== 'srs' && (
            <div className="relative min-w-[260px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'بحث برقم الشاشة أو الاسم أو الوحدة...' : 'Search by #, title, or module...'}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 ps-10 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-white absolute end-3 top-3"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Sub-Filters for Web Screens */}
        {activeTab === 'web' && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-bold flex items-center gap-1.5 pe-2">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'فلترة حسب البوابة:' : 'Filter Module:'}</span>
              </span>

              <button
                onClick={() => setWebCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  webCategoryFilter === 'all'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? 'كافة الشاشات (54)' : 'All Screens (54)'}
              </button>

              <button
                onClick={() => setWebCategoryFilter('customer')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  webCategoryFilter === 'customer'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? 'بوابة العميل وسوق الخدمات (1-20)' : 'Customer & Marketplace (1-20)'}
              </button>

              <button
                onClick={() => setWebCategoryFilter('provider')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  webCategoryFilter === 'provider'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? 'بوابة الورش وإدارة الصيانة SaaS (21-38)' : 'Provider Workshop SaaS (21-38)'}
              </button>

              <button
                onClick={() => setWebCategoryFilter('admin')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  webCategoryFilter === 'admin'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? 'لوحة التحكم والحوكمة Super Admin (39-54)' : 'Super Admin Governance (39-54)'}
              </button>
            </div>

            <span className="text-slate-400 text-[11px]">
              {language === 'ar'
                ? `عرض ${filteredWebScreens.length} من 54 شاشة`
                : `Showing ${filteredWebScreens.length} of 54 screens`}
            </span>
          </div>
        )}

        {/* Sub-Filters for Mobile Screens */}
        {activeTab === 'mobile' && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-bold flex items-center gap-1.5 pe-2">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'ar' ? 'فلترة التطبيق:' : 'Filter App Flow:'}</span>
              </span>

              <button
                onClick={() => setMobileCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  mobileCategoryFilter === 'all'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? 'كافة الشاشات (60)' : 'All Mobile Screens (60)'}
              </button>

              <button
                onClick={() => setMobileCategoryFilter('customer')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  mobileCategoryFilter === 'customer'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? 'تطبيق العميل للهواتف (1-30)' : 'Customer App (1-30)'}
              </button>

              <button
                onClick={() => setMobileCategoryFilter('provider')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  mobileCategoryFilter === 'provider'
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {language === 'ar' ? 'تطبيق الفني والمزود (31-60)' : 'Technician App (31-60)'}
              </button>
            </div>

            <span className="text-slate-400 text-[11px]">
              {language === 'ar'
                ? `عرض ${filteredMobileScreens.length} من 60 شاشة`
                : `Showing ${filteredMobileScreens.length} of 60 screens`}
            </span>
          </div>
        )}

        {/* TAB 1: WEB SCREENS GRID (1 to 54) */}
        {activeTab === 'web' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {filteredWebScreens.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedScreen(s);
                  setZoomLevel(1);
                }}
                className="group bg-slate-900 rounded-3xl p-3 border border-slate-800 hover:border-amber-400/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-amber-400/5 flex flex-col justify-between"
              >
                {/* Visual Thumbnail with Overlay */}
                <div className="aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-800 group-hover:border-amber-400/40">
                  <img
                    src={s.path}
                    alt={language === 'ar' ? s.titleAr : s.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Screen Number Badge */}
                  <div className="absolute top-2.5 start-2.5 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-400 font-mono font-black text-xs shadow-md">
                    #{s.number}
                  </div>

                  {/* Epic Badge */}
                  {s.epicId && (
                    <div className="absolute top-2.5 end-2.5 px-2 py-0.5 rounded-lg bg-blue-500/20 backdrop-blur-md border border-blue-400/40 text-blue-300 font-mono font-bold text-[10px]">
                      {s.epicId}
                    </div>
                  )}

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <div className="px-3.5 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-4 h-4" />
                      <span>{language === 'ar' ? 'تكبير وفحص الشاشة' : 'Inspect Screen'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="pt-3 px-1 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-400/90 font-bold">
                    <span>{s.category === 'web_customer' ? 'Customer Web' : s.category === 'web_provider' ? 'Workshop SaaS' : 'Admin Console'}</span>
                    <span className="text-slate-400 text-[10px]">{s.filename}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {language === 'ar' ? s.titleAr : s.titleEn}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {language === 'ar' ? s.moduleAr : s.moduleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: MOBILE SCREENS GRID (1 to 60) */}
        {activeTab === 'mobile' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 animate-fade-in">
            {filteredMobileScreens.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedScreen(s);
                  setZoomLevel(1);
                }}
                className="group bg-slate-900 rounded-3xl p-3 border border-slate-800 hover:border-amber-400/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-amber-400/5 flex flex-col justify-between"
              >
                {/* Mobile Device Aspect Frame */}
                <div className="aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden relative border border-slate-800 group-hover:border-amber-400/40">
                  <img
                    src={s.path}
                    alt={language === 'ar' ? s.titleAr : s.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Screen Number Badge */}
                  <div className="absolute top-2 start-2 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-400 font-mono font-black text-[11px]">
                    #{s.number}
                  </div>

                  {/* Flow Badge */}
                  <div className="absolute top-2 end-2 px-1.5 py-0.5 rounded bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 font-mono text-[9px]">
                    {s.number <= 30 ? 'Customer' : 'Provider'}
                  </div>

                  {/* Hover Inspect Icon */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                    <div className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1 shadow-xl">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'عرض' : 'View'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Title */}
                <div className="pt-2.5 px-1 space-y-0.5">
                  <div className="flex justify-between items-center text-[10px] text-amber-400 font-mono">
                    <span>{s.number <= 30 ? 'iOS / Android App' : 'Technician App'}</span>
                    <span className="text-slate-400">{s.epicId}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {language === 'ar' ? s.titleAr : s.titleEn}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BRAND IDENTITY & STYLE GUIDE */}
        {activeTab === 'brand' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BRAND_ASSETS.filter((b) => b.type === 'logo' || b.type === 'styleguide' || b.type === 'onboarding').map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => {
                    setSelectedBrandAsset(asset);
                    setZoomLevel(1);
                  }}
                  className="group bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-amber-400/50 cursor-pointer transition-all duration-300 space-y-4 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold border border-amber-400/30 uppercase tracking-wider">
                      {asset.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{asset.dimensions}</span>
                  </div>

                  <div className="aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group-hover:border-amber-400/30 relative flex items-center justify-center p-4">
                    <img
                      src={asset.path}
                      alt={language === 'ar' ? asset.titleAr : asset.titleEn}
                      className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="px-4 py-2 bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center gap-2 shadow-xl">
                        <ZoomIn className="w-4 h-4" />
                        <span>{language === 'ar' ? 'فحص بجودة فائقة' : 'Inspect Full Resolution'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      {language === 'ar' ? asset.titleAr : asset.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {language === 'ar' ? asset.descriptionAr : asset.descriptionEn}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {asset.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VERIFIED WORKSHOP FACILITIES */}
        {activeTab === 'facilities' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BRAND_ASSETS.filter((b) => b.type === 'facility').map((facility) => (
                <div
                  key={facility.id}
                  onClick={() => {
                    setSelectedBrandAsset(facility);
                    setZoomLevel(1);
                  }}
                  className="group bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-amber-400/50 cursor-pointer transition-all duration-300 space-y-4 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400 font-bold">VERIFIED WORKSHOP FACILITY</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{facility.dimensions}</span>
                  </div>

                  <div className="aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group-hover:border-amber-400/30 relative">
                    <img
                      src={facility.path}
                      alt={language === 'ar' ? facility.titleAr : facility.titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="px-4 py-2 bg-amber-400 text-slate-950 font-black rounded-2xl text-xs flex items-center gap-2 shadow-xl">
                        <ZoomIn className="w-4 h-4" />
                        <span>{language === 'ar' ? 'فحص المنشأة بدقة عالية' : 'Inspect Facility High-Res'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                      {language === 'ar' ? facility.titleAr : facility.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {language === 'ar' ? facility.descriptionAr : facility.descriptionEn}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {facility.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-semibold"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SRS SPECIFICATION & EPICS */}
        {activeTab === 'srs' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-300 animate-fade-in">
            <div className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-xs font-black">AAM-SRS-001 • v1.0 Production Baseline</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Approved</span>
                </div>
                <h2 className="text-2xl font-black text-white">
                  Ahl Al Markabat (أهل المركبات) — Software Requirements Specification
                </h2>
                <p className="text-slate-400">
                  Automotive Services Marketplace + Vehicle Ownership Platform + Workshop SaaS
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border border-amber-400/40 shrink-0 self-start sm:self-center">
                <img src="/images/AHL AL MARKABAT.png" alt="Ahl Al Markabat" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-850 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold block">Architecture Core</span>
                <p className="font-bold text-white">Next.js + NestJS + PostgreSQL / PostGIS</p>
              </div>
              <div className="p-4 bg-slate-850 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold block">Mobile Clients</span>
                <p className="font-bold text-blue-400">React Native (Customer + Provider Apps)</p>
              </div>
              <div className="p-4 bg-slate-850 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold block">Market Target</span>
                <p className="font-bold text-amber-400">Palestine (فلسطين) • Multi-Country</p>
              </div>
              <div className="p-4 bg-slate-850 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-xs font-bold block">Design Consistency</span>
                <p className="font-bold text-emerald-400">54 Web Screens + 60 Mobile Screens</p>
              </div>
            </div>

            {/* Complete 15 Epics Matrix */}
            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>15 Core Epics & Screen Workflows:</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {[
                  { id: 'EPIC-01', title: 'Identity & Provider Onboarding KYC', screens: 'Web 1-4, Mob 1-4' },
                  { id: 'EPIC-02', title: 'Vehicle Garage & Digital Ownership', screens: 'Web 9, Mob 4, 21-25' },
                  { id: 'EPIC-03', title: 'Service Taxonomy (24 Categories) & Search', screens: 'Web 1-3, Mob 5-10' },
                  { id: 'EPIC-04', title: 'Provider Public Profile & Verification', screens: 'Web 3-4, Mob 6-10' },
                  { id: 'EPIC-05', title: 'Service Requests & Slot Booking', screens: 'Web 5, 7, Mob 11-15' },
                  { id: 'EPIC-06', title: 'Quotes & Side-by-Side Comparison', screens: 'Web 6, Mob 16-20' },
                  { id: 'EPIC-07', title: 'Job Execution & Photo Evidence', screens: 'Web 8, 10, Mob 41-50' },
                  { id: 'EPIC-08', title: 'Messaging & Notifications', screens: 'Web 11-15, Mob 26-30' },
                  { id: 'EPIC-09', title: '24/7 Emergency Towing & Roadside SOS', screens: 'Web 43-48, Mob 5' },
                  { id: 'EPIC-10', title: 'Reviews & Quality Moderation', screens: 'Web 4, Mob 55-60' },
                  { id: 'EPIC-11', title: 'Provider Workshop SaaS & Work Orders', screens: 'Web 21-38, Mob 31-40' },
                  { id: 'EPIC-12', title: 'Invoices, Finance & Commission', screens: 'Web 16-20, 52-54' },
                  { id: 'EPIC-13', title: 'Super Admin Governance & Geolocation', screens: 'Web 39-54' },
                  { id: 'EPIC-14', title: 'AI Smart Diagnostics Assistant', screens: 'Web AI Modal, Mob AI' },
                  { id: 'EPIC-15', title: 'Spare Parts Marketplace (Phase 2)', screens: 'Web 2, Mob 12' },
                ].map((epic) => (
                  <div key={epic.id} className="p-3.5 bg-slate-850 rounded-2xl border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400 font-mono font-bold text-[11px]">{epic.id}</span>
                      <span className="text-slate-400 text-[10px] font-mono">{epic.screens}</span>
                    </div>
                    <p className="font-bold text-white text-xs">{epic.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE FULL-SCREEN LIGHTBOX MODAL */}
      {(selectedScreen || selectedBrandAsset) && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in select-none">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              {selectedScreen && (
                <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-mono font-black text-sm">
                  #{selectedScreen.number}
                </span>
              )}
              <div>
                <h2 className="text-sm sm:text-base font-black text-white">
                  {selectedScreen
                    ? language === 'ar'
                      ? selectedScreen.titleAr
                      : selectedScreen.titleEn
                    : language === 'ar'
                    ? selectedBrandAsset?.titleAr
                    : selectedBrandAsset?.titleEn}
                </h2>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedScreen ? selectedScreen.filename : selectedBrandAsset?.filename}
                </span>
              </div>
            </div>

            {/* Lightbox Action Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => setZoomLevel(1)}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleCopyUrl(selectedScreen ? selectedScreen.path : selectedBrandAsset?.path || '')}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-xs"
                title="Copy Image URL"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>

              <a
                href={selectedScreen ? selectedScreen.path : selectedBrandAsset?.path}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Open Original Image in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  setSelectedScreen(null);
                  setSelectedBrandAsset(null);
                }}
                className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 ms-2"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Zoomable Image Canvas */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-4 relative">
            {selectedScreen && (
              <button
                onClick={() => navigateScreen('prev')}
                className="absolute start-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-400 hover:text-slate-950 transition-all z-20 shadow-2xl"
                title="Previous Screen (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div
              className="transition-transform duration-200 max-h-[75vh] flex items-center justify-center"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={selectedScreen ? selectedScreen.path : selectedBrandAsset?.path}
                alt="Mockup Screen"
                className="max-h-[75vh] max-w-[85vw] object-contain rounded-2xl shadow-2xl border border-slate-800"
              />
            </div>

            {selectedScreen && (
              <button
                onClick={() => navigateScreen('next')}
                className="absolute end-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 border border-slate-700 text-white hover:bg-amber-400 hover:text-slate-950 transition-all z-20 shadow-2xl"
                title="Next Screen (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Info Drawer */}
          <div className="border-t border-slate-800 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="space-y-0.5">
              <span className="font-bold text-amber-400 block">
                {selectedScreen?.moduleAr || selectedBrandAsset?.titleAr}
              </span>
              <p className="text-slate-400 max-w-4xl text-[11px]">
                {selectedScreen?.descriptionAr || selectedBrandAsset?.descriptionAr}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-slate-500 font-mono text-[11px]">
              {selectedScreen?.epicId && (
                <span className="bg-slate-800 px-2 py-0.5 rounded text-blue-400 font-bold">
                  {selectedScreen.epicId}
                </span>
              )}
              <span>{selectedScreen ? `Category: ${selectedScreen.category}` : 'Asset: Master'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
