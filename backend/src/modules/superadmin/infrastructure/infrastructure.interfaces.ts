export interface IInfrastructure {
  id: string;
  [key: string]: any;
}

export interface IInfrastructureListResponse {
  data: IInfrastructure[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
