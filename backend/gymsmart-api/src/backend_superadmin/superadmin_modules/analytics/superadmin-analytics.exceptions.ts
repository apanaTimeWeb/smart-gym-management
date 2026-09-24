// RESPONSIBILITY: Defines business-specific exceptions for the analytics feature.
// FLOW: Service -> SuperadminAnalyticsBusinessException -> global SuperadminCoreDomainExceptionFilter -> canonical error envelope.
import { HttpStatus } from '@nestjs/common';
/**
 * Primary Intent: Defines SuperadminAnalyticsNotFoundException as the class-level contract for superadmin-analytics.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAnalyticsNotFoundException extends Error { readonly statusCode = HttpStatus.NOT_FOUND; readonly errorCode = 'ANALYTICS.RESOURCE.NOT_FOUND'; }
/**
 * Primary Intent: Defines SuperadminAnalyticsBusinessException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminAnalyticsBusinessException extends Error { readonly statusCode = HttpStatus.CONFLICT; readonly errorCode = 'ANALYTICS.RESOURCE.CONFLICT'; }
