// RESPONSIBILITY: Logic hook for the Trainer Progress Tracking module.
// DATA FLOW: SharedConstants (mock) → useTrainerProgressLogic → TrainerProgressMain

import { useState, useCallback, useMemo } from 'react';
import type { ProgressEntry, ProgressChartMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { MOCK_PROGRESS_ENTRIES } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';

export const useTrainerProgressLogic = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>(MOCK_PROGRESS_ENTRIES);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('m1');
  const [activeMetric, setActiveMetric] = useState<ProgressChartMetric>('weight');
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ProgressEntry | null>(null);

  const memberEntries = useMemo(
    () => entries.filter((e) => e.memberId === selectedMemberId),
    [entries, selectedMemberId]
  );

  const openAddModal = useCallback(() => {
    setEditingEntry(null);
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((entry: ProgressEntry) => {
    setEditingEntry(entry);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingEntry(null);
  }, []);

  const handleDelete = useCallback((entryId: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
  }, []);

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
  };
};
