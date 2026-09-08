// RESPONSIBILITY: Custom hook encapsulating UI state for schedule module.
import { useState, useCallback, useEffect } from 'react';
import type { TrainerScheduleContextType, LeaveRequest, WeeklyAvailability } from '@/app/trainer/schedule/schedule_types/TrainerScheduleTypes';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';

export function useTrainerScheduleLogic(): TrainerScheduleContextType {
  const [activeTab, setActiveTab] = useState<'availability' | 'leaves'>('availability');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadSchedule = useTrainerScheduleStore(s => s.loadSchedule);
  const updateAvailability = useTrainerScheduleStore(s => s.updateAvailability);
  const requestLeave = useTrainerScheduleStore(s => s.requestLeave);

  useEffect(() => {
    loadSchedule().catch(() => setToast({ message: 'Failed to load schedule', type: 'error' }));
  }, [loadSchedule]);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ message: msg, type });
  }, []);

  const hideToast = useCallback(() => setToast(null), []);

  const openLeaveModal = useCallback(() => {
    setShowLeaveModal(true);
  }, []);

  const submitLeave = useCallback(async (data: Partial<LeaveRequest>) => {
    try {
      await requestLeave(data);
      showToast('Leave request submitted successfully.', 'success');
      setShowLeaveModal(false);
    } catch {
      showToast('Failed to submit leave request.', 'error');
    }
  }, [requestLeave, showToast]);

  const saveAvailability = useCallback(async (data: WeeklyAvailability[]) => {
    try {
      await updateAvailability(data);
      showToast('Availability schedule updated.', 'success');
    } catch {
      showToast('Failed to update availability.', 'error');
    }
  }, [updateAvailability, showToast]);

  return {
    activeTab, setActiveTab,
    showLeaveModal, setShowLeaveModal,
    toast, showToast, hideToast,
    openLeaveModal, submitLeave, saveAvailability
  };
}
