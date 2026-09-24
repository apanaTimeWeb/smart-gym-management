// RESPONSIBILITY: Defines typed business exceptions for gym resources and export jobs.
// FLOW: Gym service/repository/worker -> typed exception -> global exception boundary -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';

/**
 * Primary Intent: Defines SuperadminGymsNotFoundException as the class-level contract for superadmin-gyms.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsNotFoundException extends Error {
  readonly statusCode = HttpStatus.NOT_FOUND;
  readonly errorCode = 'GYMS.RESOURCE.NOT_FOUND';
  readonly translationKey = 'gyms.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminGymsNotFoundException'; }
}
/**
 * Primary Intent: Defines SuperadminGymsExportJobNotFoundException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminGymsExportJobNotFoundException extends Error {
  readonly statusCode = HttpStatus.NOT_FOUND;
  readonly errorCode = 'GYMS.EXPORT.JOB_NOT_FOUND';
  readonly translationKey = 'gyms.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminGymsExportJobNotFoundException'; }
}

/**
 * Primary Intent: Defines SuperadminGymsResourceConflictException as the class-level contract for superadmin-gyms.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsResourceConflictException extends Error {
  readonly statusCode = HttpStatus.CONFLICT;
  readonly errorCode = 'GYMS.RESOURCE.CONFLICT';
  readonly translationKey = 'gyms.ERRORS.BAD_REQUEST';
  constructor() { super(''); this.name = 'SuperadminGymsResourceConflictException'; }
}
/**
 * Primary Intent: Defines SuperadminGymsExportDownloadTokenMismatchException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */

export class SuperadminGymsExportDownloadTokenMismatchException extends Error {
  readonly statusCode = HttpStatus.FORBIDDEN;
  readonly errorCode = 'GYMS.EXPORT.DOWNLOAD_TOKEN.MISMATCH';
  readonly translationKey = 'gyms.ERRORS.FORBIDDEN';
  constructor() { super(''); this.name = 'SuperadminGymsExportDownloadTokenMismatchException'; }
}

/**
 * Primary Intent: Defines SuperadminGymsExportArtifactNotReadyException as the class-level contract for superadmin-gyms.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsExportArtifactNotReadyException extends Error {
  readonly statusCode = HttpStatus.NOT_FOUND;
  readonly errorCode = 'GYMS.EXPORT.ARTIFACT_NOT_READY';
  readonly translationKey = 'gyms.ERRORS.NOT_FOUND';
  constructor() { super(''); this.name = 'SuperadminGymsExportArtifactNotReadyException'; }
}
