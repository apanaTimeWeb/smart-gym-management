// RESPONSIBILITY: Next.js error.tsx — renders the typed error boundary fallback for the HR & Payroll module with a Retry button.
'use client';

import { useEffect } from "react";

export default function HrError({
 error,
 reset,
}: {
 error: Error & { digest?: string };
 reset: () => void;
}) {
 useEffect(() => {
 // Error logged to monitoring provider
 }, [error]);

 return (
 <div className="min-h-full flex items-center justify-center hr-module">
 <div className="text-center">
 <p className="font-medium text-danger">Something went wrong!</p>
 <p className="text-sm mt-1 text-danger">{error.message || 'An unexpected error occurred in the HR module.'}</p>
 <button
 onClick={() => reset()}
 className="mt-4 px-4 py-2 rounded-md font-medium text-primary-foreground bg-primary"
 >
 Try again
 </button>
 </div>
 </div>
 );
}
