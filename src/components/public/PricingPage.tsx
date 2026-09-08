import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Check,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Star,
  Users,
  Car,
  Building2,
  ArrowRight,
  ChevronDown,
  Lock,
  Clock,
  Smartphone,
  TrendingUp,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { language, formatPrice, setActiveTab, showToast } = useApp();
  const [activeSegment, setActiveSegment] = useState<'individuals' | 'providers' | 'businesses'>('individuals');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const individualPlans = [
    {
      id: 'free',
      nameEn: 'Free Starter',
      nameAr: 'الباقة المجانية',
      subEn: 'Perfect for getting started',
      subAr: 'مثالية للمبتدئين وأصحاب المركبة الواحدة',
      price: 0,
      periodEn: '/ month',
      periodAr: '/ شهرياً',
      featuresEn: [
        'Add up to 1 vehicle',
        'Basic service reminders',
        'Find & book verified services',
        'Service history tracking',
        'Email & ticket support',
      ],
      featuresAr: [
        'إضافة مركبة واحدة',
        'تنبيهات مواعيد الصيانة الدورية',
        'البحث والحجز لدى الورش المعتمدة',
        'سجل الصيانة الرقمي للمركبة',
        'دعم فني عبر البريد والتذاكر',
      ],
      popular: false,
      ctaEn: 'Get Started Free',
      ctaAr: 'ابدأ مجاناً الآن',
    },
    {
      id: 'pro',
      nameEn: 'Pro Owner',
      nameAr: 'الباقة الاحترافية (برو)',
      subEn: 'For everyday vehicle owners',
      subAr: 'لأصحاب السيارات والعائلات',
      price: 29,
      periodEn: '/ month',
      periodAr: '/ شهرياً',
      featuresEn: [
        'Add up to 5 vehicles',
        'Real-time live service tracking',
        'Cost estimates & instant comparisons',
        'Digital receipts & warranty vault',
        'Priority 24/7 customer support',
      ],
      featuresAr: [
        'إضافة حتى 5 مركبات',
        'تتبع مباشر لمراحل الصيانة والفحص DVI',
        'مقارنة عروض الأسعار الفورية',
        'خزنة الفواتير الإلكترونية وشهادات الضمان',
        'أولوية دعم فني على مدار الساعة',
      ],
      popular: true,
      ctaEn: 'Upgrade to Pro',
      ctaAr: 'ترقية إلى برو',
    },
    {
      id: 'business',
      nameEn: 'Business Fleet',
      nameAr: 'باقة الأعمال والشركات',
      subEn: 'For small teams & companies',
      subAr: 'للشركات والمؤسسات والفرق الصغيرة',
      price: 99,
      periodEn: '/ month',
      periodAr: '/ شهرياً',
      featuresEn: [
        'Add up to 25 vehicles',
        'Multi-user team access & permissions',
        'Fleet overview dashboard',
        'Preventive maintenance scheduling',
        'Consolidated tax invoices & reporting',
        'Priority dedicated phone support',
      ],
      featuresAr: [
        'إضافة حتى 25 مركبة',
        'صلاحيات متعددة للمستخدمين والسائقين',
        'لوحة تحكم مركزية للأسطول',
        'جدولة الصيانة الوقائية والتنبيهات',
        'تقارير مالية وفواتير ضريبية مجمعة',
        'خط دعم هاتفي مباشر ومخصص',
      ],
      popular: false,
      ctaEn: 'Start Business Plan',
      ctaAr: 'بدء باقة الأعمال',
    },
    {
      id: 'enterprise',
      nameEn: 'Enterprise Fleet',
      nameAr: 'باقة المؤسسات الكبرى',
      subEn: 'For large operations & fleets',
      subAr: 'للشركات القابضة والأساطيل الكبيرة',
      priceCustomEn: 'Custom',
      priceCustomAr: 'حسب الطلب',
      periodEn: '',
      periodAr: '',
      featuresEn: [
        'Unlimited vehicles & users',
        'Advanced analytics & AI insights',
        'Custom ERP & Telematics API integrations',
        'Dedicated corporate account manager',
        'SLA & 24/7 dedicated support',
        'On-site team training (optional)',
      ],
      featuresAr: [
        'عدد غير محدود من المركبات والمستخدمين',
        'تحليلات متقدمة وتوصيات الذكاء الاصطناعي',
        'ربط برمجي كامل API مع أنظمة الشركة',
        'مدير حساب مؤسسي مخصص',
        'اتفاقية مستوى الخدمة SLA ودعم 24/7',
        'تدريب ميداني لفريق العمل (اختياري)',
      ],
      popular: false,
      ctaEn: 'Contact Corporate Sales',
      ctaAr: 'تواصل مع مبيعات الشركات',
    },
  ];

  const compareFeatures = [
    {
      nameEn: 'Number of Vehicles',
      nameAr: 'عدد المركبات المسموح بها',
      free: '1',
      pro: 'Up to 5 / حتى 5',
      biz: 'Up to 25 / حتى 25',
      ent: 'Unlimited / غير محدود',
    },
    {
      nameEn: 'Service Reminders & Inspection Alert',
      nameAr: 'تنبيهات الصيانة الدورية والفحص',
      free: true,
      pro: true,
      biz: true,
      ent: true,
    },
    {
      nameEn: 'Real-time DVI Service Tracking',
      nameAr: 'تتبع الصيانة المباشر DVI بالصور',
      free: false,
      pro: true,
      biz: true,
      ent: true,
    },
    {
      nameEn: 'Cost Estimates & Quote Comparison',
      nameAr: 'مقارنة عروض الأسعار والتكاليف',
      free: false,
      pro: true,
      biz: true,
      ent: true,
    },
    {
      nameEn: 'Fleet Overview Dashboard',
      nameAr: 'لوحة تحكم الأسطول المركزية',
      free: false,
      pro: false,
      biz: true,
      ent: true,
    },
    {
      nameEn: 'Multi-user Team Access & Roles',
      nameAr: 'صلاحيات متعددة للفريق والسائقين',
      free: false,
      pro: false,
      biz: true,
      ent: true,
    },
    {
      nameEn: 'Advanced Reports & AI Analytics',
      nameAr: 'تقارير مالية متقدمة وتوقعات AI',
      free: false,
      pro: false,
      biz: false,
      ent: true,
    },
    {
      nameEn: 'API Access & Telematics Integration',
      nameAr: 'ربط برمجي API مع أنظمة GPS وERP',
      free: false,
      pro: false,
      biz: false,
      ent: true,
    },
    {
      nameEn: 'Dedicated Account Manager',
      nameAr: 'مدير حساب مؤسسي مخصص',
      free: false,
      pro: false,
      biz: false,
      ent: true,
    },
    {
      nameEn: 'Priority Support Channel',
      nameAr: 'مستوى الدعم الفني',
      free: 'Email / بريد',
      pro: 'Priority Email / بريد مميز',
      biz: 'Phone & Email / هاتف وبريد',
      ent: '24/7 Dedicated / دعم مخصص 24/7',
    },
  ];

  const valueProps = [
    {
      titleEn: 'Trusted & Secure',
      titleAr: 'أمان وموثوقية معتمدة',
      descEn: 'Enterprise-grade security and strict data privacy.',
      descAr: 'حماية بيانات مشفرة بأعلى معايير الأمان والخصوصية.',
      icon: ShieldCheck,
    },
    {
      titleEn: 'Save Time & Money',
      titleAr: 'توفير الوقت والمال',
      descEn: 'Smart tools and reminders that cut repair costs.',
      descAr: 'أدوات ذكية وتنبيهات تقلل تكاليف الصيانة بنسبة تصل إلى 20%.',
      icon: Clock,
    },
    {
      titleEn: 'All-in-One Platform',
      titleAr: 'منصة متكاملة وشاملة',
      descEn: 'Everything in one place—bookings, tracking, invoices.',
      descAr: 'كل ما تحتاجه في مكان واحد: حجز، فحص، فواتير، وضمانات.',
      icon: Building2,
    },
    {
      titleEn: '24/7 Support',
      titleAr: 'دعم فني 24/7',
      descEn: 'Our automotive experts are always here when you need.',
      descAr: 'فريق من الخبراء جاهز لمساعدتك في أي وقت على مدار الساعة.',
      icon: Users,
    },
    {
      titleEn: 'Mobile First',
      titleAr: 'تطبيق هاتف مرن وسلس',
      descEn: 'Manage your vehicles on the go with complete ease.',
      descAr: 'أدر مركباتك واستعرض فواتيرك من هاتفك بكل سهولة وسرعة.',
      icon: Smartphone,
    },
    {
      titleEn: 'Data-Driven Insights',
      titleAr: 'تحليلات مبنية على البيانات',
      descEn: 'Real-time analytics and predictive maintenance.',
      descAr: 'تقارير فورية وصيانة استباقية تحافظ على قيمة سيارتك.',
      icon: TrendingUp,
    },
  ];

  const faqs = [
    {
      qEn: 'Can I change my plan anytime?',
      qAr: 'هل يمكنني ترقية أو تغيير باقتي في أي وقت؟',
      aEn: 'Yes, you can upgrade, downgrade or cancel your subscription at any time with no lock-in contract.',
      aAr: 'نعم بكل تأكيد! يمكنك الترقية أو التبديل بين الباقات أو الإلغاء في أي وقت دون أي عقود إلزامية أو رسوم خفية.',
    },
    {
      qEn: 'Is there a free trial for paid plans?',
      qAr: 'هل يتوفر تجربة مجانية للباقات المدفوعة؟',
      aEn: 'Yes, we offer a 14-day free trial on the Pro and Business plans with full access to all features.',
      aAr: 'نعم! نوفر فترة تجربة مجانية لمدة 14 يوماً لباقة برو وباقة الأعمال مع إمكانية الوصول الكامل لكافة المميزات.',
    },
    {
      qEn: 'How many vehicles can I add?',
      qAr: 'كم عدد المركبات التي يمكنني إضافتها لحسابي؟',
      aEn: 'The Free plan supports 1 vehicle, Pro supports up to 5, Business up to 25, and Enterprise supports unlimited vehicles.',
      aAr: 'الباقة المجانية تتيح مركبة واحدة، باقة برو حتى 5 مركبات، باقة الأعمال حتى 25 مركبة، وباقة المؤسسات بعدد غير محدود.',
    },
    {
      qEn: 'What payment methods do you accept?',
      qAr: 'ما هي طرق الدفع المتاحة للاشتراك؟',
      aEn: 'We accept Visa, Mastercard, Apple Pay, Tabby, Tamara, Jawwal Pay, and local bank transfers for corporate accounts.',
      aAr: 'نقبل بطاقات فيزا، ماستركارد، آبل باي، جوال باي، وتسهيلات الدفع للشركات عبر التحويل البنكي والفواتير الضريبية.',
    },
    {
      qEn: 'Is my data safe with AHL AL MARKABAT?',
      qAr: 'هل بياناتي وسجلات سيارتي بأمان وخصوصية؟',
      aEn: 'Yes! All your vehicle history and data are encrypted and stored in compliance with local data protection regulations.',
      aAr: 'بياناتك مشفرة ومحفوظة وفق أعلى معايير الخصوصية والأمان الرقمي ولن يتم مشاركتها أبداً مع أي طرف غير مصرح له.',
    },
    {
      qEn: 'Do you offer refunds?',
      qAr: 'هل تقدمون ضمان استرداد الأموال؟',
      aEn: 'We provide a 30-day money-back guarantee if you are not completely satisfied with your subscription.',
      aAr: 'نقدم ضمان استرداد الأموال بنسبة 100% خلال أول 30 يوماً في حال عدم رضاك التام عن المنصة.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-16">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#09152B] text-white py-16 px-4 sm:px-8 lg:px-12 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs text-amber-400 font-black uppercase tracking-wider block">
            {language === 'ar' ? 'بسيطة. شفافة. مرنة.' : 'SIMPLE. TRANSPARENT. FLEXIBLE.'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {language === 'ar' ? 'خطط وأسعار الاشتراك' : 'Pricing & Plans'} <br />
            <span className="text-amber-400">{language === 'ar' ? 'تناسب الجميع' : 'For Everyone.'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'اختر الخطة المثالية لإدارة سيارتك الشخصية، تنمية ورشة صيانة مركباتك، أو إدارة أسطول شركتك بذكاء.'
              : 'Choose the perfect plan to manage your vehicle, grow your business, or run your fleet smarter.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-300 font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {language === 'ar' ? 'بدون أي رسوم خفية' : 'No Hidden Fees'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              {language === 'ar' ? 'إلغاء في أي وقت' : 'Cancel Anytime'}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-blue-400" />
              {language === 'ar' ? 'دعم فني على مدار 24/7' : '24/7 Support'}
            </span>
          </div>

          {/* 3 Segment Toggle Pills */}
          <div className="inline-flex flex-wrap items-center justify-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700 shadow-xl mt-4 gap-1">
            <button
              onClick={() => setActiveSegment('individuals')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSegment === 'individuals'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'للأفراد (إدارة مركبتك)' : 'For Individuals (Manage your car)'}
            </button>
            <button
              onClick={() => setActiveSegment('providers')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSegment === 'providers'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'لمراكز الصيانة (تنمية أعمالك)' : 'For Providers (Grow your business)'}
            </button>
            <button
              onClick={() => setActiveSegment('businesses')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSegment === 'businesses'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {language === 'ar' ? 'للشركات (إدارة الأساطيل)' : 'For Businesses (Fleet management)'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 Pricing Cards */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {individualPlans.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-6 bg-white border flex flex-col justify-between space-y-6 transition-all ${
                p.popular
                  ? 'border-amber-400 shadow-xl ring-2 ring-amber-400/20 relative'
                  : 'border-slate-200 shadow-2xs'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 start-6 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                  {language === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <strong className="text-lg font-black text-slate-900 block">
                    {language === 'ar' ? p.nameAr : p.nameEn}
                  </strong>
                  <span className="text-[11px] text-slate-500 font-medium">
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
                      {' '}{language === 'ar' ? p.periodAr : p.periodEn}
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
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
                      ? `تم اختيار ${p.nameAr}! جاري تفعيل الاشتراك...`
                      : `Selected ${p.nameEn}! Activating plan...`,
                    'success'
                  );
                }}
                className={`w-full py-2.5 rounded-xl font-black text-xs transition-all ${
                  p.popular
                    ? 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {language === 'ar' ? p.ctaAr : p.ctaEn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Detailed Comparison Matrix */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'مقارنة مميزات الباقات بالتفصيل' : 'Compare Plans'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'جدول تفصيلي يوضح الفروقات والمميزات المتاحة في كل مستوى اشتراك.'
              : 'Detailed breakdown of features across all tiers.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="bg-[#09152B] text-white font-bold text-[11px]">
                  <th className="py-4 px-6 text-start">
                    {language === 'ar' ? 'الميزة / الخاصية' : 'Compare Plans'}
                  </th>
                  <th className="py-4 px-6 text-center">
                    {language === 'ar' ? 'المجانية' : 'Free'}
                  </th>
                  <th className="py-4 px-6 text-center text-amber-400">
                    {language === 'ar' ? 'برو (Pro)' : 'Pro'}
                  </th>
                  <th className="py-4 px-6 text-center">
                    {language === 'ar' ? 'الأعمال' : 'Business'}
                  </th>
                  <th className="py-4 px-6 text-center">
                    {language === 'ar' ? 'المؤسسات' : 'Enterprise'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {compareFeatures.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-6 font-bold text-slate-900">
                      {language === 'ar' ? row.nameAr : row.nameEn}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '—'
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="py-3 px-6 text-center font-bold text-slate-900">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '—'
                      ) : (
                        row.pro
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {typeof row.biz === 'boolean' ? (
                        row.biz ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '—'
                      ) : (
                        row.biz
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {typeof row.ent === 'boolean' ? (
                        row.ent ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : '—'
                      ) : (
                        row.ent
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Why Choose AHL AL MARKABAT? */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center">
            {language === 'ar' ? 'لماذا يختار الآلاف منصة أهل المركبات؟' : 'Why Choose AHL AL MARKABAT?'}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {valueProps.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <strong className="text-xs font-black text-slate-900 block">
                    {language === 'ar' ? w.titleAr : w.titleEn}
                  </strong>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {language === 'ar' ? w.descAr : w.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. FAQs Accordion */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h3 className="text-lg font-black text-slate-900 text-center">
          {language === 'ar' ? 'الأسئلة الأكثر شيوعاً حول الاشتراكات' : 'Frequently Asked Questions'}
        </h3>
        <div className="space-y-2 max-w-4xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-start font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="p-4 bg-slate-50 text-xs text-slate-600 border-t border-slate-100 leading-relaxed font-medium">
                  {language === 'ar' ? faq.aAr : faq.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
