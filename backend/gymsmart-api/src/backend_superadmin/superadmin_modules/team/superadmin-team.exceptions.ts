// RESPONSIBILITY: Defines business-specific exceptions for the team feature.
// FLOW: Service -> SuperadminTeamBusinessException -> global SuperadminCoreDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
/**
 * Primary Intent: Defines SuperadminTeamNotFoundException as the class-level contract for superadmin-team.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminTeamNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'TEAM.RESOURCE.NOT_FOUND'; }
/**
 * Primary Intent: Defines SuperadminTeamBusinessException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminTeamBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'TEAM.RESOURCE.CONFLICT'; }
