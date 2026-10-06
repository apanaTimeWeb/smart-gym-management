// Type contract for the framework-owned error boundary of this feature.
export interface AdminDashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
