'use client';

import { useState } from 'react';
import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import { Building2, Users, IndianRupee, Activity, ShieldCheck, Filter } from 'lucide-react';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { TimeRange } from '@/app/admin/dashboard/dashboard_types/dashboard_types';

export default function AdminBranchesPage() {
  const { branches } = useAdminGlobalStore();
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  // Dummy multiplier to simulate data changing based on time range filter
  const getMultiplier = () => {
    if (timeRange === 'weekly') return 0.25;
    if (timeRange === 'yearly') return 12;
    if (timeRange === 'custom') return 0.5; // just a visual change
    return 1; // monthly is baseline
  };

  const multiplier = getMultiplier();

  return (
    <div className="min-h-full pb-10">
      <AdminHeader title="Gym Branches" subtitle="Overview of all gym locations and their performance metrics" />
      
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-4 border border-border rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Filter className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                Branch Analytics
              </h2>
              <span className="text-xs text-secondary flex items-center gap-1 mt-0.5">
                <ShieldCheck size={12} className="text-success" /> Read-only
              </span>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 items-center">
            {timeRange === 'custom' && (
              <div className="flex items-center gap-2 mr-2">
                <label className="text-sm font-medium text-secondary">From:</label>
                <input
                  type="date"
                  className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Start Date"
                />
                <label className="text-sm font-medium text-secondary ml-1">To:</label>
                <input
                  type="date"
                  className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  aria-label="End Date"
                />
              </div>
            )}
            <select 
              value={timeRange} 
              onChange={(e) => {
                setTimeRange(e.target.value as TimeRange);
                if (e.target.value !== 'custom') {
                  setStartDate('');
                  setEndDate('');
                }
              }}
              className="bg-input border border-border text-sm rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="weekly">This Week</option>
              <option value="monthly">This Month</option>
              <option value="yearly">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map(branch => (
            <div key={branch.id} className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg leading-tight">{branch.name}</h3>
                  <p className="text-sm text-secondary mt-1">{branch.location}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-input/50 rounded-lg p-3 transition-all duration-300">
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <IndianRupee size={12} /> Revenue
                  </span>
                  <div className="font-bold text-foreground">{formatCurrency(branch.revenue * multiplier)}</div>
                </div>
                <div className="bg-input/50 rounded-lg p-3 transition-all duration-300">
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <IndianRupee size={12} /> Expenses
                  </span>
                  <div className="font-bold text-foreground">{formatCurrency(branch.expenses * multiplier)}</div>
                </div>
                <div className="bg-input/50 rounded-lg p-3">
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <Users size={12} /> Students
                  </span>
                  <div className="font-bold text-foreground">{branch.studentsCount}</div>
                </div>
                <div className="bg-input/50 rounded-lg p-3">
                  <span className="text-xs font-medium text-secondary flex items-center gap-1.5 mb-1">
                    <Activity size={12} /> Staff
                  </span>
                  <div className="font-bold text-foreground">{branch.staffCount}</div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
                  branch.status === 'active' ? 'bg-success-bg text-success' : 'bg-secondary/10 text-secondary'
                }`}>
                  {branch.status}
                </span>
                <span className="text-xs text-secondary font-medium">ID: {branch.id.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
