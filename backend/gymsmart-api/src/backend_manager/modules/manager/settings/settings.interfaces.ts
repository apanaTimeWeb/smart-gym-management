// RESPONSIBILITY: ORM-free domain contract for Manager settings.
// FLOW: TypeORM entity -> SettingsMapper -> SettingsDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface SettingsDomainData { id: string; payload: CoreJsonObject; }
