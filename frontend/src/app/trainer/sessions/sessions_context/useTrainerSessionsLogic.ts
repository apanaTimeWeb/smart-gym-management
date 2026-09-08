// RESPONSIBILITY: Logic hook for the Trainer Sessions module. Manages filter, date, and modal state.
// DATA FLOW: TrainerSessionsSharedConstants (mock) → useTrainerSessionsLogic → TrainerSessionsMain

import { useState, useCallback } from 'react';
import type { SessionFilter } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
import { MOCK_SESSIONS } from '@/app/trainer/sessions/sessions_utils/TrainerSessionsSharedConstants';

export const useTrainerSessionsLogic = () => {
  const [filter, setFilter] = useState<SessionFilter>('All');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0] ?? '');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const filteredSessions = MOCK_SESSIONS.filter(
    (s) => filter === 'All' || s.type === filter
  );

  const openScheduleModal = useCallback(() => setShowScheduleModal(true), []);
  const closeScheduleModal = useCallback(() => setShowScheduleModal(false), []);

  return {
    filter,
    setFilter,
    date,
    setDate,
    showScheduleModal,
    openScheduleModal,
    closeScheduleModal,
    filteredSessions,
  };
};
