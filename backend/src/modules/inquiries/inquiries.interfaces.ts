export interface IInquiry {
  id: number;
  name: string;
  phone: string;
  email?: string;
  source: string;
  status: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInquiryStats {
  total: number;
  new: number;
  followUp: number;
  converted: number;
  lost: number;
}
