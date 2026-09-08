import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { LeafletMap } from '../../common/LeafletMap';
import { Provider } from '../../../types';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
  Clock,
  Wrench,
  Sparkles,
  Map as MapIcon,
  List,
  CheckCircle2,
  Calendar,
  DollarSign,
  Car,
  ExternalLink,
  MessageCircle,
  Truck,
  Zap,
  Award,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  RotateCcw,
  Snowflake,
  Cpu,
  BatteryCharging,
} from 'lucide-react';

interface ExtendedWorkshop {
  id: string;
  countryId: string;
  countryNameEn: string;
  countryNameAr: string;
  countryFlag: string;
  name: string;
  nameAr: string;
  ownerName: string;
  rating: number;
  reviewCount: number;
  distance: string;
  distanceAr: string;
  distanceKm: number;
  address: string;
  addressAr: string;
  city: string;
  cityAr: string;
  phone: string;
  whatsapp?: string;
  hours: string;
  hoursAr: string;
  specialties: string[];
  specialtiesAr: string[];
  supportedMakes: string[];
  servicesOffered: string[];
  verified: boolean;
  vipPartner: boolean;
  priceRange: string;
  priceRangeAr: string;
  image: string;
  lat: number;
  lng: number;
  amenities: { en: string; ar: string }[];
  responseTimeMin: number;
}

export const CustomerWorkshopsTab: React.FC = () => {
  const {
    language,
    setActiveTab,
    providers,
    setIsQuoteModalOpen,
    setIsAIAssistantOpen,
    setSelectedProviderModal,
    startBookingWithProvider,
    setSelectedProviderForBooking,
    showToast,
  } = useApp();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'reviews'>('rating');

  // Comprehensive, verified workshops dataset with reliable local images & high-fidelity specs
  const defaultWorkshops: ExtendedWorkshop[] = useMemo(
    () => [
      {
        id: 'autotech-dubai',
        countryId: 'ae',
        countryNameEn: 'UAE',
        countryNameAr: 'الإمارات',
        countryFlag: 'AE',
        name: 'AutoTech Premier Garage',
        nameAr: 'مركز أوتو تك بريميير للصيانة',
        ownerName: 'Rashid Al-Nuaimi',
        rating: 4.9,
        reviewCount: 532,
        distance: '1.2 km away',
        distanceAr: 'على بعد 1.2 كم',
        distanceKm: 1.2,
        address: 'Al Quoz Industrial Area 3, Dubai, UAE',
        addressAr: 'المنطقة الصناعية 3، القوز، دبي، الإمارات',
        city: 'Dubai',
        cityAr: 'دبي',
        phone: '+971 4 340 9800',
        whatsapp: '+971 50 340 9800',
        hours: 'Open Now • 8:00 AM - 8:30 PM',
        hoursAr: 'مفتوح الآن • 8:00 ص - 8:30 م',
        specialties: ['Toyota & Lexus', 'Brakes & Suspension', 'AC Climate & Freon', 'Computer Diagnostics', 'Engine Overhaul'],
        specialtiesAr: ['تويوتا ولكزس', 'فرامل ومساعدين', 'تكييف وتبريد وفريون', 'فحص وبرمجة كمبيوتر', 'توضيب محركات'],
        supportedMakes: ['Toyota', 'Lexus', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'Ford'],
        servicesOffered: ['AC Cleaning & Gas Refill', '10K Full Synthetic Oil Change', 'Ceramic Brake Pads Replacement', 'Engine & Transmission Diagnostics', '3D Wheel Alignment'],
        verified: true,
        vipPartner: true,
        priceRange: 'Moderate ($$)',
        priceRangeAr: 'متوسط ($$)',
        image: '/images/garage_autotech.jpg',
        lat: 25.1384,
        lng: 55.2341,
        amenities: [
          { en: 'Free Valet Pickup', ar: 'خدمة استلام وتوصيل مجانية' },
          { en: 'Platform Warranty', ar: 'ضمان معتمد من المنصة' },
          { en: 'VIP Lounge', ar: 'استراحة VIP مجهزة' },
          { en: 'Digital Inspection (DVI)', ar: 'فحص رقمي شامل بالفيديو' },
        ],
        responseTimeMin: 10,
      },
      {
        id: 'rapidfix-uae',
        countryId: 'ae',
        countryNameEn: 'UAE',
        countryNameAr: 'الإمارات',
        countryFlag: 'AE',
        name: 'Rapid Fix Mobile Auto Care',
        nameAr: 'مركز رابيد فيكس للصيانة المتنقلة',
        ownerName: 'Zaid Al-Harbi',
        rating: 4.8,
        reviewCount: 318,
        distance: '2.5 km away',
        distanceAr: 'على بعد 2.5 كم',
        distanceKm: 2.5,
        address: 'Al Barsha 1, Dubai, UAE (Mobile Fleet Dispatch)',
        addressAr: 'البرشاء 1، دبي، الإمارات (أسطول متنقل 24/7)',
        city: 'Dubai',
        cityAr: 'دبي',
        phone: '+971 50 123 4567',
        whatsapp: '+971 50 123 4567',
        hours: 'Open Now • 24/7 Mobile Dispatch',
        hoursAr: 'مفتوح الآن • خدمة متنقلة 24/7',
        specialties: ['Mobile Oil & Filter', 'Battery Replacement', 'Tire Repair & Balance', 'Emergency Roadside SOS', 'AC Gas Top-Up'],
        specialtiesAr: ['غيار زيت وفلاتر متنقل', 'تبديل بطاريات بالموقع', 'صيانة إطارات وترصيص', 'إنقاذ وطوارئ طريق', 'شحن غاز مكيف'],
        supportedMakes: ['Toyota', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Mitsubishi', 'Mazda'],
        servicesOffered: ['Doorstep Oil & Filter Replacement', 'AC System Deep Cleaning & Gas', 'Battery Health Test & Fitment', 'Brake Pad Replacement at Home'],
        verified: true,
        vipPartner: true,
        priceRange: 'Affordable ($)',
        priceRangeAr: 'اقتصادي ($)',
        image: '/images/garage_rapidfix.jpg',
        lat: 25.1112,
        lng: 55.2001,
        amenities: [
          { en: 'Mobile Van at Your Doorstep', ar: 'ورشة متنقلة لباب بيتك' },
          { en: '24/7 Emergency SOS', ar: 'طوارئ وإنقاذ 24/7' },
          { en: '1-Year Battery Warranty', ar: 'ضمان سنة على البطارية' },
        ],
        responseTimeMin: 15,
      },
      {
        id: 'german-auto-abudhabi',
        countryId: 'ae',
        countryNameEn: 'UAE',
        countryNameAr: 'الإمارات',
        countryFlag: 'AE',
        name: 'German Tech Center (BMW & Mercedes)',
        nameAr: 'المركز الألماني المتخصص (بي إم دبليو ومرسيدس)',
        ownerName: 'Eng. Klaus Mansour',
        rating: 4.95,
        reviewCount: 420,
        distance: '4.1 km away',
        distanceAr: 'على بعد 4.1 كم',
        distanceKm: 4.1,
        address: 'Ras Al Khor Industrial 2, Dubai & Mussafah, Abu Dhabi',
        addressAr: 'رأس الخور الصناعية 2، دبي ومصفح، أبوظبي',
        city: 'Dubai / Abu Dhabi',
        cityAr: 'دبي / أبوظبي',
        phone: '+971 4 290 8877',
        whatsapp: '+971 52 290 8877',
        hours: 'Open Now • 8:30 AM - 7:30 PM',
        hoursAr: 'مفتوح الآن • 8:30 ص - 7:30 م',
        specialties: ['Mercedes-Benz & BMW', 'Audi / Porsche / VW', 'Transmission & DSG Overhaul', 'Air Suspension', 'ECU Online Coding'],
        specialtiesAr: ['مرسيدس-بنز وبي إم دبليو', 'أودي وبورش وفولكس فاجن', 'توضيب جير DSG وأوتوماتيك', 'مساعدين هيدروليك وهوائي', 'برمجة كمبيوتر أونلاين'],
        supportedMakes: ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Volkswagen'],
        servicesOffered: ['Full Computer Telemetry & Coding', 'AC Compressor & Dual Zone Evaporator', 'Transmission Service', 'Brembo Brake Overhaul'],
        verified: true,
        vipPartner: true,
        priceRange: 'Premium ($$$)',
        priceRangeAr: 'بريميوم ($$$)',
        image: '/images/branch_palauto_german.jpg',
        lat: 25.185,
        lng: 55.335,
        amenities: [
          { en: 'Certified Master Technicians', ar: 'فنيون معتمدون من الشركات الأم' },
          { en: 'OEM Genuine Parts Only', ar: 'قطع وكالة أصلية فقط' },
          { en: 'Warranty Protected', ar: 'ضمان مصنعي شامل' },
        ],
        responseTimeMin: 12,
      },
      {
        id: 'prov-01-ramallah',
        countryId: 'ps',
        countryNameEn: 'Palestine',
        countryNameAr: 'فلسطين',
        countryFlag: 'PS',
        name: 'PalAuto Diagnostic & Hybrid Center (Ramallah)',
        nameAr: 'مركز بال أوتو لفحص الهايبرد والكهرباء (رام الله)',
        ownerName: 'Eng. Tariq Mansour',
        rating: 4.9,
        reviewCount: 615,
        distance: '1.5 km away',
        distanceAr: 'على بعد 1.5 كم',
        distanceKm: 1.5,
        address: 'Al-Irsal St, Auto City Complex, Ramallah',
        addressAr: 'شارع الإرسال، مجمع مدينة السيارات، رام الله',
        city: 'Ramallah & Al-Bireh',
        cityAr: 'رام الله والبيرة',
        phone: '+970 2 298 7700',
        whatsapp: '+970 59 912 3456',
        hours: 'Open Now • 8:00 AM - 8:00 PM',
        hoursAr: 'مفتوح الآن • 8:00 ص - 8:00 م',
        specialties: ['Hybrid Battery Repair', 'EV Inverters & SOH', '3D Laser Alignment', 'OEM Parts', 'OBD-II Online Coding'],
        specialtiesAr: ['صيانة بطاريات هايبرد', 'محولات EV وفحص SOH', 'ميزان ليزر 3D', 'قطع أصلية', 'برمجة أونلاين'],
        supportedMakes: ['Toyota', 'Hyundai', 'Volkswagen', 'Mercedes-Benz', 'BMW', 'Skoda', 'Kia', 'Tesla'],
        servicesOffered: ['HV Battery Cell Balancing', 'Electronic Wheel Alignment', 'Engine Diagnostics', 'AC Freon Recharge'],
        verified: true,
        vipPartner: true,
        priceRange: 'Moderate ($$)',
        priceRangeAr: 'متوسط ($$)',
        image: '/images/garage_palauto.jpg',
        lat: 31.9078,
        lng: 35.2045,
        amenities: [
          { en: 'Multi-Branch Network (8 Hubs)', ar: 'شبكة كبرى بـ 8 فروع' },
          { en: 'Free Valet Pickup', ar: 'خدمة استلام وتوصيل' },
          { en: 'Warranty Protected', ar: 'كفالة معتمدة' },
        ],
        responseTimeMin: 10,
      },
      {
        id: 'prov-04-hebron',
        countryId: 'ps',
        countryNameEn: 'Palestine',
        countryNameAr: 'فلسطين',
        countryFlag: 'PS',
        name: 'Al-Khalil Diesel & Heavy Engineering Hub (Hebron)',
        nameAr: 'مجمع الخليل للميكانيك والديزل الثقيل (الخليل)',
        ownerName: 'Hajj Ibrahim Al-Ja\'bari',
        rating: 4.9,
        reviewCount: 412,
        distance: '2.1 km away',
        distanceAr: 'على بعد 2.1 كم',
        distanceKm: 2.1,
        address: 'Industrial Zone Ave, Block 12, Hebron',
        addressAr: 'شارع المنطقة الصناعية الكبرى، بلوك 12، الخليل',
        city: 'Hebron',
        cityAr: 'الخليل',
        phone: '+970 2 225 3300',
        whatsapp: '+970 59 933 4455',
        hours: 'Open Now • 7:00 AM - 7:00 PM',
        hoursAr: 'مفتوح الآن • 7:00 ص - 7:00 م',
        specialties: ['Diesel Injectors & Turbo', 'Commercial Fleet Maintenance', 'Engine Overhaul', 'Heavy Towing 24/7', 'Air Brakes'],
        specialtiesAr: ['بخاخات ديزل وتيربو', 'صيانة أساطيل تجارية', 'توضيب محركات ديزل', 'ونش سطحة ثقيل 24/7', 'فرامل هوائية'],
        supportedMakes: ['Mercedes-Benz Trucks', 'MAN', 'Volvo', 'Isuzu', 'Ford Transit', 'Toyota Hilux', 'Hyundai'],
        servicesOffered: ['Common Rail Injector Calibration', 'DPF Cleaning & Regen', 'Diesel Engine Rebuild', 'Pneumatic Brake Service'],
        verified: true,
        vipPartner: true,
        priceRange: 'Moderate ($$)',
        priceRangeAr: 'متوسط ($$)',
        image: '/images/branch_khalil_diesel_heavy.jpg',
        lat: 31.5326,
        lng: 35.0998,
        amenities: [
          { en: 'Heavy Commercial Lifts (10 Bays)', ar: '10 روافع هيدروليك للشاحنات' },
          { en: '24/7 Heavy Towing', ar: 'ونش سطحة هيدروليك 24/7' },
          { en: 'Fleet Fleet Accounts', ar: 'حسابات وإدارة أساطيل' },
        ],
        responseTimeMin: 15,
      },
      {
        id: 'prov-05-jerusalem',
        countryId: 'ps',
        countryNameEn: 'Palestine',
        countryNameAr: 'فلسطين',
        countryFlag: 'PS',
        name: 'Al-Quds Express & EV Center (Jerusalem)',
        nameAr: 'مركز القدس إكسبريس والمتخصص في EV (القدس)',
        ownerName: 'Dr. Munir Al-Disi',
        rating: 5.0,
        reviewCount: 489,
        distance: '3.2 km away',
        distanceAr: 'على بعد 3.2 كم',
        distanceKm: 3.2,
        address: 'Beit Hanina Blvd, Al-Zahra Plaza, Jerusalem',
        addressAr: 'شارع بيت حنينا العام، مجمع الزهراء، القدس الشريف',
        city: 'Jerusalem',
        cityAr: 'القدس الشريف',
        phone: '+972 2 581 2299',
        whatsapp: '+972 54 444 8877',
        hours: 'Open Now • 8:00 AM - 9:00 PM',
        hoursAr: 'مفتوح الآن • 8:00 ص - 9:00 م',
        specialties: ['EV Ultra Fast Charging', 'Full Digital Inspection (DVI)', 'Brembo Brake Center', 'VIP Mobile Service', 'AC Climate'],
        specialtiesAr: ['شحن سريع وفحص EV', 'فحص DVI رقمي بـ 21 نقطة', 'مركز فرامل بريمبو', 'خدمة VIP متنقلة', 'تكييف وتبريد'],
        supportedMakes: ['Tesla', 'Porsche', 'Audi e-tron', 'Mercedes EQ', 'BMW i-Series', 'Lexus Hybrid', 'Hyundai Ioniq'],
        servicesOffered: ['EV Battery SOH Assessment', 'Inverter Cooling Service', 'Laser Windshield Chip Fix', 'VIP Home Valet'],
        verified: true,
        vipPartner: true,
        priceRange: 'Premium ($$$)',
        priceRangeAr: 'بريميوم ($$$)',
        image: '/images/branch_quds_ev_center.jpg',
        lat: 31.7683,
        lng: 35.2137,
        amenities: [
          { en: 'Ultra Fast DC EV Charger', ar: 'شواحن EV فائقة السرعة' },
          { en: 'VIP Doorstep Valet', ar: 'استلام وتسليم VIP من المنزل' },
          { en: '5.0 Star Rated Hub', ar: 'تقييم 5 نجوم مثالي' },
        ],
        responseTimeMin: 8,
      },
      {
        id: 'prov-11-amman',
        countryId: 'jo',
        countryNameEn: 'Jordan',
        countryNameAr: 'الأردن',
        countryFlag: 'JO',
        name: 'Amman Premier Auto Hub (Jordan)',
        nameAr: 'مركز عمّان بريميير الهندسي للسيارات (الأردن)',
        ownerName: 'Eng. Fadi Al-Majali',
        rating: 4.92,
        reviewCount: 388,
        distance: '2.8 km away',
        distanceAr: 'على بعد 2.8 كم',
        distanceKm: 2.8,
        address: 'Mecca St, Jordan Automotive Complex, Amman',
        addressAr: 'شارع مكة، مجمع الأردن لصيانة السيارات، عمّان',
        city: 'Amman',
        cityAr: 'عمان',
        phone: '+962 6 585 9900',
        whatsapp: '+962 7 9585 9900',
        hours: 'Open Now • 8:00 AM - 8:00 PM',
        hoursAr: 'مفتوح الآن • 8:00 ص - 8:00 م',
        specialties: ['Hybrid & EV Specialist', 'German Vehicle Specialist', 'Computer Diagnostics', 'AC Refrigerant R1234yf', 'Brembo Brakes'],
        specialtiesAr: ['سيارات هايبرد وكهرباء', 'السيارات الألمانية', 'فحص وبرمجة كمبيوتر', 'تعبئة فريون متطور', 'فرامل بريمبو'],
        supportedMakes: ['Toyota', 'Hyundai', 'BMW', 'Mercedes-Benz', 'Porsche', 'Audi', 'Tesla', 'Ford'],
        servicesOffered: ['Full EV & Hybrid Diagnostics', 'AC Evaporator Flush & Freon', '10K Synthetic Oil', 'Brembo Brake Upgrades'],
        verified: true,
        vipPartner: true,
        priceRange: 'Moderate ($$)',
        priceRangeAr: 'متوسط ($$)',
        image: '/images/branch_autotech_hub.jpg',
        lat: 31.9539,
        lng: 35.9106,
        amenities: [
          { en: 'Free Pickup in Amman', ar: 'خدمة سحب ونقل مجانية بعمان' },
          { en: 'Guaranteed Warranty', ar: 'كفالة معتمدة' },
        ],
        responseTimeMin: 10,
      },
      {
        id: 'prov-riyadh-master',
        countryId: 'sa',
        countryNameEn: 'Saudi Arabia',
        countryNameAr: 'السعودية',
        countryFlag: 'SA',
        name: 'Riyadh Master Auto & Transmission Center',
        nameAr: 'مركز الرياض الماسي لصيانة السيارات والجير',
        ownerName: 'Eng. Saud Al-Otaibi',
        rating: 4.93,
        reviewCount: 512,
        distance: '3.5 km away',
        distanceAr: 'على بعد 3.5 كم',
        distanceKm: 3.5,
        address: 'Al-Sanaiyah St, Exit 17, Riyadh, Saudi Arabia',
        addressAr: 'شارع الصناعية القديمة، مخرج 17، الرياض، المملكة العربية السعودية',
        city: 'Riyadh',
        cityAr: 'الرياض',
        phone: '+966 11 498 7700',
        whatsapp: '+966 50 498 7700',
        hours: 'Open Now • 8:00 AM - 9:00 PM',
        hoursAr: 'مفتوح الآن • 8:00 ص - 9:00 م',
        specialties: ['Transmission Overhaul', 'Heavy Duty Cooling & AC', 'Land Cruiser & Prado Specialist', 'Computer Coding & ECM', 'Laser Wheel Alignment'],
        specialtiesAr: ['توضيب جير أوتوماتيك ودبل', 'تبريد وتكييف للحرارة العالية', 'متخصص لاندكروزر وبرادو', 'برمجة كمبيوتر وECM', 'ميزان ليزر'],
        supportedMakes: ['Toyota', 'Lexus', 'Nissan', 'GMC', 'Chevrolet', 'Ford', 'Hyundai', 'Mercedes-Benz'],
        servicesOffered: ['Gearbox Complete Overhaul', 'Heavy AC Double Evaporator Flush', '10K Full Synthetic Oil', 'Ceramic Brake Discs'],
        verified: true,
        vipPartner: true,
        priceRange: 'Moderate ($$)',
        priceRangeAr: 'متوسط ($$)',
        image: '/images/garage_autotech.jpg',
        lat: 24.7136,
        lng: 46.6753,
        amenities: [
          { en: 'High Temperature Climate Specialists', ar: 'متخصصون في التبريد والأجواء الحارة' },
          { en: 'Original Dealership Oils', ar: 'زيوت وكالة معتمدة' },
          { en: 'Comfortable VIP Waiting Lounge', ar: 'صالة انتظار VIP مكيفة' },
        ],
        responseTimeMin: 10,
      },
    ],
    []
  );

  // Available service filter buttons
  const serviceFilters = [
    { id: 'all', en: 'All Services', ar: 'جميع الخدمات', icon: Filter },
    { id: 'mobile', en: 'Mobile Van 24/7', ar: 'ورشة متنقلة 24/7', icon: Zap },
    { id: 'hybrid', en: 'Hybrid & EV', ar: 'هايبرد وكهرباء', icon: BatteryCharging },
    { id: 'ac', en: 'AC & Cooling', ar: 'تكييف وتبريد', icon: Snowflake },
    { id: 'brakes', en: 'Brakes & Suspension', ar: 'فرامل ومساعدين', icon: ShieldCheck },
    { id: 'diagnostics', en: 'Computer & OBD', ar: 'فحص وبرمجة', icon: Cpu },
    { id: 'german', en: 'German Tech', ar: 'سيارات ألمانية', icon: Wrench },
    { id: 'heavy', en: 'Heavy & Fleet', ar: 'ديزل وأساطيل', icon: Truck },
  ];

  // Country filters
  const countryFilters = [
    { id: 'all', en: 'All Regions', ar: 'جميع المناطق' },
    { id: 'ps', en: 'Palestine', ar: 'فلسطين' },
    { id: 'ae', en: 'UAE', ar: 'الإمارات' },
    { id: 'sa', en: 'Saudi Arabia', ar: 'السعودية' },
    { id: 'jo', en: 'Jordan', ar: 'الأردن' },
  ];

  // Filter and sort workshops
  const filteredWorkshops = useMemo(() => {
    return defaultWorkshops
      .filter((ws) => {
        // 1. Country Filter
        if (selectedCountry !== 'all' && ws.countryId !== selectedCountry) {
          return false;
        }

        // 2. Service Category Filter
        if (selectedService !== 'all') {
          const s = selectedService.toLowerCase();
          const matchSpecialty =
            (s === 'mobile' && (ws.name.toLowerCase().includes('mobile') || ws.specialties.some((sp) => sp.toLowerCase().includes('mobile') || sp.toLowerCase().includes('emergency')))) ||
            (s === 'hybrid' && ws.specialties.some((sp) => sp.toLowerCase().includes('hybrid') || sp.toLowerCase().includes('ev'))) ||
            (s === 'ac' && ws.specialties.some((sp) => sp.toLowerCase().includes('ac') || sp.toLowerCase().includes('cooling') || sp.toLowerCase().includes('freon') || sp.toLowerCase().includes('climate'))) ||
            (s === 'brakes' && ws.specialties.some((sp) => sp.toLowerCase().includes('brake') || sp.toLowerCase().includes('suspension'))) ||
            (s === 'diagnostics' && ws.specialties.some((sp) => sp.toLowerCase().includes('diagnostic') || sp.toLowerCase().includes('computer') || sp.toLowerCase().includes('coding') || sp.toLowerCase().includes('obd'))) ||
            (s === 'german' && (ws.name.toLowerCase().includes('german') || ws.specialties.some((sp) => sp.toLowerCase().includes('mercedes') || sp.toLowerCase().includes('bmw') || sp.toLowerCase().includes('german')))) ||
            (s === 'heavy' && ws.specialties.some((sp) => sp.toLowerCase().includes('diesel') || sp.toLowerCase().includes('heavy') || sp.toLowerCase().includes('fleet') || sp.toLowerCase().includes('truck')));

          if (!matchSpecialty) return false;
        }

        // 3. Search Query (Name, Arabic Name, City, Address, Makes, Specialties)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchText =
            ws.name.toLowerCase().includes(q) ||
            ws.nameAr.includes(q) ||
            ws.city.toLowerCase().includes(q) ||
            ws.cityAr.includes(q) ||
            ws.address.toLowerCase().includes(q) ||
            ws.addressAr.includes(q) ||
            ws.supportedMakes.some((m) => m.toLowerCase().includes(q)) ||
            ws.specialties.some((sp) => sp.toLowerCase().includes(q)) ||
            ws.specialtiesAr.some((sp) => sp.includes(q));

          if (!matchText) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        return 0;
      });
  }, [defaultWorkshops, selectedCountry, selectedService, searchQuery, sortBy]);

  // Convert workshop to Provider structure for modal / booking compatibility
  const toProviderObj = (ws: ExtendedWorkshop): Provider => {
    return {
      id: ws.id,
      countryId: ws.countryId,
      businessNameAr: ws.nameAr,
      businessNameEn: ws.name,
      ownerName: ws.ownerName,
      avatar: ws.image,
      image: ws.image,
      rating: ws.rating,
      reviewCount: ws.reviewCount,
      verified: ws.verified,
      verificationTier: ws.vipPartner ? 'premium_verified' : 'professional_verified',
      phone: ws.phone,
      addressAr: ws.addressAr,
      addressEn: ws.address,
      cityAr: ws.cityAr,
      cityEn: ws.city,
      lat: ws.lat,
      lng: ws.lng,
      distanceKm: ws.distanceKm,
      specialties: ws.specialties,
      supportedMakes: ws.supportedMakes,
      servicesOffered: ws.servicesOffered,
      workingHoursAr: ws.hoursAr,
      workingHoursEn: ws.hours,
      responseTimeMin: ws.responseTimeMin,
      galleryImages: [ws.image, '/images/branch_autotech_hub.jpg', '/images/branch_palauto_german.jpg'],
      priceRange: { from: 70, to: 1200 },
      certifiedTechnicians: 12,
      isAvailableNow: true,
      supportsMobileService: ws.specialties.some((s) => s.toLowerCase().includes('mobile')),
      supportsPickup: true,
    };
  };

  const handleBookService = (ws: ExtendedWorkshop) => {
    const prov = toProviderObj(ws);
    if (startBookingWithProvider) {
      startBookingWithProvider(prov);
    } else {
      setSelectedProviderForBooking(prov);
      setActiveTab('book-service');
    }
  };

  const handleRequestQuote = (ws: ExtendedWorkshop) => {
    const prov = toProviderObj(ws);
    setSelectedProviderForBooking(prov);
    setIsQuoteModalOpen(true);
  };

  const handleOpenDetails = (ws: ExtendedWorkshop) => {
    const prov = toProviderObj(ws);
    setSelectedProviderModal(prov);
  };

  const handleContactWhatsApp = (ws: ExtendedWorkshop) => {
    const cleanNumber = (ws.whatsapp || ws.phone).replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      language === 'ar'
        ? `مرحباً، أود الاستفسار عن حجز موعد صيانة في ${ws.nameAr} عبر منصة أهل المركبات.`
        : `Hello, I would like to inquire about booking a service appointment at ${ws.name} via Ahl Al Markabat platform.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Hero & Advanced Search Filter Cockpit */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center gap-1 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'ar' ? 'شبكة الورش المعتمدة' : 'Verified Network'}</span>
              </span>
              <span className="text-xs font-bold text-slate-500">
                {language === 'ar'
                  ? 'فلسطين • الإمارات • السعودية • الأردن'
                  : 'Palestine • UAE • Saudi Arabia • Jordan'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{filteredWorkshops.length} {language === 'ar' ? 'مركز معتمد متاح الآن' : 'Verified Centers Live'}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 tracking-tight">
              {language === 'ar'
                ? 'اكتشف أفضل الورش ومراكز الصيانة المعتمدة'
                : 'Find Verified Workshops & Service Centers'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'ar'
                ? 'استعرض مراكز الخدمة المعتمدة، قارن التقييمات والأسعار، واحجز موعدك مع ضمان شامل لحماية حقوقك.'
                : 'Browse approved service centers, compare ratings, and book appointments with warranty protection.'}
            </p>
          </div>

          {/* List vs Map Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl self-start md:self-center border border-slate-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'عرض القائمة' : 'List View'}</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'عرض الخريطة' : 'Map View'}</span>
            </button>
          </div>
        </div>

        {/* Country Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 slim-scrollbar">
          {countryFilters.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCountry === country.id
                  ? 'bg-slate-900 text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{language === 'ar' ? country.ar : country.en}</span>
            </button>
          ))}
        </div>

        {/* Search Input, AI Symptom Match & Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1 border-t border-slate-100">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'ابحث باسم الورشة، الماركة (تويوتا، بي إم دبليو)، الخدمة، أو المدينة...'
                  : 'Search garage name, vehicle make (e.g. Toyota, BMW), service, or city...'
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-10 pe-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              onClick={() => setIsAIAssistantOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse shrink-0" />
              <span className="truncate">{language === 'ar' ? 'تشخيص ذكي للأعراض' : 'AI Symptom Match'}</span>
            </button>
          </div>

          <div className="sm:col-span-3 flex items-center gap-2">
            <div className="relative w-full">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-8 pe-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-600 cursor-pointer"
              >
                <option value="rating">{language === 'ar' ? 'الأعلى تقييماً' : 'Top Rated'}</option>
                <option value="distance">{language === 'ar' ? 'الأقرب مسافة' : 'Nearest Distance'}</option>
                <option value="reviews">{language === 'ar' ? 'الأكثر تقييمات' : 'Most Reviews'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 slim-scrollbar">
          {serviceFilters.map((service) => {
            const IconComp = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedService === service.id
                    ? 'bg-blue-600 text-white font-black shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {IconComp && (
                  <IconComp
                    className={`w-3.5 h-3.5 ${
                      selectedService === service.id ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                )}
                <span>{language === 'ar' ? service.ar : service.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Map View */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs overflow-hidden">
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>
                {language === 'ar'
                  ? 'خريطة مواقع الورش المعتمدة — انقر على أي موقع للاطلاع والحجز الفوري'
                  : 'Interactive Workshop Locations — Click any marker for instant booking & directions'}
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              {filteredWorkshops.length} {language === 'ar' ? 'موقع نشط' : 'active pins'}
            </span>
          </div>

          <LeafletMap
            providers={filteredWorkshops.map(toProviderObj)}
            center={
              selectedCountry === 'ps'
                ? [31.9078, 35.2045]
                : selectedCountry === 'sa'
                ? [24.7136, 46.6753]
                : selectedCountry === 'jo'
                ? [31.9539, 35.9106]
                : [25.1384, 55.2341]
            }
            zoom={selectedCountry === 'all' ? 7 : 11}
            height="480px"
          />
        </div>
      )}

      {/* 3. Workshops Grid List */}
      {filteredWorkshops.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Wrench className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900">
            {language === 'ar' ? 'لم يتم العثور على ورش مطابقة' : 'No matching workshops found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {language === 'ar'
              ? 'جرّب تغيير كلمات البحث، اختيار منطقة أخرى، أو إعادة تعيين الفلاتر لعرض كافة المراكز المتاحة.'
              : 'Try changing your search terms, selecting a different region, or resetting filters to see all available service centers.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('all');
              setSelectedService('all');
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWorkshops.map((ws) => (
            <div
              key={ws.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between group hover:border-blue-300"
            >
              <div className="space-y-4">
                {/* Workshop Header & Image */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={ws.image}
                        alt={ws.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/garage_autotech.jpg';
                        }}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-1 -end-1 text-[9px] font-black uppercase tracking-wider bg-slate-900 text-white rounded-md px-1.5 py-0.5 shadow-xs">
                        {ws.countryFlag}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong
                          onClick={() => handleOpenDetails(ws)}
                          className="text-sm sm:text-base font-black text-slate-900 block hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          {language === 'ar' ? ws.nameAr : ws.name}
                        </strong>
                        {ws.verified && (
                          <span
                            className="p-0.5 rounded-full bg-blue-100 text-blue-700 shadow-2xs"
                            title={language === 'ar' ? 'مركز معتمد رسمياً' : 'Officially Verified Workshop'}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                        )}
                        {ws.vipPartner && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[9px] flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-600" />
                            <span>{language === 'ar' ? 'شريك VIP' : 'VIP Partner'}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{language === 'ar' ? ws.addressAr : ws.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="text-end shrink-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-black shadow-2xs">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>{ws.rating}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">
                      ({ws.reviewCount} {language === 'ar' ? 'تقييم' : 'reviews'})
                    </span>
                  </div>
                </div>

                {/* Badges & Meta Info */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 font-medium bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-black">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{language === 'ar' ? ws.hoursAr : ws.hours}</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono font-bold text-blue-700">
                    {language === 'ar' ? ws.distanceAr : ws.distance}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-700">
                    {language === 'ar' ? ws.priceRangeAr : ws.priceRange}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{language === 'ar' ? `استجابة < ${ws.responseTimeMin} د` : `< ${ws.responseTimeMin} min response`}</span>
                  </span>
                </div>

                {/* Supported Makes */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <Car className="w-3 h-3 text-slate-400" />
                    <span>{language === 'ar' ? 'الماركات المدعومة:' : 'Supported Makes:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {ws.supportedMakes.slice(0, 6).map((make, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold"
                      >
                        {make}
                      </span>
                    ))}
                    {ws.supportedMakes.length > 6 && (
                      <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-bold">
                        +{ws.supportedMakes.length - 6} {language === 'ar' ? 'أخرى' : 'more'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Specialties */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <Wrench className="w-3 h-3 text-slate-400" />
                    <span>{language === 'ar' ? 'أبرز التخصصات:' : 'Key Specialties:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'ar' ? ws.specialtiesAr : ws.specialties).map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-xl bg-blue-50/80 text-blue-700 border border-blue-100 text-[10px] font-bold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities / Platform Advantages */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ws.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100 flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{language === 'ar' ? amenity.ar : amenity.en}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleBookService(ws)}
                    className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'حجز موعد صيانة' : 'Book Service'}</span>
                  </button>

                  <button
                    onClick={() => handleRequestQuote(ws)}
                    className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                    <span>{language === 'ar' ? 'طلب عرض سعر' : 'Request Quote'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDetails(ws)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                    <span>{language === 'ar' ? 'استعراض الملف والصور' : 'View Profile & Photos'}</span>
                  </button>

                  <button
                    onClick={() => handleContactWhatsApp(ws)}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1 shadow-2xs"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>

                  <a
                    href={`tel:${ws.phone}`}
                    className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs rounded-xl transition-all flex items-center gap-1"
                    title={language === 'ar' ? 'اتصال هاتفي' : 'Phone Call'}
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

