export function getSuperadminGlobalAuditExportDate(): string {
  return new Date().toISOString().split('T')[0] ?? '';
}

export function serializeSuperadminGlobalAuditTimestamp(timestamp: string): string {
  return new Date(timestamp).toISOString();
}
