import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Zap,
  Navigation,
  DollarSign,
  History,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from 'lucide-react';

export const AIAssistantBannerSection: React.FC = () => {
  const { language, setIsAIAssistantOpen, setIsQuoteModalOpen } = useApp();

  const aiFeatures = [
    {
      id: 'matching',
      icon: Sparkles,
      titleAr: 'المطابقة الذكية',
      titleEn: 'Smart Matching',
      descAr: 'ترشيح أفضل ورشة معتمدة وفق نوع سيارتك وموقعك وميزانيتك.',
      descEn: 'Best provider for your needs & location.',
    },
    {
      id: 'tracking',
      icon: Navigation,
      titleAr: 'التتبع المباشر',
      titleEn: 'Live Tracking',
      descAr: 'متابعة مباشرة لحالة الصيانة وموقع فني الونش على الخريطة.',
      descEn: 'Track your booking in real time.',
    },
    {
      id: 'pricing',
      icon: DollarSign,
      titleAr: 'تسعير عادل وشفاف',
      titleEn: 'Fair Pricing',
      descAr: 'تقدير فوري ودقيق لتكلفة قطع الغيار وأجور اليد دون مفاجآت.',
      descEn: 'Get accurate estimates and transparent prices.',
    },
    {
      id: 'history',
      icon: History,
      titleAr: 'السجل الرقمي الدائم',
      titleEn: 'Digital History',
      descAr: 'أرشفة كافة الفواتير وتقارير الفحص لحفظ القيمة السوقية لسيارتك.',
      descEn: 'Access your service history anytime.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-Powered Technology</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {language === 'ar' ? 'رعاية ذكية لمركبتك مدعومة بالذكاء الاصطناعي' : 'AI-Powered. Smarter Car Care.'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === 'ar'
              ? 'تقنياتنا الذكية تضمن لك اختيار الورشة المثالية وفق احتياجات مركبتك وموقعك وميزانيتك بدقة وسرعة فائقة.'
              : 'Our intelligent technology matches you with the best provider for your needs, location, and budget.'}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => setIsAIAssistantOpen(true)}
                className="card-hover-lift bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {language === 'ar' ? feat.titleAr : feat.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'ar' ? feat.descAr : feat.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
