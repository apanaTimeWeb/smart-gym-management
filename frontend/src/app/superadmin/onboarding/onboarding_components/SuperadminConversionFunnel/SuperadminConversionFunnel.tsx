'use client';
// RESPONSIBILITY: Renders the Conversion Funnel chart for Onboarding using ApexCharts.

import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/onboarding_types';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function SuperadminConversionFunnel({ tenants }: { tenants: TenantOnboarding[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { series, options } = useMemo(() => {
    const totalSignups = tenants.length;
    const verified = tenants.filter(t => t.emailVerified).length;
    const completed = tenants.filter(t => t.onboardingStatus === 'COMPLETED').length;
    const paid = tenants.filter(t => t.trialStatus === 'CONVERTED').length;

    const data = [
      { x: 'Total Signups', y: totalSignups },
      { x: 'Email Verified', y: verified },
      { x: 'Onboarding Completed', y: completed },
      { x: 'Converted to Paid', y: paid },
    ];

    const series = [{
      name: 'Tenants',
      data: data
    }];

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
        fontFamily: 'inherit',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barHeight: '60%',
          distributed: true,
          dataLabels: {
            position: 'bottom'
          }
        }
      },
      colors: ['#3b82f6', '#8b5cf6', '#eab308', '#22c55e'], // primary, purple, warning, success
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          if (!opt) return String(val);
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: ['Total Signups', 'Email Verified', 'Onboarding Completed', 'Converted to Paid'],
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: { show: false }
      },
      tooltip: {
        theme: 'dark',
        x: { show: false },
        y: {
          title: {
            formatter: function () {
              return ''
            }
          }
        }
      },
      grid: {
        show: false
      },
      legend: { show: false }
    };

    return { series, options };
  }, [tenants]);

  if (!mounted) return <div className="h-[350px] bg-card rounded-xl border border-border animate-pulse" />;

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Conversion Funnel</h2>
        <p className="text-sm text-secondary mt-1">Track drop-offs from signup to paid conversion.</p>
      </div>
      <div className="h-[350px] w-full">
        <ReactApexChart options={options} series={series} type="bar" height="100%" width="100%" />
      </div>
    </div>
  );
}
