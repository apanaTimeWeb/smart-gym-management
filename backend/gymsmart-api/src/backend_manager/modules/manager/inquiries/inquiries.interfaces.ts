// RESPONSIBILITY: ORM-free domain contract for Manager inquiries.
// FLOW: TypeORM entity -> InquiriesMapper -> InquiriesDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface InquiriesDomainData { id: string; payload: CoreJsonObject; }
