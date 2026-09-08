// RESPONSIBILITY: Logic hook for Manager PT page — tab state, packages, assignments, KPIs, and workload.
// DATA FLOW: managerPtApi → useManagerPtLogic → ManagerPtMain
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { managerPtApi } from '@/app/manager/pt/pt_api/ManagerPtApi';
import type { 
  PtActiveTab, 
  PtPackage, 
  PtAssignment, 
  PtDashboardKpis, 
  PtTrainerWorkload 
} from '@/app/manager/pt/pt_types/ManagerPtTypes';

export function useManagerPtLogic() {
  const [activeTab, setActiveTab] = useState<PtActiveTab>('dashboard');
  
  // Data State
  const [packages, setPackages] = useState<PtPackage[]>([]);
  const [assignments, setAssignments] = useState<PtAssignment[]>([]);
  const [kpis, setKpis] = useState<PtDashboardKpis | null>(null);
  const [workload, setWorkload] = useState<PtTrainerWorkload[]>([]);
  
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [markingId, setMarkingId] = useState<string | null>(null);

  // Dependency: [] — load data once on mount
  useEffect(() => {
    async function load() {
      setFetchState('loading');
      try {
        const [pkgRes, assignRes, kpiRes, workRes] = await Promise.all([
          managerPtApi.fetchPackages(),
          managerPtApi.fetchAssignments(),
          managerPtApi.fetchDashboardKpis(),
          managerPtApi.fetchWorkload()
        ]);
        setPackages(pkgRes.data ?? []);
        setAssignments(assignRes.data ?? []);
        setKpis(kpiRes.data ?? null);
        setWorkload(workRes.data ?? []);
        setFetchState('success');
      } catch {
        setFetchState('error');
      }
    }
    load();
  }, []);

  async function handleMarkSession(assignmentId: string) {
    setMarkingId(assignmentId);
    try {
      const res = await managerPtApi.markSessionComplete(assignmentId);
      toast.success(res.message || 'Session marked as complete.');
      if (res.data) {
        setAssignments(prev =>
          prev.map(a => a.id === assignmentId ? res.data! : a)
        );
      }
    } catch {
      toast.error('Failed to mark session.');
    } finally {
      setMarkingId(null);
    }
  }

  // Derived state for expiring packages (< 3 sessions left)
  const expiringPackages = assignments.filter(
    (a) => (a.totalSessions - a.completedSessions) <= 3 && a.completedSessions < a.totalSessions
  );

  return {
    activeTab, setActiveTab,
    packages, assignments,
    kpis, workload, expiringPackages,
    fetchState, markingId,
    handleMarkSession,
  };
}
