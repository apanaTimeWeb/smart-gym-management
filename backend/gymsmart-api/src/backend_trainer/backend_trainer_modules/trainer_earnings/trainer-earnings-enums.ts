// RESPONSIBILITY: Defines canonical earnings enums; API labels are translated by TrainerEarningsEnumMapper.
// FLOW: Frontend label/DB row → canonical enum → API mapper.
export enum EarningsHistoryType { SESSION='SESSION', BONUS='BONUS', COMMISSION='COMMISSION' }
export enum EarningsStatus { PENDING='PENDING', PROCESSING='PROCESSING', SETTLED='SETTLED' }
export enum EarningsRelatedSessionStatus { COMPLETED='COMPLETED' }
