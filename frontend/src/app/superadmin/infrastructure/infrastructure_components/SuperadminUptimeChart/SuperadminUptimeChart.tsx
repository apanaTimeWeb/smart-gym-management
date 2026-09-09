'use client';
// RESPONSIBILITY: Renders the historical uptime chart (24h sparklines) for System Health.

import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminUptimeChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { series, options } = useMemo(() => {
    // Generate 24 hours of mock uptime data
    const now = new Date();
    const data = Array.from({ length: 24 }).map((_, i) => {
      const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      // Mostly 100%, sometimes drops to 98% or 99%
      const uptime = Math.random() > 0.9 ? (98 + Math.random() * 1.9) : 100;
      return {
        x: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        y: Number(uptime.toFixed(2))
      };
    });

    const series = [{
      name: 'Uptime %',
      data: data
    }];

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'area',
        height: 250,
        toolbar: { show: false },
        zoom: { enabled: false },
        background: 'transparent',
        fontFamily: 'inherit',
      },
      colors: ['#22c55e'], // Success color
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2 },
      xaxis: {
        type: 'category',
        labels: {
          style: { colors: '#64748b' } // secondary color
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false }
      },
      yaxis: {
        min: 95,
        max: 100,
        labels: {
          style: { colors: '#64748b' },
          formatter: (value) => `${value}%`
        }
      },
      grid: {
        borderColor: '#334155', // border color roughly
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } }
      },
      theme: { mode: 'dark' },
      tooltip: {
        theme: 'dark',
        y: { formatter: (value) => `${value}%` }
      }
    };

    return { series, options };
  }, []);

  if (!mounted) return <div className="h-[250px] bg-card rounded-xl border border-border animate-pulse" />;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Historical Uptime (24h)</h2>
        <p className="text-sm text-secondary mt-1">Platform availability over the last 24 hours</p>
      </div>
      <div className="h-[250px] w-full">
        <ReactApexChart options={options} series={series} type="area" height="100%" width="100%" />
      </div>
    </div>
  );
}
