// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
 useEffect(() => { /* console.error(error); */ }, [error]);

 return (
 <div className="min-h-screen flex flex-col bg-[#0F0F1A] items-center justify-center p-4">
 <h2 className="text-2xl font-bold text-white mb-4">Something went wrong!</h2>
 <button onClick={() => reset()} className="px-4 py-2 bg-[#6366F1] text-white rounded-lg">Try again</button>
 </div>
 );
}

