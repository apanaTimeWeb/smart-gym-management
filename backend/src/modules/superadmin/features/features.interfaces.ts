export interface IFeatures {
  id: string;
  [key: string]: any;
}

export interface IFeaturesListResponse {
  data: IFeatures[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
