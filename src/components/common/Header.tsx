import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { NotificationDropdown } from './NotificationDropdown';
import {
  Globe,
  AlertTriangle,
  Sparkles,
  Wrench,
  ChevronDown,
  Menu,
  X,
  Bell,
  CheckCircle2,
  Smartphone,
  Monitor,
  Home,
  Car,
  ShieldCheck,
  User,
  LogIn,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  Truck,
  DollarSign,
  HelpCircle,
  Phone,
  Compass,
  FileText,
  Clock,
  Layers,
  Calendar,
  Package,
  MessageSquare,
  Building2,
  Shield,
  Lock,
  Activity,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    role,
    setRole,
    countries,
    selectedCountry,
    setSelectedCountryId,
    activeTab,
    setActiveTab,
    customerActiveTab,
    setCustomerActiveTab,
    adminActivePillar,
    setAdminActivePillar,
    setIsQuoteModalOpen,
    setIsSOSModalOpen,
    setIsAIAssistantOpen,
    openAuthModal,
    user,
    isAuthenticated,
    logout,
    cart,
    setIsCartModalOpen,
    notifications,
    unreadNotificationsCount,
    isNotificationsOpen,
    setIsNotificationsOpen,
    customerProfile,
    isBackendConnected,
    checkBackendConnection,
    providerProfile,
    adminProfile,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isPartsDropdownOpen, setIsPartsDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const isCustomerPortal = role === 'customer' && (activeTab === 'customer' || activeTab === 'garage' || activeTab === 'vehicle-history');
  const isWorkshopPortal = role === 'provider' || activeTab === 'workshop';
  const isAdminPortal = role === 'admin' || activeTab === 'admin';
  const isHomePage = activeTab === 'home';
  const isMarketplacePage = activeTab === 'marketplace' || activeTab === 'product-detail' || activeTab === 'cart-checkout';
  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  // Role-Aware User Display Name (Customer, Mechanic/Workshop, Super Admin)
  const currentRoleDisplayName =
    role === 'provider'
      ? (user?.name || providerProfile?.name || (language === 'ar' ? 'كراج إيرليندو' : 'Erlindo Garage'))
      : role === 'admin'
      ? (adminProfile?.name || (language === 'ar' ? 'الإدارة المركزية' : 'Platform Super Admin'))
      : (user?.name || customerProfile?.name || (language === 'ar' ? 'عمر عبد الله' : 'Ahmed Al-Mansoor'));

  // Shopping Cart icon appears ONLY on Customer Portal and Marketplace pages, NEVER on the public Home page
  const showCart = (isCustomerPortal || isMarketplacePage) && !isWorkshopPortal && !isAdminPortal && !isHomePage;

  // Notification Bell appears on Customer, Mechanics/Workshop, and Admin, never on public Home page
  const showNotifications = !isHomePage;

  const navLinks = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'services', labelAr: 'الخدمات', labelEn: 'Services', hasDropdown: true },
    { id: 'providers', labelAr: 'الورش والمراكز', labelEn: 'Providers' },
    { id: 'bookings', labelAr: 'الحجوزات', labelEn: 'Bookings' },
    { id: 'marketplace', labelAr: 'قطع الغيار', labelEn: 'Marketplace' },
    { id: 'fleet', labelAr: 'حلول الأساطيل', labelEn: 'Fleet Solutions' },
    { id: 'pricing', labelAr: 'الأسعار', labelEn: 'Pricing' },
    { id: 'about', labelAr: 'عن المنصة', labelEn: 'Resources', hasDropdown: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B1528] border-b border-slate-800 text-white transition-all shadow-md">
      {/* Top Utility Ribbon */}
      <div className="bg-[#070E1B] text-slate-400 text-[11px] py-1.5 px-4 sm:px-8 lg:px-12 border-b border-slate-800/80">
        <div className="w-full flex flex-wrap items-center justify-between gap-3">
          {/* Marketing statement & Emergency quick hotline */}
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold tracking-wide">
              {language === 'ar' ? '« أهل المركبات — مركبتك عند أهلها »' : '« AHL AL MARKABAT — Your Vehicle, In Expert Hands »'}
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{language === 'ar' ? 'طوارئ 24/7:' : '24/7 Support:'}</span>
              <strong className="text-white font-mono">+970 59 123 4567</strong>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-white transition-colors font-bold text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => {
              setActiveTab('home');
              setRole('customer');
            }}
            className="cursor-pointer"
          >
            <Logo size="md" variant="dark" mode="night" />
          </div>

          {/* Desktop Navigation Links */}
          {isAdminPortal ? (
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {[
                { id: 'overview', labelAr: 'عمليات المنظومة', labelEn: 'Platform Ops', icon: Activity },
                { id: 'providers', labelAr: 'الورش والتوثيق', labelEn: 'KYC & Providers', icon: Shield },
                { id: 'commerce', labelAr: 'المستخدمين والتجارة', labelEn: 'Users & Commerce', icon: ShoppingBag },
                { id: 'financials', labelAr: 'المالية والضرائب', labelEn: 'Financials & Rules', icon: DollarSign },
                { id: 'system', labelAr: 'الأمان والمنظومة', labelEn: 'Security & System', icon: Lock },
              ].map((pillar) => {
                const Icon = pillar.icon;
                const isActive = adminActivePillar === pillar.id;

                return (
                  <button
                    key={pillar.id}
                    onClick={() => {
                      setActiveTab('admin');
                      setRole('admin');
                      setAdminActivePillar(pillar.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'text-amber-400 font-black bg-slate-800/90 border border-slate-700/60 shadow-sm'
                        : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{language === 'ar' ? pillar.labelAr : pillar.labelEn}</span>
                  </button>
                );
              })}
            </nav>
          ) : isWorkshopPortal ? (
            <nav className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-black truncate max-w-[200px]" title={user?.name || providerProfile?.name || 'Erlindo Garage'}>
                  {user?.name || providerProfile?.name || 'Erlindo Garage'}
                </span>
                <span className="text-slate-500">|</span>
                <span className="text-emerald-400 font-mono">
                  {isNewUser
                    ? '0/4 Active Bays'
                    : '4/6 Active Bays'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-950/40 border border-blue-800/50 text-blue-300 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="truncate max-w-[180px]">
                  {user?.city
                    ? `${user.city} Hub`
                    : (language === 'ar' ? 'الفرع الرئيسي' : 'Main Hub')}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Accepting Bookings &amp; RFQs</span>
              </div>
            </nav>
          ) : isCustomerPortal ? (
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {[
                { id: 'garage', labelAr: 'كراجي والمركبات', labelEn: 'My Garage & Vault', icon: Car },
                { id: 'bookings', labelAr: 'الحجوزات والخدمات', labelEn: 'Bookings & Service', icon: Calendar },
                { id: 'history', labelAr: 'سجل الصيانة والمصروفات', labelEn: 'Service History & Expenses', icon: FileText },
                { id: 'marketplace', labelAr: 'متجر قطع الغيار', labelEn: 'Parts Store', icon: Package },
                { id: 'providers', labelAr: 'الورش والمراكز', labelEn: 'Find Workshops', icon: Wrench },
              ].map((pillar) => {
                const Icon = pillar.icon;
                const isActive =
                  customerActiveTab === pillar.id ||
                  (pillar.id === 'garage' && ['documents', 'warranties'].includes(customerActiveTab)) ||
                  (pillar.id === 'bookings' && ['quotations', 'messages'].includes(customerActiveTab)) ||
                  (pillar.id === 'history' && ['analytics', 'alerts', 'invoices', 'profile'].includes(customerActiveTab));

                return (
                  <button
                    key={pillar.id}
                    onClick={() => {
                      setActiveTab('customer');
                      setCustomerActiveTab(pillar.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'text-amber-400 font-black bg-slate-800/90 border border-slate-700/60 shadow-sm'
                        : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{language === 'ar' ? pillar.labelAr : pillar.labelEn}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;

              if (link.id === 'services') {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setActiveTab('services')}
                      className={`px-3.5 py-2 rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'text-amber-400 font-black bg-slate-800/90 border border-slate-700/60 shadow-sm'
                          : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{language === 'ar' ? link.labelAr : link.labelEn}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {isServicesDropdownOpen && (
                      <div className="absolute start-0 top-full mt-0 w-64 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-slide-up space-y-1">
                        <button
                          onClick={() => {
                            setActiveTab('services');
                            setIsServicesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2.5"
                        >
                          <Layers className="w-4 h-4 text-blue-400" />
                          <div>
                            <div>{language === 'ar' ? 'كافة خدمات الصيانة' : 'All Automotive Services'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">21+ {language === 'ar' ? 'تخصصاً هندسياً' : 'Specialized Categories'}</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('request-quote');
                            setIsQuoteModalOpen(true);
                            setIsServicesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2.5"
                        >
                          <Wrench className="w-4 h-4 text-amber-400" />
                          <div>
                            <div>{language === 'ar' ? 'طلب عرض سعر فوري' : 'Request a Quote'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{language === 'ar' ? 'استقبل عروض من ورش معتمدة' : 'Get best competitive quotes'}</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('book-service');
                            setIsServicesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2.5"
                        >
                          <Clock className="w-4 h-4 text-emerald-400" />
                          <div>
                            <div>{language === 'ar' ? 'حجز موعد صيانة' : 'Book a Service'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{language === 'ar' ? 'اختر الوقت والورشة والخدمة' : 'Fast 6-step online booking'}</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setIsSOSModalOpen(true);
                            setIsServicesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-red-950/40 text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-2.5"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <div>
                            <div>{language === 'ar' ? 'طوارئ ونش وإنقاذ 24/7' : 'Emergency Roadside SOS'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{language === 'ar' ? 'استجابة فورية وتتبع GPS' : '24/7 fast breakdown assistance'}</div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              if (link.id === 'about') {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setIsResourcesDropdownOpen(true)}
                    onMouseLeave={() => setIsResourcesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setActiveTab('about')}
                      className={`px-3.5 py-2 rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'text-amber-400 font-black bg-slate-800/90 border border-slate-700/60 shadow-sm'
                          : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{language === 'ar' ? link.labelAr : link.labelEn}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {isResourcesDropdownOpen && (
                      <div className="absolute start-0 top-full mt-0 w-60 bg-[#0B1528] border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-slide-up space-y-1">
                        <button
                          onClick={() => {
                            setActiveTab('about');
                            setIsResourcesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2.5"
                        >
                          <FileText className="w-4 h-4 text-blue-400" />
                          <div>
                            <div>{language === 'ar' ? 'عن المنصة وقصتنا' : 'About Ahl Al Markabat'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{language === 'ar' ? 'الرؤية وفريق العمل' : 'Our Mission & Leadership'}</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('become-provider');
                            setIsResourcesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2.5"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          <div>
                            <div>{language === 'ar' ? 'انضم كشريك / ورشة' : 'Become a Provider'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{language === 'ar' ? 'وسّع أعمالك مع المنصة' : 'Grow your auto business'}</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('help');
                            setIsResourcesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2.5"
                        >
                          <HelpCircle className="w-4 h-4 text-emerald-400" />
                          <div>
                            <div>{language === 'ar' ? 'مركز المساعدة والأسئلة' : 'Help Center & FAQ'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{language === 'ar' ? 'دليل الاستخدام والأمان' : 'Guides & Support'}</div>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('contact');
                            setIsResourcesDropdownOpen(false);
                          }}
                          className="w-full text-start p-2.5 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-2.5"
                        >
                          <Phone className="w-4 h-4 text-indigo-400" />
                          <div>
                            <div>{language === 'ar' ? 'اتصل بنا وفروعنا' : 'Contact Us'}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{language === 'ar' ? 'مواقع الفروع في فلسطين' : 'Locations in Palestine'}</div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'bookings' && isAuthenticated) {
                      setActiveTab('customer');
                      setCustomerActiveTab('bookings');
                    } else {
                      setActiveTab(link.id as any);
                      if (link.id === 'customer') {
                        setRole('customer');
                      }
                    }
                  }}
                  className={`px-3.5 py-2 rounded-xl text-sm xl:text-base font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 font-black bg-slate-800/90 border border-slate-700/60 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.id === 'customer' && <Car className="w-4 h-4 text-amber-400" />}
                  <span>{language === 'ar' ? link.labelAr : link.labelEn}</span>
                </button>
              );
            })}
          </nav>
          )}

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* 24/7 Roadside SOS Beacon */}
            <button
              onClick={() => setIsSOSModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
              <span>{language === 'ar' ? 'طوارئ 24/7' : 'SOS'}</span>
            </button>

            {/* Smart AI Diagnosis (Visible only on Public & Customer Portal) */}
            {!isWorkshopPortal && !isAdminPortal && (
              <button
                onClick={() => setIsAIAssistantOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI</span>
              </button>
            )}

            {/* Shopping Cart Icon with Badge (Directly close to Notification Bell) */}
            {showCart && (
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center hover:scale-105 active:scale-95 shadow-sm"
                title={language === 'ar' ? 'سلة المشتريات والمعاملات' : 'Shopping Cart & Orders'}
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 bg-amber-400 text-slate-950 rounded-full text-[9px] font-black flex items-center justify-center font-mono shadow-sm animate-pulse">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </button>
            )}

            {/* Notification Bell (Visible on Customer, Mechanics/Workshop, Admin, NEVER on Home) */}
            {showNotifications && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center hover:scale-105 active:scale-95"
                  title={language === 'ar' ? 'التنبيهات والإشعارات' : 'Notifications'}
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white rounded-full text-[9px] font-black flex items-center justify-center font-mono shadow-sm animate-pulse">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>

                <NotificationDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>
            )}

            {/* Sign In & Join Now Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs">
                <button
                  onClick={() => {
                    if (role === 'provider') setActiveTab('workshop');
                    else if (role === 'admin') setActiveTab('admin');
                    else {
                      setActiveTab('customer');
                      setCustomerActiveTab('garage');
                    }
                  }}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity text-start"
                  title={language === 'ar' ? 'الذهاب إلى لوحة التحكم' : 'Go to Dashboard'}
                >
                  <User className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-white max-w-[140px] truncate" title={currentRoleDisplayName}>
                    {currentRoleDisplayName}
                  </span>
                </button>
                <button
                  onClick={logout}
                  className="p-1 text-slate-400 hover:text-red-400"
                  title={language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-3.5 py-2 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-bold transition-all"
                >
                  <span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                </button>

                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>{language === 'ar' ? 'انضم الآن' : 'Join Now'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button & Mobile Cart & Mobile Notification */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Universal Mobile Notification Bell (Hidden on Home) */}
            {showNotifications && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-xl bg-slate-800 text-white shadow-sm border border-slate-700"
                  title={language === 'ar' ? 'التنبيهات' : 'Notifications'}
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -end-1 min-w-[16px] h-[16px] px-0.5 bg-red-500 text-white rounded-full text-[8px] font-black flex items-center justify-center font-mono">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Mobile Shopping Cart (Directly next to Mobile Notification Bell) */}
            {showCart && (
              <button
                onClick={() => setIsCartModalOpen(true)}
                className="relative p-2 rounded-xl bg-slate-800 text-white shadow-sm border border-slate-700"
                title={language === 'ar' ? 'سلة المشتريات والمعاملات' : 'Shopping Cart & Orders'}
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -end-1 min-w-[16px] h-[16px] px-0.5 bg-amber-400 text-slate-950 rounded-full text-[8px] font-black flex items-center justify-center font-mono">
                    {cart.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => setIsSOSModalOpen(true)}
              className="p-2 rounded-xl bg-red-600 text-white shadow-sm"
            >
              <AlertTriangle className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#0B1528] border-t border-slate-800 px-4 py-6 space-y-4 shadow-2xl animate-slide-up">
          {isAuthenticated && (
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                  role === 'provider' ? 'bg-amber-400 text-slate-950' : role === 'admin' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                }`}>
                  {role === 'provider' ? <Wrench className="w-4 h-4" /> : role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">
                    {role === 'provider' ? (language === 'ar' ? 'ورشة معتمدة' : 'Workshop SaaS') : role === 'admin' ? (language === 'ar' ? 'إدارة عليا' : 'Super Admin') : (language === 'ar' ? 'بوابة العميل' : 'Customer')}
                  </span>
                  <div className="text-xs font-bold text-white truncate">{currentRoleDisplayName}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (role === 'provider') setActiveTab('workshop');
                  else if (role === 'admin') setActiveTab('admin');
                  else {
                    setActiveTab('customer');
                    setCustomerActiveTab('garage');
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-slate-700 shrink-0"
              >
                {language === 'ar' ? 'لوحة التحكم →' : 'Dashboard →'}
              </button>
            </div>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'bookings' && isAuthenticated) {
                    setActiveTab('customer');
                    setCustomerActiveTab('bookings');
                  } else {
                    setActiveTab(link.id as any);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-start p-3 rounded-xl font-bold text-sm transition-all flex items-center justify-between ${
                  activeTab === link.id
                    ? 'bg-amber-400 text-slate-950 font-black'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{language === 'ar' ? link.labelAr : link.labelEn}</span>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2.5">
            {isAuthenticated ? (
              <div className="p-3 bg-slate-800 rounded-xl flex items-center justify-between">
                <button
                  onClick={() => {
                    if (role === 'provider') setActiveTab('workshop');
                    else if (role === 'admin') setActiveTab('admin');
                    else {
                      setActiveTab('customer');
                      setCustomerActiveTab('garage');
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 min-w-0 hover:opacity-80 transition-opacity text-start"
                >
                  <User className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-white text-xs truncate">{currentRoleDisplayName}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 shrink-0 ps-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'خروج' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal('signin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}</span>
                </button>

                <button
                  onClick={() => {
                    openAuthModal('signup');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-amber-400 text-slate-950 font-black text-xs rounded-xl text-center flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>{language === 'ar' ? 'إنشاء حساب' : 'Join Now'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
