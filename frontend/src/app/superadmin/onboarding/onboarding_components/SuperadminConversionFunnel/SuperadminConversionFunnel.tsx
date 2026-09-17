// RESPONSIBILITY: Renders the Conversion Funnel chart for Onboarding using ApexCharts.
'use client';
import React, { useMemo, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { TenantOnboarding } from '@/app/superadmin/onboarding/onboarding_types/superadmin_onboarding_types';
import { CHART_COLORS } from '@/app/superadmin/superadmin_utils/SuperadminChartConstants';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
export default function SuperadminConversionFunnel({ tenants }: {
    tenants: TenantOnboarding[];
}) {
    const [mounted, setMounted] = useState(false);
    // RATIONALE: Required by architecture to sync state/lifecycle based on dependencies.
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    useEffect(() => {
        setMounted(true);
    }, []);
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
                name: 'Gyms',
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
            colors: [CHART_COLORS.INFO, CHART_COLORS.PURPLE, CHART_COLORS.WARNING, CHART_COLORS.SUCCESS], // primary, purple, warning, success
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: [CHART_COLORS.WHITE]
                },
                formatter: function (val, opt) {
                    if (!opt)
                        return String(val);
                    return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
                },
                offsetX: 0,
                dropShadow: {
                    enabled: true
                }
            },
            stroke: {
                width: 1,
                colors: [CHART_COLORS.WHITE]
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
                            return '';
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
    if (!mounted)
        return <div className="h-80 bg-card rounded-xl border border-border motion-safe:animate-pulse"/>;
    return (<div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Conversion Funnel</h2>
        <p className="text-sm text-secondary mt-1">Track drop-offs from signup to paid conversion.</p>
      </div>
      <div className="h-80 w-full">
        <ReactApexChart options={options} series={series} type="bar" height="100%" width="100%"/>
      </div>
    </div>);
}
