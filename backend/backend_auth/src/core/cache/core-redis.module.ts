// RESPONSIBILITY: Provides a single Redis connection service across the application.
// FLOW: AppModule -> CoreRedisModule -> CoreRedisService -> feature/core consumers.

import { Global, Module } from '@nestjs/common';

import { CoreRedisService } from '@/core/cache/core-redis.service';
@Global()
@Module({ providers: [CoreRedisService], exports: [CoreRedisService] })
export class CoreRedisModule {}
