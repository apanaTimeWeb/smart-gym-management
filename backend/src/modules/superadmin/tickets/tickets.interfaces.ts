export interface ITickets {
  id: string;
  [key: string]: any;
}

export interface ITicketsListResponse {
  data: ITickets[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
