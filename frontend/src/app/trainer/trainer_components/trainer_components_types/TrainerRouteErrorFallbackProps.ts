// RESPONSIBILITY: Typed props contract for the Trainer route-level error fallback.
export interface TrainerRouteErrorFallbackProps {
  errorDigest?: string;
  moduleName: string;
  route: string;
  reset: () => void;
}
