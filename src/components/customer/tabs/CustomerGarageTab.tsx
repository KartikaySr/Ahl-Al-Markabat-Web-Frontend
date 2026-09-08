import React, { useState, useRef } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Car,
  ShieldCheck,
  Calendar,
  FileText,
  AlertTriangle,
  Plus,
  ArrowRight,
  TrendingUp,
  Download,
  Upload,
  Clock,
  Sparkles,
  CheckCircle2,
  Wrench,
  ChevronRight,
  Lock,
  Battery,
  Gauge,
  Droplets,
  Wind,
  FolderLock,
  Camera,
  Image as ImageIcon,
  Trash2,
  Check,
} from 'lucide-react';

const VEHICLE_PHOTO_PRESETS = [
  {
    id: 'p-suv',
    labelEn: 'Land Cruiser / SUV',
    labelAr: 'لاند كروزر / SUV',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p-crossover',
    labelEn: 'RAV4 / Crossover',
    labelAr: 'راف فور / هايبرد',
    url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p-sedan',
    labelEn: 'Sedan / Tucson',
    labelAr: 'توسان / سيدان',
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p-luxury',
    labelEn: 'Mercedes / Luxury',
    labelAr: 'مرسيدس / فخمة',
    url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'p-sport',
    labelEn: 'Coupe / Sport',
    labelAr: 'كوبيه / رياضية',
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
  },
];

// Static Demo Vehicles for Demonstration
const DEMO_VEHICLES = [
  {
    id: 'veh-1',
    make: 'Toyota',
    makeAr: 'تويوتا',
    model: 'RAV4 Hybrid',
    modelAr: 'راف فور هايبرد',
    year: 2022,
    trim: '2.5L XLE AWD • Automatic',
    trimAr: '2.5 لتر XLE دفع رباعي • أوتوماتيك',
    plate: 'Dubai A 12345',
    plateAr: 'دبي أ 12345',
    country: 'uae',
    countryAr: 'الإمارات العربية المتحدة (دبي)',
    mileage: '38,450 km',
    mileageAr: '38,450 كم',
    healthScore: 94,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
    isPrimary: true,
    systems: {
      engine: { score: 96, status: 'Optimal', statusAr: 'ممتاز ومثالي', icon: Gauge, note: 'Next oil change in 1,550 km', noteAr: 'موعد غيار الزيت القادم بعد 1,550 كم' },
      brakes: { score: 85, status: 'Good', statusAr: 'جيد جداً', icon: ShieldCheck, note: 'Pads at 65% life remaining', noteAr: 'فحمات الفرامل بنسبة 65% متبقية' },
      battery: { score: 98, status: 'Excellent', statusAr: 'ممتاز (هايبرد)', icon: Battery, note: '12.8V Healthy AGM & Inverter', noteAr: '12.8 فولت ونظام شحن الهايبرد سليم' },
      tires: { score: 90, status: 'Good', statusAr: 'جيد', icon: Wrench, note: 'Tread depth 6.2mm, rotation due at 40k', noteAr: 'عمق المداس 6.2 ملم، تدوير عند 40 ألف' },
      cooling: { score: 95, status: 'Optimal', statusAr: 'مثالي', icon: Wind, note: 'Coolant pH 8.2, AC gas full', noteAr: 'سائل التبريد متزن، غاز المكيف ممتاز' },
    },
    specs: {
      engine: { en: '2.5L 4-Cylinder DOHC 16V', ar: '2.5 لتر 4 سلندر DOHC 16 صمام' },
      horsepower: { en: '203 hp @ 6,600 rpm', ar: '203 حصان @ 6,600 دورة' },
      drivetrain: { en: 'All-Wheel Drive (AWD)', ar: 'دفع رباعي مستمر (AWD)' },
      fuelType: { en: 'Super 98 / Special 95 Petrol', ar: 'بنزين سوبر 98 / خصوصي 95' },
      oilGrade: { en: '0W-16 / 0W-20 Full Synthetic', ar: '0W-16 / 0W-20 تخليقي بالكامل' },
      tireSize: { en: '225/65 R17 All-Season', ar: '225/65 R17 لجميع الفصول' },
      vin: { en: 'JTMDFREV4ND088219', ar: 'JTMDFREV4ND088219' },
    },
  },
  {
    id: 'veh-2',
    make: 'Hyundai',
    makeAr: 'هيونداي',
    model: 'Tucson',
    modelAr: 'توسان',
    year: 2021,
    trim: '2.0L Smartstream • Automatic',
    trimAr: '2.0 لتر سمارت ستريم • أوتوماتيك',
    plate: 'Ramallah 6-4521-90',
    plateAr: 'رام الله 6-4521-90',
    country: 'palestine',
    countryAr: 'فلسطين (رام الله والبيرة)',
    mileage: '52,100 km',
    mileageAr: '52,100 كم',
    healthScore: 89,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
    isPrimary: false,
    systems: {
      engine: { score: 90, status: 'Good', statusAr: 'جيد', icon: Gauge, note: 'Smooth idle, spark plugs due soon', noteAr: 'أداء سلس، يوصى بفحص البواجي' },
      brakes: { score: 82, status: 'Fair', statusAr: 'مقبول', icon: ShieldCheck, note: 'Rear pads at 45% life', noteAr: 'فحمات الفرامل الخلفية بنسبة 45%' },
      battery: { score: 92, status: 'Good', statusAr: 'جيد', icon: Battery, note: '12.6V Solid state', noteAr: '12.6 فولت حالة ممتازة' },
      tires: { score: 88, status: 'Good', statusAr: 'جيد', icon: Wrench, note: 'Front alignment recommended', noteAr: 'يوصى بميزان ليزر أمامي' },
      cooling: { score: 94, status: 'Optimal', statusAr: 'مثالي', icon: Wind, note: 'Thermostat operating normal', noteAr: 'الثرموستات يعمل بدرجة مثالية' },
    },
    specs: {
      engine: { en: '2.0L MPi Nu Engine', ar: '2.0 لتر MPi محرك نيو' },
      horsepower: { en: '156 hp @ 6,200 rpm', ar: '156 حصان @ 6,200 دورة' },
      drivetrain: { en: 'Front-Wheel Drive (FWD)', ar: 'دفع أمامي (FWD)' },
      fuelType: { en: '95 Octane Petrol', ar: 'بنزين 95 أوكتان' },
      oilGrade: { en: '5W-30 Full Synthetic', ar: '5W-30 تخليقي بالكامل' },
      tireSize: { en: '225/60 R17', ar: '225/60 R17' },
      vin: { en: 'KMHJ881CBMU441920', ar: 'KMHJ881CBMU441920' },
    },
  },
  {
    id: 'veh-3',
    make: 'Mercedes-Benz',
    makeAr: 'مرسيدس-بنز',
    model: 'C200',
    modelAr: 'سي 200 (C200)',
    year: 2023,
    trim: '2.0L Turbo Mild-Hybrid • AMG Line',
    trimAr: '2.0 لتر تيربو مايلد هايبرد • إيه إم جي لاين',
    plate: 'Abu Dhabi 12 99824',
    plateAr: 'أبوظبي 12 99824',
    country: 'uae',
    countryAr: 'الإمارات العربية المتحدة (أبوظبي)',
    mileage: '19,300 km',
    mileageAr: '19,300 كم',
    healthScore: 98,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
    isPrimary: false,
    systems: {
      engine: { score: 99, status: 'Mint Condition', statusAr: 'حالة الوكالة', icon: Gauge, note: 'Factory spec performance', noteAr: 'أداء مطابق لمواصفات المصنع' },
      brakes: { score: 96, status: 'Excellent', statusAr: 'ممتاز', icon: ShieldCheck, note: 'Cross-drilled rotors 90%', noteAr: 'هوبات مهواة رياضية بنسبة 90%' },
      battery: { score: 98, status: 'Optimal', statusAr: 'مثالي', icon: Battery, note: '48V EQ Boost Hybrid System 100%', noteAr: 'نظام هايبرد 48V بنسبة 100%' },
      tires: { score: 97, status: 'Excellent', statusAr: 'ممتاز', icon: Wrench, note: 'Michelin Pilot Sport 4', noteAr: 'ميشلان بايلوت سبورت 4' },
      cooling: { score: 99, status: 'Optimal', statusAr: 'مثالي', icon: Wind, note: 'Dual circuit cooling optimal', noteAr: 'دائرة التبريد المزدوجة مثالية' },
    },
    specs: {
      engine: { en: '2.0L Turbo 4-Cylinder + EQ Boost', ar: '2.0 لتر تيربو 4 سلندر + EQ بوست' },
      horsepower: { en: '204 hp + 20 hp Electric', ar: '204 حصان + 20 حصان كهربائي' },
      drivetrain: { en: 'Rear-Wheel Drive (9G-TRONIC)', ar: 'دفع خلفي (جير 9 سرعات 9G)' },
      fuelType: { en: 'Super 98 Petrol', ar: 'بنزين سوبر 98' },
      oilGrade: { en: 'MB 229.52 Synthetic', ar: 'MB 229.52 معتمد مرسيدس' },
      tireSize: { en: '245/40 R18 Front, 265/35 R18 Rear', ar: '245/40 R18 أمامي، 265/35 R18 خلفي' },
      vin: { en: 'W1K2060421F099231', ar: 'W1K2060421F099231' },
    },
  },
];

const GET_DEMO_DOCUMENTS = (language: string) => [
  {
    id: 'doc-1',
    title: language === 'ar' ? 'رخصة المركبة (الملكية)' : 'Mulkiya / Vehicle Registration Card',
    authority: language === 'ar' ? 'هيئة الطرق والمواصلات (RTA)' : 'Roads & Transport Authority (RTA)',
    expiryDate: '14 Mar 2025',
    daysLeft: 42,
    status: 'expiring_soon',
    fileSize: '2.4 MB PDF',
  },
  {
    id: 'doc-2',
    title: language === 'ar' ? 'بوليصة التأمين الشامل للمركبة' : 'Comprehensive Motor Insurance Policy',
    authority: language === 'ar' ? 'شركة البحيرة الوطنية للتأمين' : 'Al Buhaira National Insurance',
    expiryDate: '14 Mar 2025',
    daysLeft: 42,
    policyNumber: 'POL-DXB-998241',
    status: 'active',
    fileSize: '3.8 MB PDF',
  },
  {
    id: 'doc-3',
    title: language === 'ar' ? 'شهادة الفحص الفني الدوري السنوي' : 'Annual Technical Inspection Pass (DVI)',
    authority: language === 'ar' ? 'محطة فحص تسجيل المعتمدة' : 'Tasjeel Testing Station',
    expiryDate: '11 Mar 2025',
    daysLeft: 39,
    score: language === 'ar' ? '100% نجاح في جميع الأنظمة' : '100% Passed (All Systems)',
    status: 'active',
    fileSize: '1.9 MB PDF',
  },
];

const GET_DEMO_WARRANTIES = (language: string) => [
  {
    item: language === 'ar' ? 'بطارية بوش S5 AGM عالية الأداء (70 أمبير)' : 'Bosch S5 AGM High-Performance Battery (70Ah)',
    term: language === 'ar' ? 'ضمان استبدال 24 شهراً' : '24 Months Replacement',
    expires: 'Jan 18, 2026',
    remaining: language === 'ar' ? 'متبقي 18 شهراً' : '18 Months Remaining',
    workshop: language === 'ar' ? 'مركز رابيد فيكس للصيانة' : 'Rapid Fix Mobile Care',
  },
  {
    item: language === 'ar' ? 'طقم فحمات فرامل أمامية سيراميك وهوبات أصلية' : 'OEM Ceramic Front Brake Pad Set & Rotors',
    term: language === 'ar' ? '12 شهراً أو 20,000 كم' : '12 Months / 20,000 km',
    expires: 'Aug 14, 2024',
    remaining: language === 'ar' ? '14,200 كم / متبقي 4 أشهر' : '14,200 km / 4 Months Remaining',
    workshop: language === 'ar' ? 'مركز أوتو تك بريميير للصيانة' : 'AutoTech Premier Garage',
  },
];

export const CustomerGarageTab: React.FC = () => {
  const { language, setCustomerActiveTab, showToast, user } = useApp();
  const isDemo = user?.isDemoUser ?? false;

  const [garageSubTab, setGarageSubTab] = useState<'fleet' | 'documents' | 'warranties' | 'specs'>('fleet');
  const [vehicles, setVehicles] = useState<any[]>(() => (isDemo ? DEMO_VEHICLES : []));
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(() => (isDemo ? 'veh-1' : ''));
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);

  // Sync state if switching between demo user and newly made account
  React.useEffect(() => {
    if (user?.isDemoUser) {
      if (vehicles.length === 0) {
        setVehicles(DEMO_VEHICLES);
        setSelectedVehicleId('veh-1');
      }
    } else if (!user?.isDemoUser) {
      if (vehicles.length === DEMO_VEHICLES.length && vehicles[0]?.id === 'veh-1') {
        setVehicles([]);
        setSelectedVehicleId('');
      }
    }
  }, [user?.isDemoUser]);

  // Documents and warranties are empty for brand new users with no vehicles
  const documents = isDemo && vehicles.length > 0 ? GET_DEMO_DOCUMENTS(language) : [];
  const [customWarranties, setCustomWarranties] = useState<any[]>([]);
  const [isAddWarrantyOpen, setIsAddWarrantyOpen] = useState(false);

  const warranties = [
    ...customWarranties,
    ...(isDemo && vehicles.length > 0 ? GET_DEMO_WARRANTIES(language) : []),
  ];

  const currentVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // New warranty form state
  const [newWarrantyItem, setNewWarrantyItem] = useState('Bosch S5 AGM Battery (70Ah)');
  const [newWarrantyTerm, setNewWarrantyTerm] = useState('24 Months Replacement');
  const [newWarrantyWorkshop, setNewWarrantyWorkshop] = useState('AutoTech Premier Garage');
  const [newWarrantyExpiry, setNewWarrantyExpiry] = useState('2026-09-04');
  const [newWarrantyRef, setNewWarrantyRef] = useState('WAR-88219');
  const [newWarrantyVehicle, setNewWarrantyVehicle] = useState(currentVehicle?.id || 'veh-1');

  const handleAddWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    const expiryDateObj = new Date(newWarrantyExpiry);
    const today = new Date();
    const diffMonths = Math.max(1, Math.round((expiryDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30)));
    const remainingText =
      language === 'ar' ? `متبقي ${diffMonths} شهراً` : `${diffMonths} Months Remaining`;

    const newW = {
      id: `war-${Date.now()}`,
      item: newWarrantyItem,
      term: newWarrantyTerm,
      expires: newWarrantyExpiry,
      remaining: remainingText,
      workshop: newWarrantyWorkshop,
      refNum: newWarrantyRef,
      vehicleId: newWarrantyVehicle,
    };

    setCustomWarranties([newW, ...customWarranties]);
    setIsAddWarrantyOpen(false);
    showToast(
      language === 'ar'
        ? `🎉 تم تسجيل وتفعيل وثيقة الضمان «${newWarrantyItem}» بنجاح!`
        : `🎉 Warranty registered for ${newWarrantyItem}!`,
      'success'
    );
  };

  // New vehicle form state
  const [newMake, setNewMake] = useState('Toyota');
  const [newModel, setNewModel] = useState('Land Cruiser');
  const [newYear, setNewYear] = useState('2024');
  const [newPlate, setNewPlate] = useState('Dubai B 88291');
  const [newMileage, setNewMileage] = useState('12,000');
  const [newImage, setNewImage] = useState<string>(VEHICLE_PHOTO_PRESETS[0].url);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        showToast(
          language === 'ar' ? 'حجم الصورة كبير جداً (الحد الأقصى 8 ميجابايت)' : 'Image file is too large (max 8MB)',
          'error'
        );
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setNewImage(result);
          showToast(
            language === 'ar' ? '📸 تم رفع صورة المركبة بنجاح!' : '📸 Vehicle photo uploaded successfully!',
            'success'
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const newVeh = {
      id: `veh-${Date.now()}`,
      make: newMake,
      makeAr: newMake,
      model: newModel,
      modelAr: newModel,
      year: Number(newYear) || 2024,
      trim: 'Standard Edition',
      trimAr: 'الفئة القياسية',
      plate: newPlate,
      plateAr: newPlate,
      country: 'uae',
      countryAr: 'الإمارات العربية المتحدة',
      mileage: `${newMileage} km`,
      mileageAr: `${newMileage} كم`,
      healthScore: 100,
      image: newImage || VEHICLE_PHOTO_PRESETS[0].url,
      isPrimary: false,
      systems: {
        engine: { score: 100, status: 'Optimal', statusAr: 'جديد ومثالي', icon: Gauge, note: 'Brand new vehicle log', noteAr: 'سجل مركبة جديدة' },
        brakes: { score: 100, status: 'Optimal', statusAr: 'جديد', icon: ShieldCheck, note: 'Factory fresh pads', noteAr: 'فحمات الوكالة جديدة' },
        battery: { score: 100, status: 'Optimal', statusAr: 'ممتاز', icon: Battery, note: '100% capacity', noteAr: 'سعة 100%' },
        tires: { score: 100, status: 'Optimal', statusAr: 'جديد', icon: Wrench, note: 'Factory new tires', noteAr: 'إطارات جديدة بالكامل' },
        cooling: { score: 100, status: 'Optimal', statusAr: 'مثالي', icon: Wind, note: 'Factory coolant level', noteAr: 'سائل تبريد الوكالة' },
      },
      specs: {
        engine: { en: 'Standard Engine', ar: 'محرك قياسي' },
        horsepower: { en: 'Factory Spec', ar: 'مواصفات المصنع' },
        drivetrain: { en: 'Standard Drivetrain', ar: 'نظام الدفع القياسي' },
        fuelType: { en: 'Petrol', ar: 'بنزين' },
        oilGrade: { en: '5W-30 Full Synthetic', ar: '5W-30 تخليقي' },
        tireSize: { en: 'Standard Rims', ar: 'جنوط قياسية' },
        vin: { en: 'NEWVIN2026', ar: 'NEWVIN2026' },
      },
    };
    setVehicles([newVeh, ...vehicles]);
    setSelectedVehicleId(newVeh.id);
    setIsAddVehicleOpen(false);
    showToast(
      language === 'ar' ? `🎉 تمت إضافة ${newMake} ${newModel} إلى كراجك بنجاح!` : `🎉 ${newMake} ${newModel} added to your garage!`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Sub-Tabs Bar (Matching Image 2) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setGarageSubTab('fleet')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            garageSubTab === 'fleet'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>{language === 'ar' ? 'أسطول مركباتي وصحة الأنظمة' : 'Fleet & Live Health'}</span>
        </button>

        <button
          onClick={() => setGarageSubTab('documents')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            garageSubTab === 'documents'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FolderLock className="w-4 h-4" />
          <span>{language === 'ar' ? 'خزنة الوثائق والرخص الرقمية' : 'Documents Vault (Mulkiya & Insurance)'}</span>
          {documents.length > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                garageSubTab === 'documents' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
              }`}
            >
              {language === 'ar' ? '1 قارب الانتهاء' : '1 Due'}
            </span>
          )}
        </button>

        <button
          onClick={() => setGarageSubTab('warranties')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            garageSubTab === 'warranties'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'ar' ? 'الضمانات والكفالات النشطة' : 'Active Warranties'}</span>
          {warranties.length > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                garageSubTab === 'warranties' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-900'
              }`}
            >
              {warranties.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setGarageSubTab('specs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            garageSubTab === 'specs'
              ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>{language === 'ar' ? 'مواصفات المصنع والزيوت المعتمدة' : 'Factory Specs & Fluids'}</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* SUB-VIEW 1: FLEET & LIVE HEALTH SCORE                        */}
      {/* ============================================================ */}
      {garageSubTab === 'fleet' && (
        <div className="space-y-8">
          {vehicles.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-2xs text-center space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <Car className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'ar'
                    ? `أهلاً بك في كراجك الرقمي${user?.name ? `، ${user.name}` : ''}!`
                    : `Welcome to Your Digital Garage${user?.name ? `, ${user.name}` : ''}!`}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'حسابك جديد كلياً ولا توجد أي مركبات مسجلة في كراجك بعد. أضف تفاصيل مركبتك للبدء في تتبع مؤشرات الصيانة الدورية، حالة القطع، والضمانات المعتمدة.'
                    : 'Your account is brand new and has no vehicles registered yet. Add your vehicle to begin tracking live maintenance health, warranty coverage, and digital inspection logs.'}
                </p>
              </div>
              <button
                onClick={() => setIsAddVehicleOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? '+ أضف مركبتك الأولى الآن' : '+ Add Your First Vehicle Now'}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Multi-Vehicle Fleet Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {vehicles.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`flex items-center gap-3 p-2.5 pe-4 rounded-2xl border transition-all text-start whitespace-nowrap ${
                        selectedVehicleId === v.id
                          ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/10'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <img src={v.image} alt={v.model} className="w-12 h-10 rounded-xl object-cover border border-slate-100" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-black text-slate-900">
                            {language === 'ar' ? `${v.makeAr} ${v.modelAr}` : `${v.make} ${v.model}`}
                          </strong>
                          {v.isPrimary && (
                            <span className="px-1.5 py-0.2 rounded-md bg-blue-100 text-blue-800 text-[9px] font-bold">
                              {language === 'ar' ? 'الرئيسية' : 'Primary'}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {language === 'ar' ? v.plateAr : v.plate}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsAddVehicleOpen(true)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إضافة مركبة جديدة' : 'Add Vehicle'}</span>
                </button>
              </div>

              {/* Active Vehicle Hero Cockpit */}
          <div className="bg-[#09152B] text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[10px] font-black uppercase tracking-wider">
                  {language === 'ar' ? currentVehicle.countryAr : (currentVehicle.country === 'uae' ? 'Registered in UAE' : 'Registered in Palestine')}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {language === 'ar' ? 'رقم الشاسيه VIN:' : 'VIN:'} {currentVehicle.specs.vin.en}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {currentVehicle.year} {language === 'ar' ? currentVehicle.makeAr : currentVehicle.make} {language === 'ar' ? currentVehicle.modelAr : currentVehicle.model}
                </h2>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  {language === 'ar' ? currentVehicle.trimAr : currentVehicle.trim}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    {language === 'ar' ? 'عداد المسافات' : 'Odometer'}
                  </span>
                  <strong className="text-lg font-black text-white font-mono">
                    {language === 'ar' ? currentVehicle.mileageAr : currentVehicle.mileage}
                  </strong>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    {language === 'ar' ? 'مؤشر الصحة العام' : 'Overall Health'}
                  </span>
                  <strong className="text-lg font-black text-emerald-400 font-mono">
                    {currentVehicle.healthScore}% {language === 'ar' ? 'ممتاز' : 'Healthy'}
                  </strong>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    {language === 'ar' ? 'رقم اللوحة' : 'Plate Number'}
                  </span>
                  <strong className="text-lg font-black text-amber-400 font-mono">
                    {language === 'ar' ? currentVehicle.plateAr : currentVehicle.plate}
                  </strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setCustomerActiveTab('bookings')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'ar' ? 'حجز موعد صيانة' : 'Book Maintenance'}</span>
                </button>

                <button
                  onClick={() => setCustomerActiveTab('marketplace')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>{language === 'ar' ? 'استعراض القطع المتوافقة' : 'View Matched Parts'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 h-64 sm:h-72">
              <img src={currentVehicle.image} alt={currentVehicle.model} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-[11px] text-slate-300 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <span>{language === 'ar' ? 'جواز السفر الرقمي المعتمد' : 'Verified Maintenance Passport'}</span>
                <span className="text-emerald-400 font-bold">{language === 'ar' ? '● محمي وموثق' : '● Protected'}</span>
              </div>
            </div>
          </div>

          {/* 5-System Diagnostics */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'فحص ومؤشرات الأنظمة الخمسة الحيوية للمركبة' : '5-Point Multi-System Health Diagnostics'}
                </strong>
                <span className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'حالة مباشرة بالاعتماد على الفحص الرقمي DVI وسجلات الصيانة الموثقة'
                    : 'Real-time status based on service milestones & workshop DVI logs'}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                {language === 'ar' ? 'التقييم:' : 'Score:'} {currentVehicle.healthScore}/100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(currentVehicle.systems).map(([key, sys]: [string, any]) => {
                const Icon = sys.icon;
                const sysNameAr = key === 'engine' ? 'المحرك' : key === 'brakes' ? 'الفرامل' : key === 'battery' ? 'البطارية' : key === 'tires' ? 'الإطارات' : 'التبريد والمكيف';
                return (
                  <div key={key} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono font-black text-sm text-slate-900">{sys.score}%</span>
                    </div>

                    <div>
                      <strong className="text-xs font-black text-slate-900 capitalize block">
                        {language === 'ar' ? `نظام ${sysNameAr}` : `${key} System`}
                      </strong>
                      <span className="text-[10px] text-emerald-600 font-bold block">
                        {language === 'ar' ? sys.statusAr : sys.status}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        style={{ width: `${sys.score}%` }}
                      />
                    </div>

                    <span className="text-[10px] text-slate-500 block leading-snug">
                      {language === 'ar' ? sys.noteAr : sys.note}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
            </>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-VIEW 2: DOCUMENTS & INSURANCE VAULT                      */}
      {/* ============================================================ */}
      {garageSubTab === 'documents' && (
        <div className="space-y-6">
          {documents.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-2xs">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <FolderLock className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-sm mx-auto">
                <h4 className="text-sm font-black text-slate-800">
                  {language === 'ar' ? 'لا توجد وثائق محفوظة بعد' : 'No Vehicle Documents Uploaded'}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'ar'
                    ? 'ستتمكن من حفظ الملكية وبوليصة التأمين فور تسجيل مركبتك الأولى في الكراج.'
                    : 'You can upload and securely store your vehicle registration and insurance once you add your first car.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setGarageSubTab('fleet');
                  setIsAddVehicleOpen(true);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إضافة مركبة إلى الكراج' : 'Add Vehicle to Garage'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      {doc.daysLeft <= 45 ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{language === 'ar' ? `ينتهي خلال ${doc.daysLeft} يوماً` : `Expires in ${doc.daysLeft} days`}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{language === 'ar' ? 'ساري المفعول' : 'Valid'}</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <strong className="text-sm font-black text-slate-900 block leading-snug">{doc.title}</strong>
                      {currentVehicle && (
                        <span className="text-[11px] text-slate-500 block mt-1">
                          {currentVehicle.year} {language === 'ar' ? currentVehicle.makeAr : currentVehicle.make} {language === 'ar' ? currentVehicle.modelAr : currentVehicle.model} ({language === 'ar' ? currentVehicle.plateAr : currentVehicle.plate})
                        </span>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>{language === 'ar' ? 'الجهة المصدرة:' : 'Authority:'}</span>
                        <strong className="text-slate-800 text-end truncate max-w-[150px]">{doc.authority}</strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span>{language === 'ar' ? 'تاريخ الانتهاء:' : 'Expires On:'}</span>
                        <strong className="text-amber-700 font-mono font-bold">{doc.expiryDate}</strong>
                      </div>
                      {doc.policyNumber && (
                        <div className="flex items-center justify-between text-slate-500 text-[11px]">
                          <span>{language === 'ar' ? 'رقم الوثيقة:' : 'Policy #:'}</span>
                          <strong className="text-blue-600 font-mono font-bold">{doc.policyNumber}</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => showToast(language === 'ar' ? `تحميل مستند ${doc.title}` : `Downloading ${doc.title}`, 'info')}
                      className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'معاينة PDF' : 'View PDF'}</span>
                    </button>

                    <button
                      onClick={() => showToast(language === 'ar' ? 'بدء إجراءات تجديد الوثيقة عبر الربط المباشر...' : 'Initiating renewal request...', 'info')}
                      className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{language === 'ar' ? 'تجديد فوري' : 'Renew Now'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-VIEW 3: ACTIVE WARRANTIES                                */}
      {/* ============================================================ */}
      {garageSubTab === 'warranties' && (
        <div className="space-y-4">
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">
                  {language === 'ar' ? 'الضمانات والكفالات الرقمية السارية' : 'Active Digital Warranties & Guarantees'}
                </h3>
                {warranties.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                    {warranties.length}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'متابعة مدد الضمان لقطع الغيار والبطاريات والخدمات المنجزة مع إمكانية إضافة وثائق جديدة.'
                  : 'Track warranty periods for spare parts, batteries, and services, or register a new warranty.'}
              </p>
            </div>

            <button
              onClick={() => setIsAddWarrantyOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'إضافة وثيقة ضمان +' : 'Add Warranty +'}</span>
            </button>
          </div>

          {warranties.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-2xs">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1.5 max-w-sm mx-auto">
                <h4 className="text-base font-black text-slate-800">
                  {language === 'ar' ? 'لا توجد ضمانات سارية حالياً' : 'No Active Warranties Yet'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'ar'
                    ? 'تُفعّل الضمانات الرقمية تلقائياً عند إجراء صيانة لدى ورش معتمدة، أو يمكنك تسجيل وثيقة ضمان يدوياً لقطع الغيار والبطاريات.'
                    : 'Digital warranties activate automatically upon completing certified service, or you can register an existing part warranty manually.'}
                </p>
              </div>
              <button
                onClick={() => setIsAddWarrantyOpen(true)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs transition-all inline-flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إضافة وتسجيل وثيقة ضمان الآن' : 'Add Warranty Now'}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {warranties.map((w, i) => (
                <div key={w.id || i} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black">
                        {w.remaining}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-black text-slate-900 block">{w.item}</strong>
                        {w.refNum && (
                          <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                            #{w.refNum}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{w.workshop} • {w.term}</span>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs flex items-center justify-between">
                      <span className="text-slate-500">{language === 'ar' ? 'ساري حتى:' : 'Valid Until:'}</span>
                      <strong className="text-slate-900 font-mono font-bold">{w.expires}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast(
                        language === 'ar'
                          ? `تم فتح طلب فحص ومطالبة بضمان «${w.item}» لدى ${w.workshop}`
                          : `Warranty claim & inspection initiated for ${w.item}!`,
                        'info'
                      );
                      setCustomerActiveTab('bookings');
                    }}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all text-center"
                  >
                    {language === 'ar' ? 'المطالبة بالضمان أو طلب فحص مجاني ←' : 'Claim Warranty or Request Check →'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUB-VIEW 4: FACTORY SPECS & FLUIDS                           */}
      {/* ============================================================ */}
      {garageSubTab === 'specs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
          <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
            {language === 'ar' ? 'المواصفات الفنية المعتمدة من المصنع والزيوت الأصلية' : 'OEM Technical Specifications & Factory Fluids'}
          </strong>

          {!currentVehicle ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <Wrench className="w-7 h-7" />
              </div>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'أضف مركبة إلى كراجك لعرض مواصفاتها الفنية المعتمدة من المصنع.' : 'Add a vehicle to your garage to view its factory specifications and fluids.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
              {Object.entries(currentVehicle.specs).map(([key, val]) => {
                const specKeyAr =
                  key === 'engine' ? 'المحرك' :
                  key === 'horsepower' ? 'القوة الحصانية' :
                  key === 'drivetrain' ? 'نظام الدفع' :
                  key === 'fuelType' ? 'نوع الوقود' :
                  key === 'oilGrade' ? 'لزوجة الزيت المعتمدة' :
                  key === 'tireSize' ? 'مقاس الإطارات' :
                  'رقم الشاسيه (VIN)';
                return (
                  <div key={key} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                      {language === 'ar' ? specKeyAr : key}
                    </span>
                    <strong className="text-slate-900 font-mono font-bold block truncate">
                      {language === 'ar' ? (val as any).ar : (val as any).en}
                    </strong>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isAddVehicleOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col p-6 sm:p-7 shadow-2xl border border-slate-200 animate-slide-up overflow-hidden text-slate-900">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {language === 'ar' ? 'إضافة مركبة جديدة إلى كراجي' : 'Add Vehicle to My Garage'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {language === 'ar'
                    ? 'سجل مركبة جديدة وأضف صورتها لمتابعة الفحص الدوري وتاريخ الصيانة.'
                    : 'Register a new vehicle and add its photo to track maintenance.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddVehicleOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="overflow-y-auto flex-1 py-4 space-y-4 text-xs font-bold slim-scrollbar pe-1">
              {/* Hidden File Input for Device Image Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              {/* 1. PHOTO FUNCTION: Upload & Preview & Presets */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span>{language === 'ar' ? 'صورة المركبة:' : 'Vehicle Photo:'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'رفع صورة من جهازك' : 'Upload from Device'}</span>
                  </button>
                </div>

                {/* Live Photo Preview Banner */}
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                  <img
                    src={newImage}
                    alt="Vehicle preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = VEHICLE_PHOTO_PRESETS[0].url;
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                  {/* Top Badge */}
                  <span className="absolute top-2.5 start-2.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-amber-400" />
                    <span>{language === 'ar' ? 'معاينة صورة المركبة' : 'Live Photo Preview'}</span>
                  </span>

                  {/* Center / Bottom Action Overlay Buttons */}
                  <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 backdrop-blur-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تغيير / رفع صورة جديدة' : 'Change / Upload Photo'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setNewImage(VEHICLE_PHOTO_PRESETS[0].url)}
                      className="p-1.5 bg-slate-900/80 hover:bg-red-600 text-white rounded-xl transition-all shadow-md"
                      title={language === 'ar' ? 'إعادة تعيين للصورة الافتراضية' : 'Reset to Default'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Preset Car Gallery Quick Selector */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] text-slate-500 font-bold block">
                    {language === 'ar' ? 'أو اختر نوع المركبة من النماذج الجاهزة:' : 'Or choose from quick model presets:'}
                  </span>

                  <div className="grid grid-cols-5 gap-2">
                    {VEHICLE_PHOTO_PRESETS.map((preset) => {
                      const isSelected = newImage === preset.url;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setNewImage(preset.url)}
                          className={`relative rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
                            isSelected
                              ? 'border-blue-600 ring-2 ring-blue-600/30 scale-102 shadow-xs'
                              : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                          }`}
                          title={language === 'ar' ? preset.labelAr : preset.labelEn}
                        >
                          <img
                            src={preset.url}
                            alt={preset.labelEn}
                            className="w-full h-12 rounded-lg object-cover"
                          />
                          {isSelected && (
                            <span className="absolute top-1 end-1 w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-[9px] shadow-sm font-bold">
                              ✓
                            </span>
                          )}
                          <span className="text-[9px] font-bold text-slate-700 block truncate mt-0.5 text-center leading-tight">
                            {language === 'ar' ? preset.labelAr.split('/')[0] : preset.labelEn.split('/')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. VEHICLE SPECS FORM */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">
                      {language === 'ar' ? 'الشركة المصنعة (Make)' : 'Make'}
                    </span>
                    <input
                      type="text"
                      required
                      value={newMake}
                      onChange={(e) => setNewMake(e.target.value)}
                      placeholder="e.g. Toyota"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">
                      {language === 'ar' ? 'الموديل (Model)' : 'Model'}
                    </span>
                    <input
                      type="text"
                      required
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      placeholder="e.g. Land Cruiser"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1">
                      {language === 'ar' ? 'سنة الصنع' : 'Year'}
                    </span>
                    <input
                      type="number"
                      required
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      placeholder="2024"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-500 block mb-1">
                      {language === 'ar' ? 'رقم اللوحة والمحافظة' : 'License Plate'}
                    </span>
                    <input
                      type="text"
                      required
                      value={newPlate}
                      onChange={(e) => setNewPlate(e.target.value)}
                      placeholder="e.g. Dubai B 88291"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">
                    {language === 'ar' ? 'الممشى الحالي (عداد الكيلومترات)' : 'Current Mileage (Odometer)'}
                  </span>
                  <input
                    type="text"
                    value={newMileage}
                    onChange={(e) => setNewMileage(e.target.value)}
                    placeholder="e.g. 12,000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddVehicleOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  {language === 'ar' ? 'حفظ وإضافة المركبة' : 'Save Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Warranty Modal */}
      {isAddWarrantyOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col p-6 sm:p-7 shadow-2xl border border-slate-200 animate-slide-up overflow-hidden text-slate-900">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {language === 'ar' ? 'إضافة وثيقة ضمان جديدة' : 'Add New Warranty'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'سجل ضمانات قطع الغيار والبطاريات وتاريخ انتهاء الصلاحية.'
                      : 'Register part warranties, battery guarantees, and validity.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddWarrantyOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddWarranty} className="overflow-y-auto flex-1 py-4 space-y-3.5 text-xs font-bold slim-scrollbar pe-1">
              <div>
                <span className="text-[10px] text-slate-500 block mb-1">
                  {language === 'ar' ? 'البند أو القطعة المشمولة بالضمان' : 'Item / Part Covered under Warranty'}
                </span>
                <input
                  type="text"
                  required
                  value={newWarrantyItem}
                  onChange={(e) => setNewWarrantyItem(e.target.value)}
                  placeholder="e.g. Bosch S5 AGM Battery (70Ah)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">
                    {language === 'ar' ? 'مدة وشروط الضمان' : 'Warranty Term'}
                  </span>
                  <input
                    type="text"
                    required
                    value={newWarrantyTerm}
                    onChange={(e) => setNewWarrantyTerm(e.target.value)}
                    placeholder="e.g. 24 Months Replacement"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">
                    {language === 'ar' ? 'الورشة / المورد المصدر' : 'Issuing Workshop / Vendor'}
                  </span>
                  <input
                    type="text"
                    required
                    value={newWarrantyWorkshop}
                    onChange={(e) => setNewWarrantyWorkshop(e.target.value)}
                    placeholder="e.g. AutoTech Premier Garage"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">
                    {language === 'ar' ? 'تاريخ انتهاء الضمان' : 'Warranty Expiry Date'}
                  </span>
                  <input
                    type="date"
                    required
                    value={newWarrantyExpiry}
                    onChange={(e) => setNewWarrantyExpiry(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 font-mono"
                  />
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">
                    {language === 'ar' ? 'رقم وثيقة / فاتورة الضمان' : 'Warranty / Invoice Ref #'}
                  </span>
                  <input
                    type="text"
                    value={newWarrantyRef}
                    onChange={(e) => setNewWarrantyRef(e.target.value)}
                    placeholder="e.g. WAR-88219"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 font-mono"
                  />
                </div>
              </div>

              {vehicles.length > 0 && (
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">
                    {language === 'ar' ? 'المركبة المرتبطة بالضمان' : 'Associated Vehicle'}
                  </span>
                  <select
                    value={newWarrantyVehicle}
                    onChange={(e) => setNewWarrantyVehicle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.make} {v.model} ({v.plate})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddWarrantyOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-700 shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'ar' ? 'حفظ وتفعيل الضمان' : 'Save & Activate Warranty'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
