"use client";
// RESPONSIBILITY: JobsView.tsx renders the BullMQ background jobs table and metrics cards. Reads from useSuperadminData. No direct API calls.
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useJobsData } from '@/app/superadmin/jobs/jobs_utils/useJobsData';
import { Activity, Play, AlertTriangle, RefreshCw, XCircle, Trash2, Eye, Filter, X as XIcon } from 'lucide-react';
import type { BackgroundJob } from '@/app/superadmin/jobs/jobs_types/jobs_types';
import SuperadminPagination from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminPagination';

const StatusColors: Record<BackgroundJob['status'], string> = {
  ACTIVE: 'text-primary bg-primary/10',
  COMPLETED: 'text-success bg-success/10',
  FAILED: 'text-danger bg-danger-bg/10',
  DELAYED: 'text-warning bg-warning/10'
};

const ITEMS_PER_PAGE = 10;

export default function JobsView() {
  const { data: responseData, fetchState, error, setData } = useJobsData();
  const [currentPage, setCurrentPage] = useState(1);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Filtering & Selection State
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [queueFilter, setQueueFilter] = useState<string>('ALL');
  const [selectedJobIds, setSelectedJobIds] = useState<Set<string>>(new Set());

  // Modal State
  const [inspectJob, setInspectJob] = useState<BackgroundJob | null>(null);

  const handleRetryAll = () => {
    setIsRetrying(true);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: 'Retrying all failed jobs...',
        success: 'Successfully queued all failed jobs for retry.',
        error: 'Failed to retry jobs.'
      }
    ).finally(() => setIsRetrying(false));
  };

  const handleRetryJob = (id: string) => {
    toast.success(`Job ${id} queued for retry.`);
  };

  const handleCancelJob = (id: string) => {
    toast.success(`Job ${id} cancelled successfully.`);
    if (responseData) {
      const updatedJobs = responseData.jobs.filter(j => j.id !== id);
      setData({ ...responseData, jobs: updatedJobs });
    }
  };

  const handleDeleteJob = (id: string) => {
    toast.success(`Job ${id} deleted.`);
    if (responseData) {
      const updatedJobs = responseData.jobs.filter(j => j.id !== id);
      setData({ ...responseData, jobs: updatedJobs });
      setSelectedJobIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleClearCompleted = () => {
    toast.success('Cleared all completed jobs.');
    if (responseData) {
      const updatedJobs = responseData.jobs.filter(j => j.status !== 'COMPLETED');
      setData({ ...responseData, jobs: updatedJobs });
      setSelectedJobIds(new Set());
    }
  };

  const handleBulkRetry = () => {
    toast.success(`Queued ${selectedJobIds.size} jobs for retry.`);
    setSelectedJobIds(new Set());
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedJobIds.size} jobs.`);
    if (responseData) {
      const updatedJobs = responseData.jobs.filter(j => !selectedJobIds.has(j.id));
      setData({ ...responseData, jobs: updatedJobs });
      setSelectedJobIds(new Set());
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedJobIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = (visibleJobIds: string[]) => {
    if (selectedJobIds.size === visibleJobIds.length && visibleJobIds.length > 0) {
      setSelectedJobIds(new Set());
    } else {
      setSelectedJobIds(new Set(visibleJobIds));
    }
  };

  if (fetchState === 'loading') return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error || !responseData) return <div className="p-8 text-center text-danger">Error loading data.</div>;

  const { jobs: DUMMY_BACKGROUND_JOBS, metrics } = responseData;

  const filteredJobs = DUMMY_BACKGROUND_JOBS.filter(job => {
    if (statusFilter !== 'ALL' && job.status !== statusFilter) return false;
    if (queueFilter !== 'ALL' && job.queueName !== queueFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatDuration = (ms?: number) => {
    if (!ms) return '-';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Background Jobs</h1>
          <p className="text-secondary mt-1">Monitor async queues, inspect payloads, and manage tasks.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleClearCompleted}
            className="bg-input text-foreground px-4 py-2 rounded-lg font-medium hover:bg-border motion-safe:transition-colors border border-border"
          >
            Clear Completed
          </button>
          <button 
            onClick={handleRetryAll}
            disabled={isRetrying}
            className="bg-danger-bg/10 text-danger px-4 py-2 rounded-lg font-medium hover:bg-danger-bg hover:text-white motion-safe:transition-colors flex items-center gap-2 border border-destructive/20 hover:border-transparent disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRetrying ? "motion-safe:animate-spin" : ""} /> Retry All Failed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {[
          { label: 'Active Jobs', value: metrics?.activeJobs || 0, icon: Play, color: 'text-primary' },
          { label: 'Completed (24h)', value: metrics?.completed24h || 0, icon: Activity, color: 'text-success' },
          { label: 'Failed (24h)', value: metrics?.failed24h || 0, icon: XCircle, color: 'text-danger' },
          { label: 'Delayed', value: metrics?.delayed || 0, icon: AlertTriangle, color: 'text-warning' }
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

      {/* Filters & Bulk Actions Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-secondary" />
            <select 
              className="bg-input border border-border text-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="ALL">All Statuses</option>
              <option value="FAILED">Failed</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="DELAYED">Delayed</option>
            </select>
          </div>
          <select 
            className="bg-input border border-border text-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
            value={queueFilter}
            onChange={(e) => { setQueueFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="ALL">All Queues</option>
            <option value="billing">billing</option>
            <option value="email">email</option>
            <option value="webhook">webhook</option>
            <option value="database">database</option>
          </select>
        </div>

        {selectedJobIds.size > 0 && (
          <div className="flex items-center gap-3 motion-safe:animate-in slide-in-from-right-4">
            <span className="text-sm font-medium text-primary mr-2">{selectedJobIds.size} selected</span>
            <button 
              onClick={handleBulkRetry}
              className="flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-md text-sm hover:bg-primary-hover motion-safe:transition-colors"
            >
              <RefreshCw size={14} /> Retry
            </button>
            <button 
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 bg-danger-bg text-white px-3 py-1.5 rounded-md text-sm hover:opacity-90 motion-safe:transition-opacity"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-full">
            <thead>
              <tr className="bg-header border-b border-border text-sm">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-border text-primary focus:ring-primary cursor-pointer w-4 h-4"
                    checked={selectedJobIds.size === paginatedJobs.length && paginatedJobs.length > 0}
                    onChange={() => toggleAll(paginatedJobs.map(j => j.id))}
                  />
                </th>
                <th className="p-4 font-semibold text-secondary">Job ID</th>
                <th className="p-4 font-semibold text-secondary">Queue</th>
                <th className="p-4 font-semibold text-secondary">Task / Error</th>
                <th className="p-4 font-semibold text-secondary">Status</th>
                <th className="p-4 font-semibold text-secondary">Timing</th>
                <th className="p-4 font-semibold text-secondary text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-secondary">No jobs found matching the criteria.</td>
                </tr>
              ) : paginatedJobs.map((job) => (
                <tr key={job.id} onClick={() => setInspectJob(job)} className="hover:bg-input motion-safe:transition-colors group cursor-pointer">
                  <td className="p-4 text-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-border text-primary focus:ring-primary cursor-pointer w-4 h-4"
                      checked={selectedJobIds.has(job.id)}
                      onChange={() => toggleSelection(job.id)}
                    />
                  </td>
                  <td className="p-4 text-xs font-mono text-secondary">{job.id}</td>
                  <td className="p-4 text-sm font-medium text-primary">{job.queueName}</td>
                  <td className="p-4 text-sm max-w-[200px]">
                    <div className="font-medium text-foreground">{job.jobName}</div>
                    {job.error && <div className="text-xs text-danger truncate mt-1" title={job.error}>{job.error}</div>}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col items-start gap-1">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${StatusColors[job.status]}`}>
                        {job.status}
                      </span>
                      {job.attempts > 1 && <span className="text-[10px] text-secondary">Attempts: {job.attempts}</span>}
                    </div>
                  </td>
                  <td className="p-4 text-xs text-secondary whitespace-nowrap">
                    <div>Created: {new Date(job.createdAt).toLocaleTimeString()}</div>
                    {job.finishedAt && <div>Finished: {new Date(job.finishedAt).toLocaleTimeString()}</div>}
                    <div className="font-mono mt-1 text-foreground">Duration: {formatDuration(job.durationMs)}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity">
                      
                      {job.status === 'FAILED' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRetryJob(job.id); }}
                          className="p-1.5 text-secondary hover:text-primary hover:bg-primary/10 rounded-lg motion-safe:transition-colors"
                          title="Retry Job"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )}

                      {(job.status === 'ACTIVE' || job.status === 'DELAYED') && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleCancelJob(job.id); }}
                          className="p-1.5 text-secondary hover:text-warning hover:bg-warning/10 rounded-lg motion-safe:transition-colors"
                          title="Cancel Job"
                        >
                          <XCircle size={16} />
                        </button>
                      )}

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteJob(job.id); }}
                        className="p-1.5 text-secondary hover:text-danger hover:bg-danger-bg/10 rounded-lg motion-safe:transition-colors"
                        title="Delete Job"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SuperadminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Payload Inspect Modal */}
      {inspectJob && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-sidebar/30">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Eye className="text-primary w-5 h-5" /> Inspect Job: {inspectJob.id}
                </h2>
                <p className="text-sm text-secondary mt-1">Queue: {inspectJob.queueName} | Task: {inspectJob.jobName}</p>
              </div>
              <button onClick={() => setInspectJob(null)} className="p-2 text-secondary hover:text-foreground hover:bg-input rounded-full motion-safe:transition-colors">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
              
              <div>
                <h3 className="text-sm font-semibold text-secondary mb-2 uppercase tracking-wider">Status & Timing</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-input p-4 rounded-lg">
                  <div><p className="text-xs text-secondary mb-1">Status</p><p className={`text-sm font-bold ${StatusColors[inspectJob.status].split(' ')[0]}`}>{inspectJob.status}</p></div>
                  <div><p className="text-xs text-secondary mb-1">Attempts</p><p className="text-sm font-medium text-foreground">{inspectJob.attempts}</p></div>
                  <div><p className="text-xs text-secondary mb-1">Created At</p><p className="text-sm text-foreground">{new Date(inspectJob.createdAt).toLocaleString()}</p></div>
                  <div><p className="text-xs text-secondary mb-1">Duration</p><p className="text-sm text-foreground font-mono">{formatDuration(inspectJob.durationMs)}</p></div>
                </div>
              </div>

              {inspectJob.error && (
                <div>
                  <h3 className="text-sm font-semibold text-danger mb-2 uppercase tracking-wider flex items-center gap-1"><AlertTriangle size={14}/> Error Trace</h3>
                  <div className="bg-danger-bg/10 border border-destructive/20 text-danger p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                    {inspectJob.error}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Job Payload</h3>
                <div className="bg-sidebar border border-border p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono text-foreground">
                    {JSON.stringify(inspectJob.payload || { message: "No payload attached." }, null, 2)}
                  </pre>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
