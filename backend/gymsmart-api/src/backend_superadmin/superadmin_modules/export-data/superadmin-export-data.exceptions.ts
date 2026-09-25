// RESPONSIBILITY: Defines typed export-domain exceptions so adapters and services never leak generic errors.
// FLOW: Export operation -> typed exception -> SuperadminCoreDomainExceptionFilter -> localized ApiResponse errorCode.
import { BadRequestException, ConflictException, ForbiddenException, GatewayTimeoutException, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';

/**
 * Primary Intent: Defines SuperadminExportDeliveryRecipientMissingException as the class-level contract for superadmin-export-data.exceptions.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminExportDeliveryRecipientMissingException extends BadRequestException { constructor() { super({ error: 'BAD_REQUEST', errorCode: 'EXPORT.DELIVERY.RECIPIENT_MISSING', message: { key: 'export-data.ERRORS.RECIPIENT_MISSING' } }); } }
/**
 * Primary Intent: Defines SuperadminExportEmailDeliveryException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminExportEmailDeliveryException extends ServiceUnavailableException { constructor() { super({ error: 'SERVICE_UNAVAILABLE', errorCode: 'EXPORT.EMAIL.DELIVERY_FAILED', message: { key: 'export-data.ERRORS.DELIVERY_FAILED' } }); } }
/**
 * Primary Intent: Defines SuperadminExportEmailTimeoutException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminExportEmailTimeoutException extends GatewayTimeoutException { constructor() { super({ error: 'TIMEOUT', errorCode: 'EXPORT.EMAIL.TIMEOUT', message: { key: 'export-data.ERRORS.TIMEOUT' } }); } }
/**
 * Primary Intent: Defines SuperadminExportWhatsappDeliveryException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminExportWhatsappDeliveryException extends ServiceUnavailableException { constructor() { super({ error: 'SERVICE_UNAVAILABLE', errorCode: 'EXPORT.WHATSAPP.DELIVERY_FAILED', message: { key: 'export-data.ERRORS.DELIVERY_FAILED' } }); } }
/**
 * Primary Intent: Defines SuperadminExportWhatsappTimeoutException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminExportWhatsappTimeoutException extends GatewayTimeoutException { constructor() { super({ error: 'TIMEOUT', errorCode: 'EXPORT.WHATSAPP.TIMEOUT', message: { key: 'export-data.ERRORS.TIMEOUT' } }); } }
/**
 * Primary Intent: Defines SuperadminExportArtifactUnavailableException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminExportArtifactUnavailableException extends ForbiddenException { constructor() { super({ error: 'FORBIDDEN', errorCode: 'EXPORT.ARTIFACT.NOT_AVAILABLE', message: { key: 'export-data.ERRORS.NOT_FOUND' } }); } }
/**
 * Primary Intent: Defines SuperadminExportJobNotFoundException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminExportJobNotFoundException extends ConflictException { constructor() { super({ error: 'NOT_FOUND', errorCode: 'EXPORT.JOB.NOT_FOUND', message: { key: 'export-data.ERRORS.NOT_FOUND' } }); } }
/**
 * Primary Intent: Defines SuperadminExportJobFailedException as the explicit architectural construct for this backend module.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and contract invariants when modifying this construct.
 * Side-Effects: Only documented database, event, cache, queue, or external-service effects are allowed.
 * AI-Note: Keep this construct isolated to its owning feature, use absolute imports, and preserve its frozen API/data contract.
 */
export class SuperadminExportJobFailedException extends InternalServerErrorException { constructor() { super({ error: 'INTERNAL_ERROR', errorCode: 'EXPORT.JOB.FAILED', message: { key: 'export-data.ERRORS.FAILED' } }); } }
