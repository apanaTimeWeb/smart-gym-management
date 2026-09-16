"use client";
// RESPONSIBILITY: Renders the fixed bottom-right toast notification. Auto-dismisses after 4 seconds. Shared across all ADMIN modules.

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, MessageCircle, Mail, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'whatsapp' | 'email' | 'error' | 'success' | 'info' | 'warning';

interface AdminToastProps {
  id?: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function AdminToast({ id, message, type, onClose }: AdminToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, message, onClose]);

  if (!visible) return null;

  const config: Record<ToastType, { icon: React.ReactNode, borderClass: string, colorClass: string, shadow: string }> = {
    success: { icon: <CheckCircle size={20} />, borderClass: 'border-l-success', colorClass: 'text-success', shadow: 'shadow-lg' },
    error: { icon: <XCircle size={20} />, borderClass: 'border-l-danger', colorClass: 'text-danger', shadow: 'shadow-lg' },
    whatsapp: { icon: <MessageCircle size={20} />, borderClass: 'border-l-success', colorClass: 'text-success', shadow: 'shadow-lg' },
    email: { icon: <Mail size={20} />, borderClass: 'border-l-info', colorClass: 'text-info', shadow: 'shadow-lg' },
    info: { icon: <Info size={20} />, borderClass: 'border-l-info', colorClass: 'text-info', shadow: 'shadow-lg' },
    warning: { icon: <AlertTriangle size={20} />, borderClass: 'border-l-warning', colorClass: 'text-warning', shadow: 'shadow-lg' },
  };

  const { icon, borderClass, colorClass, shadow } = config[type] || config.success;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 w-80 p-4 rounded-xl border-y border-r border-l-4 border-y-white/5 border-r-white/5 backdrop-blur-xl bg-card/90 text-foreground motion-safe:animate-in motion-safe:slide-in-from-right-8 motion-safe:fade-in motion-safe:duration-300 ${shadow} ${borderClass}`}
    >
      <div className={`${colorClass} flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 text-sm font-semibold">
        {message}
      </div>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="text-secondary hover:text-foreground flex-shrink-0 motion-safe:transition-colors p-1 rounded-md hover:bg-card/10"
      >
        <X size={16} />
      </button>
    </div>
  );
}