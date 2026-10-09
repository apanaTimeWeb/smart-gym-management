"use client";
// RESPONSIBILITY: Sends sanitized Trainer error telemetry to the parent application's approved monitoring adapter without exposing diagnostics in UI.
export interface TrainerInfrastructureErrorReport {
  module: string;
  route: string;
  timestamp: string;
  errorDigest?: string;
}
/**
 * @description Sends sanitized Trainer error telemetry to the parent application's approved monitoring adapter without exposing diagnostics in UI.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export function TrainerInfrastructureErrorReporter(report: TrainerInfrastructureErrorReport) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('smart-gym:trainer-error', { detail: report }));
}
