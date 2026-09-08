import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Users,
  CalendarCheck,
  Wrench,
  Star,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { language, setIsQuoteModalOpen, setActiveTab } = useApp();

  const steps = [
    {
      step: 1,
      titleAr: '1. البحث',
      titleEn: '1. Search',
      descAr: 'ابحث عن الخدمة التي تحتاجها أو العطل الملاحظ.',
      descEn: 'Find the service you need.',
      icon: Search,
    },
    {
      step: 2,
      titleAr: '2. اختيار المزود',
      titleEn: '2. Choose Provider',
      descAr: 'قارن بين الورش المعتمدة واختر الأنسب لك.',
      descEn: 'Compare & select a trusted provider.',
      icon: Users,
    },
    {
      step: 3,
      titleAr: '3. الحجز والتأكيد',
      titleEn: '3. Book & Confirm',
      descAr: 'حدد الموعد والوقت المناسب لك بضغطة زر.',
      descEn: 'Pick a time that suits you.',
      icon: CalendarCheck,
    },
    {
      step: 4,
      titleAr: '4. إنجاز الخدمة',
      titleEn: '4. Get It Done',
      descAr: 'خدمة احترافية بجودة عالية وضمان معتمد.',
      descEn: 'Service with quality, on time.',
      icon: Wrench,
    },
    {
      step: 5,
      titleAr: '5. التقييم والمراجعة',
      titleEn: '5. Rate & Review',
      descAr: 'شارك تجربتك وساعد الآخرين في الاختيار.',
      descEn: 'Share your experience and help others.',
      icon: Star,
    },
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {language === 'ar' ? 'كيف تعمل منصة أهل المركبات؟' : 'How It Works'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === 'ar'
              ? 'خطوات بسيطة وسلسة تبدأ من البحث وحتى استلام مركبتك بأعلى معايير الجودة.'
              : 'Simple, transparent steps from discovering verified specialists to job completion.'}
          </p>
        </div>

        {/* 5-Step Connected Flow Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center space-y-3 relative group"
                >
                  {/* Step Number Circle Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-600 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all duration-300 shadow-sm relative z-10">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {language === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Garage Workflow Photos Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative rounded-2xl overflow-hidden shadow-sm h-40 group">
            <img
              src="/images/howitworks_step1.jpg"
              alt="Step 1 Inspection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-bold">
                {language === 'ar' ? 'فحص وتشخيص دقيق' : 'Diagnostics & Inspection'}
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-sm h-40 group">
            <img
              src="/images/howitworks_step2.jpg"
              alt="Step 2 Mechanics"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-bold">
                {language === 'ar' ? 'عروض أسعار شفافة' : 'Transparent Estimates'}
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-sm h-40 group">
            <img
              src="/images/garage_autotech.jpg"
              alt="Step 3 Certified Garage"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-bold">
                {language === 'ar' ? 'مراكز صيانة متطورة' : 'State-of-the-art Bays'}
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-sm h-40 group">
            <img
              src="/images/howitworks_step4.jpg"
              alt="Step 4 Completion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-white text-xs font-bold">
                {language === 'ar' ? 'تسليم وسجل رقمي' : 'Digital Handover & Warranty'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
