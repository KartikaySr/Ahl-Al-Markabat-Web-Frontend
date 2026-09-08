import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Plus,
  Minus,
  ShoppingCart,
  Zap,
  Building2,
  Phone,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { language, formatPrice, setActiveTab, showToast, selectedCountry, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [
    '/images/parts/ceramic_brake_pads.jpg',
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80',
  ];

  const specs = [
    { labelEn: 'Part Type', labelAr: 'نوع وتصنيف القطعة', valEn: 'Brake Pad Set (Front)', valAr: 'طقم فحمات فرامل (أمامية)' },
    { labelEn: 'Material', labelAr: 'الخامة والتصنيع', valEn: 'Premium Ceramic', valAr: 'سيراميك عالي التحمل' },
    { labelEn: 'Position', labelAr: 'المحور والجهة', valEn: 'Front Axle', valAr: 'المحور الأمامي' },
    { labelEn: 'OEM Part Number', labelAr: 'رقم القطعة الأصلي OEM', valEn: '04465-06280', valAr: '04465-06280' },
    { labelEn: 'Manufacturer Brand', labelAr: 'الماركة المصنعة', valEn: 'ADVICS (Japan)', valAr: 'أدفكس ADVICS (ياباني)' },
    { labelEn: 'Weight', labelAr: 'الوزن التقريبي', valEn: '1.45 kg', valAr: '1.45 كجم' },
    { labelEn: 'Noise Reduction', labelAr: 'تقنية مانع الصرير', valEn: 'Yes (Multi-layer Shims)', valAr: 'نعم (صفائح عازلة للصوت)' },
    { labelEn: 'Low Dust Formula', labelAr: 'معدل غبار منخفض', valEn: 'Yes (Clean Wheels)', valAr: 'نعم (يحافظ على نظافة الجنط)' },
    { labelEn: 'Wear Indicator Sensor', labelAr: 'حساس مؤشر التآكل', valEn: 'Included', valAr: 'مشمول بالطقم' },
    { labelEn: 'Hardware Kit', labelAr: 'مشابك وصاجات التثبيت', valEn: 'Included (Stainless)', valAr: 'مشمولة (ستانلس ستيل)' },
    { labelEn: 'Warranty Guarantee', labelAr: 'مدة الضمان المعتمد', valEn: '12 Months / 20,000 KM', valAr: '12 شهراً أو 20,000 كم' },
  ];

  const related = [
    {
      titleEn: 'Toyota Camry Brake Pad Set (Rear)',
      titleAr: 'طقم فحمات فرامل خلفية تويوتا كامري',
      price: 179,
      rating: '4.7 (118)',
      img: '/images/parts/ceramic_brake_pads.jpg',
    },
    {
      titleEn: 'Toyota Corolla Brake Pad Set (Front)',
      titleAr: 'طقم فحمات فرامل أمامية تويوتا كورولا',
      price: 169,
      rating: '4.8 (325)',
      img: '/images/parts/ceramic_brake_pads.jpg',
    },
    {
      titleEn: 'Toyota RAV4 Brake Pad Set (Front)',
      titleAr: 'طقم فحمات فرامل أمامية تويوتا راف فور',
      price: 199,
      rating: '4.7 (187)',
      img: '/images/parts/ceramic_brake_pads.jpg',
    },
    {
      titleEn: 'Lexus ES Brake Pad Set (Front)',
      titleAr: 'طقم فحمات فرامل أمامية لكزس ES',
      price: 229,
      rating: '4.9 (164)',
      img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=200&auto=format&fit=crop&q=80',
    },
  ];

  const faqs = [
    {
      qEn: 'Are these brake pads OEM or aftermarket?',
      qAr: 'هل هذه الفحمات أصلية وكالة أم درجة أولى؟',
      aEn: 'These are OEM-certified premium ceramic brake pads manufactured by ADVICS, identical to Toyota factory specifications.',
      aAr: 'هذه الفحمات أصلية بمواصفات وكالة (OEM) من تصنيع شركة ADVICS اليابانية الموردة الرسمية لسيارات تويوتا.',
    },
    {
      qEn: 'How long do these brake pads last?',
      qAr: 'كم تدوم هذه الفحمات في ظروف القيادة العادية؟',
      aEn: 'Under normal driving conditions, ceramic pads typically last between 40,000 to 60,000 KM.',
      aAr: 'تدوم فحمات السيراميك عالية الجودة بين 40,000 إلى 60,000 كم في ظروف الاستخدام اليومي المعتاد.',
    },
    {
      qEn: 'Do these come with installation hardware?',
      qAr: 'هل يأتي معها مشابك وصاجات التركيب الأصلية؟',
      aEn: 'Yes, full stainless steel shims, clips, and wear sensors are included in the package.',
      aAr: 'نعم، الطقم يحتوي على كامل الصاجات والمشابك العازلة للحرارة والمانعة للصوت وحساسات التآكل.',
    },
    {
      qEn: 'Can I bundle this with garage installation?',
      qAr: 'هل يمكنني حجز التركيب لدى ورشة معتمدة مع الشراء؟',
      aEn: 'You can install them yourself or book professional installation with one of our 1,250+ verified workshops during checkout.',
      aAr: 'نعم! يمكنك اختيار استلام القطعة في إحدى الورش المعتمدة وحجز موعد تركيب فوري بخصم خاص.',
    },
  ];

  const handleAddToCart = () => {
    addToCart(
      {
        id: 'p-camry-brakes',
        nameEn: 'Toyota Camry Ceramic Front Brake Pad Set (OEM ADVICS)',
        nameAr: 'طقم فحمات فرامل سيراميك أمامية تويوتا كامري (وكالة أصلية)',
        partNum: '04465-06280',
        price: 185,
        image: images[0],
        sellerEn: 'AutoTech Premier Parts',
        sellerAr: 'مركز أوتو تك للقطع المعتمدة',
      },
      quantity
    );
    showToast(
      language === 'ar'
        ? `تمت إضافة (${quantity}) طقم فحمات تويوتا كامري إلى سلة التسوق!`
        : `Added (${quantity}) Toyota Camry Brake Pad Set to your cart!`,
      'success'
    );
    setActiveTab('cart-checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-12">
      {/* 1. Breadcrumbs */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 text-[11px] font-bold text-slate-500 flex items-center gap-1.5 flex-wrap">
        <button onClick={() => setActiveTab('home')} className="hover:text-blue-600">
          {language === 'ar' ? 'الرئيسية' : 'Home'}
        </button>
        <span>›</span>
        <button onClick={() => setActiveTab('marketplace')} className="hover:text-blue-600">
          {language === 'ar' ? 'متجر قطع الغيار' : 'Spare Parts'}
        </button>
        <span>›</span>
        <span>{language === 'ar' ? 'أنظمة الفرامل' : 'Brake System'}</span>
        <span>›</span>
        <span>{language === 'ar' ? 'فحمات فرامل' : 'Brake Pads'}</span>
        <span>›</span>
        <span>{language === 'ar' ? 'تويوتا كامري' : 'Toyota Camry'}</span>
        <span>›</span>
        <span className="text-slate-900 font-black">
          {language === 'ar' ? 'طقم فحمات سيراميك أصلية' : 'Brake Pad Set'}
        </span>
      </div>

      {/* 2. Main Product Layout */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Gallery (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 h-80">
              <img src={images[selectedImage]} alt="Toyota Camry Brake Pad Set" className="w-full h-full object-cover" />
              <span className="absolute top-3 start-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow-sm">
                {language === 'ar' ? 'الأكثر مبيعاً' : 'Best Seller'}
              </span>
            </div>

            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Buy Box & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black">
                  {language === 'ar' ? 'جودة وكالة OEM' : 'OEM Quality'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black">
                  {language === 'ar' ? 'غبار منخفض' : 'Low Dust'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black">
                  {language === 'ar' ? 'أداء صامت وهادئ' : 'Quiet Performance'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {language === 'ar' ? 'طقم فحمات فرامل سيراميك تويوتا كامري' : 'Toyota Camry Ceramic Brake Pad Set'}
              </h1>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'فحمات فرامل سيراميك فائقة الجودة لأداء كبح ناعم وقوي وآمن في كافة الظروف الجوية.'
                  : 'Premium ceramic brake pads for smooth, quiet, and safe braking performance.'}
              </p>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-amber-500 font-bold">★ 4.8</span>
                <span className="text-slate-400">
                  {language === 'ar' ? '(126 تقييم عميل)' : '(126 Reviews)'}
                </span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">
                  {language === 'ar' ? 'أكثر من 250 عملية شراء هذا الشهر' : '250+ bought this month'}
                </span>
              </div>
            </div>

            {/* Pricing Strip */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 font-mono">{formatPrice(189)}</span>
                <span className="text-xs text-slate-400 line-through font-mono">{formatPrice(239)}</span>
                <span className="text-xs font-black text-emerald-600">
                  {language === 'ar' ? `وفر ${formatPrice(50)} (خصم 21%)` : 'Save 21%'}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block font-bold">
                {language === 'ar' ? 'شامل الضريبة • متوفر بالمخزون - جاهز للشحن الفوري' : 'Inclusive of VAT • In Stock - Ready to ship'}
              </span>
            </div>

            {/* Quantity & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center font-black"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center font-black"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 w-full py-3 bg-[#09152B] hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'إضافة إلى السلة' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                }}
                className="flex-1 w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>{language === 'ar' ? 'شراء فوري' : 'Buy Now'}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-500 font-bold">
              <span className="flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                {language === 'ar' ? 'دفع آمن 100%' : 'Secure Checkout'}
              </span>
              <span className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {language === 'ar' ? 'أصلي ومضمون' : '100% Original'}
              </span>
              <span className="flex items-center justify-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                {language === 'ar' ? 'إرجاع سهل خلال 14 يوماً' : 'Easy Returns'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Vehicle Fitment & Specifications */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Specifications & Fitment (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Fitment Check Box */}
          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <strong className="flex items-center gap-1.5 font-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {language === 'ar'
                ? 'مطابقة تامة ومؤكدة لسيارتك تويوتا كامري (موديلات 2018 - 2024)'
                : 'Perfect Fit for Your Toyota Camry (2018 - 2024)'}
            </strong>
            <span className="text-[10px] text-emerald-700 block font-mono">
              {language === 'ar' ? 'رقم القطعة OEM المطابق:' : 'OEM Part Number:'} 04465-06280
            </span>
          </div>

          {/* Specifications Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {language === 'ar' ? 'المواصفات الفنية للقطعة' : 'Product Specifications'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {specs.map((sp, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-400 font-bold text-[10px]">
                    {language === 'ar' ? sp.labelAr : sp.labelEn}
                  </span>
                  <strong className="text-slate-900 font-bold">
                    {language === 'ar' ? sp.valAr : sp.valEn}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seller Info Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4 text-xs">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {language === 'ar' ? 'يباع بواسطة' : 'Sold by'}
              </span>
              <strong className="text-sm font-black text-slate-900 block">
                {language === 'ar' ? 'مركز أوتو تك للقطع المعتمدة' : 'AutoTech Garage'}
              </strong>
              <div className="flex items-center gap-2 mt-1 text-slate-500 text-[10px]">
                <span className="text-amber-500 font-bold">★ 4.9 (532 reviews)</span>
                <span>•</span>
                <span>{language === 'ar' ? selectedCountry.nameAr : selectedCountry.nameEn}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('providers')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 transition-all"
            >
              {language === 'ar' ? 'زيارة متجر الورشة' : 'View Store'}
            </button>

            <div className="p-3 bg-[#09152B] text-white rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[9px] text-slate-400 block font-bold">
                {language === 'ar' ? 'تحتاج مساعدة للتأكد من التوافق؟' : 'Need Help with Part Compatibility?'}
              </span>
              <strong className="text-sm font-black text-amber-400 font-mono block">+970 59 123 4567</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. You May Also Like */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
          {language === 'ar' ? 'قطع غيار أخرى قد تهمك' : 'You May Also Like'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <img src={r.img} alt={r.titleEn} className="w-full h-28 rounded-xl object-cover" />
                <strong className="text-xs font-black text-slate-900 block truncate">
                  {language === 'ar' ? r.titleAr : r.titleEn}
                </strong>
                <span className="text-[10px] text-amber-500 font-bold">★ {r.rating}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <strong className="text-slate-900 font-black font-mono">{formatPrice(r.price)}</strong>
                <button
                  onClick={() => {
                    showToast(
                      language === 'ar'
                        ? `تمت إضافة ${r.titleAr} إلى السلة!`
                        : `Added ${r.titleEn} to cart!`,
                      'success'
                    );
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-[10px] transition-all"
                >
                  {language === 'ar' ? 'إضافة' : 'Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. FAQs Accordion */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <h3 className="text-lg font-black text-slate-900">
          {language === 'ar' ? 'الأسئلة الشائعة حول هذه القطعة' : 'Frequently Asked Questions'}
        </h3>
        <div className="space-y-2">
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
