// RESPONSIBILITY: Defines canonical members enums; API labels are translated by TrainerMembersEnumMapper.
// FLOW: Frontend label → DTO transform → canonical enum → TypeORM enum → API mapper → frontend label.
export enum MemberStatus { ACTIVE='ACTIVE', INACTIVE='INACTIVE', EXPIRED='EXPIRED', PENDING='PENDING' }
export enum MemberProgressStatus { GOOD='GOOD', AVERAGE='AVERAGE', NEEDS_ATTENTION='NEEDS_ATTENTION' }
export enum MemberGender { MALE='MALE', FEMALE='FEMALE', OTHER='OTHER' }
export enum MemberBillingCycle { MONTHLY='MONTHLY', QUARTERLY='QUARTERLY', YEARLY='YEARLY' }
