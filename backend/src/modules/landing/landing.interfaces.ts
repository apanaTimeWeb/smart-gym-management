export interface LandingResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ILandingInquiry {
  id: string;
  type: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  createdAt: Date;
}
