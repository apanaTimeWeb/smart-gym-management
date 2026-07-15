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

export interface InquiryResponse {
  success: boolean;
  message: string;
  data: IInquiry;
}

export interface InquiriesListResponse {
  success: boolean;
  message: string;
  data: {
    inquiries: IInquiry[];
    total: number;
  };
}

export interface InquiryStatsResponse {
  success: boolean;
  message: string;
  data: IInquiryStats;
}
