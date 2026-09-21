// RESPONSIBILITY: Boots the HTTP application with global security, validation, versioning, compression, and OpenAPI.
// FLOW: Node → NestFactory → Middleware → Validation/Envelope → Versioned API → HTTP server.
import '@/core/observability/telemetry-bootstrap';
import 'reflect-metadata';
import 'module-alias/register';
import 'dotenv/config';
import compression from 'compression';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from '@/app.module';
import { ValidationExceptionFilter } from '@/core/http/validation-exception.filter';
import { RequestContextMiddleware } from '@/core/context/request-context.middleware';
import { TenantResolutionMiddleware } from '@/core/tenant/tenant-resolution.middleware';
import { MetricsMiddleware } from '@/core/observability/metrics.middleware';
import { ResponseInterceptor } from '@/core/http/response.interceptor';

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
