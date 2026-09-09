// RESPONSIBILITY: Provides the implementation for loading.tsx functionality within its module.
import AdminTableSkeleton from '@/app/admin/admin_components/AdminShared/AdminTableSkeleton';

export default function FinanceLoading() {
 return (
  <div className="p-6">
    <div className="h-10 w-48 bg-card rounded-lg mb-6 motion-safe:animate-pulse"></div>
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-24 bg-card rounded-xl border border-border motion-safe:animate-pulse"></div>
      ))}
    </div>
    <AdminTableSkeleton cols={6} rows={6} />
  </div>
 );
}
