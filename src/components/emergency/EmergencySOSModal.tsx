import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../common/LeafletMap';
import { EmergencyType } from '../../types';
import {
  X,
  Phone,
  Truck,
  BatteryCharging,
  Disc,
  Fuel,
  Key,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Star,
  Users,
  ChevronDown,
  Navigation,
  Compass,
  LocateFixed,
  Car,
  DollarSign,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const EmergencySOSModal: React.FC = () => {
  const {
    isSOSModalOpen,
    setIsSOSModalOpen,
    language,
    showToast,
    selectedCountry,
    formatPrice,
    setActiveTab,
    createEmergencySOS,
    isAuthenticated,
    user,
    selectedVehicle,
    vehicles,
  } = useApp();

  // Selected Service
  const [selectedIssue, setSelectedIssue] = useState<EmergencyType>('towing');

  // Customer Contact & Vehicle State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('RAV4 Hybrid');
  const [vehiclePlate, setVehiclePlate] = useState('7-8899-22');

  // GPS Geolocation State
  const [isLocating, setIsLocating] = useState(false);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number }>({
    lat: selectedCountry.cities[0]?.lat || 31.5326,
    lng: selectedCountry.cities[0]?.lng || 35.0998,
  });
  const [gpsAccuracyText, setGpsAccuracyText] = useState<string | null>(null);

  // Sync user and city defaults when modal opens
  useEffect(() => {
    if (isSOSModalOpen) {
      if (isAuthenticated && user) {
        setName(user.name || '');
        setPhone(user.phone || '');
        if (selectedVehicle) {
          setVehicleMake(selectedVehicle.make);
          setVehicleModel(selectedVehicle.model);
          setVehiclePlate(selectedVehicle.plateNumber);
        }
      } else {
        if (!name) setName(language === 'ar' ? 'أحمد الدجاني' : 'Ahmed Al-Mansoor');
        if (!phone) setPhone('+970 59 123 4567');
      }

      const defaultCity = selectedCountry.cities[0];
      if (defaultCity) {
        setGpsCoords({ lat: defaultCity.lat, lng: defaultCity.lng });
        if (!location) {
          setLocation(
            language === 'ar'
              ? `${defaultCity.nameAr} — شارع القدس الرئيسي`
              : `${defaultCity.nameEn} — Main Road`
          );
        }
      }
    }
  }, [isSOSModalOpen, isAuthenticated, user, selectedVehicle, selectedCountry]);

  if (!isSOSModalOpen) return null;

  const emergencyServices: Array<{
    id: EmergencyType;
    nameEn: string;
    nameAr: string;
    descEn: string;
    descAr: string;
    basePriceILS: number;
    etaMinutes: number;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'towing',
      nameEn: 'Flatbed Towing',
      nameAr: 'ونش سطحة هيدروليك',
      descEn: 'Vehicle breakdown or accident towing to garage or destination.',
      descAr: 'تعطلت سيارتك أو وقع حادث؟ سطحة مجهزة لنقل سيارتك بأمان تام.',
      basePriceILS: 150,
      etaMinutes: 12,
      icon: Truck,
    },
    {
      id: 'jump_start',
      nameEn: 'Battery Jumpstart',
      nameAr: 'اشتراك وتشغيل بطارية',
      descEn: 'Dead battery? Rapid mobile technician with booster & diagnostics.',
      descAr: 'نفدت البطارية؟ فني متخصص يصلك فوراً لإعادة التشغيل أو التبديل.',
      basePriceILS: 70,
      etaMinutes: 10,
      icon: BatteryCharging,
    },
    {
      id: 'flat_tire',
      nameEn: 'Flat Tire Assistance',
      nameAr: 'تبديل إطار بنشر',
      descEn: 'Spare wheel swap, mobile puncture repair, and air pressure check.',
      descAr: 'بنشر في الإطار؟ نبدل الإطار بالاحتياطي أو نعالجه بالموقع بأمان.',
      basePriceILS: 60,
      etaMinutes: 15,
      icon: Disc,
    },
    {
      id: 'fuel_delivery',
      nameEn: 'Emergency Fuel',
      nameAr: 'توصيل بنزين طوارئ',
      descEn: 'Out of gas? Delivery of 10L clean fuel to get you to the station.',
      descAr: 'نفد الوقود على الطريق؟ نصلك أينما كنت لتزويدك بالبنزين الكافي.',
      basePriceILS: 80,
      etaMinutes: 15,
      icon: Fuel,
    },
    {
      id: 'lockout',
      nameEn: 'Car Lockout Opening',
      nameAr: 'فتح سيارات مقفلة',
      descEn: 'Keys locked inside? Non-destructive professional lockout tooling.',
      descAr: 'أغلقت المفاتيح بالداخل؟ فتح أبواب السيارة بأجهزة احترافية بدون أي خدوش.',
      basePriceILS: 120,
      etaMinutes: 18,
      icon: Key,
    },
  ];

  const activeServiceObj = emergencyServices.find((s) => s.id === selectedIssue) || emergencyServices[0];

  // 1-Click GPS Auto Geolocation
  const handleGetGpsLocation = () => {
    if (!navigator.geolocation) {
      showToast(
        language === 'ar'
          ? 'المتصفح لا يدعم تحديد الموقع التلقائي'
          : 'Geolocation not supported by your browser',
        'error'
      );
      return;
    }

    setIsLocating(true);
    showToast(
      language === 'ar'
        ? '📡 جارٍ استقبال إحداثيات GPS المباشرة من جهازك...'
        : '📡 Locking GPS coordinates from your device...',
      'info'
    );

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude, accuracy } = pos.coords;
        setGpsCoords({ lat: latitude, lng: longitude });
        setGpsAccuracyText(
          language === 'ar' ? `دقة التحديد: ±${Math.round(accuracy)} متر` : `Accuracy: ±${Math.round(accuracy)}m`
        );
        setLocation(
          language === 'ar'
            ? `موقع GPS دقيق (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) — بالقرب من شارع عين سارة`
            : `GPS Precise Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        );
        showToast(
          language === 'ar'
            ? '✓ تم تحديد وتثبيت موقعك الجغرافي الدقيق بنجاح!'
            : '✓ GPS location locked successfully!',
          'success'
        );
      },
      (err) => {
        setIsLocating(false);
        // Fallback to active city center
        const city = selectedCountry.cities[0];
        setGpsCoords({ lat: city.lat, lng: city.lng });
        setLocation(
          language === 'ar'
            ? `${city.nameAr} — شارع رئيسي`
            : `${city.nameEn} — Main Road`
        );
        showToast(
          language === 'ar'
            ? 'تم استخدام موقع المدينة الافتراضي (يمكنك كتابة العنوان يدوياً)'
            : 'Using city location. You can type exact address manually.',
          'info'
        );
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const handleSubmitSOS = (e: React.FormEvent) => {
    e.preventDefault();

    const vehSummary = `${vehicleMake} ${vehicleModel} (${vehiclePlate})`;

    createEmergencySOS(selectedIssue, location || 'Hebron, Palestine', {
      lat: gpsCoords.lat,
      lng: gpsCoords.lng,
      customerName: name,
      customerPhone: phone,
      vehicleName: vehSummary,
      vehiclePlate: vehiclePlate,
      price: activeServiceObj.basePriceILS,
      currency: selectedCountry.currencySymbol,
      destinationAddress: selectedIssue === 'towing' ? destinationAddress : undefined,
    });

    setIsSOSModalOpen(false);
    setActiveTab('track-booking');
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 text-slate-900 animate-fade-in">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[94vh] flex flex-col animate-slide-up">
        {/* Header Hero */}
        <div className="relative bg-gradient-to-r from-slate-950 via-[#09152B] to-rose-950 text-white p-6 sm:p-8 shrink-0 border-b border-rose-900/40">
          <button
            onClick={() => setIsSOSModalOpen(false)}
            className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-black border border-rose-400 flex items-center gap-1.5 shadow-lg shadow-rose-600/30 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'غرفة عمليات وإنقاذ الطرق 24/7' : '24/7 ROADSIDE EMERGENCY DISPATCH'}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-[10px] font-bold">
                {language === 'ar' ? `التغطية في: ${selectedCountry.nameAr}` : `Active Region: ${selectedCountry.nameEn}`}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{language === 'ar' ? 'خدمات طوارئ وإنقاذ الطرق السريعة' : 'Emergency Roadside Assistance'}</span>
              <span className="text-rose-500">🚨</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'فريق الإنقاذ وأقرب ونش سطحة هيدروليك في منطقتك يصلك خلال دقائق لإعادتك للطريق بأمان.'
                : 'Help is on the way. Rapid recovery tow patrols dispatched to your exact GPS coordinates.'}
            </p>

            {/* Hotline Callout Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block font-bold">
                    {language === 'ar' ? 'الخط الساخن المباشر للإنقاذ (24 ساعة)' : 'Direct 24/7 Emergency Hotline'}
                  </span>
                  <a href="tel:+970591234567" className="text-amber-400 font-mono text-base font-black hover:underline">
                    +970 59 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  {language === 'ar' ? 'متوسط الوصول: 10 - 20 دقيقة' : 'Avg. ETA: 10 - 20 Mins'}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  {language === 'ar' ? 'سطحات هيدروليك مؤمنة' : 'Insured Recovery Units'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-900">
          {/* Step 1: 5 Emergency Services Cards with Upfront Pricing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{language === 'ar' ? '1. اختر نوع حالة الطوارئ والتسعيرة المباشرة:' : '1. Select Emergency Service & Upfront Rate:'}</span>
              </h3>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ● {language === 'ar' ? 'تسعير فوري وثابت' : 'Transparent Fixed Pricing'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {emergencyServices.map((srv) => {
                const Icon = srv.icon;
                const isSelected = selectedIssue === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedIssue(srv.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group ${
                      isSelected
                        ? 'bg-rose-50/70 border-rose-600 shadow-md ring-2 ring-rose-600/30'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2.5 end-2.5 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                    )}

                    <div className="space-y-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold transition-colors ${
                          isSelected ? 'bg-rose-600 text-white shadow-sm' : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <strong className="text-xs font-black text-slate-900 block">
                        {language === 'ar' ? srv.nameAr : srv.nameEn}
                      </strong>
                      <p className="text-[10px] text-slate-600 leading-relaxed line-clamp-2">
                        {language === 'ar' ? srv.descAr : srv.descEn}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500">
                        {language === 'ar' ? 'تبدأ من:' : 'Starts at:'}
                      </span>
                      <strong className="text-xs font-black text-rose-700 font-mono">
                        {formatPrice(srv.basePriceILS)}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Intake Form + GPS Location Auto-Detection */}
          <form onSubmit={handleSubmitSOS} className="space-y-5">
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? '2. موقع المركبة وبيانات السائق:' : '2. Vehicle Location & Contact Details:'}</span>
              </h3>

              {/* GPS Auto-Locate Button Banner */}
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold animate-pulse">
                    <LocateFixed className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-blue-950 block">
                      {language === 'ar' ? 'تحديد موقعك الجغرافي بنقرة واحدة (GPS)' : '1-Click GPS Auto-Location'}
                    </strong>
                    <span className="text-[10px] text-blue-700">
                      {gpsAccuracyText || (language === 'ar' ? 'استقبال إحداثيات موقعك عبر قمر الـ GPS مباشرة' : 'Detect exact device coordinates instantly')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGetGpsLocation}
                  disabled={isLocating}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
                >
                  <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>
                    {isLocating
                      ? language === 'ar'
                        ? 'جارٍ التقاط الإحداثيات...'
                        : 'Locating...'
                      : language === 'ar'
                      ? 'تحديد موقعي الآن 📍'
                      : 'Locate Me (GPS) 📍'}
                  </span>
                </button>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'الاسم الكريم:' : 'Full Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ar' ? 'أحمد الدجاني' : 'Full Name'}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'رقم الهاتف / واتساب:' : 'Phone Number:'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+970 59 123 4567"
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'الموقع الحالي بالتفصيل:' : 'Current Location Address:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={language === 'ar' ? 'الخليل - شارع عين سارة' : 'Current Street / City'}
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'نوع وموديل المركبة:' : 'Vehicle Make & Model:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={`${vehicleMake} ${vehicleModel}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(' ');
                      setVehicleMake(parts[0] || 'Toyota');
                      setVehicleModel(parts.slice(1).join(' ') || 'Corolla');
                    }}
                    placeholder="Toyota RAV4"
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'ar' ? 'رقم اللوحة:' : 'Plate Number:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    placeholder="7-8899-22"
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono font-bold outline-none focus:border-blue-600"
                  />
                </div>

                {selectedIssue === 'towing' && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {language === 'ar' ? 'عنوان جهة السحب / الورشة المرادة:' : 'Towing Drop-off Destination (Optional):'}
                    </label>
                    <input
                      type="text"
                      value={destinationAddress}
                      onChange={(e) => setDestinationAddress(e.target.value)}
                      placeholder={language === 'ar' ? 'مركز أوتو تك بريميير أو المنزل' : 'AutoTech Garage or Home'}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold outline-none focus:border-blue-600"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Interactive Live Map Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ar' ? '3. خريطة التغطية والرادار المباشر لأقرب سطحة:' : '3. Live Rescue Coverage Radar:'}</span>
                </h3>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    {language === 'ar' ? 'موقعك (طلب طوارئ)' : 'Your SOS Pin'}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {language === 'ar' ? 'ونش الإنقاذ (4 دقائق)' : 'Nearest Tow Truck'}
                  </span>
                </div>
              </div>

              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative">
                <LeafletMap
                  height="100%"
                  showCountrySelector={true}
                  center={[gpsCoords.lat, gpsCoords.lng]}
                  emergencyLocation={{
                    lat: gpsCoords.lat,
                    lng: gpsCoords.lng,
                    title: language === 'ar' ? 'موقعك (نداء طوارئ)' : 'Emergency Breakdown Pin',
                  }}
                  rescueTruckLocation={{
                    lat: gpsCoords.lat + 0.007,
                    lng: gpsCoords.lng + 0.005,
                    title: language === 'ar' ? 'ونش سطحة أبو العبد (4 دقائق)' : 'Tow Truck Patrol (4 mins away)',
                  }}
                />
              </div>
            </div>

            {/* Step 4: Cost Summary & Submit Emergency Dispatch */}
            <div className="p-4 bg-gradient-to-r from-rose-50 via-slate-50 to-amber-50 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900">
                    {language === 'ar' ? 'التكلفة التقديرية المبدئية:' : 'Estimated Service Rate:'}
                  </span>
                  <strong className="text-lg font-black text-rose-700 font-mono">
                    {formatPrice(activeServiceObj.basePriceILS)}
                  </strong>
                </div>
                <p className="text-[11px] text-slate-500">
                  {language === 'ar'
                    ? `يشمل رسوم الانتقال الفوري لخدمة (${activeServiceObj.nameAr}) والوصول خلال ${activeServiceObj.etaMinutes} دقيقة`
                    : `Includes dispatch fee for ${activeServiceObj.nameEn} with ETA ~${activeServiceObj.etaMinutes} mins`}
                </p>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-rose-600 via-rose-700 to-red-700 hover:from-rose-700 hover:to-red-800 text-white font-black text-sm rounded-2xl shadow-xl shadow-rose-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 shrink-0"
              >
                <ShieldAlert className="w-5 h-5 text-amber-300 animate-bounce" />
                <span>
                  {language === 'ar'
                    ? 'إرسال نداء الاستغاثة وطلب الونش فوراً ⚡'
                    : 'Broadcast SOS & Deploy Patrol Now ⚡'}
                </span>
              </button>
            </div>
          </form>

          {/* Safety Checklist */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
            <strong className="text-xs font-black text-slate-900 block uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ar' ? 'إرشادات السلامة أثناء انتظار وصول فريق الإنقاذ:' : 'While You Wait, Stay Safe'}</span>
            </strong>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-600 font-medium">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                {language === 'ar' ? '1. توقف في مكان آمن بعيداً عن مسار السير' : '1. Move to a safe location away from traffic'}
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                {language === 'ar' ? '2. تشغيل أضواء التحذير الرباعية (Hazard)' : '2. Turn on hazard emergency lights'}
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                {language === 'ar' ? '3. البقاء داخل السيارة على الطرق السريعة' : '3. Stay inside the car if on busy highways'}
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                {language === 'ar' ? '4. إبقاء خط هاتفك متاحاً للتواصل مع السائق' : '4. Keep your phone line clear and handy'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
