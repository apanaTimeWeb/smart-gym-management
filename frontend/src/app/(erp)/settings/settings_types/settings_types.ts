import { EMPTY_SETTINGS_FORM } from '@/app/(erp)/settings/settings_utils/SettingsSharedConstants';

export interface SettingsContextType {
 activeTab: string;
 setActiveTab: (tab: string) => void;
 loading: boolean;
 saving: boolean;
 form: typeof EMPTY_SETTINGS_FORM;
 handleChange: (field: string, value: string) => void;
 fetchSettings: () => Promise<void>;
 handleSave: () => Promise<void>;
}
