export interface IGyms {
  id: string;
  [key: string]: any;
}

export interface IGymsListResponse {
  data: IGyms[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
