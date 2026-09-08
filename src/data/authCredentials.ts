import { Role } from '../types';

export interface PredefinedCredential {
  role: Role;
  titleEn: string;
  titleAr: string;
  badgeEn: string;
  badgeAr: string;
  email: string;
  password: string;
  phone: string;
  displayNameEn: string;
  displayNameAr: string;
  targetTab: string;
  targetSubTab?: string;
  descriptionEn: string;
  descriptionAr: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
}

export const PREDEFINED_CREDENTIALS: Record<Role, PredefinedCredential> = {
  customer: {
    role: 'customer',
    titleEn: 'Customer Portal',
    titleAr: 'بوابة العميل',
    badgeEn: 'Vehicle Owner',
    badgeAr: 'مالك مركبة',
    email: 'customer@ahlalmarkabat.com',
    password: 'Customer@2026',
    phone: '+970 59 111 2233',
    displayNameEn: 'Ahmed Al-Mansoor',
    displayNameAr: 'عمر عبد الله',
    targetTab: 'customer',
    targetSubTab: 'garage',
    descriptionEn: 'Digital garage, vehicle documents, service history, quote comparisons, & live GPS tracking',
    descriptionAr: 'كراج رقمي، وثائق المركبة، سجل الصيانة، مقارنة عروض الأسعار، وتتبع الحجوزات',
    color: {
      bg: 'bg-blue-50/70 dark:bg-blue-950/30',
      border: 'border-blue-200 dark:border-blue-800/60',
      text: 'text-blue-700 dark:text-blue-300',
      badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
      badgeText: 'text-blue-900 dark:text-blue-100',
      accent: 'text-blue-600',
    },
  },
  provider: {
    role: 'provider',
    titleEn: 'Workshop SaaS System',
    titleAr: 'نظام الورش ومراكز الصيانة SaaS',
    badgeEn: 'Workshop Manager',
    badgeAr: 'مدير الورشة',
    email: 'provider@ahlalmarkabat.com',
    password: 'Provider@2026',
    phone: '+971 50 123 4567',
    displayNameEn: 'AutoTech Premier Garage',
    displayNameAr: 'مركز أوتو تك للصيانة (AutoTech)',
    targetTab: 'workshop',
    descriptionEn: 'Work order Kanban, 20 workshop modules, OBD-II DVI inspections, technician bays, & inventory',
    descriptionAr: 'أوامر العمل، 20 موديول سحابي، الفحص الفني الرقمي DVI، فنيي المسارات، والمخزون',
    color: {
      bg: 'bg-amber-50/70 dark:bg-amber-950/30',
      border: 'border-amber-200 dark:border-amber-800/60',
      text: 'text-amber-700 dark:text-amber-300',
      badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200',
      badgeText: 'text-amber-950 dark:text-amber-100',
      accent: 'text-amber-600',
    },
  },
  admin: {
    role: 'admin',
    titleEn: 'Super Admin Hub',
    titleAr: 'لوحة الإدارة العليا للمنصة',
    badgeEn: 'Platform Super Admin',
    badgeAr: 'مشرف المنصة العام',
    email: 'admin@ahlalmarkabat.com',
    password: 'Admin@2026',
    phone: '+970 59 000 1111',
    displayNameEn: 'Platform Super Admin',
    displayNameAr: 'الإدارة المركزية للمنظومة',
    targetTab: 'admin',
    descriptionEn: 'Platform KPIs, KYC workshop verifications, user management, commissions & financial ledgers',
    descriptionAr: 'مؤشرات المنصة، اعتماد تراخيص الورش KYC، إدارة المستخدمين، العمولات والتقارير المالية',
    color: {
      bg: 'bg-purple-50/70 dark:bg-purple-950/30',
      border: 'border-purple-200 dark:border-purple-800/60',
      text: 'text-purple-700 dark:text-purple-300',
      badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      badgeText: 'text-purple-900 dark:text-purple-100',
      accent: 'text-purple-600',
    },
  },
};

export const ALTERNATIVE_ACCEPTED_CREDENTIALS = [
  // Customer aliases
  { email: 'user@ahlalmarkabat.com', role: 'customer' as Role, pass: 'Customer@2026' },
  { email: 'omar@example.ps', role: 'customer' as Role, pass: 'Customer@2026' },
  { email: 'ahmed.almansoor@example.com', role: 'customer' as Role, pass: 'Customer@2026' },
  { phone: '591112233', role: 'customer' as Role, pass: 'Customer@2026' },
  { phone: '+970591112233', role: 'customer' as Role, pass: 'Customer@2026' },

  // Provider aliases
  { email: 'workshop@ahlalmarkabat.com', role: 'provider' as Role, pass: 'Provider@2026' },
  { email: 'autotech@garage.ae', role: 'provider' as Role, pass: 'Provider@2026' },
  { phone: '501234567', role: 'provider' as Role, pass: 'Provider@2026' },
  { phone: '+971501234567', role: 'provider' as Role, pass: 'Provider@2026' },

  // Admin aliases
  { email: 'superadmin@ahlalmarkabat.com', role: 'admin' as Role, pass: 'Admin@2026' },
  { email: 'root@ahlalmarkabat.com', role: 'admin' as Role, pass: 'Admin@2026' },
  { phone: '590001111', role: 'admin' as Role, pass: 'Admin@2026' },
  { phone: '+970590001111', role: 'admin' as Role, pass: 'Admin@2026' },
];
