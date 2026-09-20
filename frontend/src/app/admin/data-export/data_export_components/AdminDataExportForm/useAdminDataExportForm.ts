"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation, selection toggles, dirty-state protection, and submit lifecycle for AdminDataExportForm.
// DATA FLOW: Form input → Zod resolver → useAdminDataExportLogic mutation → MSW/API response → refreshed export history.

import { useCallback } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminDataExportLogic } from '@/app/admin/data-export/data_export_context/useAdminDataExportLogic';
import { useUnsavedChangesGuard } from '@/app/admin/admin_layout/admin_utils/useAdminUnsavedChangesGuard';
import { EMPTY_EXPORT_FORM } from '@/app/admin/data-export/data_export_utils/AdminDataExportSharedConstants';
import { exportFormSchema } from '@/app/admin/data-export/data_export_types/AdminDataExportSchemas';
import type { ExportFormValues } from '@/app/admin/data-export/data_export_types/AdminDataExportTypes';

/** Owns the data-export form lifecycle and only resets the form after a successful mutation. */
export function useAdminDataExportForm() {
  const { createExport, creating } = useAdminDataExportLogic();
  const form = useForm<ExportFormValues>({ resolver: zodResolver(exportFormSchema), defaultValues: EMPTY_EXPORT_FORM });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useUnsavedChangesGuard(isDirty);
  const formValues = useWatch({ control });
  const selectedFormat = formValues.format ?? EMPTY_EXPORT_FORM.format;
  const selectedDataType = formValues.dataType ?? EMPTY_EXPORT_FORM.dataType;
  const selectedGyms = formValues.gymIds ?? EMPTY_EXPORT_FORM.gymIds ?? [];

  const toggleGym = useCallback((value: string) => {
    if (value === 'all') {
      setValue('gymIds', ['all'], { shouldDirty: true });
      return;
    }
    const current = selectedGyms.filter((gym) => gym !== 'all');
    const next = current.includes(value) ? current.filter((gym) => gym !== value) : [...current, value];
    setValue('gymIds', next.length ? next : ['all'], { shouldDirty: true });
  }, [selectedGyms, setValue]);

  const onSubmit = useCallback(async (data: ExportFormValues) => {
    const succeeded = await createExport(data);
    if (succeeded) reset(EMPTY_EXPORT_FORM);
  }, [createExport, reset]);

  const clearForm = useCallback(async () => {
    if (await confirmDiscardIfDirty()) reset(EMPTY_EXPORT_FORM);
  }, [confirmDiscardIfDirty, reset]);

  return { creating, register, handleSubmit, setValue, errors, selectedFormat, selectedDataType, selectedGyms, toggleGym, onSubmit, clearForm };
}
