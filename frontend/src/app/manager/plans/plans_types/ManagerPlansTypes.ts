// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Plans module. Single source of truth for plan data shapes.


export interface PlansInitialData {
  plans: Plan[];
}

export interface ManagerPlansViewModel {
  plans: Plan[];
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  saving: boolean;
  search: string; setSearch: (value: string) => void;
  currentPage: number; setCurrentPage: (value: number) => void;
  tierFilter: string; setTierFilter: (value: string) => void;
  statusFilter: string; setStatusFilter: (value: string) => void;
  filteredPlans: Plan[];
  requestModalPlan: Plan | null;
  openRequestModal: (plan: Plan) => void;
  closeRequestModal: () => void;
  submitChangeRequest: (note: string) => Promise<void>;
  activeTab: string; setActiveTab: (value: string) => void;
}

export interface Plan {
  id: string; name: string; tier: string;
  price1Month: number; price3Month: number;
  price6Month: number; price12Month: number;
  features: string[]; isActive: boolean;
}
