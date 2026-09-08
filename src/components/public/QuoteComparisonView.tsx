import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Star,
  DollarSign,
  ChevronDown,
  Wrench,
  ThumbsUp,
  Award,
  PhoneCall,
  Edit2,
  Share2,
  Filter,
} from 'lucide-react';

export const QuoteComparisonView: React.FC = () => {
  const {
    language,
    formatPrice,
    setActiveTab,
    showToast,
    selectedVehicle,
    serviceRequests,
    selectedCountry,
    setIsQuoteModalOpen,
    activeTab,
  } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'best' | 'price' | 'time'>('best');

  // Dynamic context matching user's actual vehicle & quote request
  const latestRequest = serviceRequests && serviceRequests.length > 0 ? serviceRequests[0] : null;
  const currentCar = selectedVehicle || {
    make: 'Toyota',
    model: 'Corolla Hybrid',
    year: 2023,
    plateNumber: '6-9874-90',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=300&auto=format&fit=crop&q=80',
    fuelType: 'hybrid',
  };

  const vehicleDisplay = latestRequest?.vehicleSummary || `${currentCar.make} ${currentCar.model} (${currentCar.year})`;
  const plateDisplay = latestRequest?.vehiclePlate || currentCar.plateNumber;
  const serviceSummary = latestRequest?.description || (language === 'ar' ? 'فحص شامل وصيانة وقائية للمنظومة' : 'Inspection & Scheduled Preventive Maintenance');
  const refCode = latestRequest?.referenceId || 'REQ-2026-1042';

  const quotes = [
    {
      id: 'q1',
      providerEn: 'AutoTech Premier Garage',
      providerAr: 'مركز أوتو تك بريميير للصيانة',
      badgeEn: 'Top Rated',
      badgeAr: 'الأعلى تقييماً',
      badgeColor: 'bg-blue-600 text-white',
      rating: 4.9,
      reviews: 126,
      distanceEn: '1.2 km',
      distanceAr: '1.2 كم',
      responseTimeEn: '15 min',
      responseTimeAr: '15 دقيقة',
      labor: 180,
      parts: 220,
      taxes: 20,
      total: 420,
      estTimeEn: '4 - 6 hours',
      estTimeAr: '4 - 6 ساعات',
      warrantyEn: '12 Months / 20,000 km',
      warrantyAr: '12 شهراً أو 20,000 كم',
      image: '/images/garage_autotech.jpg',
    },
    {
      id: 'q2',
      providerEn: 'Rapid Fix Center',
      providerAr: 'مركز رابيد فيكس للصيانة',
      badgeEn: 'Best Value',
      badgeAr: 'القيمة الأفضل',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
      rating: 4.8,
      reviews: 94,
      distanceEn: '1.6 km',
      distanceAr: '1.6 كم',
      responseTimeEn: '20 min',
      responseTimeAr: '20 دقيقة',
      labor: 150,
      parts: 200,
      taxes: 18,
      total: 368,
      estTimeEn: '3 - 5 hours',
      estTimeAr: '3 - 5 ساعات',
      warrantyEn: '12 Months / 20,000 km',
      warrantyAr: '12 شهراً أو 20,000 كم',
      image: '/images/garage_rapidfix.jpg',
    },
    {
      id: 'q3',
      providerEn: 'CityCare Auto Solutions',
      providerAr: 'مركز سيتي كير لحلول السيارات',
      badgeEn: '',
      badgeAr: '',
      badgeColor: '',
      rating: 4.7,
      reviews: 73,
      distanceEn: '2.4 km',
      distanceAr: '2.4 كم',
      responseTimeEn: '25 min',
      responseTimeAr: '25 دقيقة',
      labor: 170,
      parts: 210,
      taxes: 19,
      total: 399,
      estTimeEn: '4 - 6 hours',
      estTimeAr: '4 - 6 ساعات',
      warrantyEn: '12 Months / 20,000 km',
      warrantyAr: '12 شهراً أو 20,000 كم',
      image: '/images/howitworks_step2.jpg',
    },
    {
      id: 'q4',
      providerEn: 'PalAuto Service Center',
      providerAr: 'مركز بال أوتو للخدمات المعتمدة',
      badgeEn: '',
      badgeAr: '',
      badgeColor: '',
      rating: 4.6,
      reviews: 62,
      distanceEn: '2.1 km',
      distanceAr: '2.1 كم',
      responseTimeEn: '30 min',
      responseTimeAr: '30 دقيقة',
      labor: 160,
      parts: 230,
      taxes: 20,
      total: 410,
      estTimeEn: '4 - 6 hours',
      estTimeAr: '4 - 6 ساعات',
      warrantyEn: '12 Months / 20,000 km',
      warrantyAr: '12 شهراً أو 20,000 كم',
      image: '/images/garage_palauto.jpg',
    },
  ];

  const faqs = [
    {
      qEn: 'How are the quotes calculated?',
      qAr: 'كيف يتم احتساب عروض الأسعار؟',
      aEn: 'Quotes include itemized labor rates, verified OEM/aftermarket parts costs, and applicable taxes directly calculated by verified workshop technicians.',
      aAr: 'تتضمن عروض الأسعار تفصيلاً دقيقاً لأجور اليد العاملة، تكلفة قطع الغيار الأصلية المعتمدة، والضريبة المحسوبة مباشرة من فنيي الورش.',
    },
    {
      qEn: 'Are the prices final?',
      qAr: 'هل الأسعار المعروضة نهائية؟',
      aEn: 'Yes, quotes accepted through the platform are binding for the agreed service scope unless additional hidden damage is discovered during inspection.',
      aAr: 'نعم، عروض الأسعار المقبولة عبر المنصة ملزمة للورشة لنطاق العمل المتفق عليه مالم يتم اكتشاف أعطال مخفية أثناء الفحص وبموافقتك أولاً.',
    },
    {
      qEn: 'What if I need additional services?',
      qAr: 'ماذا لو احتاجت سيارتي لخدمات إضافية أثناء الفحص؟',
      aEn: 'If your technician spots other urgent issues during the initial check, you will receive a digital add-on approval request on your phone before any work begins.',
      aAr: 'إذا لاحظ الفني أي عطل آخر أثناء الفحص، ستتلقى إشعاراً رقمياً بالصور والتكلفة على هاتفك للموافقة عليه مسبقاً قبل بدء العمل.',
    },
    {
      qEn: 'What payment methods are accepted?',
      qAr: 'ما هي طرق الدفع المتاحة؟',
      aEn: 'You can pay online via debit/credit card, Apple Pay, or cash directly at the workshop counter.',
      aAr: 'يمكنك الدفع إلكترونياً بالبطاقة البنكية، Apple Pay، أو نقداً في مركز الصيانة عند الاستلام.',
    },
  ];

  const handleSelectQuote = (providerName: string) => {
    showToast(
      language === 'ar'
        ? `تم اختيار عرض ${providerName}! جاري التحويل لتأكيد الحجز...`
        : `Selected quote from ${providerName}! Redirecting to booking confirmation...`,
      'success'
    );
    setActiveTab('booking-confirmed');
  };

  return (
    <section className={`bg-slate-50 text-slate-900 border-b border-slate-200 ${activeTab === 'quotes' ? 'min-h-screen pb-20' : 'py-16'}`}>
      {/* 1. Header: Standalone Hero vs Clean Section Header */}
      {activeTab === 'quotes' ? (
        <div className="bg-[#0B1528] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
          <div className="max-w-[1700px] mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white">
              {language === 'ar' ? 'مقارنة عروض الأسعار المباشرة' : 'Compare Quotes'}
            </h1>
            <h2 className="text-xl sm:text-2xl font-black text-amber-400">
              {language === 'ar' ? 'اعثر على أفضل سعر وجودة لمركبتك' : 'Find the Best Service for You'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'قارن الأسعار والتقييمات والضمانات المعتمدة من أفضل الورش، واختر العرض الأنسب لاحتياجاتك وميزانيتك.'
                : 'Review prices, services, and ratings from verified providers and choose the offer that fits your needs and budget.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'ورش معتمدة' : 'Verified Providers'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'شفافية كاملة في الأسعار' : 'Transparent Pricing'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'القيمة الأفضل' : 'Best Value'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'توفير الوقت' : 'Save Time'}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'شفافية كاملة ومنافسة عادلة' : 'Live Transparent Quote Comparison'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {language === 'ar' ? 'قارن عروض الأسعار المباشرة لمركبتك' : 'Compare Live Quotes for Your Vehicle'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {language === 'ar'
                  ? 'احصل على عروض أسعار تنافسية ومفصلة لقطع الغيار الأصلية وأجور اليد العاملة مع ضمان معتمد.'
                  : 'Transparent, itemized pricing from certified garages with guaranteed workmanship.'}
              </p>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="btn-shimmer px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <Edit2 className="w-4 h-4 text-slate-950" />
              <span>{language === 'ar' ? 'طلب عرض سعر جديد ←' : 'Request a New Quote →'}</span>
            </button>
          </div>
        </div>
      )}

      <div className={`max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10 ${activeTab === 'quotes' ? 'pt-8' : ''}`}>
        {/* 2. Sleek Dynamic Request Context Bar */}
        <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 overflow-hidden">
              {currentCar.image ? (
                <img src={currentCar.image} alt={vehicleDisplay} className="w-full h-full object-cover" />
              ) : (
                <Car className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-black tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-md">
                  {language === 'ar' ? 'طلب تسعير نشط' : 'Active Quote Request'}
                </span>
                <span className="font-black text-slate-900 text-xs sm:text-sm truncate">
                  {vehicleDisplay}
                </span>
                <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  {plateDisplay}
                </span>
              </div>
              <p className="text-xs text-slate-600 truncate mt-1 max-w-xl">
                <span className="font-semibold text-slate-800">{language === 'ar' ? 'الخدمة المطلوبة:' : 'Requested Service:'}</span> {serviceSummary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            <span className="text-[11px] font-mono text-slate-400 font-semibold hidden sm:inline">
              Ref: {refCode}
            </span>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'طلب تسعير جديد' : 'New Quote Request'}</span>
            </button>
          </div>
        </div>

        {/* 3. Quotes Header & Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-black text-slate-950">
              {language === 'ar' ? `تم العثور على ${quotes.length} عروض أسعار معتمدة` : `${quotes.length} Quotes Found`}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
                <button
                  onClick={() => setSortBy('best')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'best' ? 'bg-blue-600 text-white font-black' : 'text-slate-700'}`}
                >
                  {language === 'ar' ? 'الأفضل مطابقة' : 'Best Match'}
                </button>
                <button
                  onClick={() => setSortBy('price')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'price' ? 'bg-blue-600 text-white font-black' : 'text-slate-700'}`}
                >
                  {language === 'ar' ? 'الأقل سعراً' : 'Price: Low to High'}
                </button>
                <button
                  onClick={() => setSortBy('time')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${sortBy === 'time' ? 'bg-blue-600 text-white font-black' : 'text-slate-700'}`}
                >
                  {language === 'ar' ? 'الأسرع استجابة' : 'Fastest Response'}
                </button>
              </div>
            </div>
          </div>

          {/* Quote Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quotes.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-blue-400 shadow-2xs space-y-4 flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200">
                    <img src={q.image} alt={q.providerEn} className="w-full h-full object-cover" />
                    {(language === 'ar' ? q.badgeAr : q.badgeEn) && (
                      <span className={`absolute top-2 start-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md ${q.badgeColor}`}>
                        {language === 'ar' ? q.badgeAr : q.badgeEn}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-950">
                      {language === 'ar' ? q.providerAr : q.providerEn}
                    </h4>
                    <div className="flex items-center gap-1 text-xs pt-0.5">
                      <span className="text-amber-500 font-bold">{q.rating} ★</span>
                      <span className="text-slate-400">({q.reviews})</span>
                      <span>•</span>
                      <span className="text-slate-500">{language === 'ar' ? q.distanceAr : q.distanceEn}</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      ⚡ {language === 'ar' ? `استجابة خلال ${q.responseTimeAr}` : `Response in ${q.responseTimeEn}`}
                    </span>
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>{language === 'ar' ? 'أجور اليد العاملة:' : 'Labor:'}</span>
                      <span className="font-mono">{formatPrice(q.labor)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>{language === 'ar' ? 'قطع الغيار الأصلية:' : 'Parts:'}</span>
                      <span className="font-mono">{formatPrice(q.parts)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>{language === 'ar' ? 'الضريبة:' : 'Taxes:'}</span>
                      <span className="font-mono">{formatPrice(q.taxes)}</span>
                    </div>
                    <div className="flex justify-between font-black text-slate-900 border-t border-slate-200 pt-1">
                      <span>{language === 'ar' ? 'الإجمالي الصافي:' : 'Total Price:'}</span>
                      <span className="font-mono text-blue-600">{formatPrice(q.total)}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5">
                    <div>
                      {language === 'ar' ? 'وقت الإنجاز:' : 'Est. Time:'}{' '}
                      <strong className="text-slate-700">{language === 'ar' ? q.estTimeAr : q.estTimeEn}</strong>
                    </div>
                    <div>
                      {language === 'ar' ? 'الضمان المعتمد:' : 'Warranty:'}{' '}
                      <strong className="text-slate-700">{language === 'ar' ? q.warrantyAr : q.warrantyEn}</strong>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleSelectQuote(language === 'ar' ? q.providerAr : q.providerEn)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all"
                  >
                    {language === 'ar' ? 'اختيار هذا العرض والبدء' : 'Choose This Quote'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. FAQs (Dedicated Quotes Tab only) */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-950 text-center">
              {language === 'ar' ? 'الأسئلة الشائعة حول عروض الأسعار' : 'Frequently Asked Questions'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-start font-bold text-xs text-slate-900 flex items-center justify-between gap-2"
                    >
                      <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-[11px] text-slate-600 border-t border-slate-100 font-medium leading-relaxed">
                        {language === 'ar' ? faq.aAr : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
