// Type contract for the framework-owned error boundary of this feature.
export interface AdminHrErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
