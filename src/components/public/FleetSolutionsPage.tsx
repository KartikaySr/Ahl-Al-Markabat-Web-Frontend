import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  Building2,
  TrendingDown,
  Clock,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Users,
  Car,
  Zap,
  ArrowRight,
  PhoneCall,
  DollarSign,
  FileText,
  Star,
  ChevronDown,
  Sparkles,
  Layers,
  Wrench,
} from 'lucide-react';

export const FleetSolutionsPage: React.FC = () => {
  const { language, formatPrice, setActiveTab, showToast, setIsQuoteModalOpen } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const stats = [
    { labelEn: 'Vehicles Managed', labelAr: 'مركبة تحت الإدارة المباشرة', value: '12,482+' },
    { labelEn: 'Service Providers', labelAr: 'ورشة ومركز صيانة معتمد', value: '1,250+' },
    { labelEn: 'Average Rating', labelAr: 'متوسط التقييم العام', value: '4.9 ★' },
    { labelEn: 'Customer Satisfaction', labelAr: 'نسبة رضا مديري الأساطيل', value: '99%' },
    { labelEn: 'Support Available', labelAr: 'دعم فني واستجابة طوارئ', value: '24/7' },
  ];

  const industries = [
    {
      nameEn: 'Logistics & Transport',
      nameAr: 'الخدمات اللوجستية والنقل الثقيل',
      descEn: 'Keep your trucks and fleets on the road with minimal downtime.',
      descAr: 'صيانة دورية لشاحنات النقل وسيارات الشحن لتقليل فترات التوقف.',
      icon: Truck,
    },
    {
      nameEn: 'Rental Fleets',
      nameAr: 'شركات تأجير السيارات',
      descEn: 'Efficiently manage bookings, availability, and vehicle utilization.',
      descAr: 'متابعة الرخص والتأمين وحالة المركبات وجاهزيتها للتأجير الفوري.',
      icon: Car,
    },
    {
      nameEn: 'Enterprise Maintenance',
      nameAr: 'أساطيل الشركات والمؤسسات',
      descEn: 'Centralize maintenance operations across multiple locations.',
      descAr: 'إدارة مركزية لكافة فواتير وإصلاحات فروع الشركة في منصة واحدة.',
      icon: Building2,
    },
    {
      nameEn: 'Delivery Fleets',
      nameAr: 'أساطيل التوصيل والشحن السريع',
      descEn: 'Optimize last-mile delivery with reliable and well-serviced vehicles.',
      descAr: 'صيانة فورية سريعة لمركبات التوصيل لضمان وصول الشحنات في موعدها.',
      icon: Zap,
    },
    {
      nameEn: 'Service Vehicles',
      nameAr: 'مركبات الدعم الميداني',
      descEn: 'Manage field service fleets with real-time tracking and job updates.',
      descAr: 'تتبع كفاءة سيارات الخدمة الميدانية وجداول الفحص الدوري المعتمد.',
      icon: Wrench,
    },
  ];

  const kpis = [
    {
      labelEn: 'Total Fleet Cost',
      labelAr: 'إجمالي تكلفة تشغيل الأسطول',
      value: formatPrice(24580),
      changeEn: '-15.3% last month',
      changeAr: '-15.3% وفر مقارنة بالشهر السابق',
      isPositive: true,
    },
    {
      labelEn: 'Maintenance Cost',
      labelAr: 'تكاليف الصيانة الدورية',
      value: formatPrice(8420),
      changeEn: '-8.2% last month',
      changeAr: '-8.2% انخفاض في فواتير الصيانة',
      isPositive: true,
    },
    {
      labelEn: 'Fleet Downtime',
      labelAr: 'ساعات توقف المركبات',
      value: '18.6 hrs',
      changeEn: '-12.0% last month',
      changeAr: '-12.0% تقليل فترات التعطل',
      isPositive: true,
    },
    {
      labelEn: 'Jobs Completed',
      labelAr: 'مهام الصيانة المنجزة',
      value: '326',
      changeEn: '+8.4% last month',
      changeAr: '+8.4% إنجاز في الوقت المحدد',
      isPositive: true,
    },
    {
      labelEn: 'Fleet Utilization',
      labelAr: 'معدل تشغيل الأسطول',
      value: '85%',
      changeEn: '+4.5% last month',
      changeAr: '+4.5% كفاءة تشغيلية أعلى',
      isPositive: true,
    },
  ];

  const pricingPlans = [
    {
      nameEn: 'Starter',
      nameAr: 'باقة الانطلاق',
      subEn: 'For small fleets getting started',
      subAr: 'للشركات الصغيرة والأساطيل الناشئة',
      price: billingCycle === 'annual' ? 39 : 49,
      featuresEn: [
        'Up to 10 vehicles',
        'Basic maintenance tracking',
        'Service booking across 1,250+ garages',
        'Email & ticket support',
      ],
      featuresAr: [
        'حتى 10 مركبات',
        'تتبع الصيانة الدورية والتنبيهات',
        'حجز صيانة مباشر لدى 1,250+ ورشة',
        'دعم فني عبر البريد والتذاكر',
      ],
      popular: false,
    },
    {
      nameEn: 'Professional',
      nameAr: 'الباقة الاحترافية',
      subEn: 'For growing businesses & commercial fleets',
      subAr: 'للشركات النامية والأساطيل المتوسطة',
      price: billingCycle === 'annual' ? 99 : 129,
      featuresEn: [
        'Up to 50 vehicles',
        'All Starter features included',
        'Advanced DVI digital inspection reports',
        '24/7 dedicated fleet support',
        'Dedicated corporate account manager',
      ],
      featuresAr: [
        'حتى 50 مركبة',
        'كافة مميزات باقة الانطلاق',
        'تقارير الفحص الرقمي DVI بالصور والفيديو',
        'دعم فني للأساطيل على مدار 24/7',
        'مدير حساب مؤسسي مخصص',
      ],
      popular: true,
    },
    {
      nameEn: 'Business',
      nameAr: 'باقة الأعمال المتقدمة',
      subEn: 'For large commercial fleets & transport',
      subAr: 'للأساطيل الكبيرة وشركات النقل',
      price: billingCycle === 'annual' ? 199 : 249,
      featuresEn: [
        'Up to 200 vehicles',
        'All Professional features included',
        'Mulkiya & insurance compliance automation',
        'Priority workshop bay reservations',
        'Custom ERP & Telematics API integration',
      ],
      featuresAr: [
        'حتى 200 مركبة',
        'كافة مميزات الباقة الاحترافية',
        'أتمتة تجديد الرخص والتأمين والمخالفات',
        'أولوية حجز فورية في الورش المعتمدة',
        'ربط برمجي API مع أنظمة الشركة ERP وGPS',
      ],
      popular: false,
    },
    {
      nameEn: 'Enterprise',
      nameAr: 'حلول المؤسسات الكبرى',
      subEn: 'For enterprise & government fleets',
      subAr: 'للشركات القابضة والهيئات الحكومية',
      priceCustomEn: 'Custom',
      priceCustomAr: 'حسب الطلب',
      featuresEn: [
        'Unlimited vehicles',
        'Custom telemetry & ERP integrations',
        'Dedicated on-site technical account manager',
        'Custom enterprise SLA & billing terms',
      ],
      featuresAr: [
        'عدد غير محدود من المركبات',
        'تكامل كامل مع أنظمة الأساطيل المخصصة',
        'مدير حساب ودعم ميداني مخصص',
        'اتفاقية مستوى الخدمة SLA وتسهيلات دفع مرنة',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-16">
      {/* 1. Hero Section */}
      <div className="bg-[#09152B] text-white py-16 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {language === 'ar' ? 'إدارة ذكية لأساطيل المركبات' : 'Smarter Fleet Management'} <br />
              <span className="text-amber-400">
                {language === 'ar' ? 'مخصصة لنمو أعمالك وشركتك' : 'Built for Business'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {language === 'ar'
                ? 'منصة شاملة لإدارة وصيانة وحوكمة أسطول مركباتك. خفّض تكاليف التشغيل بنسبة تصل حتى 20%، وقّلل فترات التوقف، وحافظ على حركة مركباتك على مدار الساعة.'
                : 'All-in-one platform to manage, service and optimize your fleet—reduce downtime, control costs and keep your vehicles moving.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  showToast(
                    language === 'ar'
                      ? 'تم تسجيل طلب العرض التوضيحي! سيتواصل معك مستشار الأساطيل قريباً.'
                      : 'Demo request registered! A fleet advisor will contact you shortly.',
                    'success'
                  );
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all"
              >
                {language === 'ar' ? 'طلب عرض توضيحي للشركات' : 'Request a Demo'}
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20"
              >
                {language === 'ar' ? 'استكشاف لوحة التحكم' : 'Explore Features'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                {language === 'ar' ? 'موثوق من كبرى الشركات' : 'Trusted by Businesses'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                {language === 'ar' ? 'متابعة وتقارير لحظية' : 'Real-time Visibility'}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-blue-400" />
                {language === 'ar' ? 'تقليل فترات التعطل' : 'Reduce Downtime'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 p-4">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
                alt="Fleet Dashboard Analytics"
                className="w-full h-64 sm:h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats Ribbon */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          {stats.map((st, i) => (
            <div key={i} className="space-y-1">
              <strong className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block">
                {st.value}
              </strong>
              <span className="text-xs text-slate-500 font-bold">
                {language === 'ar' ? st.labelAr : st.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Industries We Serve */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'القطاعات التي نخدمها' : 'Industries We Serve'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'حلول أساطيل مصممة خصيصاً لتلبية احتياجات كافة الأنشطة التجارية والصناعية.'
              : 'Tailored fleet solutions for every business need.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-2 text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <strong className="text-xs font-black text-slate-900 block">
                  {language === 'ar' ? ind.nameAr : ind.nameEn}
                </strong>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {language === 'ar' ? ind.descAr : ind.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Real Insights. Real Impact. KPIs */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            {language === 'ar' ? 'مؤشرات أداء رقمية وتأثير مالي ملموس' : 'Real Insights. Real Impact.'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'اتخذ قرارات تشغيلية مبنية على البيانات لتحقيق أعلى كفاءة وأقل تكلفة لأسطولك.'
              : 'Make data-driven decisions that keep your fleet efficient and profitable.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {kpis.map((k, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500">
                {language === 'ar' ? k.labelAr : k.labelEn}
              </span>
              <strong className="text-xl sm:text-2xl font-black text-slate-900 font-mono block">
                {k.value}
              </strong>
              <span className="text-[10px] font-bold text-emerald-600">
                {language === 'ar' ? k.changeAr : k.changeEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Flexible Pricing Plans */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'باقات اشتراك مرنة تناسب حجم أسطولك' : 'Simple, Flexible Plans for Every Business'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'اختر الباقة المناسبة لحجم أسطولك وابدأ توفير تكاليف الصيانة من اليوم الأول.'
              : 'Choose the plan that fits your fleet size and business needs.'}
          </p>

          <div className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 mt-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'monthly' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500'
              }`}
            >
              {language === 'ar' ? 'اشتراك شهري' : 'Monthly'}
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'annual' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-500'
              }`}
            >
              {language === 'ar' ? 'اشتراك سنوي (وفر 20%)' : 'Annual (Save 20%)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((p, i) => (
            <div
              key={i}
              className={`rounded-3xl p-6 bg-white border flex flex-col justify-between space-y-6 transition-all ${
                p.popular ? 'border-amber-400 shadow-xl ring-2 ring-amber-400/20 relative' : 'border-slate-200 shadow-2xs'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 start-6 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                  {language === 'ar' ? 'الأكثر طلباً للأساطيل' : 'Most Popular'}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <strong className="text-lg font-black text-slate-900 block">
                    {language === 'ar' ? p.nameAr : p.nameEn}
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    {language === 'ar' ? p.subAr : p.subEn}
                  </span>
                </div>

                <div>
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    {p.priceCustomAr
                      ? (language === 'ar' ? p.priceCustomAr : p.priceCustomEn)
                      : formatPrice(p.price || 0)}
                  </span>
                  {!p.priceCustomAr && (
                    <span className="text-xs text-slate-500 font-bold">
                      {' '}{language === 'ar' ? '/ شهرياً' : '/ month'}
                    </span>
                  )}
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                  {(language === 'ar' ? p.featuresAr : p.featuresEn).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  showToast(
                    language === 'ar'
                      ? `تم اختيار ${p.nameAr}! سيتواصل معك فريق مبيعات الأساطيل.`
                      : `Selected ${p.nameEn}! Our fleet sales team will contact you.`,
                    'success'
                  );
                }}
                className={`w-full py-2.5 rounded-xl font-black text-xs transition-all ${
                  p.popular
                    ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
