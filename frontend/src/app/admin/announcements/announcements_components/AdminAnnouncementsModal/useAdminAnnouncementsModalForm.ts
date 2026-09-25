"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation lifecycle, unsaved-change protection, and audience/branch selection logic for AdminAnnouncementsModal.
// DATA FLOW: Store draft → React Hook Form → Zod validation → AdminAnnouncementsLogic mutation → TanStack Query invalidation.

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminAnnouncementsLogic } from '@/app/admin/announcements/announcements_context/useAdminAnnouncementsLogic';
import { useAdminAnnouncementsStore } from '@/app/admin/announcements/announcements_store/useAdminAnnouncementsStore';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';
import { announcementFormValuesSchema } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsSchemas';
import { EMPTY_ANNOUNCEMENT_FORM } from '@/app/admin/announcements/announcements_utils/AdminAnnouncementsSharedConstants';
import type { AnnouncementFormValues } from '@/app/admin/announcements/announcements_types/AdminAnnouncementsTypes';

/** Owns the announcements modal form lifecycle and exposes view-ready React Hook Form controls. */
export function useAdminAnnouncementsModalForm() {
  const { showModal, setShowModal, editingAnnouncement, saveAnnouncement, saving } = useAdminAnnouncementsLogic();
  const { form: storeForm } = useAdminAnnouncementsStore();
  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementFormValuesSchema),
    defaultValues: storeForm ?? EMPTY_ANNOUNCEMENT_FORM,
  });
  const { register, handleSubmit, control, reset, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useUnsavedChangesGuard(isDirty);

  // EFFECT: Rehydrates the form whenever the modal opens with a create/edit draft from the feature store.
  useEffect(() => {
    if (showModal) reset(storeForm ?? EMPTY_ANNOUNCEMENT_FORM);
  }, [reset, showModal, storeForm]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) setShowModal(false);
  }, [confirmDiscardIfDirty, setShowModal]);

  const toggleArrayValue = useCallback(<T extends string>(items: T[], value: T): T[] => {
    return items.includes(value) ? items.filter((item) => item !== value) : [...items, value];
  }, []);

  return {
    showModal,
    editingAnnouncement,
    saving,
    isEdit: Boolean(editingAnnouncement),
    register,
    handleSubmit,
    control,
    errors,
    handleClose,
    saveAnnouncement,
    toggleArrayValue,
  };
}
