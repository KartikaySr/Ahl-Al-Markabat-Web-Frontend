export type Role = 'customer' | 'provider' | 'admin';
export type Language = 'ar' | 'en';
export type DeviceViewMode = 'desktop' | 'mobile-customer' | 'mobile-provider';

export type VerificationTier =
  | 'basic'
  | 'identity_verified'
  | 'business_verified'
  | 'professional_verified'
  | 'premium_verified';

export interface CountryConfig {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  flag: string;
  currencyCode: string;
  currencySymbol: string;
  phonePrefix: string;
  exchangeRateToILS: number; // 1 ILS to target currency
  cities: { id: string; nameAr: string; nameEn: string; lat: number; lng: number }[];
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: Role;
  avatar: string;
  city: string;
  isDemoUser?: boolean;
  isNewUser?: boolean;
}

export interface VehicleDocument {
  id: string;
  type: 'mulkiya' | 'insurance' | 'inspection' | 'invoice';
  title: string;
  expiryDate?: string;
  issueDate?: string;
  fileSize: string;
}

export interface ServiceHistoryItem {
  id: string;
  date: string;
  serviceTitle: string;
  providerName: string;
  mileage: number;
  cost: number;
  status: 'completed' | 'in_progress' | 'cancelled';
  notes?: string;
  invoiceId?: string;
  inspectionReportId?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  makeAr?: string;
  model: string;
  modelAr?: string;
  year: number;
  trim?: string;
  trimAr?: string;
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'plug_in_hybrid' | 'lpg';
  transmission: 'automatic' | 'manual' | 'cvt' | 'dsg';
  plateNumber: string;
  vin?: string;
  mileage: number;
  image: string;
  isPrimary: boolean;
  healthScore: number;
  subsystemHealth: {
    engine: 'good' | 'warning' | 'critical';
    brakes: 'good' | 'warning' | 'critical';
    tires: 'good' | 'warning' | 'critical';
    battery: 'good' | 'warning' | 'critical';
    oilLevel: 'good' | 'warning' | 'critical';
    coolant: 'good' | 'warning' | 'critical';
    transmission: 'good' | 'warning' | 'critical';
    acSystem: 'good' | 'warning' | 'critical';
  };
  mulkiyaExpiry: string;
  insuranceExpiry: string;
  insurancePolicyNumber?: string;
  insuranceCompany?: string;
  documents: VehicleDocument[];
  serviceHistory: ServiceHistoryItem[];
}

export interface ServiceCategory {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
  subcategories: { id: string; nameAr: string; nameEn: string; priceFrom: number }[];
  basePrice: number;
  isPopular?: boolean;
  isEmergency?: boolean;
  isMobileAvailable?: boolean;
}

export interface Provider {
  id: string;
  countryId?: string;
  businessNameAr: string;
  businessNameEn: string;
  ownerName: string;
  avatar: string;
  image: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  verificationTier: VerificationTier;
  phone: string;
  addressAr: string;
  addressEn: string;
  cityAr: string;
  cityEn: string;
  lat: number;
  lng: number;
  distanceKm: number;
  specialties: string[];
  supportedMakes: string[];
  servicesOffered: string[];
  workingHoursAr: string;
  workingHoursEn: string;
  responseTimeMin: number;
  galleryImages: string[];
  priceRange: { from: number; to: number };
  certifiedTechnicians: number;
  isAvailableNow: boolean;
  supportsMobileService: boolean;
  supportsPickup: boolean;
}

export interface Quote {
  id: string;
  requestId: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerRating: number;
  providerReviewCount: number;
  providerDistanceKm: number;
  responseTimeMin: number;
  laborCost: number;
  partsCost: number;
  taxCost: number;
  totalCost: number;
  currency: string;
  estimatedHours: string;
  warranty: string;
  isTopRated?: boolean;
  isBestValue?: boolean;
  status: 'pending' | 'accepted' | 'rejected';
  notes?: string;
}

export interface ServiceRequest {
  id: string;
  referenceId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  vehicleId: string;
  vehicleSummary: string;
  vehiclePlate: string;
  serviceCategoryIds: string[];
  description: string;
  symptoms: string[];
  photos: string[];
  serviceMethod: 'workshop' | 'mobile' | 'pickup';
  urgency: 'normal' | 'urgent' | 'emergency';
  locationAddress: string;
  city: string;
  preferredDate?: string;
  preferredTime?: string;
  status: 'submitted' | 'matching' | 'quotes_received' | 'quote_accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  quotes: Quote[];
}

export interface Job {
  id: string;
  referenceId: string;
  requestId: string;
  quoteId?: string;
  providerId: string;
  providerName: string;
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  vehiclePlate: string;
  serviceTitle: string;
  status: 'new' | 'scheduled' | 'in_progress' | 'waiting_approval' | 'waiting_parts' | 'ready' | 'completed' | 'cancelled';
  scheduledDate: string;
  scheduledTime: string;
  technicianName: string;
  currentStep: number;
  totalSteps: number;
  steps: { title: string; completed: boolean; timestamp?: string }[];
  beforePhotos: string[];
  afterPhotos: string[];
  notes?: string;
  totalAmount: number;
  createdAt: string;
}

export type EmergencyType = 'towing' | 'jump_start' | 'flat_tire' | 'fuel_delivery' | 'lockout' | 'mobile_mechanic';

export interface EmergencyRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  vehiclePlate?: string;
  emergencyType: EmergencyType;
  locationAddress: string;
  destinationAddress?: string;
  lat: number;
  lng: number;
  price?: number;
  currency?: string;
  currentStep?: number;
  status: 'searching' | 'accepted' | 'en_route' | 'arrived' | 'in_service' | 'completed' | 'cancelled';
  acceptedProvider?: {
    id: string;
    name: string;
    phone: string;
    vehiclePlate: string;
    lat: number;
    lng: number;
  };
  etaMinutes: number;
  createdAt: string;
}

export interface KYCVerificationCase {
  id: string;
  providerId: string;
  businessName: string;
  ownerName: string;
  city: string;
  phone: string;
  submittedAt: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_info';
  requestedTier: VerificationTier;
  documents: {
    id: string;
    type: 'commercial_register' | 'id_card' | 'mechanic_license' | 'workshop_lease' | 'insurance_policy';
    title: string;
    fileUrl: string;
    verified: boolean;
  }[];
  reviewerNotes?: string;
}

export interface Review {
  id: string;
  providerId: string;
  customerName: string;
  city: string;
  rating: number;
  date: string;
  serviceName: string;
  comment: string;
  verifiedTransaction: boolean;
  ratingsBreakdown?: {
    quality: number;
    speed: number;
    pricing: number;
    communication: number;
  };
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  jobId: string;
  providerName: string;
  providerPhone: string;
  customerName: string;
  customerPhone: string;
  vehicleName: string;
  vehiclePlate: string;
  date: string;
  items: { description: string; qty: number; unitPrice: number; total: number }[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: 'cash' | 'credit_card' | 'bank_transfer' | 'wallet';
}

export interface NotificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  type: 'booking' | 'quote' | 'job' | 'emergency' | 'system';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export type InspectionCondition = 'good' | 'attention' | 'critical';

export interface InspectionItem {
  id: string;
  category: string;
  nameAr: string;
  nameEn: string;
  condition: InspectionCondition;
  notes?: string;
  photoUrl?: string;
}

export interface DigitalInspectionReport {
  id: string;
  jobId: string;
  vehicleSummary: string;
  plateNumber: string;
  inspectorName: string;
  date: string;
  mileage: number;
  overallScore: number;
  items: InspectionItem[];
  recommendationsAr: string;
  recommendationsEn: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  barcode?: string;
  nameAr: string;
  nameEn: string;
  category: string;
  compatibleMakes: string[];
  stockQuantity: number;
  minQuantityThreshold: number;
  purchasePrice: number;
  sellingPrice: number;
  supplier: string;
  locationShelf: string;
}

export interface SubscriptionPlan {
  id: 'free' | 'professional' | 'business' | 'enterprise';
  nameAr: string;
  nameEn: string;
  priceMonthly: number;
  featuresAr: string[];
  featuresEn: string[];
  popular?: boolean;
}

export interface ProviderCustomService {
  id: string;
  providerId: string;
  name: string;
  nameAr?: string;
  category: string;
  duration: string;
  price: number;
  laborPrice?: number;
  partsPrice?: number;
  mobile: boolean;
  workshop: boolean;
  warranty?: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

export interface WorkshopBranch {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  city: string;
  cityAr: string;
  area: string;
  areaAr: string;
  address: string;
  addressAr: string;
  phone: string;
  whatsapp: string;
  manager: string;
  managerPhone: string;
  status: 'Open' | 'Busy' | 'Closed';
  openingHours: string;
  openingHoursAr: string;
  lat: number;
  lng: number;
  serviceBays: number;
  activeTechnicians: number;
  bookingsMonth: number;
  revenueMonth: number;
  utilization: number;
  rating: number;
  reviewCount: number;
  isMainHub: boolean;
  supportedServices: string[];
  partsCount: number;
  image?: string;
}

export interface StockTransferItem {
  id: string;
  transferId: string;
  partSku: string;
  partName: string;
  partNameAr: string;
  fromBranch: string;
  fromBranchName: string;
  toBranch: string;
  toBranchName: string;
  quantity: number;
  status: 'Pending' | 'In Transit' | 'Received' | 'Rejected';
  requestedBy: string;
  date: string;
  priority: 'Normal' | 'Urgent' | 'Emergency';
  notes?: string;
}

export interface BranchStaffMember {
  id: string;
  name: string;
  nameAr: string;
  role: 'Branch Manager' | 'Lead Master Technician' | 'Diagnostic Specialist' | 'Service Advisor' | 'Parts Specialist';
  roleAr: string;
  branchId: string;
  branchName: string;
  branchNameAr: string;
  phone: string;
  status: 'On Shift' | 'On Break' | 'Off Duty';
  completedJobs: number;
  rating: number;
  avatar: string;
}

