
export interface IFeatureFlag {
  id: string;
  name: string;
  description: string;
  isGlobalEnabled: boolean;
  enabledTenantIds: string[];
}

export interface FeatureResponse {
  success: boolean;
  message: string;
  data: IFeatureFlag | IFeatureFlag[] | any | null;
}
