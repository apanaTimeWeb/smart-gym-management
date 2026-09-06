export interface WafConfig {
  geoBlockingEnabled: boolean;
  blockedCountries: string[]; // e.g. ['RU', 'CN']
  rateLimitEnabled: boolean;
  maxRequestsPerMinute: number;
}

export interface BlockedIp {
  id: string;
  ipAddress: string;
  reason: string;
  blockedAt: string;
}

export interface ThreatLog {
  id: string;
  ipAddress: string;
  eventType: 'BRUTE_FORCE' | 'UNAUTHORIZED_ACCESS' | 'SUSPICIOUS_PAYLOAD';
  targetGymId?: string;
  timestamp: string;
  status: 'BLOCKED' | 'FLAGGED' | 'INVESTIGATING';
}

export interface SecurityDataResponse {
  wafConfig: WafConfig;
  blockedIps: BlockedIp[];
  threats: ThreatLog[];
}
