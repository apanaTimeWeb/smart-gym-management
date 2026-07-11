export interface IPlans {
  id: string;
  [key: string]: any;
}

export interface IPlansListResponse {
  data: IPlans[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
