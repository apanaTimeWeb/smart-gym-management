'use client';// RESPONSIBILITY: Orchestrates the Product Management feature tabs and composes child views; it owns no direct API calls or business calculations.
import SuperadminFeaturesFlagsPanel from '@/app/frontend_superadmin/superadmin_features/superadmin_features_components/superadmin_features_flags_panel/SuperadminFeaturesFlagsPanel';
import SuperadminFeaturesHeader from '@/app/frontend_superadmin/superadmin_features/superadmin_features_components/superadmin_features_header/SuperadminFeaturesHeader';
import SuperadminFeaturesReleaseNotesPanel from '@/app/frontend_superadmin/superadmin_features/superadmin_features_components/superadmin_features_release_notes_panel/SuperadminFeaturesReleaseNotesPanel';
import SuperadminFeaturesFeatureHistoryModal from '@/app/frontend_superadmin/superadmin_features/superadmin_features_components/SuperadminFeaturesFeatureHistoryModal';
import SuperadminFeaturesFeatureRolloutModal from '@/app/frontend_superadmin/superadmin_features/superadmin_features_components/SuperadminFeaturesFeatureRolloutModal';
import SuperadminFeaturesTierMatrix from '@/app/frontend_superadmin/superadmin_features/superadmin_features_components/SuperadminFeaturesTierMatrix';
import { useSuperadminFeaturesMainViewModel } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesMainViewModel';



/**
 * @description Composes Product Management child sections and delegates state/mutation ownership to the feature-local view model.
 * @dependencies Uses only feature-local child components and the feature view-model; route providers remain outside this component.
 * @edge-case Loading/error states terminate before interactive children mount; mutation and dialog state are preserved in the feature hooks.
 */
export default function SuperadminFeaturesMain() {
  const {
    data,
    isPending,
    error,
    refetch,
    isPublishing,
    activeTab,
    setActiveTab,
    rolloutFlag,
    setRolloutFlag,
    historyFlag,
    setHistoryFlag,
    searchQuery,
    setSearchQuery,
    filteredFlags,
    register,
    handleSubmit,
    formState: { errors },
    onPublishNote,
    handleToggle,
    handleSaveRollout,
    t,
  } = useSuperadminFeaturesMainViewModel();

  const flags = data?.flags ?? [];
  const notes = data?.notes ?? [];

  if (isPending) {
    return (
      <div className="space-y-4 motion-safe:animate-pulse" data-testid="superadmin_features-superadmin-features-main-superadmin_features-main-loading">
        <div className="h-8 w-64 rounded bg-skeleton-base" />
        <div className="h-96 rounded-xl border border-border bg-skeleton-base" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin_features-superadmin-features-main-superadmin_features-main-error">
        <p className="font-medium text-danger">{t('ui.feature_data_could_not_be_loaded_2c1bc05')}</p>
        <p className="mt-2 text-sm text-secondary">{t('ui.please_retry_the_request_to_continue_8770b5f')}</p>
        <button  type="button" onClick={() => void refetch()} className="mt-4 min-h-11 min-w-32 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_features-superadmin-features-main-superadmin_features-main-retry">
          {t('ui.try_again_94b8c58')}
        </button>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <SuperadminFeaturesHeader activeTab={activeTab} onTabChange={setActiveTab} data-testid="superadmin_features-superadmin-features-header-interactive-1" />

      {activeTab === 'FLAGS' ? (
        <SuperadminFeaturesFlagsPanel
          flags={filteredFlags}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onManageRollout={setRolloutFlag}
          onViewHistory={setHistoryFlag}
          onToggle={handleToggle} data-testid="superadmin_features-superadmin-features-flags-panel-interactive-2"
        />
      ) : null}

      {activeTab === 'NOTES' ? (
        <SuperadminFeaturesReleaseNotesPanel
          notes={notes}
          isPublishing={isPublishing}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onPublishNote={onPublishNote} data-testid="superadmin_features-superadmin-features-release-notes-panel-interactive-3"
        />
      ) : null}

      {activeTab === 'TIERS' ? <SuperadminFeaturesTierMatrix /> : null}

      <SuperadminFeaturesFeatureRolloutModal
        isOpen={Boolean(rolloutFlag)}
        onClose={() => setRolloutFlag(null)}
        flag={rolloutFlag}
        onSaveRollout={handleSaveRollout} data-testid="superadmin_features-superadmin-features-feature-rollout-modal-interactive-4"
      />

      <SuperadminFeaturesFeatureHistoryModal
        isOpen={Boolean(historyFlag)}
        onClose={() => setHistoryFlag(null)}
        flag={historyFlag} data-testid="superadmin_features-superadmin-features-feature-history-modal-interactive-5"
      />

    </div>
  );
}
