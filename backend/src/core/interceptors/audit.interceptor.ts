import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '@/modules/audit/audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, ip } = request;

    // Only audit mutations (POST, PUT, PATCH, DELETE)
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle().pipe(
        tap(() => {
          // Fire and forget audit log creation
          this.auditService.createAuditLog({
            actorId: user?.sub || user?.id || null,
            actorRole: user?.role || null,
            action: method,
            entityType: url.split('/')[2] || url, // naive extraction from /api/v1/:entity
            entityId: request.params.id || body?.id || null,
            newValue: body ? { ...body } : null,
            ipAddress: ip || request.headers['x-forwarded-for'],
          });
        }),
      );
    }

    return next.handle();
  }
}
