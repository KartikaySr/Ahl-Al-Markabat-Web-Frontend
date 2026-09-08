import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  MapPin,
  Car,
  ArrowRight,
} from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { language, setActiveTab, setIsQuoteModalOpen } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qAr: 'كيف يمكنني حجز موعد صيانة لمركبتي؟',
      qEn: 'How do I book a service?',
      aAr: 'يمكنك ببساطة اختيار الخدمة المطلوبة من قائمة الخدمات، تحديد ورشة الصيانة المناسبة، واختيار الموعد والتاريخ المناسبين لك لتأكيد الحجز فوراً.',
      aEn: 'Simply browse our services, choose a verified provider, select your preferred date & time, and confirm your booking instantly.',
    },
    {
      qAr: 'ما هي طرق الدفع المتاحة في المنصة؟',
      qEn: 'What payment methods are accepted?',
      aAr: 'ندعم الدفع نقداً عند استلام المركبة، الدفع عبر بطاقات الائتمان (فيزا / ماستركارد)، المحافظ الإلكترونية، وبوابات الدفع المحلية المعتمدة في فلسطين.',
      aEn: 'We support cash upon delivery, credit/debit cards (Visa/Mastercard), digital mobile wallets, and certified Palestinian payment gateways.',
    },
    {
      qAr: 'هل كافة الورش ومزودي الخدمات معتمدون ومرخصون؟',
      qEn: 'Are providers verified?',
      aAr: 'نعم، تخضع كافة الورش لتدقيق ميداني صارم وفحص السجل التجاري وشهادات مزاولة المهنة الميكانيكية المعتمدة قبل تفعيل عضويتهم.',
      aEn: 'Yes! All providers on AHL AL MARKABAT undergo strict background checks, licensing verification, and quality assessments.',
    },
    {
      qAr: 'هل خدمة طوارئ ونش الإنقاذ متاحة على مدار 24 ساعة؟',
      qEn: 'Is emergency assistance available 24/7?',
      aAr: 'نعم، تعمل خدمة طوارئ الطرق وونشات الإنقاذ 24 ساعة يومياً طيلة أيام الأسبوع في كافة محافظات وطرق فلسطين.',
      aEn: 'Yes, our 24/7 Roadside Assistance network operates around the clock across all cities and highways in Palestine.',
    },
    {
      qAr: 'هل يمكنني تتبع حالة الصيانة لمركبتي مباشرة؟',
      qEn: 'Can I track my service in real-time?',
      aAr: 'نعم، يوفر النظام تتبعاً حياً لحالة أمر العمل خطوة بخطوة من الاستلام والفحص وحتى انتهاء الصيانة وإصدار الفاتورة.',
      aEn: 'Yes, you can track the real-time progress of your service and receive live updates at every step of the repair.',
    },
    {
      qAr: 'هل يمكنني تعديل أو إلغاء موعد الحجز؟',
      qEn: 'Can I cancel or reschedule a booking?',
      aAr: 'نعم، يمكنك إلغاء أو إعادة جدولة أي موعد بسهولة من خلال لوحة كراجك الرقمي قبل ساعتين على الأقل من الموعد المحدد مجاناً.',
      aEn: 'Yes, you can easily reschedule or cancel your appointment through your digital garage dashboard at least 2 hours before the scheduled time.',
    },
  ];

  return (
    <section className="py-16 bg-white text-slate-900 relative overflow-hidden border-b border-slate-200 space-y-16">
      {/* 1. FAQ Accordion Grid */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === 'ar'
              ? 'إجابات على أكثر الأسئلة شيوعاً حول استخدام المنصة وخدمات الصيانة.'
              : 'Everything you need to know about our platform and services.'}
          </p>
        </div>

        {/* 2-Column FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 overflow-hidden transition-all shadow-sm self-start"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full p-4 text-start flex items-center justify-between gap-4 font-bold text-xs sm:text-sm transition-colors ${
                    isOpen ? 'text-blue-700 bg-blue-50/50' : 'text-slate-900 hover:text-blue-600'
                  }`}
                >
                  <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 animate-slide-up">
                    <p>{language === 'ar' ? faq.aAr : faq.aEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Ready to Get Started? Banner */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="bg-[#0B1528] rounded-3xl p-8 sm:p-12 border border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute top-0 end-0 w-80 h-80 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {language === 'ar' ? (
                <>
                  جاهز للبدء؟ <br />
                  <span className="text-amber-400">اعثر على أفضل الخبراء وحافظ على مركبتك بأفضل حال.</span>
                </>
              ) : (
                <>
                  Ready to Get Started? <br />
                  <span className="text-amber-400">Find trusted experts and keep your vehicle in the best hands.</span>
                </>
              )}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'معتمد وموثوق' : 'Trusted & Verified'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'سريع وموثوق' : 'Fast & Reliable'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'قريب منك' : 'Nearby You'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'منصة متكاملة' : 'All-in-One Platform'}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={() => setActiveTab('services')}
              className="px-6 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <span>{language === 'ar' ? 'استعرض الخدمات الآن ←' : 'Find Services Now →'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
