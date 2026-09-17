// RESPONSIBILITY: Renders the Superadmin dashboard V1 Why monthly income changed, Top & at-risk gyms, Critical platform alerts view.
'use client';
import { ArrowDown, ArrowUp, CircleAlert } from 'lucide-react';
import { formatCurrency, formatNumber, formatPercent1dp } from '@/lib/formatters';
import SuperadminV1ApexBarChart from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1ApexBarChart';
import SuperadminV1Panel from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminV1Panel';
import { SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES } from '@/app/superadmin/dashboard/dashboard_utils/SuperadminDashboardConstants';
import type { SuperadminDashboardV1SectionProps } from '@/app/superadmin/dashboard/dashboard_types/SuperadminDashboardV1Types.ts';
export default function SuperadminDashboardV1IncomeGymsAndAlertsSection({ data }: SuperadminDashboardV1SectionProps) {
    return <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
  <SuperadminV1Panel title="Why monthly income changed" description="Opening income plus gains and losses for this period.">
    <div className="h-72">
      <SuperadminV1ApexBarChart categories={data.waterfall.map((item) => item.label)} series={[{ name: 'Monthly income', data: data.waterfall.map((item) => item.value) }]} valueFormatter={(value) => formatCurrency(value)} horizontal/>
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Top & at-risk gyms" description="Use this to see high-value growth and tenants needing attention.">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase text-secondary">
            <th className="px-3 py-3">
              Gym
            </th>
            <th className="px-3 py-3">
              Income
            </th>
            <th className="px-3 py-3">
              Growth
            </th>
            <th className="px-3 py-3">
              Health
            </th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((row) => <tr key={row.name} className="border-b border-border">
            <td className="px-3 py-3">
              <div className="max-w-48 truncate font-medium text-foreground">
                {row.name}
              </div>
              <div className="text-xs text-secondary">
                {row.plan}
              </div>
            </td>
            <td className="px-3 py-3 text-foreground">
              {formatCurrency(row.income)}
            </td>
            <td className={row.growth >= 0 ? 'px-3 py-3 text-success' : 'px-3 py-3 text-danger'}>
              {row.growth >= 0 ? <ArrowUp size={18} className="mr-1 inline"/> : <ArrowDown size={18} className="mr-1 inline"/>}
              {formatPercent1dp(row.growth)}
            </td>
            <td className="px-3 py-3 text-foreground">
              {formatNumber(row.health)}
              /100
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </SuperadminV1Panel>
  <SuperadminV1Panel title="Critical platform alerts" description="A single action list for issues that otherwise live across multiple pages.">
    <div className="space-y-3">
      {data.alerts.map((alert) => <div key={alert.id} className="flex gap-3 rounded-lg border border-border bg-input p-3">
        <CircleAlert size={18} className={`mt-0.5 ${SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES[alert.level as keyof typeof SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES].icon}`}/>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES[alert.level as keyof typeof SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES].badge}`}>
              {alert.level}
            </span>
            <p className="truncate font-medium text-foreground">
              {alert.title}
            </p>
          </div>
          <p className="mt-1 text-xs text-secondary">
            {alert.detail}
          </p>
        </div>
        <span className="ml-auto text-sm font-semibold text-foreground">
          {formatNumber(alert.count)}
        </span>
      </div>)}
    </div>
  </SuperadminV1Panel>
    </div>;
}
