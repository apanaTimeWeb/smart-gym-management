'use client';
import type { SuperadminSystemOpsInfrastructureResourceMetricsProps } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_types/SuperadminSystemOpsInfrastructureResourceMetricsTypes';

// RESPONSIBILITY: Renders CPU, RAM, and storage resource KPI cards from already-derived infrastructure metrics.

import { Cpu, HardDrive, Server } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ProgressBar from '@/components/ui/ProgressBar';


/**
 * @description Displays resource utilization KPIs using semantic theme tokens and the shared progress primitive.
 * @dependencies Receives only derived numeric values from the infrastructure view model.
 * @edge-case Missing node coverage is represented by the owning view-model counts rather than invented fallback data.
 */
export default function SuperadminSystemOpsInfrastructureResourceMetrics({ withCpuCount, withMemCount, withDiskCount, avgCpu, avgMem, avgDisk }: SuperadminSystemOpsInfrastructureResourceMetricsProps) {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-3" aria-label={t('ui.server_infrastructure_e8ce2ff')}>
      <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary-subtle motion-safe:transition-colors" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-primary-subtle p-2 text-primary"><Cpu size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.cpu_usage_5dff621')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2"><span className="text-4xl font-extrabold text-primary">{avgCpu}</span><span className="text-xl font-medium text-secondary">%</span></div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgCpu} label="" /></div>
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_load_across_3073662')} {withCpuCount} {t('ui.compute_nodes_ef7efb4')}</p>
        </div>
      </article>

      <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-warning-bg motion-safe:transition-colors" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-warning-bg p-2 text-warning"><Server size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.memory_ram_67d2d61')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2"><span className={`text-4xl font-extrabold ${avgMem > 80 ? 'text-warning' : 'text-primary'}`}>{avgMem}</span><span className="text-xl font-medium text-secondary">%</span></div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgMem} label="" /></div>
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_memory_across_e04817e')} {withMemCount} {t('ui.nodes_9928f23')} {avgMem > 80 ? t('ui.high_load_8b43830') : ''}</p>
        </div>
      </article>

      <article className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card">
        <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-success-bg motion-safe:transition-colors" aria-hidden="true" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-success-bg p-2 text-success"><HardDrive size={18} strokeWidth={2} aria-hidden="true" /></div>
            <h2 className="text-lg font-bold text-primary">{t('ui.storage_ssd_7e5e486')}</h2>
          </div>
          <div className="mb-2 flex items-end gap-2"><span className="text-4xl font-extrabold text-primary">{avgDisk}</span><span className="text-xl font-medium text-secondary">%</span></div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-floating"><ProgressBar value={avgDisk} label="" /></div>
          <p className="mt-3 text-xs text-secondary">{t('ui.avg_across_ff23f78')} {withDiskCount} {t('ui.storage_volumes_11758e0')}</p>
        </div>
      </article>
    </section>
  );
}
