export interface IInvoices {
  id: string;
  [key: string]: any;
}

export interface IInvoicesListResponse {
  data: IInvoices[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
