// Type contract for the framework-owned error boundary of this feature.
export interface AdminCouponsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
