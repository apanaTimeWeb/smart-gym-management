// RESPONSIBILITY: Defines shared prop contracts for Superadmin V1 presentation primitives.
import type { ReactNode } from 'react';
import type { SuperadminV1MetricTone } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1SharedConstants';
export interface SuperadminV1MetricCardProps {
    label: string;
    value: string;
    helper?: string;
    tone?: SuperadminV1MetricTone;
}
export interface SuperadminV1PanelProps {
    title: string;
    description?: string;
    children: ReactNode;
    action?: ReactNode;
    className?: string;
}
export interface SuperadminV1ProgressBarProps {
    value: number;
    label: string;
}
export interface SuperadminV1ApexBarChartProps {
    categories: string[];
    series: Array<{
        name: string;
        data: number[];
    }>;
    height?: number;
    horizontal?: boolean;
    valueFormatter?: (value: number) => string;
}
export interface SuperadminV1ApexDonutChartProps {
    labels: string[];
    series: number[];
    height?: number;
    valueFormatter?: (value: number) => string;
}
export interface SuperadminV1EmptyStateProps {
    title: string;
    description: string;
}
