// RESPONSIBILITY: Next.js loading.tsx � renders skeleton loader fallback while Attendance tracking module data loads.
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 bg-skeleton-base bg-skeleton-highlight rounded-xl motion-safe:animate-pulse"></div>
 
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {[1, 2, 3].map(i => (
 <div key={`skeleton-${i}`} className="h-24 bg-card rounded-xl motion-safe:animate-pulse"></div>
 ))}
 </div>
 
 <ManagerTableSkeleton rows={8} />
 </div>
 );
}
