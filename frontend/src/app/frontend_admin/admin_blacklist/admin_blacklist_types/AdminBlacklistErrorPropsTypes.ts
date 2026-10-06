// Type contract for the framework-owned error boundary of this feature.
export interface AdminBlacklistErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
