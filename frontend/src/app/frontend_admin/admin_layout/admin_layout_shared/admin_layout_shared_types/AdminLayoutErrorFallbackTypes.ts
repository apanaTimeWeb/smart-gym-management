// RESPONSIBILITY: Defines the public prop contract for the shared Admin error fallback.
export interface AdminErrorFallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
  moduleName: string;
}
