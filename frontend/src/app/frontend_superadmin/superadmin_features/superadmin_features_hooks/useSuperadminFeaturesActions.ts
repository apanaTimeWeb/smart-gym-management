// DATA FLOW: Feature UI intent → confirmation → feature mutation hook → authoritative response → toast/cache-visible result.
// RESPONSIBILITY: Owns release-note publication, feature-flag toggles, and tenant rollout actions for the Superadmin Features module.
'use client';

import { useRef } from 'react';
import toast from 'react-hot-toast';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import type { FeatureFlag, ReleaseNote } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesTypes';
import type { SuperadminFeaturesActionsConfig } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesActionsTypes';
import type { ReleaseNoteFormValues } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_types/SuperadminFeaturesUiTypes';
import type { useSuperadminFeaturesData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesData';

/**
 * @description Coordinates confirmed feature-management mutations for release notes, flags, and tenant rollout updates.
 * @dependencies Consumes the feature-owned mutation functions and confirmation infrastructure passed through the config object.
 * @edge-case Reuses one idempotency key per user intent and preserves the authoritative backend response while exposing translated safe failure feedback.
 */

/**
 * @description Owns user-confirmed feature-management actions so the root view remains presentation-focused.
 * @dependencies Uses the module data/mutation hook contract, approval dialog infrastructure, and existing translations supplied by the caller.
 * @edge-case Reuses the same idempotency key for retries of one intent and clears it only after the corresponding mutation succeeds.
 */
export function useSuperadminFeaturesActions(config: SuperadminFeaturesActionsConfig, translate: (key: string, values?: Record<string, string>) => string) {
  const { confirm } = useConfirm();
  const releaseNoteKeyRef = useRef<string | null>(null);
  const flagKeysRef = useRef(new Map<string, string>());

  const onPublishNote = async (formData: ReleaseNoteFormValues) => {
    const confirmed = await confirm({
      title: translate('ui.confirm_publish_release_note_title'),
      message: translate('ui.confirm_publish_release_note_message'),
      type: 'warning',
      confirmText: translate('ui.publish_action'),
      cancelText: translate('ui.cancel_action'),
    });
    if (!confirmed) return;
    try {
      releaseNoteKeyRef.current ??= crypto.randomUUID();
      const response = await config.publishNote({ data: { ...formData, isPublished: true }, idempotencyKey: releaseNoteKeyRef.current });
      if (response.success && response.data) {
        releaseNoteKeyRef.current = null;
        config.resetReleaseNoteForm();
        toast.success(response.message, { id: 'release-note-published-successfully' });
      }
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: 'release-note-publish-error' });
    }
  };

  const handleToggle = async (flag: FeatureFlag) => {
    const nextEnabledState = !flag.isGlobalEnabled;
    const confirmed = await confirm({
      title: nextEnabledState ? translate('ui.enable_feature_flag_title') : translate('ui.suspend_feature_flag_title'),
      message: nextEnabledState ? translate('ui.enable_feature_flag_message', { name: flag.name }) : translate('ui.suspend_feature_flag_message', { name: flag.name }),
      type: 'warning',
      confirmText: nextEnabledState ? translate('ui.enable_action') : translate('ui.suspend_action'),
      cancelText: translate('ui.cancel_action'),
    });
    if (!confirmed) return;
    try {
      const idempotencyKey = flagKeysRef.current.get(flag.id) ?? crypto.randomUUID();
      flagKeysRef.current.set(flag.id, idempotencyKey);
      const response = await config.updateFeatureFlagStatus({ id: flag.id, enabled: nextEnabledState, idempotencyKey });
      flagKeysRef.current.delete(flag.id);
      toast.success(response.message, { id: `feature-flag-status-${flag.id}` });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: `feature-flag-status-error-${flag.id}` });
    }
  };

  const handleSaveRollout = async (tenantIds: string[], idempotencyKey: string) => {
    if (!config.rolloutFlag) return;
    try {
      const response = await config.updateFlag({ id: config.rolloutFlag.id, body: { enabledTenantIds: tenantIds }, idempotencyKey });
      toast.success(response.message, { id: 'canary-rollout-updated-successfully' });
    } catch (error: unknown) {
      toast.error(translate('ui.action_failed_retry'), { id: 'failed-to-update-canary-rollout' });
      throw error;
    }
  };

  return { onPublishNote, handleToggle, handleSaveRollout };
}
