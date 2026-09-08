import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Award,
  CheckCircle2,
  Share2,
  Calendar,
  Wrench,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Car,
  Zap,
  Users,
  Building2,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';

export const ProviderDetailModal: React.FC = () => {
  const {
    selectedProviderModal,
    setSelectedProviderModal,
    language,
    setActiveTab,
    setIsQuoteModalOpen,
    startBookingWithProvider,
    formatPrice,
    showToast,
    branches,
  } = useApp();

  const [activeModalTab, setActiveModalTab] = useState<
    'overview' | 'services' | 'branches' | 'reviews' | 'location' | 'about'
  >('overview');

  if (!selectedProviderModal) return null;

  const prov = selectedProviderModal;
  const businessName = language === 'ar' ? prov.businessNameAr : prov.businessNameEn;
  const address = language === 'ar' ? prov.addressAr : prov.addressEn;
  const city = language === 'ar' ? prov.cityAr : prov.cityEn;
  const workingHours = language === 'ar' ? prov.workingHoursAr : prov.workingHoursEn;

  const services = [
    { id: 'cat-oil', nameAr: 'غيار زيت تخليقي وفلتر وكالة', nameEn: 'Synthetic Oil & OEM Filter Change', price: 149, time: '30-45 mins' },
    { id: 'cat-brakes', nameAr: 'فحص واستبدال فحمات الفرامل مع خراطة هوبات', nameEn: 'Brake Inspection & Ceramic Pad Replacement', price: 220, time: '45-60 mins' },
    { id: 'cat-prog', nameAr: 'فحص شامل بالكمبيوتر وبرمجة الأعطال OBD-II', nameEn: 'Comprehensive OBD-II Computer Diagnostics', price: 120, time: '30 mins' },
    { id: 'cat-ac', nameAr: 'صيانة تكييف وتعبئة غاز فريون R134a مع فحص تسريب', nameEn: 'AC System Service & Gas Recharge (R134a)', price: 180, time: '40 mins' },
    { id: 'cat-hybrid', nameAr: 'فحص وصيانة بطاريات الهايبرد ونظام الشحن', nameEn: 'Hybrid High-Voltage Battery & Inverter Service', price: 350, time: '90 mins' },
    { id: 'cat-gear', nameAr: 'تغيير زيت ناقل الحركة الأوتوماتيكي مع الفلتر', nameEn: 'Automatic Transmission Fluid & Filter Flush', price: 290, time: '60 mins' },
  ];

  const handleBookService = (serviceId?: string) => {
    startBookingWithProvider(prov, serviceId);
    setSelectedProviderModal(null);
    showToast(
      language === 'ar'
        ? `تم تحديد ${businessName} لمتابعة خطوات الحجز!`
        : `Selected ${businessName} to proceed with booking!`,
      'info'
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 text-slate-900 max-h-[92vh] flex flex-col">
        {/* Header Hero Banner with real workshop photo */}
        <div className="relative bg-[#09152B] text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={() => setSelectedProviderModal(null)}
            className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border-2 border-white/20 shadow-md shrink-0">
                <img
                  src={prov.image || '/images/garage_autotech.jpg'}
                  alt={businessName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/garage_autotech.jpg';
                  }}
                />
              </div>
              <div className="space-y-1 text-center sm:text-start">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">{businessName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black border border-blue-400/30 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>{language === 'ar' ? 'مركز معتمد 100%' : '100% Verified'}</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-300">
                  <span className="text-amber-400 font-bold">★ {prov.rating.toFixed(1)} ({prov.reviewCount} {language === 'ar' ? 'تقييم' : 'reviews'})</span>
                  <span>•</span>
                  <span>📍 {address}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">● {language === 'ar' ? 'مفتوح الآن' : 'Open Now'}</span>
                </div>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleBookService()}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'حجز موعد فوري' : 'Book Service Now'}</span>
              </button>
              <button
                onClick={() => {
                  setSelectedProviderModal(null);
                  setIsQuoteModalOpen(true);
                }}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all"
              >
                {language === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6 pt-4 border-t border-slate-800 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block font-black">{prov.certifiedTechnicians || 6} {language === 'ar' ? 'فنيين' : 'Techs'}</strong>
              <span className="text-[9px] text-slate-400">{language === 'ar' ? 'فريق معتمد' : 'Certified Team'}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block font-black">15-20 {language === 'ar' ? 'دقيقة' : 'mins'}</strong>
              <span className="text-[9px] text-slate-400">{language === 'ar' ? 'سرعة الاستجابة' : 'Response Time'}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-amber-400 block font-black">★ {prov.rating}</strong>
              <span className="text-[9px] text-slate-400">{language === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block font-black">{language === 'ar' ? 'قطع أصلية' : 'OEM Certified'}</strong>
              <span className="text-[9px] text-slate-400">{language === 'ar' ? 'ضمان وكالة' : 'Genuine Parts'}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-emerald-400 block font-black">{prov.supportsMobileService ? (language === 'ar' ? 'متنقل + ورشة' : 'Mobile + Shop') : (language === 'ar' ? 'في الورشة' : 'Workshop')}</strong>
              <span className="text-[9px] text-slate-400">{language === 'ar' ? 'طريقة الخدمة' : 'Service Mode'}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
              <strong className="text-white block font-black">{language === 'ar' ? 'ضمان 6 شهور' : '6 Mo. Warranty'}</strong>
              <span className="text-[9px] text-slate-400">{language === 'ar' ? 'على كافة الأعمال' : 'On Work & Parts'}</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-slate-200 flex items-center gap-4 overflow-x-auto text-xs font-bold text-slate-500 shrink-0 bg-slate-50">
          {(['overview', 'services', 'branches', 'reviews', 'location'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveModalTab(tab)}
              className={`py-3 border-b-2 transition-all capitalize whitespace-nowrap ${
                activeModalTab === tab
                  ? 'border-blue-600 text-blue-600 font-black'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'overview' && (language === 'ar' ? 'نظرة عامة' : 'Overview')}
              {tab === 'services' && (language === 'ar' ? 'الخدمات والأسعار' : 'Services & Pricing')}
              {tab === 'branches' && (
                <span className="flex items-center gap-1">
                  <span>{language === 'ar' ? 'الفروع ومراكز الصيانة' : 'Workshop Branches'}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black">{branches.length}</span>
                </span>
              )}
              {tab === 'reviews' && (language === 'ar' ? 'تقييمات العملاء' : 'Customer Reviews')}
              {tab === 'location' && (language === 'ar' ? 'الموقع وساعات العمل' : 'Location & Hours')}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeModalTab === 'branches' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {language === 'ar' ? 'شبكة فروع ومراكز الصيانة المعتمدة في فلسطين' : 'Certified Multi-Branch Network in Palestine'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'يمكنك حجز موعد وزيارة أي من فروعنا المعتمدة المنتشرة في المحافظات.'
                      : 'Drop off your vehicle or book an appointment at any of our official branches.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {branches.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <strong className="text-xs font-black text-slate-900 block">{language === 'ar' ? b.nameAr : b.name}</strong>
                        <span className="text-[10px] text-blue-600 font-bold block">{language === 'ar' ? b.cityAr : b.city}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black">
                        {b.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2">{language === 'ar' ? b.addressAr : b.address}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-200/60">
                      <span>{b.serviceBays} {language === 'ar' ? 'مسارات خدمة' : 'Bays'} • {b.manager}</span>
                      <strong className="text-slate-900 font-bold">{b.phone}</strong>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleBookService()}
                        className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors"
                      >
                        {language === 'ar' ? 'حجز في هذا الفرع' : 'Book at this Branch'}
                      </button>
                      <a
                        href={`tel:${b.phone}`}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold"
                      >
                        📞
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* About */}
                <div className="space-y-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? `نبذة عن ${businessName}` : `About ${businessName}`}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'ar'
                      ? `${businessName} يعتبر من المراكز الرائدة والمعتمدة في شبكة أهل المركبات بمدينة ${city}. يقدم المركز فحصاً شاملاً بأحدث أجهزة التشخيص الإلكترونية، ويضم طاقماً هندسياً معتمداً لجميع أنواع السيارات الأوروبية واليابانية والأمريكية مع ضمان كامل.`
                      : `${businessName} is an accredited premier facility in ${city} certified under the Ahl Al Markabat network. Equipped with dealership-grade diagnostic scan tools, clean bays, and certified master technicians.`}
                  </p>
                </div>

                {/* Supported Vehicle Makes */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? 'العلامات التجارية المدعومة' : 'Supported Makes'}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(prov.supportedMakes || ['Toyota', 'Hyundai', 'Mercedes-Benz', 'BMW', 'Volkswagen', 'Ford', 'Audi']).map((make, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        ✓ {make}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Services List with Direct Booking */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {language === 'ar' ? 'الخدمات المتاحة للحجز المباشر' : 'Available Services & Pricing'}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-bold">
                      {language === 'ar' ? 'أسعار شفافة محددة مسبقاً' : 'Fixed Transparent Prices'}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {services.map((s) => (
                      <div
                        key={s.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-400 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <strong className="text-xs font-black text-slate-900 block">
                            {language === 'ar' ? s.nameAr : s.nameEn}
                          </strong>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" /> {s.time}</span>
                            <span>•</span>
                            <span className="text-emerald-600 font-bold">✓ {language === 'ar' ? 'شامل أجور اليد والضمان' : 'Includes Parts & Warranty'}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          <span className="text-sm font-black text-slate-900 font-mono">
                            {formatPrice(s.price)}
                          </span>
                          <button
                            onClick={() => handleBookService(s.id)}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                          >
                            {language === 'ar' ? 'حجز هذه الخدمة' : 'Book Service'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Highlights, Hours, and Phone */}
              <div className="lg:col-span-4 space-y-4">
                {/* Working Hours Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <strong className="text-xs font-black text-slate-900 block uppercase">
                    {language === 'ar' ? 'أوقات الدوام الرسمي' : 'Working Hours'}
                  </strong>
                  <p className="text-xs font-bold text-slate-700">{workingHours}</p>
                  <div className="text-[10px] text-emerald-600 font-bold pt-1 border-t border-slate-200/80">
                    ● {language === 'ar' ? 'متاح لاستقبال الحجوزات والسيارات اليوم' : 'Open for vehicle drop-offs & bookings today'}
                  </div>
                </div>

                {/* Direct Hotline Contact Card */}
                <div className="p-4 rounded-2xl bg-[#09152B] text-white border border-slate-800 space-y-2.5 text-center">
                  <span className="text-[10px] text-slate-300 block font-bold">
                    {language === 'ar' ? 'هل لديك استفسار مباشر للمركز؟' : 'Need Immediate Assistance?'}
                  </span>
                  <strong className="text-base font-black text-amber-400 font-mono block" dir="ltr">
                    {prov.phone}
                  </strong>
                  <a
                    href={`tel:${prov.phone}`}
                    className="w-full py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl block text-center shadow-sm"
                  >
                    {language === 'ar' ? 'اتصال بالورشة الآن 📞' : 'Call Workshop Now 📞'}
                  </a>
                </div>

                {/* Instant Book CTA Card */}
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2 text-center">
                  <span className="text-xs font-black text-blue-950 block">
                    {language === 'ar' ? 'حجز موعد مؤكد عبر المنصة' : 'Guaranteed Platform Booking'}
                  </span>
                  <p className="text-[10px] text-blue-700">
                    {language === 'ar'
                      ? 'احجز موعدك أونلاين واحصل على خصم 10% وفحص رقمي مجاني لمركبتك.'
                      : 'Book online to secure your bay and get a free multi-point digital inspection.'}
                  </p>
                  <button
                    onClick={() => handleBookService()}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs transition-all"
                  >
                    {language === 'ar' ? 'بدء الحجز بالخطوات ←' : 'Start Step-by-Step Booking →'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

