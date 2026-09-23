// RESPONSIBILITY: Defines the immutable queue vocabulary for Superadmin export jobs.
// FLOW: ExportDataService -> export queue name -> ExportDataJobEntity / worker.
export const EXPORT_DATA_QUEUE_NAME = 'superadmin-export' as const;
export const EXPORT_DATA_STATUS = 'QUEUED' as const;
