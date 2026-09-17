// RESPONSIBILITY: Renders a reusable Superadmin-only ApexCharts donut chart. No business logic.
'use client';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import type { SuperadminV1ApexDonutChartProps } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1SharedTypes';
export default function SuperadminV1ApexDonutChart({ labels, series, height = 260, valueFormatter }: SuperadminV1ApexDonutChartProps) {
    const options: ApexOptions = {
        chart: { type: 'donut', background: 'transparent' },
        labels,
        colors: ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--info)', 'var(--purple)', 'var(--danger)'],
        stroke: { show: false },
        dataLabels: { enabled: false },
        legend: { position: 'bottom', labels: { colors: 'var(--text-secondary)' } },
        tooltip: { theme: 'dark', y: { formatter: valueFormatter } },
    };
    return <Chart options={options} series={series} type="donut" height={height}/>;
}
