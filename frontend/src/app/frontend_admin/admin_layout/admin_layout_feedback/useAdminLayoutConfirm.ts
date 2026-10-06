"use client";
// RESPONSIBILITY: Exposes the shared Admin confirmation-dialog service.
// DATA FLOW: Admin feature → useAdminLayoutConfirm → AdminConfirmContext → AdminLayoutConfirmModal.
import { useContext } from 'react';
import { ConfirmContext } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutConfirmProvider';
/** Coordinates Confirm state, data flow, and feature behavior. */
export const useAdminLayoutConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('Admin confirmation provider is required.');
  return context;
};
