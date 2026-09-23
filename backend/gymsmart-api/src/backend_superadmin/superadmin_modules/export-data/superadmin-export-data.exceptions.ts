// RESPONSIBILITY: Defines typed export-domain exceptions so adapters and services never leak generic errors.
// FLOW: Export operation -> typed exception -> SuperadminDomainExceptionFilter -> localized ApiResponse errorCode.
import { BadRequestException, ConflictException, ForbiddenException, GatewayTimeoutException, InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';

export class SuperadminExportDeliveryRecipientMissingException extends BadRequestException { constructor() { super({ error: 'BAD_REQUEST', errorCode: 'EXPORT.DELIVERY.RECIPIENT_MISSING', message: { key: 'export-data.ERRORS.RECIPIENT_MISSING' } }); } }
export class SuperadminExportEmailDeliveryException extends ServiceUnavailableException { constructor() { super({ error: 'SERVICE_UNAVAILABLE', errorCode: 'EXPORT.EMAIL.DELIVERY_FAILED', message: { key: 'export-data.ERRORS.DELIVERY_FAILED' } }); } }
export class SuperadminExportEmailTimeoutException extends GatewayTimeoutException { constructor() { super({ error: 'TIMEOUT', errorCode: 'EXPORT.EMAIL.TIMEOUT', message: { key: 'export-data.ERRORS.TIMEOUT' } }); } }
export class SuperadminExportWhatsappDeliveryException extends ServiceUnavailableException { constructor() { super({ error: 'SERVICE_UNAVAILABLE', errorCode: 'EXPORT.WHATSAPP.DELIVERY_FAILED', message: { key: 'export-data.ERRORS.DELIVERY_FAILED' } }); } }
export class SuperadminExportWhatsappTimeoutException extends GatewayTimeoutException { constructor() { super({ error: 'TIMEOUT', errorCode: 'EXPORT.WHATSAPP.TIMEOUT', message: { key: 'export-data.ERRORS.TIMEOUT' } }); } }
export class SuperadminExportArtifactUnavailableException extends ForbiddenException { constructor() { super({ error: 'FORBIDDEN', errorCode: 'EXPORT.ARTIFACT.NOT_AVAILABLE', message: { key: 'export-data.ERRORS.NOT_FOUND' } }); } }
export class SuperadminExportJobNotFoundException extends ConflictException { constructor() { super({ error: 'NOT_FOUND', errorCode: 'EXPORT.JOB.NOT_FOUND', message: { key: 'export-data.ERRORS.NOT_FOUND' } }); } }
export class SuperadminExportJobFailedException extends InternalServerErrorException { constructor() { super({ error: 'INTERNAL_ERROR', errorCode: 'EXPORT.JOB.FAILED', message: { key: 'export-data.ERRORS.FAILED' } }); } }
