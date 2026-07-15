
export interface IGlobalSetting {
  id: string;
  key: string;
  value: string;
  group: string;
}

export interface SettingResponse {
  success: boolean;
  message: string;
  data: IGlobalSetting | IGlobalSetting[] | any | null;
}
