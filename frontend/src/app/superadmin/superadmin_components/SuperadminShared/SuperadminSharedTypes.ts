// RESPONSIBILITY: Defines shared prop contracts for Superadmin V1 presentation primitives.
import type { ReactNode } from 'react';
export interface SuperadminMetricCardProps {
    label: string;
    value: string | number;
    helper?: string;
    tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}
export interface SuperadminPanelProps {
    title: string;
    description?: string;
    children: ReactNode;
    action?: ReactNode;
    className?: string;
}
export interface SuperadminProgressBarProps {
    value: number;
    label: string;
}
export interface SuperadminApexBarChartProps {
    categories: string[];
    series: Array<{
        name: string;
        data: number[];
    }>;
    height?: number;
    horizontal?: boolean;
    valueFormatter?: (value: number) => string;
}
export interface SuperadminApexDonutChartProps {
    labels: string[];
    series: number[];
    height?: number;
    valueFormatter?: (value: number) => string;
}
export interface SuperadminEmptyStateProps {
    title: string;
    description: string;
}
