export interface UsageMeter {
  id: string;
  tenantId: string;
  tenantName: string;
  smsSent: number;
  smsLimit: number;
  databaseGb: number;
  mediaGb: number;
  storageLimitGb: number;
  activeMembers: number;
  memberLimit: number;
  billingCycleEnd: string;
}
