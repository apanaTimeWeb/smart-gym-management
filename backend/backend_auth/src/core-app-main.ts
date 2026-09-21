// RESPONSIBILITY: Bootstraps NestJS with strict validation, security middleware, compression, URI versioning and Swagger.
// FLOW: Process -> CoreAppModule -> middleware/guards/interceptors -> versioned controllers.

import 'reflect-metadata';

import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

import { CoreAppModule } from '@/core/app.module';
import { CoreValidationPipe } from '@/core/http/core-validation.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreAppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));
  app.use(compression());
  const config = app.get(ConfigService);
  app.enableCors({ origin: config.getOrThrow<string>('environment.FRONTEND_ORIGIN'), credentials: true });
  app.useGlobalPipes(new CoreValidationPipe());
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api', { exclude: ['health/live', 'health/ready', 'health/deep', 'metrics'] });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Smart Gym 360 Superadmin Backend')
    .setDescription('Frontend-driven API contract for the supplied Auth module.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(config.getOrThrow<number>('environment.PORT'));
}

void bootstrap();
