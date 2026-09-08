export interface MockupScreen {
  id: string;
  number: number;
  filename: string;
  path: string;
  titleAr: string;
  titleEn: string;
  category: 'web_customer' | 'web_provider' | 'web_admin' | 'mobile_customer' | 'mobile_provider' | 'brand' | 'provider_facility';
  epicId?: string;
  moduleAr: string;
  moduleEn: string;
  personaAr: string;
  personaEn: string;
  descriptionAr: string;
  descriptionEn: string;
  aspectRatio: 'desktop' | 'mobile' | 'banner' | 'square';
  tags: string[];
}

export interface BrandAsset {
  id: string;
  filename: string;
  path: string;
  titleAr: string;
  titleEn: string;
  type: 'logo' | 'styleguide' | 'onboarding' | 'facility';
  descriptionAr: string;
  descriptionEn: string;
  dimensions: string;
  tags: string[];
}

// Brand Identity Assets
export const BRAND_ASSETS: BrandAsset[] = [
  {
    id: 'brand-logo-crest',
    filename: 'AHL AL MARKABAT.png',
    path: '/images/AHL AL MARKABAT.png',
    titleAr: 'الشعار الرسمي المعتمد — أهل المركبات',
    titleEn: 'Official Brand Crest — Ahl Al Markabat',
    type: 'logo',
    descriptionAr: 'الشعار الرسمي الرئيسي عالي الدقة يجمع بين درع الأمان وتروس الميكانيك ولمسات اللون الذهبي الملكي.',
    descriptionEn: 'High-resolution primary brand crest combining security shield, mechanical gear elements, and royal automotive gold typography.',
    dimensions: '1254 × 1254 px',
    tags: ['Logo', 'Brand', 'Crest', 'Typography', 'Vector Master'],
  },
  {
    id: 'brand-logo-alt',
    filename: 'AHL_ALMARKABAT_LOGO2.png',
    path: '/images/AHL_ALMARKABAT_LOGO2.png',
    titleAr: 'شعار أهل المركبات — النموذج الهندسي البديل',
    titleEn: 'Ahl Al Markabat Emblem — Geometric Variation',
    type: 'logo',
    descriptionAr: 'النسخة الهندسية المعاصرة للشعار للاستخدام في الخلفيات الداكنة وشاشات الهواتف الذكية وتطبيقات الأساطيل.',
    descriptionEn: 'Contemporary geometric emblem variant optimized for dark mode interfaces, mobile apps, and fleet portals.',
    dimensions: '1254 × 1254 px',
    tags: ['Logo', 'Emblem', 'Dark Mode', 'Iconography'],
  },
  {
    id: 'brand-styleguide',
    filename: 'AHL AL MARKABAT Styles.png',
    path: '/images/AHL AL MARKABAT Styles.png',
    titleAr: 'دليل الهوية البصرية ونظام التصميم (Design System)',
    titleEn: 'Visual Identity & Design System Style Sheet',
    type: 'styleguide',
    descriptionAr: 'لوحة الألوان المعتمدة (Gold #FBBF24, Navy #0B132B, Emerald #10B981)، والخطوط العربية، وتدرجات الأزرار، والبطاقات الزجاجية.',
    descriptionEn: 'Complete color palette tokens, typography rules, glassmorphism card elevation, badges, and primary action buttons.',
    dimensions: '1536 × 1024 px',
    tags: ['Design System', 'Color Palette', 'Typography', 'UI Tokens', 'Figma Guide'],
  },
  {
    id: 'brand-onboarding',
    filename: '01_Onboarding.png',
    path: '/images/01_Onboarding.png',
    titleAr: 'شاشة الترحيب والتهيئة التفاعلية (Customer Onboarding)',
    titleEn: 'Native Mobile Onboarding & Value Proposition',
    type: 'onboarding',
    descriptionAr: 'شاشة استقبال العملاء في التطبيق وتوضيح مزايا فحص وتصليح المركبات، مقارنة الأسعار، وطلب المساعدة الفورية.',
    descriptionEn: 'Customer welcome onboarding screen illustrating instant diagnostics, quote comparison, verified workshops, and SOS.',
    dimensions: '600 × 1095 px',
    tags: ['Mobile', 'Onboarding', 'Welcome', 'Customer App', 'Splash'],
  },
  {
    id: 'facility-autotech',
    filename: 'SAMPLESERVICEPROVIDER1.png',
    path: '/images/SAMPLESERVICEPROVIDER1.png',
    titleAr: 'مركز أوتو تك للتشخيص والصيانة — صورة المنشأة المعتمدة',
    titleEn: 'AutoTech Certified Workshop & Diagnostic Center Facility',
    type: 'facility',
    descriptionAr: 'صورة حقيقية للمنشأة المعتمدة توضح روافع الهيدروليك، أجهزة تشخيص الكمبيوتر المتقدمة، وبيئة العمل النظيفة والموثقة.',
    descriptionEn: 'Verified facility photo showcasing professional hydraulic lifts, advanced diagnostic stations, and certified workshop floor.',
    dimensions: '1536 × 1024 px',
    tags: ['Workshop', 'Verified Provider', 'Facility', 'Diagnostic Bay', 'KYC Proof'],
  },
  {
    id: 'facility-rapidfix',
    filename: 'SAMPLESERVICEPROVIDER2.png',
    path: '/images/SAMPLESERVICEPROVIDER2.png',
    titleAr: 'مركز رابيد فيكس السريع — مسارات الصيانة والميزان الليزري',
    titleEn: 'Rapid Fix Multi-Bay Service & Laser Alignment Facility',
    type: 'facility',
    descriptionAr: 'صورة المنشأة المعتمدة لمسارات الخدمة السريعة، تبديل الإطارات، ترصيص الليزر ثلاثي الأبعاد، وغيار الزيوت.',
    descriptionEn: 'Certified facility photo showing multi-bay quick service lane, tire dynamic balancing, 3D laser alignment, and quick lube.',
    dimensions: '1536 × 1024 px',
    tags: ['Workshop', 'Quick Lube', 'Tire Center', 'Laser Alignment', 'KYC Proof'],
  },
];

// Helper to build web screens (1 to 54) with descriptive metadata
export const WEB_MOCKUP_SCREENS: MockupScreen[] = [
  {
    id: 'web-1',
    number: 1,
    filename: '1.png',
    path: '/images/web/1.png',
    titleAr: 'الصفحة الرئيسية وسوق الخدمات (Public Home & Marketplace)',
    titleEn: 'Public Landing Page & Service Marketplace',
    category: 'web_customer',
    epicId: 'EPIC-03',
    moduleAr: 'السوق العام والتصنيفات',
    moduleEn: 'Public Marketplace & Search',
    personaAr: 'مالك المركبة / الزائر',
    personaEn: 'Vehicle Owner / Guest',
    descriptionAr: 'الواجهة الرئيسية العامة للبحث عن الخدمات، اختيار المدينة، استعراض التصنيفات الـ 24، وأحدث العروض المعتمدة.',
    descriptionEn: 'Hero search bar with city filter, 24 service categories matrix, popular maintenance packages, and verified badges.',
    aspectRatio: 'desktop',
    tags: ['Hero', 'Search', 'Service Matrix', 'Localization'],
  },
  {
    id: 'web-2',
    number: 2,
    filename: '2.png',
    path: '/images/web/2.png',
    titleAr: 'استعراض التصنيفات الهندسية المتقدمة',
    titleEn: 'Service Category Taxonomy & Subcategories',
    category: 'web_customer',
    epicId: 'EPIC-03',
    moduleAr: 'هيكلية وتصنيف الخدمات',
    moduleEn: 'Service Taxonomy & Filters',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'قائمة التصنيفات الفرعية لمحركات البنزين، الديزل، الهايبرد، البرمجة، والمساعدين مع متوسط الأسعار المتوقعة.',
    descriptionEn: 'Subcategory breakdown with starting prices, mobile mechanic availability flags, and estimated turnaround hours.',
    aspectRatio: 'desktop',
    tags: ['Categories', 'Subcategories', 'Pricing', 'Filters'],
  },
  {
    id: 'web-3',
    number: 3,
    filename: '3.png',
    path: '/images/web/3.png',
    titleAr: 'دليل مراكز الصيانة والورش مع الخريطة التفاعلية',
    titleEn: 'Provider Directory & Geolocation Map',
    category: 'web_customer',
    epicId: 'EPIC-04',
    moduleAr: 'دليل المزودين والخرائط',
    moduleEn: 'Provider Directory & PostGIS Map',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'قائمة المراكز المعتمدة مع فلترة حسب المسافة، التقييم، التخصصات، وساعات العمل مع خريطة جغرافية حية.',
    descriptionEn: 'Split view of interactive Leaflet/PostGIS map and provider cards with distance ranking, ratings, and instant chat.',
    aspectRatio: 'desktop',
    tags: ['Directory', 'Map', 'Geolocation', 'Providers', 'Reviews'],
  },
  {
    id: 'web-4',
    number: 4,
    filename: '4.png',
    path: '/images/web/4.png',
    titleAr: 'الملف التعريفي الشامل لمركز الصيانة (Provider Profile)',
    titleEn: 'Verified Provider Public Profile & Credentials',
    category: 'web_customer',
    epicId: 'EPIC-04',
    moduleAr: 'صفحة المزود والاعتماد',
    moduleEn: 'Provider Profile & Trust Tier',
    personaAr: 'مالك المركبة / المزود',
    personaEn: 'Vehicle Owner / Provider',
    descriptionAr: 'عرض تفصيلي للمركز يشمل معرض الصور، الشهادات، الفنيين المعتمدين، قائمة الخدمات والأسعار، وآراء العملاء الموثقة.',
    descriptionEn: 'Detailed provider showcase with photo gallery, technician roster, price list, working hours, and verified customer reviews.',
    aspectRatio: 'desktop',
    tags: ['Profile', 'Gallery', 'Technicians', 'Certificates', 'Reviews'],
  },
  {
    id: 'web-5',
    number: 5,
    filename: '5.png',
    path: '/images/web/5.png',
    titleAr: 'معالج طلب تسعيرة متعدد المراحل (Request For Quote Wizard)',
    titleEn: 'Multi-Step RFQ Service Request Wizard',
    category: 'web_customer',
    epicId: 'EPIC-05',
    moduleAr: 'طلبات عروض الأسعار',
    moduleEn: 'Service RFQ Workflow',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'خطوات تقديم طلب الصيانة: اختيار المركبة، وصف العطل، إرفاق صور وتسجيلات صوتية، وتحديد الموقع وطريقة الخدمة.',
    descriptionEn: 'Step-by-step diagnostic RFQ submission: vehicle selector, symptom checklist, audio/photo uploads, and mobile vs garage choice.',
    aspectRatio: 'desktop',
    tags: ['RFQ', 'Wizard', 'Diagnostics', 'Photo Upload', 'Service Request'],
  },
  {
    id: 'web-6',
    number: 6,
    filename: '6.png',
    path: '/images/web/6.png',
    titleAr: 'جدول مقارنة عروض الأسعار جنباً إلى جنب (Quote Matrix)',
    titleEn: 'Side-by-Side Quotation Comparison Matrix',
    category: 'web_customer',
    epicId: 'EPIC-06',
    moduleAr: 'مقارنة العروض والمناقصات',
    moduleEn: 'Quotation Comparison & Decision',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'مقارنة شفافة ومفصلة بين عروض الورش من حيث السعر الإجمالي، قطع الغيار (وكالة مقابل تجاري)، فترة الضمان، وموعد الانتهاء.',
    descriptionEn: 'Direct comparison table analyzing parts quality, labor fees, warranty duration, completion time, and workshop trust level.',
    aspectRatio: 'desktop',
    tags: ['Quotes', 'Comparison Matrix', 'Parts Breakdown', 'Warranty', 'Decision'],
  },
  {
    id: 'web-7',
    number: 7,
    filename: '7.png',
    path: '/images/web/7.png',
    titleAr: 'حجز المواعيد واختيار الفترات الزمنية (Slot Booking)',
    titleEn: 'Appointment Scheduling & Bay Slot Booking',
    category: 'web_customer',
    epicId: 'EPIC-05',
    moduleAr: 'حجز المواعيد والتقويم',
    moduleEn: 'Booking & Capacity Calendar',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'اختيار يوم ووقت الزيارة المتاح لدى الورشة مع إمكانية طلب خدمة استلام وتوصيل المركبة (Valet Service).',
    descriptionEn: 'Real-time booking calendar with bay availability slots and optional concierge pickup/drop-off valet service.',
    aspectRatio: 'desktop',
    tags: ['Booking', 'Calendar', 'Time Slots', 'Valet Pickup'],
  },
  {
    id: 'web-8',
    number: 8,
    filename: '8.png',
    path: '/images/web/8.png',
    titleAr: 'تتبع مسار الخدمة المباشر والأدلة المصورة (Live Job Tracking)',
    titleEn: 'Real-Time Job Telemetry & Evidence Photos',
    category: 'web_customer',
    epicId: 'EPIC-07',
    moduleAr: 'متابعة الصيانة والأدلة',
    moduleEn: 'Job Execution & Evidence Stream',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'متابعة حية لمراحل الصيانة (الفحص، فك القطع، تركيب الجديد، الفحص النهائي) مع صور وملاحظات المهندس الفني.',
    descriptionEn: 'Live job progress stepper with before/after photos, diagnostic readings, technician notes, and additional work approval.',
    aspectRatio: 'desktop',
    tags: ['Live Tracking', 'Job Progress', 'Photos', 'Evidence', 'Approval'],
  },
  {
    id: 'web-9',
    number: 9,
    filename: '9.png',
    path: '/images/web/9.png',
    titleAr: 'كراجي الرقمي وسجل الصيانة الدائم (My Garage Dashboard)',
    titleEn: 'Digital Vehicle Garage & Health Telemetry',
    category: 'web_customer',
    epicId: 'EPIC-02',
    moduleAr: 'الكراج الرقمي والملكية',
    moduleEn: 'Garage & Digital Ownership',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'إدارة مركباتك، حساب مؤشر صحة المركبة، سجل الفحوصات الدورية، وتنبيهات مواعيد غيار الزيت والترخيص والتأمين.',
    descriptionEn: 'Manage multi-vehicle garage, health scores, maintenance timelines, oil change countdowns, and insurance expiry alerts.',
    aspectRatio: 'desktop',
    tags: ['Garage', 'Health Score', 'Service Records', 'Reminders', 'VIN'],
  },
  {
    id: 'web-10',
    number: 10,
    filename: '10.png',
    path: '/images/web/10.png',
    titleAr: 'تقرير الفحص الفني الرقمي الشامل (Digital Inspection Report)',
    titleEn: 'Comprehensive Digital Vehicle Inspection (DVI)',
    category: 'web_customer',
    epicId: 'EPIC-07',
    moduleAr: 'تقارير الفحص الرقمية',
    moduleEn: 'Digital Inspection (DVI)',
    personaAr: 'مالك المركبة / الفني',
    personaEn: 'Vehicle Owner / Inspector',
    descriptionAr: 'تقرير فحص 50 نقطة ملون (أخضر سليم، أصفر تنبيه، أحمر حرج) مع صور التلف وتقديرات تكلفة الإصلاح.',
    descriptionEn: '50-point color-coded health report (green/amber/red) with photo evidence of wear and instant repair cost estimation.',
    aspectRatio: 'desktop',
    tags: ['DVI', 'Inspection', '50-Point Check', 'Diagnostics', 'PDF Export'],
  },
  // Auto-generate remaining web screens with systematic metadata
  ...Array.from({ length: 44 }, (_, idx) => {
    const num = idx + 11;
    let cat: MockupScreen['category'] = 'web_customer';
    let epic = 'EPIC-05';
    let modAr = 'نظام الخدمات والمراسلات';
    let modEn = 'Service Messaging & Quotes';
    let perAr = 'مالك المركبة';
    let perEn = 'Vehicle Owner';
    let titleAr = `شاشة الويب رقم ${num} — سير العمليات`;
    let titleEn = `Web Workflow Screen #${num}`;
    let descAr = 'واجهة متخصصة لإدارة العمليات وخدمات صيانة المركبات عبر المنظومة الرقمية.';
    let descEn = 'Specialized web interface for vehicle workflow management, operations, and service telemetry.';

    if (num >= 11 && num <= 20) {
      cat = 'web_customer';
      epic = 'EPIC-08';
      modAr = 'المحادثة والفوترة والدفع الإلكتروني';
      modEn = 'Chat, Invoicing & Digital Payments';
      titleAr = `إدارة المحادثات وعروض الأسعار والفوترة #${num}`;
      titleEn = `Direct Messaging, Quotes & Billing #${num}`;
      descAr = 'قنوات التواصل المباشر مع مهندسي الورشة، استلام عروض الأسعار المعدلة، ودفع الفواتير الرقمية.';
      descEn = 'Direct messaging with shop advisors, receiving revised quote estimates, and digital invoice settlement.';
    } else if (num >= 21 && num <= 38) {
      cat = 'web_provider';
      epic = 'EPIC-11';
      modAr = 'بوابة المزود ونظام إدارة الورش (Workshop SaaS)';
      modEn = 'Provider Portal & Workshop SaaS';
      perAr = 'صاحب الورشة / مدير الصيانة';
      perEn = 'Workshop Owner / Service Advisor';
      titleAr = `بوابة المزود وسير أوامر العمل (Work Orders) #${num}`;
      titleEn = `Provider SaaS & Job Kanban Board #${num}`;
      descAr = 'لوحة تحكم الورشة لإدارة أوامر الصيانة (Kanban)، تعيين الفنيين، جرد قطع الغيار، وإصدار عروض الأسعار.';
      descEn = 'Workshop operational console: work orders Kanban, technician assignment, inventory consumption, and quote builder.';
    } else {
      cat = 'web_admin';
      epic = 'EPIC-13';
      modAr = 'لوحة التحكم المركزية والحوكمة (Super Admin)';
      modEn = 'Super Admin Governance & Audit';
      perAr = 'مدير المنصة المركزي';
      perEn = 'Platform Super Administrator';
      titleAr = `لوحة الحوكمة والتدقيق المركزي (Admin Console) #${num}`;
      titleEn = `Super Admin Platform Operations & KYC #${num}`;
      descAr = 'إدارة تدقيق وثائق KYC للمزودين، ضبط العمولات، إدارة التصنيفات، ومراقبة مؤشرات الأداء والنزاعات.';
      descEn = 'Platform governance: KYC compliance audits, commission ledgers, category taxonomy, and operational KPIs.';
    }

    return {
      id: `web-${num}`,
      number: num,
      filename: `${num}.png`,
      path: `/images/web/${num}.png`,
      titleAr,
      titleEn,
      category: cat,
      epicId: epic,
      moduleAr: modAr,
      moduleEn: modEn,
      personaAr: perAr,
      personaEn: perEn,
      descriptionAr: descAr,
      descriptionEn: descEn,
      aspectRatio: 'desktop' as const,
      tags: [cat.replace('_', ' '), epic, 'Web Screen', `Screen ${num}`],
    };
  }),
];

// Helper to build mobile screens (1 to 60) with rich metadata
export const MOBILE_MOCKUP_SCREENS: MockupScreen[] = [
  {
    id: 'mob-1',
    number: 1,
    filename: 'ahlalmarkabat1.png',
    path: '/images/mobile/ahlalmarkabat1.png',
    titleAr: 'واجهة الترحيب وتسجيل الدخول السريع (Welcome & Phone Login)',
    titleEn: 'Mobile Welcome Screen & Phone OTP Login',
    category: 'mobile_customer',
    epicId: 'EPIC-01',
    moduleAr: 'الهوية وتأكيد رقم الهاتف',
    moduleEn: 'Identity & Phone OTP Verification',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'واجهة البدء لاختيار الدولة وإدخال رقم الهاتف لاستلام رمز التحقق OTP السريع مع دعم المصادقة الحيوية.',
    descriptionEn: 'Initial splash and phone number input with country selector, SMS OTP verification, and biometric login.',
    aspectRatio: 'mobile',
    tags: ['Splash', 'OTP', 'Login', 'Onboarding', 'Mobile UI'],
  },
  {
    id: 'mob-2',
    number: 2,
    filename: 'ahlalmarkabat2.png',
    path: '/images/mobile/ahlalmarkabat2.png',
    titleAr: 'إدخال رمز التحقق وتأكيد الحساب (OTP Verification)',
    titleEn: 'Secure OTP Code Verification',
    category: 'mobile_customer',
    epicId: 'EPIC-01',
    moduleAr: 'المصادقة والأمان',
    moduleEn: 'Authentication & Security',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'شاشة إدخال رمز التحقق المكون من 6 أرقام مع إعادة الإرسال ومؤشر الوقت المتبقي.',
    descriptionEn: '6-digit SMS code entry with countdown timer, auto-fill integration, and resend trigger.',
    aspectRatio: 'mobile',
    tags: ['OTP', 'Security', 'Verification'],
  },
  {
    id: 'mob-3',
    number: 3,
    filename: 'ahlalmarkabat3.png',
    path: '/images/mobile/ahlalmarkabat3.png',
    titleAr: 'إعداد الملف الشخصي والموقع الجغرافي (Profile & Location Setup)',
    titleEn: 'Customer Profile & GPS Permissions',
    category: 'mobile_customer',
    epicId: 'EPIC-01',
    moduleAr: 'الملف الشخصي والموقع',
    moduleEn: 'Customer Profile & Geolocation',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'تحديد الاسم، المدينة، ومنح صلاحيات الموقع الجغرافي لاكتشاف أقرب مزودي الخدمة تلقائياً.',
    descriptionEn: 'Name entry, primary city selection, and GPS permission prompt for instant nearby workshop discovery.',
    aspectRatio: 'mobile',
    tags: ['Profile', 'GPS', 'Location', 'Setup'],
  },
  {
    id: 'mob-4',
    number: 4,
    filename: 'ahlalmarkabat4.png',
    path: '/images/mobile/ahlalmarkabat4.png',
    titleAr: 'إضافة المركبة الأولى إلى الكراج (Add Vehicle to Garage)',
    titleEn: 'Add First Vehicle via Plate or VIN',
    category: 'mobile_customer',
    epicId: 'EPIC-02',
    moduleAr: 'الكراج والمركبات',
    moduleEn: 'Garage & Vehicle Onboarding',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'إضافة بيانات المركبة: الشركة المصنعة، الموديل، سنة الصنع، رقم اللوحة ونوع المحرك.',
    descriptionEn: 'Vehicle master data entry: make, model, year, license plate, fuel type, and odometer reading.',
    aspectRatio: 'mobile',
    tags: ['Add Vehicle', 'Garage', 'VIN', 'Plate'],
  },
  {
    id: 'mob-5',
    number: 5,
    filename: 'ahlalmarkabat5.png',
    path: '/images/mobile/ahlalmarkabat5.png',
    titleAr: 'الخلاصة الرئيسية لتطبيق العميل (Customer App Home Feed)',
    titleEn: 'Customer Mobile App Home Feed & Services',
    category: 'mobile_customer',
    epicId: 'EPIC-03',
    moduleAr: 'الرئيسية وسوق الخدمات',
    moduleEn: 'Mobile Home & Service Discovery',
    personaAr: 'مالك المركبة',
    personaEn: 'Vehicle Owner',
    descriptionAr: 'الصفحة الرئيسية للتطبيق وتتضمن بطاقة المركبة النشطة، أزرار الطوارئ SOS، شريط البحث، والتصنيفات الشائعة.',
    descriptionEn: 'Primary mobile home feed: active vehicle widget, emergency SOS banner, quick service chips, and popular garages.',
    aspectRatio: 'mobile',
    tags: ['Home Feed', 'SOS Button', 'Vehicle Card', 'Services'],
  },
  // Auto-generate remaining mobile screens with systematic metadata
  ...Array.from({ length: 55 }, (_, idx) => {
    const num = idx + 6;
    const fn = num === 10 ? 'ahlamarkabat10.png' : `ahlalmarkabat${num}.png`;
    const isCustomer = num <= 30;

    let cat: MockupScreen['category'] = isCustomer ? 'mobile_customer' : 'mobile_provider';
    let epic = isCustomer ? (num <= 15 ? 'EPIC-03' : num <= 22 ? 'EPIC-05' : 'EPIC-07') : (num <= 45 ? 'EPIC-11' : 'EPIC-07');
    let modAr = isCustomer ? 'تطبيق العميل والخدمات' : 'تطبيق الفني والمزود';
    let modEn = isCustomer ? 'Customer App Workflows' : 'Technician Mobile Operations';
    let perAr = isCustomer ? 'مالك المركبة' : 'الفني / المزود الميداني';
    let perEn = isCustomer ? 'Vehicle Owner' : 'Field Technician / Provider';
    let titleAr = isCustomer ? `تطبيق العميل للهواتف الذكية — شاشة #${num}` : `تطبيق الفني والمزود — شاشة العمليات #${num}`;
    let titleEn = isCustomer ? `Customer Mobile App Screen #${num}` : `Technician Mobile Operational Screen #${num}`;
    let descAr = isCustomer
      ? 'شاشة متكاملة لتجربة العميل على الهواتف الذكية لمتابعة المركبات وطلب عروض الأسعار.'
      : 'شاشة تشغيلية لتطبيق الفني لإدارة البلاغات، الملاحة الميدانية، والتوثيق المصور.';
    let descEn = isCustomer
      ? 'Native mobile interface for customer vehicle telemetry, quote requests, and chat.'
      : 'Native mobile interface for field technician dispatch, navigation, and digital photo inspection.';

    if (num >= 6 && num <= 10) {
      titleAr = `استعراض الورش والبحث الجغرافي #${num}`;
      titleEn = `Nearby Workshop Discovery & Map #${num}`;
    } else if (num >= 11 && num <= 20) {
      titleAr = `طلب الخدمة والتشخيص وتلقي العروض #${num}`;
      titleEn = `Diagnostic Request & Quotes Feed #${num}`;
    } else if (num >= 21 && num <= 30) {
      titleAr = `سجل كراجي الصحي والفواتير والمحادثات #${num}`;
      titleEn = `Garage Health, Records & Live Chat #${num}`;
    } else if (num >= 31 && num <= 40) {
      titleAr = `استقبال وتأكيد أوامر العمل للفني #${num}`;
      titleEn = `Technician Job Acceptance & Dispatch #${num}`;
    } else if (num >= 41 && num <= 50) {
      titleAr = `الفحص الرقمي والأدلة المصورة الميدانية #${num}`;
      titleEn = `Field Digital Inspection & Photo Evidence #${num}`;
    } else {
      titleAr = `إكمال الصيانة والفوترة ومراجعة التقييمات #${num}`;
      titleEn = `Job Completion, Invoicing & Feedback #${num}`;
    }

    return {
      id: `mob-${num}`,
      number: num,
      filename: fn,
      path: `/images/mobile/${fn}`,
      titleAr,
      titleEn,
      category: cat,
      epicId: epic,
      moduleAr: modAr,
      moduleEn: modEn,
      personaAr: perAr,
      personaEn: perEn,
      descriptionAr: descAr,
      descriptionEn: descEn,
      aspectRatio: 'mobile' as const,
      tags: [isCustomer ? 'Customer App' : 'Provider App', epic, `Screen ${num}`, 'Mobile Native'],
    };
  }),
];

export const ALL_MOCKUPS_COUNT = {
  web: WEB_MOCKUP_SCREENS.length,
  mobile: MOBILE_MOCKUP_SCREENS.length,
  brand: BRAND_ASSETS.length,
  total: WEB_MOCKUP_SCREENS.length + MOBILE_MOCKUP_SCREENS.length + BRAND_ASSETS.length,
};
