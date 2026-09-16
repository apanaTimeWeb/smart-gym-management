"use client";
// RESPONSIBILITY: Renders the shared Admin confirmation dialog, including mandatory typed confirmation for destructive actions.
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { AdminConfirmType } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmTypes';
import type { AdminConfirmModalProps } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmModalTypes';

export default function AdminConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger', requireTyping = false, confirmationPhrase = 'CONFIRM' }: AdminConfirmModalProps) {
  const [typedValue, setTypedValue] = useState('');
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    setTypedValue('');
  }
  if (!isOpen) return null;
  const canConfirm = !requireTyping || typedValue.trim().toUpperCase() === confirmationPhrase.toUpperCase();
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200" role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title">
    <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/5 w-full max-w-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${type === 'danger' ? 'bg-danger/10 text-danger' : type === 'warning' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'}`}><AlertTriangle size={24} /></div>
          <div className="min-w-0"><h3 id="admin-confirm-title" className="text-lg font-bold text-foreground">{title}</h3><p className="text-sm text-secondary mt-1 leading-relaxed">{message}</p></div>
        </div>
        {requireTyping && <div className="mt-5"><label htmlFor="admin-confirm-input" className="text-xs font-semibold text-secondary">Type {confirmationPhrase} to continue</label><input id="admin-confirm-input" value={typedValue} onChange={(event) => setTypedValue(event.target.value)} autoComplete="off" className="mt-2 w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm text-foreground" aria-label={`Type ${confirmationPhrase} to confirm`} /></div>}
        <div className="flex gap-3 mt-6"><button type="button" onClick={onCancel} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-card/5 motion-safe:transition-colors">{cancelText}</button><button type="button" onClick={onConfirm} disabled={!canConfirm} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground motion-safe:transition-all disabled:opacity-50 disabled:cursor-not-allowed ${type === 'danger' ? 'bg-danger' : type === 'warning' ? 'bg-warning' : 'bg-info'}`}>{confirmText}</button></div>
      </div>
    </div>
  </div>;
}
