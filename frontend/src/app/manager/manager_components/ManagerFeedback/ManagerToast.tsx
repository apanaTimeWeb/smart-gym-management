// RESPONSIBILITY: Renders the fixed bottom-right toast notification. Auto-dismisses after 4 seconds. Shared across all MANAGER modules.
'use client';

import { useEffect } from 'react';

export type ToastType = 'whatsapp' | 'email' | 'error' | 'success';

interface ManagerToastProps {
 message: string;
 type: ToastType;
 onClose: () => void;
}

export default function ManagerToast({ message, type, onClose }: ManagerToastProps) {
 useEffect(() => {
 const timer = setTimeout(onClose, 4000);
 return () => clearTimeout(timer);
 }, [onClose]);

 const config = {
 success: { prefix: '✅', border: 'var(--success)' },
 error: { prefix: '❌', border: 'var(--danger)' },
 whatsapp: { prefix: '💬', border: 'var(--success)' },
 email: { prefix: '📧', border: 'var(--info)' },
 };

 const { prefix, border } = config[type] || config.success;

 return (
 <div
 className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 w-80 p-4 rounded-xl shadow-2xl bg-card text-foreground"
 style={{ 
 borderLeft: `4px solid ${border}`,
 animation: 'toastIn 0.3s ease-out forwards'
 }}
 >
 <div className="flex-1 text-sm font-semibold">
 {prefix} {message}
 </div>
 <button
 onClick={onClose}
 className="text-secondary hover:text-white flex-shrink-0 transition-colors"
 >
 ✕
 </button>
 <style>{`
 @keyframes toastIn {
 from { opacity: 0; transform: translate(-50%, -100%); }
 to { opacity: 1; transform: translate(-50%, 0); }
 }
 `}</style>
 </div>
 );
}
