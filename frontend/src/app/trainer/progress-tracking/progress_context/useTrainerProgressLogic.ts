// RESPONSIBILITY: Logic hook for the Trainer Progress Tracking module. Manages all API interactions, entry state, and comparison state.
// DATA FLOW: TrainerProgressApi + trainerSharedApi → useTrainerProgressLogic → TrainerProgressMain
// CRITICAL: selectedMemberId MUST come from URL params — NEVER hardcoded.

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type {
  ProgressEntry,
  ProgressChartMetric,
  ComparisonMemberSnapshot,
  ComparisonMetric,
  ProgressFetchState,
  CreateProgressEntryDto,
} from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { COMPARISON_MAX_MEMBERS } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';
import {
  fetchProgressEntries,
  createProgressEntry,
  updateProgressEntry,
  deleteProgressEntry,
} from '@/app/trainer/progress-tracking/progress_api/TrainerProgressApi';
import { trainerSharedApi } from '@/app/trainer/trainer_api/trainer_api';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

type ProgressTab = 'individual' | 'compare';

interface AssignedMember {
  id: string;
  name: string;
}

/**
 * Computes a comparison snapshot for a single member from their full progress entry list.
 * Calculates weight/fat/muscle deltas between first and latest recorded entry.
 */
function buildSnapshot(memberId: string, memberName: string, entries: ProgressEntry[]): ComparisonMemberSnapshot {
  const memberEntries = entries
    .filter(e => e.memberId === memberId)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (memberEntries.length === 0) {
    return { memberId, memberName, latestWeightKg: null, latestBmi: null, latestBodyFatPercent: null, latestMuscleMassKg: null, weightChangeKg: null, bodyFatChange: null, muscleMassChange: null, totalEntries: 0, trend: 'insufficient' };
  }

  const first = memberEntries[0]!;
  const latest = memberEntries[memberEntries.length - 1]!;
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
  // selectedMemberId is driven by URL ?memberId= param — never hardcoded.
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedMemberId = searchParams.get('memberId') ?? '';
  const setSelectedMemberId = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set('memberId', id);
    else params.delete('memberId');
    router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  // Individual tab state
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [fetchState, setFetchState] = useState<ProgressFetchState>('idle');
  const [activeMetric, setActiveMetric] = useState<ProgressChartMetric>('weight');
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<ProgressEntry | null>(null);

  // Comparison tab state
  const [activeTab, setActiveTab] = useState<ProgressTab>('individual');
  const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>([]);
  const [selectedComparisonIds, setSelectedComparisonIds] = useState<string[]>([]);
  const [comparisonEntriesMap, setComparisonEntriesMap] = useState<Map<string, ProgressEntry[]>>(new Map());
  const [activeComparisonMetric, setActiveComparisonMetric] = useState<ComparisonMetric>('weightChangeKg');

  const { confirm } = useConfirm();

  // Fetch the trainer's assigned members once on mount — used for both member selector and comparison list.
  // WHY: member list is stable per trainer session; one fetch suffices for both tabs.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await trainerSharedApi.fetchMembersBasic({ limit: '200', status: 'active' }) as {
          data?: { members?: AssignedMember[] } | AssignedMember[];
        };
        if (cancelled) return;
        const raw = (res.data as { members?: AssignedMember[] })?.members
          ?? (res.data as AssignedMember[])
          ?? [];
        setAssignedMembers(raw.map(m => ({ id: m.id, name: m.name })));
      } catch {
        // Non-critical; comparison selector will be empty
      }
    };
    void load();
    return () => { cancelled = true; };
  }, []);

  // Fetch progress entries for the selected member whenever selectedMemberId changes.
  // WHY: each member has a separate progress entry set; re-fetch on every member switch.
  useEffect(() => {
    if (!selectedMemberId) {
      setEntries([]);
      setFetchState('idle');
      return;
    }
    let cancelled = false;
    const load = async () => {
      setFetchState('loading');
      try {
        const data = await fetchProgressEntries(selectedMemberId);
        if (!cancelled) {
          setEntries(data);
          setFetchState('success');
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[useTrainerProgressLogic] fetchProgressEntries failed:', (err as Error).message);
          setFetchState('error');
        }
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [selectedMemberId]);

  // Fetch progress entries for each comparison member as they are selected.
  // WHY: each member's entries are fetched lazily to avoid over-fetching all members upfront.
  useEffect(() => {
    const fetchMissing = async () => {
      for (const memberId of selectedComparisonIds) {
        if (!comparisonEntriesMap.has(memberId)) {
          try {
            const data = await fetchProgressEntries(memberId);
            setComparisonEntriesMap(prev => new Map(prev).set(memberId, data));
          } catch {
            // Set empty array so we don't re-fetch on every render
            setComparisonEntriesMap(prev => new Map(prev).set(memberId, []));
          }
        }
      }
    };
    void fetchMissing();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedComparisonIds]); // comparisonEntriesMap intentionally excluded to avoid infinite loop

  const memberEntries = useMemo(
    () => entries.filter((e) => e.memberId === selectedMemberId),
    [entries, selectedMemberId]
  );

  const allComparisonMembers = useMemo(() => assignedMembers, [assignedMembers]);

  const comparisonSnapshots = useMemo<ComparisonMemberSnapshot[]>(() => {
    return selectedComparisonIds.map(id => {
      const name = allComparisonMembers.find(m => m.id === id)?.name ?? id;
      const memberProgressEntries = comparisonEntriesMap.get(id) ?? [];
      return buildSnapshot(id, name, memberProgressEntries);
    });
  }, [selectedComparisonIds, allComparisonMembers, comparisonEntriesMap]);

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

  const handleDelete = useCallback(async (entryId: string) => {
    const ok = await confirm({
      title: 'Delete Progress Entry',
      message: 'Are you sure you want to delete this progress entry? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Delete',
    });
    if (!ok) return;
    try {
      await deleteProgressEntry(selectedMemberId, entryId);
      setEntries(prev => prev.filter(e => e.id !== entryId));
    } catch (err) {
      console.error('[useTrainerProgressLogic] deleteProgressEntry failed:', (err as Error).message);
    }
  }, [confirm, selectedMemberId]);

  const handleSave = useCallback(async (data: Omit<ProgressEntry, 'id' | 'memberId' | 'recordedBy'>) => {
    const dto: CreateProgressEntryDto = {
      date: data.date,
      weightKg: data.weightKg,
      heightCm: data.heightCm,
      bodyFatPercent: data.bodyFatPercent,
      muscleMassKg: data.muscleMassKg,
      waistCm: data.waistCm,
      notes: data.notes,
    };
    try {
      if (editingEntry) {
        const updated = await updateProgressEntry(selectedMemberId, editingEntry.id, dto);
        setEntries(prev => prev.map(e => e.id === editingEntry.id ? updated : e));
      } else {
        const created = await createProgressEntry(selectedMemberId, dto);
        setEntries(prev => [...prev, created]);
      }
      closeModal();
    } catch (err) {
      console.error('[useTrainerProgressLogic] save failed:', (err as Error).message);
    }
  }, [editingEntry, selectedMemberId, closeModal]);

  return {
    // Individual tab
    memberEntries,
    entries,
    fetchState,
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
