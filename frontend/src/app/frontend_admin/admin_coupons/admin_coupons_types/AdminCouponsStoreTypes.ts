// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { CouponFormValues } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsTypes';
export interface AdminCouponsStore {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  form: CouponFormValues;
  setForm: (f: CouponFormValues) => void;
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  dateRange: string;
  setDateRange: (s: string) => void;
}
