import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Role,
  Language,
  DeviceViewMode,
  CountryConfig,
  UserProfile,
  Vehicle,
  Provider,
  ServiceRequest,
  Job,
  EmergencyRequest,
  KYCVerificationCase,
  Review,
  EmergencyType,
  InventoryItem,
  DigitalInspectionReport,
  ProviderCustomService,
  WorkshopBranch,
  StockTransferItem,
  BranchStaffMember,
} from '../types';
import {
  COUNTRIES_CONFIG,
  INITIAL_PROVIDERS,
  INITIAL_VEHICLES,
  INITIAL_REQUESTS,
  INITIAL_JOBS,
  INITIAL_KYC_CASES,
  INITIAL_REVIEWS,
  INITIAL_INSPECTIONS,
  INITIAL_INVENTORY,
  INITIAL_BRANCHES,
  INITIAL_STOCK_TRANSFERS,
  INITIAL_BRANCH_STAFF,
} from '../data/mockData';
import { translations } from '../i18n';
import {
  checkBackendHealth,
  authApi,
  vehiclesApi,
  requestsApi,
  offersApi,
  bookingsJobsApi,
  emergencyApi,
  aiApi,
  workshopApi,
  inspectionsApi,
  marketplaceApi,
  financeApi,
} from '../services';

export interface CartItem {
  id: string;
  nameEn: string;
  nameAr: string;
  partNum: string;
  price: number;
  image: string;
  quantity: number;
  sellerEn: string;
  sellerAr: string;
}

export interface PlacedOrder {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  recipientName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: string;
  date: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface PlacedBooking {
  id: string;
  providerId: string;
  providerName: string;
  providerImage?: string;
  serviceId: string;
  serviceName: string;
  vehicleDetails: string;
  date: string;
  timeSlot: string;
  serviceMode: string;
  price: number;
  customerName: string;
  customerPhone: string;
  status: 'confirmed' | 'in_progress' | 'completed';
  notes?: string;
}

export interface AppNotification {
  id: string;
  type: 'booking' | 'order' | 'quote' | 'alert' | 'system';
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  timestamp: string;
  read: boolean;
  targetRoles: Role[];
  actionTab?: string;
  referenceId?: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ar;
  role: Role;
  setRole: (role: Role) => void;
  deviceViewMode: DeviceViewMode;
  setDeviceViewMode: (mode: DeviceViewMode) => void;

  // Multi-Country & Currency
  countries: CountryConfig[];
  selectedCountry: CountryConfig;
  setSelectedCountryId: (countryId: string) => void;
  formatPrice: (amountInILS: number) => string;

  // User & Garage
  user: UserProfile;
  customerProfile: UserProfile;
  providerProfile: UserProfile;
  adminProfile: UserProfile;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  setSelectedVehicleId: (id: string) => void;
  addVehicle: (vehicleData: Partial<Vehicle>) => void;
  updateVehicleMileage: (vehicleId: string, newMileage: number) => void;

  // Providers & Search
  providers: Provider[];
  registeredCustomers: UserProfile[];
  providerServices: ProviderCustomService[];
  addProviderService: (service: Omit<ProviderCustomService, 'id'>) => string;
  updateProviderService: (id: string, service: Partial<ProviderCustomService>) => void;
  deleteProviderService: (id: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedVehicleType: string;
  setSelectedVehicleType: (vType: string) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (cat: string | null) => void;

  // Requests & Quotes
  serviceRequests: ServiceRequest[];
  createServiceRequest: (requestData: Partial<ServiceRequest>) => string;
  acceptQuote: (requestId: string, quoteId: string) => void;

  // Provider SaaS & Work Orders
  jobs: Job[];
  updateJobStatus: (jobId: string, status: Job['status']) => void;
  isProviderOnline: boolean;
  setIsProviderOnline: (online: boolean) => void;

  // Multi-Branch Workshop Platform & Inter-Branch Stock Transfers
  branches: WorkshopBranch[];
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
  selectedBranch: WorkshopBranch | null;
  addBranch: (branchData: Omit<WorkshopBranch, 'id'>) => string;
  updateBranch: (id: string, branchData: Partial<WorkshopBranch>) => void;
  deleteBranch: (id: string) => void;
  stockTransfers: StockTransferItem[];
  createStockTransfer: (
    data: Omit<StockTransferItem, 'id' | 'transferId' | 'date' | 'status'> & {
      status?: StockTransferItem['status'];
    }
  ) => string;
  updateStockTransferStatus: (id: string, status: StockTransferItem['status']) => void;
  branchStaff: BranchStaffMember[];
  assignStaffToBranch: (staffId: string, branchId: string) => void;

  // Inventory Management
  inventory: InventoryItem[];
  adjustInventoryStock: (itemId: string, qtyDelta: number) => void;

  // Digital Vehicle Inspections
  inspections: DigitalInspectionReport[];
  createInspectionReport: (report: Partial<DigitalInspectionReport>) => void;

  // Roadside SOS
  activeEmergency: EmergencyRequest | null;
  createEmergencySOS: (
    type: EmergencyType,
    locationAddress: string,
    options?: {
      lat?: number;
      lng?: number;
      customerName?: string;
      customerPhone?: string;
      vehicleName?: string;
      vehiclePlate?: string;
      price?: number;
      currency?: string;
      destinationAddress?: string;
    }
  ) => void;
  acceptEmergencySOS: (
    emergencyId: string,
    providerInfo?: {
      id?: string;
      name?: string;
      phone?: string;
      vehiclePlate?: string;
      lat?: number;
      lng?: number;
    }
  ) => void;
  updateEmergencyStatus: (emergencyId: string, status: EmergencyRequest['status'], step?: number) => void;
  completeEmergencySOS: (emergencyId: string) => void;
  cancelEmergencySOS: (emergencyId: string) => void;

  // KYC Verification
  kycCases: KYCVerificationCase[];
  updateKYCStatus: (caseId: string, status: KYCVerificationCase['status'], notes?: string) => void;

  // Reviews
  reviews: Review[];

  // Navigation & Modals UI state
  activeTab: string;
  setActiveTab: (tab: string) => void;
  customerActiveTab: string;
  setCustomerActiveTab: (tab: string) => void;
  adminActivePillar: string;
  setAdminActivePillar: (pillar: string) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  isSOSModalOpen: boolean;
  setIsSOSModalOpen: (open: boolean) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  selectedProviderModal: Provider | null;
  setSelectedProviderModal: (p: Provider | null) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  isCartModalOpen: boolean;
  setIsCartModalOpen: (open: boolean) => void;

  // Authentication State & Actions (SRS EPIC-01)
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup';
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  isAuthenticated: boolean;
  login: (selectedRole: Role, customProfile?: Partial<UserProfile>) => void;
  registerUser: (selectedRole: Role, userData: any) => void;
  logout: () => void;

  // Marketplace & Cart
  cart: CartItem[];
  addToCart: (
    product: {
      id: string;
      nameEn: string;
      nameAr: string;
      partNum?: string;
      price: number;
      image?: string;
      sellerEn?: string;
      sellerAr?: string;
    },
    qty?: number
  ) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  placedOrders: PlacedOrder[];
  createMarketplaceOrder: (orderData: Omit<PlacedOrder, 'id' | 'date' | 'status'>) => string;

  // Booking Flow Orchestration
  selectedProviderForBooking: Provider | null;
  setSelectedProviderForBooking: (p: Provider | null) => void;
  preselectedServiceForBooking: string | null;
  setPreselectedServiceForBooking: (s: string | null) => void;
  startBookingWithProvider: (provider: Provider, serviceId?: string) => void;
  placedBookings: PlacedBooking[];
  createBooking: (bookingData: Omit<PlacedBooking, 'id' | 'status'>) => string;

  // Real-Time Notification System (Cross-Role)
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // Toast
  // Backend Live / Demo Status & APIs
  isBackendConnected: boolean;
  checkBackendConnection: () => Promise<boolean>;
  diagnoseWithAI: (description: string) => Promise<any>;

  toastMessage: string | null;
  showToast: (msg: string, type?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [role, setRole] = useState<Role>('customer');
  const [deviceViewMode, setDeviceViewMode] = useState<DeviceViewMode>('desktop');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [customerActiveTab, setCustomerActiveTab] = useState<string>('garage');
  const [adminActivePillar, setAdminActivePillar] = useState<string>('overview');

  // Country State
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  const checkBackendConnection = async (): Promise<boolean> => {
    const isOnline = await checkBackendHealth();
    setIsBackendConnected(isOnline);
    return isOnline;
  };

  useEffect(() => {
    checkBackendConnection();
    const interval = setInterval(checkBackendConnection, 10000);
    return () => clearInterval(interval);
  }, []);

  const diagnoseWithAI = async (description: string) => {
    if (isBackendConnected) {
      try {
        return await aiApi.diagnoseProblem('diag-' + Date.now(), description);
      } catch (err) {
        console.warn('Backend AI failed, falling back to local heuristic', err);
      }
    }
    return null;
  };

  const [selectedCountryId, setSelectedCountryId] = useState<string>('ps');
  const selectedCountry = COUNTRIES_CONFIG.find((c) => c.id === selectedCountryId) || COUNTRIES_CONFIG[0];

  // User State & Authentication with LocalStorage Session Persistence
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      return saved ? JSON.parse(saved).isAuthenticated === true : false;
    } catch {
      return false;
    }
  });

  const [customerProfile, setCustomerProfile] = useState<UserProfile>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'customer' && parsed.user) return parsed.user;
      }
    } catch {}
    return {
      id: 'cust-1',
      name: 'Ahmed Al-Mansoor',
      phone: '+970 59 111 2233',
      email: 'customer@ahlalmarkabat.com',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      city: 'رام الله',
      isDemoUser: true,
      isNewUser: false,
    };
  });

  const [providerProfile, setProviderProfile] = useState<UserProfile>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'provider' && parsed.user) return parsed.user;
      }
    } catch {}
    return {
      id: 'prov-1',
      name: 'Erlindo Garage',
      phone: '+970 59 999 8888',
      email: 'workshop@ahlalmarkabat.com',
      role: 'provider',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      city: 'رام الله',
      isNewUser: true,
    };
  });

  const [adminProfile, setAdminProfile] = useState<UserProfile>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'admin' && parsed.user) return parsed.user;
      }
    } catch {}
    return {
      id: 'admin-1',
      name: 'Platform Super Admin',
      phone: '+970 59 000 1111',
      email: 'admin@ahlalmarkabat.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      city: 'القدس',
    };
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user) return parsed.user;
      }
    } catch {}
    return customerProfile;
  });

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (role === 'provider') {
      setProviderProfile((prev) => ({ ...prev, ...data }));
      setUser((prev) => ({ ...prev, ...data }));
    } else if (role === 'admin') {
      setAdminProfile((prev) => ({ ...prev, ...data }));
      setUser((prev) => ({ ...prev, ...data }));
    } else {
      setCustomerProfile((prev) => ({ ...prev, ...data }));
      setUser((prev) => ({ ...prev, ...data }));
    }
  };

  // Keep active user synchronized with active role persona
  useEffect(() => {
    if (role === 'provider') {
      setUser(providerProfile);
    } else if (role === 'admin') {
      setUser(adminProfile);
    } else {
      setUser(customerProfile);
    }
  }, [role, customerProfile, providerProfile, adminProfile]);

  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(INITIAL_VEHICLES[0]?.id || '');
  const [registeredCustomers, setRegisteredCustomers] = useState<UserProfile[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_registered_users') : null;
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [providerServices, setProviderServices] = useState<ProviderCustomService[]>([]);

  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [selectedCity, setSelectedCity] = useState<string>('Dubai');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  const handleSetSelectedCity = (city: string) => {
    setSelectedCity(city);
    if (!city || city === 'all') return;
    const c = city.toLowerCase().trim();
    if (
      c.includes('hebron') ||
      c.includes('ramallah') ||
      c.includes('nablus') ||
      c.includes('jerusalem') ||
      c.includes('bethlehem') ||
      c.includes('jenin') ||
      c.includes('tulkarm') ||
      c.includes('gaza') ||
      city.includes('الخليل') ||
      city.includes('رام الله') ||
      city.includes('نابلس') ||
      city.includes('القدس') ||
      city.includes('بيت لحم') ||
      city.includes('جنين')
    ) {
      setSelectedCountryId('ps');
    } else if (
      c.includes('dubai') ||
      c.includes('abu dhabi') ||
      c.includes('sharjah') ||
      c.includes('ajman') ||
      c.includes('ras al khaimah') ||
      city.includes('دبي') ||
      city.includes('أبوظبي') ||
      city.includes('الشارقة') ||
      city.includes('عجمان') ||
      city.includes('رأس الخيمة')
    ) {
      setSelectedCountryId('ae');
    } else if (
      c.includes('riyadh') ||
      c.includes('jeddah') ||
      c.includes('dammam') ||
      city.includes('الرياض') ||
      city.includes('جدة') ||
      city.includes('الدمام')
    ) {
      setSelectedCountryId('sa');
    } else if (
      c.includes('amman') ||
      c.includes('zarqa') ||
      c.includes('irbid') ||
      c.includes('aqaba') ||
      city.includes('عمان') ||
      city.includes('عَمّان') ||
      city.includes('الزرقاء') ||
      city.includes('إربد')
    ) {
      setSelectedCountryId('jo');
    }
  };

  const addProviderService = (serviceData: Omit<ProviderCustomService, 'id'>): string => {
    const serviceId = `srv-${Date.now()}`;
    const newService: ProviderCustomService = {
      ...serviceData,
      id: serviceId,
    };
    setProviderServices((prev) => [newService, ...prev]);
    showToast(language === 'ar' ? 'تمت إضافة الخدمة بنجاح!' : 'Service added successfully!', 'success');
    return serviceId;
  };

  const updateProviderService = (id: string, updatedData: Partial<ProviderCustomService>) => {
    setProviderServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );
    showToast(language === 'ar' ? 'تم تحديث بيانات الخدمة' : 'Service updated successfully');
  };

  const deleteProviderService = (id: string) => {
    setProviderServices((prev) => prev.filter((s) => s.id !== id));
    showToast(language === 'ar' ? 'تم حذف الخدمة' : 'Service deleted');
  };

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user && parsed.user.email !== 'provider@ahlalmarkabat.com' && !parsed.user.isDemoUser) {
          return [];
        }
      }
    } catch {}
    return INITIAL_REQUESTS;
  });

  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user && parsed.user.email !== 'provider@ahlalmarkabat.com' && !parsed.user.isDemoUser) {
          return [];
        }
      }
    } catch {}
    return INITIAL_JOBS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user && parsed.user.email !== 'provider@ahlalmarkabat.com' && !parsed.user.isDemoUser) {
          return [];
        }
      }
    } catch {}
    return INITIAL_INVENTORY;
  });

  const [inspections, setInspections] = useState<DigitalInspectionReport[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user && parsed.user.email !== 'provider@ahlalmarkabat.com' && !parsed.user.isDemoUser) {
          return [];
        }
      }
    } catch {}
    return INITIAL_INSPECTIONS;
  });
  const [activeEmergency, setActiveEmergency] = useState<EmergencyRequest | null>(null);
  const [kycCases, setKycCases] = useState<KYCVerificationCase[]>(INITIAL_KYC_CASES);
  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Multi-Branch Workshop Platform State
  const [branches, setBranches] = useState<WorkshopBranch[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'provider' && parsed.user) {
          const u = parsed.user;
          if (u.email !== 'provider@ahlalmarkabat.com' && !u.isDemoUser) {
            return [
              {
                id: `${u.id || 'prov-1'}-b1`,
                name: `${u.name} (Main Hub)`,
                nameAr: `${u.name} (الفرع الرئيسي)`,
                code: 'AML-BR-01',
                city: u.city || 'Dubai',
                cityAr: u.city || 'دبي',
                area: `${u.city || 'Dubai'} Central`,
                areaAr: `وسط ${u.city || 'دبي'}`,
                address: `${u.city || 'Dubai'}, Main Road`,
                addressAr: `${u.city || 'دبي'}، الشارع العام`,
                phone: u.phone || '+970 59 123 4567',
                whatsapp: u.phone || '+970 59 123 4567',
                manager: u.name,
                managerPhone: u.phone || '+970 59 123 4567',
                status: 'Open',
                openingHours: '8:00 AM – 8:00 PM • Sat – Thu',
                openingHoursAr: 'السبت - الخميس: 8:00 ص - 8:00 م',
                lat: 25.2048,
                lng: 55.2708,
                serviceBays: 3,
                activeTechnicians: 0,
                bookingsMonth: 0,
                revenueMonth: 0,
                utilization: 0,
                rating: 5.0,
                reviewCount: 0,
                isMainHub: true,
                supportedServices: ['Mechanic', 'Electrical', 'Diagnostics', 'Quick Service'],
                partsCount: 0,
              },
            ];
          }
        }
      }
    } catch {}
    return INITIAL_BRANCHES;
  });

  const [selectedBranchId, setSelectedBranchId] = useState<string>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'provider' && parsed.user) {
          const u = parsed.user;
          if (u.email !== 'provider@ahlalmarkabat.com' && !u.isDemoUser) {
            return `${u.id || 'prov-1'}-b1`;
          }
        }
      }
    } catch {}
    return 'all';
  });

  const [stockTransfers, setStockTransfers] = useState<StockTransferItem[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'provider' && parsed.user?.email !== 'provider@ahlalmarkabat.com' && !parsed.user?.isDemoUser) {
          return [];
        }
      }
    } catch {}
    return INITIAL_STOCK_TRANSFERS;
  });

  const [branchStaff, setBranchStaff] = useState<BranchStaffMember[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('aam_user_session') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'provider' && parsed.user?.email !== 'provider@ahlalmarkabat.com' && !parsed.user?.isDemoUser) {
          return [];
        }
      }
    } catch {}
    return INITIAL_BRANCH_STAFF;
  });

  // Keep branches synchronized with provider user persona
  useEffect(() => {
    if (role === 'provider' && user && user.email !== 'provider@ahlalmarkabat.com' && !user.isDemoUser) {
      setBranches((prev) => {
        const hasDemoBranches = prev.some((b) => b.id.startsWith('br-ram-') || b.name.includes('AutoTech Premier'));
        if (hasDemoBranches || prev.length === 0) {
          const defaultBranch: WorkshopBranch = {
            id: `${user.id || 'prov'}-b1`,
            name: `${user.name} (Main Hub)`,
            nameAr: `${user.name} (الفرع الرئيسي)`,
            code: 'AML-BR-01',
            city: user.city || 'Dubai',
            cityAr: user.city || 'دبي',
            area: `${user.city || 'Dubai'} Central`,
            areaAr: `وسط ${user.city || 'دبي'}`,
            address: `${user.city || 'Dubai'}, Main Road`,
            addressAr: `${user.city || 'دبي'}، الشارع العام`,
            phone: user.phone || '+970 59 123 4567',
            whatsapp: user.phone || '+970 59 123 4567',
            manager: user.name,
            managerPhone: user.phone || '+970 59 123 4567',
            status: 'Open',
            openingHours: '8:00 AM – 8:00 PM • Sat – Thu',
            openingHoursAr: 'السبت - الخميس: 8:00 ص - 8:00 م',
            lat: 25.2048,
            lng: 55.2708,
            serviceBays: 3,
            activeTechnicians: 0,
            bookingsMonth: 0,
            revenueMonth: 0,
            utilization: 0,
            rating: 5.0,
            reviewCount: 0,
            isMainHub: true,
            supportedServices: ['Mechanic', 'Electrical', 'Diagnostics', 'Quick Service'],
            partsCount: 0,
          };
          setSelectedBranchId(defaultBranch.id);
          return [defaultBranch];
        }
        return prev;
      });
      setStockTransfers((prev) => (prev.some(t => t.id.startsWith('ST-2025-')) ? [] : prev));
      setBranchStaff((prev) => (prev.some(s => s.id.startsWith('STF-100')) ? [] : prev));
      setJobs((prev) => prev.filter((j) => j.providerId === user.id && !j.id.startsWith('job-demo-')));
      setInventory((prev) => prev.filter((i) => i.id.startsWith(`inv-${user.id}`)));
      setInspections((prev) => prev.filter((insp: any) => insp.providerId === user.id));
      setServiceRequests((prev) => prev.filter((r: any) => r.providerId === user.id));
    }
  }, [role, user]);

  const selectedBranch =
    selectedBranchId === 'all'
      ? null
      : branches.find((b) => b.id === selectedBranchId) || null;

  const addBranch = (branchData: Omit<WorkshopBranch, 'id'>): string => {
    const newId = `br-${Date.now()}`;
    const newBranch: WorkshopBranch = {
      ...branchData,
      id: newId,
    };
    setBranches((prev) => [newBranch, ...prev]);
    showToast(
      language === 'ar'
        ? `تم تدشين فرع ورشة جديد (${newBranch.nameAr}) بنجاح!`
        : `New workshop branch (${newBranch.name}) successfully registered!`,
      'success'
    );
    return newId;
  };

  const updateBranch = (id: string, branchData: Partial<WorkshopBranch>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...branchData } : b))
    );
    showToast(
      language === 'ar' ? 'تم تحديث بيانات الفرع بنجاح' : 'Branch updated successfully',
      'info'
    );
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
    if (selectedBranchId === id) {
      setSelectedBranchId('all');
    }
    showToast(
      language === 'ar' ? 'تم حذف الفرع من الشبكة' : 'Branch removed from network',
      'warning'
    );
  };

  const createStockTransfer = (
    data: Omit<StockTransferItem, 'id' | 'transferId' | 'date' | 'status'> & {
      status?: StockTransferItem['status'];
    }
  ): string => {
    const transferNum = `TR-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newTransfer: StockTransferItem = {
      ...data,
      id: `tr-${Date.now()}`,
      transferId: transferNum,
      date: new Date().toISOString().split('T')[0],
      status: data.status || 'In Transit',
    };
    setStockTransfers((prev) => [newTransfer, ...prev]);
    showToast(
      language === 'ar'
        ? `تم إنشاء أمر تحويل مخزون برقم #${transferNum} بنجاح!`
        : `Inter-branch stock transfer #${transferNum} created successfully!`,
      'success'
    );
    return newTransfer.id;
  };

  const updateStockTransferStatus = (
    id: string,
    status: StockTransferItem['status']
  ) => {
    setStockTransfers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    showToast(
      language === 'ar'
        ? `تم تحديث حالة نقل قطع الغيار إلى: ${status}`
        : `Stock transfer status updated to: ${status}`,
      'info'
    );
  };

  const assignStaffToBranch = (staffId: string, branchId: string) => {
    const targetBranch = branches.find((b) => b.id === branchId);
    if (!targetBranch) return;
    setBranchStaff((prev) =>
      prev.map((s) =>
        s.id === staffId
          ? {
              ...s,
              branchId: targetBranch.id,
              branchName: targetBranch.name,
              branchNameAr: targetBranch.nameAr,
            }
          : s
      )
    );
    showToast(
      language === 'ar'
        ? `تم تعيين الفني للفرع: ${targetBranch.nameAr}`
        : `Technician assigned to branch: ${targetBranch.name}`,
      'success'
    );
  };

  const [isProviderOnline, setIsProviderOnline] = useState<boolean>(true);

  // Modals
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [selectedProviderModal, setSelectedProviderModal] = useState<Provider | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Marketplace & Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>([]);

  // Booking Flow State
  const [selectedProviderForBooking, setSelectedProviderForBooking] = useState<Provider | null>(null);
  const [preselectedServiceForBooking, setPreselectedServiceForBooking] = useState<string | null>(null);
  const [placedBookings, setPlacedBookings] = useState<PlacedBooking[]>([]);

  const addToCart = (
    product: {
      id: string;
      nameEn: string;
      nameAr: string;
      partNum?: string;
      price: number;
      image?: string;
      sellerEn?: string;
      sellerAr?: string;
    },
    qty: number = 1
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          nameEn: product.nameEn,
          nameAr: product.nameAr,
          partNum: product.partNum || 'OEM-PART',
          price: product.price,
          image: product.image || '/images/categories/oil_filters_quick.jpg',
          quantity: qty,
          sellerEn: product.sellerEn || 'Verified Automotive Supplier',
          sellerAr: product.sellerAr || 'مورد قطع معتمد',
        },
      ];
    });
    showToast(
      language === 'ar'
        ? `تمت إضافة "${product.nameAr}" إلى سلة مشترياتك!`
        : `Added ${product.nameEn} to your cart!`,
      'success'
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast(language === 'ar' ? 'تم حذف العنصر من السلة' : 'Item removed from cart', 'info');
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Notifications System State
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadNotificationsCount = notifications.filter(
    (n) => !n.read && n.targetRoles.includes(role)
  ).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.targetRoles.includes(role) ? { ...n, read: true } : n))
    );
    showToast(
      language === 'ar' ? 'تم تعيين كافة الإشعارات كمقروءة' : 'All notifications marked as read',
      'info'
    );
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: language === 'ar' ? 'الآن' : 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const createMarketplaceOrder = (orderData: Omit<PlacedOrder, 'id' | 'date' | 'status'>): string => {
    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: PlacedOrder = {
      ...orderData,
      id: orderId,
      date: new Date().toISOString(),
      status: 'confirmed',
    };
    setPlacedOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // 1. Notify Customer
    addNotification({
      type: 'order',
      titleEn: `📦 Order Placed & Confirmed (${orderId})`,
      titleAr: `📦 تم تأكيد طلب الشراء بنجاح (${orderId})`,
      messageEn: `Your order for ${orderData.items.length} part(s) is being prepared for dispatch to ${orderData.city}.`,
      messageAr: `طلبك لعدد ${orderData.items.length} قطع غيار قيد التجهيز للتوصيل إلى ${orderData.city}.`,
      targetRoles: ['customer'],
      actionTab: 'customer',
      referenceId: orderId,
    });

    // 2. Notify Mechanics / Workshop
    addNotification({
      type: 'order',
      titleEn: `🛒 New Spare Parts Order (${orderId})`,
      titleAr: `🛒 طلب توريد قطع غيار جديد (${orderId})`,
      messageEn: `New order placed by ${orderData.recipientName} for ${orderData.items.length} part(s) to ${orderData.city}.`,
      messageAr: `طلب جديد وارد من ${orderData.recipientName} لتوريد ${orderData.items.length} قطع غيار لمدينة ${orderData.city}.`,
      targetRoles: ['provider'],
      actionTab: 'workshop',
      referenceId: orderId,
    });

    // 3. Notify Super Admin
    addNotification({
      type: 'system',
      titleEn: `💰 Marketplace Sale Logged (${orderId})`,
      titleAr: `💰 معاملة بيع جديدة في المتجر (${orderId})`,
      messageEn: `Order ${orderId} placed for ${orderData.total} ILS via ${orderData.paymentMethod}.`,
      messageAr: `تم إتمام عملية شراء برقم ${orderId} بقيمة ${orderData.total} شيكل بالدفع: ${orderData.paymentMethod}.`,
      targetRoles: ['admin'],
      actionTab: 'admin',
      referenceId: orderId,
    });

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {}
    return orderId;
  };

  const startBookingWithProvider = (provider: Provider, serviceId?: string) => {
    setSelectedProviderForBooking(provider);
    if (serviceId) setPreselectedServiceForBooking(serviceId);
    setIsBookingModalOpen(true);
  };

  const createBooking = (bookingData: Omit<PlacedBooking, 'id' | 'status'>): string => {
    const bookingId = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: PlacedBooking = {
      ...bookingData,
      id: bookingId,
      status: 'confirmed',
    };
    setPlacedBookings((prev) => [newBooking, ...prev]);
    const newJob: Job = {
      id: `job-${bookingId}`,
      referenceId: bookingId,
      requestId: `req-${bookingId}`,
      providerId: bookingData.providerId,
      providerName: bookingData.providerName,
      customerName: bookingData.customerName,
      customerPhone: bookingData.customerPhone,
      vehicleName: bookingData.vehicleDetails,
      vehiclePlate: '12345',
      serviceTitle: bookingData.serviceName,
      status: 'scheduled',
      scheduledDate: bookingData.date,
      scheduledTime: bookingData.timeSlot,
      technicianName: 'Certified Specialist',
      currentStep: 1,
      totalSteps: 4,
      steps: [
        { title: 'Booking Confirmed', completed: true, timestamp: 'Just now' },
        { title: 'Vehicle Drop-off & Intake Check', completed: false },
        { title: 'Service & OEM Parts Replacement', completed: false },
        { title: 'Final Quality Check & Ready', completed: false },
      ],
      beforePhotos: [],
      afterPhotos: [],
      notes: bookingData.notes,
      totalAmount: bookingData.price,
      createdAt: new Date().toISOString(),
    };
    setJobs((prev) => [newJob, ...prev]);

    // 1. Notify Customer
    addNotification({
      type: 'booking',
      titleEn: `🎉 Service Booking Confirmed (${bookingId})`,
      titleAr: `🎉 تم تأكيد حجز موعد الصيانة (${bookingId})`,
      messageEn: `Your appointment for ${bookingData.vehicleDetails} at ${bookingData.providerName} on ${bookingData.date} (${bookingData.timeSlot}) is confirmed.`,
      messageAr: `تم تأكيد حجز موعدك لمركبة ${bookingData.vehicleDetails} لدى ${bookingData.providerName} بتاريخ ${bookingData.date} (${bookingData.timeSlot}).`,
      targetRoles: ['customer'],
      actionTab: 'track-booking',
      referenceId: bookingId,
    });

    // 2. Notify Mechanics / Workshop
    addNotification({
      type: 'booking',
      titleEn: `🔧 New Inbound Work Order (${bookingId})`,
      titleAr: `🔧 حجز موعد صيانة جديد وارد (${bookingId})`,
      messageEn: `New booking received from ${bookingData.customerName} (${bookingData.vehicleDetails}) on ${bookingData.date} - ${bookingData.timeSlot}.`,
      messageAr: `حجز جديد وارد من العميل ${bookingData.customerName} (${bookingData.vehicleDetails}) بموعد ${bookingData.date} - ${bookingData.timeSlot}.`,
      targetRoles: ['provider'],
      actionTab: 'workshop',
      referenceId: bookingId,
    });

    // 3. Notify Super Admin
    addNotification({
      type: 'system',
      titleEn: `🛡️ New Platform Booking (${bookingId})`,
      titleAr: `🛡️ حجز خدمة جديد مسجل في المنصة (${bookingId})`,
      messageEn: `Client ${bookingData.customerName} booked ${bookingData.serviceName} at ${bookingData.providerName} (${bookingData.price} ILS).`,
      messageAr: `العميل ${bookingData.customerName} حجز ${bookingData.serviceName} لدى ${bookingData.providerName} بقيمة ${bookingData.price} شيكل.`,
      targetRoles: ['admin'],
      actionTab: 'admin',
      referenceId: bookingId,
    });

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {}
    return bookingId;
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[language];

  // Helper to format currency
  const formatPrice = (amountInILS: number): string => {
    const converted = Math.round(amountInILS * selectedCountry.exchangeRateToILS);
    return `${converted.toLocaleString()} ${selectedCountry.currencySymbol}`;
  };

  // Sync HTML Language while keeping layout firmly anchored to the left side (LTR)
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
    document.title =
      language === 'ar'
        ? 'أهل المركبات — مركبتك عند أهلها'
        : 'Ahl Al Markabat — All Vehicle Services. One Platform.';
  }, [language]);

  const showToast = (msg: string, _type?: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0] || null;

  const addVehicle = (vehicleData: Partial<Vehicle>) => {
    const newVeh: Vehicle = {
      id: `veh-${Date.now()}`,
      make: vehicleData.make || 'Toyota',
      model: vehicleData.model || 'Corolla',
      year: vehicleData.year || 2023,
      trim: vehicleData.trim || 'Standard',
      fuelType: vehicleData.fuelType || 'petrol',
      transmission: vehicleData.transmission || 'automatic',
      plateNumber: vehicleData.plateNumber || '7-9988-90',
      mileage: vehicleData.mileage || 15000,
      image:
        vehicleData.image ||
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      isPrimary: false,
      healthScore: 95,
      subsystemHealth: {
        engine: 'good',
        brakes: 'good',
        tires: 'good',
        battery: 'good',
        oilLevel: 'good',
        coolant: 'good',
        transmission: 'good',
        acSystem: 'good',
      },
      mulkiyaExpiry: '2027-08-01',
      insuranceExpiry: '2027-08-01',
      documents: [],
      serviceHistory: [],
      ...vehicleData,
    };
    setVehicles((prev) => [newVeh, ...prev]);
    setSelectedVehicleId(newVeh.id);
    showToast(language === 'ar' ? 'تمت إضافة المركبة إلى كراجك بنجاح!' : 'Vehicle added to garage!');
  };

  const updateVehicleMileage = (vehicleId: string, newMileage: number) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, mileage: newMileage } : v))
    );
    showToast(language === 'ar' ? 'تم تحديث قراءة عداد المسافات' : 'Odometer updated');
  };

  const createServiceRequest = (requestData: Partial<ServiceRequest>): string => {
    const newReqId = `req-${Date.now()}`;
    const refId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRequest: ServiceRequest = {
      id: newReqId,
      referenceId: refId,
      customerId: user.id,
      customerName: user.name,
      customerPhone: user.phone,
      vehicleId: selectedVehicle?.id || 'veh-1',
      vehicleSummary: `${selectedVehicle?.make} ${selectedVehicle?.model} (${selectedVehicle?.plateNumber})`,
      vehiclePlate: selectedVehicle?.plateNumber || '7-1234-95',
      serviceCategoryIds: requestData.serviceCategoryIds || ['cat-brakes'],
      description: requestData.description || 'طلب فحص وصيانة',
      symptoms: requestData.symptoms || [],
      photos: requestData.photos || [],
      serviceMethod: requestData.serviceMethod || 'workshop',
      urgency: requestData.urgency || 'normal',
      locationAddress: requestData.locationAddress || 'رام الله',
      city: requestData.city || 'رام الله',
      status: 'quotes_received',
      createdAt: new Date().toLocaleString(),
      quotes: [
        {
          id: `qte-${Date.now()}-1`,
          requestId: newReqId,
          providerId: 'prov-1',
          providerName: 'AutoTech Garage (مركز أوتو تك)',
          providerAvatar: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=150&auto=format&fit=crop&q=80',
          providerRating: 4.9,
          providerReviewCount: 128,
          providerDistanceKm: 1.2,
          responseTimeMin: 15,
          laborCost: 160,
          partsCost: 210,
          taxCost: 18,
          totalCost: 388,
          currency: '₪',
          estimatedHours: '3 - 5 ساعات',
          warranty: '12 شهر / 20,000 كم',
          isTopRated: true,
          status: 'pending',
          notes: 'قطع غيار أصلية معتمدة وفحص كمبيوتر شامل مجاني.',
        },
        {
          id: `qte-${Date.now()}-2`,
          requestId: newReqId,
          providerId: 'prov-2',
          providerName: 'Rapid Fix Center (مركز رابيد فيكس)',
          providerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          providerRating: 4.8,
          providerReviewCount: 96,
          providerDistanceKm: 1.6,
          responseTimeMin: 20,
          laborCost: 140,
          partsCost: 190,
          taxCost: 16,
          totalCost: 346,
          currency: '₪',
          estimatedHours: '2 - 4 ساعات',
          warranty: '6 شهور',
          isBestValue: true,
          status: 'pending',
          notes: 'أفضل سعر وسرعة إنجاز مع فحص الفرامل وضغط الإطارات.',
        },
      ],
      ...requestData,
    };

    setServiceRequests((prev) => [newRequest, ...prev]);
    setIsQuoteModalOpen(false);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    showToast(
      language === 'ar'
        ? `⚡ تم إرسال طلبك بنجاح واستلام عروض أسعار منافسة!`
        : `⚡ Request sent! Received competitive quotes.`
    );
    setActiveTab('quotes');
    return newReqId;
  };

  const acceptQuote = (requestId: string, quoteId: string) => {
    const targetReq = serviceRequests.find((r) => r.id === requestId);
    const targetQuote = targetReq?.quotes.find((q) => q.id === quoteId);

    if (targetReq && targetQuote) {
      setServiceRequests((prev) =>
        prev.map((r) =>
          r.id === requestId
            ? {
                ...r,
                status: 'quote_accepted',
                quotes: r.quotes.map((q) => (q.id === quoteId ? { ...q, status: 'accepted' } : { ...q, status: 'rejected' })),
              }
            : r
        )
      );

      const newJob: Job = {
        id: `job-${Date.now()}`,
        referenceId: `JOB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        requestId,
        quoteId,
        providerId: targetQuote.providerId,
        providerName: targetQuote.providerName,
        customerName: user.name,
        customerPhone: user.phone,
        vehicleName: targetReq.vehicleSummary,
        vehiclePlate: targetReq.vehiclePlate,
        serviceTitle: targetReq.description,
        status: 'scheduled',
        scheduledDate: '2026-08-26',
        scheduledTime: '09:30 AM',
        technicianName: 'م. يوسف الدويك',
        currentStep: 1,
        totalSteps: 5,
        steps: [
          { title: 'استلام المركبة والفحص المبدئي', completed: false },
          { title: 'فك وفحص الأجزاء المعطوبة', completed: false },
          { title: 'تركيب قطع الغيار الأصلية وإجراء الإصلاح', completed: false },
          { title: 'الفحص النهائي والبرمجة', completed: false },
          { title: 'تسليم المركبة للعميل', completed: false },
        ],
        beforePhotos: targetReq.photos,
        afterPhotos: [],
        totalAmount: targetQuote.totalCost,
        createdAt: new Date().toLocaleString(),
      };

      setJobs((prev) => [newJob, ...prev]);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // safe fallback
      }

      showToast(
        language === 'ar'
          ? `🎉 تم قبول العرض وتأكيد الحجز بنجاح مع ${targetQuote.providerName}!`
          : `🎉 Quote accepted! Booking confirmed with ${targetQuote.providerName}!`
      );
    }
  };

  const updateJobStatus = (jobId: string, status: Job['status']) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === jobId) {
          const nextStep =
            status === 'in_progress' ? 2 : status === 'ready' ? 4 : status === 'completed' ? 5 : j.currentStep;
          return { ...j, status, currentStep: nextStep };
        }
        return j;
      })
    );
    showToast(
      language === 'ar'
        ? `تم تحديث حالة أمر العمل إلى: ${status}`
        : `Work order status updated to: ${status}`
    );
  };

  const adjustInventoryStock = (itemId: string, qtyDelta: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, stockQuantity: Math.max(0, item.stockQuantity + qtyDelta) }
          : item
      )
    );
  };

  const createInspectionReport = (reportData: Partial<DigitalInspectionReport>) => {
    const newReport: DigitalInspectionReport = {
      id: `insp-${Date.now()}`,
      jobId: reportData.jobId || 'job-001',
      vehicleSummary: reportData.vehicleSummary || 'Toyota RAV4 Hybrid 2022',
      plateNumber: reportData.plateNumber || '7-1234-95',
      inspectorName: reportData.inspectorName || 'م. يوسف الدويك',
      date: new Date().toISOString().split('T')[0],
      mileage: reportData.mileage || 45230,
      overallScore: reportData.overallScore || 88,
      items: reportData.items || [],
      recommendationsAr: reportData.recommendationsAr || 'فحص شامل دوري',
      recommendationsEn: reportData.recommendationsEn || 'Comprehensive periodic inspection',
    };
    setInspections((prev) => [newReport, ...prev]);
    showToast(
      language === 'ar'
        ? 'تم إصدار وحفظ تقرير الفحص الفني الرقمي بنجاح!'
        : 'Digital vehicle inspection report generated!'
    );
  };

  const createEmergencySOS = (
    type: EmergencyType,
    locationAddress: string,
    options?: {
      lat?: number;
      lng?: number;
      customerName?: string;
      customerPhone?: string;
      vehicleName?: string;
      vehiclePlate?: string;
      price?: number;
      currency?: string;
      destinationAddress?: string;
    }
  ) => {
    const custName = options?.customerName || user?.name || (language === 'ar' ? 'أحمد الدجاني' : 'Ahmed Al-Mansoor');
    const custPhone = options?.customerPhone || user?.phone || '+970 59 123 4567';
    const vehName = options?.vehicleName || (selectedVehicle ? `${selectedVehicle.make} ${selectedVehicle.model}` : 'Toyota RAV4');
    const vehPlate = options?.vehiclePlate || selectedVehicle?.plateNumber || '7-8899-22';

    const newSOS: EmergencyRequest = {
      id: `sos-${Date.now()}`,
      customerName: custName,
      customerPhone: custPhone,
      vehicleName: vehName,
      vehiclePlate: vehPlate,
      emergencyType: type,
      locationAddress: locationAddress || (language === 'ar' ? 'الخليل - شارع عين سارة' : 'Hebron - Ein Sara St'),
      destinationAddress: options?.destinationAddress,
      lat: options?.lat || 31.5326,
      lng: options?.lng || 35.0998,
      price: options?.price || 150,
      currency: options?.currency || selectedCountry.currencySymbol,
      currentStep: 1,
      status: 'searching',
      etaMinutes: 12,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setActiveEmergency(newSOS);

    // Notify Customer & Super Admin
    addNotification({
      type: 'alert',
      titleEn: `🚨 Emergency SOS Dispatched (${newSOS.id})`,
      titleAr: `🚨 تم إرسال طلب طوارئ وإنقاذ (${newSOS.id})`,
      messageEn: `Emergency request for ${type} at ${newSOS.locationAddress} is broadcasting to nearby patrols.`,
      messageAr: `طلب طوارئ (${type}) في ${newSOS.locationAddress} قيد البث لدوريات الإنقاذ والسطحات.`,
      targetRoles: ['customer', 'admin', 'provider'],
      actionTab: 'track-booking',
      referenceId: newSOS.id,
    });

    showToast(
      language === 'ar'
        ? '🚨 جارٍ البحث عن أقرب ونش سطحة ودورية إنقاذ في منطقتك...'
        : '🚨 Searching for nearest recovery unit...',
      'info'
    );

    // Simulated Auto-Dispatch if no provider accepts manually within 3.5s
    setTimeout(() => {
      setActiveEmergency((prev) => {
        if (prev && prev.status === 'searching') {
          return {
            ...prev,
            status: 'en_route',
            currentStep: 3,
            acceptedProvider: {
              id: 'prov-5',
              name: language === 'ar' ? 'ونش الإنقاذ السريع 24/7 (أبو العبد)' : 'Rapid 24/7 Recovery Patrol (Abu Al-Abd)',
              phone: '+970 59 123 9999',
              vehiclePlate: 'ونش سطحة 3-8890-91',
              lat: (prev.lat || 31.5326) + 0.008,
              lng: (prev.lng || 35.0998) + 0.006,
            },
            etaMinutes: 8,
          };
        }
        return prev;
      });
      showToast(
        language === 'ar'
          ? '✓ تم تعيين ونش الإنقاذ (أبو العبد) وهو في طريقه إليك الآن! الوقت المتوقع 8 دقائق'
          : '✓ Recovery patrol assigned and en route! ETA: 8 mins',
        'success'
      );
    }, 3500);
  };

  const acceptEmergencySOS = (
    emergencyId: string,
    providerInfo?: {
      id?: string;
      name?: string;
      phone?: string;
      vehiclePlate?: string;
      lat?: number;
      lng?: number;
    }
  ) => {
    setActiveEmergency((prev) => {
      if (!prev || prev.id !== emergencyId) return prev;
      return {
        ...prev,
        status: 'en_route',
        currentStep: 3,
        acceptedProvider: {
          id: providerInfo?.id || 'prov-active',
          name: providerInfo?.name || providerProfile?.name || 'AutoTech Emergency Tow Patrol',
          phone: providerInfo?.phone || providerProfile?.phone || '+970 59 999 8888',
          vehiclePlate: providerInfo?.vehiclePlate || 'ونش سطحة 5-4421-99',
          lat: providerInfo?.lat || (prev.lat + 0.006),
          lng: providerInfo?.lng || (prev.lng + 0.005),
        },
        etaMinutes: 6,
      };
    });

    showToast(
      language === 'ar'
        ? '✓ تم قبول طلب الطوارئ بنجاح! تم إشعار العميل بأنك في الطريق إليه.'
        : '✓ Emergency dispatch accepted! Customer notified that you are en route.',
      'success'
    );
  };

  const updateEmergencyStatus = (emergencyId: string, status: EmergencyRequest['status'], step?: number) => {
    setActiveEmergency((prev) => {
      if (!prev || prev.id !== emergencyId) return prev;
      return {
        ...prev,
        status,
        currentStep: step || prev.currentStep,
      };
    });
  };

  const completeEmergencySOS = (emergencyId: string) => {
    if (activeEmergency) {
      // Record to Digital Inspections & Service History
      createInspectionReport({
        vehicleSummary: activeEmergency.vehicleName,
        plateNumber: activeEmergency.vehiclePlate || '7-8899-22',
        inspectorName: activeEmergency.acceptedProvider?.name || '24/7 Roadside Rescue Patrol',
        overallScore: 95,
        recommendationsAr: `تم إتمام خدمة المساعدة على الطريق بنجاح (${activeEmergency.emergencyType}).`,
        recommendationsEn: `Emergency roadside assistance completed (${activeEmergency.emergencyType}).`,
      });
    }

    setActiveEmergency((prev) => (prev && prev.id === emergencyId ? { ...prev, status: 'completed', currentStep: 5 } : prev));
    showToast(
      language === 'ar'
        ? '✓ تم إتمام مهمة الإنقاذ بنجاح وتوثيق التقرير في كراج العميل!'
        : '✓ Emergency service completed and saved to customer garage!',
      'success'
    );
  };

  const cancelEmergencySOS = (emergencyId: string) => {
    setActiveEmergency(null);
    showToast(language === 'ar' ? 'تم إلغاء طلب الطوارئ' : 'Emergency SOS cancelled', 'info');
  };

  const updateKYCStatus = (caseId: string, status: KYCVerificationCase['status'], notes?: string) => {
    setKycCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status, reviewerNotes: notes || c.reviewerNotes } : c))
    );
    showToast(
      language === 'ar'
        ? `تم تحديث حالة التحقق KYC إلى: ${status}`
        : `KYC verification status updated: ${status}`
    );
  };

  // Authentication Flow (SRS EPIC-01)
  const login = (selectedRole: Role, customProfile?: Partial<UserProfile>) => {
    setIsAuthenticated(true);
    setRole(selectedRole);

    let activeUserProfile: UserProfile;

    // Retrieve fresh registered users from localStorage or state
    let allRegisteredUsers = registeredCustomers;
    try {
      const saved = localStorage.getItem('aam_registered_users');
      if (saved) {
        allRegisteredUsers = JSON.parse(saved);
      }
    } catch {}

    const targetEmail = customProfile?.email?.toLowerCase().trim();
    const targetPhone = customProfile?.phone?.trim();
    const matchedRegistered = allRegisteredUsers.find(
      (u) =>
        (targetEmail && u.email && u.email.toLowerCase().trim() === targetEmail) ||
        (targetPhone && u.phone && u.phone.trim() === targetPhone)
    );

    if (customProfile) {
      const resolvedName =
        matchedRegistered?.name ||
        customProfile.name ||
        (selectedRole === 'provider' ? providerProfile.name : selectedRole === 'admin' ? adminProfile.name : customerProfile.name);

      const merged = {
        ...(selectedRole === 'provider'
          ? providerProfile
          : selectedRole === 'admin'
          ? adminProfile
          : customerProfile),
        ...(matchedRegistered || {}),
        ...customProfile,
        name: resolvedName,
        role: selectedRole,
      } as UserProfile;

      activeUserProfile = merged;
      if (selectedRole === 'customer') {
        setCustomerProfile(merged);
        setActiveTab('customer');
        setCustomerActiveTab('garage');
        if (merged.isDemoUser) {
          if (vehicles.length === 0) {
            setVehicles(INITIAL_VEHICLES);
            setSelectedVehicleId(INITIAL_VEHICLES[0].id);
          }
          if (serviceRequests.length === 0) setServiceRequests(INITIAL_REQUESTS);
        }
      } else if (selectedRole === 'provider') {
        setProviderProfile(merged);
        setActiveTab('workshop');
        if (merged.email !== 'provider@ahlalmarkabat.com' && !merged.isDemoUser) {
          setJobs([]);
          setPlacedBookings([]);
          setInventory([]);
          setInspections([]);
          setStockTransfers([]);
          setBranchStaff([]);
        } else {
          setJobs(INITIAL_JOBS);
          setInventory(INITIAL_INVENTORY);
          setInspections(INITIAL_INSPECTIONS);
          setBranches(INITIAL_BRANCHES);
        }
      } else if (selectedRole === 'admin') {
        setAdminProfile(merged);
        setActiveTab('admin');
      }
      setUser(merged);
    } else {
      if (selectedRole === 'provider') {
        activeUserProfile = providerProfile;
        setUser(providerProfile);
        setActiveTab('workshop');
        if (providerProfile?.email !== 'provider@ahlalmarkabat.com' && !providerProfile?.isDemoUser) {
          setJobs([]);
          setPlacedBookings([]);
          setInventory([]);
          setInspections([]);
          setStockTransfers([]);
          setBranchStaff([]);
        } else {
          setJobs(INITIAL_JOBS);
          setInventory(INITIAL_INVENTORY);
          setInspections(INITIAL_INSPECTIONS);
          setBranches(INITIAL_BRANCHES);
        }
      } else if (selectedRole === 'admin') {
        activeUserProfile = adminProfile;
        setUser(adminProfile);
        setActiveTab('admin');
      } else {
        activeUserProfile = matchedRegistered || customerProfile;
        setUser(activeUserProfile);
        setCustomerProfile(activeUserProfile);
        setActiveTab('customer');
        setCustomerActiveTab('garage');
        if (activeUserProfile.isDemoUser) {
          if (vehicles.length === 0) {
            setVehicles(INITIAL_VEHICLES);
            setSelectedVehicleId(INITIAL_VEHICLES[0].id);
          }
          if (serviceRequests.length === 0) setServiceRequests(INITIAL_REQUESTS);
        }
      }
    }

    // Persist session to LocalStorage
    try {
      localStorage.setItem(
        'aam_user_session',
        JSON.stringify({
          isAuthenticated: true,
          role: selectedRole,
          user: activeUserProfile,
        })
      );
    } catch {}

    setIsAuthModalOpen(false);
    showToast(
      language === 'ar'
        ? `مرحباً بك مجدداً يا ${activeUserProfile?.name}!`
        : `Welcome back, ${activeUserProfile?.name}!`,
      'success'
    );
  };

  const registerUser = (selectedRole: Role, userData: any) => {
    setIsAuthenticated(true);
    setRole(selectedRole);

    const enteredName = (userData.fullName || userData.workshopName || userData.name || '').trim();
    let createdProfile: UserProfile;

    if (selectedRole === 'customer') {
      const newUserId = `cust-${Date.now()}`;
      const newCustomer: UserProfile = {
        id: newUserId,
        name: enteredName || (language === 'ar' ? 'أحمد الدجاني' : 'Ahmed Al-Mansoor'),
        phone: userData.phone || '+970 59 000 0000',
        email: userData.email || 'customer@example.ps',
        role: 'customer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        city: userData.city || 'رام الله',
        isNewUser: true,
        isDemoUser: false,
      };
      createdProfile = newCustomer;
      setCustomerProfile(newCustomer);
      setUser(newCustomer);
      setRegisteredCustomers((prev) => {
        const filtered = prev.filter(
          (u) =>
            u.email?.toLowerCase().trim() !== newCustomer.email.toLowerCase().trim() &&
            u.phone?.trim() !== newCustomer.phone.trim()
        );
        const updated = [newCustomer, ...filtered];
        try {
          localStorage.setItem('aam_registered_users', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      try {
        localStorage.setItem(
          'aam_user_session',
          JSON.stringify({
            isAuthenticated: true,
            role: 'customer',
            user: newCustomer,
          })
        );
      } catch {}
      setActiveTab('customer');
      setCustomerActiveTab('garage');

      // A newly created account starts with 0 orders, 0 bookings, 0 quote requests, empty cart, and 0 prior transactions
      setPlacedBookings([]);
      setPlacedOrders([]);
      setServiceRequests([]);
      setCart([]);

      setNotifications((prev) => [
        ...prev.filter((n) => !n.targetRoles.includes('customer')),
        {
          id: `notif-welcome-${Date.now()}`,
          type: 'system',
          titleEn: 'Account Activated Successfully',
          titleAr: '🎉 تم تفعيل حسابك بنجاح',
          messageEn: `Welcome to Ahl Al Markabat, ${newCustomer.name}! Your customer portal is ready.`,
          messageAr: `أهلاً بك في منصة أهل المركبات يا ${newCustomer.name}! حسابك جاهز للاستخدام.`,
          timestamp: language === 'ar' ? 'الآن' : 'Just now',
          read: true,
          targetRoles: ['customer'],
          actionTab: 'customer',
        },
      ]);

      if (userData.vehicleMake && userData.vehicleModel) {
        addVehicle({
          make: userData.vehicleMake,
          model: userData.vehicleModel,
          year: Number(userData.vehicleYear) || 2023,
          plateNumber: userData.vehiclePlate || '7-9988-90',
          mileage: Number(userData.vehicleMileage) || 25000,
          fuelType: userData.vehicleFuel || 'petrol',
          transmission: 'automatic',
          isPrimary: true,
          image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
        });
      } else {
        setVehicles([]);
        setSelectedVehicleId('');
      }
    } else if (selectedRole === 'provider') {
      const newProvId = `prov-${Date.now()}`;
      const workshopTitle = (userData.workshopName || enteredName || 'AutoTech Premier Garage').trim();
      const newProviderUser: UserProfile = {
        id: newProvId,
        name: workshopTitle,
        phone: userData.phone || '+970 59 999 8888',
        email: userData.email || 'workshop@example.ps',
        role: 'provider',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        city: userData.city || 'رام الله',
        isNewUser: true,
      };
      createdProfile = newProviderUser;
      setProviderProfile(newProviderUser);
      setUser(newProviderUser);

      // Register new Provider entity
      const newProviderEntry: Provider = {
        id: newProvId,
        countryId: selectedCountryId,
        businessNameAr: userData.workshopName || workshopTitle,
        businessNameEn: userData.workshopName || workshopTitle,
        ownerName: enteredName || 'م. مالك الورشة',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?w=800&auto=format&fit=crop&q=80',
        rating: 5.0,
        reviewCount: 0,
        verified: false,
        verificationTier: 'basic',
        phone: userData.phone || '+970 59 999 8888',
        addressAr: userData.address || userData.city || 'المنطقة الصناعية',
        addressEn: userData.address || userData.city || 'Industrial Zone',
        cityAr: userData.city || 'رام الله',
        cityEn: userData.city || 'Ramallah',
        lat: 31.9038,
        lng: 35.2034,
        distanceKm: 0,
        specialties: [],
        supportedMakes: ['All Makes'],
        servicesOffered: [],
        workingHoursAr: 'السبت - الخميس: 8:00 ص - 6:00 م',
        workingHoursEn: 'Sat - Thu: 8:00 AM - 6:00 PM',
        responseTimeMin: 15,
        galleryImages: [],
        priceRange: { from: 0, to: 0 },
        certifiedTechnicians: 1,
        isAvailableNow: true,
        supportsMobileService: Boolean(userData.supportsMobile),
        supportsPickup: true,
      };
      setProviders((prev) => [newProviderEntry, ...prev]);

      // Trigger pending KYC case for Super Admin
      const newKYC: KYCVerificationCase = {
        id: `kyc-${Date.now()}`,
        providerId: newProvId,
        businessName: workshopTitle,
        ownerName: enteredName || 'م. مالك الورشة',
        city: userData.city || 'رام الله',
        phone: userData.phone || '+970 59 999 8888',
        submittedAt: new Date().toLocaleDateString(),
        status: 'pending',
        requestedTier: 'premium_verified',
        documents: [
          { id: `kdoc-${Date.now()}-1`, type: 'commercial_register', title: 'السجل التجاري الفلسطيني', fileUrl: '/docs/cr.pdf', verified: false },
          { id: `kdoc-${Date.now()}-2`, type: 'mechanic_license', title: 'شهادة مزاولة مهنة ميكانيك مركبات', fileUrl: '/docs/license.pdf', verified: false },
        ],
        reviewerNotes: 'طلب انضمام ورشة جديدة قيد التدقيق والمراجعة الإدارية.',
      };
      setKycCases((prev) => [newKYC, ...prev]);

      // Create default clean branch for this new provider
      const defaultBranch: WorkshopBranch = {
        id: `${newProvId}-b1`,
        name: `${workshopTitle} (Main Hub)`,
        nameAr: `${userData.workshopName || workshopTitle} (الفرع الرئيسي)`,
        code: 'AML-BR-01',
        city: userData.city || 'Ramallah',
        cityAr: userData.city || 'رام الله',
        area: `${userData.city || 'Ramallah'} Industrial`,
        areaAr: `صناعية ${userData.city || 'رام الله'}`,
        address: userData.address || userData.city || 'Main Road',
        addressAr: userData.address || userData.city || 'الشارع العام',
        phone: userData.phone || '+970 59 999 8888',
        whatsapp: userData.phone || '+970 59 999 8888',
        manager: enteredName || 'Owner / Lead Tech',
        managerPhone: userData.phone || '+970 59 999 8888',
        status: 'Open',
        openingHours: '8:00 AM – 8:00 PM • Sat – Thu',
        openingHoursAr: 'السبت - الخميس: 8:00 ص - 8:00 م',
        lat: 31.9038,
        lng: 35.2034,
        serviceBays: 3,
        activeTechnicians: 0,
        bookingsMonth: 0,
        revenueMonth: 0,
        utilization: 0,
        rating: 5.0,
        reviewCount: 0,
        isMainHub: true,
        supportedServices: ['Mechanic', 'Electrical', 'Diagnostics', 'Quick Service'],
        partsCount: 0,
      };
      setBranches([defaultBranch]);
      setSelectedBranchId(defaultBranch.id);
      setStockTransfers([]);
      setBranchStaff([]);

      // Reset jobs and bookings for this fresh provider
      setJobs([]);
      setPlacedBookings([]);
      setActiveTab('workshop');
    } else {
      const newAdmin: UserProfile = {
        id: `admin-${Date.now()}`,
        name: enteredName || 'Platform Super Admin',
        phone: userData.phone || '+970 59 000 1111',
        email: userData.email || 'admin@ahlalmarkabat.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        city: 'القدس',
      };
      createdProfile = newAdmin;
      setAdminProfile(newAdmin);
      setUser(newAdmin);
      setActiveTab('admin');
    }

    try {
      localStorage.setItem(
        'aam_user_session',
        JSON.stringify({
          isAuthenticated: true,
          role: selectedRole,
          user: createdProfile,
        })
      );
    } catch {}

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}

    setIsAuthModalOpen(false);
    showToast(
      language === 'ar'
        ? `🎉 تهانينا! تم إنشاء حسابك بنجاح. أهلاً بك يا ${enteredName || (language === 'ar' ? 'عزيزنا العميل' : 'User')}!`
        : `🎉 Account created successfully. Welcome, ${enteredName || 'User'}!`,
      'success'
    );
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole('customer');
    setActiveTab('home');
    try {
      localStorage.removeItem('aam_user_session');
    } catch {}
    showToast(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        role,
        setRole,
        deviceViewMode,
        setDeviceViewMode,

        countries: COUNTRIES_CONFIG,
        selectedCountry,
        setSelectedCountryId,
        formatPrice,

        user,
        customerProfile,
        providerProfile,
        adminProfile,
        updateUserProfile,
        vehicles,
        selectedVehicle,
        setSelectedVehicleId,
        addVehicle,
        updateVehicleMileage,

        providers,
        registeredCustomers,
        providerServices,
        addProviderService,
        updateProviderService,
        deleteProviderService,
        selectedCity,
        setSelectedCity: handleSetSelectedCity,
        searchQuery,
        setSearchQuery,
        selectedVehicleType,
        setSelectedVehicleType,
        selectedCategoryFilter,
        setSelectedCategoryFilter,

        serviceRequests,
        createServiceRequest,
        acceptQuote,

        jobs,
        updateJobStatus,
        isProviderOnline,
        setIsProviderOnline,

        // Multi-Branch Workshop Platform & Inter-Branch Stock Transfers
        branches,
        selectedBranchId,
        setSelectedBranchId,
        selectedBranch,
        addBranch,
        updateBranch,
        deleteBranch,
        stockTransfers,
        createStockTransfer,
        updateStockTransferStatus,
        branchStaff,
        assignStaffToBranch,

        inventory,
        adjustInventoryStock,

        inspections,
        createInspectionReport,

        activeEmergency,
        createEmergencySOS,
        acceptEmergencySOS,
        updateEmergencyStatus,
        completeEmergencySOS,
        cancelEmergencySOS,

        kycCases,
        updateKYCStatus,

        reviews,

        activeTab,
        setActiveTab,
        customerActiveTab,
        setCustomerActiveTab,
        adminActivePillar,
        setAdminActivePillar,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        isSOSModalOpen,
        setIsSOSModalOpen,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        selectedProviderModal,
        setSelectedProviderModal,
        isBookingModalOpen,
        setIsBookingModalOpen,
        isCartModalOpen,
        setIsCartModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        isAuthenticated,
        login,
        registerUser,
        logout,

        // Marketplace Cart & Orders
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placedOrders,
        createMarketplaceOrder,

        // Bookings
        selectedProviderForBooking,
        setSelectedProviderForBooking,
        preselectedServiceForBooking,
        setPreselectedServiceForBooking,
        startBookingWithProvider,
        placedBookings,
        createBooking,

        // Real-Time Notifications
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        isNotificationsOpen,
        setIsNotificationsOpen,

        isBackendConnected,
        checkBackendConnection,
        diagnoseWithAI,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
