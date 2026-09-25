// RESPONSIBILITY: Declares finite plan-upgrade request states.
// FLOW: Database enum -> upgrade request entity -> usage/subscription services.
export enum AdminCoreMasterUpgradeRequestStatus { PENDING='PENDING', APPROVED='APPROVED', REJECTED='REJECTED', FULFILLED='FULFILLED' }
