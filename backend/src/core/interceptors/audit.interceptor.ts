import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from '@/modules/audit/audit.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private readonly auditService: AuditService,
    private readonly dataSource: DataSource
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user, ip } = request;

    // Only audit mutations (POST, PUT, PATCH, DELETE)
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const entityId = request.params.id || body?.id || null;
      let oldValue = null;
      
      if (entityId && ['PUT', 'PATCH', 'DELETE'].includes(method)) {
        try {
          const entityType = url.split('/')[2] || url;
          const tableName = entityType.endsWith('ies') ? entityType.slice(0, -3) + 'y' 
                          : entityType.endsWith('s') ? entityType.slice(0, -1) : entityType;
          
          const result = await this.dataSource.query(`SELECT * FROM "${tableName}" WHERE id = $1`, [entityId]);
          if (result && result.length > 0) {
            oldValue = result[0];
          }
        } catch (error) {
          // Fallback if naive lookup fails
        }
      }

      return next.handle().pipe(
        tap(() => {
          // Fire and forget audit log creation
          this.auditService.createAuditLog({
            actorId: user?.sub || user?.id || null,
            actorRole: user?.role || null,
            action: method,
            entityType: url.split('/')[2] || url, // naive extraction from /api/v1/:entity
            entityId: entityId,
            newValue: body ? { ...body } : null,
            oldValue: oldValue,
            ipAddress: ip || request.headers['x-forwarded-for'],
          });
        }),
      );
    }

    return next.handle();
  }
}
