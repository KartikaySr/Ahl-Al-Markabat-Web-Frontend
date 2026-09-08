import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Zap,
  TrendingUp,
  ShieldCheck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Calendar,
  DollarSign,
  Star,
  Clock,
  Phone,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const BecomeProviderPage: React.FC = () => {
  const { language, setActiveTab, showToast, selectedCountry, registerUser } = useApp();
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Ramallah');
  const [serviceType, setServiceType] = useState('mechanics');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const reasons = [
    {
      titleEn: 'More Bookings',
      titleAr: 'زيادة حجوزات العملاء',
      descEn: 'Get discovered by thousands of car owners searching for trusted services every day.',
      descAr: 'احصل على تدفق مستمر من العملاء الجدد وأصحاب المركبات في منطقتك يومياً.',
      icon: Calendar,
    },
    {
      titleEn: 'Grow Revenue',
      titleAr: 'مضاعفة الإيرادات والأرباح',
      descEn: 'Increase sales, minimize idle workshop bays, and maximize your garage potential.',
      descAr: 'استغل كافة مسارات ورافعات الورشة بكفاءة تشغيلية كاملة وأرباح أعلى.',
      icon: TrendingUp,
    },
    {
      titleEn: 'Trusted Platform',
      titleAr: 'منصة موثوقة ومضمونة',
      descEn: 'Verified provider status, guaranteed payouts, and transparent customer relations.',
      descAr: 'شارة الاعتماد الرسمي، تسويات مالية دورية مضمونة، وحماية كاملة لحقوق الورشة.',
      icon: ShieldCheck,
    },
    {
      titleEn: 'Build Reputation',
      titleAr: 'بناء سمعة رقمية قوية',
      descEn: 'Collect verified reviews, showcase ratings, and attract high-value clients.',
      descAr: 'اجمع تقييمات حقيقية من عملائك واجعل ورشتك الخيار الأول في منطقتك.',
      icon: Star,
    },
    {
      titleEn: 'Smart Digital Tools',
      titleAr: 'أدوات رقمية متكاملة',
      descEn: 'Manage bookings, send digital DVI inspection reports, and issue tax invoices easily.',
      descAr: 'لوحة تحكم لإدارة الحجوزات، تقارير الفحص DVI بالصور، وإصدار الفواتير بضغطة زر.',
      icon: Wrench,
    },
    {
      titleEn: '24/7 Provider Support',
      titleAr: 'دعم فني واستشاري 24/7',
      descEn: 'Our dedicated partner success team is always ready to support your workshop.',
      descAr: 'فريق دعم متخصص لخدمة الورش ومساعدتك على تطوير خدماتك وزيادة دخلك.',
      icon: Phone,
    },
  ];

  const whoCanJoin = [
    {
      titleEn: 'Mechanics & Garages',
      titleAr: 'كراجات وميكانيك عام',
      descEn: 'Engine repair, periodic maintenance, suspension, and brake service.',
      descAr: 'صيانة المحركات، تبديل الزيوت، فحمات الفرامل، وصيانة العفشة.',
      img: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=400&auto=format&fit=crop&q=80',
    },
    {
      titleEn: 'Electrical & Diagnostics',
      titleAr: 'كهرباء وفحص كمبيوتر',
      descEn: 'Computer diagnostics (OBD), wiring, ECU programming & batteries.',
      descAr: 'فحص كمبيوتر الأعطال، برمجة الحساسات، بطاريات، والضفائر الكهربائية.',
      img: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&auto=format&fit=crop&q=80',
    },
    {
      titleEn: 'AC & Cooling Specialists',
      titleAr: 'تكييف ورادياتير',
      descEn: 'Compressor repair, refrigerant gas refill, and cooling system maintenance.',
      descAr: 'تعبئة غاز فريون أصلي، تصليح الكمبروسر، وتنظيف دورة التبريد.',
      img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&auto=format&fit=crop&q=80',
    },
    {
      titleEn: 'Towing & Recovery',
      titleAr: 'ونش وسطحات إنقاذ 24/7',
      descEn: 'Flatbed towing, roadside emergency assistance, and battery jumpstarts.',
      descAr: 'سحب ونقل المركبات المعطلة، اشتراك بطارية، وخدمات الطوارئ.',
      img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    },
    {
      titleEn: 'Auto Spare Parts Sellers',
      titleAr: 'محلات وموزعي قطع الغيار',
      descEn: 'OEM genuine parts, certified aftermarket, batteries, and accessories.',
      descAr: 'بيع القطع الأصلية والتجارية، الإطارات، الزيوت، والإكسسوارات.',
      img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop&q=80',
    },
    {
      titleEn: 'Fleet Service Centers',
      titleAr: 'مراكز صيانة الأساطيل',
      descEn: 'Commercial vehicles, trucks, corporate fleets & heavy equipment.',
      descAr: 'صيانة دورية للمركبات التجارية، الشاحنات، وسيارات الشركات.',
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      qEn: 'How do I become a provider?',
      qAr: 'كيف أنضم كشريك أو مزود خدمة في المنصة؟',
      aEn: 'Fill out the application form below. Our onboarding team will verify your business documents within 24 hours.',
      aAr: 'قم بتعبئة نموذج الانضمام أدناه بمعلومات ورشتك، وسيقوم فريق التوثيق لدينا بمراجعة الأوراق والتواصل معك خلال 24 ساعة.',
    },
    {
      qEn: 'Is there any registration fee?',
      qAr: 'هل توجد أي رسوم تسجيل أو اشتراك مبدئي؟',
      aEn: 'Joining AHL AL MARKABAT is 100% free with no setup fees or long-term contracts.',
      aAr: 'التسجيل في منصة أهل المركبات مجاني بالكامل 100% وبدون أي رسوم تأسيس أو عقود ملزمة.',
    },
    {
      qEn: 'How do I get paid for my services?',
      qAr: 'كيف استلم مستحقاتي المالية عن الخدمات المنجزة؟',
      aEn: 'Payouts are deposited directly to your bank account weekly or on-demand via your Provider Portal.',
      aAr: 'يتم تحويل الأرباح مباشرة إلى حسابك البنكي أسبوعياً أو عند الطلب عبر لوحة تحكم مزود الخدمة المالية.',
    },
    {
      qEn: 'Can I manage bookings from my phone?',
      qAr: 'هل يمكنني إدارة الحجوزات وفواتير الورشة من الهاتف؟',
      aEn: 'Yes! Our mobile-responsive Provider Portal allows you to accept jobs, upload inspection photos, and chat with customers anywhere.',
      aAr: 'نعم! لوحة تحكم مزود الخدمة متوافقة تماماً مع الهواتف الذكية وتتيح لك قبول الطلبات وإرسال تقارير الفحص والتواصل مع العملاء بسهولة.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser('provider', {
      workshopName: businessName.trim() || 'AutoTech Premier Garage',
      fullName: fullName.trim() || 'مدير المركز',
      phone: phone || '+970 59 999 8888',
      email: email || 'workshop@example.ps',
      city,
    });
    setFullName('');
    setBusinessName('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-16">
      {/* 1. Hero Section */}
      <div className="bg-[#09152B] text-white py-16 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-xs text-amber-400 font-black uppercase tracking-wider block">
              {language === 'ar' ? 'انضم لشبكة الورش المعتمدة' : 'GROW YOUR BUSINESS'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {language === 'ar' ? 'نمِّ أعمال ورشتك.' : 'Grow Your Business.'} <br />
              {language === 'ar' ? 'اخدم عملاء أكثر. حقق دخلاً أعلى.' : 'Serve More. Earn More.'} <br />
              <span className="text-amber-400">
                {language === 'ar' ? 'انضم كمزود خدمة معتمد في أهل المركبات' : 'Become a Provider with AHL AL MARKABAT'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'انضم لآلاف الورش ومراكز الصيانة المعتمدة في فلسطين والإمارات. احصل على حجوزات يومية، وابنِ سمعتك الرقمية، وضاعف أرباحك مع المنصة الأولى لخدمات السيارات.'
                : "Join thousands of trusted workshops, garages, and service experts across Palestine. Get more bookings, grow your reputation, and build long-term success with Palestine's #1 automotive platform."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('provider-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all"
              >
                {language === 'ar' ? 'سجّل ورشتك الآن مجاناً' : 'Join as a Provider'}
              </button>
              <button
                onClick={() => setActiveTab('workshop')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all"
              >
                {language === 'ar' ? 'استعراض بوابة الورش' : 'Explore Provider Portal'}
              </button>
            </div>
          </div>

          {/* Right Trust Card */}
          <div className="lg:col-span-4 bg-slate-900/80 rounded-3xl p-6 border border-slate-700 space-y-4">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider">
              {language === 'ar' ? 'موثوق من أصحاب الورش والمراكز' : 'TRUSTED BY PROVIDERS ACROSS PALESTINE'}
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  1.2K+
                </div>
                <div>
                  <strong className="text-white block">
                    {language === 'ar' ? '1,250+ ورشة ومركز معتمد' : '1,250+ Verified Providers'}
                  </strong>
                  <span className="text-[10px] text-slate-400">
                    {language === 'ar' ? 'كراجات ومراكز صيانة نشطة' : 'Active workshops'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  12K+
                </div>
                <div>
                  <strong className="text-white block">
                    {language === 'ar' ? '12,482+ عميل نشط شهرياً' : '12,482+ Satisfied Customers'}
                  </strong>
                  <span className="text-[10px] text-slate-400">
                    {language === 'ar' ? 'أصحاب مركبات يبحثون عن خدماتك' : 'Monthly car owners'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  4.9★
                </div>
                <div>
                  <strong className="text-white block">
                    {language === 'ar' ? '4.9 ★ متوسط تقييم الثقة' : '4.9 Average Rating'}
                  </strong>
                  <span className="text-[10px] text-slate-400">
                    {language === 'ar' ? 'مؤشر موثوقية وجودة عالي' : 'High trust factor'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Why Providers Choose AHL AL MARKABAT? */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'لماذا تنضم لمنصة أهل المركبات؟' : 'Why Providers Choose AHL AL MARKABAT?'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'كل ما تحتاجه لتوسيع نطاق أعمال ورشتك وزيادة أرباحك وإدارة حجوزاتك بسهولة.'
              : 'Everything you need to scale your automotive business effortlessly.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <strong className="text-sm font-black text-slate-900 block">
                  {language === 'ar' ? r.titleAr : r.titleEn}
                </strong>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {language === 'ar' ? r.descAr : r.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Who Can Join? */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'من يمكنه الانضمام إلينا؟' : 'Who Can Join?'}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'نرحب بكافة المراكز المتخصصة والفنيين المعتمدين في جميع قطاعات خدمات المركبات.'
              : 'We welcome certified specialists across all vehicle service disciplines.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whoCanJoin.map((w, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex items-center gap-4">
              <img
                src={w.img}
                alt={w.titleEn}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-0.5">
                <strong className="text-xs font-black text-slate-900 block">
                  {language === 'ar' ? w.titleAr : w.titleEn}
                </strong>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'ar' ? w.descAr : w.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quality Standards & Application Form */}
      <div id="provider-form" className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: We Keep Quality High */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            {language === 'ar' ? 'نحافظ على أعلى معايير الجودة' : 'We Keep Quality High'}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            {language === 'ar'
              ? 'يخضع كل مزود خدمة لعملية تدقيق وتوثيق صارمة لضمان تقديم أفضل تجربة صيانة وسلامة للعملاء.'
              : 'Every provider goes through a strict verification process to ensure the best experience for our customers.'}
          </p>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'ar' ? 'التحقق من السجل التجاري والترخيص المهني' : 'Business License Verification'}</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'ar' ? 'إثبات الهوية والملكية القانونية للمركز' : 'ID & Ownership Verification'}</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'ar' ? 'معاينة ميدانية لجاهزية معدات وأجهزة الورشة' : 'Workshop Inspection'}</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'ar' ? 'الالتزام بمعايير الضمان وجودة قطع الغيار' : 'Service Quality Check'}</span>
            </div>
          </div>
        </div>

        {/* Right: Join AHL AL MARKABAT Today Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-base font-black text-slate-900">
            {language === 'ar' ? 'طلب انضمام ورشة أو مركز صيانة' : 'Join AHL AL MARKABAT Today'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'املأ النموذج أدناه وسيقوم فريق علاقات الورش بالتواصل معك فوراً.'
              : 'Fill out the form and our onboarding team will contact you.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={language === 'ar' ? 'اسم صاحب المنشأة / المسؤول' : 'Full Name'}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
              />
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={language === 'ar' ? 'اسم الورشة / مركز الصيانة' : 'Business / Workshop Name'}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={language === 'ar' ? 'رقم الهاتف (+970 / +971)' : 'Phone Number'}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'ar' ? 'البريد الإلكتروني للعمل' : 'Email Address'}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
              >
                <optgroup label={language === 'ar' ? 'فلسطين' : 'Palestine'}>
                  <option value="Ramallah">{language === 'ar' ? 'رام الله والبيرة' : 'Ramallah'}</option>
                  <option value="Nablus">{language === 'ar' ? 'نابلس' : 'Nablus'}</option>
                  <option value="Hebron">{language === 'ar' ? 'الخليل' : 'Hebron'}</option>
                  <option value="Jerusalem">{language === 'ar' ? 'القدس الشريف' : 'Jerusalem'}</option>
                  <option value="Jenin">{language === 'ar' ? 'جنين' : 'Jenin'}</option>
                  <option value="Bethlehem">{language === 'ar' ? 'بيت لحم' : 'Bethlehem'}</option>
                </optgroup>
                <optgroup label={language === 'ar' ? 'الإمارات' : 'UAE'}>
                  <option value="Dubai">{language === 'ar' ? 'دبي' : 'Dubai'}</option>
                  <option value="AbuDhabi">{language === 'ar' ? 'أبوظبي' : 'Abu Dhabi'}</option>
                  <option value="Sharjah">{language === 'ar' ? 'الشارقة' : 'Sharjah'}</option>
                </optgroup>
              </select>

              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none text-slate-900"
              >
                <option value="mechanics">{language === 'ar' ? 'ميكانيك وصيانة دورية' : 'General Mechanics'}</option>
                <option value="electrical">{language === 'ar' ? 'كهرباء وفحص كمبيوتر' : 'Electrical & Electronics'}</option>
                <option value="ac">{language === 'ar' ? 'تكييف وتبريد المحرك' : 'AC & Cooling'}</option>
                <option value="towing">{language === 'ar' ? 'ونش وسطحة إنقاذ' : 'Towing & Roadside'}</option>
                <option value="tires">{language === 'ar' ? 'إطارات وميزان 3D' : 'Tires & Alignment'}</option>
                <option value="body">{language === 'ar' ? 'سمكرة ودهان حراري' : 'Body & Paint'}</option>
                <option value="parts">{language === 'ar' ? 'تجارة قطع الغيار' : 'Spare Parts'}</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>{language === 'ar' ? 'إرسال طلب الانضمام والتوثيق' : 'Join as a Provider →'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* 5. FAQs Accordion */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h3 className="text-lg font-black text-slate-900 text-center">
          {language === 'ar' ? 'الأسئلة الشائعة لمزودي الخدمات والورش' : 'Frequently Asked Questions'}
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
