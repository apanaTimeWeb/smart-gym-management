// RESPONSIBILITY: Logic hook for the Trainer Progress Tracking module.
// DATA FLOW: SharedConstants (mock) → useTrainerProgressLogic → TrainerProgressMain

import { useState, useCallback, useMemo } from 'react';
import type { ProgressEntry, ProgressChartMetric, ComparisonMemberSnapshot, ComparisonMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { MOCK_PROGRESS_ENTRIES, MOCK_COMPARISON_ENTRIES, COMPARISON_MAX_MEMBERS } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

type ProgressTab = 'individual' | 'compare';

function buildSnapshot(memberId: string, memberName: string, entries: typeof MOCK_COMPARISON_ENTRIES): ComparisonMemberSnapshot {
  const memberEntries = entries
    .filter(e => e.memberId === memberId)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (memberEntries.length === 0) {
    return { memberId, memberName, latestWeightKg: null, latestBmi: null, latestBodyFatPercent: null, latestMuscleMassKg: null, weightChangeKg: null, bodyFatChange: null, muscleMassChange: null, totalEntries: 0, trend: 'insufficient' };
  }

  const first = memberEntries[0];
  const latest = memberEntries[memberEntries.length - 1];
  const weightChange = memberEntries.length >= 2 ? Math.round((latest.weightKg - first.weightKg) * 10) / 10 : null;
  const bodyFatChange = memberEntries.length >= 2 && latest.bodyFatPercent != null && first.bodyFatPercent != null
    ? Math.round((latest.bodyFatPercent - first.bodyFatPercent) * 10) / 10 : null;
  const muscleMassChange = memberEntries.length >= 2 && latest.muscleMassKg != null && first.muscleMassKg != null
    ? Math.round((latest.muscleMassKg - first.muscleMassKg) * 10) / 10 : null;

  let trend: ComparisonMemberSnapshot['trend'] = 'insufficient';
  if (memberEntries.length >= 2) {
    const improving = (weightChange !== null && weightChange < -0.5) || (muscleMassChange !== null && muscleMassChange > 0.5);
    const plateau = weightChange !== null && Math.abs(weightChange) <= 0.5 && (muscleMassChange === null || Math.abs(muscleMassChange) <= 0.3);
    trend = improving ? 'improving' : plateau ? 'plateau' : 'declining';
  }

  return {
    memberId, memberName,
    latestWeightKg: latest.weightKg,
    latestBmi: latest.bmi,
    latestBodyFatPercent: latest.bodyFatPercent ?? null,
    latestMuscleMassKg: latest.muscleMassKg ?? null,
    weightChangeKg: weightChange,
    bodyFatChange,
    muscleMassChange,
    totalEntries: memberEntries.length,
    trend,
  };
}

export const useTrainerProgressLogic = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>(MOCK_PROGRESS_ENTRIES);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('m1');
  const [activeMetric, setActiveMetric] = useState<ProgressChartMetric>('weight');
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ProgressEntry | null>(null);

  // Comparison tab state
  const [activeTab, setActiveTab] = useState<ProgressTab>('individual');
  const [selectedComparisonIds, setSelectedComparisonIds] = useState<string[]>(['m1', 'm2', 'm3', 'm4']);
  const [activeComparisonMetric, setActiveComparisonMetric] = useState<ComparisonMetric>('weightChangeKg');

  const memberEntries = useMemo(
    () => entries.filter((e) => e.memberId === selectedMemberId),
    [entries, selectedMemberId]
  );

  // All unique members available in comparison mock data
  const allComparisonMembers = useMemo(() => {
    const seen = new Map<string, string>();
    MOCK_COMPARISON_ENTRIES.forEach(e => seen.set(e.memberId, e.memberName));
    return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  const comparisonSnapshots = useMemo<ComparisonMemberSnapshot[]>(() => {
    return selectedComparisonIds.map(id => {
      const name = allComparisonMembers.find(m => m.id === id)?.name ?? id;
      return buildSnapshot(id, name, MOCK_COMPARISON_ENTRIES);
    });
  }, [selectedComparisonIds, allComparisonMembers]);

  const toggleComparisonMember = useCallback((memberId: string) => {
    setSelectedComparisonIds(prev => {
      if (prev.includes(memberId)) return prev.filter(id => id !== memberId);
      if (prev.length >= COMPARISON_MAX_MEMBERS) return prev;
      return [...prev, memberId];
    });
  }, []);

  const openAddModal = useCallback(() => { setEditingEntry(null); setShowModal(true); }, []);
  const openEditModal = useCallback((entry: ProgressEntry) => { setEditingEntry(entry); setShowModal(true); }, []);
  const closeModal = useCallback(() => { setShowModal(false); setEditingEntry(null); }, []);

  const { confirm } = useConfirm();

  const handleDelete = useCallback(async (entryId: string) => {
    const ok = await confirm({
      title: 'Delete Progress Entry',
      message: 'Are you sure you want to delete this progress entry? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
    });
    if (!ok) return;
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
  }, [confirm]);

  const handleSave = useCallback((data: Omit<ProgressEntry, 'id' | 'memberId' | 'recordedBy'>) => {
    if (editingEntry) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editingEntry.id ? { ...editingEntry, ...data } : e))
      );
    } else {
      const newEntry: ProgressEntry = {
        ...data,
        id: Date.now().toString(),
        memberId: selectedMemberId,
        recordedBy: 'Trainer',
      };
      setEntries((prev) => [...prev, newEntry]);
    }
    closeModal();
  }, [editingEntry, selectedMemberId, closeModal]);

  return {
    // Individual tab
    memberEntries,
    selectedMemberId,
    setSelectedMemberId,
    activeMetric,
    setActiveMetric,
    showModal,
    editingEntry,
    openAddModal,
    openEditModal,
    closeModal,
    handleDelete,
    handleSave,
    // Tab
    activeTab,
    setActiveTab,
    // Comparison tab
    allComparisonMembers,
    selectedComparisonIds,
    toggleComparisonMember,
    comparisonSnapshots,
    activeComparisonMetric,
    setActiveComparisonMetric,
  };
};
