import { SettingsService } from "./settings.service";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<{
        success: boolean;
        data: import("./entities/setting.entity").Settings;
    }>;
    updateSettings(dto: any): Promise<{
        success: boolean;
        data: import("./entities/setting.entity").Settings | null;
    } | {
        success: boolean;
        data: import("./entities/setting.entity").Settings[];
    }>;
}
