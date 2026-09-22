// RESPONSIBILITY: ORM-free domain contract for Manager communications.
// FLOW: TypeORM entity -> CommunicationsMapper -> CommunicationsDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface CommunicationsDomainData { id: string; payload: CoreJsonObject; }
