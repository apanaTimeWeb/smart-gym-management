// RESPONSIBILITY: page.tsx handles the logic and UI for its corresponding feature.
import { useSuperadminData } from '@/app/superadmin/superadmin_utils/useSuperadminData';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { Activity, Play, RefreshCw, XCircle, AlertTriangle } from 'lucide-react';
import { BackgroundJob } from '@/app/superadmin/superadmin_types/superadmin_types';

const StatusColors: Record<BackgroundJob['status'], string> = {
  ACTIVE: 'text-primary bg-primary/10',
  COMPLETED: 'text-success bg-success/10',
  FAILED: 'text-destructive bg-destructive/10',
  DELAYED: 'text-warning bg-warning/10'
};

export default function JobsPage() {
  const { data: DUMMY_BACKGROUND_JOBS, loading, error } = useSuperadminData<BackgroundJob[]>(SuperadminUrlConfig.BACKEND_API.JOBS_BASE);

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error || !DUMMY_BACKGROUND_JOBS) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Background Jobs (BullMQ)</h1>
          <p className="text-secondary mt-1">Monitor async queues and retry failed tasks.</p>
        </div>
        <button className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg font-medium hover:bg-destructive hover:text-white transition-colors flex items-center gap-2 border border-destructive/20 hover:border-transparent">
          <RefreshCw size={16} /> Retry All Failed
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Jobs', value: 24, icon: Play, color: 'text-primary' },
          { label: 'Completed (24h)', value: 1420, icon: Activity, color: 'text-success' },
          { label: 'Failed (24h)', value: 3, icon: XCircle, color: 'text-destructive' },
          { label: 'Delayed', value: 12, icon: AlertTriangle, color: 'text-warning' }
        ].map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-input ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-secondary font-medium">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="bg-header border-b border-border text-sm">
                <th className="p-4 font-semibold text-secondary">Job ID</th>
                <th className="p-4 font-semibold text-secondary">Queue</th>
                <th className="p-4 font-semibold text-secondary">Task Name</th>
                <th className="p-4 font-semibold text-secondary">Status</th>
                <th className="p-4 font-semibold text-secondary">Attempts</th>
                <th className="p-4 font-semibold text-secondary">Error Details</th>
                <th className="p-4 font-semibold text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {DUMMY_BACKGROUND_JOBS.map((job) => (
                <tr key={job.id} className="hover:bg-input transition-colors">
                  <td className="p-4 text-xs font-mono text-secondary">{job.id}</td>
                  <td className="p-4 text-sm font-medium text-primary">{job.queueName}</td>
                  <td className="p-4 text-sm text-foreground font-medium">{job.jobName}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${StatusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-secondary font-mono">{job.attempts} / 3</td>
                  <td className="p-4 text-xs text-destructive max-w-xs truncate" title={job.error}>
                    {job.error || '-'}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      className={`p-2 rounded-lg transition-colors inline-flex items-center justify-center ${job.status === 'FAILED' ? 'text-primary hover:bg-primary/10' : 'text-disabled cursor-not-allowed'}`}
                      disabled={job.status !== 'FAILED'}
                      title="Retry Job"
                    >
                      <RefreshCw size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
