// RESPONSIBILITY: ORM-free domain contract for Manager library.
// FLOW: TypeORM entity -> LibraryMapper -> LibraryDomainData -> use case/controller.
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
export interface LibraryDomainData { id: string; payload: CoreJsonObject; }
