// RESPONSIBILITY: Custom hook to use the AdminConfirm context.
'use client';

import { useContext } from 'react';
import { ConfirmContext } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';

export const useAdminConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useAdminConfirm must be used within AdminConfirmProvider");
  return context;
};
