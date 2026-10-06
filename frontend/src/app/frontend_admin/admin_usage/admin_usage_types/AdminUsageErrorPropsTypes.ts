// Type contract for the framework-owned error boundary of this feature.
export interface AdminUsageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
