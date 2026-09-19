// RESPONSIBILITY: Renders the empty state for Admin export history.

import { Download } from 'lucide-react';

export default function AdminDataExportEmptyState() {
  return <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
    <Download size={32} aria-hidden="true" className="text-secondary" />
    <h3 className="text-base font-semibold text-primary">No export jobs found</h3>
    <p className="text-sm text-secondary">No export history matches the current status filter.</p>
  </div>;
}
