"use client";
// RESPONSIBILITY: Renders the fixed bottom-right toast notification. Auto-dismisses after 4 seconds. Shared across all ADMIN modules.

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, MessageCircle, Mail, Info, AlertTriangle, X } from 'lucide-react';

import type { AdminToastProps, AdminToastType } from '@/app/admin/admin_layout/AdminFeedback/AdminToastTypes';

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

  const config: Record<AdminToastType, { icon: React.ReactNode, borderClass: string, colorClass: string, shadow: string }> = {
    success: { icon: <CheckCircle size={20} />, borderClass: 'border-l-success', colorClass: 'text-success', shadow: 'shadow-card' },
    error: { icon: <XCircle size={20} />, borderClass: 'border-l-danger', colorClass: 'text-danger', shadow: 'shadow-card' },
    whatsapp: { icon: <MessageCircle size={20} />, borderClass: 'border-l-success', colorClass: 'text-success', shadow: 'shadow-card' },
    email: { icon: <Mail size={20} />, borderClass: 'border-l-info', colorClass: 'text-info', shadow: 'shadow-card' },
    info: { icon: <Info size={20} />, borderClass: 'border-l-info', colorClass: 'text-info', shadow: 'shadow-card' },
    warning: { icon: <AlertTriangle size={20} />, borderClass: 'border-l-warning', colorClass: 'text-warning', shadow: 'shadow-card' },
  };

  const { icon, borderClass, colorClass, shadow } = config[type] || config.success;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 w-80 p-4 rounded-xl border-y border-r border-l-4 backdrop-blur-xl bg-card text-primary motion-safe:animate-in motion-safe:slide-in-from-right-8 motion-safe:fade-in motion-safe:duration-slow ${shadow} ${borderClass}`}
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
        className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary flex-shrink-0 motion-safe:transition-colors p-1 rounded-md hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}