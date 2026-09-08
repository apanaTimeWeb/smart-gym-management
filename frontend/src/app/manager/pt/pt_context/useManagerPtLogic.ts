// RESPONSIBILITY: Logic hook for Manager PT page — tab state, packages, assignments.
// DATA FLOW: managerPtApi → useManagerPtLogic → ManagerPtMain
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { managerPtApi } from '@/app/manager/pt/pt_api/ManagerPtApi';
import type { PtActiveTab, PtPackage, PtAssignment } from '@/app/manager/pt/pt_types/ManagerPtTypes';

export function useManagerPtLogic() {
  const [activeTab, setActiveTab] = useState<PtActiveTab>('packages');
  const [packages, setPackages] = useState<PtPackage[]>([]);
  const [assignments, setAssignments] = useState<PtAssignment[]>([]);
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [markingId, setMarkingId] = useState<string | null>(null);

  // Dependency: [] — load data once on mount
  useEffect(() => {
    async function load() {
      setFetchState('loading');
      try {
        const [pkgRes, assignRes] = await Promise.all([
          managerPtApi.fetchPackages(),
          managerPtApi.fetchAssignments(),
        ]);
        setPackages(pkgRes.data ?? []);
        setAssignments(assignRes.data ?? []);
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

  return {
    activeTab, setActiveTab,
    packages, assignments,
    fetchState, markingId,
    handleMarkSession,
  };
}
