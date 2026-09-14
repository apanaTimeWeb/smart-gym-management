"use client";
// RESPONSIBILITY: Provides the implementation for AdminSalesOverview.tsx functionality within its module.

import { useAdminSalesLogic } from '@/app/admin/sales/sales_context/useAdminSalesLogic';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Loader2 } from 'lucide-react';

export default function AdminSalesOverview() {
  const { overviewData, fetchState } = useAdminSalesLogic();

  const referralData = [
    { name: 'Instagram', value: 45000, color: 'var(--danger)' },
    { name: 'Google Ads', value: 65000, color: 'var(--primary)' },
    { name: 'Word of Mouth', value: 25000, color: 'var(--success)' },
    { name: 'Walk-in', value: 15000, color: 'var(--warning)' },
  ];

  if (fetchState === 'loading') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="bg-card p-5 rounded-xl border border-border shadow-lg h-[340px]"></div>
        <div className="bg-card p-5 rounded-xl border border-border shadow-lg h-[320px]"></div>
      </div>
    );
  }

  if (fetchState === 'error') {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger/30">
        <p className="text-danger font-medium">Failed to load sales overview.</p>
        <p className="text-sm mt-1 text-secondary">Please check your connection and try again.</p>
      </div>
    );
  }

 return (
 <div className="space-y-6">
 <div className="bg-card p-5 rounded-xl border border-border shadow-lg dark:shadow-none">
 <h3 className="font-bold text-foreground mb-4">Monthly Revenue (₹)</h3>
 <div className="h-72 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickFormatter={(val) => `${(val / 1000).toFixed(0)}K`} />
      <Tooltip 
        cursor={{ fill: 'var(--bg-card)', opacity: 0.5 }}
        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
        formatter={(value: number | string | readonly (string | number)[] | undefined) => [`₹${Number(Array.isArray(value) ? value[0] : (value || 0)).toLocaleString()}`, 'Revenue']}
      />
      <Bar dataKey="revenue" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={40} />
    </BarChart>
  </ResponsiveContainer>
 </div>
 </div>
 
 <div className="bg-card p-5 rounded-xl border border-border shadow-lg dark:shadow-none">
 <h3 className="font-bold text-foreground mb-4">New Members Trend</h3>
 <div className="h-64 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.4}/>
          <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
      <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
      <Tooltip 
        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)' }}
      />
      <Area type="monotone" dataKey="newMembers" stroke="var(--danger)" strokeWidth={3} fillOpacity={1} fill="url(#colorMembers)" />
    </AreaChart>
  </ResponsiveContainer>
 </div>
 </div>
 
 <div className="bg-card p-5 rounded-xl border border-border shadow-lg dark:shadow-none">
   <h3 className="font-bold text-foreground mb-4">Marketing ROI: Revenue by Referral Source</h3>
   <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={referralData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {referralData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value: unknown) => `₹${Number(value || 0).toLocaleString()}`} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
   </div>
 </div>
 </div>
 );
}