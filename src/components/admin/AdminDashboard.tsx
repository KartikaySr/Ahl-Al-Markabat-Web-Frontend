import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../common/LeafletMap';
import { KYCVerificationCase } from '../../types';
import { SERVICE_CATEGORIES } from '../../data/mockData';
import {
  Shield,
  Users,
  Building,
  CheckCircle2,
  XCircle,
  FileText,
  Map as MapIcon,
  Layers,
  Star,
  Settings,
  Plus,
  AlertTriangle,
  LayoutGrid,
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Truck,
  Activity,
  Globe,
  Radio,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Sliders,
  ChevronDown,
  Sparkles,
  Lock,
  Download,
  Phone,
  Clock,
  AlertCircle,
  Megaphone,
  ArrowUpRight,
  Receipt,
  ExternalLink,
  Car,
  Wrench,
  Send,
  Printer,
  Wallet,
  FileSpreadsheet,
} from 'lucide-react';

export interface AdminTransaction {
  id: string;
  type: 'booking' | 'invoice' | 'quote' | 'order' | 'payout' | 'sos';
  categoryEn: string;
  categoryAr: string;
  customerName: string;
  customerPhone?: string;
  providerName: string;
  serviceOrItem: string;
  vehicle: string;
  plate: string;
  amount: number;
  vatAmount: number;
  platformFee: number;
  providerNet: number;
  paymentMethod: string;
  status: 'Completed' | 'Paid' | 'In Progress' | 'Pending' | 'Accepted' | 'Overdue' | 'Settled' | 'Dispatched';
  statusAr: string;
  date: string;
  referenceId?: string;
  notes?: string;
}

export const AdminDashboard: React.FC = () => {
  const {
    language,
    t,
    adminActivePillar,
    setAdminActivePillar,
    registeredCustomers,
    placedBookings,
    placedOrders,
    kycCases,
    updateKYCStatus,
    providers,
    reviews,
    formatPrice,
    selectedCountry,
    showToast,
    user,
    adminProfile,
  } = useApp();

  // Sub-tabs for each Super-Hub Pillar
  const [overviewSubTab, setOverviewSubTab] = useState<'kpis' | 'map' | 'bookings'>('kpis');
  const [providersSubTab, setProvidersSubTab] = useState<'kyc' | 'directory' | 'taxonomy'>('kyc');
  const [commerceSubTab, setCommerceSubTab] = useState<'customers' | 'marketplace' | 'orders'>('customers');
  const [financialsSubTab, setFinancialsSubTab] = useState<'transactions' | 'revenue' | 'payouts' | 'disputes' | 'countries'>('transactions');
  const [systemSubTab, setSystemSubTab] = useState<'audit-logs' | 'rbac'>('audit-logs');

  const [selectedCase, setSelectedCase] = useState<KYCVerificationCase | null>(kycCases[0] || null);
  const [adminNotes, setAdminNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Transaction Ledger state
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<string>('all');
  const [transactionStatusFilter, setTransactionStatusFilter] = useState<string>('all');
  const [transactionSearch, setTransactionSearch] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<AdminTransaction | null>(null);

  // Dynamic Payouts state
  const [payoutsList, setPayoutsList] = useState([
    {
      id: 'PO-9912',
      provider: 'Erlindo Garage (Al Nokhba)',
      providerAr: 'كراج إرلندو (النخبة)',
      iban: 'AE440330000000123456789',
      bank: 'First Abu Dhabi Bank (FAB)',
      amount: 12450.0,
      period: 'May 20 – May 26, 2025',
      status: 'Settled',
      settledAt: 'May 27, 2025 • 09:30 AM',
      jobsCount: 14,
    },
    {
      id: 'PO-9911',
      provider: 'AutoTech Premier Garage',
      providerAr: 'مركز أوتو تك بريميير',
      iban: 'AE880220000000987654321',
      bank: 'Emirates NBD',
      amount: 8900.0,
      period: 'May 20 – May 26, 2025',
      status: 'Settled',
      settledAt: 'May 27, 2025 • 10:15 AM',
      jobsCount: 9,
    },
    {
      id: 'PO-9910',
      provider: 'Rapid Fix Mobile Auto Care',
      providerAr: 'مركز رابيد فيكس للصيانة المتنقلة',
      iban: 'AE120440000000555666777',
      bank: 'Abu Dhabi Commercial Bank (ADCB)',
      amount: 5620.0,
      period: 'May 20 – May 26, 2025',
      status: 'Settled',
      settledAt: 'May 27, 2025 • 11:00 AM',
      jobsCount: 11,
    },
    {
      id: 'PO-9909',
      provider: 'PalAuto Diagnostic Center',
      providerAr: 'مركز بال أوتو للتشخيص',
      iban: 'PS98PALS000000112233445',
      bank: 'Bank of Palestine (BOP)',
      amount: 3840.0,
      period: 'May 20 – May 26, 2025',
      status: 'Pending',
      settledAt: 'Awaiting Admin Approval',
      jobsCount: 6,
    },
  ]);

  // Dynamic Disputes state
  const [disputesList, setDisputesList] = useState([
    {
      id: 'DSP-1042',
      bookingId: 'BK-2025-902',
      customer: 'Lina M.',
      customerAr: 'لينا محمود',
      provider: 'Rapid Fix Mobile Auto Care',
      providerAr: 'مركز رابيد فيكس المتنقل',
      reason: 'Mobile van delayed by 45 minutes beyond scheduled window.',
      reasonAr: 'تأخرت سيارة الخدمة المتنقلة 45 دقيقة عن الموعد المحدد.',
      amount: 450.0,
      status: 'Resolved',
      statusAr: 'تمت التسوية والتعويض',
      resolution: 'Issued AED 50 discount voucher to customer. Payout released to garage.',
      date: 'May 29, 2025',
    },
    {
      id: 'DSP-1043',
      bookingId: 'BK-2025-904',
      customer: 'Yousef K.',
      customerAr: 'يوسف كمال',
      provider: 'City Auto Clinic',
      providerAr: 'عيادة سيتي للسيارات',
      reason: 'Customer disputed AC refrigerant top-up surcharge without prior quote approval.',
      reasonAr: 'اعتراض العميل على رسوم إضافية لغاز الفريون دون موافقة مسبقة.',
      amount: 180.0,
      status: 'Open',
      statusAr: 'قيد التحكيم الإداري',
      resolution: 'Awaiting inspection report from workshop advisor.',
      date: 'May 30, 2025',
    },
  ]);

  const [auditLogsList, setAuditLogsList] = useState([
    {
      id: 'LOG-4895',
      admin: 'SuperAdmin (admin@ahlalmarkabat.com)',
      action: language === 'ar' ? 'اعتماد دفعة التحويل البنكي الأسبوعية لورشة إرلندو (#PO-9912)' : 'Weekly settlement payout approved for Erlindo Garage (#PO-9912)',
      timestamp: 'May 27, 2025 • 09:30 AM',
      ip: '192.168.1.1',
    },
    {
      id: 'LOG-4894',
      admin: 'Nour Mansour (KYC Lead)',
      action: language === 'ar' ? 'توثيق واعتماد السجل التجاري لمركز أوتو تك بريميير' : 'Commercial registration audited & verified for AutoTech Premier',
      timestamp: 'May 26, 2025 • 04:15 PM',
      ip: '192.168.1.18',
    },
    {
      id: 'LOG-4893',
      admin: 'Fadi Khader (Finance)',
      action: language === 'ar' ? 'تحديث نسبة ضريبة القيمة المضافة لفرع الإمارات (5% FTA)' : 'FTA Tax & VAT matrix synced for UAE market (5%)',
      timestamp: 'May 25, 2025 • 11:40 AM',
      ip: '192.168.1.45',
    },
    {
      id: 'LOG-4892',
      admin: 'SuperAdmin (admin@ahlalmarkabat.com)',
      action: language === 'ar' ? 'تهيئة النظام الإنتاجي النظيف وتفعيل قنوات الرسائل الفورية' : 'Clean production system initialized & SMS/WhatsApp gateways activated',
      timestamp: new Date().toLocaleString(),
      ip: '127.0.0.1',
    },
  ]);

  // Master Unified Transactions (Demo Customer + Demo Provider + Real-Time Bookings & Orders)
  const masterTransactions: AdminTransaction[] = [
    // Real-Time user placed bookings prepended dynamically
    ...placedBookings.map((b) => ({
      id: b.id,
      type: 'booking' as const,
      categoryEn: 'Service Booking',
      categoryAr: 'حجز صيانة',
      customerName: b.customerName || 'Customer',
      customerPhone: b.customerPhone || '050 123 4567',
      providerName: b.providerName || 'AHL Garage Partner',
      serviceOrItem: b.serviceName || 'Automotive Service',
      vehicle: b.vehicleDetails || 'Registered Vehicle',
      plate: 'REG-PLATE',
      amount: b.price || 350,
      vatAmount: Math.round((b.price || 350) * 0.05),
      platformFee: Math.round((b.price || 350) * 0.1),
      providerNet: Math.round((b.price || 350) * 0.9),
      paymentMethod: 'Online Payment Gateway',
      status: (b.status === 'completed' ? 'Completed' : 'In Progress') as any,
      statusAr: b.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ',
      date: b.date || 'Today',
      referenceId: b.id,
      notes: 'Live booking placed via mobile/web platform',
    })),
    // Real-Time placed orders prepended dynamically
    ...placedOrders.map((o) => ({
      id: o.id,
      type: 'order' as const,
      categoryEn: 'Spare Parts Order',
      categoryAr: 'طلب قطع غيار',
      customerName: 'Marketplace Customer',
      customerPhone: '050 123 4567',
      providerName: 'Verified OEM Auto Parts Hub',
      serviceOrItem: `${o.items?.length || 1} Parts / SKUs`,
      vehicle: 'Direct Delivery',
      plate: 'E-COMMERCE',
      amount: o.total || 450,
      vatAmount: Math.round((o.total || 450) * 0.05),
      platformFee: Math.round((o.total || 450) * 0.08),
      providerNet: Math.round((o.total || 450) * 0.92),
      paymentMethod: o.paymentMethod || 'Card on Delivery',
      status: 'Paid' as any,
      statusAr: 'مدفوع ومؤكد',
      date: o.date || 'Today',
      referenceId: o.id,
      notes: 'Marketplace direct order',
    })),
    // Baseline Demo Customer Transactions
    {
      id: 'BK-2025-901',
      type: 'booking',
      categoryEn: 'Service Booking',
      categoryAr: 'حجز صيانة دورية',
      customerName: 'Ahmed Al Nuaimi (Demo Customer)',
      customerPhone: '050 123 4567',
      providerName: 'AutoTech Premier Garage',
      serviceOrItem: 'AC Refrigerant Recharge & 60-Point DVI Inspection',
      vehicle: 'Toyota RAV4 (2022)',
      plate: '4-5566-A • Dubai',
      amount: 380.0,
      vatAmount: 19.0,
      platformFee: 38.0,
      providerNet: 342.0,
      paymentMethod: 'Apple Pay (Online Gateway)',
      status: 'In Progress',
      statusAr: 'قيد التنفيذ في الورشة',
      date: 'May 31, 2025 • 10:15 AM',
      referenceId: 'DVI-9921',
      notes: 'Live GPS vehicle tracked. Technician Mohammed Ali assigned.',
    },
    {
      id: 'BK-2025-902',
      type: 'booking',
      categoryEn: 'Service Booking',
      categoryAr: 'خدمة صيانة متنقلة',
      customerName: 'Ahmed Al Nuaimi (Demo Customer)',
      customerPhone: '050 123 4567',
      providerName: 'Rapid Fix Mobile Auto Care',
      serviceOrItem: 'High-Performance Battery Replacement & Diagnostics',
      vehicle: 'Toyota RAV4 (2022)',
      plate: '4-5566-A • Dubai',
      amount: 450.0,
      vatAmount: 22.5,
      platformFee: 45.0,
      providerNet: 405.0,
      paymentMethod: 'Visa •••• 4242',
      status: 'Completed',
      statusAr: 'مكتمل ومسدد بالكامل',
      date: 'May 28, 2025 • 02:45 PM',
      referenceId: 'DVI-9804',
      notes: 'Bosch S5 AGM 70Ah battery installed with 12-month warranty.',
    },
    // Baseline Demo Provider Transactions (Erlindo Garage / Al Nokhba)
    {
      id: 'INV-2025-1248',
      type: 'invoice',
      categoryEn: 'Tax Invoice',
      categoryAr: 'فاتورة ضريبية معتمدة',
      customerName: 'Omar A.',
      customerPhone: '+970 59 123 4567',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: 'AC Compressor Flush & R134a Recharge',
      vehicle: 'Toyota Camry 2021',
      plate: '6-1234-PA',
      amount: 352.0,
      vatAmount: 32.0,
      platformFee: 35.2,
      providerNet: 316.8,
      paymentMethod: 'Stripe Gateway (Mada / Visa)',
      status: 'Paid',
      statusAr: 'مسددة إلكترونياً',
      date: 'May 31, 2025',
      referenceId: 'FTA-INV-1248',
      notes: 'Automated 5% VAT tax receipt sent via WhatsApp.',
    },
    {
      id: 'INV-2025-1247',
      type: 'invoice',
      categoryEn: 'Tax Invoice',
      categoryAr: 'فاتورة ضريبية معتمدة',
      customerName: 'Ahmed R.',
      customerPhone: '+970 59 765 4321',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: 'Major 40,000 KM Maintenance & Filter Refresh',
      vehicle: 'Hyundai Tucson 2021',
      plate: '7-4321-B',
      amount: 462.0,
      vatAmount: 42.0,
      platformFee: 46.2,
      providerNet: 415.8,
      paymentMethod: 'Apple Pay Direct',
      status: 'Paid',
      statusAr: 'مسددة إلكترونياً',
      date: 'May 30, 2025',
      referenceId: 'FTA-INV-1247',
      notes: 'Full synthetic oil 5W-30 + OEM spark plugs installed.',
    },
    {
      id: 'INV-2025-1246',
      type: 'invoice',
      categoryEn: 'Tax Invoice',
      categoryAr: 'فاتورة ضريبية معتمدة',
      customerName: 'Sara M.',
      customerPhone: '+970 59 999 8888',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: 'Front & Rear Ceramic Brake Pads + Laser Rotor Balancing',
      vehicle: 'Nissan Patrol 2019',
      plate: '3-9876-C',
      amount: 363.0,
      vatAmount: 33.0,
      platformFee: 36.3,
      providerNet: 326.7,
      paymentMethod: 'Pending Payment Gateway Link',
      status: 'Pending',
      statusAr: 'بانتظار السداد من العميل',
      date: 'May 30, 2025',
      referenceId: 'FTA-INV-1246',
      notes: 'Payment reminder dispatched via SMS.',
    },
    {
      id: 'INV-2025-1245',
      type: 'invoice',
      categoryEn: 'Tax Invoice',
      categoryAr: 'فاتورة ضريبية معتمدة',
      customerName: 'Yousef K.',
      customerPhone: '+970 59 222 3333',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: 'Full Synthetic Engine Oil Change (10,000 KM)',
      vehicle: 'Kia Sportage 2022',
      plate: '5-5555-D',
      amount: 220.0,
      vatAmount: 20.0,
      platformFee: 22.0,
      providerNet: 198.0,
      paymentMethod: 'Credit Card (Visa)',
      status: 'Paid',
      statusAr: 'مسددة إلكترونياً',
      date: 'May 29, 2025',
      referenceId: 'FTA-INV-1245',
      notes: 'Routine service successfully completed.',
    },
    {
      id: 'INV-2025-1244',
      type: 'invoice',
      categoryEn: 'Tax Invoice',
      categoryAr: 'فاتورة ضريبية معتمدة',
      customerName: 'Lina M.',
      customerPhone: '+970 59 444 1111',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: 'Automatic Transmission Flush & Electronic Calibration',
      vehicle: 'Mitsubishi Pajero 2020',
      plate: '8-1122-E',
      amount: 995.0,
      vatAmount: 95.0,
      platformFee: 99.5,
      providerNet: 895.5,
      paymentMethod: 'Bank Wire / Cash on Delivery',
      status: 'Pending',
      statusAr: 'بانتظار استلام المركبة',
      date: 'May 29, 2025',
      referenceId: 'FTA-INV-1244',
      notes: 'Final road test in progress.',
    },
    {
      id: 'INV-2025-1242',
      type: 'invoice',
      categoryEn: 'Tax Invoice',
      categoryAr: 'فاتورة ضريبية معتمدة',
      customerName: 'Khalid S.',
      customerPhone: '+970 59 333 4444',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: 'AC Condenser Replacement & Leak Test',
      vehicle: 'Mercedes C200 2021',
      plate: '4-3344-G',
      amount: 497.0,
      vatAmount: 47.0,
      platformFee: 49.7,
      providerNet: 447.3,
      paymentMethod: 'Overdue Link (Follow-up)',
      status: 'Overdue',
      statusAr: 'متأخرة السداد (تم التنبيه)',
      date: 'May 28, 2025',
      referenceId: 'FTA-INV-1242',
      notes: 'Second SMS payment notice sent.',
    },
    // Quotations
    {
      id: 'QT-2025-0436',
      type: 'quote',
      categoryEn: 'Official Quotation',
      categoryAr: 'عرض سعر معتمد',
      customerName: 'Ahmed Al Mansoori',
      customerPhone: '050 123 4567',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: '60,000 KM Major Service + Spark Plugs + Brake Fluid',
      vehicle: 'Toyota Land Cruiser (2021)',
      plate: '2021 • GCC',
      amount: 2090.0,
      vatAmount: 104.5,
      platformFee: 209.0,
      providerNet: 1881.0,
      paymentMethod: 'Online Approval',
      status: 'Pending',
      statusAr: 'مرسل للعميل (صالح لـ 10 أيام)',
      date: 'May 21, 2025',
      referenceId: 'QT-0436',
      notes: 'Includes AED 650 labor + AED 1,250 genuine Toyota parts.',
    },
    {
      id: 'QT-2025-0435',
      type: 'quote',
      categoryEn: 'Official Quotation',
      categoryAr: 'عرض سعر معتمد',
      customerName: 'Fatima Al Zaabi',
      customerPhone: '050 987 6543',
      providerName: 'Erlindo Garage (Demo Provider)',
      serviceOrItem: 'Front & Rear Brake Pad Set & Rotor Precision Laser Skimming',
      vehicle: 'Nissan Patrol (2019)',
      plate: '2019 • GCC',
      amount: 1069.5,
      vatAmount: 53.4,
      platformFee: 106.9,
      providerNet: 962.6,
      paymentMethod: 'Customer Pre-Approved',
      status: 'Accepted',
      statusAr: 'مقبول من العميل • جاهز للعمل',
      date: 'May 21, 2025',
      referenceId: 'QT-0435',
      notes: 'Accepted via WhatsApp instant quote link.',
    },
    // Spare Parts Orders
    {
      id: 'ORD-8841',
      type: 'order',
      categoryEn: 'Spare Parts Order',
      categoryAr: 'طلب قطع غيار أصيلة',
      customerName: 'Ahmed Al Nuaimi (Demo Customer)',
      customerPhone: '050 123 4567',
      providerName: 'Verified OEM Auto Parts Hub',
      serviceOrItem: 'Bosch S5 AGM 70Ah Battery + Oil Filter (Fram Extra Guard)',
      vehicle: 'Toyota RAV4 (2022)',
      plate: '4-5566-A',
      amount: 480.0,
      vatAmount: 24.0,
      platformFee: 38.4,
      providerNet: 441.6,
      paymentMethod: 'Apple Pay',
      status: 'Paid',
      statusAr: 'مسدد وتم التسليم',
      date: 'May 25, 2025',
      referenceId: 'MKT-ORD-8841',
      notes: 'Express 90-minute delivery to workshop bay.',
    },
    {
      id: 'ORD-8843',
      type: 'order',
      categoryEn: 'B2B Wholesale PO',
      categoryAr: 'أمر شراء جملة B2B',
      customerName: 'Erlindo Garage (Demo Provider)',
      customerPhone: '+970 59 123 4567',
      providerName: 'TotalEnergies Distribution Middle East',
      serviceOrItem: 'Bulk Motul 5W-30 Full Synthetic Oil (10x 20L Drums)',
      vehicle: 'Workshop Bulk Inventory',
      plate: 'STOCK-B2B',
      amount: 4500.0,
      vatAmount: 225.0,
      platformFee: 360.0,
      providerNet: 4140.0,
      paymentMethod: 'B2B Purchase Order (Credit Line)',
      status: 'Settled',
      statusAr: 'مستلم ومضاف للمخزون',
      date: 'May 26, 2025',
      referenceId: 'PO-8921',
      notes: 'Replenished Bay 1 & Bay 2 lubricant inventory.',
    },
    // Emergency SOS Dispatch
    {
      id: 'SOS-2025-014',
      type: 'sos',
      categoryEn: 'Emergency SOS Roadside',
      categoryAr: 'إنقاذ طارئ وسحب سطحة',
      customerName: 'Yousef K.',
      customerPhone: '+970 59 222 3333',
      providerName: 'PalAuto Quick Rescue & Flatbed Fleet',
      serviceOrItem: 'Emergency Roadside Recovery & Battery Jumpstart',
      vehicle: 'Kia Sportage 2022',
      plate: '5-5555-D',
      amount: 220.0,
      vatAmount: 11.0,
      platformFee: 22.0,
      providerNet: 198.0,
      paymentMethod: 'AHL Wallet Pay',
      status: 'Dispatched',
      statusAr: 'تم الإنقاذ والإيداع',
      date: 'May 30, 2025 • 03:15 AM',
      referenceId: 'SOS-DISPATCH-14',
      notes: 'Flatbed dispatched within 12 minutes on Sheikh Zayed Rd.',
    },
  ];

  // KYC Approval Handlers
  const handleApproveCase = (caseId: string, tier = 'Premium Verified') => {
    updateKYCStatus(
      caseId,
      'approved',
      adminNotes ||
        (language === 'ar'
          ? `تم التحقق من الوثائق وتدقيق السجل التجاري بنجاح. المستوى: ${tier}`
          : `KYC verified & commercial registration audited. Tier: ${tier}`)
    );
    showToast(
      language === 'ar'
        ? `تم اعتماد الورشة بنجاح بمستوى ${tier}!`
        : `Provider approved as ${tier}!`,
      'success'
    );
    setAuditLogsList((prev) => [
      {
        id: `LOG-${Math.floor(4000 + Math.random() * 1000)}`,
        admin: `${adminProfile?.name || 'SuperAdmin'} (admin@ahlalmarkabat.com)`,
        action: `Approved KYC verification for case ${caseId} (${tier})`,
        timestamp: new Date().toLocaleString(),
        ip: '127.0.0.1',
      },
      ...prev,
    ]);
  };

  const handleRejectCase = (caseId: string) => {
    updateKYCStatus(
      caseId,
      'rejected',
      adminNotes ||
        (language === 'ar'
          ? 'المستندات غير مكتملة أو غير مطابقة للشروط.'
          : 'Documents incomplete or non-compliant.')
    );
    showToast(language === 'ar' ? `تم رفض طلب الانضمام.` : `Provider rejected.`, 'error');
  };

  // Payout Approval Handler
  const handleApprovePayout = (payoutId: string) => {
    setPayoutsList((prev) =>
      prev.map((p) =>
        p.id === payoutId
          ? {
              ...p,
              status: 'Settled',
              settledAt: `Settled Just Now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
            }
          : p
      )
    );
    showToast(
      language === 'ar'
        ? `تم اعتماد وصرف الدفعة ${payoutId} عبر التحويل البنكي المباشر IBAN بنجاح!`
        : `Payout ${payoutId} approved & transferred via IBAN wire!`,
      'success'
    );
    setAuditLogsList((prev) => [
      {
        id: `LOG-${Math.floor(4000 + Math.random() * 1000)}`,
        admin: `${adminProfile?.name || 'SuperAdmin'} (Finance Operations)`,
        action: `Approved IBAN payout release for ${payoutId}`,
        timestamp: new Date().toLocaleString(),
        ip: '127.0.0.1',
      },
      ...prev,
    ]);
  };

  // Dispute Settle Handler
  const handleSettleDispute = (disputeId: string) => {
    setDisputesList((prev) =>
      prev.map((d) =>
        d.id === disputeId
          ? {
              ...d,
              status: 'Resolved',
              statusAr: 'تمت التسوية والتحكيم',
              resolution: 'Mutual compromise agreed. 15% platform credit granted to customer.',
            }
          : d
      )
    );
    showToast(
      language === 'ar'
        ? `تمت تسوية النزاع ${disputeId} بنجاح وإغلاق الملف.`
        : `Dispute ${disputeId} audited, resolved and closed.`,
      'success'
    );
  };

  // CSV Export Handler
  const handleExportTransactionsCSV = () => {
    const headers = ['Transaction ID', 'Type', 'Customer', 'Provider', 'Service/Item', 'Amount', 'VAT (5%)', 'Platform Fee (10%)', 'Net Provider', 'Method', 'Status', 'Date'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      t.categoryEn,
      `"${t.customerName}"`,
      `"${t.providerName}"`,
      `"${t.serviceOrItem}"`,
      t.amount,
      t.vatAmount,
      t.platformFee,
      t.providerNet,
      `"${t.paymentMethod}"`,
      t.status,
      `"${t.date}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHL_Master_Transaction_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(language === 'ar' ? 'تم تصدير سجل العمليات المالي بنجاح (CSV)!' : 'Master financial ledger exported successfully (CSV)!', 'success');
  };

  // Filtered Transactions
  const filteredTransactions = masterTransactions.filter((tx) => {
    if (transactionTypeFilter !== 'all' && tx.type !== transactionTypeFilter) return false;
    if (transactionStatusFilter !== 'all' && tx.status !== transactionStatusFilter) return false;
    if (transactionSearch.trim()) {
      const q = transactionSearch.toLowerCase();
      const matchId = tx.id.toLowerCase().includes(q);
      const matchCust = tx.customerName.toLowerCase().includes(q);
      const matchProv = tx.providerName.toLowerCase().includes(q);
      const matchItem = tx.serviceOrItem.toLowerCase().includes(q);
      const matchPlate = tx.plate.toLowerCase().includes(q);
      if (!matchId && !matchCust && !matchProv && !matchItem && !matchPlate) return false;
    }
    return true;
  });

  // Dynamic Overall Aggregate Metrics
  const totalVerifiedProviders = providers.filter((p) => p.verified).length;
  const totalPendingKYC = kycCases.filter((c) => c.status === 'pending').length;
  const totalPlatformBookings = masterTransactions.filter((t) => t.type === 'booking').length;
  const totalPlatformGMV = masterTransactions.reduce((acc, t) => acc + t.amount, 0);
  const totalNetCommission = masterTransactions.reduce((acc, t) => acc + t.platformFee, 0);
  const totalPaidInvoicesCount = masterTransactions.filter((t) => t.type === 'invoice' && t.status === 'Paid').length;

  const countriesConfig = [
    { code: 'PS', name: language === 'ar' ? 'فلسطين' : 'Palestine', currency: 'ILS (₪)', vat: '16%', activeProviders: providers.filter((p) => p.countryId === 'ps').length, status: language === 'ar' ? 'السوق الرئيسي النشط' : 'Primary Launch Market', emergencyNumber: '101 / +970 59 123 4567' },
    { code: 'JO', name: language === 'ar' ? 'الأردن' : 'Jordan', currency: 'JOD', vat: '16%', activeProviders: providers.filter((p) => p.countryId === 'jo').length, status: language === 'ar' ? 'جاهزية التوسع' : 'Expansion Readiness', emergencyNumber: '911 / +962 79 123 4567' },
    { code: 'SA', name: language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia', currency: 'SAR', vat: '15%', activeProviders: providers.filter((p) => p.countryId === 'sa').length, status: language === 'ar' ? 'جاهزية التوسع' : 'Expansion Readiness', emergencyNumber: '993 / +966 50 123 4567' },
    { code: 'AE', name: language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates', currency: 'AED', vat: '5%', activeProviders: providers.filter((p) => p.countryId === 'ae').length, status: language === 'ar' ? 'توسع نشط' : 'Expansion Active', emergencyNumber: '999 / +971 50 123 4567' },
  ];

  // Customers CRM list combining Demo Customer + Registered Customers
  const customers = [
    {
      id: 'CUST-DEMO-001',
      name: 'Ahmed Al Nuaimi (Demo Customer)',
      phone: '050 123 4567',
      email: 'customer@ahlalmarkabat.com',
      cars: 2,
      spent: formatPrice(1310),
      status: language === 'ar' ? 'عميل VIP متميز' : 'VIP Fleet Account',
      date: 'Active Member',
      vehicles: 'Toyota RAV4 2022 (4-5566-A) • Hyundai Tucson (7-4321-B)',
    },
    {
      id: 'CUST-1002',
      name: 'Fatima Al Zaabi',
      phone: '050 987 6543',
      email: 'fatima.zaabi@gmail.com',
      cars: 1,
      spent: formatPrice(1069.5),
      status: language === 'ar' ? 'نشط' : 'Active',
      date: 'May 2025',
      vehicles: 'Nissan Patrol 2019 (2019 • GCC)',
    },
    {
      id: 'CUST-1003',
      name: 'Omar Al Fayed',
      phone: '+970 59 123 4567',
      email: 'omar.fayed@outlook.com',
      cars: 1,
      spent: formatPrice(352),
      status: language === 'ar' ? 'نشط' : 'Active',
      date: 'May 2025',
      vehicles: 'Toyota Camry 2021 (6-1234-PA)',
    },
    ...registeredCustomers.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      cars: 1,
      spent: formatPrice(0),
      status: language === 'ar' ? 'مسجل جديد' : 'New Registered',
      date: 'Registered Recently',
      vehicles: 'Registered Vehicle',
    })),
  ];

  return (
    <div className="py-8 bg-slate-100 text-slate-900 min-h-screen font-sans">
      <div className="max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 1. Header Identity Banner */}
        <div className="bg-[#0B1528] text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {language === 'ar' ? 'أهل المركبات — منصة الإدارة والرقابة المالية المركزية' : 'AHL AL MARKABAT — Super Admin Control Suite'}
                </h1>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-sm">
                  {language === 'ar' ? 'نظام الحوكمة الموحد v1.0' : 'Enterprise Suite v1.0'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'ar'
                  ? 'الحوكمة المركزية للمنظومة، مراقبة كافة عمليات وتداولات العملاء والورش، تدقيق فواتير الضرائب، وإدارة تسويات التحويل البنكي IBAN.'
                  : 'Centralized platform governance, unified customer & workshop transaction tracking, tax invoice auditing, and automated IBAN settlement payouts.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'ar' ? 'محرك العمليات المالي: نشط' : 'Unified Financial Engine: Online'}</span>
            </span>

            <div className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-amber-400 font-bold flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{adminProfile?.name || user?.name || (language === 'ar' ? 'الإدارة المركزية' : 'Platform Super Admin')}</span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PILLAR 1: PLATFORM OPS & OVERVIEW                            */}
        {/* ============================================================ */}
        {(adminActivePillar === 'overview' || !adminActivePillar) && (
          <div className="space-y-6">
            {/* Sub-Tabs Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setOverviewSubTab('kpis')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  overviewSubTab === 'kpis'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>{language === 'ar' ? 'نظرة عامة والمؤشرات الرئيسية' : 'Overview & Global KPIs'}</span>
              </button>

              <button
                onClick={() => setOverviewSubTab('map')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  overviewSubTab === 'map'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span>{language === 'ar' ? 'خريطة التوزيع الجغرافي PostGIS' : 'Live PostGIS Geo-Map'}</span>
              </button>

              <button
                onClick={() => setOverviewSubTab('bookings')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  overviewSubTab === 'bookings'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{language === 'ar' ? 'الحجوزات والعمليات الحية' : 'Live Service Bookings'}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                  {totalPlatformBookings}
                </span>
              </button>
            </div>

            {/* Sub-View 1: KPIs */}
            {overviewSubTab === 'kpis' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">
                      {language === 'ar' ? 'إجمالي الورش المعتمدة' : 'Total Verified Providers'}
                    </span>
                    <div className="text-3xl font-black text-slate-900 font-mono">{totalVerifiedProviders}</div>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
                      <span>{language === 'ar' ? `إجمالي المسجلين: ${providers.length}` : `Total registered: ${providers.length}`}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-blue-600">{language === 'ar' ? `${totalPendingKYC} قيد التدقيق` : `${totalPendingKYC} Pending Audits`}</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">
                      {language === 'ar' ? 'إجمالي عمليات وحجوزات المنظومة' : 'Total Platform Transactions'}
                    </span>
                    <div className="text-3xl font-black text-slate-900 font-mono">{masterTransactions.length}</div>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
                      <span>{language === 'ar' ? `${totalPlatformBookings} حجز صيانة` : `${totalPlatformBookings} Service Bookings`}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{language === 'ar' ? `${totalPaidInvoicesCount} فاتورة مسددة` : `${totalPaidInvoicesCount} Invoices Paid`}</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">
                      {language === 'ar' ? 'حجم التداول الإجمالي (GMV)' : 'Gross Merchandise Volume (GMV)'}
                    </span>
                    <div className="text-3xl font-black text-blue-600 font-mono">{formatPrice(totalPlatformGMV)}</div>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
                      <span>{language === 'ar' ? 'يشمل كافة فواتير الصيانة والقطع' : 'Includes all services & parts'}</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block">
                      {language === 'ar' ? 'صافي عمولة المنظومة (Take-Rate)' : 'Platform Net Commission'}
                    </span>
                    <div className="text-3xl font-black text-emerald-600 font-mono">{formatPrice(totalNetCommission)}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                      <span className="text-blue-600">{language === 'ar' ? '10% خدمات • 8% متجر' : '10% Services • 8% Store'}</span>
                    </div>
                  </div>
                </div>

                {/* Operations Activity Table */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                        {language === 'ar' ? 'سجل العمليات والخدمات الحية على المنصة (Live Stream)' : 'Live Platform Service Activity Stream'}
                      </strong>
                      <span className="text-xs text-slate-500">
                        {language === 'ar' ? 'مزامنة فورية لكافة معاملات العميل والورشة التجريبية والطلبات الحية' : 'Real-time synchronization across demo customer & provider accounts'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setAdminActivePillar('financials');
                        setFinancialsSubTab('transactions');
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>{language === 'ar' ? 'عرض السجل المالي الشامل ←' : 'View Full Ledger →'}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-start">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                          <th className="pb-3 text-start">{language === 'ar' ? 'رقم المعاملة' : 'Tx ID'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'النوع' : 'Type'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'العميل' : 'Customer'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'الورشة / المزود' : 'Provider'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'الخدمة / القطعة' : 'Service / Item'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'المبلغ' : 'Amount'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'التاريخ' : 'Date'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {masterTransactions.slice(0, 7).map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedTransaction(tx)}>
                            <td className="py-3 font-mono font-bold text-blue-600">{tx.id}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">
                                {language === 'ar' ? tx.categoryAr : tx.categoryEn}
                              </span>
                            </td>
                            <td className="py-3 font-bold text-slate-900">{tx.customerName}</td>
                            <td className="py-3 text-slate-700">{tx.providerName}</td>
                            <td className="py-3 text-slate-600 truncate max-w-[200px]">{tx.serviceOrItem}</td>
                            <td className="py-3 font-mono font-bold text-slate-900">{formatPrice(tx.amount)}</td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                  tx.status === 'Completed' || tx.status === 'Paid' || tx.status === 'Settled'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : tx.status === 'In Progress' || tx.status === 'Dispatched'
                                    ? 'bg-blue-100 text-blue-800'
                                    : tx.status === 'Accepted'
                                    ? 'bg-purple-100 text-purple-800'
                                    : tx.status === 'Overdue'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {language === 'ar' ? tx.statusAr : tx.status}
                              </span>
                            </td>
                            <td className="py-3 text-slate-400 font-mono text-[11px]">{tx.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-View 2: Map */}
            {overviewSubTab === 'map' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'خريطة التتبع الجغرافي PostGIS للورش وأساطيل الإنقاذ الطارئ' : 'PostGIS Geolocation Live Provider & Emergency Fleet Tracking'}
                </strong>
                <div className="h-[560px] rounded-2xl overflow-hidden border border-slate-200">
                  <LeafletMap providers={providers} />
                </div>
              </div>
            )}

            {/* Sub-View 3: Bookings */}
            {overviewSubTab === 'bookings' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? `سجل أوامر العمل والحجوزات النشطة (${totalPlatformBookings})` : `Platform Bookings & Service Work Orders Ledger (${totalPlatformBookings} Active)`}
                </strong>
                <div className="space-y-3">
                  {masterTransactions
                    .filter((t) => t.type === 'booking')
                    .map((b) => (
                      <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-900 font-bold text-sm">#{b.id} • {b.serviceOrItem}</strong>
                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black">
                              {language === 'ar' ? b.statusAr : b.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-600 block mt-1">
                            {language === 'ar' ? 'العميل:' : 'Customer:'} <strong>{b.customerName}</strong> ({b.vehicle}) • {language === 'ar' ? 'الورشة:' : 'Provider:'} <strong>{b.providerName}</strong>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block">{language === 'ar' ? 'تم التسجيل:' : 'Logged:'} {b.date} • {b.paymentMethod}</span>
                        </div>
                        <div className="text-start sm:text-end">
                          <strong className="text-base font-black text-slate-900 font-mono block">{formatPrice(b.amount)}</strong>
                          <span className="text-[10px] text-emerald-700 font-bold">
                            {language === 'ar' ? `يشمل عمولة المنصة 10% (${formatPrice(b.platformFee)})` : `10% Platform Fee (${formatPrice(b.platformFee)})`}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PILLAR 2: KYC & PROVIDER GOVERNANCE                          */}
        {/* ============================================================ */}
        {adminActivePillar === 'providers' && (
          <div className="space-y-6">
            {/* Sub-Tabs Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setProvidersSubTab('kyc')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  providersSubTab === 'kyc'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{language === 'ar' ? 'استوديو تدقيق وثائق الورش (KYC)' : 'KYC Verification Studio'}</span>
                <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black">
                  {kycCases.filter((c) => c.status === 'pending').length}
                </span>
              </button>

              <button
                onClick={() => setProvidersSubTab('directory')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  providersSubTab === 'directory'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>{language === 'ar' ? 'دليل الورش ومراكز الصيانة المعتمدة' : 'Verified Garages Directory'}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black">
                  {providers.length}
                </span>
              </button>

              <button
                onClick={() => setProvidersSubTab('taxonomy')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  providersSubTab === 'taxonomy'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{language === 'ar' ? 'هيكلية تصنيف الخدمات والقطع' : 'Service Taxonomy Hierarchy'}</span>
              </button>
            </div>

            {/* Sub-View 1: KYC Audits */}
            {providersSubTab === 'kyc' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {language === 'ar' ? `طلبات التحقق الواردة (${kycCases.length})` : `Verification Applications (${kycCases.length})`}
                  </span>
                  {kycCases.map((c) => {
                    const isSelected = (selectedCase?.id || kycCases[0]?.id) === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCase(c)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-600/20 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-slate-900 font-bold text-xs">{c.businessName}</strong>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              c.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : c.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{c.city} • Verified Garage</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                          <span>CR: {c.documents?.find((d) => d.type === 'commercial_register')?.title || 'CR-104928'}</span>
                          <span>{c.submittedAt ? new Date(c.submittedAt).toLocaleDateString() : 'Recent'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Case Review Detail Pane */}
                {(selectedCase || kycCases[0]) && (() => {
                  const currentCase = selectedCase || kycCases[0];
                  return (
                    <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div>
                          <h2 className="text-base font-black text-slate-900">{currentCase.businessName}</h2>
                          <span className="text-xs text-slate-500 font-mono">Case ID: {currentCase.id} • {currentCase.city}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase">
                          {currentCase.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-slate-400 font-bold uppercase text-[10px] block">Commercial Registration</span>
                          <strong className="text-slate-900 block font-mono">{currentCase.documents?.find((d) => d.type === 'commercial_register')?.title || 'CR-88912-PAL'}</strong>
                          <span className="text-emerald-600 font-bold text-[11px]">✓ Verified with Ministry of Economy</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-slate-400 font-bold uppercase text-[10px] block">Tax Identification (VAT)</span>
                          <strong className="text-slate-900 block font-mono">VAT-99214002-FTA</strong>
                          <span className="text-blue-600 font-bold text-[11px]">5% FTA / 16% Tax Profile Active</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 block">
                          {language === 'ar' ? 'ملاحظات التدقيق الإداري' : 'Auditor Approval Notes & Tier Classification'}
                        </label>
                        <textarea
                          rows={2}
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder={language === 'ar' ? 'أدخل ملاحظات التدقيق والاعتماد...' : 'Enter verification comments or audit findings...'}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          onClick={() => handleApproveCase(currentCase.id, 'Business Verified')}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{language === 'ar' ? 'اعتماد: موثق تجارياً' : 'Approve: Business Verified'}</span>
                        </button>

                        <button
                          onClick={() => handleApproveCase(currentCase.id, 'Premium Verified')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{language === 'ar' ? 'اعتماد: شريك بريميوم معتمد' : 'Approve: Premium Verified'}</span>
                        </button>

                        <button
                          onClick={() => handleRejectCase(currentCase.id)}
                          className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-all flex items-center gap-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>{language === 'ar' ? 'رفض الطلب' : 'Reject Application'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Sub-View 2: Verified Garages Directory */}
            {providersSubTab === 'directory' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <strong className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    {language === 'ar' ? `دليل الورش ومراكز الصيانة المعتمدة (${providers.length})` : `Platform Verified Providers Directory (${providers.length})`}
                  </strong>
                  <input
                    type="text"
                    placeholder={language === 'ar' ? 'ابحث باسم الورشة، المدينة، أو التخصص...' : 'Search provider by name, city, or specialty...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-start">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                        <th className="pb-3 text-start">{language === 'ar' ? 'اسم الورشة' : 'Provider Name'}</th>
                        <th className="pb-3 text-start">{language === 'ar' ? 'المدينة / المنطقة' : 'City / Region'}</th>
                        <th className="pb-3 text-start">{language === 'ar' ? 'مستوى التوثيق' : 'Verification Tier'}</th>
                        <th className="pb-3 text-start">{language === 'ar' ? 'التقييم' : 'Rating'}</th>
                        <th className="pb-3 text-start">{language === 'ar' ? 'نسبة العمولة' : 'Commission Rate'}</th>
                        <th className="pb-3 text-start">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {providers.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50">
                          <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                            <span>{language === 'ar' ? (p.businessNameAr || p.businessNameEn) : (p.businessNameEn || p.businessNameAr)}</span>
                            {p.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </td>
                          <td className="py-3 text-slate-600">{language === 'ar' ? (p.cityAr || p.cityEn) : (p.cityEn || p.cityAr)}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase">
                              {p.verificationTier?.replace('_', ' ') || 'Premium Verified'}
                            </span>
                          </td>
                          <td className="py-3 font-bold text-amber-500">★ {p.rating} ({p.reviewCount})</td>
                          <td className="py-3 font-mono font-bold text-slate-900">10.0% {language === 'ar' ? 'قياسي' : 'Standard'}</td>
                          <td className="py-3">
                            <button
                              onClick={() => showToast(language === 'ar' ? `إدارة قواعد الورشة ${p.businessNameAr}` : `Managing rules for ${p.businessNameEn}`, 'info')}
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              {language === 'ar' ? 'إدارة القواعد ←' : 'Manage Rules →'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-View 3: Service Taxonomy */}
            {providersSubTab === 'taxonomy' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'هيكلية تصنيف الخدمات والقطع الهندسية (Section 7 & 8)' : 'Dynamic Automotive Service Taxonomy Hierarchy (Section 7 & 8)'}
                </strong>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">{language === 'ar' ? (cat.nameAr || cat.nameEn) : (cat.nameEn || cat.nameAr)}</strong>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black font-mono">
                          #{cat.id}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{language === 'ar' ? (cat.descriptionAr || cat.descriptionEn) : (cat.descriptionEn || cat.descriptionAr)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PILLAR 3: USERS, FLEETS & COMMERCE                           */}
        {/* ============================================================ */}
        {adminActivePillar === 'commerce' && (
          <div className="space-y-6">
            {/* Sub-Tabs Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setCommerceSubTab('customers')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  commerceSubTab === 'customers'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>{language === 'ar' ? 'إدارة العملاء وحسابات الأساطيل' : 'Customer CRM & Fleets'}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black">
                  {customers.length}
                </span>
              </button>

              <button
                onClick={() => setCommerceSubTab('marketplace')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  commerceSubTab === 'marketplace'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'ar' ? 'متجر قطع الغيار والعمولات' : 'Spare Parts Store Moderation'}</span>
              </button>
            </div>

            {/* Sub-View 1: Customers CRM */}
            {commerceSubTab === 'customers' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? `المستخدمين المسجلين وحسابات أساطيل الشركات (${customers.length})` : `Registered Customers & Enterprise Fleet Accounts (${customers.length})`}
                </strong>

                <div className="space-y-3">
                  {customers.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-bold text-sm">{c.name}</strong>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            {c.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-1">
                          {c.phone} • {c.email} • {c.date}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                          {language === 'ar' ? 'المركبات:' : 'Vehicles:'} {c.vehicles}
                        </span>
                      </div>

                      <div className="text-start sm:text-end">
                        <strong className="text-base font-black text-slate-900 font-mono block">{c.spent}</strong>
                        <span className="text-[10px] text-slate-500">{c.cars} {language === 'ar' ? 'مركبات مسجلة' : 'Registered Vehicles'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-View 2: Marketplace */}
            {commerceSubTab === 'marketplace' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'كتالوج قطع الغيار وإدارة عمولات الموردين' : 'Spare Parts Catalog & Supplier Commission Moderation'}
                </strong>
                <p className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'إدارة المنتجات المعتمدة من موردي القطع الأصلية OEM وما بعد البيع في فلسطين والإمارات.'
                    : 'Global catalog management for verified OEM & aftermarket suppliers in the UAE & Palestine.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold block uppercase">{language === 'ar' ? 'القطع النشطة' : 'Active SKUs'}</span>
                    <strong className="text-2xl font-black text-slate-900 font-mono">1,420</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold block uppercase">{language === 'ar' ? 'عمولة المتجر' : 'Marketplace Take-Rate'}</span>
                    <strong className="text-2xl font-black text-blue-600 font-mono">8.0%</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold block uppercase">{language === 'ar' ? 'إجمالي الطلبات المباعة' : 'Total Parts Sold'}</span>
                    <strong className="text-2xl font-black text-emerald-600 font-mono">{language === 'ar' ? '892 طلب' : '892 Orders'}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PILLAR 4: FINANCIALS, TRANSACTIONS, DISPUTES & MULTI-COUNTRY */}
        {/* ============================================================ */}
        {adminActivePillar === 'financials' && (
          <div className="space-y-6">
            {/* Sub-Tabs Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setFinancialsSubTab('transactions')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  financialsSubTab === 'transactions'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>{language === 'ar' ? 'سجل المعاملات والعمليات المالي الشامل' : 'Unified Financial Ledger'}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black">
                  {filteredTransactions.length}
                </span>
              </button>

              <button
                onClick={() => setFinancialsSubTab('revenue')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  financialsSubTab === 'revenue'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>{language === 'ar' ? 'نسبة العمولة وعائدات المنظومة' : 'Take-Rate & Platform Revenue'}</span>
              </button>

              <button
                onClick={() => setFinancialsSubTab('payouts')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  financialsSubTab === 'payouts'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>{language === 'ar' ? 'تسويات وتحويلات الورش IBAN' : 'Provider IBAN Payouts'}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black">
                  {payoutsList.filter((p) => p.status === 'Pending').length > 0 ? `${payoutsList.filter((p) => p.status === 'Pending').length} Pending` : `${payoutsList.length}`}
                </span>
              </button>

              <button
                onClick={() => setFinancialsSubTab('disputes')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  financialsSubTab === 'disputes'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{language === 'ar' ? 'النزاعات والشكاوى والاسترداد' : 'Disputes & Refunds Matrix'}</span>
                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 text-[10px] font-black">
                  {disputesList.filter((d) => d.status === 'Open').length} {language === 'ar' ? 'مفتوح' : 'Open'}
                </span>
              </button>

              <button
                onClick={() => setFinancialsSubTab('countries')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  financialsSubTab === 'countries'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'ar' ? 'إعدادات الدول والضرائب والعملات' : 'Multi-Country & VAT Parameters'}</span>
              </button>
            </div>

            {/* Sub-View 0: Unified Financial Transactions Ledger */}
            {financialsSubTab === 'transactions' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-900">
                      {language === 'ar' ? 'سجل العمليات والمعاملات المالي الشامل (All Channel Ledger)' : 'Unified Multi-Channel Financial & Transaction Ledger'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'ar'
                        ? 'مراقبة موحدة لكافة فواتير الضرائب، الحجوزات المباشرة، عروض الأسعار، طلبات المتجر، وتسويات الورش من حسابات العميل والورشة التجريبية والعمليات الحية.'
                        : 'Real-time audit log of all customer bookings, tax invoices, quotations, spare parts orders, and provider payouts.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleExportTransactionsCSV}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-2xs flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'تصدير السجل (CSV)' : 'Export Audit CSV'}</span>
                    </button>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'all', label: language === 'ar' ? 'الكل' : 'All Types' },
                      { id: 'booking', label: language === 'ar' ? '🛠️ حجوزات الصيانة' : '🛠️ Service Bookings' },
                      { id: 'invoice', label: language === 'ar' ? '🧾 فواتير ضريبية' : '🧾 Tax Invoices' },
                      { id: 'quote', label: language === 'ar' ? '📋 عروض الأسعار' : '📋 Quotations' },
                      { id: 'order', label: language === 'ar' ? '🛒 طلبات القطع' : '🛒 Parts Orders' },
                      { id: 'payout', label: language === 'ar' ? '💳 تسويات IBAN' : '💳 Payouts' },
                      { id: 'sos', label: language === 'ar' ? '🚨 طوارئ SOS' : '🚨 Emergency SOS' },
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        onClick={() => setTransactionTypeFilter(pill.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                          transactionTypeFilter === pill.id
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-2.5" />
                    <input
                      type="text"
                      placeholder={language === 'ar' ? 'ابحث برقم المعاملة، العميل، أو الورشة...' : 'Search ID, customer, provider, plate...'}
                      value={transactionSearch}
                      onChange={(e) => setTransactionSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl ps-9 pe-3 py-1.5 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Ledger Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-xs text-start">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                        <th className="p-3 text-start">{language === 'ar' ? 'رقم المعاملة' : 'Tx ID'}</th>
                        <th className="p-3 text-start">{language === 'ar' ? 'النوع والتصنيف' : 'Category'}</th>
                        <th className="p-3 text-start">{language === 'ar' ? 'العميل والمركبة' : 'Customer & Vehicle'}</th>
                        <th className="p-3 text-start">{language === 'ar' ? 'الورشة / المورد' : 'Provider'}</th>
                        <th className="p-3 text-start">{language === 'ar' ? 'الخدمة أو القطعة' : 'Service / Item'}</th>
                        <th className="p-3 text-end">{language === 'ar' ? 'الإجمالي' : 'Gross'}</th>
                        <th className="p-3 text-end">{language === 'ar' ? 'عمولة 10%' : 'Fee (10%)'}</th>
                        <th className="p-3 text-start">{language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}</th>
                        <th className="p-3 text-start">{language === 'ar' ? 'الحالة' : 'Status'}</th>
                        <th className="p-3 text-center">{language === 'ar' ? 'تفاصيل' : 'Action'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/80 transition-all">
                          <td className="p-3 font-mono font-bold text-blue-600">{tx.id}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10px] font-bold">
                              {language === 'ar' ? tx.categoryAr : tx.categoryEn}
                            </span>
                          </td>
                          <td className="p-3">
                            <strong className="text-slate-900 block font-bold">{tx.customerName}</strong>
                            <span className="text-[10px] text-slate-500 font-mono">{tx.vehicle} • {tx.plate}</span>
                          </td>
                          <td className="p-3 text-slate-700 font-bold">{tx.providerName}</td>
                          <td className="p-3 text-slate-600 truncate max-w-[180px]">{tx.serviceOrItem}</td>
                          <td className="p-3 text-end font-mono font-black text-slate-900">{formatPrice(tx.amount)}</td>
                          <td className="p-3 text-end font-mono font-bold text-emerald-600">{formatPrice(tx.platformFee)}</td>
                          <td className="p-3 text-slate-600 font-medium text-[11px]">{tx.paymentMethod}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                tx.status === 'Completed' || tx.status === 'Paid' || tx.status === 'Settled'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : tx.status === 'In Progress' || tx.status === 'Dispatched'
                                  ? 'bg-blue-100 text-blue-800'
                                  : tx.status === 'Accepted'
                                  ? 'bg-purple-100 text-purple-800'
                                  : tx.status === 'Overdue'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {language === 'ar' ? tx.statusAr : tx.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => setSelectedTransaction(tx)}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-all"
                            >
                              {language === 'ar' ? 'عرض' : 'View'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-View 1: Revenue */}
            {financialsSubTab === 'revenue' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'عمولة المنظومة واشتراكات الورش SaaS (Section 31 & 32)' : 'Platform Commission & Provider Subscription Take-Rate (Section 31 & 32)'}
                </strong>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">{language === 'ar' ? 'عمولة الحجوزات المنجزة' : 'Bookings Commission'}</span>
                    <strong className="text-2xl font-black text-blue-600 font-mono block">10.0%</strong>
                    <p className="text-[11px] text-slate-500">{language === 'ar' ? 'تُخصم آلياً عند اكتمال الطلب ودفع الفاتورة.' : 'Automatically deducted from total completed job value.'}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">{language === 'ar' ? 'باقات نظام الورش SaaS' : 'Workshop SaaS Plans'}</span>
                    <strong className="text-2xl font-black text-emerald-600 font-mono block">AED 18,400 / {language === 'ar' ? 'شهر' : 'mo'}</strong>
                    <p className="text-[11px] text-slate-500">{language === 'ar' ? 'اشتراكات شهرية متكررة من 42 ورشة ومركز صيانة.' : 'Recurring subscriptions from 42 Professional & Enterprise garages.'}</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">{language === 'ar' ? 'دورة تسوية الأرباح' : 'Automated Payout Cycle'}</span>
                    <strong className="text-2xl font-black text-slate-900 font-mono block">{language === 'ar' ? 'أسبوعياً (كل إثنين)' : 'Weekly (Monday)'}</strong>
                    <p className="text-[11px] text-slate-500">{language === 'ar' ? 'تحويل بنكي مباشر IBAN لكافة الورش في فلسطين والإمارات.' : 'Direct IBAN & Bank Wire transfers across UAE & Palestine.'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-View 2: Provider Payouts Console */}
            {financialsSubTab === 'payouts' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                      {language === 'ar' ? 'وحدة صرف وتسوية دفعات الورش ومراكز الصيانة (IBAN Wire Settlements)' : 'Provider Weekly IBAN Wire Settlements Console'}
                    </strong>
                    <span className="text-xs text-slate-500">
                      {language === 'ar' ? 'تحويل أرباح الورش المستحقة بعد خصم عمولة المنصة 10% والضرائب' : 'Net provider balances after 10% platform take-rate & VAT deduction'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {payoutsList.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-bold text-sm">{language === 'ar' ? p.providerAr : p.provider}</strong>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              p.status === 'Settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <span>{p.bank} • IBAN: </span>
                          <strong className="font-mono text-slate-900">{p.iban}</strong>
                        </div>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          Period: {p.period} • {p.jobsCount} Completed Orders • {p.settledAt}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <div className="text-start sm:text-end">
                          <span className="text-[10px] text-slate-400 font-bold uppercase block">Net Payout</span>
                          <strong className="text-lg font-black text-slate-900 font-mono">{formatPrice(p.amount)}</strong>
                        </div>

                        {p.status === 'Pending' ? (
                          <button
                            onClick={() => handleApprovePayout(p.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'اعتماد وصرف IBAN' : 'Approve & Wire IBAN'}</span>
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>{language === 'ar' ? 'تم الصرف بنجاح' : 'Settled & Transferred'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-View 3: Disputes */}
            {financialsSubTab === 'disputes' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'مصفوفة تسوية النزاعات والشكاوى بين العميل والورشة' : 'Customer ↔ Workshop Dispute Resolution Matrix'}
                </strong>

                <div className="space-y-3">
                  {disputesList.map((d) => (
                    <div key={d.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900 font-bold text-sm">
                            {language === 'ar' ? 'نزاع' : 'Dispute'} #{d.id} • {language === 'ar' ? 'حجز' : 'Booking'} {d.bookingId}
                          </strong>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              d.status === 'Open' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {language === 'ar' ? d.statusAr : d.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-1">
                          {language === 'ar' ? 'العميل:' : 'Customer:'} <strong>{language === 'ar' ? d.customerAr : d.customer}</strong> {language === 'ar' ? 'ضد الورشة:' : 'vs Workshop:'} <strong>{language === 'ar' ? d.providerAr : d.provider}</strong>
                        </span>
                        <span className="text-[11px] text-slate-500 block">{language === 'ar' ? 'السبب:' : 'Reason:'} {language === 'ar' ? d.reasonAr : d.reason}</span>
                        <span className="text-[10px] text-blue-700 font-bold block mt-0.5 font-mono">{d.resolution}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <strong className="text-base font-black text-slate-900 font-mono">{formatPrice(d.amount)}</strong>
                        {d.status === 'Open' && (
                          <button
                            onClick={() => handleSettleDispute(d.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                          >
                            {language === 'ar' ? 'تدقيق وتسوية' : 'Audit & Resolve'}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-View 4: Multi-Country Setup */}
            {financialsSubTab === 'countries' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'إعدادات ومعايير التشغيل الإقليمية للدول (Section 66)' : 'Multi-Country Regional Operating Parameters (Section 66)'}
                </strong>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {countriesConfig.map((c) => (
                    <div key={c.code} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold text-sm">{c.name}</strong>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">
                          {c.code}
                        </span>
                      </div>

                      <div className="space-y-1 text-slate-600">
                        <div className="flex justify-between"><span>{language === 'ar' ? 'العملة:' : 'Currency:'}</span><strong className="text-slate-900">{c.currency}</strong></div>
                        <div className="flex justify-between"><span>{language === 'ar' ? 'ضريبة القيمة المضافة:' : 'VAT / Tax Rate:'}</span><strong className="text-slate-900">{c.vat}</strong></div>
                        <div className="flex justify-between"><span>{language === 'ar' ? 'الورش النشطة:' : 'Active Providers:'}</span><strong className="text-slate-900">{c.activeProviders}</strong></div>
                        <div className="flex justify-between"><span>{language === 'ar' ? 'طوارئ SOS:' : 'Emergency SOS:'}</span><strong className="text-slate-900 font-mono">{c.emergencyNumber}</strong></div>
                      </div>

                      <span className="text-[10px] text-emerald-700 font-bold block pt-1 border-t border-slate-200">
                        ✓ {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PILLAR 5: SECURITY, AUDIT LOGS & TEAM RBAC                   */}
        {/* ============================================================ */}
        {adminActivePillar === 'system' && (
          <div className="space-y-6">
            {/* Sub-Tabs Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setSystemSubTab('audit-logs')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  systemSubTab === 'audit-logs'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>{language === 'ar' ? 'سجل تدقيق الأمان المعتمد' : 'Security Audit Logs'}</span>
              </button>

              <button
                onClick={() => setSystemSubTab('rbac')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  systemSubTab === 'rbac'
                    ? 'bg-blue-600 text-white font-black shadow-md ring-2 ring-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{language === 'ar' ? 'فريق الإدارة، الصلاحيات والربط البرمجي API' : 'Admin Team, RBAC & API Integrations'}</span>
              </button>
            </div>

            {/* Sub-View 1: Audit Logs */}
            {systemSubTab === 'audit-logs' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                  {language === 'ar' ? 'سجل العمليات الإدارية والأمنية غير القابل للتعديل (Section 68)' : 'Immutable System Security Audit Logs (Section 68)'}
                </strong>

                <div className="space-y-2">
                  {auditLogsList.map((log) => (
                    <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                      <div>
                        <span className="text-blue-600 font-bold me-2">{log.id}</span>
                        <strong className="text-slate-900 font-sans">{log.action}</strong>
                        <span className="text-slate-500 block text-[11px] font-sans mt-0.5">
                          {language === 'ar' ? 'بواسطة:' : 'By:'} {log.admin}
                        </span>
                      </div>
                      <div className="text-slate-400 text-end text-[11px]">
                        <div>{log.timestamp}</div>
                        <span className="text-[10px] text-slate-500">IP: {log.ip}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-View 2: Admin Team, RBAC & API Integrations */}
            {systemSubTab === 'rbac' && (
              <div className="space-y-6">
                {/* 1. Admin Team & Permissions */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                        {language === 'ar' ? 'إدارة فريق العمل وتحديد الصلاحيات (RBAC)' : 'Role-Based Access Control (RBAC) & Team Members'}
                      </strong>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {language === 'ar'
                          ? 'إدارة صلاحيات الإدارة العليا، تدقيق مستندات الورش، والإشراف المالي وصلاحيات صرف الدفعات.'
                          : 'Manage privileged team access, document audit permissions, and escrow payout authorities.'}
                      </p>
                    </div>
                    <button
                      onClick={() => showToast(language === 'ar' ? 'تم فتح نافذة دعوة مسؤول جديد وإرسال رابط التفعيل بالتحقق الثنائي 2FA...' : 'Invite modal opened. Sending invitation link with 2FA requirement...', 'info')}
                      className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{language === 'ar' ? 'دعوة مسؤول جديد' : 'Invite Admin Member'}</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-start">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                          <th className="pb-3 text-start">{language === 'ar' ? 'المسؤول' : 'Team Member'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'المسمى الوظيفي' : 'Role Scope'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'الصلاحيات الممنوحة' : 'Assigned Permissions'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'التحقق الثنائي 2FA' : 'Security 2FA'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'آخر IP' : 'Last IP'}</th>
                          <th className="pb-3 text-start">{language === 'ar' ? 'الإجراءات' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {[
                          { name: language === 'ar' ? 'طارق صلاح' : 'Tariq Salah', email: 'tariq@ahlalmarkabat.com', role: language === 'ar' ? 'المدير العام (Super Admin)' : 'Super Admin', permissions: language === 'ar' ? 'صلاحيات كاملة • الضرائب والإعدادات العامة' : 'Full Access • Tax & Global Config', status: 'Enforced', ip: '192.168.1.1' },
                          { name: language === 'ar' ? 'نور منصور' : 'Nour Mansour', email: 'nour.m@ahlalmarkabat.com', role: language === 'ar' ? 'رئيس قسم الامتثال والتوثيق' : 'KYC Compliance Lead', permissions: language === 'ar' ? 'تدقيق الوثائق • اعتماد الورش' : 'Document Audits • Garage Approvals', status: 'Enforced', ip: '192.168.1.18' },
                          { name: language === 'ar' ? 'فادي خضر' : 'Fadi Khader', email: 'fadi.k@ahlalmarkabat.com', role: language === 'ar' ? 'مدير العمليات المالية والتحويلات' : 'Finance & Payouts Manager', permissions: language === 'ar' ? 'العمولات • دفعات التحويل البنكي' : 'Commissions • Bank Wire Batches', status: 'Enforced', ip: '192.168.1.45' },
                          { name: language === 'ar' ? 'رانيا حداد' : 'Rania Haddad', email: 'rania.h@ahlalmarkabat.com', role: language === 'ar' ? 'مسؤول تسوية النزاعات والشكاوى' : 'Dispute Resolution Officer', permissions: language === 'ar' ? 'شكاوى العملاء • التحكيم والاسترداد' : 'Customer Claims • Refund Arbitration', status: 'Enforced', ip: '192.168.1.30' },
                        ].map((member, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-3">
                              <strong className="text-slate-900 font-bold block">{member.name}</strong>
                              <span className="text-[11px] text-slate-500 font-mono">{member.email}</span>
                            </td>
                            <td className="py-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-black">
                                {member.role}
                              </span>
                            </td>
                            <td className="py-3 text-slate-600">{member.permissions}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black flex items-center gap-1 w-fit">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>{language === 'ar' ? '2FA مفعل' : '2FA Active'}</span>
                              </span>
                            </td>
                            <td className="py-3 font-mono text-slate-400">{member.ip}</td>
                            <td className="py-3">
                              <button
                                onClick={() => showToast(language === 'ar' ? `تحديث نطاق صلاحيات ${member.name}` : `Permissions scope updated for ${member.name}`, 'info')}
                                className="text-xs font-bold text-blue-600 hover:underline"
                              >
                                {language === 'ar' ? 'تعديل الصلاحيات ←' : 'Edit Scope →'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Third-Party Infrastructure & API Health */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
                  <strong className="text-sm font-black text-slate-900 uppercase tracking-wider block">
                    {language === 'ar' ? 'حالة الربط البرمجي API والبنية التحتية للمنظومة (Section 68)' : 'Third-Party API Integrations & Infrastructure Health (Section 68)'}
                  </strong>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">{language === 'ar' ? 'بوابات الدفع الإلكتروني' : 'Payment Gateways'}</strong>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-slate-500 text-[11px]">{language === 'ar' ? 'Stripe، Apple Pay، والتحويل البنكي المباشر' : 'Stripe, Apple Pay & Local Bank Direct Debit'}</p>
                      <div className="text-[10px] font-bold text-emerald-700">{language === 'ar' ? '✓ 100% يعمل بكفاءة • استجابة 118ms' : '✓ 100% Operational • 118ms avg'}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">{language === 'ar' ? 'بوابة الرسائل وواتساب OTP' : 'SMS & WhatsApp OTP'}</strong>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-slate-500 text-[11px]">{language === 'ar' ? 'مزودي الاتصالات الإقليميين وTwilio' : 'Twilio & Regional Telecom Shortcode Route'}</p>
                      <div className="text-[10px] font-bold text-emerald-700">{language === 'ar' ? '✓ 99.98% نسبة وصول • سرعة 1.6 ثانية' : '✓ 99.98% Deliverability • 1.6s latency'}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">{language === 'ar' ? 'محرك الخرائط PostGIS' : 'PostGIS Geo-Map'}</strong>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-slate-500 text-[11px]">{language === 'ar' ? 'تتبع وتوجيه أساطيل الإنقاذ والورش' : 'OpenStreetMap & Leaflet Roadside Dispatch'}</p>
                      <div className="text-[10px] font-bold text-emerald-700">{language === 'ar' ? '✓ 155 نقطة صيانة متصلة' : '✓ 155 Workshop Nodes Connected'}</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900 font-bold">{language === 'ar' ? 'النسخ الاحتياطي المشفر' : 'Encrypted DB Backups'}</strong>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-slate-500 text-[11px]">{language === 'ar' ? 'قاعدة بيانات PostgreSQL 16 بتشفير AES-256' : 'PostgreSQL 16 AES-256 Cloud Snapshots'}</p>
                      <div className="text-[10px] font-bold text-emerald-700">{language === 'ar' ? '✓ مزامنة كل ساعة (آخر نسخة: منذ 12 د)' : '✓ Hourly Sync (Last: 12 min ago)'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Transaction Detail Breakdown Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {language === 'ar' ? 'تفاصيل المعاملة المالية' : 'Transaction Financial Breakdown'}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">#{selectedTransaction.id} • {selectedTransaction.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{language === 'ar' ? 'العميل:' : 'Customer:'}</span>
                    <strong className="text-slate-900">{selectedTransaction.customerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{language === 'ar' ? 'الورشة / المزود:' : 'Provider:'}</span>
                    <strong className="text-slate-900">{selectedTransaction.providerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{language === 'ar' ? 'الخدمة / القطعة:' : 'Service / Item:'}</span>
                    <strong className="text-slate-900">{selectedTransaction.serviceOrItem}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{language === 'ar' ? 'المركبة واللوحة:' : 'Vehicle & Plate:'}</span>
                    <span className="font-mono text-slate-700">{selectedTransaction.vehicle} • {selectedTransaction.plate}</span>
                  </div>
                </div>

                {/* Financial Ledger Calculation */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>{language === 'ar' ? 'قيمة المعاملة الإجمالية (Gross):' : 'Gross Transaction Amount:'}</span>
                    <strong className="font-mono text-slate-900">{formatPrice(selectedTransaction.amount)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>{language === 'ar' ? 'ضريبة القيمة المضافة VAT (5% / 16%):' : 'VAT / Tax Included:'}</span>
                    <span className="font-mono">{formatPrice(selectedTransaction.vatAmount)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold border-t border-blue-200 pt-2">
                    <span>{language === 'ar' ? 'عمولة المنصة المركزية Take-Rate (10%):' : 'Platform Central Take-Rate (10%):'}</span>
                    <span className="font-mono">+{formatPrice(selectedTransaction.platformFee)}</span>
                  </div>
                  <div className="flex justify-between text-blue-900 font-black border-t border-blue-200 pt-2 text-sm">
                    <span>{language === 'ar' ? 'صافي مستحق الورشة (Net Payout):' : 'Net Workshop Settlement:'}</span>
                    <span className="font-mono">{formatPrice(selectedTransaction.providerNet)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-500 pt-1">
                  <span>{language === 'ar' ? 'طريقة الدفع المسجلة:' : 'Payment Route:'} <strong>{selectedTransaction.paymentMethod}</strong></span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px]">
                    {language === 'ar' ? selectedTransaction.statusAr : selectedTransaction.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    showToast(language === 'ar' ? `تم إرسال إشعار تدقيق للمعاملة ${selectedTransaction.id}` : `Audit notice sent for ${selectedTransaction.id}`, 'info');
                    setSelectedTransaction(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  {language === 'ar' ? 'إرسال إشعار' : 'Dispatch Notice'}
                </button>
                <button
                  onClick={() => {
                    showToast(language === 'ar' ? `تم التحقق من المعاملة ${selectedTransaction.id} وتطابق الحسابات 100%` : `Transaction ${selectedTransaction.id} verified 100%`, 'success');
                    setSelectedTransaction(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-sm cursor-pointer"
                >
                  {language === 'ar' ? 'اعتماد المطابقة المالية' : 'Confirm Ledger Reconciliation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
