'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
 error,
 reset,
}: {
 error: Error & { digest?: string };
 reset: () => void;
}) {
 useEffect(() => {
 console.error('Settings Module Error:', error);
 }, [error]);

 return (
 <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[var(--bg-page)]">
 <div className="bg-[var(--bg-card)] border border-[var(--danger)]/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
 <div className="w-16 h-16 bg-[var(--danger)]/10 rounded-full flex items-center justify-center mx-auto text-[var(--danger)] mb-2">
 <AlertTriangle size={32} />
 </div>
 
 <h2 className="text-xl font-bold text-[var(--text-primary)]">Something went wrong!</h2>
 
 <p className="text-sm text-[var(--text-secondary)]">
 We encountered an issue loading the settings dashboard.
 </p>

 <div className="pt-4">
 <button
 onClick={() => reset()}
 className="px-6 py-2.5 bg-[var(--danger)] hover:bg-[var(--danger)] text-white font-medium rounded-xl transition-colors shadow-sm shadow-[var(--danger)]/20"
 >
 Try again
 </button>
 </div>
 </div>
 </div>
 );
}
