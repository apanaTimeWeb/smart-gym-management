export type SaaSPlanTier = 'BASIC' | 'PRO' | 'ENTERPRISE';
export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';

export interface Tenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: TenantStatus;
  plan: SaaSPlanTier;
  createdAt: string;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  tenantName: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetEntity: string;
  targetId: string;
  timestamp: string;
  details: string;
}

export interface SaaSDashboardMetrics {
  totalGyms: number;
  activeGyms: number;
  suspendedGyms: number;
  totalEndUsers: number;
  monthlyRecurringRevenue: number;
  recentOnboards: Tenant[];
}

// Phase 2 Types
export interface SubscriptionPlan {
  id: string;
  name: SaaSPlanTier;
  priceMonthly: number;
  priceAnnual: number;
  maxMembers: number;
  maxStaff: number;
  features: string[];
  activeTenants: number;
}

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SupportTicket {
  id: string;
  tenantName: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  lastUpdated: string;
}

export interface BackgroundJob {
  id: string;
  queueName: string;
  jobName: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'DELAYED';
  attempts: number;
  error?: string;
  createdAt: string;
}

export interface BackupRecord {
  id: string;
  tenantName: string;
  databaseName: string;
  sizeMB: number;
  status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
  timestamp: string;
}

// Phase 3 Types
export interface SaaSInvoice {
  id: string;
  tenantName: string;
  amount: number;
  currency: string;
  status: 'PAID' | 'PENDING' | 'FAILED';
  date: string;
  planName: SaaSPlanTier;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isGlobalEnabled: boolean;
  enabledTenantIds: string[];
}

export interface ReleaseNote {
  id: string;
  version: string;
  title: string;
  content: string;
  date: string;
  isPublished: boolean;
}

export interface SchemaMigration {
  id: string;
  name: string;
  appliedAt: string | null;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

// Phase 4 Types
export interface GlobalAuditLog {
  id: string;
  actorName: string;
  actorRole: 'SUPERADMIN' | 'SUPPORT_AGENT' | 'BILLING_ADMIN';
  action: string;
  targetResource: string;
  timestamp: string;
  ipAddress: string;
}

export type BroadcastStatus = 'SENT' | 'SCHEDULED' | 'DRAFT';
export type BroadcastAudience = 'ALL_TENANTS' | 'PRO_ONLY' | 'SUSPENDED_ONLY';

export interface Broadcast {
  id: string;
  title: string;
  content: string;
  status: BroadcastStatus;
  audience: BroadcastAudience;
  scheduledDate: string | null;
  sentDate: string | null;
}

export type CouponStatus = 'ACTIVE' | 'EXPIRED' | 'DEPLETED';

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  currentUses: number;
  status: CouponStatus;
  expiryDate: string;
}

export type AffiliateStatus = 'ACTIVE' | 'INACTIVE';

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  totalReferred: number;
  commissionEarned: number;
  status: AffiliateStatus;
  joinedAt: string;
}
