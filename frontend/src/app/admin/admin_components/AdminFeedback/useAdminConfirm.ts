"use client";
// DATA FLOW: Admin feature → useAdminConfirm → AdminConfirmContext → AdminConfirmModal.
// RESPONSIBILITY: Exposes the shared Admin confirmation-dialog service.
import { useContext } from 'react';
import { ConfirmContext } from '@/app/admin/admin_components/AdminFeedback/AdminConfirmProvider';
export const useAdminConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('Admin confirmation provider is required.');
  return context;
};
