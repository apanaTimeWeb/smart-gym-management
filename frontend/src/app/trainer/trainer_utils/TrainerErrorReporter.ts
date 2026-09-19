// RESPONSIBILITY: Sends sanitized Trainer error telemetry to the parent application's approved monitoring adapter without exposing diagnostics in UI.
export interface TrainerErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}
export function reportTrainerError(report: TrainerErrorReport) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('smart-gym:trainer-error', { detail: report }));
}
