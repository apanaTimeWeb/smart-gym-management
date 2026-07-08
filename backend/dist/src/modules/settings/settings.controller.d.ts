import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            gymName: string;
            ownerName: string | null;
            city: string | null;
            gstNumber: string | null;
        };
    }>;
    updateSettings(dto: any): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            gymName: string;
            ownerName: string | null;
            city: string | null;
            gstNumber: string | null;
        };
    }>;
}
