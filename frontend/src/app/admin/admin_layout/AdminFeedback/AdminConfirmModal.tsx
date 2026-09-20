"use client";
// RESPONSIBILITY: Renders the shared Admin confirmation dialog, including mandatory typed confirmation for destructive actions.
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { AdminConfirmType } from '@/app/admin/admin_layout/AdminFeedback/AdminConfirmTypes';
import type { AdminConfirmModalProps } from '@/app/admin/admin_layout/AdminFeedback/AdminConfirmModalTypes';

export default function AdminConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger', requireTyping = false, confirmationPhrase = 'CONFIRM' }: AdminConfirmModalProps) {
  const [typedValue, setTypedValue] = useState('');
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    setTypedValue('');
  }
  if (!isOpen) return null;
  const canConfirm = !requireTyping || typedValue.trim().toUpperCase() === confirmationPhrase.toUpperCase();
  return <div data-admin-dialog="true" tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-base" role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title">
    <div className="bg-overlay backdrop-blur-xl rounded-2xl shadow-dialog border border-border w-full max-w-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${type === 'danger' ? 'bg-danger text-on-primary' : type === 'warning' ? 'bg-warning text-on-primary' : 'bg-info text-on-info'}`}><AlertTriangle size={24} /></div>
          <div className="min-w-0"><h3 id="admin-confirm-title" className="text-lg font-bold text-primary">{title}</h3><p className="text-sm text-secondary mt-1 leading-relaxed">{message}</p></div>
        </div>
        {requireTyping && <div className="mt-5"><label htmlFor="admin-confirm-input" className="text-xs font-semibold text-secondary">Type {confirmationPhrase} to continue</label><input id="admin-confirm-input" value={typedValue} onChange={(event) => setTypedValue(event.target.value)} autoComplete="off" className="mt-2 w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Type ${confirmationPhrase} to confirm`} /></div>}
        <div className="flex gap-3 mt-6"><button type="button" onClick={onCancel} className="min-h-[44px] flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base">{cancelText}</button><button type="button" onClick={onConfirm} disabled={!canConfirm} className={`min-h-[44px] flex-1 py-2.5 rounded-xl text-sm font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${type === 'danger' ? 'bg-danger text-on-primary' : type === 'warning' ? 'bg-warning text-on-primary' : 'bg-info text-on-info'}`}>{confirmText}</button></div>
      </div>
    </div>
  </div>;
}
