import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  FileText,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  ExternalLink,
  MessageCircle,
  Mail,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Star,
  Check,
  Bell,
  Info,
} from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const { language, formatPrice, setActiveTab, showToast, selectedCountry } = useApp();
  const [orderInput, setOrderInput] = useState('AHLM-ORD-78562');
  const [trackingNumber] = useState('TRK-987341671AE');
  const [copied, setCopied] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(
      language === 'ar' ? 'تم نسخ رقم التتبع إلى الحافظة' : 'Tracking number copied to clipboard',
      'info'
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      id: 1,
      titleEn: 'Order Confirmed',
      titleAr: 'تم تأكيد الطلب',
      timeEn: 'May 12, 2025 • 10:14 AM',
      timeAr: '12 مايو 2025 • 10:14 ص',
      done: true,
      current: false,
      icon: CheckCircle2,
    },
    {
      id: 2,
      titleEn: 'Processing & Packed',
      titleAr: 'التجهيز والتغليف',
      timeEn: 'May 12, 2025 • 02:15 PM',
      timeAr: '12 مايو 2025 • 02:15 م',
      done: true,
      current: false,
      icon: Package,
    },
    {
      id: 3,
      titleEn: 'Shipped with Courier',
      titleAr: 'تم الشحن مع المندوب',
      timeEn: 'May 13, 2025 • 08:46 AM',
      timeAr: '13 مايو 2025 • 08:46 ص',
      done: true,
      current: true,
      icon: Truck,
    },
    {
      id: 4,
      titleEn: 'Out for Delivery',
      titleAr: 'في الطريق إلى عنوانك',
      timeEn: 'In Progress',
      timeAr: 'جاري التوصيل',
      done: false,
      current: false,
      icon: Clock,
    },
    {
      id: 5,
      titleEn: 'Delivered',
      titleAr: 'تم التسليم بنجاح',
      timeEn: 'Pending',
      timeAr: 'قيد الانتظار',
      done: false,
      current: false,
      icon: CheckCircle2,
    },
  ];

  const timelineDetailed = [
    {
      titleEn: 'Order Confirmed & Payment Verified',
      titleAr: 'تم تأكيد الطلب والتحقق من الدفع',
      timeEn: 'May 12, 2025 - 10:14 AM',
      timeAr: '12 مايو 2025 - 10:14 ص',
      descEn: 'Your order has been verified and sent to our central warehouse team.',
      descAr: 'تم تأكيد طلبك وإرسال تفاصيل القطع إلى مستودع التجهيز المركزي.',
      done: true,
    },
    {
      titleEn: 'Quality Inspection & Packaging',
      titleAr: 'فحص الجودة والتغليف الآمن',
      timeEn: 'May 12, 2025 - 02:15 PM',
      timeAr: '12 مايو 2025 - 02:15 م',
      descEn: 'All parts inspected for genuine OEM labels and securely packed with protective padding.',
      descAr: 'تم فحص أرقام القطع ومطابقتها وتغليفها بطبقات حماية ممتصة للصدمات.',
      done: true,
    },
    {
      titleEn: 'Handed to Express Logistics',
      titleAr: 'تسليم الشحنة لشركة التوصيل السريع',
      timeEn: 'May 13, 2025 - 08:46 AM',
      timeAr: '13 مايو 2025 - 08:46 ص',
      descEn: 'Shipment dispatched from logistics hub with live barcode tracking.',
      descAr: 'خرجت الشحنة من المستودع مع مندوب التوصيل برقم تتبع مباشر.',
      done: true,
      current: true,
    },
    {
      titleEn: 'Courier Arrival at Destination',
      titleAr: 'وصول المندوب لمنطقتك والتواصل',
      timeEn: 'Estimated: Today, 03:30 PM',
      timeAr: 'المتوقع: اليوم، 03:30 م',
      descEn: 'Courier driver will call you prior to arrival to confirm drop-off point.',
      descAr: 'سيتصل بك سائق التوصيل هاتفياً لتأكيد الموقع الدقيق والتسليم.',
      done: false,
    },
  ];

  const orderItems = [
    {
      nameEn: 'Bosch Premium Oil Filter',
      nameAr: 'فلتر زيت محرك بوش ألماني أصلي',
      partNumber: 'OEM F026407157',
      qty: 1,
      price: 89.00,
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=120&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'Brembo Front Brake Pad Set - Ceramic',
      nameAr: 'طقم فحمات فرامل بريمبو سيراميك أمامية',
      partNumber: 'SN-947P Ceramic',
      qty: 1,
      price: 399.00,
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=120&auto=format&fit=crop&q=80',
    },
    {
      nameEn: 'NGK Laser Iridium Spark Plugs',
      nameAr: 'طقم شمعات احتراق ليزر إيريديوم NGK (4 حبات)',
      partNumber: 'Pack of 4 • ILZKR7B11',
      qty: 4,
      price: 160.00,
      image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      qEn: 'How can I track my order?',
      qAr: 'كيف يمكنني تتبع خط سير الشحنة؟',
      aEn: 'You can enter your Order ID or Tracking number in the search box above to get live GPS updates on your package.',
      aAr: 'يمكنك إدخال رقم الطلب أو رقم التتبع في مربع البحث أعلاه لمتابعة التحديثات اللحظية وموقع المندوب بدقة.',
    },
    {
      qEn: 'How long does delivery take?',
      qAr: 'كم يستغرق التوصيل عادةً؟',
      aEn: 'Standard delivery usually takes 24 to 48 hours across Palestine and the UAE. Express delivery is same day.',
      aAr: 'يستغرق التوصيل العادي من 24 إلى 48 ساعة في كافة المدن، والتوصيل السريع خلال نفس اليوم.',
    },
    {
      qEn: 'What if I am not available during delivery?',
      qAr: 'ماذا يحدث إذا لم أكن متواجداً وقت وصول المندوب؟',
      aEn: 'The courier driver will call you before arrival. You can reschedule the delivery time or designate a workshop to receive it.',
      aAr: 'سيتواصل معك السائق هاتفياً، ويمكنك إعادة جدولة وقت التسليم أو توجيه الشحنة إلى الورشة المعتمدة التي اخترتها.',
    },
    {
      qEn: 'How do I return or exchange a part?',
      qAr: 'كيف أقوم بإرجاع أو استبدال قطعة؟',
      aEn: 'All parts come with a 14-day hassle-free return window. Simply visit My Garage > Orders and click Request Return.',
      aAr: 'جميع القطع مشمولة بضمان استرجاع لمدة 14 يوماً للقطع غير المستخدمة في غلافها الأصلي عبر حسابك بضغطة زر.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* 1. Hero Search Header Banner */}
      <div className="relative bg-[#070E1B] text-white py-12 px-4 sm:px-8 lg:px-12 border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070E1B] via-[#0B1A33]/90 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1600&auto=format&fit=crop&q=80"
          alt="Automotive Garage Background"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        <div className="max-w-[1700px] mx-auto relative z-20 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-slate-600" />
            <span className="text-white font-bold">
              {language === 'ar' ? 'تتبع شحنة قطع الغيار' : 'Track Your Order'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs text-amber-400 font-black uppercase tracking-wider block">
                {language === 'ar' ? 'نظام التتبع اللوجستي المباشر' : 'LIVE ORDER TRACKING'}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {language === 'ar' ? 'تتبع مسار شحنتك' : 'Track Your Order'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'تابع مراحل شحن وتجهيز طلبك لحظة بلحظة، من المستودع المركزي وحتى وصول المندوب لباب منزلك أو الورشة.'
                  : 'Stay updated with your order every step of the way. From confirmation to delivery, follow your parts in real-time.'}
              </p>

              {/* Order ID Search Box */}
              <div className="pt-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md max-w-xl shadow-lg">
                  <input
                    type="text"
                    value={orderInput}
                    onChange={(e) => setOrderInput(e.target.value)}
                    placeholder={
                      language === 'ar'
                        ? 'أدخل رقم الطلب أو رقم الشحنة (مثال: AHLM-ORD-78562)'
                        : 'Enter your Order ID or Tracking Number'
                    }
                    className="flex-1 px-4 py-3 bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none font-mono"
                  />
                  <button
                    onClick={() => {
                      showToast(
                        language === 'ar'
                          ? `جاري جلب تفاصيل الشحنة ${orderInput}...`
                          : `Fetching tracking details for ${orderInput}...`,
                        'info'
                      );
                    }}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shrink-0"
                  >
                    {language === 'ar' ? 'تتبع الشحنة' : 'Track Order'}
                  </button>
                </div>
              </div>
            </div>

            {/* Need Help 24/7 Card */}
            <div className="bg-[#0B1528]/80 border border-slate-700/80 p-5 rounded-3xl backdrop-blur-md space-y-3 shrink-0 lg:w-80 shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-white block">
                    {language === 'ar' ? 'تحتاج مساعدة في التتبع؟' : 'Need Help?'}
                  </strong>
                  <span className="text-[10px] text-slate-400">
                    {language === 'ar' ? 'فريق الدعم اللوجستي متاح 24/7' : '24/7 Support Available'}
                  </span>
                </div>
              </div>

              <a
                href="tel:+970591234567"
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+970 59 123 4567</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 space-y-8">
        {/* 2. Order Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-black text-slate-950">
                {language === 'ar' ? 'ملخص الشحنة والطلب' : 'Order Summary'}
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {language === 'ar' ? '● قيد الشحن والتوصيل' : 'In Transit'}
              </span>
            </div>

            <button
              onClick={() => {
                showToast(
                  language === 'ar' ? 'جاري تحميل الفاتورة الضريبية PDF...' : 'Downloading PDF Invoice...',
                  'info'
                );
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'ar' ? 'تحميل الفاتورة الرسمية PDF' : 'Download Invoice'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'رقم الطلب' : 'Order ID'}
              </span>
              <div className="flex items-center gap-1.5">
                <strong className="font-mono font-black text-slate-950 text-xs sm:text-sm">AHLM-ORD-78562</strong>
                <button onClick={() => handleCopy('AHLM-ORD-78562')} className="text-slate-400 hover:text-slate-600">
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'تاريخ الطلب' : 'Order Date'}
              </span>
              <strong className="text-slate-900 block font-medium">12 مايو 2025 • 10:14 ص</strong>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'إجمالي المدفوع' : 'Order Total'}
              </span>
              <strong className="text-slate-950 font-black font-mono text-sm sm:text-base">
                {formatPrice(648.00)}
              </strong>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
              </span>
              <strong className="text-slate-900 block font-mono">VISA •••• 4242 (Apple Pay)</strong>
            </div>
          </div>

          {/* 5-Step Visual Tracker Bar */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {language === 'ar' ? 'مراحل التوصيل' : 'Delivery Milestones'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      step.current
                        ? 'bg-blue-50 border-blue-600 shadow-sm ring-2 ring-blue-600/20'
                        : step.done
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon
                        className={`w-4 h-4 ${
                          step.current ? 'text-blue-600' : step.done ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <strong className="text-xs font-black text-slate-900 block">
                        {language === 'ar' ? step.titleAr : step.titleEn}
                      </strong>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-medium">
                      {language === 'ar' ? step.timeAr : step.timeEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Items in Order & Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Items Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-950 pb-2 border-b border-slate-100">
              {language === 'ar' ? `القطع في هذه الشحنة (${orderItems.length})` : `Items in Package (${orderItems.length})`}
            </h3>

            <div className="divide-y divide-slate-100">
              {orderItems.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.nameEn} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-bold">
                        {language === 'ar' ? item.nameAr : item.nameEn}
                      </strong>
                      <span className="text-[10px] text-slate-400 font-mono block">{item.partNumber}</span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {language === 'ar' ? `الكمية: ${item.qty}` : `Qty: ${item.qty}`}
                      </span>
                    </div>
                  </div>
                  <strong className="font-mono text-slate-900 font-black">{formatPrice(item.price)}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Timeline (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-950 pb-2 border-b border-slate-100">
              {language === 'ar' ? 'سجل الحركة والتحركات التفصيلي' : 'Detailed Timeline'}
            </h3>

            <div className="space-y-4">
              {timelineDetailed.map((tl, i) => (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                      tl.current ? 'bg-blue-600 ring-4 ring-blue-100' : tl.done ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  />
                  <div>
                    <strong className="text-slate-900 block font-bold">
                      {language === 'ar' ? tl.titleAr : tl.titleEn}
                    </strong>
                    <span className="text-[10px] text-slate-400 block font-medium">
                      {language === 'ar' ? tl.timeAr : tl.timeEn}
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed font-medium">
                      {language === 'ar' ? tl.descAr : tl.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. FAQs */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-black text-slate-950">
            {language === 'ar' ? 'الأسئلة الشائعة حول تتبع الشحنات' : 'Tracking FAQs'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-start font-bold text-xs text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 font-medium">
                    {language === 'ar' ? faq.aAr : faq.aEn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
