"use client";

import { AlertTriangle, X } from 'lucide-react';

interface ErpConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export default function ErpConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}: ErpConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              type === 'danger' ? 'bg-[var(--danger-bg)] text-[var(--danger)]' :
              type === 'warning' ? 'bg-[var(--warning-bg)] text-[var(--warning)]' :
              'bg-[var(--info-bg)] text-[var(--info)]'
            }`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 py-2.5 border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 ${
                type === 'danger' ? 'bg-[var(--danger)]' :
                type === 'warning' ? 'bg-[var(--warning)]' :
                'bg-[var(--info)]'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
