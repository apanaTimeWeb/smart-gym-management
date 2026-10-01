// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsJobsStatsBar.tsx; no business behavior.


export interface JobsMetrics {
    activeJobs: number;
    completed24h: number;
    failed24h: number;
    delayed: number;
}

export interface SuperadminJobsStatsBarProps {
    metrics: JobsMetrics;
    onFilterSelect?: (status: string) => void;
}
