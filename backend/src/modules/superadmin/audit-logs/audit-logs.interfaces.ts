
export interface IGlobalAuditLog {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetResource: string;
  ipAddress: string;
  timestamp: Date;
}
