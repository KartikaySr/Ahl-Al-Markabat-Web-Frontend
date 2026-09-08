import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Car,
  Sparkles,
  MapPin,
  Star,
  Phone,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Check,
  Truck,
  Info,
  Building2,
  Lock,
  ChevronRight,
  Award,
  RotateCcw,
} from 'lucide-react';

export const QuickBookingModal: React.FC = () => {
  const {
    language,
    isBookingModalOpen,
    setIsBookingModalOpen,
    selectedProviderForBooking,
    preselectedServiceForBooking,
    providers,
    vehicles,
    user,
    formatPrice,
    createBooking,
    setActiveTab,
    setCustomerActiveTab,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // 1. Provider
  const activeProvider = selectedProviderForBooking || providers[0];

  // 2. Vehicle Selection
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    vehicles[0]?.id || 'veh-toyota-rav4'
  );
  const [customMakeModel, setCustomMakeModel] = useState('Toyota RAV4 2023');

  // 3. Service Packages
  const serviceCatalog = useMemo(
    () => [
      {
        id: 'oil',
        nameEn: 'Full Synthetic Oil & Filter Service',
        nameAr: 'باقة غيار الزيت التخليقي والفلتر الأصلي',
        descEn: '10,000 km synthetic motor oil, OEM filter + free 21-point safety inspection.',
        descAr: 'زيت محرك تخليقي ألماني 10,000 كم مع فلتر أصلي وفحص مجاني لـ 21 نقطة حيوية.',
        price: 149,
        icon: '🛢️',
      },
      {
        id: 'brakes',
        nameEn: 'Front & Rear Brake Pads Replacement',
        nameAr: 'تبديل فحمات الفرامل مع خرط الهوبات',
        descEn: 'Ceramic low-dust pads, rotor laser skimming, and electronic sensor reset.',
        descAr: 'فحمات سيراميك أصلية، خرط هوبات ليزر دقيق، وبرمجة حساسات الفرامل.',
        price: 180,
        icon: '🛑',
      },
      {
        id: 'ac',
        nameEn: 'AC Freon Recharge & Evaporator Flush',
        nameAr: 'تعبئة غاز فريون أصلي وتنظيف دورة المكيف',
        descEn: 'Original R134a/1234yf refrigerant, UV leak detection, and cabin anti-bacterial cleaning.',
        descAr: 'غاز فريون أمريكي مع فحص تسريب بالليزر وتعقيم فلتر المكيف من البكتيريا.',
        price: 120,
        icon: '❄️',
      },
      {
        id: 'diagnostics',
        nameEn: 'Comprehensive 21-Point DVI Computer Scan',
        nameAr: 'فحص كمبيوتر شامل وتشخيص رقمي DVI',
        descEn: 'Full OBD-II live telemetry scan, ECU fault code analysis, and digital video report.',
        descAr: 'فحص إلكتروني شامل لجميع الحساسات، قراءة لايف داتا، وتقرير فيديو رقمي.',
        price: 80,
        icon: '💻',
      },
      {
        id: 'hybrid',
        nameEn: 'Hybrid / EV Battery Diagnostic & Cell Balancing',
        nameAr: 'فحص بطارية الهايبرد وموازنة الخلايا',
        descEn: 'HV battery SOH assessment, inverter cooling inspection, and high-voltage safety check.',
        descAr: 'فحص كفاءة بطارية الجهد العالي (SOH)، تشخيص الانفيرتر، واختبار العزل الكهربائي.',
        price: 150,
        icon: '🔋',
      },
      {
        id: 'inspection',
        nameEn: 'Comprehensive Mechanical & Road Inspection',
        nameAr: 'فحص ميكانيكي شامل وتجربة قيادة',
        descEn: 'Underbody chassis, suspension, drivetrain inspection, and technical assessment.',
        descAr: 'فحص كامل للشاسيه والمساعدين، منظومة الدفع وناقل الحركة، مع تقرير هندسي.',
        price: 90,
        icon: '🔍',
      },
    ],
    []
  );

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceForBooking || 'oil'
  );

  // 4. Date & Time Selection
  const availableDates = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      list.push({
        dayNameAr: i === 0 ? 'اليوم' : i === 1 ? 'غداً' : d.toLocaleDateString('ar-EG', { weekday: 'short' }),
        dayNameEn: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateStr: d.toISOString().split('T')[0],
        formattedAr: d.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' }),
        formattedEn: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      });
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState(availableDates[0]?.dateStr || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM');
  const [serviceMode, setServiceMode] = useState<'workshop' | 'pickup'>('workshop');

  // 5. Contact & Notes & Payment
  const [customerName, setCustomerName] = useState(user?.name || 'Ahmed Al-Mansoor');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+971 50 123 4567');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'workshop' | 'card'>('workshop');

  // Sync initial service if changed
  useEffect(() => {
    if (preselectedServiceForBooking) {
      setSelectedServiceId(preselectedServiceForBooking);
    }
  }, [preselectedServiceForBooking]);

  // Reset step when opening
  useEffect(() => {
    if (isBookingModalOpen) {
      setStep(1);
    }
  }, [isBookingModalOpen]);

  if (!isBookingModalOpen || !activeProvider) return null;

  const currentService =
    serviceCatalog.find((s) => s.id === selectedServiceId) || serviceCatalog[0];
  const selectedVehicleObj = vehicles.find((v) => v.id === selectedVehicleId);
  const vehicleLabel = selectedVehicleObj
    ? `${selectedVehicleObj.make} ${selectedVehicleObj.model} (${selectedVehicleObj.year})`
    : customMakeModel;

  const handleConfirmBooking = () => {
    const bookingId = createBooking({
      providerId: activeProvider.id,
      providerName: language === 'ar' ? activeProvider.businessNameAr : activeProvider.businessNameEn,
      providerImage: activeProvider.image,
      serviceId: currentService.id,
      serviceName: language === 'ar' ? currentService.nameAr : currentService.nameEn,
      vehicleDetails: vehicleLabel,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      serviceMode:
        serviceMode === 'pickup'
          ? language === 'ar'
            ? 'استلام وتوصيل مجاني من الباب'
            : 'Doorstep Valet Pickup'
          : language === 'ar'
          ? 'زيارة مركز الصيانة'
          : 'Workshop Visit',
      price: currentService.price,
      customerName,
      customerPhone,
      notes,
    });

    setConfirmedBookingId(bookingId);
    setStep(4);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    showToast(
      language === 'ar'
        ? `تم تأكيد حجز موعدك بنجاح! رقم المرجع: ${bookingId}`
        : `Booking confirmed successfully! Ref: ${bookingId}`,
      'success'
    );
  };

  const handleClose = () => {
    setIsBookingModalOpen(false);
  };

  const handleViewInBookings = () => {
    setIsBookingModalOpen(false);
    setCustomerActiveTab('bookings');
    setActiveTab('customer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  {language === 'ar' ? 'حجز فوري مؤكد' : 'Instant Direct Booking'}
                </span>
                <span className="text-slate-400 text-xs font-bold">
                  {step < 4 ? `${language === 'ar' ? 'خطوة' : 'Step'} ${step} / 3` : (language === 'ar' ? 'مكتمل 🎉' : 'Confirmed 🎉')}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                {language === 'ar' ? 'حجز موعد صيانة بالورشة' : 'Book Service Appointment'}
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

        {/* Selected Workshop Banner (Always visible in steps 1-3) */}
        {step < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-5 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={activeProvider.image}
                alt={activeProvider.businessNameEn}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/garage_autotech.jpg';
                }}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <strong className="text-xs sm:text-sm font-black text-slate-900 block">
                    {language === 'ar' ? activeProvider.businessNameAr : activeProvider.businessNameEn}
                  </strong>
                  {activeProvider.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  {language === 'ar' ? activeProvider.addressAr : activeProvider.addressEn}
                </span>
              </div>
            </div>

            <div className="text-end shrink-0 hidden sm:block">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black">
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>{activeProvider.rating}</span>
              </div>
              <span className="text-[10px] text-emerald-600 block font-bold mt-0.5">
                ● {language === 'ar' ? 'متاح الآن' : 'Available Now'}
              </span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 slim-scrollbar">
          {/* STEP 1: Vehicle & Service Package */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              {/* Vehicle Picker */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ar' ? '1. اختر المركبة المطلوب صيانتها:' : '1. Select Vehicle to Service:'}</span>
                </label>

                {vehicles && vehicles.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {vehicles.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          selectedVehicleId === v.id
                            ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img
                          src={v.image}
                          alt={v.model}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/vehicles/toyota_camry.png';
                          }}
                          className="w-12 h-10 rounded-lg object-contain bg-slate-50 border border-slate-100 p-1 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <strong className="text-xs font-black text-slate-900 block truncate">
                            {v.make} {v.model}
                          </strong>
                          <span className="text-[10px] text-slate-500 font-bold block">
                            {v.year} • {v.plateNumber || 'Palestine'}
                          </span>
                        </div>
                        {selectedVehicleId === v.id && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={customMakeModel}
                    onChange={(e) => setCustomMakeModel(e.target.value)}
                    placeholder="e.g. Toyota RAV4 2023, BMW 520i..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                )}
              </div>

              {/* Service Package Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ar' ? '2. اختر باقة الصيانة المطلوبة:' : '2. Select Service Package:'}</span>
                </label>

                <div className="grid grid-cols-1 gap-2.5">
                  {serviceCatalog.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedServiceId(pkg.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        selectedServiceId === pkg.id
                          ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
                          {pkg.icon}
                        </span>
                        <div>
                          <strong className="text-xs sm:text-sm font-black text-slate-900 block">
                            {language === 'ar' ? pkg.nameAr : pkg.nameEn}
                          </strong>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {language === 'ar' ? pkg.descAr : pkg.descEn}
                          </p>
                        </div>
                      </div>

                      <div className="text-end shrink-0">
                        <span className="text-sm font-black text-blue-700 block">
                          {formatPrice ? formatPrice(pkg.price) : `$${pkg.price}`}
                        </span>
                        <span className="text-[9px] text-slate-400 block font-bold">
                          {language === 'ar' ? 'شامل الفحص والضمان' : 'Incl. Warranty'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Delivery Mode */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ar' ? '1. اختر تاريخ الموعد:' : '1. Select Appointment Date:'}</span>
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((d) => (
                    <button
                      key={d.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedDate === d.dateStr
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-black'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] uppercase block opacity-80 font-bold">
                        {language === 'ar' ? d.dayNameAr : d.dayNameEn}
                      </span>
                      <strong className="text-xs font-black block mt-0.5">
                        {language === 'ar' ? d.formattedAr : d.formattedEn}
                      </strong>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ar' ? '2. اختر التوقيت المناسب:' : '2. Select Preferred Time Slot:'}</span>
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {[
                    '08:30 AM',
                    '10:00 AM',
                    '11:30 AM',
                    '01:30 PM',
                    '03:00 PM',
                    '04:30 PM',
                    '06:00 PM',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                        selectedTimeSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600 font-black shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Delivery Mode */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ar' ? '3. طريقة الخدمة والاستلام:' : '3. Service Delivery Mode:'}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setServiceMode('workshop')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      serviceMode === 'workshop'
                        ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-xs font-black text-slate-900 block">
                        {language === 'ar' ? 'زيارة مركز الصيانة' : 'Workshop Visit'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block">
                        {language === 'ar' ? 'إحضار المركبة للمركز مباشرة' : 'Drive vehicle to the repair center'}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setServiceMode('pickup')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      serviceMode === 'pickup'
                        ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-xs font-black text-slate-900 block">
                          {language === 'ar' ? 'استلام وتوصيل مجاني' : 'Free Doorstep Valet'}
                        </strong>
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[8px] font-black">
                          {language === 'ar' ? 'مجاناً' : 'FREE'}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        {language === 'ar' ? 'استلام المركبة من منزلك وإعادتها' : 'Pickup from your home and return'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Contact, Notes & Payment Choice */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">
                    {language === 'ar' ? 'اسم العميل:' : 'Customer Name:'}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">
                    {language === 'ar' ? 'رقم الهاتف / واتساب:' : 'Phone / WhatsApp:'}
                  </label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">
                  {language === 'ar' ? 'ملاحظات أو أعطال محددة للميكانيكي (اختياري):' : 'Specific Notes / Symptoms (Optional):'}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: يوجد صوت طقة خفيف عند الضغط على الفرامل في السرعات البطيئة...' : 'e.g. Squeaking noise when braking at low speed...'}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>{language === 'ar' ? 'طريقة الدفع المفضلة:' : 'Payment Method:'}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('workshop')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      paymentMethod === 'workshop'
                        ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-100 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="text-xs font-black text-slate-900 block">
                        {language === 'ar' ? 'الدفع في مركز الصيانة' : 'Pay at Workshop'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block">
                        {language === 'ar' ? 'نقداً أو بالبطاقة بعد إتمام الصيانة' : 'Cash or Card after service'}
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
                        {language === 'ar' ? 'بطاقة بنكية / أبل باي' : 'Card / Apple Pay'}
                      </strong>
                      <span className="text-[10px] text-slate-500 block">
                        {language === 'ar' ? 'دفع إلكتروني آمن مع ضمان المنصة' : 'Secure instant checkout'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>{language === 'ar' ? 'قيمة الخدمة الأساسية' : 'Service Package Price'}</span>
                  <span className="font-bold text-slate-900">
                    {formatPrice ? formatPrice(currentService.price) : `$${currentService.price}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>{language === 'ar' ? 'ضريبة القيمة المضافة (VAT)' : 'Estimated VAT'}</span>
                  <span className="font-bold text-slate-900">{formatPrice ? formatPrice(0) : '$0'}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-bold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'رسوم حماية الضمان والمنصة' : 'Platform & Warranty Fee'}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    {language === 'ar' ? 'مجاني 0%' : 'FREE 0%'}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-sm">
                  <strong className="font-black text-slate-900">
                    {language === 'ar' ? 'المجموع النهائي المستحق' : 'Total Amount'}
                  </strong>
                  <strong className="text-base font-black text-blue-700">
                    {formatPrice ? formatPrice(currentService.price) : `$${currentService.price}`}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmed Celebration */}
          {step === 4 && (
            <div className="py-6 text-center space-y-5 animate-scaleUp">
              <div className="w-18 h-18 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg border-2 border-emerald-200 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                  {language === 'ar' ? 'تم تأكيد موعد الصيانة بنجاح!' : 'Booking Confirmed Successfully!'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {language === 'ar' ? 'شكراً لاختيارك منصة أهل المركبات' : 'Thank You for Booking with Ahl Al Markabat'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {language === 'ar'
                    ? `تم إرسال تفاصيل الحجز للمركز، وسيقوم مسؤول الخدمة بالتواصل معك لتأكيد الاستلام في الموعد المحدد.`
                    : `Your booking details have been sent to the service center. A service advisor will contact you shortly.`}
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-start space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'رقم الحجز المرجعي:' : 'Booking Reference:'}</span>
                  <strong className="font-mono font-black text-blue-700 text-sm bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                    {confirmedBookingId}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'المركز:' : 'Workshop:'}</span>
                  <span className="font-bold text-slate-900">
                    {language === 'ar' ? activeProvider.businessNameAr : activeProvider.businessNameEn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'الخدمة:' : 'Service:'}</span>
                  <span className="font-bold text-slate-900">
                    {language === 'ar' ? currentService.nameAr : currentService.nameEn}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'الموعد:' : 'Date & Time:'}</span>
                  <span className="font-bold text-slate-900">
                    {selectedDate} @ {selectedTimeSlot}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'ar' ? 'طريقة الاستلام:' : 'Delivery Mode:'}</span>
                  <span className="font-bold text-slate-900">
                    {serviceMode === 'pickup'
                      ? language === 'ar'
                        ? 'استلام وتوصيل مجاني 🚗'
                        : 'Free Doorstep Valet 🚗'
                      : language === 'ar'
                      ? 'زيارة المركز 🏢'
                      : 'Workshop Visit 🏢'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer / Navigation */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-200 flex items-center justify-between gap-3">
          {step === 1 && (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>{language === 'ar' ? 'متابعة لاختيار التاريخ والوقت' : 'Continue to Date & Time'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'رجوع' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>{language === 'ar' ? 'متابعة لتأكيد الحجز والدفع' : 'Continue to Review & Book'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'رجوع' : 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmBooking}
                className="px-7 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تأكيد الحجز الفوري' : 'Confirm & Book Appointment'}</span>
              </button>
            </>
          )}

          {step === 4 && (
            <div className="w-full flex flex-col sm:flex-row items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
              >
                {language === 'ar' ? 'إغلاق والعودة للورش' : 'Close & Back to Workshops'}
              </button>

              <button
                type="button"
                onClick={handleViewInBookings}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'استعراض الحجز في قسم الحجوزات' : 'View in My Bookings Tab'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
