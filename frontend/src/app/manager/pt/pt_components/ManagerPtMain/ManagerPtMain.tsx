// RESPONSIBILITY: Root client component for Manager PT page.
// THEME PORTABILITY CONTRACT: Depends on variables --bg-page, --bg-card, --bg-input, --border, --primary, --success, --info, --warning, --danger, --text-primary, --text-secondary, --disabled.
'use client';

import { useState } from 'react';
import { Loader2, Dumbbell, X, UserPlus } from 'lucide-react';
import { useManagerPtLogic } from '@/app/manager/pt/pt_context/useManagerPtLogic';
import { PT_TAB_OPTIONS } from '@/app/manager/pt/pt_types/ManagerPtTypes';
import { managerPtApi } from '@/app/manager/pt/pt_api/ManagerPtApi';
import toast from 'react-hot-toast';

// Child Components
import ManagerPtKPIs from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtKPIs';
import ManagerPtTrainerWorkload from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtTrainerWorkload';
import ManagerPtExpiringSoon from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtExpiringSoon';
import ManagerPtAssignmentsTable from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtAssignmentsTable';

// ── Assign Trainer Modal ────────────────────────────────────────────────────
// Self-contained slide-over modal. Uses local state only — no prop-drilling.
// Rule 71: no window.confirm / alert. Destructive submit uses the server API.
function AssignTrainerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [memberId, setMemberId]     = useState('');
  const [trainerId, setTrainerId]   = useState('');
  const [packageId, setPackageId]   = useState('');
  const [startDate, setStartDate]   = useState('');
  const [saving, setSaving]         = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberId || !trainerId || !packageId || !startDate) return;
    setSaving(true);
    try {
      const res = await managerPtApi.createAssignment({ memberId, trainerId, packageId, startDate });
      toast.success(res.message || 'Trainer assigned successfully!');
      setMemberId(''); setTrainerId(''); setPackageId(''); setStartDate('');
      onClose();
    } catch {
      toast.error('Failed to assign trainer. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 motion-safe:transition-opacity"
        onClick={onClose}
      />
      {/* Slide-over panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-card border-l border-border shadow-2xl z-50 flex flex-col motion-safe:transition-transform motion-safe:duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-header">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserPlus size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-black text-foreground">Assign Trainer</h2>
              <p className="text-xs text-secondary mt-0.5">Create a new PT assignment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-input hover:bg-border text-secondary rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Member ID</label>
            <input
              required
              value={memberId}
              onChange={e => setMemberId(e.target.value)}
              placeholder="e.g. M-00045"
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all placeholder:text-secondary"
            />
            <p className="text-xs text-secondary mt-1">Enter the member's ID from the Members module.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Trainer ID</label>
            <select
              required
              value={trainerId}
              onChange={e => setTrainerId(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
            >
              <option value="">Select a trainer...</option>
              <option value="TR-001">Rajesh Kumar (TR-001)</option>
              <option value="TR-002">Priya Sharma (TR-002)</option>
              <option value="TR-003">Amit Singh (TR-003)</option>
              <option value="TR-004">Sunita Reddy (TR-004)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">PT Package</label>
            <select
              required
              value={packageId}
              onChange={e => setPackageId(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
            >
              <option value="">Select a package...</option>
              <option value="PKG-001">Starter (12 sessions) — ₹3,000</option>
              <option value="PKG-002">Pro (24 sessions) — ₹5,500</option>
              <option value="PKG-003">Elite (36 sessions) — ₹7,500</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1.5">Start Date</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary motion-safe:transition-all"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="p-5 border-t border-border bg-header flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-secondary bg-input hover:bg-border rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !memberId || !trainerId || !packageId || !startDate}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-primary-foreground bg-primary hover:opacity-90 rounded-xl motion-safe:transition-opacity disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {saving ? <Loader2 size={16} className="motion-safe:animate-spin" /> : <UserPlus size={16} />}
            Assign Trainer
          </button>
        </div>
      </div>
    </>
  );
}

export default function ManagerPtMain() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const {
    activeTab, setActiveTab,
    packages, assignments,
    kpis, workload, expiringPackages,
    fetchState, markingId,
    handleMarkSession,
  } = useManagerPtLogic();

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6">
      <AssignTrainerModal 
        open={isAssignModalOpen} 
        onClose={() => setIsAssignModalOpen(false)} 
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Personal Training</h1>
          <p className="text-secondary mt-1 text-sm">Manage PT packages, monitor trainer workload, and track sessions.</p>
        </div>
        
        {/* Quick Assign Action — opens a proper slide-over modal, no alert() */}
        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-black px-5 py-2.5 rounded-xl font-bold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
        >
          <UserPlus size={18} />
          Assign Trainer
        </button>
      </div>


      {/* Tab Bar */}
      <div className="flex flex-wrap gap-1 bg-input border border-border p-1 rounded-xl w-fit">
        {PT_TAB_OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-secondary hover:text-foreground hover:bg-card/50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading Overlay State for initial fetch */}
      {fetchState === 'loading' && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 size={32} className="text-primary motion-safe:animate-spin" />
          <p className="text-sm font-medium text-secondary">Loading PT Data...</p>
        </div>
      )}

      {fetchState === 'success' && (
        <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in duration-500">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <ManagerPtKPIs kpis={kpis} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ManagerPtTrainerWorkload workload={workload} />
                </div>
                <div>
                  <ManagerPtExpiringSoon expiringPackages={expiringPackages} />
                </div>
              </div>
            </div>
          )}

          {/* Active Assignments Tab */}
          {activeTab === 'assignments' && (
            <ManagerPtAssignmentsTable
              assignments={assignments}
              markingId={markingId}
              onMarkSession={handleMarkSession}
            />
          )}

          {/* Trainer Workload Tab (Full View) */}
          {activeTab === 'workload' && (
            <ManagerPtTrainerWorkload workload={workload} />
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.length === 0 ? (
                <div className="col-span-full bg-card border border-border rounded-xl p-12 text-center">
                  <Dumbbell size={40} className="mx-auto text-secondary opacity-40 mb-3" />
                  <p className="text-sm text-secondary">No PT packages configured yet.</p>
                </div>
              ) : (
                packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-card border border-border rounded-xl p-6 motion-safe:hover:-translate-y-1 motion-safe:transition-transform"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
                        {pkg.sessionCount} Sessions
                      </span>
                      <span className="text-foreground font-bold text-xl">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{pkg.name}</h3>
                    <p className="text-sm text-secondary mb-6 h-10">{pkg.description}</p>
                    <div className="pt-4 border-t border-border flex justify-between items-center text-xs text-secondary font-medium">
                      <span>Duration: {pkg.durationDays} Days</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
