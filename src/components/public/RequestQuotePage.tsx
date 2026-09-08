import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  ShieldCheck,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Upload,
  MapPin,
  Wrench,
  Sparkles,
  Zap,
  HelpCircle,
  ChevronDown,
  Star,
  DollarSign,
  Truck,
  Plus,
  X,
} from 'lucide-react';

export const RequestQuotePage: React.FC = () => {
  const { language, formatPrice, setActiveTab, showToast, selectedCountry } = useApp();
  const [selectedService, setSelectedService] = useState('Maintenance');
  const [selectedReceiveType, setSelectedReceiveType] = useState<'workshop' | 'mobile' | 'pickup'>('workshop');
  const [selectedUrgency, setSelectedUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [desc, setDesc] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    { id: 'Maintenance', nameEn: 'Periodic Maintenance', nameAr: 'صيانة دورية وزيوت', icon: Wrench },
    { id: 'Diagnostics', nameEn: 'Computer Diagnostics', nameAr: 'فحص كمبيوتر الأعطال', icon: Zap },
    { id: 'AC Service', nameEn: 'AC & Climate Control', nameAr: 'تكييف وغاز فريون', icon: Sparkles },
    { id: 'Electrical', nameEn: 'Electrical & Battery', nameAr: 'كهرباء وبطاريات', icon: Zap },
    { id: 'Body & Paint', nameEn: 'Body & Paint Repair', nameAr: 'سمكرة ودهان حراري', icon: Car },
    { id: 'Tires & Wheels', nameEn: 'Tires & Alignment', nameAr: 'إطارات وميزان 3D', icon: Car },
    { id: 'Towing', nameEn: 'Towing & Recovery', nameAr: 'ونش وسطحة سحب', icon: Truck },
    { id: 'Spare Parts', nameEn: 'Spare Parts Sourcing', nameAr: 'طلب وتأمين قطع غيار', icon: ShieldCheck },
  ];

  const symptoms = [
    { en: 'Engine warning light (Check Engine)', ar: 'ظهور لمبة فحص المحرك (Check Engine)' },
    { en: 'Strange knocking or squeaking noise', ar: 'صوت طقطقة أو صرير غير طبيعي' },
    { en: 'Poor acceleration / Engine misfire', ar: 'ضعف عزم أو تقطيع في المحرك' },
    { en: 'AC blowing hot air / weak cooling', ar: 'المكيف يخرج هواء حار أو تبريد ضعيف' },
    { en: 'Battery weak / Difficult start', ar: 'ضعف تشغيل البطارية والمارش' },
    { en: 'Brake vibration or spongy pedal', ar: 'اهتزاز الفرامل أو تراجع استجابة الدواسة' },
    { en: 'Oil / Coolant fluid leakage', ar: 'تسريب زيت أو ماء الرادياتير' },
    { en: 'General Inspection before travel', ar: 'فحص شامل قبل السفر أو الشراء' },
  ];

  const topProviders = [
    {
      nameEn: 'German Auto Experts',
      nameAr: 'مركز خبراء السيارات الألمانية',
      rating: 4.9,
      reviews: 126,
      distanceEn: '1.2 km',
      distanceAr: '1.2 كم',
      openEn: 'Open Now',
      openAr: 'مفتوح الآن',
      tagsEn: ['Diagnostics', 'AC Service', 'Engine Repair'],
      tagsAr: ['فحص كمبيوتر', 'تكييف', 'صيانة محركات'],
      priceRange: '₪150 – ₪450',
      responseTimeEn: '15 min',
      responseTimeAr: '15 دقيقة',
      image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=400&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'Rapid Fix Service Center',
      nameAr: 'مركز الإصلاح السريع للصيانة',
      rating: 4.8,
      reviews: 94,
      distanceEn: '1.6 km',
      distanceAr: '1.6 كم',
      openEn: 'Open Now',
      openAr: 'مفتوح الآن',
      tagsEn: ['General Service', 'Tires', 'Electrical'],
      tagsAr: ['صيانة شاملة', 'إطارات', 'كهرباء'],
      priceRange: '₪120 – ₪380',
      responseTimeEn: '20 min',
      responseTimeAr: '20 دقيقة',
      image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'Al-Markabat Elite Garage',
      nameAr: 'كراج نخبة المركبات الحديثة',
      rating: 4.7,
      reviews: 76,
      distanceEn: '2.1 km',
      distanceAr: '2.1 كم',
      openEn: 'Open Now',
      openAr: 'مفتوح الآن',
      tagsEn: ['AC Service', 'Brakes', 'Maintenance'],
      tagsAr: ['تكييف', 'فرامل', 'صيانة دورية'],
      priceRange: '₪130 – ₪420',
      responseTimeEn: '18 min',
      responseTimeAr: '18 دقيقة',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      qEn: 'How does requesting a quote work?',
      qAr: 'كيف تعمل خدمة طلب ومقارنة عروض الأسعار؟',
      aEn: 'Submit your vehicle details and required service. We broadcast your request to nearby verified workshops who respond with transparent, itemized quotes within minutes.',
      aAr: 'قم بإدخال بيانات سيارتك والمشكلة التي تواجهها، وسنقوم بتوجيه طلبك لأفضل الورش المعتمدة في منطقتك لتقديم عروض أسعار تفصيلية شفافة.',
    },
    {
      qEn: 'Is it free to request a quote?',
      qAr: 'هل خدمة طلب عروض الأسعار مجانية؟',
      aEn: 'Yes! Requesting and comparing repair quotes on AHL AL MARKABAT is 100% free with zero obligation.',
      aAr: 'نعم! طلب عروض الأسعار والمقارنة بين الورش مجاني 100% وبدون أي التزام بالشراء.',
    },
    {
      qEn: 'How long will it take to get quotes?',
      qAr: 'كم من الوقت يستغرق وصول العروض؟',
      aEn: 'Most certified workshops respond within 15 to 30 minutes during operating hours.',
      aAr: 'تصلك العروض عادةً خلال 15 إلى 30 دقيقة خلال ساعات العمل مع إشعار فوري على هاتفك.',
    },
    {
      qEn: 'Am I obligated to accept any quote?',
      qAr: 'هل أنا ملزم بقبول أي من العروض المستلمة؟',
      aEn: 'No, you have complete freedom to choose the best offer or decline all quotes.',
      aAr: 'لا، لك كامل الحرية في اختيار العرض الأنسب لك أو رفض كافة العروض بكل سهولة.',
    },
  ];

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      language === 'ar'
        ? 'تم إرسال طلب عرض السعر لجميع الورش المعتمدة بنجاح! جاري تحويلك للمقارنة...'
        : 'Quote request broadcasted to verified providers! Redirecting to Compare Quotes...',
      'success'
    );
    setActiveTab('quotes');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#0B1528] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              {language === 'ar' ? 'طلب ومقارنة عروض الأسعار' : 'REQUEST A QUOTE'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {language === 'ar' ? 'احصل على أفضل سعر لصيانة سيارتك' : 'Get the Best Price for Your Vehicle'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
              {language === 'ar'
                ? 'أخبرنا بما تحتاجه سيارتك، وسيقوم أفضل مراكز الصيانة المعتمدة بتقديم عروض أسعار تنافسية خلال دقائق.'
                : "Tell us what you need. We'll send your request to trusted, verified providers who will respond with their best estimates."}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2 font-bold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'ar' ? 'مجاني 100% • بدون التزام' : '100% Free • No obligation'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'ورش ومراكز معتمدة ومفحوصة' : 'Verified Providers Only'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'قارن ووفر حتى 30%' : 'Compare & Save'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'استجابة سريعة خلال دقائق' : 'Fast Response'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block text-end">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=80"
              alt="Quote Hero Car"
              className="w-80 rounded-2xl shadow-2xl border border-slate-700 inline-block object-cover aspect-[16/10]"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 space-y-10">
        <form onSubmit={handleSubmitRequest} className="space-y-8">
          {/* Step 1: Vehicle Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-950">
              {language === 'ar' ? '1. بيانات ومعلومات المركبة' : '1. Tell Us About Your Vehicle'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <select className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none text-slate-900 cursor-pointer">
                <option>{language === 'ar' ? 'تويوتا (Toyota)' : 'Toyota'}</option>
                <option>{language === 'ar' ? 'هيونداي (Hyundai)' : 'Hyundai'}</option>
                <option>{language === 'ar' ? 'كيا (Kia)' : 'Kia'}</option>
                <option>{language === 'ar' ? 'فولكس فاجن (Volkswagen)' : 'Volkswagen'}</option>
                <option>{language === 'ar' ? 'مرسيدس بنز (Mercedes-Benz)' : 'Mercedes-Benz'}</option>
                <option>{language === 'ar' ? 'بي إم دبليو (BMW)' : 'BMW'}</option>
              </select>

              <select className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none text-slate-900 cursor-pointer">
                <option>{language === 'ar' ? 'راف فور (RAV4)' : 'RAV4'}</option>
                <option>{language === 'ar' ? 'كامري (Camry)' : 'Camry'}</option>
                <option>{language === 'ar' ? 'كورولا (Corolla)' : 'Corolla'}</option>
                <option>{language === 'ar' ? 'توسان (Tucson)' : 'Tucson'}</option>
                <option>{language === 'ar' ? 'إلنترا (Elantra)' : 'Elantra'}</option>
              </select>

              <select className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none text-slate-900 cursor-pointer">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
              </select>

              <select className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none text-slate-900 cursor-pointer">
                <option>{language === 'ar' ? 'دفع رباعي / SUV' : 'SUV / Crossover'}</option>
                <option>{language === 'ar' ? 'سيدان (Sedan)' : 'Sedan'}</option>
                <option>{language === 'ar' ? 'هاتشباك (Hatchback)' : 'Hatchback'}</option>
                <option>{language === 'ar' ? 'بيك آب / تجاري' : 'Pickup / Commercial'}</option>
              </select>
            </div>
          </div>

          {/* Step 2: What Service Do You Need? */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-950">
              {language === 'ar' ? '2. ما هي الخدمة المطلوبة؟' : '2. What Service Do You Need?'}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {services.map((s, idx) => {
                const Icon = s.icon;
                const isSelected = selectedService === s.id;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedService(s.id)}
                    className={`p-4 rounded-2xl border text-center space-y-2 transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-black shadow-sm ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold">{language === 'ar' ? s.nameAr : s.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Problem Description & Symptoms */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-950">
              {language === 'ar' ? '3. وصف المشكلة والأعراض الملاحظة' : '3. Problem Description'}
            </h3>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                {language === 'ar' ? 'اشرح المشكلة بالتفصيل *' : 'Describe the issue in detail *'}
              </label>
              <textarea
                rows={4}
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'مثال: أسمع صوت صرير عند الضغط على الفرامل في السرعات المنخفضة، والمكيف يخرج هواء حار عند التوقف...'
                    : 'E.g., My car makes a squeaking noise when braking at low speeds. AC is also not cooling properly in idle...'
                }
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none text-slate-900 font-medium"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 block">
                {language === 'ar' ? 'حدد الأعراض الشائعة (اختياري)' : 'Select Symptoms (optional)'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {symptoms.map((sym, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer hover:border-blue-300 transition-all font-medium"
                  >
                    <input type="checkbox" className="rounded text-blue-600 accent-blue-600" />
                    <span>{language === 'ar' ? sym.ar : sym.en}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Service Delivery Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-950">
              {language === 'ar' ? '4. طريقة استلام وتقديم الخدمة' : '4. Service Delivery Method'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedReceiveType('workshop')}
                className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
                  selectedReceiveType === 'workshop'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-black ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <Wrench className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                <strong className="text-xs block">
                  {language === 'ar' ? 'زيارة مركز الصيانة' : 'Visit Workshop'}
                </strong>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {language === 'ar' ? 'أقوم بإحضار سيارتي إلى الورشة' : "I'll bring my vehicle to provider"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReceiveType('mobile')}
                className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
                  selectedReceiveType === 'mobile'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-black ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <Truck className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                <strong className="text-xs block">
                  {language === 'ar' ? 'صيانة متنقلة في موقعي' : 'Mobile Service'}
                </strong>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {language === 'ar' ? 'يحضر الفني إلى منزلي أو عملي' : 'Service at my location'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReceiveType('pickup')}
                className={`p-4 rounded-2xl border text-center space-y-1 transition-all ${
                  selectedReceiveType === 'pickup'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-black ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <Car className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                <strong className="text-xs block">
                  {language === 'ar' ? 'استلام وإعادة المركبة (سطحة)' : 'Pickup & Delivery'}
                </strong>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {language === 'ar' ? 'تقوم الورشة بنقل السيارة وإرجاعها' : 'Provider picks up and returns'}
                </span>
              </button>
            </div>
          </div>

          {/* Step 5: Urgency */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-slate-950">
              {language === 'ar' ? '5. درجة الاستعجال' : '5. How Urgent is This?'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedUrgency('normal')}
                className={`p-4 rounded-2xl border text-start space-y-1 transition-all ${
                  selectedUrgency === 'normal'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-600/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <strong className="text-xs">{language === 'ar' ? 'عادي (خلال أيام)' : 'Normal'}</strong>
                </div>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {language === 'ar' ? 'صيانة دورية غير مستعجلة' : 'Non-urgent, at convenient time'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedUrgency('urgent')}
                className={`p-4 rounded-2xl border text-start space-y-1 transition-all ${
                  selectedUrgency === 'urgent'
                    ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <strong className="text-xs">{language === 'ar' ? 'عاجل - اليوم' : 'Urgent - Today'}</strong>
                </div>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {language === 'ar' ? 'أحتاج الصيانة في أسرع وقت' : 'Need service as soon as possible'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedUrgency('emergency')}
                className={`p-4 rounded-2xl border text-start space-y-1 transition-all ${
                  selectedUrgency === 'emergency'
                    ? 'border-red-500 bg-red-50 text-red-900 font-bold ring-2 ring-red-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <strong className="text-xs">{language === 'ar' ? 'طوارئ SOS فورية' : 'Emergency SOS'}</strong>
                </div>
                <span className="text-[10px] text-slate-500 block font-medium">
                  {language === 'ar' ? 'السيارة معطلة ولا يمكن قيادتها' : 'Vehicle is not safe to drive'}
                </span>
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="bg-[#0B1528] rounded-3xl p-8 text-white border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">
                {language === 'ar' ? 'جاهز للحصول على أفضل الأسعار؟' : 'Ready to Get the Best Quote?'}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'ar'
                  ? 'أرسل طلبك الآن وسيقوم أفضل مراكز الصيانة المعتمدة بتقديم عروضها التنافسية.'
                  : 'Fill out your request and let trusted providers compete for your business.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="submit"
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{language === 'ar' ? 'إرسال طلب العروض الآن ←' : 'Submit Request Now →'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* FAQs */}
        <div className="space-y-6 pt-4">
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
                    className="w-full p-4 text-start font-bold text-xs text-slate-900 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-[11px] text-slate-600 border-t border-slate-100 leading-relaxed font-medium">
                      {language === 'ar' ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
