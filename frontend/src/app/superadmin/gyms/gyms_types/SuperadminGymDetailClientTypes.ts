// RESPONSIBILITY: Defines the prop contract for the legacy Superadmin gym detail view.
// DATA FLOW: Dynamic route param → SuperadminGymDetailClientProps → SuperadminGymDetailClient.
export interface SuperadminGymDetailClientProps {
  gymId: string;
}

export interface SuperadminGymDetailRowProps {
  label: string;
  value: string | null | undefined;
  emphasis?: boolean;
  emphasisWarning?: boolean;
}
