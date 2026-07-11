export interface IDashboard {
  id: string;
  [key: string]: any;
}

export interface IDashboardListResponse {
  data: IDashboard[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
