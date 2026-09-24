// RESPONSIBILITY: Defines typed business exceptions for backup records, backup jobs, artifacts, and process failures.
// FLOW: Backup service/repository/worker -> typed exception -> global exception boundary -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';

/**
 * Primary Intent: Defines SuperadminBackupsNotFoundException as the class-level contract for superadmin-system-ops-backups.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBackupsNotFoundException extends Error {
  readonly statusCode = HttpStatus.NOT_FOUND;
  readonly errorCode = 'BACKUPS.RESOURCE.NOT_FOUND';
  readonly translationKey = 'backups.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminBackupsNotFoundException'; }
}
/**
 * Primary Intent: Defines SuperadminBackupsJobNotFoundException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminBackupsJobNotFoundException extends Error {
  readonly statusCode = HttpStatus.NOT_FOUND;
  readonly errorCode = 'BACKUPS.JOB.NOT_FOUND';
  readonly translationKey = 'backups.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminBackupsJobNotFoundException'; }
}

/**
 * Primary Intent: Defines SuperadminBackupsActorNotFoundException as the class-level contract for superadmin-system-ops-backups.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBackupsActorNotFoundException extends Error {
  readonly statusCode = HttpStatus.UNAUTHORIZED;
  readonly errorCode = 'BACKUPS.ACTOR.NOT_FOUND';
  readonly translationKey = 'backups.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminBackupsActorNotFoundException'; }
}
/**
 * Primary Intent: Defines SuperadminBackupsArtifactNotReadyException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminBackupsArtifactNotReadyException extends Error {
  readonly statusCode = HttpStatus.CONFLICT;
  readonly errorCode = 'BACKUPS.ARTIFACT.NOT_READY';
  readonly translationKey = 'backups.ERRORS.BAD_REQUEST';
  constructor() { super(''); this.name = 'SuperadminBackupsArtifactNotReadyException'; }
}

/**
 * Primary Intent: Defines SuperadminBackupsProcessException as the class-level contract for superadmin-system-ops-backups.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBackupsProcessException extends Error {
  readonly statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  readonly errorCode = 'BACKUPS.PROCESS.FAILED';
  readonly translationKey = 'backups.ERRORS.BAD_REQUEST';
  constructor() { super(''); this.name = 'SuperadminBackupsProcessException'; }
}
/**
 * Primary Intent: Defines SuperadminBackupsResourceConflictException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminBackupsResourceConflictException extends Error {
  readonly statusCode = HttpStatus.CONFLICT;
  readonly errorCode = 'BACKUPS.RESOURCE.CONFLICT';
  readonly translationKey = 'backups.ERRORS.BAD_REQUEST';
  constructor() { super(''); this.name = 'SuperadminBackupsResourceConflictException'; }
}
