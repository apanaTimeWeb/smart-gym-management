export interface SuperadminFeaturesActionsConfig {
  publishNote: ReturnType<typeof useSuperadminFeaturesData>['publishNote'];
  updateFeatureFlagStatus: ReturnType<typeof useSuperadminFeaturesData>['updateFeatureFlagStatus'];
  updateFlag: ReturnType<typeof useSuperadminFeaturesData>['updateFlag'];
  rolloutFlag: FeatureFlag | null;
  resetReleaseNoteForm: () => void;
}
