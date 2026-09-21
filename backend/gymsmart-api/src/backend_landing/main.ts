// RESPONSIBILITY: Boots the HTTP application with global security, validation, versioning, compression, and OpenAPI.
// FLOW: Node â†’ NestFactory â†’ Middleware â†’ Validation/Envelope â†’ Versioned API â†’ HTTP server.
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import 'reflect-metadata';

import 'module-alias/register';

import 'dotenv/config';

import compression from 'compression';

import helmet from 'helmet';

import { Logger } from 'nestjs-pino';

import { AppModule } from '@/backend_landing/app.module';

import '@/backend_landing/core/observability/telemetry-bootstrap';

import { ValidationExceptionFilter } from '@/backend_landing/core/http/validation-exception.filter';

import { RequestContextMiddleware } from '@/backend_landing/core/context/request-context.middleware';

import { TenantResolutionMiddleware } from '@/backend_landing/core/tenant/tenant-resolution.middleware';

import { MetricsMiddleware } from '@/backend_landing/core/observability/metrics.middleware';

import { ResponseInterceptor } from '@/backend_landing/core/http/response.interceptor';


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: (process.env.CORS_ORIGINS ?? 'http://localhost:3000').split(',').map((value) => value.trim()),
  });
  app.use(helmet());
  app.use(compression());
  app.useBodyParser('json', { limit: '1mb' });
  app.use(RequestContextMiddleware);
  app.use(TenantResolutionMiddleware);
  app.use(MetricsMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalInterceptors(app.get(ResponseInterceptor));
  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: process.env.API_VERSION ?? '1' });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('GymSmart Backend API')
    .setDescription('Backend contract generated from the supplied Landing frontend.')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Number(process.env.PORT ?? 3000));
}

bootstrap().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}
`);
  process.exitCode = 1;
});
