// Type contract for the framework-owned error boundary of this feature.
export interface AdminDataExportErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
