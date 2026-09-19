// INFRASTRUCTURE BOUNDARY: Zero-business chart token bridge; domain series/status mappings remain feature-owned.
// RESPONSIBILITY: Provides the canonical semantic CSS-variable bridge consumed by Superadmin ApexCharts options.
/**
 * Chart colors intentionally remain CSS variables so the global theme controls dark/light values.
 * Callers receive semantic chart tokens; no feature should introduce a second hex palette.
 */
export const CHART_COLORS = {
    PRIMARY: 'var(--chart-primary)',
    TEXT_SECONDARY: 'var(--text-secondary)',
    BORDER: 'var(--border)',
    GRID: 'var(--chart-grid)',
    SUCCESS: 'var(--chart-success)',
    DANGER: 'var(--chart-danger)',
    WARNING: 'var(--chart-warning)',
    INFO: 'var(--chart-info)',
    PURPLE: 'var(--chart-secondary)',
    WHITE: 'var(--text-primary)',
    TOOLTIP_BACKGROUND: 'var(--chart-tooltip-bg)',
} as const;
