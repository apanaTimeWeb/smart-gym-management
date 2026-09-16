import { Suspense } from 'react';
// RESPONSIBILITY: Server Component entry point for the Data Export page.
import AdminDataExportMain from '@/app/admin/data-export/data_export_components/AdminDataExportMain/AdminDataExportMain';

export const metadata = { title: 'Data Export — Admin | Smart Gym 360' };

export default function DataExportPage() {
  return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <AdminDataExportMain />
    </Suspense>
  );
}
