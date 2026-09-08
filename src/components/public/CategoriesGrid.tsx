import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wrench,
  Zap,
  Cpu,
  Settings,
  Disc,
  Snowflake,
  BatteryCharging,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Search,
  MapPin,
  Car,
  Phone,
  HelpCircle,
  Clock,
  Sparkles,
  ChevronDown,
  ThumbsUp,
  Tag,
  Award,
  Layers,
  Fuel,
  Key,
  Flame,
  ShieldAlert,
  Activity,
  Droplets,
  RotateCcw,
  PhoneCall,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

export const CategoriesGrid: React.FC = () => {
  const {
    language,
    t,
    setIsQuoteModalOpen,
    setIsAIAssistantOpen,
    formatPrice,
    setActiveTab,
    showToast,
    selectedCountry,
    activeTab,
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchLocation, setSearchLocation] = useState('Dubai');
  const [searchService, setSearchService] = useState('all');
  const [searchVehicleType, setSearchVehicleType] = useState('all');
  const [textSearch, setTextSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Locations list covering UAE, Palestine, and GCC
  const locationsList = [
    {
      groupEn: '🇦🇪 United Arab Emirates (UAE)',
      groupAr: '🇦🇪 الإمارات العربية المتحدة',
      items: [
        { id: 'Dubai', en: 'Dubai - Al Quoz Industrial Area, UAE', ar: 'دبي - المنطقة الصناعية 3، القوز' },
        { id: 'Dubai-Barsha', en: 'Dubai - Al Barsha, UAE', ar: 'دبي - البرشاء' },
        { id: 'Dubai-Deira', en: 'Dubai - Deira & Port Saeed, UAE', ar: 'دبي - ديرة وبور سعيد' },
        { id: 'AbuDhabi', en: 'Abu Dhabi - Mussafah Industrial Area, UAE', ar: 'أبوظبي - مصفح الصناعية' },
        { id: 'Sharjah', en: 'Sharjah - Industrial Areas 1-15, UAE', ar: 'الشارقة - المنطقة الصناعية' },
        { id: 'Ajman', en: 'Ajman - Industrial Area, UAE', ar: 'عجمان - المنطقة الصناعية' },
        { id: 'RAK', en: 'Ras Al Khaimah - Al Nakheel, UAE', ar: 'رأس الخيمة - النخيل' },
      ],
    },
    {
      groupEn: '🇵🇸 Palestine',
      groupAr: '🇵🇸 دولة فلسطين',
      items: [
        { id: 'Ramallah', en: 'Ramallah - Al-Irsal & Industrial Zone, Palestine', ar: 'رام الله والبيرة - شارع الإرسال والمنطقة الصناعية' },
        { id: 'Nablus', en: 'Nablus - Rafidia & Industrial Area, Palestine', ar: 'نابلس - رفيديا والمنطقة الصناعية' },
        { id: 'Hebron', en: 'Hebron - Ein Sarah & City Center, Palestine', ar: 'الخليل - عين سارة والوسط التجاري' },
        { id: 'Jerusalem', en: 'Jerusalem - Beit Hanina & Shuafat, Palestine', ar: 'القدس الشريف - بيت حنينا وشعفاط' },
        { id: 'Bethlehem', en: 'Bethlehem - Beit Jala, Palestine', ar: 'بيت لحم - بيت جالا' },
        { id: 'Jenin', en: 'Jenin - Industrial Zone, Palestine', ar: 'جنين - المنطقة الصناعية' },
      ],
    },
    {
      groupEn: '🇸🇦 GCC & Regional',
      groupAr: '🇸🇦 دول الخليج والأردن',
      items: [
        { id: 'Riyadh', en: 'Riyadh - Al Olaya & Industrial City, Saudi Arabia', ar: 'الرياض - العليا والمدينة الصناعية، السعودية' },
        { id: 'Jeddah', en: 'Jeddah - Al Rawdah, Saudi Arabia', ar: 'جدة - الروضة والمنطقة الصناعية، السعودية' },
        { id: 'Amman', en: 'Amman - Mecca St & Wadi Saqra, Jordan', ar: 'عَمّان - شارع مكة ووادي صقرة، الأردن' },
      ],
    },
  ];

  // Vehicle Types
  const vehicleTypesList = [
    { id: 'all', en: 'All Vehicles', ar: 'جميع أنواع المركبات' },
    { id: 'sedan', en: 'Sedan (Saloon)', ar: 'سيدان (صالون)' },
    { id: 'suv', en: 'SUV / 4x4 / Crossover', ar: 'دفع رباعي / جيب / SUV' },
    { id: 'coupe', en: 'Coupe / Sports Car', ar: 'كوبيه / سيارة رياضية' },
    { id: 'hatchback', en: 'Hatchback', ar: 'هاتشباك' },
    { id: 'luxury', en: 'Luxury / Supercar', ar: 'فارهة / سوبر كار' },
    { id: 'pickup', en: 'Pickup Truck', ar: 'بيك أب / ونيت' },
    { id: 'van', en: 'Van / Minivan', ar: 'فان / ميني فان عائلي' },
    { id: 'truck', en: 'Commercial Truck / Heavy Duty', ar: 'شاحنة تجارية ثقيلة' },
    { id: 'ev', en: 'Electric Vehicle (EV)', ar: 'كهربائية بالكامل (EV)' },
    { id: 'hybrid', en: 'Hybrid / Plug-in Hybrid', ar: 'هايبرد هجين' },
  ];

  // Filter Categories without numbers
  const filterTabs = [
    { id: 'all', en: 'All Services', ar: 'جميع الخدمات' },
    { id: 'maintenance', en: 'Maintenance', ar: 'الصيانة الدورية' },
    { id: 'repairs', en: 'Repairs', ar: 'الإصلاحات الميكانيكية' },
    { id: 'diagnostics', en: 'Diagnostics', ar: 'الفحص والبرمجة' },
    { id: 'electrical', en: 'Electrical & Electronics', ar: 'الكهرباء والإلكترونيات' },
    { id: 'tires', en: 'Tires & Wheels', ar: 'الإطارات والميزان' },
    { id: 'body', en: 'Body & Paint', ar: 'السمكرة والدهان' },
    { id: 'mobile', en: 'Mobile & Roadside', ar: 'الصيانة المتنقلة والطوارئ' },
    { id: 'commercial', en: 'Commercial', ar: 'الشاحنات والأساطيل' },
  ];

  // 21 Comprehensive Automotive Categories directly from Section 8 of Blueprint
  const allCategories = [
    {
      id: 'gasoline-engine',
      titleEn: 'Gasoline Engine Services',
      titleAr: 'محركات البنزين والصيانة الميكانيكية',
      descEn: 'Engine diagnostics, overhaul, timing chain, fuel injectors, spark plugs, and compression tests.',
      descAr: 'صيانة دورية، توضيب محركات، تغيير سير التايمنج، فحص الضغط، تنظيف البخاخات وإصلاح التسريبات.',
      categories: ['all', 'maintenance', 'repairs', 'diagnostics'],
      icon: Wrench,
      img: '/images/categories/gasoline_engine.jpg',
      subServicesEn: ['Engine Diagnostics', 'Timing Belt & Chain', 'Spark Plug Replacement', 'Fuel Injector Cleaning', 'Oil Leak Repair', 'Engine Overhaul'],
      subServicesAr: ['فحص كمبيوتر المحرك', 'تبديل سير التايمنج', 'تغيير شمعات الاحتراق', 'تنظيف بخاخات الوقود', 'إصلاح تسريبات الزيت', 'توضيب كامل للمحرك'],
      badgeEn: 'High Demand',
      badgeAr: 'الأكثر طلباً',
    },
    {
      id: 'diesel-engine',
      titleEn: 'Diesel Engine Services',
      titleAr: 'محركات الديزل وأنظمة الحقن',
      descEn: 'Diesel diagnostics, high-pressure injectors, turbocharger repair, DPF cleaning, and EGR service.',
      descAr: 'طرمبات الضغط العالي، بخاخات الديزل، صيانة التيربو، تنظيف فلاتر البيئة DPF وفحص صمام EGR.',
      categories: ['all', 'maintenance', 'repairs', 'diagnostics', 'commercial'],
      icon: Fuel,
      img: '/images/categories/diesel_engine.jpg',
      subServicesEn: ['Diesel Injector Repair', 'Turbocharger Service', 'DPF Cleaning & Regeneration', 'EGR Valve Service', 'Common Rail Test'],
      subServicesAr: ['معايرة بخاخات ديزل', 'صيانة وتجديد التيربو', 'تنظيف فلتر البيئة DPF', 'تنظيف صمام EGR', 'فحص طرمبة كومن ريل'],
      badgeEn: 'Commercial Ready',
      badgeAr: 'جاهزية تجارية',
    },
    {
      id: 'hybrid-services',
      titleEn: 'Hybrid Vehicle Services',
      titleAr: 'مركبات الهايبرد وبطاريات الجهد العالي',
      descEn: 'Hybrid high-voltage battery diagnostics, module balancing, cooling systems, and inverter repair.',
      descAr: 'فحص بطاريات الهايبرد بجهد عالي، موازنة خلايا البطارية، صيانة الإنفرتر ودائرة التبريد الكهربائية.',
      categories: ['all', 'maintenance', 'repairs', 'diagnostics', 'electrical'],
      icon: Zap,
      img: '/images/categories/hybrid_services.jpg',
      subServicesEn: ['HV Battery Testing', 'Hybrid Battery Replacement', 'Inverter Diagnostics', 'Hybrid Cooling System', 'High-Voltage Safety Scan'],
      subServicesAr: ['فحص بطارية الهايبرد', 'تبديل خلايا البطارية', 'فحص محول الإنفرتر', 'صيانة دورة تبريد الهايبرد', 'فحص عزل الجهد العالي'],
      badgeEn: 'Certified Hybrid',
      badgeAr: 'فني هايبرد معتمد',
    },
    {
      id: 'ev-services',
      titleEn: 'Electric Vehicle (EV) Services',
      titleAr: 'المركبات الكهربائية بالكامل (EV)',
      descEn: 'EV battery health SOH check, electric motor diagnostics, thermal management, and onboard charger care.',
      descAr: 'فحص صحة بطارية EV (SOH)، تشخيص المحرك الكهربائي، إدارة التبريد الحراري، وصيانة منافذ الشحن.',
      categories: ['all', 'maintenance', 'repairs', 'diagnostics', 'electrical'],
      icon: Zap,
      img: '/images/categories/ev_services.jpg',
      subServicesEn: ['EV State-of-Health (SOH)', 'Electric Motor Testing', 'Charging Port Repair', 'Thermal Management', 'EV Firmware Updates'],
      subServicesAr: ['فحص سعة البطارية SOH', 'فحص المحرك الكهربائي', 'صيانة منفذ الشحن', 'دورة التبريد الحراري', 'تحديث سوفتوير المركبة'],
      badgeEn: 'Next-Gen EV',
      badgeAr: 'تقنية الجيل القادم',
    },
    {
      id: 'electrical-services',
      titleEn: 'Automotive Electrical Services',
      titleAr: 'كهرباء السيارات والمارش والدينامو',
      descEn: 'Starter motor, alternator testing, wiring loom repairs, lighting, fuses, power windows, and sensors.',
      descAr: 'فحص دينامو الشحن، سلف التشغيل، إصلاح ضفيرة الأسلاك، الإضاءة LED، زجاج الكهرباء والحساسات.',
      categories: ['all', 'repairs', 'electrical'],
      icon: Zap,
      img: '/images/categories/electrical_services.jpg',
      subServicesEn: ['Starter & Alternator', 'Wiring Loom Repair', 'Lighting & LED Conversion', 'Power Windows & Locks', 'Sensor Troubleshooting'],
      subServicesAr: ['صيانة الدينامو والسلف', 'إصلاح ضفيرة الكهرباء', 'تحويل إضاءة LED', 'صيانة سنترلوك والزجاج', 'فحص الحساسات والفيوزات'],
      badgeEn: 'Fast Turnaround',
      badgeAr: 'إنجاز سريع',
    },
    {
      id: 'diagnostics-programming',
      titleEn: 'Computer Diagnostics & Programming',
      titleAr: 'فحص وبرمجة كمبيوتر السيارات OBD-II',
      descEn: 'OBD-II error scanning, ECU remapping, key programming, module coding, and ADAS camera calibration.',
      descAr: 'فحص كمبيوتر شامل، برمجة كمبيوتر المحرك ECU أونلاين، نسخ المفاتيح الذكية، ومعايرة رادارات ADAS.',
      categories: ['all', 'diagnostics', 'electrical'],
      icon: Cpu,
      img: '/images/categories/diagnostics_programming.jpg',
      subServicesEn: ['OBD-II Code Diagnosis', 'ECU Coding & Programming', 'Car Key & Immobilizer', 'Module Flashing', 'ADAS Sensor Calibration'],
      subServicesAr: ['قراءة أكواد OBD-II', 'برمجة كمبيوتر ECU أونلاين', 'قص وبرمجة مفاتيح ذكية', 'تحديث وبرمجة كنترول', 'معايرة رادار وكاميرات ADAS'],
      badgeEn: 'Advanced Scan',
      badgeAr: 'فحص رقمي متقدم',
    },
    {
      id: 'transmission-gearbox',
      titleEn: 'Transmission & Gearbox',
      titleAr: 'الجير وناقل الحركة الأوتوماتيك وDSG',
      descEn: 'Automatic, manual, CVT, and dual-clutch DSG transmission repair, fluid flush, and clutch replacement.',
      descAr: 'صيانة الجير الأوتوماتيك، CVT، دبل كلتش DSG، غسيل مخ الجير، تبديل الزيت الأصلي وتغيير الكلتشات.',
      categories: ['all', 'maintenance', 'repairs'],
      icon: Settings,
      img: '/images/categories/transmission_gearbox.jpg',
      subServicesEn: ['Auto Transmission Flush', 'CVT & DSG Service', 'Clutch Plate Replacement', 'Gearbox Rebuild', 'Torque Converter'],
      subServicesAr: ['تغيير زيت وفلتر الجير', 'صيانة جير DSG وCVT', 'تبديل طقم دبل كلتش', 'توضيب كامل للجير', 'صيانة طنجرة الجير'],
      badgeEn: 'Specialist',
      badgeAr: 'متخصص معتمد',
    },
    {
      id: 'brake-systems',
      titleEn: 'Brake Systems & Safety',
      titleAr: 'أنظمة الفرامل والفحمات والهوبات',
      descEn: 'Brake pads, ventilated discs, brake fluid bleeding, ABS sensor diagnosis, calipers, and electronic handbrake.',
      descAr: 'تبديل فحمات، خرط هوبات ليزر، فحص ABS، تنفيس وتغيير زيت الفرامل، وصيانة الهاندبريك الإلكتروني EPB.',
      categories: ['all', 'maintenance', 'repairs'],
      icon: Disc,
      img: '/images/categories/brake_systems.jpg',
      subServicesEn: ['Ceramic Brake Pads', 'Brake Disc Skimming/Change', 'Brake Fluid Flush (DOT 4/5)', 'ABS Diagnostics', 'Electronic Parking Brake'],
      subServicesAr: ['فحمات فرامل سيراميك', 'خرط وتبديل هوبات ليزر', 'تغيير زيت فرامل أصلي', 'فحص حساسات ABS', 'صيانة بريك إلكتروني EPB'],
      badgeEn: 'Safety Critical',
      badgeAr: 'أمان وسلامة',
    },
    {
      id: 'steering-suspension',
      titleEn: 'Steering & Suspension',
      titleAr: 'المساعدين ونظام التوجيه والمقصات',
      descEn: 'Shock absorbers, struts, control arms, ball joints, tie rods, power steering racks, and bushings.',
      descAr: 'تبديل مساعدين أصلي، مقصات، جلود توازن، صيانة دودة ومضخة الستيرنج الكهربائي وتصفير الحساسات.',
      categories: ['all', 'maintenance', 'repairs', 'tires'],
      icon: Wrench,
      img: '/images/categories/steering_suspension.jpg',
      subServicesEn: ['Shock Absorber Replacement', 'Control Arms & Bushings', 'Steering Rack Repair', 'Power Steering Fluid', 'Sway Bar Links'],
      subServicesAr: ['تبديل مساعدين أصلي', 'مقصات وجلود توازن', 'صيانة دودة الستيرنج EPS', 'تغيير زيت الباور', 'بيضات وأذرعة التوجيه'],
      badgeEn: 'Ride Quality',
      badgeAr: 'راحة وثبات',
    },
    {
      id: 'tires-wheels',
      titleEn: 'Tires & Wheels',
      titleAr: 'الإطارات والجنوط والميزان الإلكتروني 3D',
      descEn: 'Tire fitting, high-speed computerized wheel balancing, laser 3D alignment, puncture repair, and TPMS.',
      descAr: 'تبديل إطارات جديدة، ترصيص ليزر، ميزان 3D للشاسيه والمقود، وبرمجة حساسات ضغط الإطارات TPMS.',
      categories: ['all', 'maintenance', 'tires'],
      icon: Disc,
      img: '/images/categories/tires_wheels.jpg',
      subServicesEn: ['New Tire Fitting', '3D Laser Wheel Alignment', 'Wheel Balancing', 'Tire Rotation', 'TPMS Sensor Calibration', 'Rim Repair'],
      subServicesAr: ['تركيب إطارات جديدة', 'ميزان إلكتروني ليزر 3D', 'ترصيص ديناميكي للجنوط', 'تدوير الإطارات', 'برمجة حساسات TPMS', 'تعديل واستعدال الجنوط'],
      badgeEn: 'Popular',
      badgeAr: 'شائع',
    },
    {
      id: 'oil-filters-quick',
      titleEn: 'Oil Change & Quick Services',
      titleAr: 'غيار الزيت السريع والفلاتر 10,000 كم',
      descEn: 'Fully synthetic engine oil, OEM oil filter, air & cabin filters, fluid top-ups, and 24-point check.',
      descAr: 'زيوت تخليقية بالكامل 10,000 كم معتمدة، فلاتر وكالة أصلية، فحص نقاط السلامة العشرين وفحص السوائل.',
      categories: ['all', 'maintenance', 'mobile'],
      icon: Droplets,
      img: '/images/categories/oil_filters_quick.jpg',
      subServicesEn: ['Synthetic 5W30/0W20 Oil', 'OEM Filter Replacement', 'Air & Cabin Filters', 'Coolant & Fluid Top-Up', '24-Point Health Check'],
      subServicesAr: ['زيت تخليقي 5W-30 / 0W-20', 'فلتر زيت أصلي وكالة', 'فلتر هواء ومكيف', 'تزويد سوائل المركبة', 'فحص شامل 24 نقطة'],
      badgeEn: 'Express Service',
      badgeAr: 'خدمة سريعة',
    },
    {
      id: 'cooling-ac',
      titleEn: 'Cooling & Air Conditioning (AC)',
      titleAr: 'التكييف وغاز الفريون ونظام التبريد',
      descEn: 'AC refrigerant R134a/R1234yf gas refill, compressor overhaul, condenser cleaning, radiator, and water pump.',
      descAr: 'تعبئة غاز مكيف أصلي R134a، كشف تسريب الفريون، صيانة الكمبروسر، غسيل الرديتر وطرمبة الماء.',
      categories: ['all', 'maintenance', 'repairs'],
      icon: Snowflake,
      img: '/images/categories/cooling_ac.jpg',
      subServicesEn: ['AC Gas Refill & Leak Test', 'Compressor Repair', 'Condenser & Evaporator', 'Radiator Flush', 'Thermostat & Water Pump'],
      subServicesAr: ['شحن غاز مكيف مع فحص تسريب', 'صيانة كمبروسر المكيف', 'تنظيف ثلاجة ومكثف المكيف', 'غسيل وتسييخ الرديتر', 'تبديل ثرموستات وطرمبة ماء'],
      badgeEn: 'Summer Essential',
      badgeAr: 'أساسي للصيف',
    },
    {
      id: 'battery-charging',
      titleEn: 'Battery & Charging Systems',
      titleAr: 'البطاريات وأنظمة الشحن المتنقلة',
      descEn: 'Computerized battery load test, AGM/EFB battery replacement, alternator output test, and mobile jumpstart.',
      descAr: 'فحص إلكتروني لقوة البطارية، تبديل بطاريات AGM وEFB الأصلية مع التوصيل والتركيب، واشتراك طوارئ.',
      categories: ['all', 'maintenance', 'electrical', 'mobile'],
      icon: BatteryCharging,
      img: '/images/categories/battery_charging.jpg',
      subServicesEn: ['Battery Health Test', 'AGM/EFB Replacement', 'Alternator Performance Test', 'Emergency Jumpstart', 'Terminal Cleaning'],
      subServicesAr: ['فحص جهد وكفاءة البطارية', 'تبديل بطاريات AGM/EFB أصلية', 'فحص شحن الدينامو', 'اشتراك وتشغيل فوري بالموقع', 'تنظيف وعزل أقطاب البطارية'],
      badgeEn: '24/7 Mobile',
      badgeAr: 'خدمة متنقلة 24/7',
    },
    {
      id: 'body-paint',
      titleEn: 'Body Repair & Painting',
      titleAr: 'السمكرة والدهان الحراري وتعديل الصدمات PDR',
      descEn: 'Collision structural repair, paintless dent repair (PDR), computerized color matching, and oven respray.',
      descAr: 'إصلاح صدمات، تعديل صدمات على البارد PDR، رش فرن حراري بألوان كمبيوتر مطابقة للوكالة، وتلميع شامل.',
      categories: ['all', 'repairs', 'body'],
      icon: Sparkles,
      img: '/images/categories/body_paint.jpg',
      subServicesEn: ['Paintless Dent Repair (PDR)', 'Oven-Baked Full Paint', 'Bumper Scratch Repair', 'Chassis Alignment', 'Rust Treatment'],
      subServicesAr: ['تعديل صدمات على البارد PDR', 'رش بوية فرن حراري كامل', 'إصلاح خدوش الصدامات', 'ميزان واستعدال الشاسيه', 'معالجة الصدأ وتأمين الهيكل'],
      badgeEn: 'Body Shop',
      badgeAr: 'ورشة سمكرة معتمدة',
    },
    {
      id: 'roadside-assistance',
      titleEn: '24/7 Roadside Assistance & Towing',
      titleAr: 'ونش وإنقاذ طوارئ على مدار 24 ساعة (SOS)',
      descEn: 'Emergency flatbed towing, battery jumpstart, flat tire change, emergency fuel delivery, and lockout help.',
      descAr: 'سطحة هيدروليك لنقل المركبات 24/7، اشتراك بطارية، فتح سيارات مقفلة باحتراف، وتوصيل بنزين فوري.',
      categories: ['all', 'mobile'],
      icon: Truck,
      img: '/images/categories/roadside_assistance.jpg',
      subServicesEn: ['Flatbed Towing 24/7', 'Battery Boost & Jumpstart', 'Flat Tire Swap', 'Emergency Fuel Delivery', 'Car Lockout Opening'],
      subServicesAr: ['ونش سطحة هيدروليك 24/7', 'اشتراك بطارية بالموقع', 'تبديل إطار بنشر احتياطي', 'توصيل بنزين طوارئ', 'فتح سيارة مقفلة بدون أضرار'],
      badgeEn: '24/7 Emergency',
      badgeAr: 'طوارئ 24/7 فوري',
    },
    {
      id: 'mobile-services',
      titleEn: 'Mobile On-Site Services',
      titleAr: 'خدمات الصيانة المتنقلة أمام المنزل أو العمل',
      descEn: 'Certified mechanics and mobile service vans coming directly to your home, office, or roadside location.',
      descAr: 'سيارة صيانة متنقلة مجهزة بالكامل وفني معتمد يصلك إلى باب بيتك أو عملك لتبديل الزيت والبطاريات والفحص.',
      categories: ['all', 'maintenance', 'mobile', 'diagnostics'],
      icon: Car,
      img: '/images/categories/mobile_services.jpg',
      subServicesEn: ['Doorstep Oil & Filter Change', 'At-Home Battery Fitting', 'Mobile Computer Diagnosis', 'On-Site Brake Pad Swap', 'Mobile AC Gas Top-Up'],
      subServicesAr: ['غيار زيت وفلتر عند باب بيتك', 'تركيب بطارية أمام المنزل', 'فحص كمبيوتر متنقل', 'تبديل فحمات فرامل بالموقع', 'شحن غاز مكيف متنقل'],
      badgeEn: 'At Your Doorstep',
      badgeAr: 'عند باب منزلك',
    },
  ];

  // Dynamic filtering logic
  const filteredCategories = useMemo(() => {
    return allCategories.filter((cat) => {
      // Category filter
      const matchesCategoryPill =
        selectedFilter === 'all' || cat.categories.includes(selectedFilter);

      // Search term
      const matchesText =
        textSearch === '' ||
        cat.titleEn.toLowerCase().includes(textSearch.toLowerCase()) ||
        cat.titleAr.includes(textSearch) ||
        cat.descEn.toLowerCase().includes(textSearch.toLowerCase()) ||
        cat.descAr.includes(textSearch);

      return matchesCategoryPill && matchesText;
    });
  }, [selectedFilter, textSearch]);

  const packages = [
    {
      titleEn: 'Basic Maintenance Package',
      titleAr: 'باقة الصيانة الدورية الأساسية',
      descEn: 'Synthetic oil, OEM filter replacement, 20-point safety check & fluid top-ups.',
      descAr: 'زيت تخليقي أصلي 10,000 كم، فلتر زيت وكالة، فحص سلامة 20 نقطة وتزويد كافة السوائل.',
      price: 'AED 100',
      badgeEn: 'Popular',
      badgeAr: 'الأكثر طلباً',
      typeEn: 'Maintenance',
      typeAr: 'صيانة دورية',
    },
    {
      titleEn: 'AC Refresh & Clean Package',
      titleAr: 'باقة تنظيف وإنعاش التكييف الصيفي',
      descEn: 'R134a AC gas refill, anti-bacterial cabin duct flush, and condenser cleaning.',
      descAr: 'شحن غاز فريون R134a أصلي، تعقيم وتنظيف مجاري الهواء الداخلية، وغسيل المكثف.',
      price: 'AED 200',
      badgeEn: 'Summer Ready',
      badgeAr: 'جاهزية الصيف',
      typeEn: 'Maintenance',
      typeAr: 'صيانة مكيف',
    },
    {
      titleEn: 'Complete Safety Package',
      titleAr: 'باقة الأمان والسلامة الشاملة',
      descEn: 'Front/rear brake pad inspection, 3D laser wheel alignment, tire rotation & test.',
      descAr: 'فحص فحمات الفرامل الأمامية والخلفية، ميزان ليزر إلكتروني 3D، وتدوير وفحص الإطارات.',
      price: 'AED 450',
      badgeEn: 'Best Value',
      badgeAr: 'القيمة الأفضل',
      typeEn: 'Repairs',
      typeAr: 'فرامل وميزان',
    },
    {
      titleEn: 'Pre-Trip Highway Checkup',
      titleAr: 'باقة الفحص الشامل قبل السفر والخطوط',
      descEn: 'Comprehensive cooling, belts, battery, brakes, and tire endurance check.',
      descAr: 'فحص شامل لدورة التبريد، السيور، البطارية، الفرامل، وتحمل الإطارات لرحلات السفر الطويلة.',
      price: 'AED 220',
      badgeEn: 'Trip Ready',
      badgeAr: 'جاهزية السفر',
      typeEn: 'Diagnostics',
      typeAr: 'فحص أمان',
    },
  ];

  const whyChooseFeatures = [
    {
      titleEn: 'Verified & Trusted',
      titleAr: 'معتمد وموثوق 100%',
      descEn: 'All providers are verified for commercial license & quality standards.',
      descAr: 'كافة مراكز الصيانة خضعت للتدقيق الميداني والتراخيص الرسمية.',
      icon: ShieldCheck,
    },
    {
      titleEn: 'Expert Technicians',
      titleAr: 'فنيون ومهندسون خبراء',
      descEn: 'Skilled certified mechanics with experience you can trust.',
      descAr: 'مهندسون وفنيون معتمدون بخبرة طويلة في أحدث موديلات السيارات.',
      icon: Award,
    },
    {
      titleEn: 'Transparent Pricing',
      titleAr: 'أسعار واضحة وشفافة',
      descEn: 'No hidden costs. Get clear itemized quotes upfront.',
      descAr: 'لا رسوم خفية، عروض أسعار تفصيلية ومقارنة واضحة قبل الحجز.',
      icon: Tag,
    },
    {
      titleEn: 'On-Time Service',
      titleAr: 'التزام تام بالمواعيد',
      descEn: 'Punctual, dependable service that respects your schedule.',
      descAr: 'دقة متناهية في مواعيد الاستلام والتسليم لراحتك ووقتك الثمين.',
      icon: Clock,
    },
    {
      titleEn: 'Service Guarantee',
      titleAr: 'ضمان معتمد على القطع والعمل',
      descEn: 'Workmanship & parts guaranteed for total peace of mind.',
      descAr: 'ضمان رسمي موثق على قطع الغيار وأجور اليد العاملة لراحة بالك.',
      icon: ThumbsUp,
    },
  ];

  const faqs = [
    {
      qEn: 'How do I choose the right service category?',
      qAr: 'كيف أختار فئة الخدمة المناسبة لمركبتي؟',
      aEn: 'Click any category pill above (e.g. Maintenance, Repairs, Diagnostics, Electrical, Tires) to view specific services, or use our smart search bar.',
      aAr: 'يمكنك النقر على أي من تصنيفات الخدمات أعلاه (مثل الصيانة الدورية، الفرامل، الكهرباء، التكييف) أو استخدام شريط البحث الذكي أو مساعد الذكاء الاصطناعي.',
    },
    {
      qEn: 'Are services available across the UAE and Palestine?',
      qAr: 'هل الخدمات متاحة في كافة مناطق الإمارات وفلسطين؟',
      aEn: 'Yes! Ahl Al Markabat operates across Dubai (Al Quoz, Al Barsha, Deira), Abu Dhabi, Sharjah, Ramallah, Nablus, and major regional hubs.',
      aAr: 'نعم! تعمل منصة أهل المركبات في كافة مناطق دبي، أبوظبي، الشارقة، ورام الله، نابلس، الخليل، والقدس، وباقي المحافظات.',
    },
    {
      qEn: 'Can I get mobile on-site service at my home or office?',
      qAr: 'هل يمكنني طلب خدمة صيانة متنقلة أمام منزلي أو مكتبي؟',
      aEn: 'Yes! Choose "Mobile On-Site Services" to have a certified technician van dispatched directly to your doorstep.',
      aAr: 'نعم بالتأكيد! اختر "الصيانة المتنقلة" وستصلك ورشة صيانة متنقلة مجهزة بالكامل إلى باب بيتك أو عملك مباشرة.',
    },
    {
      qEn: 'Are the prices fixed and transparent?',
      qAr: 'هل الأسعار ثابتة وشفافة بدون رسوم خفية؟',
      aEn: 'Yes. You receive clear upfront estimates before confirming your booking, with 0 hidden fees.',
      aAr: 'نعم، تحصل على تسعيرة شفافة ومفصلة لقطع الغيار وأجور اليد العاملة والضريبة قبل تأكيد الحجز وبدون أي تكاليف مخفية.',
    },
    {
      qEn: 'Is there a warranty on parts and labor?',
      qAr: 'هل هناك ضمان معتمد على القطع والعمل؟',
      aEn: 'Every service booked through Ahl Al Markabat includes an official verified warranty on parts and workmanship.',
      aAr: 'كل خدمة يتم حجزها عبر أهل المركبات مشمولة بضمان رسمي موثق يُسجل في جواز السفر الرقمي لمركبتك لحماية حقوقك.',
    },
  ];

  return (
    <div className="space-y-10 pb-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      {/* 1. Header: Dedicated Services Page Hero vs Clean HomePage Section Header */}
      {activeTab === 'services' ? (
        <div className="relative bg-[#09152B] text-white py-16 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-slate-800">
          <div className="max-w-[1600px] mx-auto space-y-6 relative z-10">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {language === 'ar' ? 'كافة خدمات وصيانة المركبات' : 'All Automotive Services'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'منصة واحدة تجمع كل ما تحتاجه مركبتك. من الصيانة الدورية إلى الإصلاحات الهندسية المتقدمة، اعثر على أفضل الورش المعتمدة القريبة منك.'
                  : 'One platform. Every service your vehicle needs. From routine maintenance to advanced repairs, find verified experts near you.'}
              </p>
            </div>

            {/* Search Terminal Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-200 text-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
              {/* Where are you? */}
              <div className="lg:col-span-4 flex items-center gap-2.5 px-3 py-1.5 border-e border-slate-200">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="w-full">
                  <span className="text-[9px] text-slate-400 font-bold block uppercase">
                    {language === 'ar' ? 'أين موقعك؟' : 'Where are you?'}
                  </span>
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full text-xs font-black text-slate-900 outline-none bg-transparent cursor-pointer"
                  >
                    {locationsList.map((locGroup, i) => (
                      <optgroup key={i} label={language === 'ar' ? locGroup.groupAr : locGroup.groupEn}>
                        {locGroup.items.map((city) => (
                          <option key={city.id} value={city.id}>
                            {language === 'ar' ? city.ar : city.en}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              {/* What do you need? */}
              <div className="lg:col-span-4 flex items-center gap-2.5 px-3 py-1.5 border-e border-slate-200">
                <Wrench className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="w-full">
                  <span className="text-[9px] text-slate-400 font-bold block uppercase">
                    {language === 'ar' ? 'ما هي الخدمة المطلوبة؟' : 'What do you need?'}
                  </span>
                  <select
                    value={searchService}
                    onChange={(e) => setSearchService(e.target.value)}
                    className="w-full text-xs font-black text-slate-900 outline-none bg-transparent cursor-pointer"
                  >
                    <option value="all">{language === 'ar' ? 'جميع الخدمات والتخصصات' : 'All Services & Disciplines'}</option>
                    {allCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'ar' ? cat.titleAr : cat.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="lg:col-span-2 flex items-center gap-2.5 px-3 py-1.5 border-e border-slate-200">
                <Car className="w-4 h-4 text-slate-500 shrink-0" />
                <div className="w-full">
                  <span className="text-[9px] text-slate-400 font-bold block uppercase">
                    {language === 'ar' ? 'نوع المركبة' : 'Vehicle Type'}
                  </span>
                  <select
                    value={searchVehicleType}
                    onChange={(e) => setSearchVehicleType(e.target.value)}
                    className="w-full text-xs font-black text-slate-900 outline-none bg-transparent cursor-pointer"
                  >
                    {vehicleTypesList.map((vType) => (
                      <option key={vType.id} value={vType.id}>
                        {language === 'ar' ? vType.ar : vType.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search CTA Button */}
              <div className="lg:col-span-2">
                <button
                  onClick={() => setActiveTab('providers')}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'بحث عن ورشة' : 'Search Services'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 pt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{language === 'ar' ? 'دليل الخدمات الهندسية الشامل' : '21+ Specialized Automotive Categories'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {language === 'ar' ? 'كافة خدمات وتخصصات صيانة المركبات' : 'All Automotive Repair & Care Services'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {language === 'ar'
                  ? 'من الصيانة الميكانيكية وتوضيب المحركات إلى صيانة بطاريات الهايبرد والكهرباء والبرمجة، اختر الخدمة لعرض الورش المعتمدة.'
                  : 'From engine rebuilds and routine lube to EV battery diagnostics and ECU programming, find certified specialists.'}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('services')}
              className="text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors self-start md:self-auto cursor-pointer"
            >
              <span>{language === 'ar' ? 'استعراض الدليل المتقدم والبحث ←' : 'Open advanced directory →'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Interactive Category Filter Pills */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            {language === 'ar' ? 'تصفية حسب الفئة:' : 'Filter by category:'}
          </span>
          <span className="text-xs font-bold text-blue-600">
            {language === 'ar'
              ? `عرض ${filteredCategories.length} من أصل ${allCategories.length} خدمة`
              : `Showing ${filteredCategories.length} of ${allCategories.length} services`}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => {
            const isSelected = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs'
                }`}
              >
                {language === 'ar' ? tab.ar : tab.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Explore All Services (21-Grid of Categories matching Filter) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'ar' ? 'استكشف كافة الخدمات والورش' : 'Explore All Services'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'ar'
                ? 'اختر فئة الخدمة للاطلاع على مراكز الصيانة والورش المعتمدة القريبة منك.'
                : 'Choose a service category to find verified providers near you.'}
            </p>
          </div>

          {/* Quick Filter Keyword Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={textSearch}
              onChange={(e) => setTextSearch(e.target.value)}
              placeholder={language === 'ar' ? 'ابحث في الخدمات...' : 'Search in services...'}
              className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Categories Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={cat.img} alt={cat.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 end-2.5 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black shadow-sm">
                      {language === 'ar' ? cat.badgeAr : cat.badgeEn}
                    </span>
                  </div>

                  <div>
                    <strong className="text-sm font-black text-slate-900 block group-hover:text-blue-600 transition-colors">
                      {language === 'ar' ? cat.titleAr : cat.titleEn}
                    </strong>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                      {language === 'ar' ? cat.descAr : cat.descEn}
                    </p>
                  </div>

                  {/* Sub-services tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {(language === 'ar' ? cat.subServicesAr : cat.subServicesEn).slice(0, 3).map((sub, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[9px] font-bold">
                        {sub}
                      </span>
                    ))}
                    {(language === 'ar' ? cat.subServicesAr : cat.subServicesEn).length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[9px] font-bold">
                        +{(language === 'ar' ? cat.subServicesAr : cat.subServicesEn).length - 3} {language === 'ar' ? 'المزيد' : 'more'}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('providers')}
                  className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-1 group-hover:bg-blue-600 group-hover:text-white"
                >
                  <span>{language === 'ar' ? 'استعراض الورش المعتمدة' : 'View Verified Providers'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Popular Bundled Services (Screenshot 2) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'ar' ? 'باقات الصيانة المجمعة الأكثر طلباً' : 'Popular Bundled Services'}
            </h2>
            <p className="text-xs text-slate-500">
              {language === 'ar'
                ? 'وفر الوقت والمال مع أكثر باقات الصيانة وحزم الفحص حجزاً على المنصة.'
                : 'Save time and money with our most booked service packages.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('providers')}
            className="text-xs font-bold text-blue-600 hover:underline self-start sm:self-auto"
          >
            {language === 'ar' ? 'استعراض كافة الباقات ←' : 'View All Bundles →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black">
                    {language === 'ar' ? pkg.badgeAr : pkg.badgeEn}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    {language === 'ar' ? pkg.typeAr : pkg.typeEn}
                  </span>
                </div>
                <strong className="text-sm font-black text-slate-900 block leading-snug">
                  {language === 'ar' ? pkg.titleAr : pkg.titleEn}
                </strong>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {language === 'ar' ? pkg.descAr : pkg.descEn}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'يبدأ من' : 'From'}</span>
                  <strong className="text-base font-black text-slate-900 font-mono">{pkg.price}</strong>
                </div>
                <button
                  onClick={() => {
                    showToast(
                      language === 'ar'
                        ? `تم اختيار ${pkg.titleAr}!`
                        : `Selected ${pkg.titleEn}!`,
                      'info'
                    );
                    setActiveTab('book-service');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>{language === 'ar' ? 'حجز الباقة ←' : 'Book Bundle →'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5, 6, 7: Dedicated Services Page Supplements (Why Choose, Help Banner, FAQs) */}
      {activeTab === 'services' && (
        <>
          {/* 5. Why Choose Verified Providers on Ahl Al Markabat */}
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-4">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-2xs space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {language === 'ar'
                    ? 'لماذا يفضل العملاء حجز الورش المعتمدة عبر أهل المركبات؟'
                    : 'Why Choose Verified Providers on Ahl Al Markabat?'}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {whyChooseFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-center flex flex-col items-center">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <strong className="text-xs font-black text-slate-900 block">
                        {language === 'ar' ? feat.titleAr : feat.titleEn}
                      </strong>
                      <p className="text-[10px] text-slate-500 leading-snug">
                        {language === 'ar' ? feat.descAr : feat.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 6. Need Help Choosing the Right Service? */}
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 pt-4">
            <div className="bg-[#09152B] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'ar' ? 'هل تحتاج مساعدة في اختيار الخدمة المناسبة؟' : 'Need Help Choosing the Right Service?'}
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  {language === 'ar'
                    ? 'فريق مستشاري السيارات لدينا متاح على مدار الساعة لمساعدتك وتوجيهك لأفضل ورشة متخصصة في عطل مركبتك.'
                    : 'Our automotive advisors are here 24/7 to guide you to the right specialist.'}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    {language === 'ar' ? 'طلب استشارة فورية' : 'Get Help Now'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAIAssistantOpen(true)}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'ar' ? 'اسأل مساعد الذكاء الاصطناعي ✨' : 'Ask Ahl AI Advisor'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-1 text-center shrink-0">
                <span className="text-[10px] text-slate-400 font-bold block">
                  {language === 'ar' ? 'تحدث مباشرة مع خبرائنا • اتصال أو واتساب' : 'Talk to our experts • Call or WhatsApp'}
                </span>
                <a
                  href="tel:+971501234567"
                  className="text-xl sm:text-2xl font-black text-amber-400 hover:text-amber-300 font-mono block transition-colors"
                >
                  +971 50 123 4567
                </a>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {language === 'ar' ? 'متاح 24/7 في الإمارات والمنطقة' : 'Available 24/7 in UAE & Region'}
                </span>
              </div>
            </div>
          </div>

          {/* 7. Frequently Asked Questions */}
          <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-4 pt-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {language === 'ar' ? 'الأسئلة الشائعة والأكثر تكراراً' : 'Frequently Asked Questions'}
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-start font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 font-medium">
                        {language === 'ar' ? faq.aAr : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
