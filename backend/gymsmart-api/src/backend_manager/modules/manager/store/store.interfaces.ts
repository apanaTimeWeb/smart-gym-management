// RESPONSIBILITY: ORM-free domain contract for Manager store.
// FLOW: TypeORM entity -> StoreMapper -> StoreDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface StoreDomainData { id: string; payload: CoreJsonObject; }
