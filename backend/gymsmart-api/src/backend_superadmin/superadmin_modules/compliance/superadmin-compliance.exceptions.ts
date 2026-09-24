// RESPONSIBILITY: Defines business-specific exceptions for the compliance feature.
// FLOW: Service -> SuperadminComplianceBusinessException -> global SuperadminCoreDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
/**
 * Primary Intent: Defines SuperadminComplianceNotFoundException as the class-level contract for superadmin-compliance.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminComplianceNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'COMPLIANCE.RESOURCE.NOT_FOUND'; }
/**
 * Primary Intent: Defines SuperadminComplianceBusinessException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminComplianceBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'COMPLIANCE.RESOURCE.CONFLICT'; }
