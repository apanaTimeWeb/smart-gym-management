export class FeatureFlagNotFoundException extends Error {
  constructor(message = 'FeatureFlag not found') {
    super(message);
    this.name = 'FeatureFlagNotFoundException';
  }
}
