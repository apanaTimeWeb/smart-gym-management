"use client";

import dynamic from 'next/dynamic';
import { useSalesContext } from '@/app/erp/sales/sales_context/SalesContext';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SalesOverview() {
  const { overviewData, loading } = useSalesContext();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-transparent border-[var(--primary)] rounded-full animate-spin" />
      </div>
    );
  }

 return (
 <div className="space-y-6">
 <div className="bg-[var(--sales-bg-card)] p-5 rounded-xl border border-[var(--sales-border)] shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none">
 <h3 className="font-bold text-[var(--sales-text-primary)] mb-2">Monthly Revenue (₹)</h3>
 <div className="h-[280px] w-full">
 <ReactApexChart 
 options={{
 chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit', parentHeightOffset: 0 },
 colors: ['#4F46E5'],
 plotOptions: { bar: { borderRadius: 6, columnWidth: '35%' } },
 dataLabels: { enabled: false },
 xaxis: { 
 categories: overviewData.map(d => d.month), 
 axisBorder: { show: false }, 
 axisTicks: { show: false },
 labels: { style: { colors: '#64748b' } }
 },
 yaxis: { 
 labels: { 
 formatter: (val) => `${(val / 1000).toFixed(0)}K`,
 style: { colors: '#64748b' }
 } 
 },
 grid: { borderColor: 'var(--sales-border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
 fill: { 
 type: 'gradient', 
 gradient: { type: 'vertical', shadeIntensity: 1, opacityFrom: 1, opacityTo: 0.8, colorStops: [ { offset: 0, color: '#818cf8', opacity: 1 }, { offset: 100, color: '#4F46E5', opacity: 1 } ] } 
 },
 tooltip: { theme: 'light', y: { formatter: (val) => `₹${val.toLocaleString()}` } }
 }}
 series={[{ name: 'Revenue', data: overviewData.map(d => d.revenue) }]}
 type="bar"
 height="100%"
 />
 </div>
 </div>
 
 <div className="bg-[var(--sales-bg-card)] p-5 rounded-xl border border-[var(--sales-border)] shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none">
 <h3 className="font-bold text-[var(--sales-text-primary)] mb-2">New Members Trend</h3>
 <div className="h-[250px] w-full">
 <ReactApexChart 
 options={{
 chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit', parentHeightOffset: 0 },
 colors: ['#F43F5E'],
 dataLabels: { enabled: false },
 stroke: { curve: 'smooth', width: 3 },
 xaxis: { 
 categories: overviewData.map(d => d.month), 
 axisBorder: { show: false }, 
 axisTicks: { show: false },
 labels: { style: { colors: '#64748b' } }
 },
 yaxis: { labels: { style: { colors: '#64748b' } } },
 grid: { borderColor: 'var(--sales-border)', strokeDashArray: 4, xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
 fill: { 
 type: 'gradient', 
 gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] } 
 },
 tooltip: { theme: 'light' }
 }}
 series={[{ name: 'New Members', data: overviewData.map(d => d.newMembers) }]}
 type="area"
 height="100%"
 />
 </div>
 </div>
 </div>
 );
}
