// RESPONSIBILITY: Renders/orchestrates SuperadminReportsExportButton within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminReportsExportButton owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsExportButtonTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Reports Export Button component and its associated UI logic.
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminReportsExportButtonProps } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_types/SuperadminReportsExportButtonTypes';



/**
 * Responsibility: Renders the SuperadminReportsExportButton UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminReportsExportButton({ onExportCSV, onExportPDF, isExporting = false }: SuperadminReportsExportButtonProps) {
  const t = useTranslations('superadmin_reports');
    return (<div className="flex gap-2">
      <button onClick={onExportCSV} disabled={isExporting} aria-busy={isExporting} className="flex items-center gap-2 px-4 py-2 bg-input border border-border text-secondary hover:text-primary rounded-lg text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_reports-superadmin-reports-export-button-reports-export-button-button">
        <Download size={18} strokeWidth={2}/>{isExporting ? t('ui.exporting_6cf5a1d2') : t('ui.export_csv_0e36f4bc')}
      </button>
      <button onClick={onExportPDF} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm shadow-card shadow-card motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_reports-superadmin-reports-export-button-reports-export-button-pdf">
        <Download size={18} strokeWidth={2}/> {t('ui.pdf_bcd1b686')}</button>
    </div>);
}
