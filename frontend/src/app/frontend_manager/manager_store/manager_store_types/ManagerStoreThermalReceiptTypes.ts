// DATA FLOW: API/server state → ManagerStoreThermalReceiptTypes → owning feature UI; UI events/mutations → ManagerStoreThermalReceiptTypes → module API → TanStack Query cache/UI.
// RESPONSIBILITY: Defines the Store-owned thermal receipt data and presentation contract.
export interface ManagerStoreReceiptData {
  gymName: string;
  gymPhone: string;
  receiptNo: string;
  date: string;
  customerName: string;
  items: { name: string; qty?: number; price: number; amount: number }[];
  total: number;
  paymentMethod: string;
}

export interface ManagerStoreThermalReceiptProps {
  data: ManagerStoreReceiptData | null;
}
