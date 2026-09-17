// RESPONSIBILITY: Renders a small reusable ApexCharts bar chart for Superadmin-only analytics. No business logic.
'use client';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import type { SuperadminV1ApexBarChartProps } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1SharedTypes';
export default function SuperadminV1ApexBarChart({ categories, series, height = 260, horizontal = false, valueFormatter, }: SuperadminV1ApexBarChartProps) {
    const options: ApexOptions = {
        chart: { type: 'bar', toolbar: { show: false }, background: 'transparent' },
        colors: ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--danger)', 'var(--info)'],
        plotOptions: { bar: { horizontal, borderRadius: 4, columnWidth: '52%' } },
        dataLabels: { enabled: false },
        xaxis: { categories, labels: { style: { colors: 'var(--text-secondary)' } }, axisBorder: { show: false }, axisTicks: { show: false } },
        yaxis: { labels: { style: { colors: 'var(--text-secondary)' }, formatter: valueFormatter } },
        grid: { borderColor: 'var(--border)', strokeDashArray: 4 },
        legend: { position: 'bottom', labels: { colors: 'var(--text-secondary)' } },
        tooltip: { theme: 'dark', y: { formatter: valueFormatter } },
        stroke: { show: true, width: 1, colors: ['transparent'] },
    };
    return <Chart options={options} series={series} type="bar" height={height}/>;
}
