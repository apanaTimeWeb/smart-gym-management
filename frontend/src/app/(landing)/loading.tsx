export default function Loading() {
 return (
 <div className="min-h-screen bg-background flex flex-col">
 {/* Navbar Skeleton */}
 <div className="h-16 border-b border-white/10 bg-black/50"></div>
 
 {/* Hero Skeleton */}
 <div className="flex-1 flex items-center justify-center relative bg-card">
 <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
 <div className="relative z-10 w-full max-w-4xl px-4 space-y-6 flex flex-col items-center">
 <div className="h-8 w-48 bg-white/10 rounded-full animate-pulse"></div>
 <div className="h-16 w-3/4 sm:w-1/2 bg-white/10 rounded-2xl animate-pulse"></div>
 <div className="h-16 w-full sm:w-2/3 bg-white/10 rounded-2xl animate-pulse"></div>
 <div className="h-24 w-full sm:w-3/4 bg-white/10 rounded-2xl animate-pulse mt-4"></div>
 <div className="flex gap-4 mt-8 w-full justify-center">
 <div className="h-14 w-40 bg-white/10 rounded-2xl animate-pulse"></div>
 <div className="h-14 w-40 bg-white/10 rounded-2xl animate-pulse"></div>
 </div>
 </div>
 </div>
 </div>
 );
}
