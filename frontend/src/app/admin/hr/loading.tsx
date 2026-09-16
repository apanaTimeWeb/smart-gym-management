// RESPONSIBILITY: Next.js loading.tsx � renders skeleton loader fallback while HR & Payroll module data loads.
import AdminTableSkeleton from '@/app/admin/admin_components/AdminShared/AdminTableSkeleton';

export default function HrLoading() {
 return (
  <div className="p-6">
    <div className="h-10 w-48 bg-card rounded-lg mb-6 motion-safe:animate-pulse"></div>
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-24 bg-card rounded-xl border border-border motion-safe:animate-pulse"></div>
      ))}
    </div>
    <AdminTableSkeleton cols={9} rows={6} />
  </div>
 );
}
