import React from 'react';
import { useApp } from '../../context/AppContext';
import { CustomerGarageTab } from './tabs/CustomerGarageTab';
import { CustomerBookingsTab } from './tabs/CustomerBookingsTab';
import { CustomerHistoryTab } from './tabs/CustomerHistoryTab';
import { CustomerMarketplaceTab } from './tabs/CustomerMarketplaceTab';
import { CustomerWorkshopsTab } from './tabs/CustomerWorkshopsTab';
import {
  Sparkles,
  Award,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { language, user, customerActiveTab } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 space-y-8">
      {/* 1. Customer Hero Cockpit Banner */}
      <div className="bg-[#09152B] text-white py-10 px-4 sm:px-8 lg:px-12 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'بوابة العميل الرقمية — أهل المركبات' : 'AHL AL MARKABAT CUSTOMER COCKPIT'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'ar' ? 'مرحباً بك مجدداً، ' : 'Welcome back, '}
              <span className="text-amber-400">{user?.name || (language === 'ar' ? 'عمر عبد الله' : 'Ahmed Al-Mansoor')}</span>
            </h1>
            <p className="text-xs text-slate-300">
              {language === 'ar'
                ? 'إدارة مركباتك المسجلة، تتبع أوامر الصيانة الحية، استعراض جواز السفر الرقمي، شراء قطع الغيار، واكتشاف أفضل الورش المعتمدة.'
                : 'Manage your registered vehicles, track live bookings, review digital passports, order spare parts, and discover verified workshops.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700 text-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-black">
                {language === 'ar' ? 'عضوية أهل المركبات بلس' : 'Ahl Al Markabat Plus'}
              </strong>
              <span className="text-[10px] text-emerald-400 font-bold">
                {user?.isNewUser
                  ? (language === 'ar' ? '● عضو جديد' : '● New Member')
                  : (language === 'ar' ? '● عضوية VIP نشطة' : '● Active VIP Status')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Direct Pillar Content Body (Sub-tabs live directly inside each module) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {(customerActiveTab === 'garage' || ['documents', 'warranties'].includes(customerActiveTab)) && (
          <CustomerGarageTab />
        )}
        {(customerActiveTab === 'bookings' || ['quotations', 'messages'].includes(customerActiveTab)) && (
          <CustomerBookingsTab />
        )}
        {(customerActiveTab === 'history' || ['analytics', 'alerts', 'invoices', 'profile'].includes(customerActiveTab)) && (
          <CustomerHistoryTab />
        )}
        {customerActiveTab === 'marketplace' && <CustomerMarketplaceTab />}
        {customerActiveTab === 'providers' && <CustomerWorkshopsTab />}
      </div>
    </div>
  );
};
