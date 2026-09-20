// RESPONSIBILITY: Defines shared prop contracts for Superadmin V1 presentation primitives.
import type { ReactNode } from 'react';
export interface MetricCardProps {
    label: string;
    value: string | number;
    helper?: string;
    tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}
export interface PanelProps {
    title: string;
    description?: string;
    children: ReactNode;
    action?: ReactNode;
    className?: string;
}
export interface ProgressBarProps {
    value: number;
    label: string;
}
export interface ApexBarChartProps {
    categories: string[];
    series: Array<{
        name: string;
        data: number[];
    }>;
    height?: number;
    horizontal?: boolean;
    valueFormatter?: (value: number) => string;
}
export interface ApexDonutChartProps {
    labels: string[];
    series: number[];
    height?: number;
    valueFormatter?: (value: number) => string;
}
export interface EmptyStateProps {
    title: string;
    description: string;
}
