// RESPONSIBILITY: ORM-free domain contract for Manager pt.
// FLOW: TypeORM entity -> PtMapper -> PtDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface PtDomainData { id: string; payload: CoreJsonObject; }
