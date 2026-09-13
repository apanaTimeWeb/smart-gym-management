'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useExpensesListQuery } from '@/app/manager/expenses/expenses_api/useManagerExpensesQueries';
import { formatCurrency, formatKPI } from '@/lib/formatters';
import { Loader2 } from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 motion-safe:animate-spin text-primary" /></div>,
});

const COLORS = ['#eab308', '#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#f97316'];

export default function ManagerExpensesChart() {
  const { data, isLoading, isError } = useExpensesListQuery({ limit: '1000' });
  const expenses = data?.expenses || [];

  const chartData = useMemo(() => {
    const categoryTotals: Record<string, number> = {};
    
    // Group and sum expenses by category
    expenses.forEach(exp => {
      const cat = exp.category || 'Other';
      if (!categoryTotals[cat]) {
        categoryTotals[cat] = 0;
      }
      categoryTotals[cat] += exp.amount;
    });

    // Convert to array format
    const chartDataArray = Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));

    // Sort descending by value
    return chartDataArray.sort((a, b) => (b.value || 0) - (a.value || 0));
  }, [expenses]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  if (isError || chartData.length === 0) {
    return (
      <div className="h-full min-h-[300px] flex items-center justify-center">
        <p className="text-secondary font-medium">No expense data available to chart.</p>
      </div>
    );
  }

  // Calculate total and highest for the summary headers
  const totalThisMonth = chartData.reduce((acc, curr) => acc + (curr.value || 0), 0);
  const highestCategory = chartData.length > 0 ? chartData[0] : null;

  const options = {
    chart: { background: 'transparent', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: chartData.map((_, i) => COLORS[i % COLORS.length]) as string[],
    plotOptions: {
      bar: { borderRadius: 4, distributed: true }
    },
    grid: { borderColor: 'rgba(255,255,255,0.05)', strokeDashArray: 4 },
    tooltip: { 
      theme: 'dark' as const,
      y: { formatter: (v: number) => formatCurrency(v) }
    },
    xaxis: {
      categories: chartData.map(d => d.name),
      labels: { style: { colors: '#A1A1AA', fontSize: '12px' } },
      axisBorder: { show: false }, 
      axisTicks: { show: false },
    },
    yaxis: { 
      labels: { style: { colors: '#A1A1AA', fontSize: '12px' }, formatter: (v: number) => formatKPI(v) } 
    },
    dataLabels: { enabled: false },
    legend: { show: false }
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-1">Total Tracked Expenses</p>
          <p className="text-2xl font-black text-danger">
            {formatCurrency(totalThisMonth)}
          </p>
        </div>
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-1">Highest Category</p>
          <p className="text-2xl font-black text-warning">
            {highestCategory ? `${highestCategory.name} (${formatCurrency(highestCategory.value || 0)})` : 'N/A'}
          </p>
        </div>
        <div className="p-4 bg-input rounded-lg border border-border">
          <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-1">Total Categories</p>
          <p className="text-2xl font-black text-primary">
            {chartData.length}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] w-full">
        <Chart
          type="bar"
          height="100%"
          options={options}
          series={[
            { name: 'Amount', data: chartData.map(d => d.value || 0) },
          ]}
        />
      </div>
    </div>
  );
}
