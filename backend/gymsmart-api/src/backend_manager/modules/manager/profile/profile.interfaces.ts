// RESPONSIBILITY: ORM-free domain contract for Manager profile.
// FLOW: TypeORM entity -> ProfileMapper -> ProfileDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface ProfileDomainData { id: string; payload: CoreJsonObject; }
