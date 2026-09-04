'use client';
/**
 * RESPONSIBILITY: Renders the Usage Meters dashboard for superadmins to monitor tenant resource limits.
 * DATA FLOW: usageMetersApi -> UsageMetersClient -> UI
 */

import { useState, useEffect } from 'react';
import { usageMetersApi } from '@/app/superadmin/usage-meters/usage-meters_api/usage-meters_api';
import type { UsageMeter } from '@/app/superadmin/usage-meters/usage-meters_types/usage-meters_types';
import { BarChart2, HardDrive, MessageSquare, Users, Calendar } from 'lucide-react';

export default function UsageMetersClient() {
  const [meters, setMeters] = useState<UsageMeter[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('this_month');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  useEffect(() => {
    usageMetersApi.getAll().then(res => {
      if (res.success && res.data) {
        setMeters(res.data);
      }
      setLoading(false);
    });
  }, []);

  const getProgressColor = (used: number, limit: number) => {
    const percent = (used / limit) * 100;
    if (percent > 90) return 'bg-danger';
    if (percent > 75) return 'bg-warning';
    return 'bg-success';
  };

  const getPercentage = (used: number, limit: number) => {
    return Math.min(100, (used / limit) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-32 bg-card motion-safe:animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usage Meters</h1>
          <p className="text-secondary mt-1">Monitor tenant resource consumption and billing limits.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-card border border-border rounded-lg pl-9 pr-10 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          </div>

          {dateRange === 'custom' && (
            <div className="flex items-center gap-2">
              <input 
                type="date" 
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" 
              />
              <span className="text-secondary">to</span>
              <input 
                type="date" 
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" 
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {meters.map(meter => {
          const dbGb = meter.databaseGb || 0;
          const mediaGb = meter.mediaGb || (meter as any).storageGb || 0;
          const totalStorage = dbGb + mediaGb;

          return (
          <div key={meter.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-primary mb-4 truncate" title={meter.tenantName}>{meter.tenantName}</h3>
            
            <div className="space-y-5">
              {/* SMS Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <MessageSquare size={18} /> Total SMS Sent
                  </span>
                  <span className="text-foreground font-semibold">{meter.smsSent.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getProgressColor(meter.smsSent, meter.smsLimit)}`} 
                    style={{ width: `${getPercentage(meter.smsSent, meter.smsLimit)}%` }}
                  />
                </div>
                <p className="text-xs text-secondary mt-1.5">Limit: {meter.smsLimit.toLocaleString()}</p>
              </div>

              {/* Storage Meter */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <HardDrive size={18} /> Total Storage (GB)
                  </span>
                  <span className="text-foreground font-semibold">
                    {totalStorage.toFixed(2)} GB
                  </span>
                </div>
                <div className="h-2 w-full bg-input rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${getPercentage(dbGb, meter.storageLimitGb)}%` }}
                    title={`Database: ${dbGb} GB`}
                  />
                  <div 
                    className="h-full bg-warning"
                    style={{ width: `${getPercentage(mediaGb, meter.storageLimitGb)}%` }}
                    title={`Binary: ${mediaGb} GB`}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1.5 text-secondary">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>DB: {dbGb} GB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span>Binary: {mediaGb} GB</span>
                  </div>
                </div>
              </div>

              {/* Members Meter (Limit Removed) */}
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="flex items-center gap-1.5 text-secondary font-medium">
                    <Users size={18} /> Active Members
                  </span>
                  <span className="text-foreground font-semibold">{meter.activeMembers.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border flex justify-between items-center text-xs text-secondary">
              <span>Billing Cycle Ends:</span>
              <span className="font-semibold text-foreground">{meter.billingCycleEnd}</span>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
