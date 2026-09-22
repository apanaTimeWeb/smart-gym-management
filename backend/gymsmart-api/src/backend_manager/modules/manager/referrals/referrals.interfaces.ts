// RESPONSIBILITY: ORM-free domain contract for Manager referrals.
// FLOW: TypeORM entity -> ReferralsMapper -> ReferralsDomainData -> use case/controller.
import type { CoreJsonObject } from '@/core/types/json-value.types';
export interface ReferralsDomainData { id: string; payload: CoreJsonObject; }
