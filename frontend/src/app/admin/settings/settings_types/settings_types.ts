// RESPONSIBILITY: Defines all TypeScript types, interfaces, and the FetchState enum for the Settings module.
import { EMPTY_SETTINGS_FORM } from '@/app/admin/settings/settings_utils/SettingsSharedConstants';

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
