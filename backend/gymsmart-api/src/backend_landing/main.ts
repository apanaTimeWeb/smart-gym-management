// RESPONSIBILITY: Boots the supplied NestJS application using validated configuration and global HTTP protections.
// FLOW: NestFactory -> AppModule -> ConfigService -> security/validation/versioning/OpenAPI -> HTTP server.
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { json, urlencoded } from 'express';

import compression from 'compression';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import 'module-alias/register';
import 'reflect-metadata';
import { AppModule } from '@/backend_landing/app.module';
import '@/backend_landing/landing_core/landing_observability/landing-telemetry-bootstrap';

/**
 * Intent: Start the Landing NestJS application with one canonical bootstrap path and validated settings.
 * Edge Cases: Invalid environment configuration is rejected by ConfigModule before the HTTP server starts.
 * Side Effects: Opens network listeners, initializes database/Redis infrastructure, and exposes Swagger documentation.
 * AI Notes: Never register request middleware, global filters, or global interceptors manually here; AppModule owns DI-aware registration.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, bodyParser: false });
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));
  const config = app.get(ConfigService);

  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  app.enableCors({ origin: config.getOrThrow<string[]>('landing.corsOrigins') });
  app.use(helmet());
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  app.setGlobalPrefix(config.getOrThrow<string>('landing.apiPrefix'));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: config.getOrThrow<string>('landing.apiVersion'),
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('GymSmart Landing API')
    .setDescription('Versioned Landing backend API contract.')
    .setVersion(config.getOrThrow<string>('landing.apiVersion'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.getOrThrow<number>('landing.port'));
}

bootstrap();
