// RESPONSIBILITY: Logic hook for the Trainer Sessions module. Manages filter, date, modal state, and all API interactions.
// DATA FLOW: TrainerSessionsApi → useTrainerSessionsLogic → TrainerSessionsMain

'use client';

import { useState, useCallback, useEffect } from 'react';
import type { SessionFilter, TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import {
  fetchTrainerSessions,
  createTrainerSession,
  cancelTrainerSession,
  type CreateSessionDto,
} from '@/app/trainer/sessions/sessions_api/TrainerSessionsApi';
import { trainerSharedApi } from '@/app/trainer/trainer_api/trainer_api';
import type { FetchState } from '@/app/trainer/trainer_types/trainer_types';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

interface MemberOption {
  value: string;
  label: string;
}

export interface TrainerSessionsLogicReturn {
  // List state
  sessions: TrainerSession[];
  fetchState: FetchState;
  // Filters
  filter: SessionFilter;
  setFilter: (f: SessionFilter) => void;
  date: string;
  setDate: (d: string) => void;
  // Schedule modal
  showScheduleModal: boolean;
  openScheduleModal: () => void;
  closeScheduleModal: () => void;
  memberOptions: MemberOption[];
  handleScheduleSubmit: (dto: CreateSessionDto) => Promise<void>;
  isSubmitting: boolean;
  // Editing & attendance modals
  setSessions: React.Dispatch<React.SetStateAction<TrainerSession[]>>;
  // Cancel
  handleCancelSession: (sessionId: string) => Promise<void>;
  // Toast
  toast: { message: string; type: 'success' | 'error' } | null;
  clearToast: () => void;
}

export const useTrainerSessionsLogic = (): TrainerSessionsLogicReturn => {
  const { confirm } = useConfirm();

  const [filter, setFilter] = useState<SessionFilter>('All');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0] ?? '');
  const [sessions, setSessions] = useState<TrainerSession[]>([]);
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [memberOptions, setMemberOptions] = useState<MemberOption[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  }, []);

  const clearToast = useCallback(() => setToast(null), []);

  // Fetch sessions whenever date changes (Rule 67: explicit param propagation)
  // WHY: date is the only server-side filter for sessions — re-fetch on every date change.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setFetchState('loading');
      try {
        const data = await fetchTrainerSessions(date);
        if (!cancelled) {
          setSessions(data);
          setFetchState('success');
        }
      } catch (err) {
        if (!cancelled) {
          showToast((err as Error).message ?? 'Failed to load sessions', 'error');
          setFetchState('error');
        }
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [date, showToast]);

  // Fetch assigned members once on mount for the Schedule PT modal member selector
  // WHY: member list is static per trainer session — fetched once, not per date change.
  useEffect(() => {
    let cancelled = false;
    const loadMembers = async () => {
      try {
        const res = await trainerSharedApi.fetchMembersBasic({ limit: '200', status: 'active' }) as {
          data?: { members?: { id: string; name: string }[] } | { id: string; name: string }[];
        };
        if (cancelled) return;
        const raw = (res.data as { members?: { id: string; name: string }[] })?.members
          ?? (res.data as { id: string; name: string }[])
          ?? [];
        setMemberOptions(raw.map(m => ({ value: m.id, label: m.name })));
      } catch {
        // Non-critical — member selector will be empty; trainer can still view sessions
      }
    };
    void loadMembers();
    return () => { cancelled = true; };
  }, []);

  const openScheduleModal = useCallback(() => setShowScheduleModal(true), []);
  const closeScheduleModal = useCallback(() => setShowScheduleModal(false), []);

  const handleScheduleSubmit = useCallback(async (dto: CreateSessionDto) => {
    setIsSubmitting(true);
    try {
      const newSession = await createTrainerSession(dto);
      setSessions(prev => [newSession, ...prev]);
      showToast('Session scheduled successfully', 'success');
      setShowScheduleModal(false);
    } catch (err) {
      showToast((err as Error).message ?? 'Failed to schedule session', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [showToast]);

  const handleCancelSession = useCallback(async (sessionId: string) => {
    const ok = await confirm({
      title: 'Cancel Session',
      message: 'Are you sure you want to cancel this session? This action cannot be undone.',
      type: 'danger',
      confirmText: 'Cancel Session',
    });
    if (!ok) return;
    try {
      await cancelTrainerSession(sessionId);
      setSessions(prev =>
        prev.map(s => s.id === sessionId ? { ...s, status: 'Cancelled' as const } : s)
      );
      showToast('Session cancelled', 'success');
    } catch (err) {
      showToast((err as Error).message ?? 'Failed to cancel session', 'error');
    }
  }, [confirm, showToast]);

  return {
    sessions,
    setSessions,
    fetchState,
    filter,
    setFilter,
    date,
    setDate,
    showScheduleModal,
    openScheduleModal,
    closeScheduleModal,
    memberOptions,
    handleScheduleSubmit,
    isSubmitting,
    handleCancelSession,
    toast,
    clearToast,
  };
};
