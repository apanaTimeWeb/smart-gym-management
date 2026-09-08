// RESPONSIBILITY: API functions for the Trainer Reports module.
// DATA FLOW: TrainerReportsApi → reports_context → TrainerReportsMain

import { apiFetch } from '@/lib/api';
import type { TrainerReportExportParams } from '@/app/trainer/reports/reports_types/TrainerReportsTypes';
import { TRAINER_REPORTS_API_ROUTES } from '@/app/trainer/reports/TrainerReportsUrlConfig';

/**
 * Exports a report as CSV for the given type and date range.
 */
export async function exportTrainerReport(params: TrainerReportExportParams): Promise<Blob> {
  const url = `${TRAINER_REPORTS_API_ROUTES.export(params.type)}?startDate=${params.startDate ?? ''}&endDate=${params.endDate ?? ''}`;
  return apiFetch<Blob>(url);
}
