// RESPONSIBILITY: Boots NestJS with security middleware, strict validation, URI versioning, Swagger, logging, and graceful shutdown.
// FLOW: process -> ConfigModule validation -> Nest application -> /api/v1 routes.
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { json } from 'express';
import { Logger } from 'nestjs-pino';
import { AppModule } from '@/backend_superadmin/app.module';
import { ResponseInterceptor } from '@/backend_superadmin/core/http/response.interceptor';
import { ValidationExceptionFilter } from '@/backend_superadmin/core/http/validation.exception-filter';
import { DomainExceptionFilter } from '@/backend_superadmin/core/http/domain.exception-filter';
import { IdempotencyInterceptor } from '@/backend_superadmin/core/cache/idempotency.interceptor';
import { validateEnvironment } from '@/backend_superadmin/core/config/configuration';

async function bootstrap(): Promise<void> {
  validateEnvironment(process.env as Record<string, unknown>);
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  app.setGlobalPrefix('api/v1');
  app.enableVersioning({ type: VersioningType.URI });
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.use(compression());
  app.enableCors({ origin: (process.env.CORS_ORIGINS ?? '').split(',').map((item: string) => item.trim()).filter(Boolean), credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true, transformOptions: { enableImplicitConversion: false }, forbidUnknownValues: true }));
  app.useGlobalInterceptors(new ResponseInterceptor(), app.get(IdempotencyInterceptor));
  app.useGlobalFilters(new ValidationExceptionFilter(), new DomainExceptionFilter());
  const swagger = new DocumentBuilder().setTitle('Superadmin Backend API').setDescription('Frontend-aligned Superadmin NestJS backend').setVersion('1.0.0').addBearerAuth().build();
  SwaggerModule.setup('api/v1/docs', app, SwaggerModule.createDocument(app, swagger));
  await app.listen(Number(process.env.PORT ?? 3000));
}
void bootstrap();
