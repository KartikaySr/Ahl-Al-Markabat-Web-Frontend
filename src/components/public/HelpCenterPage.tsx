import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  BookOpen,
  Phone,
  MessageCircle,
  Mail,
  ShieldCheck,
  CreditCard,
  User,
  Wrench,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  FileText,
  Lock,
  Headphones,
  CheckCircle2,
} from 'lucide-react';

export const HelpCenterPage: React.FC = () => {
  const { language, setActiveTab, showToast, selectedCountry } = useApp();
  const [searchTopic, setSearchTopic] = useState('');
  const [activeFaqTab, setActiveFaqTab] = useState<'customer' | 'provider'>('customer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const customerTopics = [
    { titleEn: 'Bookings & Appointments', titleAr: 'الحجوزات والمواعيد' },
    { titleEn: 'My Account & Garage', titleAr: 'حسابي وكراج سياراتي' },
    { titleEn: 'Services & Pricing', titleAr: 'الخدمات والأسعار' },
    { titleEn: 'Cancellations & Refunds', titleAr: 'الإلغاء واسترداد الأموال' },
    { titleEn: 'Payments & Invoices', titleAr: 'المدفوعات والفواتير' },
    { titleEn: 'General Inquiries', titleAr: 'استفسارات عامة' },
  ];

  const providerTopics = [
    { titleEn: 'Provider Onboarding', titleAr: 'التسجيل وتوثيق الورشة' },
    { titleEn: 'Business Tools & SaaS', titleAr: 'أدوات الإدارة والتقارير' },
    { titleEn: 'Bookings & Work Orders', titleAr: 'أوامر العمل والحجوزات' },
    { titleEn: 'Policies & Compliance', titleAr: 'السياسات ومعايير الجودة' },
    { titleEn: 'Payouts & Bank Details', titleAr: 'المستحقات والحسابات البنكية' },
    { titleEn: 'Technical Support', titleAr: 'الدعم الفني للورش' },
  ];

  const customerFaqs = [
    {
      qEn: 'How do I book a service?',
      qAr: 'كيف أقوم بحجز موعد صيانة لسيارتي؟',
      aEn: 'Choose your vehicle from your garage, select the required automotive service, compare verified workshops, and choose a suitable date and time for booking.',
      aAr: 'اختر سيارتك المضافة، حدد الخدمة المطلوبة (غيار زيت، فرامل، فحص كمبيوتر...)، اختر الورشة المعتمدة الأنسب لك، ثم حدد الموعد المناسب لتأكيد الحجز الفوري.',
    },
    {
      qEn: 'How can I reschedule or cancel my booking?',
      qAr: 'كيف يمكنني تعديل موعد الحجز أو إلغاؤه؟',
      aEn: 'Go to My Bookings in your customer portal or click Track Booking in your confirmation to reschedule free of charge up to 2 hours prior.',
      aAr: 'يمكنك الدخول إلى قسم "حجوزاتي" في حسابك وتعديل الموعد أو إلغاء الحجز مجاناً وبكل سهولة حتى ساعتين قبل الموعد المحدد.',
    },
    {
      qEn: 'What payment methods do you accept?',
      qAr: 'ما هي طرق الدفع المتاحة؟',
      aEn: 'We accept Visa, Mastercard, Apple Pay, Tabby, Tamara, Jawwal Pay, and cash or card directly at the workshop upon job completion.',
      aAr: 'نقبل بطاقات فيزا، ماستركارد، آبل باي، جوال باي، الدفع الآجل (تابي/تمارا)، وكذلك الدفع نقداً أو بالبطاقة لدى الورشة بعد استلام السيارة.',
    },
    {
      qEn: 'Is there a minimum charge for a service?',
      qAr: 'هل يوجد حد أدنى لرسوم الحجز؟',
      aEn: 'No minimum booking charges. You only pay the transparent price for the verified service selected.',
      aAr: 'لا توجد أي رسوم حجز خفية أو حد أدنى إلزامي، تدفع فقط القيمة الشفافة المعتمدة للخدمة أو قطع الغيار التي اخترتها.',
    },
    {
      qEn: 'How long does a service usually take?',
      qAr: 'كم من الوقت تستغرق عملية الصيانة عادةً؟',
      aEn: 'Basic maintenance takes 30-90 minutes, while major repairs and overhauls may take 1-3 business days depending on parts availability.',
      aAr: 'تستغرق الصيانة الدورية السريعة من 30 إلى 90 دقيقة، بينما قد تتطلب الإصلاحات الكبرى وفحص المحرك من يوم إلى 3 أيام مع إشعارك أولاً بأول.',
    },
  ];

  const providerFaqs = [
    {
      qEn: 'How do I register as a service provider?',
      qAr: 'كيف أسجل ورشتي كشريك ومزود خدمة معتمد؟',
      aEn: 'Click Become a Provider, submit your trade license, and our verification team will approve your portal within 24 hours.',
      aAr: 'اضغط على "انضم كمزود خدمة"، املأ بيانات الورشة وأرفق الرخصة التجارية، وسيقوم فريق التوثيق بتفعيل حسابك خلال 24 ساعة.',
    },
    {
      qEn: 'How do I receive bookings and job assignments?',
      qAr: 'كيف تصلني طلبات الصيانة وحجوزات العملاء؟',
      aEn: 'Incoming jobs appear instantly in your Provider Dashboard with customer details, vehicle history, and symptom notes.',
      aAr: 'تصلك الإشعارات والحجوزات فوراً على لوحة تحكم الورشة وتطبيق الهاتف مع كامل تفاصيل السيارة وتاريخ صيانتها السابقة.',
    },
    {
      qEn: 'When and how do I get paid?',
      qAr: 'متى وكيف استلم مستحقاتي المالية؟',
      aEn: 'Direct bank payouts are processed weekly or on-demand directly through your Earnings tab.',
      aAr: 'يتم تحويل الأرباح والمستحقات أسبوعياً إلى حسابك البنكي مباشرة أو عبر التحويل الفوري عند الطلب.',
    },
    {
      qEn: 'What are the service quality requirements?',
      qAr: 'ما هي معايير الجودة المطلوبة من الورش؟',
      aEn: 'Providers must maintain a minimum 4.5 star rating, provide warranty on work, and use OEM or certified spare parts.',
      aAr: 'يشترط الحفاظ على تقييم لا يقل عن 4.5 نجوم، تقديم ضمان رسمي على الإصلاحات، واستخدام قطع غيار أصلية أو معتمدة.',
    },
    {
      qEn: 'Where can I find marketing resources?',
      qAr: 'كيف استفيد من الحملات التسويقية للمنصة؟',
      aEn: 'Access ready-made campaign templates and promotions directly in your Marketing & Promotions tab.',
      aAr: 'توفر المنصة عروضاً ترويجية وظهوراً مميزاً لورشتك في نتائج البحث لجذب المزيد من الزبائن في منطقتك.',
    },
  ];

  const popularTags = [
    { en: 'Booking', ar: 'حجز موعد' },
    { en: 'Payments', ar: 'المدفوعات' },
    { en: 'Cancellations', ar: 'إلغاء الحجز' },
    { en: 'Providers', ar: 'الورش المعتمدة' },
    { en: 'Services', ar: 'باقات الصيانة' },
    { en: 'Fleet Solutions', ar: 'حلول الأساطيل' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-16">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#09152B] text-white py-16 px-4 sm:px-8 lg:px-12 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs text-amber-400 font-black uppercase tracking-wider block">
            {language === 'ar' ? 'مركز المساعدة والدعم الفني' : 'HELP CENTER / FAQ'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {language === 'ar' ? 'نحن هنا لمساعدتك' : "We're Here to Help"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {language === 'ar'
              ? 'ابحث عن إجابات لاستفساراتك، واحصل على الدعم المباشر، وتعرف على كيفية الاستفادة القصوى من أهل المركبات.'
              : 'Find answers, get support, and learn how to make the most of AHL AL MARKABAT.'}
          </p>

          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'كيف يمكننا مساعدتك اليوم؟ ابحث عن موضوع أو كلمة دلالية...'
                  : 'How can we help you today? Search topics or keywords...'
              }
              className="w-full py-3.5 ps-11 pe-24 bg-white rounded-2xl text-slate-900 text-xs font-bold shadow-2xl outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-4 top-1/2 -translate-y-1/2" />
            <button
              onClick={() => {
                if (searchTopic.trim()) {
                  showToast(
                    language === 'ar'
                      ? `جاري البحث عن "${searchTopic}"...`
                      : `Searching for "${searchTopic}"...`,
                    'info'
                  );
                }
              }}
              className="absolute end-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all"
            >
              {language === 'ar' ? 'بحث' : 'Search'}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 font-medium">
            <span>{language === 'ar' ? 'عمليات البحث الشائعة:' : 'Popular Searches:'}</span>
            {popularTags.map((tag) => (
              <button
                key={tag.en}
                onClick={() => setSearchTopic(language === 'ar' ? tag.ar : tag.en)}
                className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold transition-all"
              >
                {language === 'ar' ? tag.ar : tag.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Browse Help by Topic (Customer & Provider Cards) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For Customers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-base font-black text-slate-900 block">
                  {language === 'ar' ? 'دليل أصحاب المركبات (العملاء)' : 'For Customers'}
                </strong>
                <span className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'المساعدة في الحجوزات، باقات الصيانة، الفواتير، وحساب كراجك.'
                    : 'Get help with bookings, services, payments, and your account.'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 pt-2">
              {customerTopics.map((topic, i) => (
                <div key={i} className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                  <span className="text-blue-600 font-bold">›</span>
                  <span>{language === 'ar' ? topic.titleAr : topic.titleEn}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80"
            alt="Customer Car Care"
            className="w-full h-36 rounded-2xl object-cover mt-3"
          />
        </div>

        {/* For Providers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-base font-black text-slate-900 block">
                  {language === 'ar' ? 'دليل مراكز الصيانة والورش' : 'For Providers'}
                </strong>
                <span className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'الموارد والأدوات الرقمية والدعم المخصص لشركاء الصيانة والورش.'
                    : 'Resources and support for service providers and workshop partners.'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 pt-2">
              {providerTopics.map((topic, i) => (
                <div key={i} className="flex items-center gap-1 hover:text-amber-600 cursor-pointer">
                  <span className="text-amber-600 font-bold">›</span>
                  <span>{language === 'ar' ? topic.titleAr : topic.titleEn}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=400&auto=format&fit=crop&q=80"
            alt="Workshop Garage Care"
            className="w-full h-36 rounded-2xl object-cover mt-3"
          />
        </div>
      </div>

      {/* 3. Top Questions Accordions */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900">
            {language === 'ar' ? 'الأسئلة الأكثر تداولاً' : 'Top Questions'}
          </h2>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveFaqTab('customer')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFaqTab === 'customer'
                  ? 'bg-blue-600 text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'ar' ? 'للعملاء وأصحاب السيارات' : 'For Customers'}
            </button>
            <button
              onClick={() => setActiveFaqTab('provider')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFaqTab === 'provider'
                  ? 'bg-blue-600 text-white shadow-2xs font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'ar' ? 'لمراكز الصيانة والورش' : 'For Providers'}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {(activeFaqTab === 'customer' ? customerFaqs : providerFaqs).map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-start font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                />
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

      {/* 4. Get Support Channels */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h2 className="text-xl font-black text-slate-900">
          {language === 'ar' ? 'قنوات التواصل والدعم الفني المباشر' : 'Get Support'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <Phone className="w-6 h-6 text-blue-600" />
            <strong className="text-xs font-black text-slate-900 block">
              {language === 'ar' ? 'الاتصال الهاتفي' : 'Phone Support'}
            </strong>
            <span className="text-[11px] text-slate-500 block font-mono font-bold">+970 59 123 4567</span>
            <span className="text-[9px] text-emerald-600 font-bold block">
              {language === 'ar' ? '● متاح 24/7' : '● Available 24/7'}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
            <strong className="text-xs font-black text-slate-900 block">
              {language === 'ar' ? 'محادثة واتساب' : 'WhatsApp Support'}
            </strong>
            <span className="text-[11px] text-slate-500 block font-mono font-bold">+970 59 123 4567</span>
            <span className="text-[9px] text-emerald-600 font-bold block">
              {language === 'ar' ? '● استجابة فورية 24/7' : '● Available 24/7'}
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <HelpCircle className="w-6 h-6 text-purple-600" />
            <strong className="text-xs font-black text-slate-900 block">
              {language === 'ar' ? 'المحادثة الحية المباشرة' : 'Live Chat'}
            </strong>
            <span className="text-[11px] text-slate-500 block">
              {language === 'ar' ? 'تحدث مباشرة مع أخصائي الدعم' : 'Instant chat with support specialists'}
            </span>
            <button
              onClick={() =>
                showToast(
                  language === 'ar'
                    ? 'جاري بدء المحادثة مع أخصائي الدعم الفني...'
                    : 'Starting live chat with a support specialist...',
                  'info'
                )
              }
              className="px-3 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10px] font-bold rounded-lg mt-1 transition-all"
            >
              {language === 'ar' ? 'بدء المحادثة' : 'Start Chat'}
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-2">
            <Mail className="w-6 h-6 text-amber-500" />
            <strong className="text-xs font-black text-slate-900 block">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email Support'}
            </strong>
            <span className="text-[11px] text-slate-500 block font-mono">support@ahlalmarkabat.com</span>
            <span className="text-[9px] text-slate-400 block font-medium">
              {language === 'ar' ? 'الرد خلال ساعتين كحد أقصى' : 'We reply within 2 hours'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
