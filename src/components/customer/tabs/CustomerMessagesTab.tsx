import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import socketService from '../../../services/socketService';
import {
  Send,
  Image,
  Paperclip,
  Phone,
  Building2,
  ShieldCheck,
  CheckCheck,
  Car,
  FileText,
  Clock,
} from 'lucide-react';

export const CustomerMessagesTab: React.FC = () => {
  const { language, user } = useApp();
  const [activeChat, setActiveChat] = useState('autotech');
  const [inputMessage, setInputMessage] = useState('');

  const conversations = [
    {
      id: 'autotech',
      name: 'AutoTech Premier Garage',
      advisor: 'Mohammed Ali (Senior Advisor)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      lastMessage: 'Your AC service is almost done! Finishing the vacuum check.',
      time: '10:45 AM',
      unread: 1,
      online: true,
    },
    {
      id: 'rapidfix',
      name: 'Rapid Fix Mobile Care',
      advisor: 'Yousef K. (Mobile Technician)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      lastMessage: 'Glad the new AGM battery is working great! Warranty registered.',
      time: 'Jan 18',
      unread: 0,
      online: false,
    },
  ];

  useEffect(() => {
    socketService.connect();
    socketService.joinRoom(activeChat);

    const handleIncoming = (msg: any) => {
      if (msg && msg.senderId !== user.id) {
        setChatHistory((prev) => [
          ...prev,
          {
            sender: 'advisor',
            text: msg.content || '',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    };

    socketService.onNewMessage(handleIncoming);
    return () => {
      socketService.offNewMessage(handleIncoming);
    };
  }, [activeChat, user.id]);

  const [chatHistory, setChatHistory] = useState([
    { sender: 'advisor', text: 'Good morning! We have received your Toyota RAV4 for the AC diagnostic service.', time: '10:15 AM' },
    { sender: 'user', text: 'Hi! Yes, the driver side vent was blowing warmer air than the passenger side.', time: '10:18 AM' },
    { sender: 'advisor', text: 'Got it. We checked the dual-zone blend door actuator and refrigerant level. The blend door is fine, but gas was slightly low (280g vs 550g). We are refilling with fresh R134a and leak dye.', time: '10:30 AM' },
    { sender: 'advisor', text: 'Your AC service is almost done! Finishing the vacuum check.', time: '10:45 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatHistory([
      ...chatHistory,
      { sender: 'user', text: inputMessage, time: 'Now' },
    ]);
    socketService.sendMessage({
      chatSessionId: activeChat,
      senderId: user.id,
      content: inputMessage,
    });
    setInputMessage('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
      {/* Left Conversations Sidebar (4 cols) */}
      <div className="lg:col-span-4 border-e border-slate-100 p-4 space-y-3 bg-slate-50/50">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider px-2">Workshops &amp; Advisors</h3>
        <div className="space-y-1.5">
          {conversations.map((c) => (
            <div
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-3 ${
                activeChat === c.id ? 'bg-white shadow-md border border-slate-200 ring-2 ring-blue-600/10' : 'hover:bg-white/80'
              }`}
            >
              <div className="relative">
                <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-full object-cover border border-slate-200" />
                {c.online && (
                  <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white absolute bottom-0 end-0" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <strong className="text-xs font-black text-slate-900 truncate block">{c.name}</strong>
                  <span className="text-[10px] text-slate-400">{c.time}</span>
                </div>
                <span className="text-[10px] text-slate-500 block truncate">{c.lastMessage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Live Chat Feed (8 cols) */}
      <div className="lg:col-span-8 flex flex-col justify-between p-6 space-y-4">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
              alt="Mohammed Ali"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <strong className="text-sm font-black text-slate-900 block">AutoTech Premier Garage</strong>
              <span className="text-[10px] text-slate-500 block">Mohammed Ali • Master Diagnostic Advisor</span>
            </div>
          </div>

          <button className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span>Call Garage</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 pe-2 max-h-[380px]">
          {chatHistory.map((msg, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white ms-auto rounded-br-none'
                  : 'bg-slate-100 text-slate-800 me-auto rounded-bl-none'
              }`}
            >
              <p>{msg.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1 opacity-70 text-[9px]">
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck className="w-3 h-3" />}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <button type="button" className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200">
            <Image className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message or describe a vehicle symptom..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-blue-600 font-medium"
          />
          <button type="submit" className="p-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl shadow-sm">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
