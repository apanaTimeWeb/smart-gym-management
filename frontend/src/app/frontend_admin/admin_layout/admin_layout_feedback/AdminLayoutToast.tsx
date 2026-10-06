"use client";
// RESPONSIBILITY: Renders the fixed bottom-right toast notification. Auto-dismisses after 4 seconds. Shared across all ADMIN modules.
import { useTranslations } from 'next-intl';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, MessageCircle, Mail, Info, AlertTriangle, X } from 'lucide-react';

import type { AdminToastProps, AdminToastType } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/admin_layout_feedback_types/AdminLayoutToastTypes';

/**
 * AdminLayoutToast renders the admin toast UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminLayoutToast({ id, message, type, onClose }: AdminToastProps) {
  const t = useTranslations();

  const [visible, setVisible] = useState(true);

// EFFECT: Synchronizes this component effect with its declared React dependencies in admin_layout/admin_layout_feedback/AdminLayoutToast.tsx.
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
    success: { icon: <CheckCircle size={18}  strokeWidth={2}/>, borderClass: 'border-l-success', colorClass: 'text-success', shadow: 'shadow-card' },
    error: { icon: <XCircle size={18}  strokeWidth={2}/>, borderClass: 'border-l-danger', colorClass: 'text-danger', shadow: 'shadow-card' },
    whatsapp: { icon: <MessageCircle size={18}  strokeWidth={2}/>, borderClass: 'border-l-success', colorClass: 'text-success', shadow: 'shadow-card' },
    email: { icon: <Mail size={18}  strokeWidth={2}/>, borderClass: 'border-l-info', colorClass: 'text-info', shadow: 'shadow-card' },
    info: { icon: <Info size={18}  strokeWidth={2}/>, borderClass: 'border-l-info', colorClass: 'text-info', shadow: 'shadow-card' },
    warning: { icon: <AlertTriangle size={18}  strokeWidth={2}/>, borderClass: 'border-l-warning', colorClass: 'text-warning', shadow: 'shadow-card' },
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
      <button type="button"
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary flex-shrink-0 motion-safe:transition-colors p-1 rounded-md hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
        aria-label={t('admin_layout.AdminLayoutToast.text_dc83cd8031')}
       data-testid="admin_layout-admin-toast-back">
        <X size={18}  strokeWidth={2}/>
      </button>
    </div>
  );
}
