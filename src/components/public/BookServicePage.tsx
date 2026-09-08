import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Car,
  Wrench,
  Building2,
  Calendar,
  Clock,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronDown,
  Info,
  DollarSign,
  Award,
  Phone,
  ThumbsUp,
  MapPin,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Lock,
  User,
  Sparkles,
  Truck,
  RotateCcw,
  Search,
  Check,
  Filter,
} from 'lucide-react';
import {
  POPULAR_VEHICLE_MAKES,
  VEHICLE_YEARS,
  ENGINE_TYPES,
  VehicleBrand,
} from '../../data/vehicleDatabase';
import { BrandEmblem } from '../common/BrandEmblem';

export const BookServicePage: React.FC = () => {
  const {
    language,
    setActiveTab,
    setIsQuoteModalOpen,
    setIsAIAssistantOpen,
    showToast,
    formatPrice,
    selectedCountry,
    providers,
    vehicles,
    selectedVehicle,
    selectedProviderForBooking,
    preselectedServiceForBooking,
    isAuthenticated,
    user,
    login,
    registerUser,
    createBooking,
  } = useApp();

  const [currentStep, setCurrentStep] = useState(1);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // Step 1: Searchable Vehicle Database & Selector
  const [vehicleSelectionMode, setVehicleSelectionMode] = useState<'search' | 'garage'>('search');
  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState(0);
  const [selectedMake, setSelectedMake] = useState('Toyota');
  const [selectedModel, setSelectedModel] = useState('RAV4');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedEngine, setSelectedEngine] = useState('hybrid');
  const [plate, setPlate] = useState('');
  const [mileage, setMileage] = useState('42,000');
  const [vehicleSearchQuery, setVehicleSearchQuery] = useState('');
  const [customModelInput, setCustomModelInput] = useState('');

  // Step 2: Service
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceForBooking || 'oil');

  // Step 3: Provider
  const availableProviders = providers;
  const initialProvider =
    selectedProviderForBooking ||
    availableProviders[0] ||
    providers[0];
  const [selectedProvider, setSelectedProvider] = useState(initialProvider);

  // Step 4: Date
  const generateDates = () => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
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
  };
  const availableDates = generateDates();
  const [selectedDate, setSelectedDate] = useState(availableDates[0].dateStr);

  // Step 5: Time slot & Service mode
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('10:00 AM');
  const [serviceMode, setServiceMode] = useState<'workshop' | 'pickup'>('workshop');

  // Step 6: Notes & Auth Gate Form
  const [notes, setNotes] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authPhone, setAuthPhone] = useState('591234567');
  const [authEmail, setAuthEmail] = useState('customer@example.com');
  const [authPassword, setAuthPassword] = useState('123456');
  const [authFullName, setAuthFullName] = useState('عمر عبد الله');

  // FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Sync pre-selections if opened from Directory
  useEffect(() => {
    if (selectedProviderForBooking) {
      setSelectedProvider(selectedProviderForBooking);
    }
    if (preselectedServiceForBooking) {
      setSelectedServiceId(preselectedServiceForBooking);
    }
  }, [selectedProviderForBooking, preselectedServiceForBooking]);

  const steps = [
    { num: 1, labelEn: 'Vehicle', labelAr: 'المركبة' },
    { num: 2, labelEn: 'Service', labelAr: 'الخدمة' },
    { num: 3, labelEn: 'Workshop', labelAr: 'الورشة' },
    { num: 4, labelEn: 'Date', labelAr: 'التاريخ' },
    { num: 5, labelEn: 'Time & Mode', labelAr: 'الوقت وطريقة الاستلام' },
    { num: 6, labelEn: 'Confirm & Book', labelAr: 'تأكيد الحجز' },
  ];

  const servicesCatalog = [
    {
      id: 'oil',
      nameEn: 'Synthetic Oil & Filter Package',
      nameAr: 'باقة غيار الزيت التخليقي والفلتر الأصلي',
      descEn: 'Premium 10,000 km synthetic motor oil, genuine OEM filter & 21-point safety inspection.',
      descAr: 'زيت محرك تخليقي ألماني 10,000 كم مع فلتر أصلي وفحص مجاني لـ 21 نقطة حيوية.',
      price: 149,
      durationEn: '30-45 mins',
      durationAr: '30-45 دقيقة',
      img: '/images/categories/oil_filters_quick.jpg',
      badgeAr: 'الأكثر طلباً',
      badgeEn: 'Most Popular',
    },
    {
      id: 'brakes',
      nameEn: 'Brake Inspection & Ceramic Pads',
      nameAr: 'فحص واستبدال فحمات الفرامل مع خراطة الهوبات',
      descEn: 'Front/rear ceramic brake pad installation, rotor resurfacing, and brake fluid check.',
      descAr: 'تركيب فحمات سيراميك عالية الأداء مع خراطة هوبات ليزر وفحص زيت الفرامل الهيدروليكي.',
      price: 220,
      durationEn: '45-60 mins',
      durationAr: '45-60 دقيقة',
      img: '/images/categories/brake_systems.jpg',
      badgeAr: 'أمان معتمد',
      badgeEn: 'Certified Safety',
    },
    {
      id: 'prog',
      nameEn: 'Computer Diagnostics & OBD-II Scan',
      nameAr: 'فحص شامل بالكمبيوتر وبرمجة الأعطال OBD-II',
      descEn: 'Full electronic diagnostic scan, sensor live stream, reset check engine light & error codes.',
      descAr: 'فحص إلكتروني متكامل لجميع كمبيوترات السيارة (ECU/TCU/ABS) ومسح وقراءة الأعطال.',
      price: 120,
      durationEn: '30 mins',
      durationAr: '30 دقيقة',
      img: '/images/categories/diagnostics_programming.jpg',
      badgeAr: 'فحص دقيق',
      badgeEn: 'Deep Scan',
    },
    {
      id: 'ac',
      nameEn: 'AC Service & R134a Gas Recharge',
      nameAr: 'صيانة التكييف وتعبئة غاز فريون R134a',
      descEn: 'Refrigerant recharge, cabin microfilter clean, leak dye check, and compressor performance test.',
      descAr: 'سحب وتعبئة غاز الفريون بمحطة روبنير الرقمية مع كشف التسريبات وفحص كفاءة الكومبريسور.',
      price: 180,
      durationEn: '40 mins',
      durationAr: '40 دقيقة',
      img: '/images/categories/cooling_ac.jpg',
      badgeAr: 'تبريد صيفي',
      badgeEn: 'Summer Cooling',
    },
    {
      id: 'hybrid',
      nameEn: 'Hybrid & EV High-Voltage Service',
      nameAr: 'فحص وصيانة بطاريات الهايبرد ونظام الشحن',
      descEn: 'High-voltage traction battery health report, cell balancing, inverter check, cooling fan clean.',
      descAr: 'فحص كفاءة خلايا بطارية الهايبرد وعزل الجهد العالي وصيانة مروحة تبريد البطارية.',
      price: 350,
      durationEn: '60-90 mins',
      durationAr: '60-90 دقيقة',
      img: '/images/categories/hybrid_services.jpg',
      badgeAr: 'فنيين معتمدين',
      badgeEn: 'EV Certified',
    },
    {
      id: 'transmission',
      nameEn: 'Transmission Fluid & Mechatronic Check',
      nameAr: 'تغيير زيت ناقل الحركة مع الفحص الميكاتروني',
      descEn: 'ATF automatic/CVT fluid flush, filter gasket replacement, and shift calibration.',
      descAr: 'غيار زيت الجير الأوتوماتيك أو CVT بجهاز الضغط مع تبديل الفلتر وبرمجة نقلات السرعة.',
      price: 290,
      durationEn: '60 mins',
      durationAr: '60 دقيقة',
      img: '/images/categories/transmission_gearbox.jpg',
      badgeAr: 'حماية القير',
      badgeEn: 'Gearbox Care',
    },
  ];

  const selectedServiceObj =
    servicesCatalog.find((s) => s.id === selectedServiceId) || servicesCatalog[0];

  const currentEngineObj = ENGINE_TYPES.find((e) => e.id === selectedEngine) || ENGINE_TYPES[0];
  const currentVehicleSummary =
    vehicleSelectionMode === 'garage' && vehicles.length > 0 && vehicles[selectedVehicleIdx]
      ? `${vehicles[selectedVehicleIdx]?.make} ${vehicles[selectedVehicleIdx]?.model} (${vehicles[selectedVehicleIdx]?.year})`
      : `${selectedYear} ${selectedMake} ${customModelInput || selectedModel} (${language === 'ar' ? currentEngineObj.nameAr : currentEngineObj.nameEn})`;

  const currentVehiclePlate =
    vehicleSelectionMode === 'garage' && vehicles.length > 0 && vehicles[selectedVehicleIdx]
      ? vehicles[selectedVehicleIdx]?.plateNumber || '12345'
      : plate || (language === 'ar' ? 'غير محدد' : 'Unspecified');

  const currentBrandObj = POPULAR_VEHICLE_MAKES.find((b) => b.name === selectedMake);
  const currentUnitObj = currentBrandObj?.sampleUnits?.find((u) => u.name.toLowerCase() === selectedModel.toLowerCase());
  const currentVehicleImage =
    vehicleSelectionMode === 'garage' && vehicles.length > 0 && vehicles[selectedVehicleIdx]
      ? vehicles[selectedVehicleIdx]?.image || '/images/categories/gasoline_engine.jpg'
      : currentUnitObj?.image || currentBrandObj?.image || '/images/vehicles/toyota_rav4.jpg';

  const pickupFee = serviceMode === 'pickup' ? 35 : 0;
  const subtotalPrice = selectedServiceObj.price + pickupFee;
  const vatAmount = Math.round(subtotalPrice * 0.05);
  const finalTotalPrice = subtotalPrice + vatAmount;

  // Execute Final Booking (With Auth Check)
  const handleFinalBookingSubmit = () => {
    // If not authenticated, ensure user authenticates first
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

    // Now execute booking
    const bookingId = createBooking({
      providerId: selectedProvider.id,
      providerName: language === 'ar' ? selectedProvider.businessNameAr : selectedProvider.businessNameEn,
      providerImage: selectedProvider.image,
      serviceId: selectedServiceObj.id,
      serviceName: language === 'ar' ? selectedServiceObj.nameAr : selectedServiceObj.nameEn,
      vehicleDetails: currentVehicleSummary,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      serviceMode: serviceMode === 'pickup' ? 'Mobile Pickup & Delivery' : 'Workshop Bay Drop-off',
      price: finalTotalPrice,
      customerName: user?.name || authFullName || 'عمر عبد الله',
      customerPhone: user?.phone || authPhone || '+970 59 123 4567',
      notes,
    });

    setConfirmedBookingId(bookingId);
    setIsBookingConfirmed(true);
    showToast(
      language === 'ar'
        ? `🎉 تم تأكيد حجزك برقم (${bookingId}) بنجاح!`
        : `🎉 Booking confirmed with reference (${bookingId})!`,
      'success'
    );
  };

  const timeSlots = [
    { time: '08:30 AM', labelAr: 'صباحاً', labelEn: 'Morning' },
    { time: '10:00 AM', labelAr: 'صباحاً', labelEn: 'Morning' },
    { time: '11:30 AM', labelAr: 'ظهراً', labelEn: 'Morning' },
    { time: '01:30 PM', labelAr: 'بعد الظهر', labelEn: 'Afternoon' },
    { time: '03:00 PM', labelAr: 'بعد الظهر', labelEn: 'Afternoon' },
    { time: '04:30 PM', labelAr: 'عصراً', labelEn: 'Late Afternoon' },
    { time: '06:00 PM', labelAr: 'مساءً', labelEn: 'Evening' },
  ];

  const faqs = [
    {
      qEn: 'Can I cancel or reschedule my service appointment?',
      qAr: 'هل يمكنني إلغاء أو تعديل موعد الصيانة؟',
      aEn: 'Yes, you can easily reschedule or cancel without charge up to 2 hours prior to your scheduled time via your Customer Dashboard.',
      aAr: 'نعم بكل سهولة! يمكنك تعديل الموعد أو إلغاؤه مجاناً حتى ساعتين قبل الموعد من خلال صفحة حجوزاتي.',
    },
    {
      qEn: 'What is the Pick-up & Return service?',
      qAr: 'كيف تعمل خدمة الاستلام وإعادة المركبة إلى المنزل؟',
      aEn: 'A certified Ahl Al Markabat driver will arrive at your address, inspect the car with you, take it to the workshop, and return it cleaned once complete.',
      aAr: 'يقوم مندوب معتمد باستلام السيارة من باب بيتك أو عملك، وأخذها للمركز ومتابعة الصيانة، ثم إعادتها إليك جاهزة.',
    },
    {
      qEn: 'When and how do I pay for the service?',
      qAr: 'متى وكيف أقوم بدفع قيمة الصيانة؟',
      aEn: 'You do not pay upfront! Payment is completed only after your vehicle is fully serviced and inspected at the garage, via cash or card.',
      aAr: 'لا تدفع مسبقاً! يتم الدفع فقط بعد إتمام الصيانة واستلامك لسيارتك وفحصها نقداً أو ببطاقة الائتمان.',
    },
  ];

  // -------------------------------------------------------------
  // RENDER: BOOKING CONFIRMED SUCCESS SCREEN
  // -------------------------------------------------------------
  if (isBookingConfirmed) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
              {language === 'ar' ? 'تم تأكيد الحجز بنجاح' : 'Booking Confirmed'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'ar' ? 'شكراً لك! تم حجز موعدك بنجاح' : 'Thank You! Your Service is Booked'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {language === 'ar'
                ? 'تم إرسال تفاصيل الحجز للمركز المعتمد وتأكيد الموعد في سجل صيانة مركبتك.'
                : 'Your booking has been registered with the workshop and added to your digital vehicle passport.'}
            </p>
          </div>

          {/* Booking Summary Ticket Card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-5 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  {language === 'ar' ? 'رقم مرجع الحجز' : 'Booking Reference'}
                </span>
                <strong className="text-xl font-mono text-amber-400 font-black">{confirmedBookingId}</strong>
              </div>
              <div className="text-end">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  {language === 'ar' ? 'حالة الحجز' : 'Status'}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                  ● {language === 'ar' ? 'مؤكد ومجدول' : 'Confirmed & Scheduled'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المركبة:' : 'Vehicle:'}</span>
                <strong className="text-white block font-bold">{currentVehicleSummary}</strong>
                <span className="text-[10px] text-slate-400 font-mono">لوحة: {currentVehiclePlate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الخدمة المطلوبة:' : 'Service:'}</span>
                <strong className="text-white block font-bold">
                  {language === 'ar' ? selectedServiceObj.nameAr : selectedServiceObj.nameEn}
                </strong>
                <span className="text-[10px] text-emerald-400 font-bold">✓ تشمل الفحص الشامل والضمان</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المركز المعتمد:' : 'Workshop:'}</span>
                <strong className="text-white block font-bold">
                  {language === 'ar' ? selectedProvider.businessNameAr : selectedProvider.businessNameEn}
                </strong>
                <span className="text-[10px] text-slate-400 block">{selectedProvider.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'تاريخ ووقت الموعد:' : 'Appointment:'}</span>
                <strong className="text-amber-400 block font-mono text-sm">{selectedDate} • {selectedTimeSlot}</strong>
                <span className="text-[10px] text-slate-400 block">
                  {serviceMode === 'pickup' ? (language === 'ar' ? 'استلام من موقعك' : 'Pickup from your address') : (language === 'ar' ? 'استلام في الورشة' : 'Workshop drop-off')}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
              <span className="text-slate-300 font-bold">{language === 'ar' ? 'الإجمالي المتوقع:' : 'Estimated Total:'}</span>
              <span className="text-xl font-black font-mono text-amber-400">{formatPrice(finalTotalPrice)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setActiveTab('track-booking')}
              className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-4 h-4" />
              <span>{language === 'ar' ? 'تتبع الحجز على الخريطة' : 'Track on Live Map'}</span>
            </button>

            <button
              onClick={() => setActiveTab('customer')}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Car className="w-4 h-4" />
              <span>{language === 'ar' ? 'عرض في كراجي' : 'View in My Garage'}</span>
            </button>

            <button
              onClick={() => {
                setIsBookingConfirmed(false);
                setCurrentStep(1);
              }}
              className="py-3 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Wrench className="w-4 h-4" />
              <span>{language === 'ar' ? 'حجز موعد جديد' : 'Book Another'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN STEP-BY-STEP WIZARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 space-y-8">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#09152B] text-white py-10 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto space-y-3">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {language === 'ar' ? 'الرئيسية > حجز موعد صيانة' : 'Home > Book a Service'}
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {language === 'ar' ? 'حجز موعد صيانة فورية' : 'Book Auto Service'}{' '}
                <span className="text-amber-400">
                  {language === 'ar' ? 'بـ 6 خطوات بسيطة' : 'in 6 Simple Steps'}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                {language === 'ar'
                  ? 'اختر مركبتك ونوع الخدمة والورشة المعتمدة وحدد موعدك بكل سهولة وشفافية وبدون رسوم خفية.'
                  : 'Select your vehicle, service, and preferred certified workshop with 100% price transparency.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center space-y-0.5 shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold">
                {language === 'ar' ? 'معدل رضا العملاء' : 'Customer Satisfaction'}
              </span>
              <strong className="text-2xl font-black text-amber-400 block font-mono">4.9 / 5.0 ★</strong>
              <span className="text-[11px] text-slate-300 font-bold block">
                {language === 'ar' ? 'أكثر من 25,000 موعد منجز' : '25,000+ Completed Bookings'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 6-Step Multi-Step Progress Tracker */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between overflow-x-auto pb-2 text-xs font-bold text-slate-500 scrollbar-none gap-2">
            {steps.map((s) => {
              const isActive = currentStep === s.num;
              const isPast = currentStep > s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => setCurrentStep(s.num)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white font-black shadow-sm'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                      isActive
                        ? 'bg-white text-blue-600'
                        : isPast
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isPast ? '✓' : s.num}
                  </span>
                  <span>{language === 'ar' ? s.labelAr : s.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* STEP 1: CHOOSE VEHICLE */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>🚗</span>
                    <span>{language === 'ar' ? 'الخطوة 1: حدد أو ابحث عن سيارتك' : 'Step 1: Search & Select Your Vehicle'}</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'اختر من قاعدة بيانات كافة الماركات والموديلات العالمية أو من كراجك المحفوظ'
                      : 'Search across 24+ global manufacturers and models or pick from your garage'}
                  </p>
                </div>

                {isAuthenticated && vehicles.length > 0 && (
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold shrink-0">
                    <button
                      type="button"
                      onClick={() => setVehicleSelectionMode('search')}
                      className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                        vehicleSelectionMode === 'search' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
                      }`}
                    >
                      <Search className="w-3.5 h-3.5 text-blue-600" />
                      <span>{language === 'ar' ? 'بحث واختيار سيارة' : 'Search All Cars'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVehicleSelectionMode('garage')}
                      className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                        vehicleSelectionMode === 'garage' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
                      }`}
                    >
                      <span>🚗</span>
                      <span>{language === 'ar' ? 'من كراجي المسجل' : 'From My Garage'} ({vehicles.length})</span>
                    </button>
                  </div>
                )}
              </div>

              {/* SEARCH & CASCADING SELECTOR VIEW */}
              {vehicleSelectionMode === 'search' ? (
                <div className="space-y-6">
                  {/* Quick Filter Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={vehicleSearchQuery}
                      onChange={(e) => setVehicleSearchQuery(e.target.value)}
                      placeholder={
                        language === 'ar'
                          ? 'ابحث بالاسم أو الموديل (مثال: تويوتا راف فور، هيونداي توسان، مرسيدس C200، جولف...)'
                          : 'Search by make or model (e.g. Toyota RAV4, Hyundai Tucson, Mercedes C200, Golf...)'
                      }
                      className="w-full ps-10 pe-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 outline-none transition-all shadow-2xs"
                    />
                    {vehicleSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setVehicleSearchQuery('')}
                        className="absolute end-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* 1. Manufacturer / Brand Selector Grid/Pills */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                      {language === 'ar' ? '1. اختر الشركة المصنعة (الماركة):' : '1. Select Vehicle Manufacturer / Make:'}
                    </label>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                      {POPULAR_VEHICLE_MAKES.filter((b) => {
                        if (!vehicleSearchQuery) return true;
                        const q = vehicleSearchQuery.toLowerCase();
                        return (
                          b.name.toLowerCase().includes(q) ||
                          b.nameAr.includes(q) ||
                          b.popularModels.some((m) => m.toLowerCase().includes(q))
                        );
                      }).map((brand) => {
                        const isSelected = selectedMake === brand.name;
                        return (
                          <button
                            key={brand.id}
                            type="button"
                            onClick={() => {
                              setSelectedMake(brand.name);
                              setSelectedModel(brand.popularModels[0] || 'Standard');
                              setCustomModelInput('');
                            }}
                            className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 group relative ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-xl bg-slate-100/80 group-hover:bg-white flex items-center justify-center p-1 transition-all group-hover:scale-110 shadow-2xs">
                              <BrandEmblem brandId={brand.id} className="w-6 h-6" size={24} />
                            </div>
                            <div className="w-full text-center">
                              <span className="text-xs font-black text-slate-900 truncate block leading-tight">
                                {language === 'ar' ? brand.nameAr : brand.name}
                              </span>
                              <span className="text-[9px] text-slate-400 font-medium truncate block mt-0.5">{brand.country}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. DEDICATED VISUAL 5-CAR SHOWCASE FOR SELECTED BRAND */}
                  {(() => {
                    const currentBrand = POPULAR_VEHICLE_MAKES.find((b) => b.name === selectedMake) || POPULAR_VEHICLE_MAKES[0];
                    const unitsToShow =
                      currentBrand.sampleUnits && currentBrand.sampleUnits.length > 0
                        ? currentBrand.sampleUnits
                        : currentBrand.popularModels.slice(0, 5).map((m) => ({
                            name: m,
                            nameAr: m,
                            type: 'Popular Lineup',
                            typeAr: 'فئة معتمدة',
                            image: currentBrand.image || '/images/vehicles/toyota_rav4.jpg',
                            defaultEngine: 'gasoline' as const,
                          }));

                    return (
                      <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 text-white space-y-3 shadow-lg animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BrandEmblem brandId={currentBrand.id} className="w-5 h-5 text-white" size={20} />
                            <h3 className="text-xs font-black text-white">
                              {language === 'ar'
                                ? `أشهر 5 سيارات وموديلات ${currentBrand.nameAr} (اختر سيارتك مباشرة):`
                                : `Top 5 ${currentBrand.name} Models (Click to Instant Pick):`}
                            </h3>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {language === 'ar' ? '5 سيارات متوفرة' : '5 Units Available'}
                          </span>
                        </div>

                        {/* 5 Clickable Visual Unit Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                          {unitsToShow.map((unit) => {
                            const isUnitSelected = selectedModel === unit.name;
                            return (
                              <div
                                key={unit.name}
                                onClick={() => {
                                  setSelectedModel(unit.name);
                                  if (unit.defaultEngine) setSelectedEngine(unit.defaultEngine);
                                  setCustomModelInput('');
                                }}
                                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 group relative ${
                                  isUnitSelected
                                    ? 'border-blue-500 bg-blue-900/40 ring-2 ring-blue-500/30 shadow-md scale-[1.02]'
                                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-600 hover:bg-slate-800/90'
                                }`}
                              >
                                <div className="relative overflow-hidden rounded-lg">
                                  <img
                                    src={unit.image}
                                    alt={unit.name}
                                    className="w-full h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/images/vehicles/toyota_rav4.jpg';
                                    }}
                                  />
                                  {isUnitSelected && (
                                    <div className="absolute top-1.5 end-1.5 px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-black flex items-center gap-1 shadow-xs">
                                      <Check className="w-3 h-3" />
                                      <span>{language === 'ar' ? 'محدد' : 'Selected'}</span>
                                    </div>
                                  )}
                                </div>

                                <div className="space-y-0.5">
                                  <strong className="text-xs font-black text-white block truncate">
                                    {selectedMake} {unit.name}
                                  </strong>
                                  <div className="flex items-center justify-between text-[10px]">
                                    <span className="text-slate-400 truncate">
                                      {language === 'ar' ? unit.typeAr : unit.type}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 text-[9px] font-mono font-bold">
                                      {unit.defaultEngine?.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* 3. Cascading Year, Model & Engine Pickers */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                      {language === 'ar' ? '3. تفاصيل الموديل وسنة الصنع والمحرك:' : '3. Custom Model, Year & Engine Specifications:'}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      {/* Year Picker */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          {language === 'ar' ? 'سنة الصنع (Year)' : 'Manufacturing Year'}
                        </label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600"
                        >
                          {VEHICLE_YEARS.map((yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Model Picker */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          {language === 'ar' ? `موديل ${selectedMake}` : `${selectedMake} Model`}
                        </label>
                        {(() => {
                          const brandObj = POPULAR_VEHICLE_MAKES.find((b) => b.name === selectedMake);
                          const models = brandObj?.popularModels || [];
                          return (
                            <select
                              value={selectedModel}
                              onChange={(e) => {
                                setSelectedModel(e.target.value);
                                setCustomModelInput('');
                              }}
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600"
                            >
                              {models.map((m) => (
                                <option key={m} value={m}>
                                  {m}
                                </option>
                              ))}
                              <option value="custom">{language === 'ar' ? '+ موديل آخر (كتابة يدوية)' : '+ Other (Type Custom Model)'}</option>
                            </select>
                          );
                        })()}
                      </div>

                      {/* Engine / Fuel Type */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          {language === 'ar' ? 'نوع المحرك والوقود' : 'Engine & Fuel Type'}
                        </label>
                        <select
                          value={selectedEngine}
                          onChange={(e) => setSelectedEngine(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600"
                        >
                          {ENGINE_TYPES.map((eng) => (
                            <option key={eng.id} value={eng.id}>
                              {language === 'ar' ? eng.nameAr : eng.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Optional Mileage */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          {language === 'ar' ? 'الممشى الحالي (كم)' : 'Current Mileage (KM)'}
                        </label>
                        <input
                          type="text"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                          placeholder="e.g. 45,000 KM"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600 font-mono"
                        />
                      </div>
                    </div>

                    {/* Custom Model Input if chosen */}
                    {selectedModel === 'custom' && (
                      <div className="pt-2 animate-in fade-in">
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          {language === 'ar' ? 'اكتب اسم الموديل أو الفئة الخاصة:' : 'Type exact model name / trim:'}
                        </label>
                        <input
                          type="text"
                          value={customModelInput}
                          onChange={(e) => setCustomModelInput(e.target.value)}
                          placeholder="e.g. Prado TXL 4.0L / Golf GTI Clubsport..."
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600 text-xs"
                        />
                      </div>
                    )}

                    {/* Plate Number (Optional) */}
                    <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">
                          {language === 'ar' ? 'رقم لوحة المركبة (اختياري لربط السجل):' : 'License Plate Number (Optional):'}
                        </label>
                        <input
                          type="text"
                          value={plate}
                          onChange={(e) => setPlate(e.target.value)}
                          placeholder="e.g. 6-1234-90"
                          className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-mono font-bold text-slate-900 outline-none focus:border-blue-600 text-xs"
                        />
                      </div>

                      {/* Live Selected Vehicle Card Preview */}
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-2xl border border-blue-200/80 flex items-center gap-3.5 shadow-xs">
                        <img
                          src={currentVehicleImage}
                          alt={selectedMake}
                          className="w-16 h-12 rounded-xl object-cover border border-blue-200 shrink-0 shadow-xs"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/vehicles/toyota_rav4.jpg';
                          }}
                        />
                        <div className="flex-1 overflow-hidden">
                          <span className="text-[10px] text-blue-600 font-bold block flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>{language === 'ar' ? 'المركبة المحددة للحجز:' : 'Selected Vehicle:'}</span>
                          </span>
                          <strong className="text-xs font-black text-slate-900 truncate block mt-0.5">
                            {currentVehicleSummary}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* GARAGE VEHICLES VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicles.map((veh, idx) => {
                    const isSelected = selectedVehicleIdx === idx;
                    return (
                      <div
                        key={veh.id}
                        onClick={() => setSelectedVehicleIdx(idx)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <img
                          src={veh.image || '/images/categories/gasoline_engine.jpg'}
                          alt={veh.model}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/categories/gasoline_engine.jpg';
                          }}
                        />
                        <div className="space-y-1 flex-1">
                          <strong className="text-sm font-black text-slate-900 block">
                            {veh.make} {veh.model}
                          </strong>
                          <span className="text-xs text-slate-500 block">
                            {veh.year} • {veh.trim || 'Standard'}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold inline-block">
                            {veh.plateNumber || '12345'}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'التالي: اختيار الخدمة ←' : 'Next: Choose Service →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 2: SELECT SERVICE */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {language === 'ar' ? 'الخطوة 2: حدد الخدمة المطلوبة' : 'Step 2: Choose Your Service Package'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar' ? 'أسعار شفافة محددة تشمل الفحص والضمان' : 'Guaranteed transparent fixed pricing with full warranty'}
                  </p>
                </div>
                <span className="text-xs text-blue-600 font-bold font-mono">
                  {currentVehicleSummary}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesCatalog.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900">
                          <img
                            src={srv.img}
                            alt={srv.nameEn}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 start-2 px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] shadow-sm">
                            {language === 'ar' ? srv.badgeAr : srv.badgeEn}
                          </span>
                        </div>
                        <strong className="text-sm font-black text-slate-900 block line-clamp-1">
                          {language === 'ar' ? srv.nameAr : srv.nameEn}
                        </strong>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {language === 'ar' ? srv.descAr : srv.descEn}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'السعر التقديري' : 'Price'}</span>
                          <strong className="text-base font-black text-blue-600 font-mono">
                            {formatPrice(srv.price)}
                          </strong>
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {language === 'ar' ? srv.durationAr : srv.durationEn}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  {language === 'ar' ? '← السابق' : '← Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'التالي: اختيار الورشة ←' : 'Next: Choose Workshop →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 3: CHOOSE PROVIDER */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {language === 'ar' ? 'الخطوة 3: اختر المركز المعتمد' : 'Step 3: Choose Certified Workshop'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'عرض أفضل الورش ومراكز الصيانة المعتمدة'
                      : 'Verified workshops available in all regions'}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold">
                  {language === 'ar' ? '🛡️ شبكة معتمدة' : '🛡️ Verified Network'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(availableProviders.length > 0 ? availableProviders : providers).map((prov) => {
                  const isSelected = selectedProvider?.id === prov.id;
                  return (
                    <div
                      key={prov.id}
                      onClick={() => setSelectedProvider(prov)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 shadow-sm ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={prov.image || '/images/garage_autotech.jpg'}
                        alt={prov.businessNameEn}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/garage_autotech.jpg';
                        }}
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-sm font-black text-slate-900">
                            {language === 'ar' ? prov.businessNameAr : prov.businessNameEn}
                          </strong>
                          <span className="text-amber-500 font-bold text-xs">★ {prov.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-xs text-slate-500">📍 {language === 'ar' ? prov.addressAr : prov.addressEn}</p>
                        <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-600 font-bold">
                          <span className="text-emerald-600">● {language === 'ar' ? 'مفتوح الآن' : 'Open Now'}</span>
                          <span>•</span>
                          <span>{prov.certifiedTechnicians || 6} {language === 'ar' ? 'فنيين معتمدين' : 'Certified Techs'}</span>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  {language === 'ar' ? '← السابق' : '← Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'التالي: تحديد التاريخ ←' : 'Next: Select Date →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 4: SELECT DATE */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {language === 'ar' ? 'الخطوة 4: اختر اليوم المناسب' : 'Step 4: Choose Appointment Date'}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'ar' ? 'المواعيد المتاحة خلال الأسبوع الحالي' : 'Available dates for this week'}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateStr;
                  return (
                    <div
                      key={item.dateStr}
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className="text-xs font-bold block mb-1 opacity-80">
                        {language === 'ar' ? item.dayNameAr : item.dayNameEn}
                      </span>
                      <strong className="text-lg font-black block font-mono">
                        {language === 'ar' ? item.formattedAr : item.formattedEn}
                      </strong>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  {language === 'ar' ? '← السابق' : '← Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'التالي: اختيار الوقت ←' : 'Next: Select Time Slot →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 5: SELECT TIME & SERVICE MODE */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {language === 'ar' ? 'الخطوة 5: اختر الوقت وطريقة الاستلام' : 'Step 5: Select Time Slot & Service Mode'}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'ar' ? 'حدد الفترة الزمنية وطريقة تقديم الخدمة' : 'Choose your arrival window and service location'}
                </p>
              </div>

              {/* Service Mode Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 uppercase">
                  {language === 'ar' ? 'طريقة تنفيذ الخدمة:' : 'Service Fulfillment Mode:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setServiceMode('workshop')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      serviceMode === 'workshop'
                        ? 'border-blue-600 bg-blue-50/40 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <div>
                      <strong className="text-xs font-black block">
                        {language === 'ar' ? 'حضور ذاتي إلى الورشة' : 'Workshop Bay Drop-off'}
                      </strong>
                      <span className="text-[10px] text-slate-500">
                        {language === 'ar' ? 'إحضار سيارتك للمركز بنفسك (بدون رسوم إضافية)' : 'Bring vehicle to the garage yourself'}
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setServiceMode('pickup')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      serviceMode === 'pickup'
                        ? 'border-blue-600 bg-blue-50/40 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    <Truck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <strong className="text-xs font-black block">
                        {language === 'ar' ? 'خدمة الاستلام والتوصيل (VIP)' : 'Home/Office Pickup & Return'}
                      </strong>
                      <span className="text-[10px] text-slate-500">
                        {language === 'ar' ? `استلام وإرجاع السيارة من موقعك (+${formatPrice(35)})` : `Doorstep pickup & return (+${formatPrice(35)})`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-900 uppercase">
                  {language === 'ar' ? 'اختر التوقيت المتاح:' : 'Available Arrival Windows:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600 text-white font-black shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold'
                        }`}
                      >
                        <span className="text-xs font-mono block">{slot.time}</span>
                        <span className="text-[10px] opacity-70">
                          {language === 'ar' ? slot.labelAr : slot.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  {language === 'ar' ? '← السابق' : '← Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'التالي: المراجعة وتأكيد الحجز ←' : 'Next: Review & Confirmation →'}</span>
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* STEP 6: REVIEW, COST BREAKDOWN & AUTH GATE */}
          {/* ------------------------------------------------------------- */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {language === 'ar' ? 'الخطوة 6: مراجعة تفاصيل الحجز والتأكيد' : 'Step 6: Review & Final Confirmation'}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'ar' ? 'يرجى مراجعة كافة التفاصيل وتأكيد الحساب لإتمام العملية' : 'Review your service order and sign in to link your booking'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column (7 cols): Order Summary & Notes */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Summary Details Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المركبة' : 'Vehicle'}</span>
                        <strong className="text-slate-900 block font-bold">{currentVehicleSummary}</strong>
                        <span className="text-[10px] text-slate-500 font-mono">لوحة: {currentVehiclePlate}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الخدمة' : 'Service'}</span>
                        <strong className="text-slate-900 block font-bold">
                          {language === 'ar' ? selectedServiceObj.nameAr : selectedServiceObj.nameEn}
                        </strong>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'المركز المعتمد' : 'Workshop'}</span>
                        <strong className="text-slate-900 block font-bold">
                          {language === 'ar' ? selectedProvider.businessNameAr : selectedProvider.businessNameEn}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">{selectedProvider.phone}</span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الموعد المحدد' : 'Appointment'}</span>
                        <strong className="text-blue-600 block font-mono font-bold">
                          {selectedDate} • {selectedTimeSlot}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">
                          {serviceMode === 'pickup' ? (language === 'ar' ? 'استلام من موقعك' : 'Pickup service') : (language === 'ar' ? 'في الورشة' : 'In workshop')}
                        </span>
                      </div>
                    </div>

                    {/* Customer Notes */}
                    <div className="pt-2 border-t border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        {language === 'ar' ? 'ملاحظات أو وصف للأعطال (اختياري):' : 'Additional Notes / Symptoms (Optional):'}
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={language === 'ar' ? 'أضف أي صوت غريب، أو تفاصيل ترغب أن ينتبه لها الفني...' : 'Describe any noise, vibrations, or specific requests...'}
                        rows={2}
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* Cost Invoice Card */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>{language === 'ar' ? 'أجور يد وفحص معتمد' : 'Service & Inspection Labor'}</span>
                      <span className="font-mono font-bold">{formatPrice(selectedServiceObj.price)}</span>
                    </div>
                    {serviceMode === 'pickup' && (
                      <div className="flex justify-between text-slate-600">
                        <span>{language === 'ar' ? 'رسوم الاستلام والتوصيل VIP' : 'VIP Pickup & Delivery'}</span>
                        <span className="font-mono font-bold">{formatPrice(35)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>{language === 'ar' ? 'ضريبة القيمة المضافة (5%)' : 'VAT (5%)'}</span>
                      <span className="font-mono font-bold">{formatPrice(vatAmount)}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-black text-slate-900">
                      <span>{language === 'ar' ? 'الإجمالي النهائي المستحق' : 'Final Total (Pay at Garage)'}</span>
                      <span className="text-lg text-blue-600 font-mono font-black">{formatPrice(finalTotalPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column (5 cols): AUTH GATE (LOGIN / SIGN UP IF NOT AUTHENTICATED) */}
                <div className="lg:col-span-5 space-y-4">
                  {isAuthenticated ? (
                    // Signed In View
                    <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-4">
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

                      <div className="text-[10px] text-slate-600 font-medium">
                        {language === 'ar'
                          ? 'سيتم ربط هذا الحجز بحسابك مباشرة وتلقي إشعارات الحالة ورسائل الفني.'
                          : 'Your booking will be linked to your account with real-time SMS and map tracking.'}
                      </div>

                      <button
                        type="button"
                        onClick={handleFinalBookingSubmit}
                        className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{language === 'ar' ? 'تأكيد وإتمام الحجز الآن' : 'Confirm & Place Booking'}</span>
                      </button>
                    </div>
                  ) : (
                    // Authentication Gate Card
                    <div className="p-5 rounded-2xl bg-white border-2 border-amber-400 shadow-md space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'خطوة أخيرة: تسجيل الدخول أو إنشاء حساب' : 'Last Step: Sign In or Register'}</span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900">
                          {language === 'ar' ? 'سجّل حسابك لتأكيد الحجز ومتابعته' : 'Sign in to complete your booking'}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {language === 'ar'
                            ? 'نحتاج لبياناتك لنتمكن من إرسال كود الحجز ومتابعة الفني لايف على الخريطة.'
                            : 'Required to send your confirmation code and enable live GPS tracking.'}
                        </p>
                      </div>

                      {/* Mode Toggle (Sign In vs Sign Up) */}
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
                          showToast(language === 'ar' ? 'تم تسجيل الدخول بحساب العميل بنجاح!' : 'Logged in as Demo Customer!', 'success');
                        }}
                        className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>{language === 'ar' ? 'تسجيل دخول فوري (حساب تجريبي بنقرة واحدة)' : 'Instant 1-Click Demo Login'}</span>
                      </button>

                      {/* Inputs */}
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
                        onClick={handleFinalBookingSubmit}
                        className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {authMode === 'signin'
                            ? (language === 'ar' ? 'تسجيل الدخول وتأكيد الحجز' : 'Sign In & Confirm Booking')
                            : (language === 'ar' ? 'إنشاء حساب وتأكيد الحجز' : 'Register & Confirm Booking')}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  {language === 'ar' ? '← السابق' : '← Back'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Trust Highlights */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="space-y-0.5">
            <strong className="text-slate-900 font-black block">{language === 'ar' ? 'ورش معتمدة 100%' : '100% Verified'}</strong>
            <span className="text-[10px] text-slate-400">{language === 'ar' ? 'تدقيق تراخيص وكفاءة' : 'Audited garages'}</span>
          </div>
          <div className="space-y-0.5">
            <strong className="text-slate-900 font-black block">{language === 'ar' ? 'أسعار شفافة محددة' : 'Fixed Pricing'}</strong>
            <span className="text-[10px] text-slate-400">{language === 'ar' ? 'بدون رسوم خفية' : 'Zero hidden charges'}</span>
          </div>
          <div className="space-y-0.5">
            <strong className="text-slate-900 font-black block">{language === 'ar' ? 'ضمان قطع وأجور' : 'Full Warranty'}</strong>
            <span className="text-[10px] text-slate-400">{language === 'ar' ? 'ضمان على كافة الأعمال' : 'On parts & labor'}</span>
          </div>
          <div className="space-y-0.5">
            <strong className="text-slate-900 font-black block">{language === 'ar' ? 'دفع عند الاستلام' : 'Pay at Garage'}</strong>
            <span className="text-[10px] text-slate-400">{language === 'ar' ? 'بعد استلام وفحص السيارة' : 'After job completion'}</span>
          </div>
        </div>
      </div>

      {/* 4. FAQs Accordion */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-3">
        <h3 className="text-base font-black text-slate-900">
          {language === 'ar' ? 'الأسئلة الشائعة حول حجز الصيانة' : 'Frequently Asked Questions'}
        </h3>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-start font-bold text-xs text-slate-800 flex items-center justify-between hover:bg-slate-50"
              >
                <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
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
    </div>
  );
};
