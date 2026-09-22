// RESPONSIBILITY: Defines finite members domain values frozen by the Trainer UI and enforced by DTO/entity/database layers.
// FLOW: Frontend value → DTO enum validation → domain/entity enum → tenant DB enum.
export enum MemberStatus { ACTIVE='ACTIVE', INACTIVE='INACTIVE', EXPIRED='EXPIRED', PENDING='PENDING' }
export enum MemberProgressStatus { GOOD='Good', AVERAGE='Average', NEEDS_ATTENTION='Needs Attention' }
export enum MemberGender { MALE='MALE', FEMALE='FEMALE', OTHER='OTHER' }
export enum MemberBillingCycle { MONTHLY='Monthly', QUARTERLY='Quarterly', YEARLY='Yearly' }
