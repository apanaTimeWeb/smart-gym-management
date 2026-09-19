// RESPONSIBILITY: Provides the implementation for loading.tsx functionality within its module.
import ManagerTableSkeleton from '@/app/manager/manager_components/ManagerShared/ManagerTableSkeleton';
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 bg-card rounded-xl motion-safe:animate-pulse"></div>
 <div className="h-18 bg-card rounded-xl motion-safe:animate-pulse"></div>
 <ManagerTableSkeleton rows={8} />
 </div>
 );
}
