// Type contract for the framework-owned error boundary of this feature.
export interface AdminCampaignsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
