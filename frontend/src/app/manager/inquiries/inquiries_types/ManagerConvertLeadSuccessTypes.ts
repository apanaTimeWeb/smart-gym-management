// RESPONSIBILITY: Type definitions for the owning Manager UI component.

export interface ManagerConvertLeadSuccessProps {
  successData: {
    gymId: string;
    name: string;
    phone: string;
    planName: string;
    joinDate: string;
    expiryDate: string;
    paidAmount: number;
    pendingAmount: number;
    aadhaar?: string;
  };
  closeConvert: () => void;
}
