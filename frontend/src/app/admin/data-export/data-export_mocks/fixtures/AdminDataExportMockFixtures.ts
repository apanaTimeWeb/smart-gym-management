// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin data-export feature.

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin data-export feature.
import type { ExportJob, DataExportKPIData } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';

export const MOCK_EXPORT_JOBS: ExportJob[] = [
  { id: 'exp1', dataType: 'members', format: 'csv', gymIds: ['all'], gymNames: ['All Gyms'], dateFrom: '2026-06-01', dateTo: '2026-06-30', status: 'completed', rowCount: 1842, fileSizeKb: 284, createdAt: '2026-07-01T10:00:00', completedAt: '2026-07-01T10:00:45', createdBy: 'Admin' },
  { id: 'exp2', dataType: 'payments', format: 'excel', gymIds: ['g1', 'g2'], gymNames: ['Andheri East', 'Bandra West'], dateFrom: '2026-06-01', dateTo: '2026-06-30', status: 'completed', rowCount: 3241, fileSizeKb: 512, createdAt: '2026-07-01T09:30:00', completedAt: '2026-07-01T09:31:10', createdBy: 'Admin' },
  { id: 'exp3', dataType: 'attendance', format: 'pdf', gymIds: ['g3'], gymNames: ['Powai'], dateFrom: '2026-05-01', dateTo: '2026-05-31', status: 'completed', rowCount: 8920, fileSizeKb: 1240, createdAt: '2026-06-02T08:00:00', completedAt: '2026-06-02T08:02:30', createdBy: 'Admin' },
  { id: 'exp4', dataType: 'full_report', format: 'pdf', gymIds: ['all'], gymNames: ['All Gyms'], dateFrom: '2026-01-01', dateTo: '2026-06-30', status: 'processing', createdAt: '2026-07-08T14:00:00', createdBy: 'Admin' },
  { id: 'exp5', dataType: 'staff', format: 'csv', gymIds: ['g4'], gymNames: ['Thane'], dateFrom: '2026-06-01', dateTo: '2026-06-30', status: 'failed', createdAt: '2026-07-05T11:00:00', createdBy: 'Admin' },
];

export const MOCK_EXPORT_JOBS_EXPANDED: typeof MOCK_EXPORT_JOBS = [
  ...MOCK_EXPORT_JOBS,
  ...Array.from({ length: 10 }, (_, index) => {
    const n = index + 3;
    const base = MOCK_EXPORT_JOBS[index % MOCK_EXPORT_JOBS.length]!;
    return { ...base, id: `exp${n}`, fileName: `admin-export-${n}.csv`, status: index % 4 === 0 ? 'PROCESSING' : 'COMPLETED', createdAt: `2026-09-${String((index % 12) + 1).padStart(2, '0')}T10:00:00Z`    };
  }),
] as ExportJob[];

export const MOCK_DATA_EXPORT_KPI: DataExportKPIData = {
  totalExports: 5,
  totalRowsExported: 14003,
  lastExportDate: '2026-07-01',
  pendingJobs: 1,
};
