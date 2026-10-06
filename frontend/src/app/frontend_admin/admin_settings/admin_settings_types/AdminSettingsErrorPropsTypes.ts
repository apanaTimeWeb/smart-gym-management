// Type contract for the framework-owned error boundary of this feature.
export interface AdminSettingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
