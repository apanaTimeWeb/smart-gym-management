// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminCampaignsSectionStateProps {
  message: string;
  loading?: boolean;
  retry?: () => void;
}
