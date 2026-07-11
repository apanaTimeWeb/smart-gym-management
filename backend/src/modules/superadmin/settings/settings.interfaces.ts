export interface ISettings {
  id: string;
  [key: string]: any;
}

export interface ISettingsListResponse {
  data: ISettings[];
  meta: { total: number; page: number; limit: number };
  message: string;
}
