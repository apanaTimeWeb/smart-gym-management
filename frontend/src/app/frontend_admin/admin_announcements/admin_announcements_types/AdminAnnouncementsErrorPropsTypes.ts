// Type contract for the framework-owned error boundary of this feature.
export interface AdminAnnouncementsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
