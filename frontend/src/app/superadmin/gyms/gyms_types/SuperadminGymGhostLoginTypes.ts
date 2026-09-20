// RESPONSIBILITY: Defines the UI-only ghost-login tenant and state contracts for the Superadmin Gyms feature.
export interface SuperadminGymGhostTenant {
  id: string;
  name: string;
  plan: string;
  adminEmail: string;
}

export interface SuperadminGymGhostLoginState {
  ghostTenant: SuperadminGymGhostTenant | null;
  startGhostLogin: (tenant: SuperadminGymGhostTenant) => void;
  exitGhostLogin: () => Promise<void>;
}
