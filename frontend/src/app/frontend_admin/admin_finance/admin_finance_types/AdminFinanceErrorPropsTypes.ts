// Type contract for the framework-owned error boundary of this feature.
export interface AdminFinanceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
