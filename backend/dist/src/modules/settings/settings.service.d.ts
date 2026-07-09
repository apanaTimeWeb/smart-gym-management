import { Repository } from 'typeorm';
import { Settings } from './entities/setting.entity';
export declare class SettingsService {
    private readonly settingRepository;
    constructor(settingRepository: Repository<Settings>);
    getSettings(): Promise<{
        success: boolean;
        data: Settings;
    }>;
    updateSettings(dto: any): Promise<{
        success: boolean;
        data: Settings | null;
    } | {
        success: boolean;
        data: Settings[];
    }>;
}
