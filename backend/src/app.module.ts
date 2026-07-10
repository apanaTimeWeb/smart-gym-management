import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bullmq';
import { LoggerModule } from 'nestjs-pino';
import { RouterModule } from '@nestjs/core';

import { CorrelationIdMiddleware } from '@/core/middleware/correlation-id.middleware';
import { HealthModule } from '@/core/health/health.module';

import { AuthModule } from '@/modules/auth/auth.module';
import { ErpModule } from '@/modules/erp/erp.module';

import { MediaModule } from '@/core/media/media.module';
import { AuditInterceptor } from '@/core/interceptors/audit.interceptor';
import { IdempotencyInterceptor } from '@/core/interceptors/idempotency.interceptor';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    // ─── Config (loads .env) ──────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ─── Observability (Pino Logging) ──────────────────────────────────────
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      },
    }),

    // ✨ Security (Rate Limiting) ✨
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: 60000,
            limit: 100, // 100 requests per minute
          },
        ],
        storage: new ThrottlerStorageRedisService(
          `redis://${config.get('REDIS_HOST', 'localhost')}:${config.get('REDIS_PORT', 6379)}`,
        ),
      }),
    }),

    // ✨ Performance (Caching) ✨
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const redisUrl = `redis://${config.get('REDIS_HOST', 'localhost')}:${config.get('REDIS_PORT', 6379)}`;
        return {
          store: new Keyv({
            store: new KeyvRedis(redisUrl),
          }),
          ttl: 5000, // default 5 seconds
        };
      },
    }),

    // ─── Background Jobs (BullMQ) ─────────────────────────────────────────
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST') || 'localhost',
          port: configService.get('REDIS_PORT') || 6379,
        },
      }),
    }),

    // ─── Event Emitter ────────────────────────────────────────────────────
    EventEmitterModule.forRoot(),

    // ─── Database ─────────────────────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),

    // ─── Infrastructure Modules ───────────────────────────────────────────
    HealthModule,
    MediaModule,

    // ─── Feature Modules ──────────────────────────────────────────────────
    AuthModule,
    ErpModule,
    
    // ─── Route Prefixing ──────────────────────────────────────────────────
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),

    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: IdempotencyInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
