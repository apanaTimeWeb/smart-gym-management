// RESPONSIBILITY: loading.tsx handles the logic and UI for its corresponding feature.
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-background">
 <div className="h-20 bg-card rounded-xl animate-pulse"></div>
 
 {/* Banner Skeleton */}
 <div className="h-32 bg-card rounded-xl animate-pulse"></div>

 {/* Main Content Skeleton */}
 <div className="h-[32rem] bg-card rounded-xl animate-pulse mt-6"></div>
 </div>
 );
}
