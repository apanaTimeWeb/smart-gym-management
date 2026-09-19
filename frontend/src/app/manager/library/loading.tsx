// RESPONSIBILITY: Next.js loading.tsx � renders skeleton loader fallback while Diet Library module data loads.
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"><div className="m-5 h-5 w-48 rounded bg-skeleton-highlight" /></div>
 <ManagerTableSkeleton rows={8} />
 </div>
 );
}
