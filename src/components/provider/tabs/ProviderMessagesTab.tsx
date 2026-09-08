import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import socketService from '../../../services/socketService';
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  Send,
  Paperclip,
  Mic,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Star,
  CheckCircle2,
  Clock,
  Car,
  User,
  Calendar,
  Wrench,
  Download,
  Share2,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Info,
  Check,
  Radio,
} from 'lucide-react';

interface ProviderMessagesTabProps {
  onNavigateTab?: (tab: string) => void;
}

export const ProviderMessagesTab: React.FC<ProviderMessagesTabProps> = ({ onNavigateTab: _onNavigateTab }) => {
  const { language, showToast, user } = useApp();
  const [activeChannel, setActiveChannel] = useState<'all' | 'whatsapp' | 'inapp' | 'sms' | 'email'>('whatsapp');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [newMsgCustomer, setNewMsgCustomer] = useState('');
  const [newMsgPhone, setNewMsgPhone] = useState('');
  const [newMsgContent, setNewMsgContent] = useState('');

  const isNewUser = Boolean(user?.isNewUser) || (user?.email !== 'provider@ahlalmarkabat.com' && !user?.isDemoUser);

  const kpis = isNewUser
    ? [
        { label: 'Total Conversations', value: '0', change: '0% vs last 7 days', isUp: true, icon: MessageSquare },
        { label: 'Unread Messages', value: '0', change: '0% vs last 7 days', isUp: true, isAlert: false, icon: Clock },
        { label: 'Open Conversations', value: '0', change: '0% vs last 7 days', isUp: true, icon: Radio },
        { label: 'Response Time', value: '0m', change: '0m vs last 7 days', isUp: true, icon: Zap },
        { label: 'Customer Satisfaction', value: '5.0 ★', change: 'New Account', isUp: true, icon: Star },
      ]
    : [
        { label: 'Total Conversations', value: '128', change: '+16% vs last 7 days', isUp: true, icon: MessageSquare },
        { label: 'Unread Messages', value: '12', change: '-9% vs last 7 days', isUp: true, isAlert: true, icon: Clock },
        { label: 'Open Conversations', value: '36', change: '+14% vs last 7 days', isUp: true, icon: Radio },
        { label: 'Response Time', value: '18m', change: '-8m vs last 7 days', isUp: true, icon: Zap },
        { label: 'Customer Satisfaction', value: '4.8 ★', change: '+0.3 vs last 7 days', isUp: true, icon: Star },
      ];

  const conversations = isNewUser
    ? []
    : [
        { name: 'Ahmad R.', car: 'Toyota Camry 2016', srv: 'Brake Service', lastMsg: 'Hi, I need to check the brake noise...', time: '11:32 AM', unread: true, channel: 'WhatsApp', status: 'Unread' },
        { name: 'Lina M.', car: 'Honda Civic', srv: 'General Service', lastMsg: 'Thanks for the quick service!', time: '10:45 AM', unread: false, channel: 'WhatsApp', status: 'In Progress' },
        { name: 'Yousef K.', car: 'Hyundai Elantra', srv: 'Oil Change', lastMsg: 'Do you have a slot for tomorrow?', time: '09:30 AM', unread: true, channel: 'WhatsApp', status: 'Unread' },
        { name: 'Sara H.', car: 'Kia Sportage', srv: 'AC Repair', lastMsg: 'Please share the quote for AC repair', time: 'Yesterday', unread: false, channel: 'In-App', status: 'Quote Sent' },
        { name: 'Omar A.', car: 'Nissan Sunny', srv: 'Completed', lastMsg: 'Service completed. Thank you!', time: 'Yesterday', unread: false, channel: 'SMS', status: 'Closed' },
      ];

  return (
    <div className="space-y-6">
      {/* 1. Header with Quick Stats & New Message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'ar' ? 'الرسائل والمحادثات مع العملاء' : 'Messages & Customer Chat'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage all customer conversations from one place. Fast. Personal. Professional.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Response rate: 98% within 5 minutes across WhatsApp & In-App channels', 'info')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-2xs cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Quick Stats</span>
          </button>
          <button
            onClick={() => setIsNewMessageModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ New Message</span>
          </button>
        </div>
      </div>

      {/* 2. 5 KPI Cards matching Image 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">{kpi.label}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${kpi.isAlert ? 'bg-blue-100 text-blue-800' : 'bg-blue-50 text-blue-600'}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900">{kpi.value}</span>
              </div>
              <div className="mt-2 text-[10px] font-bold text-emerald-600">
                ▲ {kpi.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. 3-Column Chat Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden h-[620px]">
        {/* Left Column: Conversations List (3.5 cols) */}
        <div className="lg:col-span-4 border-e border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-3 border-b border-slate-200 space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-white border border-slate-200 rounded-xl ps-9 pe-3 py-1.5 text-xs font-bold text-slate-700 outline-none"
              />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
              <button className="px-2.5 py-1 bg-white rounded-lg shadow-2xs text-blue-600">Open ({conversations.length})</button>
              <button className="px-2.5 py-1 hover:bg-white rounded-lg">Unread ({conversations.filter(c => c.unread).length})</button>
              <button className="px-2.5 py-1 hover:bg-white rounded-lg">Closed</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-600">{language === 'ar' ? 'لا توجد محادثات نشطة' : 'No active chats yet'}</p>
                <p className="text-[10px] text-slate-400">{language === 'ar' ? 'رسائل واستفسارات العملاء ستظهر هنا تلقائياً' : 'Customer inquiries will appear here'}</p>
              </div>
            ) : (
              conversations.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedChat(c.name)}
                  className={`p-3 hover:bg-slate-100/80 cursor-pointer transition-colors ${
                    selectedChat === c.name ? 'bg-white shadow-2xs' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <strong className="text-xs font-bold text-slate-900">{c.name}</strong>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">{c.time}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{c.car} • {c.srv}</span>
                  <p className="text-[11px] text-slate-600 truncate mt-1">{c.lastMsg}</p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[9px]">
                    <span className="text-emerald-700 font-bold">● {c.channel}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${c.unread ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Middle Column: Active Chat Feed (5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-full bg-white">
          {!selectedChat || conversations.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-800">
                  {language === 'ar' ? 'مركز محادثات العملاء' : 'Customer Messaging Workspace'}
                </h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  {language === 'ar'
                    ? 'تواصل مع عملائك عبر واتساب والرسائل المباشرة. عند استلام رسائل أو استفسارات جديدة ستظهر هنا في الوقت الفعلي.'
                    : 'Connect with your customers via WhatsApp, SMS, or live chat. New inquiries and repair updates will sync here instantly.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                    alt={selectedChat}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <strong className="text-xs font-black text-slate-900 block">{selectedChat}</strong>
                    <span className="text-[10px] text-emerald-600 font-bold">● Online via WhatsApp</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <button className="p-1 hover:text-amber-500"><Star className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-blue-600"><Phone className="w-4 h-4" /></button>
                  <button className="p-1 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                <div className="text-center">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[9px] font-bold">Today</span>
                </div>

                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="p-3 rounded-2xl rounded-tl-xs bg-slate-100 text-slate-800 space-y-1">
                    <p className="text-[11px] leading-relaxed">
                      Hi, I need to check the brake noise coming from my car. It happens when I apply brakes.
                    </p>
                    <span className="text-[9px] text-slate-400 block text-end">8:28 AM</span>
                  </div>
                </div>

                <div className="flex items-end justify-end gap-2 ms-auto max-w-[80%]">
                  <div className="p-3 rounded-2xl rounded-tr-xs bg-emerald-600 text-white space-y-1">
                    <p className="text-[11px] leading-relaxed">
                      Hello! Thanks for reaching out. We can definitely help you with that. Can you share your vehicle details?
                    </p>
                    <span className="text-[9px] text-emerald-200 block text-end">11:29 AM ✓✓</span>
                  </div>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 text-xs font-bold text-slate-800 outline-none"
                  />
                  <button className="text-slate-400 hover:text-slate-600"><Paperclip className="w-4 h-4" /></button>
                  <button className="text-slate-400 hover:text-slate-600"><Smile className="w-4 h-4" /></button>
                  <button
                    onClick={() => {
                      if (replyText) {
                        socketService.sendMessage({
                          chatSessionId: selectedChat,
                          senderId: user?.id || 'prov-1',
                          content: replyText,
                        });
                        showToast(language === 'ar' ? 'تم إرسال الرسالة للعميل عبر البوابة' : 'Message sent via live gateway', 'success');
                        setReplyText('');
                      }
                    }}
                    className="p-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-950 font-black"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Customer & Job Context (3.5 cols) */}
        <div className="lg:col-span-3 border-s border-slate-200 p-4 overflow-y-auto space-y-4 bg-slate-50/40 text-xs">
          {!selectedChat || conversations.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <User className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-bold text-slate-600">{language === 'ar' ? 'سياق العميل' : 'Customer Context'}</p>
              <p className="text-[10px] text-slate-400">{language === 'ar' ? 'حدد محادثة لعرض بيانات العميل والمركبة' : 'Select a conversation to inspect details'}</p>
            </div>
          ) : (
            <>
              {/* Customer Summary */}
              <div className="space-y-1.5 pb-3 border-b border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Summary</span>
                <strong className="text-sm font-black text-slate-900 block">{selectedChat}</strong>
                <span className="text-slate-600 block text-[11px]">+970 59 876 5432</span>
                <span className="text-slate-500 block text-[10px]">Ramallah, Palestine</span>
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                  <span>Total Spent: <strong className="text-slate-800">AED 1,840</strong></span>
                  <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded">VIP</span>
                </div>
              </div>

              {/* Vehicle Summary */}
              <div className="space-y-1.5 pb-3 border-b border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Vehicle</span>
                <strong className="text-xs font-bold text-slate-900 block">Toyota Camry 2016</strong>
                <span className="text-[10px] font-mono text-slate-500 block">Plate: 6-2048-91 • 85,000 km</span>
              </div>

              {/* Service / Job Context */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-blue-600 text-[11px]">BK-2089</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">Confirmed</span>
                </div>
                <strong className="text-xs font-bold text-slate-900 block">Brake Inspection & Diagnostics</strong>
                <span className="text-[10px] text-slate-400 block">Sat, Jun 1, 2025 • 10:00 AM</span>
                <div className="text-[10px] text-slate-600 pt-1 border-t border-slate-100">
                  Assigned To: <strong className="text-slate-800">Owner / Lead Tech</strong>
                </div>
              </div>

              {/* Attachments */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Attachments</span>
                <div className="space-y-1 text-[10px]">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                    <span>🎥 brake_noise.mp4</span>
                    <span className="text-slate-400">3.4 MB</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                    <span>📷 camry_photo.jpg</span>
                    <span className="text-slate-400">1.1 MB</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Promotional Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#09152B] text-white p-6 sm:p-8 border border-slate-800 shadow-lg">
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {language === 'ar' ? 'نمّ مركزك مع أهل المركبات' : 'Grow Your Garage with AHL AL MARKABAT'}
          </h2>
          <p className="text-xs text-slate-300">
            Deliver exceptional customer service and build loyalty with every conversation.
          </p>
        </div>
      </div>
      {/* New Message Composer Modal */}
      {isNewMessageModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Start New Customer Chat</h3>
                  <p className="text-[11px] text-slate-500">Send direct WhatsApp or SMS message</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewMessageModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsNewMessageModalOpen(false);
                setSelectedChat(newMsgCustomer || 'Walk-in Customer');
                showToast(`Message sent to ${newMsgCustomer || 'Customer'} via WhatsApp & SMS gateway!`, 'success');
                setNewMsgCustomer('');
                setNewMsgPhone('');
                setNewMsgContent('');
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newMsgCustomer}
                  onChange={(e) => setNewMsgCustomer(e.target.value)}
                  placeholder="e.g. Tariq Al Nuaimi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="text"
                  required
                  value={newMsgPhone}
                  onChange={(e) => setNewMsgPhone(e.target.value)}
                  placeholder="050 123 4567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message *</label>
                <textarea
                  required
                  rows={3}
                  value={newMsgContent}
                  onChange={(e) => setNewMsgContent(e.target.value)}
                  placeholder="Type your message, appointment update, or quotation link..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewMessageModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
