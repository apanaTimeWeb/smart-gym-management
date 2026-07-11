export interface IJobs {
  id: string;
  [key: string]: any;
}

export interface IJobsListResponse {
  data: IJobs[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
