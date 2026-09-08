import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Car,
  MapPin,
  Sparkles,
  Users,
  Award,
  Clock,
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { language } = useApp();

  const metrics = [
    { value: '12,482+', labelAr: 'عميل سعيد', labelEn: 'Happy Customers' },
    { value: '1,250+', labelAr: 'ورشة ومزود معتمد', labelEn: 'Verified Providers' },
    { value: '4.9 ★', labelAr: 'متوسط التقييم', labelEn: 'Average Rating' },
    { value: '98%', labelAr: 'نسبة الرضا', labelEn: 'Satisfaction Rate' },
    { value: '24/7', labelAr: 'دعم ومساندة', labelEn: 'Support Available' },
  ];

  const partnerLogos = [
    { name: 'RAYA', subtitle: 'Auto Group' },
    { name: 'Shell Helix', subtitle: 'Motor Oils' },
    { name: 'VARTA', subtitle: 'Automotive Batteries' },
    { name: 'Mobil 1', subtitle: 'Synthetic Oils' },
    { name: 'BOSCH', subtitle: 'Auto Parts' },
  ];

  const testimonials = [
    {
      id: 1,
      nameAr: 'عمر ع.',
      nameEn: 'Omar A.',
      cityAr: 'رام الله',
      cityEn: 'Ramallah',
      serviceAr: 'غيار زيت وفلتر وفحص فرامل',
      serviceEn: 'Oil change & brake inspection',
      rating: 5,
      commentAr:
        'منصة رائعة جداً، وفرت عليّ الكثير من الوقت في البحث عن ورشة موثوقة. تم إنجاز الصيانة في الوقت المحدد وبسعر مطابق للعرض.',
      commentEn:
        'Great platform that saved me time finding a reliable workshop. Service was on time and at the agreed price.',
    },
    {
      id: 2,
      nameAr: 'لينا م.',
      nameEn: 'Lina M.',
      cityAr: 'البيرة',
      cityEn: 'Al-Bireh',
      serviceAr: 'صيانة وتعبئة مكيف',
      serviceEn: 'AC repair & recharge',
      rating: 5,
      commentAr:
        'حجزت موعد لصيانة المكيف وكان الفني خبير ومحترف. أعجبني حفظ الفاتورة والتقرير تلقائياً في حسابي.',
      commentEn:
        'Booked an AC appointment and the technician was very professional. Loved having my invoice saved digitally.',
    },
    {
      id: 3,
      nameAr: 'يوسف ك.',
      nameEn: 'Yousef K.',
      cityAr: 'نابلس',
      cityEn: 'Nablus',
      serviceAr: 'طوارئ ونش وإنقاذ',
      serviceEn: 'Roadside assistance & tow',
      rating: 5,
      commentAr:
        'تعطلت سيارتي وطلبت ونش طوارئ، وصلني خلال 15 دقيقة وتتبعت موقعه مباشرة على الخريطة. خدمة لا تقدر بثمن!',
      commentEn:
        'Used the roadside assistance when my car broke down. Flatbed arrived in 15 mins with live tracking. Lifesaver!',
    },
    {
      id: 4,
      nameAr: 'سارة ح.',
      nameEn: 'Sara H.',
      cityAr: 'الخليل',
      cityEn: 'Hebron',
      serviceAr: 'فحص كمبيوتر وبرمجة',
      serviceEn: 'Diagnostics & ECU Scan',
      rating: 5,
      commentAr:
        'الشفافية في الأسعار والمقارنة بين الورش جعلت تجربة الصيانة مريحة جداً بدون أي خوف من الاستغلال.',
      commentEn:
        'Price transparency and comparing multiple quotes made car maintenance completely stress-free.',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-900 relative overflow-hidden border-b border-slate-200 space-y-16">
      {/* 1. Trusted by Thousands Across Palestine Bar */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
          <div className="text-center space-y-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {language === 'ar' ? 'موثوق من آلاف السائقين وأصحاب المركبات في فلسطين' : 'Trusted by Thousands Across Palestine'}
            </h3>
          </div>

          {/* 5 Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center border-b border-slate-100 pb-8">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {m.value}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {language === 'ar' ? m.labelAr : m.labelEn}
                </div>
              </div>
            ))}
          </div>

          {/* Partner Brands */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
            {partnerLogos.map((p, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-black text-base sm:text-lg tracking-wider text-slate-800 font-mono">{p.name}</span>
                <span className="text-[9px] text-slate-400">{p.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Customer Testimonials Cards */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {language === 'ar' ? 'ماذا يقول عملاؤنا؟' : 'What Our Customers Say'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === 'ar'
              ? 'تجارب حقيقية لمالكي مركبات استخدموا منصة أهل المركبات لصيانة سياراتهم.'
              : 'Real stories from vehicle owners who trust AHL AL MARKABAT.'}
          </p>
        </div>

        {/* Testimonials 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card-hover-lift bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 shadow-sm transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{language === 'ar' ? item.commentAr : item.commentEn}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    {language === 'ar' ? item.nameAr : item.nameEn}
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    {language === 'ar' ? item.cityAr : item.cityEn}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{language === 'ar' ? 'موثق' : 'Verified'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
