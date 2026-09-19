// RESPONSIBILITY: Renders a reusable Superadmin-only ApexCharts donut chart. No business logic.
'use client';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import type { ApexDonutChartProps } from '@/components/ui/SharedTypes';
export default function ApexDonutChart({ labels, series, height = 260, valueFormatter }: ApexDonutChartProps) {
    const options: ApexOptions = {
        chart: { type: 'donut', background: 'transparent' },
        labels,
        colors: ['var(--chart-primary)', 'var(--chart-success)', 'var(--chart-warning)', 'var(--chart-info)', 'var(--chart-secondary)', 'var(--chart-danger)'],
        stroke: { show: false },
        dataLabels: { enabled: false },
        legend: { position: 'bottom', labels: { colors: 'var(--text-secondary)' } },
        tooltip: { theme: 'dark', y: { formatter: valueFormatter } },
    };
    return <Chart options={options} series={series} type="donut" height={height}/>;
}
