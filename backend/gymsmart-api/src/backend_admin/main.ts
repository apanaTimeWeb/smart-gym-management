// RESPONSIBILITY: Bootstraps the HTTP application with security, payload limits, legacy path compatibility, validation, and Swagger.
// FLOW: main() â†’ NestFactory â†’ middleware â†’ global prefix â†’ AppModule.

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import express from 'express';
import { AppModule } from '@/backend_admin/app.module';
import { CoreLegacyApiPathMiddleware } from '@/backend_admin/core/routing/core-legacy-api-path.middleware';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(CoreLegacyApiPathMiddleware);
  app.enableShutdownHooks();

  const origins = app.get('CONFIG_CORS_ALLOWED_ORIGINS') as string[] | undefined;
  app.enableCors({ origin: origins ?? [], credentials: true });

  const flattenValidationErrors = (errors: ValidationError[], parent = ''): Array<{ field: string; message: string }> => {
    const output: Array<{ field: string; message: string }> = [];
    for (const error of errors) {
      const field = parent ? `${parent}.${error.property}` : error.property;
      for (const message of Object.values(error.constraints ?? {})) {
        output.push({ field, message });
      }
      if (error.children?.length) output.push(...flattenValidationErrors(error.children, field));
    }
    return output;
  };

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidUnknownValues: true,
    exceptionFactory: (errors: ValidationError[]) => new BadRequestException({
      message: 'Validation failed. Please check the highlighted fields.',
      error: 'VALIDATION_ERROR',
      errorCode: 'VALIDATION.DTO.FAILED',
      validationErrors: flattenValidationErrors(errors),
    }),
  }));

  app.setGlobalPrefix('api/v1', { exclude: [] });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Buildronix Admin API')
    .setDescription('Frontend-aligned Admin domain API built with NestJS + PostgreSQL + TypeORM.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'x-tenant-id', in: 'header' }, 'tenant')
    .build();
  SwaggerModule.setup('api/v1/docs', app, SwaggerModule.createDocument(app, swaggerConfig));

  const port = app.get('CONFIG_PORT') as number;
  await app.listen(port);
}

void bootstrap();
