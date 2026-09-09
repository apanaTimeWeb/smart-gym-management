// RESPONSIBILITY: Renders the member growth chart on the manager dashboard using Recharts.
'use client';

import { useDashboardContext } from '@/app/manager/dashboard/dashboard_context/ManagerDashboardContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ManagerDashboardMemberGrowthChart() {
  const { stats } = useDashboardContext();
  if (!stats?.memberGrowth || stats.memberGrowth.length === 0) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-5 h-[300px] flex items-center justify-center">
        <p className="text-secondary text-sm">No member growth data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 flex flex-col h-full min-h-[300px]">
      <h3 className="text-base font-bold text-foreground mb-4">Member Growth</h3>
      <div className="flex-1 w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.memberGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
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
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
              cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
              formatter={(value: any) => [value, 'New Members']}
              labelStyle={{ color: 'hsl(var(--foreground))', marginBottom: '4px' }}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
