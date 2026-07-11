export interface ISystem {
  id: string;
  [key: string]: any;
}

export interface ISystemListResponse {
  data: ISystem[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
