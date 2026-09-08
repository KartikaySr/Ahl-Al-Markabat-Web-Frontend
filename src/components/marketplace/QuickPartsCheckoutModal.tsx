import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Tag,
  MapPin,
  Car,
  Package,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Building2,
  Lock,
  Sparkles,
  Phone,
  Check,
  RotateCcw,
} from 'lucide-react';

export const QuickPartsCheckoutModal: React.FC = () => {
  const {
    language,
    formatPrice,
    isCartModalOpen,
    setIsCartModalOpen,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    createMarketplaceOrder,
    user,
    setCustomerActiveTab,
    setActiveTab,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  // Shipping & Recipient Details
  const [recipientName, setRecipientName] = useState(user?.name || 'Ahmed Al-Mansoor');
  const [phone, setPhone] = useState(user?.phone || '+971 50 123 4567');
  const [city, setCity] = useState(user?.city || 'Dubai');
  const [address, setAddress] = useState('Al Quoz Industrial 3, Main Street, Bldg 4');
  const [deliveryMode, setDeliveryMode] = useState<'courier' | 'workshop'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Sync user info when modal opens
  React.useEffect(() => {
    if (isCartModalOpen) {
      setStep(1);
      if (user?.name) setRecipientName(user.name);
      if (user?.phone) setPhone(user.phone);
      if (user?.city) setCity(user.city);
    }
  }, [isCartModalOpen, user]);

  if (!isCartModalOpen) return null;

  // Price calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount =
    appliedPromo === 'AHL15'
      ? Math.round(subtotal * 0.15)
      : appliedPromo === 'SUMMER50'
      ? Math.round(subtotal * 0.10)
      : 0;
  const shippingFee = subtotal > 200 || subtotal === 0 ? 0 : 25;
  const vat = Math.round((subtotal - discount) * 0.05);
  const finalTotal = Math.max(0, subtotal - discount + shippingFee + vat);

  const handleApplyPromo = () => {
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'AHL15' || clean === 'SUMMER50' || clean === 'AHL2026') {
      setAppliedPromo(clean);
      showToast(
        language === 'ar' ? `🎉 تم تطبيق كود الخصم ${clean} بنجاح!` : `🎉 Promo code ${clean} applied!`,
        'success'
      );
    } else {
      showToast(
        language === 'ar' ? 'كود الخصم غير صالح. جرب AHL15 أو SUMMER50' : 'Invalid promo code. Try AHL15 or SUMMER50',
        'error'
      );
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const orderId = createMarketplaceOrder({
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      vat,
      total: finalTotal,
      recipientName,
      phone,
      city,
      address,
      paymentMethod:
        paymentMethod === 'cod'
          ? language === 'ar'
            ? 'الدفع عند الاستلام (COD)'
            : 'Cash on Delivery (COD)'
          : language === 'ar'
          ? 'بطاقة بنكية / أبل باي'
          : 'Credit / Debit Card (Apple Pay)',
    });

    setConfirmedOrderId(orderId);
    setStep(2);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    showToast(
      language === 'ar'
        ? `🎉 تم إتمام معاملة الشراء بنجاح! رقم الطلب: ${orderId}`
        : `🎉 Order placed successfully! Ref: ${orderId}`,
      'success'
    );
  };

  const handleClose = () => {
    setIsCartModalOpen(false);
  };

  const handleViewMyOrders = () => {
    setIsCartModalOpen(false);
    setActiveTab('customer');
    setCustomerActiveTab('marketplace');
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn text-slate-900">
      <div
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#09152B] text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  {language === 'ar' ? 'سلة قطع الغيار والمعاملات' : 'Parts Cart & Checkout'}
                </span>
                {totalCartCount > 0 && (
                  <span className="text-slate-300 text-xs font-bold">
                    {totalCartCount} {language === 'ar' ? 'قطع' : 'items'}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                {language === 'ar' ? 'إتمام طلب وشراء قطع الغيار' : 'Checkout & Place Order'}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 slim-scrollbar">
          {/* STEP 1: Cart Items & Delivery & Payment */}
          {step === 1 && (
            <>
              {cart.length === 0 ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <Package className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900">
                    {language === 'ar' ? 'سلة مشترياتك فارغة حالياً' : 'Your parts cart is currently empty'}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    {language === 'ar'
                      ? 'تصفح كتالوج قطع الغيار المتوافقة مع مركبتك وأضف القطع الأصلية للاستفادة من التوصيل السريع.'
                      : 'Explore our fitment catalog for your vehicle and add OEM parts to enjoy express delivery.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsCartModalOpen(false);
                      setActiveTab('customer');
                      setCustomerActiveTab('marketplace');
                    }}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
                  >
                    <Package className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تصفح متجر قطع الغيار' : 'Browse Parts Store'}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span>{language === 'ar' ? '1. مراجعة القطع المختارة:' : '1. Selected Spare Parts:'}</span>
                      </strong>
                      <button
                        onClick={clearCart}
                        className="text-[11px] text-red-500 hover:text-red-700 font-bold flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تفريغ السلة' : 'Clear Cart'}</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.nameEn}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/categories/oil_filters_quick.jpg';
                              }}
                              className="w-14 h-14 rounded-xl object-cover bg-white border border-slate-200 shrink-0 p-1"
                            />
                            <div className="min-w-0">
                              <strong className="text-xs sm:text-sm font-black text-slate-900 block truncate">
                                {language === 'ar' ? item.nameAr : item.nameEn}
                              </strong>
                              <span className="text-[10px] text-slate-500 font-mono block">
                                OEM: {item.partNum} • {language === 'ar' ? item.sellerAr : item.sellerEn}
                              </span>
                              <span className="text-xs font-black text-blue-700 block mt-0.5">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
                              <button
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-black font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery & Recipient Information */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <strong className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{language === 'ar' ? '2. بيانات التوصيل والاستلام:' : '2. Delivery & Recipient Details:'}</span>
                    </strong>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">
                          {language === 'ar' ? 'اسم المستلم:' : 'Recipient Name:'}
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">
                          {language === 'ar' ? 'رقم الهاتف للتواصل / التوصيل:' : 'Phone for Delivery:'}
                        </label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">
                          {language === 'ar' ? 'المدينة:' : 'City:'}
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-bold text-slate-700">
                          {language === 'ar' ? 'عنوان التوصيل بالتفصيل:' : 'Delivery Address:'}
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Delivery Option Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div
                        onClick={() => setDeliveryMode('courier')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          deliveryMode === 'courier'
                            ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-xs font-black text-slate-900 block">
                            {language === 'ar' ? 'توصيل سريع إلى العنوان' : 'Express Courier Delivery'}
                          </strong>
                          <span className="text-[10px] text-slate-500 block">
                            {language === 'ar' ? 'شحن سريع خلال 24-48 ساعة' : 'Fast door delivery in 24-48 hrs'}
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => setDeliveryMode('workshop')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          deliveryMode === 'workshop'
                            ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-xs font-black text-slate-900 block">
                            {language === 'ar' ? 'توصيل للورشة مع التركيب' : 'Deliver to Workshop & Install'}
                          </strong>
                          <span className="text-[10px] text-slate-500 block">
                            {language === 'ar' ? 'استلام وتركيب في الورشة المعتمدة' : 'Direct fitting at certified garage'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method & Promo Code */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <strong className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>{language === 'ar' ? '3. طريقة الدفع وكوبون الخصم:' : '3. Payment Method & Promo:'}</span>
                    </strong>

                    {/* Promo Input */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder={language === 'ar' ? 'أدخل كود الخصم (AHL15 / SUMMER50)...' : 'Enter promo code (AHL15 / SUMMER50)...'}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-3 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 uppercase"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0"
                      >
                        {language === 'ar' ? 'تطبيق الكود' : 'Apply'}
                      </button>
                    </div>

                    {/* Payment Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          paymentMethod === 'cod'
                            ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-xs font-black text-slate-900 block">
                            {language === 'ar' ? 'الدفع عند الاستلام (COD)' : 'Cash on Delivery (COD)'}
                          </strong>
                          <span className="text-[10px] text-slate-500 block">
                            {language === 'ar' ? 'سداد المبلغ نقداً أو بالبطاقة عند التسليم' : 'Pay when parts arrive'}
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          paymentMethod === 'card'
                            ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                          <strong className="text-xs font-black text-slate-900 block">
                            {language === 'ar' ? 'بطاقة بنكية / أبل باي' : 'Card / Apple Pay / Mada'}
                          </strong>
                          <span className="text-[10px] text-slate-500 block">
                            {language === 'ar' ? 'دفع إلكتروني فوري مع حماية المشتري' : 'Instant secure payment'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Calculation Summary */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>{language === 'ar' ? 'مجموع قيمة القطع' : 'Parts Subtotal'}</span>
                      <strong className="text-slate-900 font-mono">{formatPrice(subtotal)}</strong>
                    </div>

                    {discount > 0 && (
                      <div className="flex items-center justify-between text-emerald-700 font-bold">
                        <span>{language === 'ar' ? 'خصم الكوبون المطبق' : 'Promo Discount'}</span>
                        <span className="font-mono">-{formatPrice(discount)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-slate-600">
                      <span>{language === 'ar' ? 'رسوم الشحن والتوصيل' : 'Shipping & Handling'}</span>
                      <span className="font-bold text-slate-900">
                        {shippingFee === 0 ? (
                          <span className="text-emerald-700 font-black">{language === 'ar' ? 'مجاني' : 'FREE'}</span>
                        ) : (
                          formatPrice(shippingFee)
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span>{language === 'ar' ? 'ضريبة القيمة المضافة (VAT 5%)' : 'Estimated VAT (5%)'}</span>
                      <strong className="text-slate-900 font-mono">{formatPrice(vat)}</strong>
                    </div>

                    <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-sm">
                      <strong className="font-black text-slate-900">
                        {language === 'ar' ? 'المجموع النهائي المطلوب' : 'Total Amount Due'}
                      </strong>
                      <strong className="text-lg font-black text-blue-700 font-mono">
                        {formatPrice(finalTotal)}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: Confirmed Order Celebration */}
          {step === 2 && (
            <div className="py-6 text-center space-y-5 animate-scaleUp">
              <div className="w-18 h-18 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-200 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                  {language === 'ar' ? 'تم تأكيد المعاملة والطلب بنجاح!' : 'Transaction & Order Confirmed!'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {language === 'ar' ? 'تم استلام طلب قطع الغيار وتجهيزه للشحن' : 'Your Spare Parts Order is Being Prepared'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {language === 'ar'
                    ? `رقم الطلب الخاص بك هو (${confirmedOrderId}). تم إرسال إشعار للمورد لبدء التجهيز والتوصيل إلى ${city}.`
                    : `Your order reference is (${confirmedOrderId}). The supplier has been notified to dispatch the parts to ${city}.`}
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-start space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'رقم المعاملة والطلب:' : 'Order Reference:'}</span>
                  <strong className="font-mono font-black text-blue-700 text-sm bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {confirmedOrderId}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'المستلم:' : 'Recipient:'}</span>
                  <span className="font-bold text-slate-900">{recipientName} ({phone})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'وجهة التوصيل:' : 'Destination:'}</span>
                  <span className="font-bold text-slate-900">{city} • {address}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'طريقة الاستلام:' : 'Delivery Mode:'}</span>
                  <span className="font-bold text-slate-900">
                    {deliveryMode === 'courier'
                      ? language === 'ar'
                        ? 'توصيل سريع للباب 🚚'
                        : 'Express Courier 🚚'
                      : language === 'ar'
                      ? 'استلام وتركيب بالورشة 🏢'
                      : 'Workshop Fitting 🏢'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}</span>
                  <span className="font-bold text-slate-900">
                    {paymentMethod === 'cod' ? (language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery') : (language === 'ar' ? 'بطاقة بنكية / أبل باي' : 'Credit Card / Apple Pay')}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-2 flex items-center justify-between">
                  <span className="text-slate-600 font-bold">{language === 'ar' ? 'المبلغ الإجمالي المدفوع:' : 'Total Amount Paid:'}</span>
                  <strong className="text-base font-black text-blue-700 font-mono">
                    {formatPrice(finalTotal)}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'ar' ? `تأكيد الشراء الفوري (${formatPrice(finalTotal)})` : `Place Order & Pay (${formatPrice(finalTotal)})`}</span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
              >
                {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
              </button>

              <button
                type="button"
                onClick={handleViewMyOrders}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Package className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'استعراض الطلب في قائمة طلباتي' : 'View in My Parts Orders'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
