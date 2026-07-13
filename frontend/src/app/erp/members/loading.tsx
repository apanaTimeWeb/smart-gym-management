// RESPONSIBILITY: Renders the loading fallback for the members module.
import { TableSkeleton } from '@/app/erp/erp_components/ErpShared/TableSkeleton';
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 bg-card rounded-xl animate-pulse"></div>
 
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {[1, 2, 3, 4].map(i => (
 <div key={i} className="h-[90px] bg-card rounded-xl animate-pulse"></div>
 ))}
 </div>
 
 <div className="h-16 bg-card rounded-xl animate-pulse"></div>
 <TableSkeleton rows={8} />
 </div>
 );
}
