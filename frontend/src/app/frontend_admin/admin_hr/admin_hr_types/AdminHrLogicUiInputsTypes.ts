// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminHrLogicUiInputs {
  editId: string | null;
  setShowModal: (open: boolean) => void;
  setShowPayrollModal: (open: boolean) => void;
}
