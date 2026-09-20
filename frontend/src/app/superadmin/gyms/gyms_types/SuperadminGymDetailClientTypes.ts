// RESPONSIBILITY: Defines the client-only route prop and tab identifiers for the Superadmin Gym Detail view.
export interface SuperadminGymDetailClientProps {
  gymId: string;
}

export const SUPERADMIN_GYM_DETAIL_CLIENT_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'branches', label: 'Branches & Franchises' },
  { id: 'lifecycle', label: 'Lifecycle & Billing' },
  { id: 'whitelabel', label: 'White-labeling' },
] as const;

export type SuperadminGymDetailClientTab = typeof SUPERADMIN_GYM_DETAIL_CLIENT_TABS[number]['id'];
