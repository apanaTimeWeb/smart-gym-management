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
 // console.error('Workout Module Error:', error);
 }, [error]);

 return (
 <div className="min-h-[70vh] flex items-center justify-center p-6 bg-background">
 <div className="bg-card border border-destructive/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
 <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto text-destructive mb-2">
 <AlertTriangle size={32} />
 </div>
 
 <h2 className="text-xl font-bold text-foreground">Something went wrong!</h2>
 
 <p className="text-sm text-secondary">
 We encountered an issue loading the workout dashboard.
 </p>

 <div className="pt-4">
 <button
 onClick={() => reset()}
 className="px-6 py-2.5 bg-destructive hover:bg-destructive text-white font-medium rounded-xl transition-colors shadow-sm shadow-destructive/20"
 >
 Try again
 </button>
 </div>
 </div>
 </div>
 );
}
