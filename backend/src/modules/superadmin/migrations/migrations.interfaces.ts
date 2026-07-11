export interface IMigrations {
  id: string;
  [key: string]: any;
}

export interface IMigrationsListResponse {
  data: IMigrations[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
