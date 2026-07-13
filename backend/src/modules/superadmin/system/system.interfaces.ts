
export interface IReleaseNote {
  id: string;
  version: string;
  title: string;
  content: string;
  date: Date;
  isPublished: boolean;
}

export interface SystemResponse {
  success: boolean;
  message: string;
  data: IReleaseNote | IReleaseNote[] | any | null;
}
