export interface SuperadminOnboardingStats {
  total: number;
  completed: number;
  inProgress: number;
  stalled: number;
  trial: number;
}
export interface SuperadminOnboardingStatsBarProps {
  stats: SuperadminOnboardingStats;
}
