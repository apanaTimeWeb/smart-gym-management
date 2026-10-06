// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminAuditLogsStore {
  actorFilter: string;
  setActorFilter: (value: string) => void;
  actionFilter: string;
  setActionFilter: (value: string) => void;
  entityFilter: string;
  setEntityFilter: (value: string) => void;
  dateFrom: string;
  setDateFrom: (value: string) => void;
  dateTo: string;
  setDateTo: (value: string) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  selectedLogId: string | null;
  setSelectedLogId: (value: string | null) => void;
}
