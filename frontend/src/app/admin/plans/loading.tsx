// RESPONSIBILITY: Provides the implementation for loading.tsx functionality within its module.
import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 bg-card rounded-xl motion-safe:animate-pulse motion-safe:duration-base"></div>
 <AdminTableSkeleton rows={8} />
 
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
 {["row-1", "row-2", "row-3"].map(i => (
 <div key={`plans-skeleton-${i}`} className="h-96 bg-card rounded-2xl motion-safe:animate-pulse motion-safe:duration-base"></div>
 ))}
 </div>
 </div>
 );
}

