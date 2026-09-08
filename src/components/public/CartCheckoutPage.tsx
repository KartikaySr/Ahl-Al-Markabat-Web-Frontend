import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Tag,
  MapPin,
  Car,
  Clock,
  RotateCcw,
  Sparkles,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  Star,
  Check,
  Store,
  Zap,
  User,
  Package,
} from 'lucide-react';

export const CartCheckoutPage: React.FC = () => {
  const {
    language,
    formatPrice,
    setActiveTab,
    showToast,
    selectedCountry,
    cart,
    updateCartQuantity,
    removeFromCart,
    createMarketplaceOrder,
    isAuthenticated,
    user,
    login,
    registerUser,
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Shipping details
  const [recipientName, setRecipientName] = useState(user?.name || 'عمر عبد الله');
  const [shippingPhone, setShippingPhone] = useState(user?.phone || '591234567');
  const [shippingCity, setShippingCity] = useState('Ramallah');
  const [shippingAddress, setShippingAddress] = useState('شارع الإرسال، بالقرب من دوار المنارة');
  const [carFitmentNote, setCarFitmentNote] = useState('Toyota RAV4 Hybrid 2023');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('cod');

  // Auth Gate state
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authFullName, setAuthFullName] = useState('عمر عبد الله');
  const [authPhone, setAuthPhone] = useState('591234567');
  const [authEmail, setAuthEmail] = useState('customer@example.com');
  const [authPassword, setAuthPassword] = useState('123456');

  // FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Pricing calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedPromo === 'AHL15' ? Math.round(subtotal * 0.15) : 0;
  const shippingFee = subtotal > 200 ? 0 : 25;
  const vat = Math.round((subtotal - discount) * 0.05);
  const finalTotal = Math.max(0, subtotal - discount + shippingFee + vat);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'AHL15' || promoCode.trim().toUpperCase() === 'AHL2026') {
      setAppliedPromo('AHL15');
      showToast(
        language === 'ar' ? '🎉 تم تطبيق كود الخصم 15% بنجاح!' : '🎉 15% discount applied!',
        'success'
      );
    } else {
      showToast(
        language === 'ar' ? 'كود الخصم غير صالح. جرب AHL15' : 'Invalid promo code. Try AHL15',
        'error'
      );
    }
  };

  const handlePlaceOrder = () => {
    // If not authenticated, authenticate first
    if (!isAuthenticated) {
      if (authMode === 'signin') {
        login('customer', {
          name: authFullName || 'عمر عبد الله',
          email: authEmail,
          phone: authPhone,
          role: 'customer',
        });
      } else {
        registerUser('customer', {
          fullName: authFullName,
          email: authEmail,
          phone: authPhone,
          password: authPassword,
        });
      }
    }

    // Now place order
    const orderId = createMarketplaceOrder({
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      vat,
      total: finalTotal,
      recipientName: user?.name || authFullName || 'عمر عبد الله',
      phone: user?.phone || authPhone || '+970 59 123 4567',
      city: shippingCity,
      address: shippingAddress,
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Cash on Delivery (COD)'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card (Visa/Mastercard)'
          : 'Digital Wallet (Apple Pay / Mada / PalPay)',
    });

    setConfirmedOrderId(orderId);
    setIsOrderPlaced(true);
    showToast(
      language === 'ar'
        ? `🎉 تم إرسال طلب الشراء برقم (${orderId}) بنجاح!`
        : `🎉 Order placed successfully with ID (${orderId})!`,
      'success'
    );
  };

  const faqs = [
    {
      qEn: 'Are all auto parts original and genuine?',
      qAr: 'هل كافة قطع الغيار في السلة أصلية ومضمونة؟',
      aEn: '100% yes. We only source parts from certified authorized distributors with manufacturer warranty barcodes.',
      aAr: 'نعم 100%! نتعامل فقط مع وكلاء وموزعين معتمدين مع باركود المصنع وضمان الاستبدال الرسمي.',
    },
    {
      qEn: 'How long will delivery take?',
      qAr: 'كم يستغرق الشحن والتوصيل؟',
      aEn: 'Standard delivery takes 24 to 48 hours across major cities. Express same-day delivery is available for urgent repairs.',
      aAr: 'يستغرق التوصيل السريع بين 24 إلى 48 ساعة لباب منزلك أو للورشة التي تختارها في كافة المدن.',
    },
    {
      qEn: 'What is your return policy?',
      qAr: 'ما هي سياسة الإرجاع والاستبدال؟',
      aEn: 'You can return any unopened or uninstalled part within 14 days for a full refund or exchange.',
      aAr: 'يمكنك إرجاع أي قطعة غير مركبة وفي عبوتها الأصلية خلال 14 يوماً واسترداد المبلغ بالكامل.',
    },
  ];

  // -------------------------------------------------------------
  // RENDER: ORDER CONFIRMED SUCCESS SCREEN
  // -------------------------------------------------------------
  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
              {language === 'ar' ? 'تم تأكيد طلبك بنجاح' : 'Order Placed Successfully'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'ar' ? 'شكراً لثقتك بأهل المركبات!' : 'Thank You for Your Order!'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {language === 'ar'
                ? 'جاري تجهيز قطع الغيار وفحص مطابقتها مع مواصفات سيارتك قبل شحنها.'
                : 'Your parts are being prepared and verified against vehicle fitment before shipping.'}
            </p>
          </div>

          {/* Order Summary Receipt */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-5 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  {language === 'ar' ? 'رقم الطلب' : 'Order Number'}
                </span>
                <strong className="text-xl font-mono text-amber-400 font-black">{confirmedOrderId}</strong>
              </div>
              <div className="text-end">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  {language === 'ar' ? 'حالة الشحنة' : 'Delivery Status'}
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-bold font-mono">
                  ● {language === 'ar' ? 'قيد التجهيز والتعبئة' : 'Processing for Dispatch'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المستلم:' : 'Recipient:'}</span>
                <strong className="text-white block font-bold">{recipientName}</strong>
                <span className="text-[10px] text-slate-400 font-mono">{shippingPhone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'عنوان التوصيل:' : 'Delivery Address:'}</span>
                <strong className="text-white block font-bold">{shippingCity}</strong>
                <span className="text-[10px] text-slate-400 block">{shippingAddress}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                <strong className="text-amber-400 block font-bold">
                  {paymentMethod === 'cod'
                    ? (language === 'ar' ? 'الدفع نقداً عند الاستلام (COD)' : 'Cash on Delivery (COD)')
                    : (language === 'ar' ? 'بطاقة بنكية إلكترونية' : 'Credit / Debit Card')}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المركبة المستهدفة:' : 'Vehicle Fitment:'}</span>
                <strong className="text-emerald-400 block font-bold">{carFitmentNote}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
              <span className="text-slate-300 font-bold">{language === 'ar' ? 'المبلغ الإجمالي:' : 'Total Amount Paid:'}</span>
              <span className="text-xl font-black font-mono text-amber-400">{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setIsOrderPlaced(false);
                setCheckoutStep(1);
                setActiveTab('marketplace');
              }}
              className="py-3.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>{language === 'ar' ? 'العودة لتصفح سوق قطع الغيار' : 'Continue Shopping Marketplace'}</span>
            </button>

            <button
              onClick={() => {
                setIsOrderPlaced(false);
                setActiveTab('customer');
              }}
              className="py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{language === 'ar' ? 'عرض طلباتي في حسابي' : 'View in Customer Account'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: EMPTY CART VIEW
  // -------------------------------------------------------------
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            {language === 'ar' ? 'سلة مشترياتك فارغة حالياً' : 'Your Cart is Currently Empty'}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {language === 'ar'
              ? 'تصفح سوق قطع الغيار المعتمدة واختر القطع والزيوت والفلاتر المطابقة لسيارتك بأفضل الأسعار.'
              : 'Explore genuine auto parts, synthetic lubricants, and maintenance packages guaranteed for your car.'}
          </p>
          <button
            onClick={() => setActiveTab('marketplace')}
            className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all"
          >
            {language === 'ar' ? 'تصفح سوق قطع الغيار الآن ←' : 'Browse Marketplace Now →'}
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN 4-STEP CHECKOUT WIZARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8 lg:px-12 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => setActiveTab('marketplace')} className="hover:text-blue-600 font-bold">
              {language === 'ar' ? 'سوق قطع الغيار' : 'Marketplace'}
            </button>
            <span>/</span>
            <span className="text-slate-900 font-black">
              {language === 'ar' ? 'سلة المشتريات وإتمام الطلب' : 'Cart & Checkout'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'ar' ? 'دفع آمن ومشفر 100%' : '100% Secure Checkout'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            {language === 'ar' ? 'سلة المشتريات وإتمام الدفع' : 'Cart & Checkout'}
          </h1>
          <p className="text-xs text-slate-500">
            {language === 'ar'
              ? 'راجع عناصر السلة، حدد عنوان الشحن وطريقة الدفع، ثم أكد طلبك بكل سهولة.'
              : 'Review your items, choose delivery and payment method, then place your order.'}
          </p>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-bold">
            <button
              onClick={() => setCheckoutStep(1)}
              className={`p-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                checkoutStep === 1
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{language === 'ar' ? '1. السلة والمراجعة' : '1. Cart Items'}</span>
            </button>

            <button
              onClick={() => setCheckoutStep(2)}
              className={`p-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                checkoutStep === 2
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{language === 'ar' ? '2. عنوان الشحن' : '2. Shipping Info'}</span>
            </button>

            <button
              onClick={() => setCheckoutStep(3)}
              className={`p-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                checkoutStep === 3
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{language === 'ar' ? '3. طريقة الدفع' : '3. Payment'}</span>
            </button>

            <button
              onClick={() => setCheckoutStep(4)}
              className={`p-2 rounded-xl flex items-center justify-center gap-2 transition-all ${
                checkoutStep === 4
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'ar' ? '4. مراجعة وتأكيد' : '4. Confirm & Order'}</span>
            </button>
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Active Step View */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h2 className="text-sm font-black text-slate-950">
                    {language === 'ar' ? `القطع في السلة (${cart.length})` : `Cart Items (${cart.length})`}
                  </h2>
                  <button onClick={() => setActiveTab('marketplace')} className="text-xs font-bold text-blue-600 hover:underline">
                    {language === 'ar' ? '+ إضافة المزيد من القطع' : 'Add More Parts'}
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={item.image}
                          alt={language === 'ar' ? item.nameAr : item.nameEn}
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/categories/oil_filters_quick.jpg';
                          }}
                        />
                        <div className="space-y-1">
                          <strong className="text-xs sm:text-sm font-black text-slate-900 block">
                            {language === 'ar' ? item.nameAr : item.nameEn}
                          </strong>
                          <span className="text-[10px] text-slate-500 font-mono block">
                            Part #: {item.partNum} • {language === 'ar' ? item.sellerAr : item.sellerEn}
                          </span>
                          <span className="text-xs font-black text-blue-600 font-mono">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-slate-100 text-slate-700 shadow-2xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-mono font-black text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-white flex items-center justify-center hover:bg-slate-100 text-slate-700 shadow-2xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="w-20 text-end font-mono font-black text-xs sm:text-sm text-slate-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>{language === 'ar' ? 'المتابعة لتفاصيل الشحن ←' : 'Continue to Shipping →'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING DETAILS */}
            {checkoutStep === 2 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-slate-100">
                  <h2 className="text-base font-black text-slate-950">
                    {language === 'ar' ? 'الخطوة 2: معلومات الشحن وعنوان التسليم' : 'Step 2: Shipping & Delivery Address'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar' ? 'أدخل عنوان التوصيل وبيانات المركبة للتحقق من التوافق' : 'Enter recipient details and vehicle model for fitment check'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">
                      {language === 'ar' ? 'اسم المستلم' : 'Recipient Name'}
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">
                      {language === 'ar' ? 'رقم الهاتف للتواصل' : 'Contact Phone'}
                    </label>
                    <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 font-mono">
                      <span className="px-2 font-bold text-slate-500">{selectedCountry.phonePrefix}</span>
                      <input
                        type="text"
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        className="w-full bg-transparent px-1 outline-none text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">
                      {language === 'ar' ? 'المدينة' : 'City'}
                    </label>
                    <input
                      type="text"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">
                      {language === 'ar' ? 'مواصفات سيارتك (للتأكد من القطعة)' : 'Target Vehicle Fitment'}
                    </label>
                    <input
                      type="text"
                      value={carFitmentNote}
                      onChange={(e) => setCarFitmentNote(e.target.value)}
                      placeholder="e.g. Toyota RAV4 Hybrid 2023"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-600 block mb-1">
                      {language === 'ar' ? 'العنوان التفصيلي / اسم الشارع والمعلم القريب' : 'Street Address & Nearby Landmark'}
                    </label>
                    <input
                      type="text"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    {language === 'ar' ? '← العودة للسلة' : '← Back to Cart'}
                  </button>
                  <button
                    onClick={() => setCheckoutStep(3)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>{language === 'ar' ? 'المتابعة لاختيار طريقة الدفع ←' : 'Continue to Payment →'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {checkoutStep === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="pb-3 border-b border-slate-100">
                  <h2 className="text-base font-black text-slate-950">
                    {language === 'ar' ? 'الخطوة 3: اختر طريقة الدفع المفضلة' : 'Step 3: Choose Payment Method'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar' ? 'جميع خيارات الدفع مؤمنة ومحمية بالكامل' : 'All transactions are 100% encrypted & protected'}
                  </p>
                </div>

                <div className="space-y-3">
                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-blue-600 bg-blue-50/40 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        💵
                      </div>
                      <div>
                        <strong className="text-xs font-black block">
                          {language === 'ar' ? 'الدفع نقداً عند الاستلام (COD)' : 'Cash on Delivery (COD)'}
                        </strong>
                        <span className="text-[10px] text-slate-500">
                          {language === 'ar' ? 'ادفع للمندوب عند استلام القطع وفحصها' : 'Pay when parts are delivered to your door'}
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                  </div>

                  {/* Card */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50/40 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-xs font-black block">
                          {language === 'ar' ? 'بطاقة فيزا / ماستركارد' : 'Credit / Debit Card'}
                        </strong>
                        <span className="text-[10px] text-slate-500">
                          {language === 'ar' ? 'دفع إلكتروني فوري ومشفر 3D Secure' : 'Instant encrypted card payment (3D Secure)'}
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'card' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                  </div>

                  {/* Digital Wallet */}
                  <div
                    onClick={() => setPaymentMethod('digital')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'digital'
                        ? 'border-blue-600 bg-blue-50/40 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-xs font-black block">
                          {language === 'ar' ? 'المحافظ الرقمية (Apple Pay / Mada / PalPay)' : 'Digital Wallets'}
                        </strong>
                        <span className="text-[10px] text-slate-500">
                          {language === 'ar' ? 'دفع بنقرة واحدة سريعة' : '1-click checkout with digital wallet'}
                        </span>
                      </div>
                    </div>
                    {paymentMethod === 'digital' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    {language === 'ar' ? '← العودة للشحن' : '← Back to Shipping'}
                  </button>
                  <button
                    onClick={() => setCheckoutStep(4)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>{language === 'ar' ? 'المتابعة لتأكيد الطلب ←' : 'Continue to Final Review →'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & AUTHENTICATION GATE */}
            {checkoutStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="pb-3 border-b border-slate-100">
                    <h2 className="text-base font-black text-slate-950">
                      {language === 'ar' ? 'الخطوة 4: مراجعة الطلب وتأكيد الحساب' : 'Step 4: Review Order & Authenticate'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {language === 'ar' ? 'تحقق من تفاصيل الطلب وسجّل حسابك لتأكيد الشراء' : 'Confirm your invoice and account details to complete order'}
                    </p>
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المستلم والمدينة:' : 'Recipient:'}</span>
                      <strong className="text-slate-900 font-bold block">{recipientName}</strong>
                      <span className="text-slate-500 font-mono text-[10px]">{shippingPhone} • {shippingCity}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'طريقة الدفع:' : 'Payment Mode:'}</span>
                      <strong className="text-blue-600 font-bold block">
                        {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit Card' : 'Digital Wallet'}
                      </strong>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'عنوان التوصيل:' : 'Delivery Address:'}</span>
                      <span className="text-slate-700 font-medium">{shippingAddress}</span>
                    </div>
                  </div>

                  {/* AUTHENTICATION GATE */}
                  {isAuthenticated ? (
                    // Signed in user
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-xs font-black text-slate-900 block">
                            {language === 'ar' ? 'تم تسجيل الدخول بحسابك' : 'Signed In As'}
                          </strong>
                          <span className="text-xs text-emerald-800 font-bold block">{user.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{user.phone}</span>
                        </div>
                      </div>

                      <button
                        onClick={handlePlaceOrder}
                        className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'ar' ? 'تأكيد وإرسال طلب الشراء الآن' : 'Place Order Now'}</span>
                      </button>
                    </div>
                  ) : (
                    // In-place Auth Card
                    <div className="p-5 rounded-2xl bg-white border-2 border-amber-400 shadow-md space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'خطوة أخيرة: تسجيل الدخول أو إنشاء حساب' : 'Last Step: Sign In or Register'}</span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900">
                          {language === 'ar' ? 'سجّل دخولك لإتمام عملية الشراء وحفظ الطلب' : 'Sign in to link and complete your order'}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {language === 'ar'
                            ? 'نحتاج لبياناتك لنتمكن من إرسال بوليصة الشحن وتحديثك بحالة الشحنة.'
                            : 'Required to track your delivery package and store your invoice.'}
                        </p>
                      </div>

                      {/* Mode Toggle */}
                      <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => setAuthMode('signin')}
                          className={`flex-1 py-1.5 rounded-lg transition-all ${
                            authMode === 'signin' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
                          }`}
                        >
                          {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuthMode('signup')}
                          className={`flex-1 py-1.5 rounded-lg transition-all ${
                            authMode === 'signup' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
                          }`}
                        >
                          {language === 'ar' ? 'حساب جديد' : 'New Account'}
                        </button>
                      </div>

                      {/* Fast 1-Click Demo Sign-in Button */}
                      <button
                        type="button"
                        onClick={() => {
                          login('customer', {
                            name: 'عمر عبد الله',
                            phone: '+970 59 111 2233',
                            email: 'omar@example.ps',
                            role: 'customer',
                          });
                          showToast(language === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Logged in as Demo Customer!', 'success');
                        }}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>{language === 'ar' ? 'تسجيل دخول فوري (حساب تجريبي بنقرة واحدة)' : 'Instant 1-Click Demo Login'}</span>
                      </button>

                      {/* Form Inputs */}
                      <div className="space-y-2.5 text-xs">
                        {authMode === 'signup' && (
                          <div>
                            <label className="text-[10px] font-bold text-slate-600 block mb-1">
                              {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                            </label>
                            <input
                              type="text"
                              value={authFullName}
                              onChange={(e) => setAuthFullName(e.target.value)}
                              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-1">
                            {language === 'ar' ? 'رقم الهاتف' : 'Mobile Phone'}
                          </label>
                          <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 font-mono">
                            <span className="px-2 font-bold text-slate-500">{selectedCountry.phonePrefix}</span>
                            <input
                              type="text"
                              value={authPhone}
                              onChange={(e) => setAuthPhone(e.target.value)}
                              className="w-full bg-transparent px-1 outline-none text-slate-900 font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-600 block mb-1">
                            {language === 'ar' ? 'كلمة المرور' : 'Password'}
                          </label>
                          <input
                            type="password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {authMode === 'signin'
                            ? (language === 'ar' ? 'تسجيل الدخول وتأكيد الطلب' : 'Sign In & Place Order')
                            : (language === 'ar' ? 'إنشاء حساب وتأكيد الطلب' : 'Register & Place Order')}
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setCheckoutStep(3)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                    >
                      {language === 'ar' ? '← العودة لطريقة الدفع' : '← Back to Payment'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Fixed Order Summary & Promo Code */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 sticky top-24">
              <h3 className="text-sm font-black text-slate-950 pb-2 border-b border-slate-100">
                {language === 'ar' ? 'ملخص الفاتورة' : 'Order Summary'}
              </h3>

              {/* Promo Code Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'كود الخصم (AHL15)' : 'Promo Code (AHL15)'}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono uppercase font-bold outline-none"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl"
                >
                  {language === 'ar' ? 'تطبيق' : 'Apply'}
                </button>
              </div>

              {/* Line Items Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'مجموع القطع' : 'Subtotal'}</span>
                  <span className="font-mono font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>{language === 'ar' ? 'خصم الكوبون (15%)' : 'Promo Discount (15%)'}</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'رسوم الشحن والتوصيل' : 'Shipping Fee'}</span>
                  <span className="font-mono font-bold text-slate-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600">{language === 'ar' ? 'مجاني' : 'Free'}</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'ضريبة القيمة المضافة (5%)' : 'VAT (5%)'}</span>
                  <span className="font-mono font-bold text-slate-900">{formatPrice(vat)}</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-sm font-black text-slate-950">
                  <div>
                    <span className="block">{language === 'ar' ? 'الإجمالي الصافي' : 'Total'}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {language === 'ar' ? 'شامل الضريبة والشحن' : 'Inclusive of VAT'}
                    </span>
                  </div>
                  <span className="font-mono text-blue-600 text-xl font-black">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800">
                    {language === 'ar' ? 'قطع أصلية 100% معتمدة' : '100% Certified Genuine Parts'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-bold text-slate-800">
                    {language === 'ar' ? 'إرجاع سهل خلال 14 يوماً' : '14-Day Easy Returns'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Help FAQ */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-950">
            {language === 'ar' ? 'الأسئلة الشائعة حول الشحن والطلب' : 'Frequently Asked Questions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
