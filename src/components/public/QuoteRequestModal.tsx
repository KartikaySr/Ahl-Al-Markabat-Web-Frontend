import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import {
  X,
  Car,
  Wrench,
  Camera,
  MapPin,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Truck,
  Search,
  Sparkles,
  Plus,
  Check,
  Filter,
  User,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
} from 'lucide-react';

interface CatalogVehicle {
  id: string;
  make: string;
  makeAr: string;
  model: string;
  modelAr: string;
  year: number;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  image: string;
  category: string;
}

const REPAIRABLE_VEHICLES_CATALOG: CatalogVehicle[] = [
  // Toyota
  {
    id: 'toyota-corolla',
    make: 'Toyota',
    makeAr: 'تويوتا',
    model: 'Corolla Hybrid / Sedan',
    modelAr: 'كورولا هايبرد / سيدان',
    year: 2023,
    fuelType: 'hybrid',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&auto=format&fit=crop&q=80',
    category: 'Sedan',
  },
  {
    id: 'toyota-camry',
    make: 'Toyota',
    makeAr: 'تويوتا',
    model: 'Camry Hybrid / V6',
    modelAr: 'كامري هايبرد / 6 سلندر',
    year: 2024,
    fuelType: 'hybrid',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&auto=format&fit=crop&q=80',
    category: 'Sedan',
  },
  {
    id: 'toyota-rav4',
    make: 'Toyota',
    makeAr: 'تويوتا',
    model: 'RAV4 Hybrid AWD',
    modelAr: 'راف فور هايبرد',
    year: 2023,
    fuelType: 'hybrid',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80',
    category: 'SUV',
  },
  {
    id: 'toyota-landcruiser',
    make: 'Toyota',
    makeAr: 'تويوتا',
    model: 'Land Cruiser LC300 / Prado',
    modelAr: 'لاند كروزر / برادو',
    year: 2024,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=80',
    category: 'SUV / 4x4',
  },
  {
    id: 'toyota-hilux',
    make: 'Toyota',
    makeAr: 'تويوتا',
    model: 'Hilux Double Cab 4x4',
    modelAr: 'هايلوكس دبل كابينة',
    year: 2023,
    fuelType: 'diesel',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&auto=format&fit=crop&q=80',
    category: 'Pickup',
  },

  // Mercedes-Benz
  {
    id: 'mercedes-cclass',
    make: 'Mercedes-Benz',
    makeAr: 'مرسيدس بنز',
    model: 'C-Class (C200 / C300)',
    modelAr: 'سي كلاس (C200 / C300)',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&auto=format&fit=crop&q=80',
    category: 'Luxury Sedan',
  },
  {
    id: 'mercedes-eclass',
    make: 'Mercedes-Benz',
    makeAr: 'مرسيدس بنز',
    model: 'E-Class (E200 / E300)',
    modelAr: 'إي كلاس (E200 / E300)',
    year: 2024,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=80',
    category: 'Luxury Sedan',
  },
  {
    id: 'mercedes-glc',
    make: 'Mercedes-Benz',
    makeAr: 'مرسيدس بنز',
    model: 'GLC / GLE SUV',
    modelAr: 'جي إل سي / جي إل إي',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&auto=format&fit=crop&q=80',
    category: 'Luxury SUV',
  },

  // BMW
  {
    id: 'bmw-3series',
    make: 'BMW',
    makeAr: 'بي إم دبليو',
    model: '3 Series (320i / 330i)',
    modelAr: 'الفئة الثالثة (320i / 330i)',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&auto=format&fit=crop&q=80',
    category: 'Sports Sedan',
  },
  {
    id: 'bmw-5series',
    make: 'BMW',
    makeAr: 'بي إم دبليو',
    model: '5 Series (520i / 530e Hybrid)',
    modelAr: 'الفئة الخامسة (520i / 530e)',
    year: 2024,
    fuelType: 'hybrid',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&auto=format&fit=crop&q=80',
    category: 'Executive Sedan',
  },
  {
    id: 'bmw-x5',
    make: 'BMW',
    makeAr: 'بي إم دبليو',
    model: 'X5 / X6 xDrive',
    modelAr: 'إكس 5 / إكس 6',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=400&auto=format&fit=crop&q=80',
    category: 'Sports SUV',
  },

  // Hyundai
  {
    id: 'hyundai-tucson',
    make: 'Hyundai',
    makeAr: 'هيونداي',
    model: 'Tucson Hybrid / Turbo',
    modelAr: 'توسان هايبرد / تيربو',
    year: 2024,
    fuelType: 'hybrid',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80',
    category: 'SUV',
  },
  {
    id: 'hyundai-elantra',
    make: 'Hyundai',
    makeAr: 'هيونداي',
    model: 'Elantra / Avante',
    modelAr: 'إلنترا / أفانتي',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&auto=format&fit=crop&q=80',
    category: 'Sedan',
  },
  {
    id: 'hyundai-ioniq',
    make: 'Hyundai',
    makeAr: 'هيونداي',
    model: 'Ioniq 5 / 6 EV',
    modelAr: 'أيونك 5 / 6 كهربائية',
    year: 2024,
    fuelType: 'electric',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80',
    category: 'Electric EV',
  },

  // Volkswagen
  {
    id: 'vw-golf',
    make: 'Volkswagen',
    makeAr: 'فولكس فاجن',
    model: 'Golf (GTI / R / TSI)',
    modelAr: 'جولف (GTI / R / TSI)',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&auto=format&fit=crop&q=80',
    category: 'Hatchback',
  },
  {
    id: 'vw-tiguan',
    make: 'Volkswagen',
    makeAr: 'فولكس فاجن',
    model: 'Tiguan Allspace TSI',
    modelAr: 'تيجوان أول سبيس',
    year: 2024,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80',
    category: 'SUV',
  },
  {
    id: 'vw-id4',
    make: 'Volkswagen',
    makeAr: 'فولكس فاجن',
    model: 'ID.4 Crozz Electric',
    modelAr: 'آي دي 4 كهربائية',
    year: 2024,
    fuelType: 'electric',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80',
    category: 'Electric EV',
  },

  // Audi
  {
    id: 'audi-a6',
    make: 'Audi',
    makeAr: 'أودي',
    model: 'A6 / A4 TFSI Quattro',
    modelAr: 'إيه 6 / إيه 4 كواترو',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&auto=format&fit=crop&q=80',
    category: 'Luxury Sedan',
  },
  {
    id: 'audi-q7',
    make: 'Audi',
    makeAr: 'أودي',
    model: 'Q7 / Q5 Quattro',
    modelAr: 'كيو 7 / كيو 5',
    year: 2024,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1541348263662-e0c82661600e?w=400&auto=format&fit=crop&q=80',
    category: 'Luxury SUV',
  },

  // Kia
  {
    id: 'kia-sportage',
    make: 'Kia',
    makeAr: 'كيا',
    model: 'Sportage Hybrid / Turbo',
    modelAr: 'سبورتاج هايبرد / تيربو',
    year: 2024,
    fuelType: 'hybrid',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80',
    category: 'SUV',
  },
  {
    id: 'kia-sorento',
    make: 'Kia',
    makeAr: 'كيا',
    model: 'Sorento V6 AWD',
    modelAr: 'سورينتو V6',
    year: 2023,
    fuelType: 'diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=80',
    category: 'SUV',
  },

  // Nissan
  {
    id: 'nissan-patrol',
    make: 'Nissan',
    makeAr: 'نيسان',
    model: 'Patrol V8 Platinum',
    modelAr: 'باترول V8 بلاتينيوم',
    year: 2024,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop&q=80',
    category: 'SUV / 4x4',
  },
  {
    id: 'nissan-altima',
    make: 'Nissan',
    makeAr: 'نيسان',
    model: 'Altima / Sunny',
    modelAr: 'ألتيما / صني',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&auto=format&fit=crop&q=80',
    category: 'Sedan',
  },

  // Ford
  {
    id: 'ford-f150',
    make: 'Ford',
    makeAr: 'فورد',
    model: 'F-150 / Raptor',
    modelAr: 'إف 150 / رابتر',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=400&auto=format&fit=crop&q=80',
    category: 'Truck / Pickup',
  },

  // Tesla
  {
    id: 'tesla-model3',
    make: 'Tesla',
    makeAr: 'تسلا',
    model: 'Model 3 / Model Y',
    modelAr: 'موديل 3 / موديل واي',
    year: 2024,
    fuelType: 'electric',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&auto=format&fit=crop&q=80',
    category: 'Electric EV',
  },

  // Skoda
  {
    id: 'skoda-octavia',
    make: 'Skoda',
    makeAr: 'سكودا',
    model: 'Octavia / Superb TSI',
    modelAr: 'أوكتافيا / سوبيرب',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&auto=format&fit=crop&q=80',
    category: 'Sedan',
  },

  // Lexus
  {
    id: 'lexus-es',
    make: 'Lexus',
    makeAr: 'لكزس',
    model: 'ES 300h / RX 350',
    modelAr: 'إي إس 300h / آر إكس',
    year: 2023,
    fuelType: 'hybrid',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&auto=format&fit=crop&q=80',
    category: 'Luxury Hybrid',
  },

  // Porsche
  {
    id: 'porsche-cayenne',
    make: 'Porsche',
    makeAr: 'بورشه',
    model: 'Cayenne / Macan GTS',
    modelAr: 'كايين / ماكان',
    year: 2023,
    fuelType: 'petrol',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=80',
    category: 'Luxury Sports SUV',
  },
];

export const QuoteRequestModal: React.FC = () => {
  const {
    language,
    t,
    isQuoteModalOpen,
    setIsQuoteModalOpen,
    selectedVehicle,
    createServiceRequest,
    formatPrice,
    selectedCountry,
    isAuthenticated,
    user,
    registerUser,
    login,
    addVehicle,
    setActiveTab,
    setCustomerActiveTab,
    showToast,
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [vehicleSelectionMode, setVehicleSelectionMode] = useState<'catalog' | 'custom'>('catalog');
  const [carSearchQuery, setCarSearchQuery] = useState<string>('');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('all');

  // User Account Bridge inputs (for guest / non-authenticated users)
  const [authName, setAuthName] = useState(
    language === 'ar' ? 'أحمد المنصور' : 'Ahmed Al-Mansoor'
  );
  const [authPhone, setAuthPhone] = useState(
    selectedCountry?.id === 'ae' ? '+971 50 123 4567' : '+970 59 123 4567'
  );
  const [authEmail, setAuthEmail] = useState('customer@example.ps');
  const [authPassword, setAuthPassword] = useState('Customer@2026');
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  // Selected vehicle state (either from catalog or custom entered)
  const [activeSelectedCar, setActiveSelectedCar] = useState<{
    id: string;
    make: string;
    makeAr?: string;
    model: string;
    modelAr?: string;
    year: number;
    fuelType: string;
    plateNumber: string;
    image: string;
  }>({
    id: selectedVehicle?.id || 'toyota-corolla',
    make: selectedVehicle?.make || 'Toyota',
    makeAr: selectedVehicle?.makeAr || 'تويوتا',
    model: selectedVehicle?.model || 'Corolla Hybrid / Sedan',
    modelAr: selectedVehicle?.modelAr || 'كورولا هايبرد / سيدان',
    year: selectedVehicle?.year || 2023,
    fuelType: selectedVehicle?.fuelType || 'hybrid',
    plateNumber: selectedVehicle?.plateNumber || '6-9874-90',
    image: selectedVehicle?.image || REPAIRABLE_VEHICLES_CATALOG[0].image,
  });

  // Custom Vehicle Form Inputs
  const [customMake, setCustomMake] = useState('Toyota');
  const [customModel, setCustomModel] = useState('Corolla');
  const [customYear, setCustomYear] = useState(2023);
  const [customFuelType, setCustomFuelType] = useState('hybrid');
  const [customPlate, setCustomPlate] = useState('7-8901-95');

  const DEFAULT_PROBLEM_DESC = useMemo(() => ({
    ar: 'يوجد صوت صفير خفيف عند الفرملة على السرعات المنخفضة، وأريد فحص كفاءة نظام الفرامل وتغيير الفحمات.',
    en: 'Slight brake squeaking noise at low speeds. Requesting brake system inspection and pad replacement.',
  }), []);

  const DEFAULT_SYMPTOMS = useMemo(() => ({
    ar: ['صوت صفير في الفرامل', 'اهتزاز بسيط عند التوقف'],
    en: ['Brake squeaking noise', 'Slight vibration during braking'],
  }), []);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['cat-brakes']);
  const [problemDescription, setProblemDescription] = useState<string>(
    language === 'ar' ? DEFAULT_PROBLEM_DESC.ar : DEFAULT_PROBLEM_DESC.en
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    language === 'ar' ? DEFAULT_SYMPTOMS.ar : DEFAULT_SYMPTOMS.en
  );
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=400&auto=format&fit=crop&q=80',
  ]);
  const [serviceMethod, setServiceMethod] = useState<'workshop' | 'mobile' | 'pickup'>('workshop');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [locationAddress, setLocationAddress] = useState<string>(
    language === 'ar'
      ? (selectedCountry?.id === 'ae' ? 'دبي - شارع الشيخ زايد' : 'رام الله - الماصيون')
      : (selectedCountry?.id === 'ae' ? 'Dubai - Sheikh Zayed Rd' : 'Ramallah - Al-Masyoun')
  );

  // Sync state whenever active language or selected country changes
  useEffect(() => {
    if (language === 'ar') {
      if (!problemDescription || problemDescription === DEFAULT_PROBLEM_DESC.en) {
        setProblemDescription(DEFAULT_PROBLEM_DESC.ar);
      }
      setSelectedSymptoms((prev) => {
        if (
          prev.length === 0 ||
          (prev.length === 2 && prev.includes(DEFAULT_SYMPTOMS.en[0]) && prev.includes(DEFAULT_SYMPTOMS.en[1]))
        ) {
          return DEFAULT_SYMPTOMS.ar;
        }
        return prev;
      });
      setLocationAddress((prev) => {
        if (!prev || prev.includes('Ramallah') || prev.includes('Dubai') || prev.includes('Sheikh Zayed')) {
          return selectedCountry?.id === 'ae' ? 'دبي - شارع الشيخ زايد' : 'رام الله - الماصيون';
        }
        return prev;
      });
    } else {
      if (!problemDescription || problemDescription === DEFAULT_PROBLEM_DESC.ar) {
        setProblemDescription(DEFAULT_PROBLEM_DESC.en);
      }
      setSelectedSymptoms((prev) => {
        if (
          prev.length === 0 ||
          (prev.length === 2 && prev.includes(DEFAULT_SYMPTOMS.ar[0]) && prev.includes(DEFAULT_SYMPTOMS.ar[1]))
        ) {
          return DEFAULT_SYMPTOMS.en;
        }
        return prev;
      });
      setLocationAddress((prev) => {
        if (!prev || prev.includes('رام الله') || prev.includes('دبي') || prev.includes('الشيخ زايد')) {
          return selectedCountry?.id === 'ae' ? 'Dubai - Sheikh Zayed Rd' : 'Ramallah - Al-Masyoun';
        }
        return prev;
      });
    }
  }, [language, selectedCountry, DEFAULT_PROBLEM_DESC, DEFAULT_SYMPTOMS]);

  // When modal is opened, ensure fresh clean state matching the active language
  useEffect(() => {
    if (isQuoteModalOpen) {
      if (language === 'en') {
        if (!problemDescription || problemDescription === DEFAULT_PROBLEM_DESC.ar) {
          setProblemDescription(DEFAULT_PROBLEM_DESC.en);
        }
      } else {
        if (!problemDescription || problemDescription === DEFAULT_PROBLEM_DESC.en) {
          setProblemDescription(DEFAULT_PROBLEM_DESC.ar);
        }
      }
    }
  }, [isQuoteModalOpen, language, DEFAULT_PROBLEM_DESC]);

  // Filter Catalog Vehicles by search query and brand
  const filteredCatalogVehicles = useMemo(() => {
    return REPAIRABLE_VEHICLES_CATALOG.filter((item) => {
      if (selectedBrandFilter !== 'all' && item.make.toLowerCase() !== selectedBrandFilter.toLowerCase()) {
        return false;
      }
      if (carSearchQuery.trim()) {
        const q = carSearchQuery.toLowerCase().trim();
        const matchMake = item.make.toLowerCase().includes(q) || (item.makeAr && item.makeAr.includes(q));
        const matchModel = item.model.toLowerCase().includes(q) || (item.modelAr && item.modelAr.includes(q));
        const matchCat = item.category.toLowerCase().includes(q);
        return matchMake || matchModel || matchCat;
      }
      return true;
    });
  }, [carSearchQuery, selectedBrandFilter]);

  const uniqueBrands = useMemo(() => {
    return ['all', ...Array.from(new Set(REPAIRABLE_VEHICLES_CATALOG.map((c) => c.make)))];
  }, []);

  if (!isQuoteModalOpen) return null;

  const handleSelectCatalogCar = (car: CatalogVehicle) => {
    setActiveSelectedCar({
      id: car.id,
      make: car.make,
      makeAr: car.makeAr,
      model: car.model,
      modelAr: car.modelAr,
      year: car.year,
      fuelType: car.fuelType,
      plateNumber: activeSelectedCar.plateNumber || '7-8890-95',
      image: car.image,
    });
  };

  const handleApplyCustomCar = () => {
    setActiveSelectedCar({
      id: `custom-${Date.now()}`,
      make: customMake,
      makeAr: customMake,
      model: customModel,
      modelAr: customModel,
      year: customYear,
      fuelType: customFuelType,
      plateNumber: customPlate,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&auto=format&fit=crop&q=80',
    });
  };

  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((id) => id !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const sampleSymptoms = [
    { ar: 'صوت صفير في الفرامل', en: 'Brake squeaking noise' },
    { ar: 'اهتزاز بسيط عند التوقف', en: 'Slight vibration during braking' },
    { ar: 'ضعف في عزم المحرك', en: 'Loss of engine power' },
    { ar: 'لمبة فحص المحرك مضاءة (Check Engine)', en: 'Check Engine light on' },
    { ar: 'تكييف السيارة يخرج هواء دافئ', en: 'AC blowing warm air' },
    { ar: 'صوت طقطقة عند تدوير المقود', en: 'Clicking sound when turning steering' },
    { ar: 'صعوبة في تشغيل السيارة صباحاً', en: 'Hard starting in the morning' },
  ];

  const toggleSymptom = (symp: { ar: string; en: string }) => {
    const text = language === 'ar' ? symp.ar : symp.en;
    const isAlreadySelected = selectedSymptoms.some((s) => s === symp.ar || s === symp.en);

    if (isAlreadySelected) {
      // 1. Remove from selected symptoms list
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symp.ar && s !== symp.en));

      // 2. Remove phrase from problem description textarea
      setProblemDescription((prev) => {
        let updated = prev;
        [symp.en, symp.ar].forEach((phrase) => {
          const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          updated = updated
            .replace(new RegExp(`(^|[،,\\s\\-\\•])\\s*${escaped}[،,\\.]?\\s*`, 'gi'), '$1')
            .replace(/^[،,\s\-\\•]+/, '')
            .replace(/[،,\s\-\\•]+$/, '')
            .trim();
        });
        return updated;
      });
    } else {
      // 1. Add to selected symptoms list
      setSelectedSymptoms([...selectedSymptoms, text]);

      // 2. Append phrase to problem description textarea
      setProblemDescription((prev) => {
        const trimmed = prev.trim();
        if (!trimmed) {
          return text;
        }
        // Don't duplicate if already present in description
        if (trimmed.toLowerCase().includes(text.toLowerCase()) || (symp.ar && trimmed.includes(symp.ar))) {
          return trimmed;
        }
        const separator = language === 'ar' ? '، ' : ', ';
        return `${trimmed}${separator}${text}`;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const carSummary = `${activeSelectedCar.make} ${activeSelectedCar.model} (${activeSelectedCar.year})`;
    const carPlate = activeSelectedCar.plateNumber || '7-1234-95';

    let customerName = user?.name || authName || (language === 'ar' ? 'أحمد المنصور' : 'Ahmed Al-Mansoor');
    let customerPhone = user?.phone || authPhone || '+970 59 123 4567';

    // 1. If not authenticated, automatically register/activate the customer account with this vehicle!
    if (!isAuthenticated) {
      if (authMode === 'signup') {
        registerUser('customer', {
          fullName: authName,
          phone: authPhone,
          email: authEmail,
          password: authPassword,
          city: locationAddress,
          vehicleMake: activeSelectedCar.make,
          vehicleModel: activeSelectedCar.model,
          vehicleYear: activeSelectedCar.year,
          vehiclePlate: carPlate,
          vehicleFuel: activeSelectedCar.fuelType,
          vehicleImage: activeSelectedCar.image,
        });
        customerName = authName;
        customerPhone = authPhone;
      } else {
        login('customer', {
          name: authName || (language === 'ar' ? 'أحمد المنصور' : 'Ahmed Al-Mansoor'),
          email: authEmail,
          phone: authPhone,
          role: 'customer',
        });
      }
    }

    // 2. Ensure vehicle is in the user's Digital Garage
    addVehicle({
      make: activeSelectedCar.make,
      model: activeSelectedCar.model,
      year: activeSelectedCar.year,
      trim: 'Standard',
      fuelType: activeSelectedCar.fuelType as any,
      transmission: 'automatic',
      plateNumber: carPlate,
      mileage: 28000,
      image: activeSelectedCar.image,
      isPrimary: true,
    });

    // 3. Create the Service Request
    createServiceRequest({
      vehicleId: activeSelectedCar.id || 'veh-1',
      vehicleSummary: carSummary,
      vehiclePlate: carPlate,
      serviceCategoryIds: selectedCategories,
      description: problemDescription,
      symptoms: selectedSymptoms,
      photos,
      serviceMethod,
      urgency,
      locationAddress,
      city: language === 'ar' ? (selectedCountry?.id === 'ae' ? 'دبي' : 'رام الله') : (selectedCountry?.id === 'ae' ? 'Dubai' : 'Ramallah'),
      customerName,
      customerPhone,
    });

    // 4. Toast notification and navigation to Garage
    showToast(
      language === 'ar'
        ? `🎉 تم حفظ المركبة في كراجك وإرسال طلب التسعير بنجاح!`
        : `🎉 Vehicle saved to your Digital Garage & quote request sent!`,
      'success'
    );

    setActiveTab('customer');
    setCustomerActiveTab('garage');
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 px-6 py-5 text-white flex justify-between items-center border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700/60 border border-blue-500/40 flex items-center justify-center text-amber-300">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {t.requestQuoteTitle}
              </h3>
              <p className="text-xs text-blue-100">
                {t.requestQuoteSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsQuoteModalOpen(false)}
            className="text-blue-200 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-500 overflow-x-auto">
          <span className={step >= 1 ? 'text-blue-700 font-black flex items-center gap-1.5' : ''}>
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">1</span>
            <span>{t.stepVehicle}</span>
          </span>
          <span>→</span>
          <span className={step >= 2 ? 'text-blue-700 font-black flex items-center gap-1.5' : ''}>
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">2</span>
            <span>{t.stepCategory}</span>
          </span>
          <span>→</span>
          <span className={step >= 3 ? 'text-blue-700 font-black flex items-center gap-1.5' : ''}>
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">3</span>
            <span>{t.stepDetails}</span>
          </span>
          <span>→</span>
          <span className={step >= 4 ? 'text-blue-700 font-black flex items-center gap-1.5' : ''}>
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-[10px]">4</span>
            <span>{t.stepMethod}</span>
          </span>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm">
          {/* STEP 1: Search & Select Vehicle for Repair */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900">
                    {language === 'ar' ? 'حدد أو ابحث عن نوع المركبة المراد صيانتها:' : 'Search & Select Vehicle for Repair:'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {language === 'ar'
                      ? 'ابحث وحدد نوع المركبة المراد صيانتها أو أدخل بيانات مركبة أخرى.'
                      : 'Search and select the vehicle for repair or enter custom vehicle details.'}
                  </p>
                </div>

                {/* Selection Mode Switcher Tabs */}
                <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 shrink-0 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setVehicleSelectionMode('catalog')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      vehicleSelectionMode === 'catalog'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {language === 'ar' ? '🔍 بحث وتصفح السيارات' : '🔍 Search Repairable Cars'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicleSelectionMode('custom')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      vehicleSelectionMode === 'custom'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {language === 'ar' ? '✍️ إدخال يدوي لمركبة أخرى' : '✍️ Custom Vehicle'}
                  </button>
                </div>
              </div>

              {/* MODE 1: Catalog Search & Filter */}
              {vehicleSelectionMode === 'catalog' && (
                <div className="space-y-3.5">
                  {/* Search Bar */}
                  <div className="relative">
                    <input
                      type="text"
                      value={carSearchQuery}
                      onChange={(e) => setCarSearchQuery(e.target.value)}
                      placeholder={
                        language === 'ar'
                          ? 'ابحث باسم الشركة أو الموديل (مثال: تويوتا كامري، مرسيدس C-Class، بي إم دبليو X5، جولف، توسان)...'
                          : 'Search by make or model (e.g., Toyota Camry, Mercedes C-Class, BMW X5, Golf, Tucson)...'
                      }
                      className="w-full ps-10 pe-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all shadow-2xs"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-3" />
                    {carSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setCarSearchQuery('')}
                        className="absolute end-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Brand Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {uniqueBrands.map((brand) => (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => setSelectedBrandFilter(brand)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                          selectedBrandFilter === brand
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {brand === 'all' ? (language === 'ar' ? 'جميع الشركات' : 'All Makes') : brand}
                      </button>
                    ))}
                  </div>

                  {/* Vehicle Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[260px] overflow-y-auto p-1">
                    {filteredCatalogVehicles.length > 0 ? (
                      filteredCatalogVehicles.map((car) => {
                        const isSelected = activeSelectedCar.id === car.id || (activeSelectedCar.make === car.make && activeSelectedCar.model === car.model);
                        return (
                          <div
                            key={car.id}
                            onClick={() => handleSelectCatalogCar(car)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 relative group ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-sm'
                                : 'border-slate-200 hover:border-blue-400 bg-white hover:shadow-sm'
                            }`}
                          >
                            <img
                              src={car.image}
                              alt={car.make}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0 group-hover:scale-102 transition-transform"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-slate-900 text-xs truncate">
                                  {language === 'ar' ? `${car.makeAr} ${car.modelAr}` : `${car.make} ${car.model}`}
                                </span>
                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                                  {car.category}
                                </span>
                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  car.fuelType === 'hybrid'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : car.fuelType === 'electric'
                                    ? 'bg-purple-100 text-purple-800'
                                    : car.fuelType === 'diesel'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {car.fuelType}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-span-full text-center py-8 text-slate-400">
                        <Car className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>{language === 'ar' ? 'لم يتم العثور على سيارات مطابقة لبحثك' : 'No matching vehicles found'}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODE 2: Custom Vehicle Entry */}
              {vehicleSelectionMode === 'custom' && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'الشركة الصانعة (Make):' : 'Vehicle Make:'}
                      </label>
                      <input
                        type="text"
                        value={customMake}
                        onChange={(e) => setCustomMake(e.target.value)}
                        placeholder="e.g. Genesis, Jeep, Peugeot, MG"
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'الموديل (Model):' : 'Vehicle Model:'}
                      </label>
                      <input
                        type="text"
                        value={customModel}
                        onChange={(e) => setCustomModel(e.target.value)}
                        placeholder="e.g. GV80, Wrangler, 3008, GT"
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'سنة الصنع (Year):' : 'Model Year:'}
                      </label>
                      <select
                        value={customYear}
                        onChange={(e) => setCustomYear(Number(e.target.value))}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none"
                      >
                        {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010].map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'نوع الوقود (Fuel):' : 'Fuel Type:'}
                      </label>
                      <select
                        value={customFuelType}
                        onChange={(e) => setCustomFuelType(e.target.value)}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none"
                      >
                        <option value="petrol">{language === 'ar' ? 'بنزين (Petrol)' : 'Petrol'}</option>
                        <option value="diesel">{language === 'ar' ? 'ديزل (Diesel)' : 'Diesel'}</option>
                        <option value="hybrid">{language === 'ar' ? 'هايبرد هجين (Hybrid)' : 'Hybrid'}</option>
                        <option value="electric">{language === 'ar' ? 'كهربائية (EV)' : 'Electric EV'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {language === 'ar' ? 'رقم اللوحة (Plate):' : 'Plate Number:'}
                      </label>
                      <input
                        type="text"
                        value={customPlate}
                        onChange={(e) => setCustomPlate(e.target.value)}
                        placeholder="7-8901-95"
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyCustomCar}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs"
                  >
                    {language === 'ar' ? '✓ اعتماد المركبة المحددة' : '✓ Set Selected Vehicle'}
                  </button>
                </div>
              )}

              {/* Selected Vehicle Summary Card */}
              <div className="bg-slate-900 text-white p-3.5 rounded-2xl flex items-center justify-between border border-slate-800 shadow-md">
                <div className="flex items-center gap-3">
                  <img
                    src={activeSelectedCar.image}
                    alt={activeSelectedCar.make}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold block uppercase tracking-wider">
                      {language === 'ar' ? 'المركبة المحددة لطلب التسعير:' : 'Selected Vehicle for Quotation:'}
                    </span>
                    <strong className="text-sm font-black text-white">
                      {language === 'ar' ? (activeSelectedCar.makeAr || activeSelectedCar.make) : activeSelectedCar.make}{' '}
                      {language === 'ar' ? (activeSelectedCar.modelAr || activeSelectedCar.model) : activeSelectedCar.model}
                    </strong>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{activeSelectedCar.year}</span>
                      <span>•</span>
                      <span className="uppercase text-amber-300">{activeSelectedCar.fuelType}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-300">{activeSelectedCar.plateNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-500/40 text-[11px] font-bold shrink-0 hidden sm:flex items-center gap-1">
                  <span>✓ {language === 'ar' ? 'جاهز للتسعير' : 'Ready'}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Select Categories */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm font-black text-slate-900">
                {language === 'ar' ? 'اختر تصنيفات الصيانة المطلوبة (يمكنك تحديد أكثر من خدمة):' : 'Select Required Service Categories:'}
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategories.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs">{language === 'ar' ? cat.nameAr : cat.nameEn}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-100' : 'text-blue-700 font-bold'}`}>
                        {t.startingFrom} {formatPrice(cat.basePrice)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Symptoms & Description */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block font-bold text-slate-800 text-xs sm:text-sm">
                    {language === 'ar' ? 'وصف المشكلة والأعراض الملاحظة بالتفصيل:' : 'Detailed Problem Description:'}
                  </label>
                  {problemDescription && (
                    <button
                      type="button"
                      onClick={() => {
                        setProblemDescription('');
                        setSelectedSymptoms([]);
                      }}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold hover:underline cursor-pointer"
                    >
                      {language === 'ar' ? 'مسح النص ✕' : 'Clear Text ✕'}
                    </button>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? 'اكتب تفاصيل العطل هنا أو انقر على أي من الأعراض الشائعة أدناه لإضافتها مباشرة إلى النص...'
                      : 'Describe your vehicle issue here or click any of the common symptoms below to insert them directly into this description...'
                  }
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl outline-none focus:border-blue-600 focus:bg-white text-slate-900 transition-all font-medium text-xs sm:text-sm shadow-inner"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-bold text-slate-800 text-xs sm:text-sm">
                    {language === 'ar' ? 'أعراض شائعة (انقر للإضافة أو الإزالة من الوصف):' : 'Common Symptoms (Click to Add / Remove from Description):'}
                  </label>
                  {selectedSymptoms.length > 0 && (
                    <span className="text-[11px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      {language === 'ar'
                        ? `تم تحديد (${selectedSymptoms.length})`
                        : `(${selectedSymptoms.length}) selected`}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {sampleSymptoms.map((symp, idx) => {
                    const text = language === 'ar' ? symp.ar : symp.en;
                    const isSelected = selectedSymptoms.some((s) => s === symp.ar || s === symp.en);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleSymptom(symp)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-700 font-bold shadow-xs hover:bg-blue-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                        }`}
                      >
                        <span>{text}</span>
                        <span className={`text-[10px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          {isSelected ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Method & Account Creation / Garage Link */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block font-bold text-slate-800 mb-2 text-xs sm:text-sm">
                  {language === 'ar' ? 'طريقة استلام وإجراء الصيانة:' : 'Service Delivery Method:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setServiceMethod('workshop')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      serviceMethod === 'workshop'
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <h5 className="font-bold text-xs mb-1">{t.serviceMethodWorkshop}</h5>
                    <p className="text-[11px] opacity-80">
                      {language === 'ar' ? 'الذهاب بالمركبة مباشرة إلى مقر الورشة' : 'Drive vehicle directly to workshop'}
                    </p>
                  </div>

                  <div
                    onClick={() => setServiceMethod('mobile')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      serviceMethod === 'mobile'
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <h5 className="font-bold text-xs mb-1">{t.serviceMethodMobile}</h5>
                    <p className="text-[11px] opacity-80">
                      {language === 'ar' ? 'فني صيانة مجهز يصل لموقعك أو منزلك' : 'Mobile technician dispatched to your location'}
                    </p>
                  </div>

                  <div
                    onClick={() => setServiceMethod('pickup')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      serviceMethod === 'pickup'
                        ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <h5 className="font-bold text-xs mb-1">{t.serviceMethodPickup}</h5>
                    <p className="text-[11px] opacity-80">
                      {language === 'ar' ? 'استلام ونقل المركبة بسطحة وإعادتها بعد الإنجاز' : 'Flatbed towing pickup and return upon completion'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1 text-xs sm:text-sm">
                  {language === 'ar' ? `عنوان موقعك الحالي في ${selectedCountry.nameAr}:` : `Your Current Location in ${selectedCountry.nameEn}:`}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={locationAddress}
                    onChange={(e) => setLocationAddress(e.target.value)}
                    className="w-full p-2.5 ps-9 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 outline-none focus:border-blue-600 font-medium text-xs sm:text-sm"
                  />
                  <MapPin className="w-4 h-4 text-blue-600 absolute start-3 top-3" />
                </div>
              </div>

              {/* Account Creation & Garage Link Section */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-200/80 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                        {language === 'ar' ? 'ربط المركبة وتفعيل كراجك الرقمي' : 'Vehicle Link & Digital Garage Account'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {language === 'ar'
                          ? `سيتم حفظ مركبة (${activeSelectedCar.make} ${activeSelectedCar.model}) تلقائياً في كراجك ومتابعة عروض الأسعار.`
                          : `Vehicle (${activeSelectedCar.make} ${activeSelectedCar.model}) will be automatically saved to your Digital Garage.`}
                      </p>
                    </div>
                  </div>

                  {!isAuthenticated && (
                    <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shrink-0 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          authMode === 'signup' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        {language === 'ar' ? 'حساب جديد' : 'New Account'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthMode('signin')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          authMode === 'signin' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        {language === 'ar' ? 'تسجيل دخول' : 'Sign In'}
                      </button>
                    </div>
                  )}
                </div>

                {isAuthenticated ? (
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-900 block">{user?.name || 'Customer'}</span>
                        <span className="text-[11px] text-slate-500">{user?.phone || user?.email}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {language === 'ar' ? 'الحساب مسجل' : 'Account Active'}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {language === 'ar' ? 'الاسم الكامل:' : 'Full Name:'}
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                            placeholder="Ahmed Al-Mansoor"
                            className="w-full p-2 ps-8 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                          />
                          <User className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {language === 'ar' ? 'رقم الهاتف:' : 'Phone Number:'}
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={authPhone}
                            onChange={(e) => setAuthPhone(e.target.value)}
                            placeholder="+970 59 123 4567"
                            className="w-full p-2 ps-8 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600 font-mono"
                          />
                          <Phone className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {language === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            placeholder="customer@example.ps"
                            className="w-full p-2 ps-8 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                          />
                          <Mail className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-2.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          {language === 'ar' ? 'كلمة المرور:' : 'Password:'}
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full p-2 ps-8 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
                          />
                          <Lock className="w-3.5 h-3.5 text-slate-400 absolute start-2.5 top-2.5" />
                        </div>
                      </div>
                    </div>

                    {/* Quick Demo Fill Button */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthName(language === 'ar' ? 'أحمد المنصور' : 'Ahmed Al-Mansoor');
                          setAuthPhone(selectedCountry?.id === 'ae' ? '+971 50 123 4567' : '+970 59 123 4567');
                          setAuthEmail('customer@ahlalmarkabat.com');
                          setAuthPassword('Customer@2026');
                        }}
                        className="text-[11px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        {language === 'ar' ? '⚡ تعبئة بيانات تجريبية سريعة' : '⚡ Quick Demo Fill'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
            >
              {t.prevStep}
            </button>
          ) : (
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="px-4 py-2 text-slate-500 hover:text-slate-800 font-bold text-xs cursor-pointer"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs shadow-md transition-all cursor-pointer"
            >
              {t.nextStep}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{language === 'ar' ? 'إرسال الطلب وحفظ في الكراج ⚡' : 'Send Request & Save to Garage ⚡'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
