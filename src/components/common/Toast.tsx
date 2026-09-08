import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 end-6 z-[10000] animate-slide-up flex items-center gap-3 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-400/30 backdrop-blur-md max-w-md">
      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
      <p className="text-sm font-medium leading-snug">{toastMessage}</p>
    </div>
  );
};
