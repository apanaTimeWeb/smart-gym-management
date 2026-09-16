'use client';
// RESPONSIBILITY: Root client component for Manager PT page.
// THEME PORTABILITY CONTRACT: Depends on variables --bg-page, --bg-card, --bg-input, --border, --primary, --success, --info, --warning, --danger, --text-primary, --text-secondary, --disabled.
import { useState } from 'react';
import { Loader2, Dumbbell, UserPlus } from 'lucide-react';
import { useManagerPtLogic } from '@/app/manager/pt/pt_context/ManagerUseManagerPtLogic';
import { PT_TAB_OPTIONS } from '@/app/manager/pt/pt_types/ManagerPtTypes';
import { formatCurrency } from '@/lib/formatters';

// Child Components
import ManagerPtKPIs from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtKPIs';
import ManagerPtTrainerWorkload from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtTrainerWorkload';
import ManagerPtExpiringSoon from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtExpiringSoon';
import ManagerPtAssignmentsTable from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtAssignmentsTable';
import ManagerPtAssignmentForm from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtAssignmentForm';
import type { ManagerPtAssignmentFormValues } from '@/app/manager/pt/pt_types/ManagerPtAssignmentSchema';

// Assign Trainer form is isolated in ManagerPtAssignmentForm.tsx so the page remains a view/orchestrator.
export default function ManagerPtMain() {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const {
    activeTab, setActiveTab,
    packages, assignments,
    kpis, workload, expiringPackages,
    totalAssignments, currentPage, limit, setPage,
    isPending, isError, markingId,
    handleMarkSession, createAssignment, assignmentSaving,
  } = useManagerPtLogic();

  const handleCreateAssignment = async (values: ManagerPtAssignmentFormValues) => {
    await createAssignment(values);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6">
      <ManagerPtAssignmentForm
        open={isAssignModalOpen}
        packages={packages}
        trainers={workload}
        saving={assignmentSaving}
        onClose={() => setIsAssignModalOpen(false)}
        onSubmit={handleCreateAssignment}
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Personal Training</h1>
          <p className="text-secondary mt-1 text-sm">Manage PT packages, monitor trainer workload, and track sessions.</p>
        </div>
        
        {/* Quick Assign Action — opens a proper slide-over modal, no alert() */}
        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
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

      {/* Loading state from TanStack Query */}
      {isPending && (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 size={32} className="text-primary motion-safe:animate-spin" />
          <p className="text-sm font-medium text-secondary">Loading PT Data...</p>
        </div>
      )}

      {isError && (
        <div role="alert" className="rounded-xl border border-danger bg-danger-bg p-5 text-sm text-danger">Unable to load PT data. Retry by refreshing this route.</div>
      )}

      {!isPending && !isError && (
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
              totalAssignments={totalAssignments}
              currentPage={currentPage}
              totalPages={Math.max(1, Math.ceil(totalAssignments / limit))}
              onPageChange={setPage}
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
                        {formatCurrency(pkg.price)}
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
