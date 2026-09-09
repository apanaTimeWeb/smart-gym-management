// RESPONSIBILITY: Renders the revenue trend chart on the manager dashboard using Recharts.
'use client';

import { useDashboardContext } from '@/app/manager/dashboard/dashboard_context/ManagerDashboardContext';
import { formatCurrency } from '@/app/manager/dashboard/dashboard_utils/ManagerDashboardSharedConstants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ManagerDashboardRevenueChart() {
  const { stats } = useDashboardContext();
  if (!stats?.revenueChart || stats.revenueChart.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-5 h-[300px] flex items-center justify-center">
        <p className="text-secondary text-sm">No revenue data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col h-full min-h-[300px]">
      <h3 className="text-base font-bold text-foreground mb-4">Revenue Trends</h3>
      <div className="flex-1 w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stats.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'hsl(var(--secondary))' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: 'hsl(var(--secondary))' }}
              tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
              formatter={(value: any) => [formatCurrency(value), 'Revenue']}
              labelStyle={{ color: 'hsl(var(--foreground))', marginBottom: '4px' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#22c55e" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
