// RESPONSIBILITY: API client for the Data Export module.
import type { ExportJob, ExportFormValues, DataExportKPIData } from '@/app/admin/data-export/data_export_types/data_export_types';
import { MOCK_EXPORT_JOBS, MOCK_DATA_EXPORT_KPI } from '@/app/admin/data-export/data_export_utils/AdminDataExportSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";
export const dataExportApi = {
  fetchJobs: async () => {
            return apiFetch<ApiResponse<ExportJob[]>>('/admin/dataExport/fetchJobs', { method: 'GET', dataSchema: z.unknown() });
        },
  fetchKPIs: async () => {
            return apiFetch<ApiResponse<DataExportKPIData>>('/admin/dataExport/fetchKPIs', { method: 'GET', dataSchema: z.unknown() });
        },
  createExport: async (payload: ExportFormValues) => {
          return apiFetch<ApiResponse<ExportJob>>('/admin/dataExport/createExport', { method: 'POST', body: JSON.stringify(payload), dataSchema: z.unknown() });
      },
  deleteJob: async (id: string) => {
          return apiFetch<ApiResponse<void>>('/admin/dataExport/deleteJob', { method: 'DELETE', body: JSON.stringify(id), dataSchema: z.unknown() });
      },
};
