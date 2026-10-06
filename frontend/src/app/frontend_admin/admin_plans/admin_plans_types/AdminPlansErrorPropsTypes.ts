// Type contract for the framework-owned error boundary of this feature.
export interface AdminPlansErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
