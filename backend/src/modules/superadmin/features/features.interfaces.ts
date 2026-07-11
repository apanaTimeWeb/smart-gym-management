
export interface IFeatureFlag {
  id: string;
  name: string;
  description: string;
  isGlobalEnabled: boolean;
  enabledTenantIds: string[];
}
