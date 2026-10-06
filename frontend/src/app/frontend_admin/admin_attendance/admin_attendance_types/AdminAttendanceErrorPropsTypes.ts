// Type contract for the framework-owned error boundary of this feature.
export interface AdminAttendanceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
