// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { BlacklistActiveTab } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';
import type { BlacklistFormValues } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';
export interface AdminBlacklistStore {
  activeTab: BlacklistActiveTab;
  setActiveTab: (t: BlacklistActiveTab) => void;
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  form: BlacklistFormValues;
  setForm: (f: BlacklistFormValues) => void;
  search: string;
  setSearch: (s: string) => void;
  scopeFilter: string;
  setScopeFilter: (s: string) => void;
  gymFilter: string;
  setGymFilter: (g: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
}
