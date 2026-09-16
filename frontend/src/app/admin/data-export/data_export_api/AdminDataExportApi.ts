// RESPONSIBILITY: Owns typed HTTP access for Admin data-export jobs and KPIs.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminDataExportUrlConfig } from '@/app/admin/data-export/admin_data_export_url_config';
import type { AdminDataExportQueryParams, DataExportKPIData, ExportFormValues, ExportJob } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';
import { dataExportKpiDataSchema, exportJobSchema } from '@/app/admin/data-export/data_export_types/AdminDataExportSchemas';

function buildQuery(params?: AdminDataExportQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const dataExportApi = {
  fetchJobs: async (params?: AdminDataExportQueryParams) => apiFetch<ApiResponse<ExportJob[]>>(`${AdminDataExportUrlConfig.api.base}/fetchJobs${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(exportJobSchema) }),
  fetchKPIs: async () => apiFetch<ApiResponse<DataExportKPIData>>(`${AdminDataExportUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: dataExportKpiDataSchema }),
  createExport: async (payload: ExportFormValues) => apiFetch<ApiResponse<ExportJob>>(`${AdminDataExportUrlConfig.api.base}/createExport`, { method: 'POST', body: JSON.stringify(payload), dataSchema: exportJobSchema }),
  deleteJob: async (id: string) => apiFetch<ApiResponse<null>>(`${AdminDataExportUrlConfig.api.base}/deleteJob`, { method: 'DELETE', body: JSON.stringify({ id }), dataSchema: z.null() }),
};
