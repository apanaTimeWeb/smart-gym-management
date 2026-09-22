// RESPONSIBILITY: Defines the centralized event naming registry used by future cross-feature runtime dependencies.
// FLOW: Feature event producer/consumer → centralized registry → runtime EventBus contract.

export const CORE_EVENT_REGISTRY={MEMBERS_MEMBER_REGISTERED:'MEMBERS.MEMBER.REGISTERED',BILLING_PAYMENT_FAILED:'BILLING.PAYMENT.FAILED',ATTENDANCE_SESSION_CLOSED:'ATTENDANCE.SESSION.CLOSED'} as const;