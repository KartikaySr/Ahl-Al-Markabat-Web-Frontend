import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Car,
  Wrench,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Clock,
  Star,
  CheckCircle2,
  PhoneCall,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  Check,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    language,
    t,
    selectedCountry,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    selectedVehicleType,
    setSelectedVehicleType,
    setSelectedCategoryFilter,
    selectedVehicle,
    setIsQuoteModalOpen,
    setIsSOSModalOpen,
    setIsAIAssistantOpen,
    setActiveTab,
    showToast,
    providers,
  } = useApp();

  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularSearches = [
    {
      labelAr: 'فحص وبرمجة كمبيوتر',
      labelEn: 'Computer Diagnostics & OBD Scan',
      catId: 'cat-prog',
      query: 'Computer Diagnostics & OBD Scan',
    },
    {
      labelAr: 'تبديل فحمات فرامل',
      labelEn: 'Brake Pads Replacement',
      catId: 'cat-brakes',
      query: 'Brake Pads Replacement',
    },
    {
      labelAr: 'غيار زيت وفلتر أصلي',
      labelEn: 'Original Oil & Filter Replacement',
      catId: 'cat-oil',
      query: 'Original Oil & Filter Replacement',
    },
    {
      labelAr: 'تعبئة غاز مكيف',
      labelEn: 'AC Gas Refill & Service',
      catId: 'cat-ac',
      query: 'AC Gas Refill & Service',
    },
    {
      labelAr: 'ميزان إلكتروني وإطارات',
      labelEn: '3D Wheel Alignment & Tires',
      catId: 'cat-steering',
      query: '3D Wheel Alignment & Tires',
    },
  ];

  const autocompleteSuggestions = [
    {
      labelAr: 'صيانة وتعبئة غاز المكيف',
      labelEn: 'AC Cleaning & Gas Maintenance',
      descAr: 'تنظيف المبخر، فحص التسريب وتعبئة غاز فريون أصلي',
      descEn: 'Evaporator cleaning, UV leak test & Freon gas top-up',
      catId: 'cat-ac',
      icon: '❄️',
      bgClass: 'bg-sky-50 border border-sky-100 text-sky-600',
      keywords: ['ac', 'a/c', 'air conditioning', 'air condition', 'freon', 'gas', 'cooling', 'مكيف', 'تبريد', 'فريون', 'غاز مكيف'],
    },
    {
      labelAr: 'غيار زيت وفلتر أصلي',
      labelEn: 'Original Oil & Filter Replacement',
      descAr: 'زيت تخليقي 10,000 كم مع فلتر أصلي وفحص مجاني',
      descEn: '10,000 km synthetic oil with OEM filter & 21-pt inspection',
      catId: 'cat-oil',
      icon: '🛢️',
      bgClass: 'bg-amber-50 border border-amber-100 text-amber-600',
      keywords: ['oil', 'filter', 'synthetic', 'oil change', 'engine oil', 'زيت', 'فلتر', 'غيار زيت', 'سيرفيس'],
    },
    {
      labelAr: 'تبديل فحمات فرامل وهوبات',
      labelEn: 'Brake Pads & Rotors Replacement',
      descAr: 'فحمات سيراميك وكالة مع خرط هوبات بالليزر',
      descEn: 'Ceramic brake pads with precision laser rotor skimming',
      catId: 'cat-brakes',
      icon: '🛑',
      bgClass: 'bg-rose-50 border border-rose-100 text-rose-600',
      keywords: ['brake', 'brakes', 'brake pads', 'rotors', 'hops', 'discs', 'فرامل', 'فحمات', 'هوبات', 'بريك', 'اقمشة'],
    },
    {
      labelAr: 'فحص وبرمجة كمبيوتر',
      labelEn: 'Computer Diagnostics & ECU Programming',
      descAr: 'فحص شامل OBD-II لايف داتا وبرمجة كمبيوتر',
      descEn: 'Full OBD-II Live Data Telemetry & ECU Coding',
      catId: 'cat-prog',
      icon: '💻',
      bgClass: 'bg-blue-50 border border-blue-100 text-blue-600',
      keywords: ['computer', 'diagnostic', 'diagnostics', 'programming', 'obd', 'check engine', 'ecu', 'فحص', 'كمبيوتر', 'برمجة', 'فحص شامل'],
    },
    {
      labelAr: 'ميزان إلكتروني ليزر 3D وإطارات',
      labelEn: '3D Laser Wheel Alignment & Tires',
      descAr: 'ضبط زوايا العجلات 3D وترصيص ليزر دقيق',
      descEn: '3D Laser wheel alignment & dynamic tire balancing',
      catId: 'cat-steering',
      icon: '⚙️',
      bgClass: 'bg-teal-50 border border-teal-100 text-teal-600',
      keywords: ['tire', 'tires', 'scale', 'alignment', 'wheel', 'balance', '3d', 'ميزان', 'إطارات', 'تواير', 'ترصيص', 'عجلات'],
    },
    {
      labelAr: 'فحص وصيانة بطاريات الهايبرد والكهرباء',
      labelEn: 'Hybrid & EV Battery Health Check',
      descAr: 'فحص خلايا بطارية الجهد العالي (SOH) والانفيرتر',
      descEn: 'High-voltage battery health (SOH) & electric inverter check',
      catId: 'cat-hybrid',
      icon: '⚡',
      bgClass: 'bg-purple-50 border border-purple-100 text-purple-600',
      keywords: ['hybrid', 'ev', 'electric', 'battery', 'soh', 'inverter', 'هايبرد', 'كهرباء', 'بطارية', 'سيارة كهربائية'],
    },
  ];

  // Automatically synchronize searchQuery when toggling between Arabic and English
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const matchedSuggestion = autocompleteSuggestions.find(
      (s) => s.labelAr === searchQuery || s.labelEn === searchQuery
    );
    if (matchedSuggestion) {
      setSearchQuery(language === 'ar' ? matchedSuggestion.labelAr : matchedSuggestion.labelEn);
      return;
    }

    const matchedPopular = popularSearches.find(
      (p) => p.labelAr === searchQuery || p.labelEn === searchQuery
    );
    if (matchedPopular) {
      setSearchQuery(language === 'ar' ? matchedPopular.labelAr : matchedPopular.labelEn);
      return;
    }
  }, [language]);

  const filteredSuggestions = searchQuery.trim()
    ? autocompleteSuggestions.filter((s) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          s.labelEn.toLowerCase().includes(q) ||
          s.labelAr.toLowerCase().includes(q) ||
          s.descEn.toLowerCase().includes(q) ||
          s.descAr.toLowerCase().includes(q) ||
          s.keywords?.some((k) => k.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInputFocused(false);

    // Calculate matching providers
    const count = providers.filter((p) => {
      const matchQuery =
        !searchQuery.trim() ||
        p.businessNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.businessNameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.servicesOffered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const c = selectedCity ? selectedCity.toLowerCase() : '';
      const matchCity =
        !selectedCity ||
        selectedCity === 'all' ||
        p.cityEn.toLowerCase().includes(c) ||
        p.cityAr.toLowerCase().includes(c) ||
        p.addressEn.toLowerCase().includes(c) ||
        p.addressAr.toLowerCase().includes(c) ||
        (c.includes('hebron') && (p.cityEn.toLowerCase().includes('hebron') || p.cityAr.includes('الخليل'))) ||
        (c.includes('dubai') && (p.cityEn.toLowerCase().includes('dubai') || p.cityAr.includes('دبي'))) ||
        (c.includes('abu dhabi') && (p.cityEn.toLowerCase().includes('abu dhabi') || p.cityAr.includes('أبوظبي'))) ||
        (c.includes('ramallah') && (p.cityEn.toLowerCase().includes('ramallah') || p.cityAr.includes('رام الله'))) ||
        (c.includes('nablus') && (p.cityEn.toLowerCase().includes('nablus') || p.cityAr.includes('نابلس')));

      return matchQuery && matchCity;
    }).length;

    showToast(
      language === 'ar'
        ? `تم العثور على ${count > 0 ? count : providers.length} ورشة معتمدة متطابقة في ${selectedCity === 'all' ? 'كافة المناطق' : selectedCity}`
        : `Found ${count > 0 ? count : providers.length} verified workshops in ${selectedCity === 'all' ? 'All Locations' : selectedCity}`,
      'success'
    );

    setActiveTab('providers');
  };

  const handleTagClick = (item: (typeof popularSearches)[0]) => {
    const text = language === 'ar' ? item.labelAr : item.labelEn;
    setSearchQuery(text);
    if (setSelectedCategoryFilter) setSelectedCategoryFilter(item.catId);
    setIsInputFocused(false);
    showToast(
      language === 'ar'
        ? `تم تحديد الخدمة: ${item.labelAr} — يمكنك الآن اختيار موقعك ونوع مركبتك ثم الضغط على بحث`
        : `Selected: ${item.labelEn} — You can now pick location & vehicle type, then click Search`,
      'info'
    );
  };

  const handleSelectSuggestion = (suggestion: (typeof autocompleteSuggestions)[0]) => {
    const text = language === 'ar' ? suggestion.labelAr : suggestion.labelEn;
    setSearchQuery(text);
    if (setSelectedCategoryFilter) setSelectedCategoryFilter(suggestion.catId);
    setIsInputFocused(false);
    showToast(
      language === 'ar'
        ? `تم اختيار الخدمة: ${suggestion.labelAr} — حدد موقعك ونوع المركبة واضغط بحث`
        : `Selected: ${suggestion.labelEn} — Choose location & vehicle type, then click Search`,
      'success'
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#0B1528] text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background Lighting & Glows */}
      <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Visual Container */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tagline / Value Proposition */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 text-amber-400 text-xs font-bold border border-blue-700/50">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'ar'
                    ? 'المنصة الأولى لخدمات وصيانة وتوريد قطع المركبات'
                    : 'The #1 Automotive Services & Parts Ecosystem'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                {language === 'ar' ? (
                  <>
                    مركبتك، <br />
                    <span className="text-amber-400">بأيدي أمينة وخبرة معتمدة.</span>
                  </>
                ) : (
                  <>
                    Your Vehicle, <br />
                    <span className="text-amber-400">In Expert Hands.</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {language === 'ar'
                  ? 'سريعة. موثوقة. قريبة منك. من الصيانة الدورية الدقيقة إلى خدمات الطوارئ والإنقاذ على مدار 24 ساعة، اعثر على أفضل الورش والفنيين المعتمدين.'
                  : 'Fast. Trusted. Nearby. From routine maintenance to emergency roadside support, find verified experts who keep you moving.'}
              </p>
            </div>

            {/* Main Search Bar Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-slate-200 text-slate-900 relative z-30"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* 1. Service Query Input with Live Autocomplete On-Type */}
                <div className="sm:col-span-4 relative" ref={searchContainerRef}>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">
                    {language === 'ar' ? 'ما هي الخدمة المطلوبة؟' : 'What service is required?'}
                  </span>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsInputFocused(true);
                      }}
                      onFocus={() => setIsInputFocused(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') setIsInputFocused(false);
                      }}
                      placeholder={language === 'ar' ? 'صيانة مكيف، غيار زيت، فرامل...' : 'AC repair, oil change, brakes, diagnostics...'}
                      className="w-full py-2.5 ps-8 pe-7 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none font-bold transition-all"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute start-2.5 top-3" />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setIsInputFocused(false);
                          if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
                        }}
                        className="absolute end-2.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Autocomplete Dropdown - Only pops up when typing (searchQuery has text) */}
                  {isInputFocused && searchQuery.trim().length > 0 && (
                    <div className="absolute top-full start-0 mt-2.5 w-full min-w-[320px] sm:min-w-[420px] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-fade-in text-slate-900 ring-1 ring-slate-900/10">
                      <div className="px-4 py-2.5 text-[11px] font-black text-slate-600 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 bg-slate-50">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{language === 'ar' ? 'الخدمات المقترحة' : 'SUGGESTED SERVICES'}</span>
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          {filteredSuggestions.length}
                        </span>
                      </div>

                      <div className="p-2 space-y-1.5 max-h-[340px] overflow-y-auto slim-scrollbar pb-3 bg-white">
                        {filteredSuggestions.length > 0 ? (
                          filteredSuggestions.map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                handleSelectSuggestion(item);
                              }}
                              className="w-full text-start p-2.5 rounded-xl hover:bg-blue-50/90 bg-white hover:border-blue-200 text-slate-900 transition-all flex items-center justify-between group cursor-pointer border border-slate-100 shadow-2xs hover:shadow-xs"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1 me-2">
                                <div className={`w-9 h-9 rounded-xl ${item.bgClass} flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform shadow-2xs`}>
                                  {item.icon}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <strong className="text-xs font-bold text-slate-900 group-hover:text-blue-600 block truncate">
                                    {language === 'ar' ? item.labelAr : item.labelEn}
                                  </strong>
                                  <span className="text-[10px] text-slate-500 block font-normal truncate mt-0.5">
                                    {language === 'ar' ? item.descAr : item.descEn}
                                  </span>
                                </div>
                              </div>
                              <div className="w-6 h-6 rounded-lg bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                                {language === 'ar' ? (
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                )}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-5 text-center text-xs text-slate-500 bg-white space-y-1">
                            <p className="font-bold text-slate-700">
                              {language === 'ar' ? `البحث عن "${searchQuery}"` : `Search for "${searchQuery}"`}
                            </p>
                            <p className="text-[11px]">
                              {language === 'ar' ? 'اضغط بحث لعرض جميع الورش المتوافقة' : 'Press Search to find all matching workshops'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                        <span>{language === 'ar' ? '💡 اضغط لاختيار الخدمة فوراً' : '💡 Click any service to search'}</span>
                        <span className="text-[9px] text-slate-400">ESC {language === 'ar' ? 'للإغلاق' : 'to close'}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Location / City Selector (UAE & Regional) */}
                <div className="sm:col-span-3 relative">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">
                    {language === 'ar' ? 'أين موقعك؟' : 'Where is your location?'}
                  </span>
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => {
                        setSelectedCity(e.target.value);
                      }}
                      className="w-full py-2.5 ps-8 pe-6 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer appearance-none font-bold transition-all"
                    >
                      <option value="all">
                        {language === 'ar' ? 'جميع المدن والمناطق' : 'All Locations'}
                      </option>
                      {language === 'ar' ? (
                        <>
                          <optgroup label="🇦🇪 الإمارات العربية المتحدة">
                            <option value="Dubai">دبي - القوز / البرشاء</option>
                            <option value="Abu Dhabi">أبوظبي - مصفح الصناعية</option>
                            <option value="Sharjah">الشارقة - المنطقة الصناعية</option>
                            <option value="Ajman">عجمان</option>
                            <option value="Ras Al Khaimah">رأس الخيمة</option>
                          </optgroup>
                          <optgroup label="🇵🇸 دولة فلسطين">
                            <option value="Ramallah">رام الله والبيرة</option>
                            <option value="Nablus">نابلس - المنطقة الصناعية</option>
                            <option value="Hebron">الخليل - عين سارة</option>
                            <option value="Jerusalem">القدس الشريف - بيت حنينا</option>
                            <option value="Bethlehem">بيت لحم</option>
                            <option value="Jenin">جنين</option>
                          </optgroup>
                          <optgroup label="🇸🇦 دول الخليج">
                            <option value="Riyadh">الرياض - المملكة العربية السعودية</option>
                            <option value="Jeddah">جدة - المملكة العربية السعودية</option>
                            <option value="Amman">عَمّان - المملكة الأردنية الهاشمية</option>
                          </optgroup>
                        </>
                      ) : (
                        <>
                          <optgroup label="🇦🇪 United Arab Emirates (UAE)">
                            <option value="Dubai">Dubai - Al Quoz / Al Barsha</option>
                            <option value="Abu Dhabi">Abu Dhabi - Mussafah</option>
                            <option value="Sharjah">Sharjah - Industrial Area</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                          </optgroup>
                          <optgroup label="🇵🇸 Palestine">
                            <option value="Ramallah">Ramallah & Al-Bireh</option>
                            <option value="Nablus">Nablus</option>
                            <option value="Hebron">Hebron</option>
                            <option value="Jerusalem">Jerusalem</option>
                            <option value="Bethlehem">Bethlehem</option>
                            <option value="Jenin">Jenin</option>
                          </optgroup>
                          <optgroup label="🇸🇦 GCC & Regional">
                            <option value="Riyadh">Riyadh, Saudi Arabia</option>
                            <option value="Jeddah">Jeddah, Saudi Arabia</option>
                            <option value="Amman">Amman, Jordan</option>
                          </optgroup>
                        </>
                      )}
                    </select>
                    <MapPin className="w-4 h-4 text-blue-600 absolute start-2.5 top-3 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute end-2 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Vehicle Type Selector */}
                <div className="sm:col-span-3 relative">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">
                    {language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}
                  </span>
                  <div className="relative">
                    <select
                      value={selectedVehicleType}
                      onChange={(e) => setSelectedVehicleType(e.target.value)}
                      className="w-full py-2.5 ps-8 pe-6 bg-slate-50 hover:bg-slate-100/60 border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer appearance-none font-bold transition-all"
                    >
                      {language === 'ar' ? (
                        <>
                          <option value="all">جميع أنواع المركبات</option>
                          <option value="sedan">سيدان (صالون)</option>
                          <option value="suv">دفع رباعي / جيب / SUV</option>
                          <option value="coupe">كوبيه / سيارة رياضية</option>
                          <option value="hatchback">هاتشباك</option>
                          <option value="luxury">فارهة / سوبر كار</option>
                          <option value="pickup">بيك أب / ونيت</option>
                          <option value="van">فان / ميني فان عائلي</option>
                          <option value="truck">شاحنة تجارية</option>
                          <option value="ev">كهربائية بالكامل (EV)</option>
                          <option value="hybrid">هايبرد هجين</option>
                        </>
                      ) : (
                        <>
                          <option value="all">All types of vehicles</option>
                          <option value="sedan">Sedan (Saloon)</option>
                          <option value="suv">SUV / 4x4 / Crossover</option>
                          <option value="coupe">Coupe / Sports Car</option>
                          <option value="hatchback">Hatchback</option>
                          <option value="luxury">Luxury / Supercar</option>
                          <option value="pickup">Pickup Truck</option>
                          <option value="van">Van / Minivan</option>
                          <option value="truck">Commercial Truck</option>
                          <option value="ev">Electric Vehicle (EV)</option>
                          <option value="hybrid">Hybrid</option>
                        </>
                      )}
                    </select>
                    <Car className="w-4 h-4 text-slate-400 absolute start-2.5 top-3 pointer-events-none" />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute end-2 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* 4. Submit Search Button */}
                <div className="sm:col-span-2 pt-4 sm:pt-4">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-slate-950" />
                    <span>{language === 'ar' ? 'بحث' : 'Search'}</span>
                  </button>
                </div>
              </div>

              {/* 5. Popular Tags & AI Diagnostic Assistant */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 mt-2 text-xs">
                <span className="text-[11px] text-slate-500 font-bold">
                  {language === 'ar' ? 'الأكثر طلباً:' : 'Most Requested:'}
                </span>
                {popularSearches.map((item, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handleTagClick(item)}
                    className="px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-[11px] transition-all cursor-pointer border border-slate-200/60 hover:border-blue-200 shadow-2xs hover:scale-102"
                  >
                    {language === 'ar' ? item.labelAr : item.labelEn}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setIsAIAssistantOpen(true)}
                  className="sm:ms-auto flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 text-purple-700 font-black text-[11px] transition-all shadow-xs cursor-pointer hover:scale-102 active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                  <span>
                    {language === 'ar'
                      ? 'مساعد التشخيص بالذكاء الاصطناعي ✨'
                      : '✨ AI Diagnostic Assistant'}
                  </span>
                </button>
              </div>
            </form>

            {/* 4 Trust Highlights Below Search */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ar' ? 'ورش وفنيين معتمدين' : 'Trusted & Verified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'استجابة سريعة' : 'Fast Response'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{language === 'ar' ? 'الأقرب لموقعك' : 'Nearby You'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>{language === 'ar' ? 'دعم طوارئ 24/7' : '24/7 Support'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & 24/7 Emergency Callout Card */}
          <div className="lg:col-span-4 relative flex flex-col items-center justify-center space-y-4">
            {/* Real Vehicle & Specialist Image */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 group">
              <img
                src="/images/categories/gasoline_engine.jpg"
                alt="Ahl Al Markabat Certified Specialist"
                className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-transparent to-transparent" />

              {/* Verified Platform Pill */}
              <div className="absolute top-3 start-3 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>AHL AL MARKABAT</span>
              </div>
            </div>

            {/* 24/7 Roadside Assistance Card */}
            <div className="w-full p-4 rounded-2xl bg-blue-950/80 border border-blue-700/60 shadow-xl flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">
                  {language === 'ar' ? 'تحتاج مساعدة عاجلة؟' : 'Need help now?'}
                </span>
                <strong className="text-white text-xs sm:text-sm font-black block">
                  {language === 'ar' ? 'طوارئ ونش وإنقاذ الطرق' : 'Emergency Roadside Assistance'}
                </strong>
                <span className="text-[11px] text-slate-300 block">
                  {language === 'ar' ? 'متاح 24/7 في كافة المحافظات والمناطق' : 'Available 24/7 across all regions'}
                </span>
              </div>

              <button
                onClick={() => setIsSOSModalOpen(true)}
                className="shrink-0 px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 animate-pulse cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-950" />
                <span>{language === 'ar' ? 'اتصل الآن' : 'Call Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

