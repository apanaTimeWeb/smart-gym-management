'use client';

import { useEffect } from 'react';

export default function Error({
 error,
 reset,
}: {
 error: Error & { digest?: string };
 reset: () => void;
}) {
 useEffect(() => {
 console.error('Landing Page Error:', error);
 }, [error]);

 return (
 <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
 <div className="bg-[#0f0f0f] border border-[var(--danger)]/30 p-8 rounded-3xl max-w-md w-full text-center space-y-4 shadow-2xl">
 <h2 className="text-2xl font-black text-white">Oops! Something went wrong.</h2>
 <p className="text-gray-400 text-sm">
 We couldn&apos;t load the landing page successfully. Please try refreshing.
 </p>
 <button
 onClick={() => reset()}
 className="mt-4 px-8 py-3 bg-[var(--danger)] hover:bg-[var(--danger)] text-white font-bold rounded-xl transition-all"
 >
 Try Again
 </button>
 </div>
 </div>
 );
}
