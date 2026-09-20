"use client";
// RESPONSIBILITY: Renders the Membership Growth report tab — new members, renewals, exits, net growth per gym.

import { useAdminReportsLogic } from '@/app/admin/reports/reports_context/useAdminReportsLogic';
import { AdminReportsEmptyState } from '@/app/admin/reports/reports_components/AdminReportsEmptyState/AdminReportsEmptyState';

export default function AdminReportsMembership() {
  const { reportData } = useAdminReportsLogic();
  if (!reportData) return null;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-primary">Membership Growth by Gym</h2>
          <p className="text-xs text-secondary mt-0.5">New members, renewals, exits and net growth for the selected period</p>
        </div>
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-surface-highlight">
                {['Gym', 'Active Members', 'New Members', 'Renewals', 'Exits', 'Net Growth'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reportData.membershipGrowth.map((row) => (
                <tr key={row.gymId} className="hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-5 py-4 text-sm font-semibold text-primary">{row.gymName}</td>
                  <td className="px-5 py-4 text-sm text-primary">{row.activeMembers.toLocaleString('en-IN')}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success text-on-success">+{row.newMembers}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info text-on-info">{row.renewals}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-danger text-on-danger">-{row.exits}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${row.netGrowth >= 0 ? 'bg-success text-on-success' : 'bg-danger text-on-danger'}`}>
                      {row.netGrowth >= 0 ? '+' : ''}{row.netGrowth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-surface-highlight border-t-2 border-border">
                <td className="px-5 py-3 text-sm font-bold text-primary">Total</td>
                <td className="px-5 py-3 text-sm font-bold text-primary">
                  {reportData.membershipGrowth.reduce((s: number, r) => s + r.activeMembers, 0).toLocaleString('en-IN')}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-on-success">
                  +{reportData.membershipGrowth.reduce((s: number, r) => s + r.newMembers, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-info">
                  {reportData.membershipGrowth.reduce((s: number, r) => s + r.renewals, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-on-danger">
                  -{reportData.membershipGrowth.reduce((s: number, r) => s + r.exits, 0)}
                </td>
                <td className="px-5 py-3 text-sm font-bold text-on-success">
                  +{reportData.membershipGrowth.reduce((s: number, r) => s + r.netGrowth, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}