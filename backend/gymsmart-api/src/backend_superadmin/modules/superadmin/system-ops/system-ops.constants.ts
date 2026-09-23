// RESPONSIBILITY: Defines the authoritative system-ops summary contract kind used by the system-ops container.
// FLOW: SystemOpsSummaryService -> SystemOpsContractSnapshotRepository -> PostgreSQL.
export const SYSTEM_OPS_SNAPSHOT_KINDS = Object.freeze({ SUMMARY: 'summary' } as const);
