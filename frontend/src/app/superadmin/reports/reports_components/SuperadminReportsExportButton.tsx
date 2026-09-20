// RESPONSIBILITY: Renders the Reports Export Button component and its associated UI logic.
'use client';
import { Download } from 'lucide-react';
import type { SuperadminReportsExportButtonProps } from '@/app/superadmin/reports/reports_types/SuperadminReportsExportButtonTypes';

export function SuperadminReportsExportButton({ onExportCSV, onExportPDF }: SuperadminReportsExportButtonProps) {
    return (<div className="flex gap-2">
      <button onClick={onExportCSV} className="flex items-center gap-2 px-4 py-2 bg-input border border-border text-secondary hover:text-primary rounded-lg text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <Download size={18} strokeWidth={2}/> CSV
      </button>
      <button onClick={onExportPDF} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm shadow-card shadow-card motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <Download size={18} strokeWidth={2}/> PDF
      </button>
    </div>);
}
