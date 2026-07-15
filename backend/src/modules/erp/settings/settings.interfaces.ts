export interface ISettings {
  id: number;
  gymName: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  gstNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SettingsResponse {
  success: boolean;
  message: string;
  data: ISettings;
}
