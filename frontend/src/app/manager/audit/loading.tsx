// RESPONSIBILITY: Provides the implementation for loading.tsx functionality within its module.
import { TableSkeleton } from '@/app/manager/manager_components/ManagerShared/TableSkeleton';

export default function AuditLoading() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="h-8 w-48 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-64 bg-black/5 dark:bg-white/5 rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-black/5 dark:bg-white/5 rounded-lg animate-pulse" />
      </div>

      <div className="flex-1 bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <TableSkeleton rows={8} columns={5} />
      </div>
    </div>
  );
}
