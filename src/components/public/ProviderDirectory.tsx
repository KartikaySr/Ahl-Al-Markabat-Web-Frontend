import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../common/LeafletMap';
import {
  Search,
  MapPin,
  Star,
  Map as MapIcon,
  List,
  ShieldCheck,
  Building,
  Phone,
  Clock,
  Sparkles,
  Car,
  Filter,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Plus,
  Sliders,
  Award,
  Zap,
  Wrench,
  X,
  RotateCcw,
} from 'lucide-react';

export const ProviderDirectory: React.FC = () => {
  const {
    language,
    t,
    providers,
    setSelectedProviderModal,
    startBookingWithProvider,
    selectedCity,
    setSelectedCity,
    searchQuery,
    setSearchQuery,
    selectedVehicleType,
    setSelectedVehicleType,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedCountry,
    setActiveTab,
    showToast,
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [distanceKm, setDistanceKm] = useState(50);
  const [selectedService, setSelectedService] = useState('all');

  // Filter providers based on search query, city, vehicle type, verification, open status, distance
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // 1. Text Search (Business name, specialties, services, address, and automotive keywords)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName =
          p.businessNameEn.toLowerCase().includes(q) ||
          p.businessNameAr.toLowerCase().includes(q);
        const matchSpecialties = p.specialties.some((s) => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()));
        const matchServices = p.servicesOffered.some((s) => s.toLowerCase().includes(q) || q.includes(s.toLowerCase()));
        const matchAddress =
          p.addressEn.toLowerCase().includes(q) ||
          p.addressAr.toLowerCase().includes(q) ||
          p.cityEn.toLowerCase().includes(q) ||
          p.cityAr.toLowerCase().includes(q);

        // Smart keyword mapping
        const matchKeywords =
          ((q.includes('ac') || q.includes('مكيف') || q.includes('غاز') || q.includes('فريون') || q.includes('cooling')) &&
            p.specialties.some((s) => s.toLowerCase().includes('ac') || s.toLowerCase().includes('مكيف') || s.toLowerCase().includes('freon') || s.toLowerCase().includes('gas') || s.toLowerCase().includes('غاز'))) ||
          ((q.includes('oil') || q.includes('زيت') || q.includes('فلتر') || q.includes('filter')) &&
            p.specialties.some((s) => s.toLowerCase().includes('oil') || s.toLowerCase().includes('زيت') || s.toLowerCase().includes('filter'))) ||
          ((q.includes('brake') || q.includes('فرامل') || q.includes('فحمات') || q.includes('هوبات') || q.includes('بريك')) &&
            p.specialties.some((s) => s.toLowerCase().includes('brake') || s.toLowerCase().includes('فرامل') || s.toLowerCase().includes('فحمات'))) ||
          ((q.includes('computer') || q.includes('كمبيوتر') || q.includes('برمجة') || q.includes('فحص') || q.includes('diagnostic')) &&
            p.specialties.some((s) => s.toLowerCase().includes('computer') || s.toLowerCase().includes('diagnostic') || s.toLowerCase().includes('فحص') || s.toLowerCase().includes('برمجة'))) ||
          ((q.includes('tire') || q.includes('إطارات') || q.includes('ميزان') || q.includes('تواير')) &&
            p.specialties.some((s) => s.toLowerCase().includes('tire') || s.toLowerCase().includes('scale') || s.toLowerCase().includes('إطارات') || s.toLowerCase().includes('ميزان')));

        if (!matchName && !matchSpecialties && !matchServices && !matchAddress && !matchKeywords) {
          return false;
        }
      }

      // 2. City Filter
      if (selectedCity && selectedCity !== 'all') {
        const c = selectedCity.toLowerCase().trim();
        const matchCity =
          p.cityEn.toLowerCase().includes(c) ||
          p.cityAr.toLowerCase().includes(c) ||
          p.addressEn.toLowerCase().includes(c) ||
          p.addressAr.toLowerCase().includes(c) ||
          (c.includes('dubai') && (p.cityEn.toLowerCase().includes('dubai') || p.cityAr.includes('دبي'))) ||
          (c.includes('abu dhabi') && (p.cityEn.toLowerCase().includes('abu dhabi') || p.cityAr.includes('أبوظبي'))) ||
          (c.includes('sharjah') && (p.cityEn.toLowerCase().includes('sharjah') || p.cityAr.includes('الشارقة'))) ||
          (c.includes('ajman') && (p.cityEn.toLowerCase().includes('ajman') || p.cityAr.includes('عجمان'))) ||
          (c.includes('ras al khaimah') && (p.cityEn.toLowerCase().includes('ras al khaimah') || p.cityAr.includes('رأس الخيمة'))) ||
          (c.includes('ramallah') && (p.cityEn.toLowerCase().includes('ramallah') || p.cityAr.includes('رام الله'))) ||
          (c.includes('nablus') && (p.cityEn.toLowerCase().includes('nablus') || p.cityAr.includes('نابلس'))) ||
          ((c.includes('hebron') || c.includes('خليل')) && (p.cityEn.toLowerCase().includes('hebron') || p.cityAr.includes('الخليل'))) ||
          ((c.includes('jerusalem') || c.includes('قدس')) && (p.cityEn.toLowerCase().includes('jerusalem') || p.cityAr.includes('القدس'))) ||
          ((c.includes('bethlehem') || c.includes('لحم')) && (p.cityEn.toLowerCase().includes('bethlehem') || p.cityAr.includes('بيت لحم'))) ||
          ((c.includes('jenin') || c.includes('جنين')) && (p.cityEn.toLowerCase().includes('jenin') || p.cityAr.includes('جنين'))) ||
          ((c.includes('tulkarm') || c.includes('طولكرم')) && (p.cityEn.toLowerCase().includes('tulkarm') || p.cityAr.includes('طولكرم'))) ||
          ((c.includes('gaza') || c.includes('غزة')) && (p.cityEn.toLowerCase().includes('gaza') || p.cityAr.includes('غزة'))) ||
          ((c.includes('riyadh') || c.includes('رياض')) && (p.cityEn.toLowerCase().includes('riyadh') || p.cityAr.includes('الرياض'))) ||
          ((c.includes('jeddah') || c.includes('جدة')) && (p.cityEn.toLowerCase().includes('jeddah') || p.cityAr.includes('جدة'))) ||
          ((c.includes('dammam') || c.includes('دمام')) && (p.cityEn.toLowerCase().includes('dammam') || p.cityAr.includes('الدمام'))) ||
          ((c.includes('amman') || c.includes('عمان')) && (p.cityEn.toLowerCase().includes('amman') || p.cityAr.includes('عمان'))) ||
          ((c.includes('zarqa') || c.includes('زرقاء')) && (p.cityEn.toLowerCase().includes('zarqa') || p.cityAr.includes('الزرقاء'))) ||
          ((c.includes('irbid') || c.includes('إربد') || c.includes('اربد')) && (p.cityEn.toLowerCase().includes('irbid') || p.cityAr.includes('إربد'))) ||
          ((c.includes('doha') || c.includes('دوحة')) && (p.cityEn.toLowerCase().includes('doha') || p.cityAr.includes('الدوحة'))) ||
          ((c.includes('cairo') || c.includes('قاهرة')) && (p.cityEn.toLowerCase().includes('cairo') || p.cityAr.includes('القاهرة'))) ||
          ((c.includes('alexandria') || c.includes('إسكندرية') || c.includes('اسكندرية')) && (p.cityEn.toLowerCase().includes('alexandria') || p.cityAr.includes('الإسكندرية')));

        if (!matchCity) return false;
      }

      // 3. Service Category Filter
      if (selectedService && selectedService !== 'all') {
        const s = selectedService.toLowerCase();
        const matchSpecialty = p.specialties.some((spec) => {
          const specL = spec.toLowerCase();
          if (s === 'oil') return specL.includes('oil') || specL.includes('زيت');
          if (s === 'brakes') return specL.includes('brake') || specL.includes('فرامل');
          if (s === 'ac') return specL.includes('ac') || specL.includes('مكيف') || specL.includes('فريون');
          if (s === 'diagnostics') return specL.includes('diagnostic') || specL.includes('كمبيوتر') || specL.includes('برمجة');
          if (s === 'tires') return specL.includes('tire') || specL.includes('إطارات') || specL.includes('ميزان');
          if (s === 'battery') return specL.includes('battery') || specL.includes('بطارية');
          if (s === 'transmission') return specL.includes('transmission') || specL.includes('جير');
          if (s === 'hybrid') return specL.includes('hybrid') || specL.includes('هايبرد') || specL.includes('ev');
          return true;
        });

        if (!matchSpecialty) return false;
      }

      // 4. Vehicle Type Filter
      if (selectedVehicleType && selectedVehicleType !== 'all') {
        if (selectedVehicleType === 'ev' || selectedVehicleType === 'hybrid') {
          const isHybridEV = p.specialties.some(
            (spec) =>
              spec.toLowerCase().includes('hybrid') ||
              spec.toLowerCase().includes('ev') ||
              spec.toLowerCase().includes('هايبرد') ||
              spec.toLowerCase().includes('كهرب')
          );
          if (!isHybridEV && !p.supportedMakes.some((m) => ['Tesla', 'Porsche', 'BMW', 'Toyota'].includes(m))) {
            return false;
          }
        }
      }

      // 5. Verified Only
      if (filterVerifiedOnly && !p.verified) return false;

      // 6. Open Now
      if (filterOpenNow && !p.isAvailableNow) return false;

      // 7. Distance (only filters when no specific city is selected)
      if ((!selectedCity || selectedCity === 'all') && p.distanceKm > distanceKm) return false;

      return true;
    });
  }, [
    providers,
    searchQuery,
    selectedCity,
    selectedService,
    selectedVehicleType,
    filterVerifiedOnly,
    filterOpenNow,
    distanceKm,
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCity('all');
    setSelectedVehicleType('all');
    setSelectedService('all');
    if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
    setFilterVerifiedOnly(false);
    setFilterOpenNow(false);
    setDistanceKm(50);
    showToast(
      language === 'ar' ? 'تمت إعادة ضبط جميع الفلاتر' : 'All filters reset',
      'info'
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-8">
      {/* 1. Hero Search Header */}
      <div className="bg-[#09152B] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              {language === 'ar' ? 'دليل الورش ومراكز الصيانة المعتمدة' : 'Find Trusted Providers'}
            </h1>
            <p className="text-xs text-slate-300">
              {language === 'ar'
                ? 'قارن بين أفضل الورش المعتمدة والفنيين المتخصصين واحجز موعدك بكل ثقة وضمان.'
                : 'Compare verified automotive workshops, mobile mechanics, and book with confidence.'}
            </p>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-200 text-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Location Selector */}
            <div className="lg:col-span-4 flex items-center gap-2 px-3 py-1.5 border-e border-slate-200">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="w-full">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">
                  {language === 'ar' ? 'أين موقعك؟' : 'Where is your location?'}
                </span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full text-xs font-black text-slate-900 outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">
                    {language === 'ar' ? 'جميع المدن والمناطق' : 'All Locations'}
                  </option>
                  <optgroup label={language === 'ar' ? 'دولة فلسطين' : 'Palestine'}>
                    <option value="Ramallah">{language === 'ar' ? 'رام الله والبيرة' : 'Ramallah & Al-Bireh'}</option>
                    <option value="Nablus">{language === 'ar' ? 'نابلس - المنطقة الصناعية' : 'Nablus'}</option>
                    <option value="Hebron">{language === 'ar' ? 'الخليل - عين سارة / المنطقة الصناعية' : 'Hebron'}</option>
                    <option value="Jerusalem">{language === 'ar' ? 'القدس الشريف - بيت حنينا' : 'Jerusalem'}</option>
                    <option value="Bethlehem">{language === 'ar' ? 'بيت لحم - شارع المهد' : 'Bethlehem'}</option>
                    <option value="Jenin">{language === 'ar' ? 'جنين - شارع حيفا' : 'Jenin'}</option>
                    <option value="Tulkarm">{language === 'ar' ? 'طولكرم - المنطقة الصناعية' : 'Tulkarm'}</option>
                    <option value="Gaza">{language === 'ar' ? 'غزة - شارع الرشيد' : 'Gaza'}</option>
                  </optgroup>
                  <optgroup label={language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates (UAE)'}>
                    <option value="Dubai">{language === 'ar' ? 'دبي - القوز / البرشاء' : 'Dubai - Al Quoz / Al Barsha'}</option>
                    <option value="Abu Dhabi">{language === 'ar' ? 'أبوظبي - مصفح الصناعية' : 'Abu Dhabi - Mussafah'}</option>
                    <option value="Sharjah">{language === 'ar' ? 'الشارقة - المنطقة الصناعية' : 'Sharjah - Industrial Area'}</option>
                  </optgroup>
                  <optgroup label={language === 'ar' ? 'المملكة الأردنية الهاشمية' : 'Jordan'}>
                    <option value="Amman">{language === 'ar' ? 'عَمّان - شارع مكة' : 'Amman, Jordan'}</option>
                    <option value="Zarqa">{language === 'ar' ? 'الزرقاء - المنطقة الحرة' : 'Zarqa, Jordan'}</option>
                    <option value="Irbid">{language === 'ar' ? 'إربد - شارع الحصن' : 'Irbid, Jordan'}</option>
                  </optgroup>
                  <optgroup label={language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}>
                    <option value="Riyadh">{language === 'ar' ? 'الرياض - طريق خريص' : 'Riyadh, Saudi Arabia'}</option>
                    <option value="Jeddah">{language === 'ar' ? 'جدة - طريق المدينة' : 'Jeddah, Saudi Arabia'}</option>
                    <option value="Dammam">{language === 'ar' ? 'الدمام - المدينة الصناعية' : 'Dammam, Saudi Arabia'}</option>
                  </optgroup>
                  <optgroup label={language === 'ar' ? 'دولة قطر' : 'Qatar'}>
                    <option value="Doha">{language === 'ar' ? 'الدوحة - المنطقة الصناعية' : 'Doha, Qatar'}</option>
                  </optgroup>
                  <optgroup label={language === 'ar' ? 'جمهورية مصر العربية' : 'Egypt'}>
                    <option value="Cairo">{language === 'ar' ? 'القاهرة - مدينة نصر' : 'Cairo, Egypt'}</option>
                    <option value="Alexandria">{language === 'ar' ? 'الإسكندرية - سيدي جابر' : 'Alexandria, Egypt'}</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Service Category Selector */}
            <div className="lg:col-span-3 flex items-center gap-2 px-3 py-1.5 border-e border-slate-200">
              <Wrench className="w-4 h-4 text-amber-500 shrink-0" />
              <div className="w-full">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">
                  {language === 'ar' ? 'نوع الخدمة' : 'Service'}
                </span>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full text-xs font-black text-slate-900 outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">{language === 'ar' ? 'جميع الخدمات والتخصصات' : 'All Services'}</option>
                  <option value="ac">{language === 'ar' ? 'تعبئة فريون وصيانة مكيف (AC)' : 'AC cleaning & Freon'}</option>
                  <option value="oil">{language === 'ar' ? 'غيار الزيت والصيانة السريعة' : 'Oil Change & Quick Service'}</option>
                  <option value="brakes">{language === 'ar' ? 'الفرامل وفحص السلامة' : 'Brakes & Safety'}</option>
                  <option value="diagnostics">{language === 'ar' ? 'فحص وبرمجة كمبيوتر (OBD)' : 'Computer Diagnostics'}</option>
                  <option value="tires">{language === 'ar' ? 'الإطارات والميزان 3D' : 'Tires & Wheel Alignment'}</option>
                  <option value="battery">{language === 'ar' ? 'البطاريات والكهرباء' : 'Battery & Electrical'}</option>
                  <option value="transmission">{language === 'ar' ? 'الجير وناقل الحركة' : 'Transmission & Gearbox'}</option>
                  <option value="hybrid">{language === 'ar' ? 'مركبات الهايبرد والكهرباء' : 'Hybrid & EV Services'}</option>
                </select>
              </div>
            </div>

            {/* Vehicle Type */}
            <div className="lg:col-span-3 flex items-center gap-2 px-3 py-1.5 border-e border-slate-200">
              <Car className="w-4 h-4 text-slate-500 shrink-0" />
              <div className="w-full">
                <span className="text-[9px] text-slate-400 font-bold block uppercase">
                  {language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}
                </span>
                <select
                  value={selectedVehicleType}
                  onChange={(e) => setSelectedVehicleType(e.target.value)}
                  className="w-full text-xs font-black text-slate-900 outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">{language === 'ar' ? 'جميع أنواع المركبات' : 'All Vehicles'}</option>
                  <option value="sedan">{language === 'ar' ? 'سيدان (صالون)' : 'Sedan (Saloon)'}</option>
                  <option value="suv">{language === 'ar' ? 'دفع رباعي / جيب / SUV' : 'SUV / 4x4 / Crossover'}</option>
                  <option value="coupe">{language === 'ar' ? 'كوبيه / رياضية' : 'Coupe / Sports Car'}</option>
                  <option value="hatchback">{language === 'ar' ? 'هاتشباك' : 'Hatchback'}</option>
                  <option value="luxury">{language === 'ar' ? 'فارهة / سوبر كار' : 'Luxury / Supercar'}</option>
                  <option value="pickup">{language === 'ar' ? 'بيك أب / ونيت' : 'Pickup Truck'}</option>
                  <option value="van">{language === 'ar' ? 'فان / ميني فان' : 'Van / Minivan'}</option>
                  <option value="truck">{language === 'ar' ? 'شاحنة تجارية' : 'Commercial Truck'}</option>
                  <option value="ev">{language === 'ar' ? 'كهربائية بالكامل (EV)' : 'Electric Vehicle (EV)'}</option>
                  <option value="hybrid">{language === 'ar' ? 'هايبرد هجين' : 'Hybrid / PHEV'}</option>
                </select>
              </div>
            </div>

            {/* Search CTA */}
            <div className="lg:col-span-2">
              <button
                onClick={() => {
                  showToast(
                    language === 'ar'
                      ? `تم تحديث نتائج البحث (${filteredProviders.length} ورشة متوفرة)`
                      : `Search updated (${filteredProviders.length} providers found)`,
                    'success'
                  );
                }}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer"
              >
                {language === 'ar' ? 'بحث عن ورشة' : 'Search Providers'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Directory Layout with Sidebar & Map/List */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        {/* Active Filters Bar */}
        {(searchQuery || selectedCity !== 'all' || selectedService !== 'all' || selectedVehicleType !== 'all') && (
          <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-blue-900">
                {language === 'ar' ? 'الفلاتر النشطة:' : 'Active Filters:'}
              </span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-blue-200 rounded-lg text-blue-800 font-bold shadow-2xs">
                  <Search className="w-3 h-3 text-blue-500" />
                  <span>"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCity !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-blue-200 rounded-lg text-blue-800 font-bold shadow-2xs">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{selectedCity}</span>
                  <button onClick={() => setSelectedCity('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedService !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-blue-200 rounded-lg text-blue-800 font-bold shadow-2xs">
                  <Wrench className="w-3 h-3 text-amber-500" />
                  <span>{selectedService}</span>
                  <button onClick={() => setSelectedService('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedVehicleType !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-blue-200 rounded-lg text-blue-800 font-bold shadow-2xs">
                  <Car className="w-3 h-3 text-slate-500" />
                  <span>{selectedVehicleType}</span>
                  <button onClick={() => setSelectedVehicleType('all')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === 'ar' ? 'إلغاء جميع الفلاتر' : 'Reset All Filters'}</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              {language === 'ar'
                ? 'الورش ومراكز الصيانة المتطابقة'
                : 'Verified Automotive Workshops & Providers'}
            </h2>
            <span className="text-xs text-slate-500 font-bold">
              {language === 'ar'
                ? `تم العثور على ${filteredProviders.length} ورشة معتمدة`
                : `${filteredProviders.length} verified providers available`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-slate-200 p-1 rounded-xl shadow-2xs">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'map' ? 'bg-blue-600 text-white font-black' : 'text-slate-600'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'خريطة' : 'Map'}</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list' ? 'bg-blue-600 text-white font-black' : 'text-slate-600'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'قائمة' : 'List'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Filters Sidebar (3 cols) */}
          <div className="lg:col-span-3 space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-xs h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <strong className="text-xs font-black text-slate-900 uppercase">
                {language === 'ar' ? 'تصفية النتائج' : 'Filters'}
              </strong>
              <button onClick={clearAllFilters} className="text-[11px] font-bold text-blue-600 hover:underline">
                {language === 'ar' ? 'إعادة ضبط' : 'Clear All'}
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {language === 'ar' ? `نطاق المسافة (${distanceKm} كم)` : `Distance (${distanceKm} km)`}
              </span>
              <input
                type="range"
                min="1"
                max="50"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                {language === 'ar' ? 'نوع المركز' : 'Provider Type'}
              </span>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
                  <span>{language === 'ar' ? 'مركز صيانة / كراج معتمد' : 'Workshop / Garage'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-blue-600" />
                  <span>{language === 'ar' ? 'فني / صيانة متنقلة' : 'Mobile Service'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-blue-600" />
                  <span>{language === 'ar' ? 'وكالة معتمدة' : 'Dealership'}</span>
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span>{language === 'ar' ? 'المعتمدون فقط' : 'Verified Only'}</span>
                <input
                  type="checkbox"
                  checked={filterVerifiedOnly}
                  onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                  className="rounded accent-blue-600 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'ar' ? 'مفتوح الآن' : 'Open Now'}</span>
                <input
                  type="checkbox"
                  checked={filterOpenNow}
                  onChange={(e) => setFilterOpenNow(e.target.checked)}
                  className="rounded accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Provider Cards List & Leaflet Map (9 cols) */}
          <div className="lg:col-span-9 space-y-4">
            {/* Interactive Google Maps Preview & Country Explorer */}
            <div className={`rounded-2xl overflow-hidden border border-slate-200 shadow-md relative transition-all duration-300 ${
              viewMode === 'map' ? 'h-[580px] sm:h-[650px]' : 'h-72 sm:h-80'
            }`}>
              <LeafletMap height="100%" showCountrySelector={true} providers={filteredProviders} />
            </div>

            {/* Provider Cards */}
            <div className="space-y-4">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-5 items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setSelectedProviderModal(p)}
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1">
                      <img
                        src={p.image || '/images/garage_autotech.jpg'}
                        alt={language === 'ar' ? p.businessNameAr : p.businessNameEn}
                        className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shrink-0 group-hover:scale-102 transition-transform"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/garage_autotech.jpg';
                        }}
                      />

                      <div className="space-y-1 text-center sm:text-start">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <strong className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                            {language === 'ar' ? p.businessNameAr : p.businessNameEn}
                          </strong>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                            {language === 'ar' ? 'معتمد' : 'Verified'}
                          </span>
                          {p.isAvailableNow && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {language === 'ar' ? 'متاح الآن' : 'Available Now'}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
                          <span className="text-amber-500 font-bold flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {p.rating.toFixed(1)} ({p.reviewCount})
                          </span>
                          <span>•</span>
                          <span>📍 {language === 'ar' ? p.addressAr : p.addressEn}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-bold">
                            {language === 'ar' ? 'استجابة خلال 15 دقيقة' : '15-min response'}
                          </span>
                        </div>

                        {/* Specialties list pills */}
                        <div className="flex flex-wrap gap-1 pt-1 justify-center sm:justify-start">
                          {p.specialties.map((srv, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                              {srv}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedProviderModal(p)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-all cursor-pointer"
                      >
                        {language === 'ar' ? 'الملف التعريفي' : 'View Profile'}
                      </button>

                      <button
                        onClick={() => startBookingWithProvider(p)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        {language === 'ar' ? 'حجز موعد صيانة' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4 shadow-2xs">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900">
                      {language === 'ar'
                        ? 'لم يتم العثور على ورش متطابقة تماماً'
                        : 'No workshops match your exact criteria'}
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      {language === 'ar'
                        ? 'جرب البحث عن خدمة أخرى أو توسيع نطاق المسافة أو اختيار مدينة مختلفة.'
                        : 'Try searching for another service, widening the distance radius, or clearing filters.'}
                    </p>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {language === 'ar' ? 'إعادة ضبط جميع الفلاتر' : 'Reset All Filters'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

