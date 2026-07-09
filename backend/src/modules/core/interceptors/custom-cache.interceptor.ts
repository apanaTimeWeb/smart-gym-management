import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    const response = context.switchToHttp().getResponse();

    if (key) {
      try {
        const cachedData = await this.cacheManager.get(key);
        if (cachedData !== undefined && cachedData !== null) {
          response.setHeader('X-Cache', 'HIT');
        } else {
          response.setHeader('X-Cache', 'MISS');
        }
      } catch {
        response.setHeader('X-Cache', 'MISS');
      }
    }

    return super.intercept(context, next);
  }
}
