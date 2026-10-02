'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminFeaturesMainViewModel → consuming feature component.
import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { useSuperadminFeaturesData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesData';
import { useSuperadminFeaturesFilteredFlags } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFilteredFlags';
import { releaseNoteSchema } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_schemas/SuperadminFeaturesUiSchema';
import { useSuperadminLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_hooks/useSuperadminLayoutUnsavedChangesGuard';

import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { FeaturesTab, ReleaseNoteFormValues } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesUiTypes';



// DATA FLOW: API / URL state / module client state → useRef → superadmin_features view components.
/**
 * @description Owns Product Management page state, form orchestration, mutation intents, and feature-local feedback.
 * @dependencies Uses the module server-state hook, confirmation infrastructure, and feature-local validation contract.
 * @edge-case Idempotency keys persist across retry attempts for the same user intent and clear only after success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminFeaturesMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin features main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminFeaturesMainViewModel() {
  const t = useTranslations('superadmin_features');
  const [activeTab, setActiveTab] = useState<FeaturesTab>('FLAGS');
  const [rolloutFlag, setRolloutFlag] = useState<FeatureFlag | null>(null);
  const [historyFlag, setHistoryFlag] = useState<FeatureFlag | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const releaseNoteIdempotencyKeyRef = useRef<string | null>(null);
  const featureFlagIdempotencyKeysRef = useRef(new Map<string, string>());
  const form = useForm<ReleaseNoteFormValues>({ resolver: zodResolver(releaseNoteSchema), defaultValues: { version: '', title: '', content: '' } });
  const { confirm } = useConfirm();
  const dataState = useSuperadminFeaturesData();
  const filteredFlags = useSuperadminFeaturesFilteredFlags(dataState.data?.flags ?? [], searchQuery);

  useSuperadminLayoutUnsavedChangesGuard(form.formState.isDirty && activeTab === 'NOTES', t('ui.unsaved_release_note_discard'));

  const onPublishNote = async (formData: ReleaseNoteFormValues) => {
    const confirmed = await confirm({ title: t('ui.confirm_publish_release_note_title'), message: t('ui.confirm_publish_release_note_message'), type: 'warning', confirmText: t('ui.publish_action'), cancelText: t('ui.cancel_action') });
    if (!confirmed) return;
    try {
      releaseNoteIdempotencyKeyRef.current ??= crypto.randomUUID();
      const response = await dataState.publishNote({ data: { ...formData, isPublished: true }, idempotencyKey: releaseNoteIdempotencyKeyRef.current });
      if (response.success && response.data) {
        releaseNoteIdempotencyKeyRef.current = null;
        form.reset();
        toast.success(response.message, { id: 'release-note-published-successfully' });
      }
    } catch (error: unknown) {
      const message = t('ui.action_failed_retry');
      toast.error(message, { id: 'release-note-publish-error' });
    }
  };

  const handleToggle = async (flag: FeatureFlag) => {
    const nextEnabledState = !flag.isGlobalEnabled;
    const confirmed = await confirm({ title: nextEnabledState ? t('ui.enable_feature_flag_title') : t('ui.suspend_feature_flag_title'), message: nextEnabledState ? t('ui.enable_feature_flag_message', { name: flag.name }) : t('ui.suspend_feature_flag_message', { name: flag.name }), type: 'warning', confirmText: nextEnabledState ? t('ui.enable_action') : t('ui.suspend_action'), cancelText: t('ui.cancel_action') });
    if (!confirmed) return;
    try {
      const existingKey = featureFlagIdempotencyKeysRef.current.get(flag.id);
      const idempotencyKey = existingKey ?? crypto.randomUUID();
      featureFlagIdempotencyKeysRef.current.set(flag.id, idempotencyKey);
      const response = await dataState.updateFeatureFlagStatus({ id: flag.id, enabled: nextEnabledState, idempotencyKey });
      featureFlagIdempotencyKeysRef.current.delete(flag.id);
      toast.success(response.message, { id: `feature-flag-status-${flag.id}` });
    } catch (error: unknown) {
      const message = t('ui.action_failed_retry');
      toast.error(message, { id: `feature-flag-status-error-${flag.id}` });
    }
  };

  const handleSaveRollout = async (tenantIds: string[], idempotencyKey: string) => {
    if (!rolloutFlag) return;
    try {
      const response = await dataState.updateFlag({ id: rolloutFlag.id, body: { enabledTenantIds: tenantIds }, idempotencyKey });
      toast.success(response.message, { id: 'canary-rollout-updated-successfully' });
    } catch (error: unknown) {
      const message = t('ui.action_failed_retry');
      toast.error(message, { id: 'failed-to-update-canary-rollout' });
      throw error;
    }
  };

  return {
    t,
    ...dataState,
    ...form,
    activeTab,
    setActiveTab,
    rolloutFlag,
    setRolloutFlag,
    historyFlag,
    setHistoryFlag,
    searchQuery,
    setSearchQuery,
    filteredFlags,
    onPublishNote,
    handleToggle,
    handleSaveRollout,
  };
}
