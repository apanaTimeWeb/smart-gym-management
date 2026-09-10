'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useTrainerNotificationsLogic } from '@/app/trainer/notifications/notifications_context/useTrainerNotificationsLogic';

export type NotificationsContextType = ReturnType<typeof useTrainerNotificationsLogic>;

const TrainerNotificationsContext = createContext<NotificationsContextType | null>(null);

export function TrainerNotificationsProvider({ children }: { children: React.ReactNode }) {
  const logic = useTrainerNotificationsLogic();
  
  // Memoize the value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => logic, [
    logic.notifications,
    logic.unreadCount,
    logic.fetchState,
    logic.hasMore,
    logic.loadingMore,
    logic.loadMore,
    logic.markAllAsRead,
    logic.markAsRead,
  ]);

  return (
    <TrainerNotificationsContext.Provider value={value}>
      {children}
    </TrainerNotificationsContext.Provider>
  );
}

export function useTrainerNotificationsContext() {
  const context = useContext(TrainerNotificationsContext);
  if (!context) {
    throw new Error('useTrainerNotificationsContext must be used within a TrainerNotificationsProvider');
  }
  return context;
}
