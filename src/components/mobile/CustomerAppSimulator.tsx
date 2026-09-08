import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import { MOBILE_MOCKUP_SCREENS } from '../../data/mockupsData';
import {
  Home,
  Compass,
  FileText,
  Car,
  User,
  Search,
  MapPin,
  AlertTriangle,
  Star,
  ChevronRight,
  ChevronLeft,
  Wrench,
  ShieldCheck,
  Zap,
  Phone,
  Clock,
  Sparkles,
  DollarSign,
  Layers,
  Image,
  Eye,
} from 'lucide-react';

export const CustomerAppSimulator: React.FC = () => {
  const {
    language,
    t,
    vehicles,
    providers,
    serviceRequests,
    setIsQuoteModalOpen,
    setIsSOSModalOpen,
    setIsAIAssistantOpen,
    setSelectedProviderModal,
    setIsAuthModalOpen,
    formatPrice,
  } = useApp();

  const [simulatorMode, setSimulatorMode] = useState<'interactive' | 'mockup'>('interactive');
  const [activeMobileTab, setActiveMobileTab] = useState<'home' | 'explore' | 'requests' | 'garage' | 'account'>('home');
  const [selectedMockupIndex, setSelectedMockupIndex] = useState(0);

  // Customer Mobile Screens (1 to 30 + Onboarding)
  const customerMockups = [
    {
      id: 'mob-onboarding',
      number: 0,
      filename: '01_Onboarding.png',
      path: '/images/01_Onboarding.png',
      titleAr: 'شاشة الترحيب والتهيئة (Onboarding)',
      titleEn: 'Customer Onboarding Screen',
    },
    ...MOBILE_MOCKUP_SCREENS.filter((s) => s.category === 'mobile_customer'),
  ];

  const currentMockup = customerMockups[selectedMockupIndex] || customerMockups[0];
  const primaryVehicle = vehicles.find((v) => v.isPrimary) || vehicles[0];

  return (
    <div className="py-8 bg-slate-900 min-h-screen flex flex-col items-center justify-center p-4">
      {/* Container Device Heading & Mode Switcher */}
      <div className="text-center mb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-400 text-xs font-bold border border-amber-400/30">
          <Car className="w-3.5 h-3.5" />
          <span>Ahl Al Markabat • Customer Mobile App (React Native Simulated)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          {language === 'ar' ? 'تطبيق العميل للهواتف الذكية' : 'Customer Mobile Application'}
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          {language === 'ar'
            ? 'يمكنك التبديل بين المحاكي التفاعلي المباشر ومعرض شاشات التصميم الأصلية (30 شاشة معتمدة)'
            : 'Toggle between interactive live simulation and authentic 30+ native design mockup screens'}
        </p>

        {/* Mode Switcher Pill */}
        <div className="inline-flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800 shadow-xl">
          <button
            onClick={() => setSimulatorMode('interactive')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              simulatorMode === 'interactive'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'المحاكي التفاعلي' : 'Live Interactive App'}</span>
          </button>

          <button
            onClick={() => setSimulatorMode('mockup')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              simulatorMode === 'mockup'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'معرض الشاشات الأصلية (30)' : 'Native Mockup Screens (30)'}</span>
          </button>
        </div>
      </div>

      {/* iPhone 16 Pro Device Frame */}
      <div className="relative w-full max-w-[390px] h-[820px] bg-slate-950 rounded-[50px] p-3.5 shadow-2xl border-[5px] border-slate-800 ring-1 ring-white/10 flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
          <div className="w-3 h-3 rounded-full bg-amber-400/40 animate-pulse" />
        </div>

        {/* MODE 1: NATIVE MOCKUP SCREEN VIEWER */}
        {simulatorMode === 'mockup' ? (
          <div className="bg-slate-950 flex-1 rounded-[40px] overflow-hidden flex flex-col pt-9 pb-2 relative text-white">
            {/* Mockup Image Display */}
            <div className="flex-1 relative overflow-hidden bg-black flex items-center justify-center">
              <img
                src={currentMockup.path}
                alt={currentMockup.titleEn}
                className="w-full h-full object-cover object-top"
              />

              {/* Prev / Next Floating Navigation */}
              <button
                onClick={() =>
                  setSelectedMockupIndex((prev) =>
                    prev > 0 ? prev - 1 : customerMockups.length - 1
                  )
                }
                className="absolute start-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md transition-all shadow-lg"
                title="Previous Screen"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  setSelectedMockupIndex((prev) =>
                    prev < customerMockups.length - 1 ? prev + 1 : 0
                  )
                }
                className="absolute end-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md transition-all shadow-lg"
                title="Next Screen"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Screen Switcher Toolbar */}
            <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5 truncate">
                <span className="text-[10px] text-amber-400 font-mono font-bold block">
                  Screen #{currentMockup.number} • {currentMockup.filename}
                </span>
                <p className="font-bold text-white text-[11px] truncate">
                  {language === 'ar' ? currentMockup.titleAr : currentMockup.titleEn}
                </p>
              </div>

              <select
                value={selectedMockupIndex}
                onChange={(e) => setSelectedMockupIndex(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded-lg px-2 py-1 outline-none cursor-pointer shrink-0"
              >
                {customerMockups.map((m, idx) => (
                  <option key={m.id} value={idx}>
                    #{m.number} - {m.filename}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          /* MODE 2: INTERACTIVE REACT SIMULATOR */
          <div className="bg-slate-50 flex-1 rounded-[40px] overflow-hidden flex flex-col pt-9 pb-2 select-none relative font-sans text-slate-900">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB 1: HOME */}
            {activeMobileTab === 'home' && (
              <div className="space-y-4 animate-fade-in">
                {/* Top Brand Bar & Location */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src="/logo-main.png"
                      alt="Ahl Al Markabat"
                      className="w-8 h-8 rounded-xl object-contain shadow-sm border border-slate-200 bg-white"
                    />
                    <div className="flex items-center gap-1.5 bg-slate-200/80 px-2.5 py-1 rounded-full text-slate-700 font-semibold text-[11px]">
                      <MapPin className="w-3 h-3 text-red-500" />
                      <span>رام الله • الماصيون</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAIAssistantOpen(true)}
                    className="p-1.5 bg-brand-navy text-amber-400 rounded-full shadow-sm hover:scale-105 transition-transform"
                    title="AI Smart Assistant"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>

                {/* Hero Search Box */}
                <div
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">
                    {language === 'ar' ? 'ما الذي تحتاجه سيارتك؟' : 'What does your car need?'}
                  </span>
                </div>

                {/* Roadside Emergency 1-Tap SOS Card */}
                <div
                  onClick={() => setIsSOSModalOpen(true)}
                  className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-3.5 rounded-2xl shadow-md flex items-center justify-between cursor-pointer border border-red-400"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-amber-300 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black">
                        {language === 'ar' ? 'طوارئ ونش وإنقاذ 24/7' : '24/7 Emergency SOS'}
                      </h4>
                      <p className="text-[10px] text-red-100">
                        {language === 'ar' ? 'طلب سطحة فورية بضغطة واحدة' : 'Instant Towing Dispatch'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-1 rounded-lg">
                    SOS
                  </span>
                </div>

                {/* Active Vehicle Status Card */}
                {primaryVehicle && (
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={primaryVehicle.image}
                        alt="Vehicle"
                        className="w-12 h-12 rounded-xl object-cover border"
                      />
                      <div>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">
                          {primaryVehicle.plateNumber}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 mt-0.5">
                          {language === 'ar' ? (primaryVehicle.makeAr || primaryVehicle.make) : primaryVehicle.make}{' '}
                          {language === 'ar' ? (primaryVehicle.modelAr || primaryVehicle.model) : primaryVehicle.model}
                        </h4>
                        <p className="text-[10px] text-slate-500">{primaryVehicle.mileage.toLocaleString()} {language === 'ar' ? 'كم' : 'km'}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-base font-black text-emerald-600 font-mono">
                        {primaryVehicle.healthScore}%
                      </span>
                      <span className="block text-[9px] text-slate-400">حالة ممتازة</span>
                    </div>
                  </div>
                )}

                {/* Main Service Categories Grid */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <h4 className="font-black text-slate-900">
                      {language === 'ar' ? 'الخدمات الرئيسية' : 'Main Categories'}
                    </h4>
                    <span
                      onClick={() => setActiveMobileTab('explore')}
                      className="text-amber-600 font-bold text-[11px] cursor-pointer"
                    >
                      {language === 'ar' ? 'المزيد ←' : 'More →'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    {SERVICE_CATEGORIES.slice(0, 8).map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => setIsQuoteModalOpen(true)}
                        className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-amber-400"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-800 line-clamp-1">{cat.nameAr}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Top Rated Providers */}
                <div className="space-y-2">
                  <h4 className="font-black text-slate-900 text-xs">
                    {language === 'ar' ? 'أفضل الورش القريبة منك' : 'Top Rated Nearby'}
                  </h4>

                  <div className="space-y-2">
                    {providers.slice(0, 2).map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProviderModal(p)}
                        className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={p.avatar} alt="Workshop" className="w-10 h-10 rounded-xl object-cover" />
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 truncate max-w-[170px]">
                              {p.businessNameAr}
                            </h5>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                              <span className="text-amber-500 font-bold">★ {p.rating}</span>
                              <span>• {p.distanceKm} كم</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-lg">
                          عرض
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EXPLORE */}
            {activeMobileTab === 'explore' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <h3 className="text-sm font-black text-slate-900">
                  {language === 'ar' ? 'تصفح شجرة الخدمات (21+)' : 'Explore 21+ Services'}
                </h3>
                <div className="space-y-2">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h4 className="font-bold text-slate-900">{cat.nameAr}</h4>
                        <p className="text-[10px] text-slate-500">{cat.nameEn}</p>
                      </div>
                      <span className="font-mono text-amber-600 font-bold text-[11px]">
                        من {formatPrice(cat.basePrice)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: REQUESTS */}
            {activeMobileTab === 'requests' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <h3 className="text-sm font-black text-slate-900">
                  {language === 'ar' ? 'طلباتي وعروض الأسعار' : 'My Requests & Quotes'}
                </h3>
                {serviceRequests.map((req) => (
                  <div key={req.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[10px] text-amber-600 font-bold">{req.referenceId}</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        {req.quotes.length} عروض مستلمة
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">{req.vehicleSummary}</h4>
                    <p className="text-[11px] text-slate-600">{req.description}</p>
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="w-full py-2 bg-amber-400 font-black text-brand-darkest rounded-xl text-[11px] mt-1"
                    >
                      مقارنة العروض واختيار الورشة
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: GARAGE */}
            {activeMobileTab === 'garage' && (
              <div className="space-y-3 animate-fade-in text-xs">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black text-slate-900">
                    {language === 'ar' ? 'كراج مركباتي' : 'My Garage'}
                  </h3>
                  <span className="text-[10px] font-bold text-amber-600">+ إضافة</span>
                </div>

                {vehicles.map((v) => (
                  <div key={v.id} className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-3">
                      <img src={v.image} alt={v.make} className="w-14 h-14 rounded-xl object-cover border" />
                      <div>
                        <h4 className="font-black text-slate-900">
                          {v.make} {v.model}
                        </h4>
                        <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                          {v.plateNumber}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1">{v.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t flex justify-between items-center text-[10px]">
                      <span>صحة المركبة: <strong className="text-emerald-600">{v.healthScore}%</strong></span>
                      <span>ينتهي الترخيص: <strong className="text-slate-700">{v.mulkiyaExpiry}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 5: ACCOUNT */}
            {activeMobileTab === 'account' && (
              <div className="space-y-4 animate-fade-in text-xs">
                <div className="text-center space-y-1">
                  <div className="w-16 h-16 rounded-full bg-brand-navy text-amber-400 font-bold text-xl flex items-center justify-center mx-auto shadow-md">
                    ع ع
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">عمر عبد الله</h4>
                  <p className="text-slate-500 text-[11px] font-mono">+970 59 111 2233</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 divide-y text-slate-700">
                  <div className="p-3 flex justify-between items-center">
                    <span>وثائقي الرقمية (3)</span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span>طرق الدفع والبطاقات</span>
                    <ChevronLeft className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span>اللغة (العربية / English)</span>
                    <span className="text-[10px] font-bold text-amber-600">العربية</span>
                  </div>
                  <div
                    onClick={() => setIsAuthModalOpen(true)}
                    className="p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50 text-amber-600 font-bold"
                  >
                    <span>تسجيل الدخول / تبديل الحساب</span>
                    <span className="text-xs">🔑</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Native Navigation Bar (From Section 9 of Blueprint) */}
          <div className="bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around text-[10px] font-bold">
            <button
              onClick={() => setActiveMobileTab('home')}
              className={`flex flex-col items-center gap-0.5 ${
                activeMobileTab === 'home' ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('explore')}
              className={`flex flex-col items-center gap-0.5 ${
                activeMobileTab === 'explore' ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{language === 'ar' ? 'استكشف' : 'Explore'}</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('requests')}
              className={`flex flex-col items-center gap-0.5 ${
                activeMobileTab === 'requests' ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'ar' ? 'الطلبات' : 'Requests'}</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('garage')}
              className={`flex flex-col items-center gap-0.5 ${
                activeMobileTab === 'garage' ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>{language === 'ar' ? 'كراجي' : 'Garage'}</span>
            </button>

            <button
              onClick={() => setActiveMobileTab('account')}
              className={`flex flex-col items-center gap-0.5 ${
                activeMobileTab === 'account' ? 'text-amber-600' : 'text-slate-400'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{language === 'ar' ? 'حسابي' : 'Account'}</span>
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
