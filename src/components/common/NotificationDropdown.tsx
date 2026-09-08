import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Calendar,
  Package,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  Check,
  ExternalLink,
  X,
  Clock,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const {
    language,
    role,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveTab,
  } = useApp();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter notifications relevant to current active role
  const roleNotifications = notifications.filter((n) => n.targetRoles.includes(role));
  const displayedNotifications =
    filter === 'unread' ? roleNotifications.filter((n) => !n.read) : roleNotifications;
  const unreadCount = roleNotifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'order':
        return <Package className="w-4 h-4 text-emerald-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'system':
        return <ShieldCheck className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const handleNotificationClick = (notif: typeof notifications[0]) => {
    markNotificationAsRead(notif.id);
    if (notif.actionTab) {
      setActiveTab(notif.actionTab as any);
    }
    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute end-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 text-slate-900 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell className="w-4 h-4 text-amber-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </div>
          <div>
            <h4 className="text-xs font-black text-white">
              {language === 'ar' ? 'مركز التنبيهات الحية' : 'Live Notifications'}
            </h4>
            <span className="text-[10px] text-slate-400 block font-mono">
              {role === 'customer'
                ? (language === 'ar' ? '🚗 بوابة العميل' : '🚗 Customer Feed')
                : role === 'provider'
                ? (language === 'ar' ? '🔧 نظام الورشة SaaS' : '🔧 Workshop Feed')
                : (language === 'ar' ? '🛡️ عمليات الإدارة العليا' : '🛡️ Super Admin Feed')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[10px] text-amber-400 hover:text-amber-300 font-bold hover:underline"
            >
              {language === 'ar' ? 'تمييز الكل كمقروء' : 'Mark all read'}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs font-black' : 'hover:text-slate-800'
            }`}
          >
            {language === 'ar' ? `الكل (${roleNotifications.length})` : `All (${roleNotifications.length})`}
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              filter === 'unread' ? 'bg-white text-slate-900 shadow-xs font-black' : 'hover:text-slate-800'
            }`}
          >
            {language === 'ar' ? `غير مقروء (${unreadCount})` : `Unread (${unreadCount})`}
          </button>
        </div>

        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{language === 'ar' ? 'محدث لحظياً' : 'Live Synced'}</span>
        </span>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
        {displayedNotifications.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {language === 'ar' ? 'لا توجد تنبيهات جديدة في هذا القسم' : 'No notifications in this feed'}
            </p>
          </div>
        ) : (
          displayedNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                !notif.read ? 'bg-blue-50/40' : 'bg-white'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                {getNotificationIcon(notif.type)}
              </div>

              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-xs font-black text-slate-900 truncate">
                    {language === 'ar' ? notif.titleAr : notif.titleEn}
                  </strong>
                  <span className="text-[9px] text-slate-400 shrink-0 font-mono">
                    {notif.timestamp}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {language === 'ar' ? notif.messageAr : notif.messageEn}
                </p>

                {notif.actionTab && (
                  <span className="text-[10px] text-blue-600 font-bold hover:underline inline-flex items-center gap-1 pt-0.5">
                    <span>{language === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>

              {!notif.read && (
                <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5 shadow-sm" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
        <button
          onClick={() => {
            setActiveTab('notifications');
            onClose();
          }}
          className="w-full py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-all shadow-2xs"
        >
          {language === 'ar' ? 'عرض مركز الإشعارات بالكامل →' : 'View All Notifications Center →'}
        </button>
      </div>
    </div>
  );
};
