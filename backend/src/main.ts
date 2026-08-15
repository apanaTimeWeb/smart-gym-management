import { otelSDK } from './tracing';
otelSDK.start();

import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from '@/modules/core/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@/modules/core/filters/http-exception.filter';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // ─── Observability (Pino Logger) ──────────────────────────────────────────
  app.useLogger(app.get(PinoLogger));
  const logger = new Logger('Bootstrap');

  // ─── Graceful Shutdown ────────────────────────────────────────────────────
  app.enableShutdownHooks();

  // ✨ Global Prefix & Versioning ✨
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // ─── Security Headers (Helmet) ────────────────────────────────────────────
  app.use(helmet());

  // ─── Compression (Gzip) ───────────────────────────────────────────────────
  app.use(compression());

  // ─── CORS ─────────────────────────────────────────────────────────────────
  const configService = app.get(ConfigService);
  const isDev = configService.get<string>('NODE_ENV') !== 'production';

  const ALLOWED_ORIGINS = [
    'https://gym.buildroonix.com',
    // merge any extra domains from FRONTEND_URL env (comma-separated)
    ...(configService.get<string>('FRONTEND_URL') || '')
      .split(',')
      .map(u => u.trim())
      .filter(Boolean),
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || (isDev && /^https?:\/\/localhost(:\d+)?$/.test(origin))) {
        callback(null, true);
      } else {
        ALLOWED_ORIGINS.includes(origin)
          ? callback(null, true)
          : callback(new Error(`CORS blocked: ${origin}`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  });

  // ─── Global Pipes (Validation) ────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      forbidNonWhitelisted: true,
      transform: true, // auto-transforms types (string → number)
    }),
  );

  // ─── Global Interceptor (Standard Response) ───────────────────────────────
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ─── Global Exception Filter ──────────────────────────────────────────────
  app.useGlobalFilters(new HttpExceptionFilter());

  // ─── Swagger API Docs ─────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('GymSmart ERP API')
    .setDescription('Complete Gym Management System REST API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT-auth',
    )
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Members', 'Gym member management')
    .addTag('Plans', 'Membership plans')
    .addTag('Finance', 'Payments and billing')
    .addTag('HR', 'Staff and payroll')
    .addTag('Attendance', 'Attendance tracking')
    .addTag('Store', 'Product store and POS')
    .addTag('Workout', 'Workout and diet library')
    .addTag('Dashboard', 'Analytics and KPIs')
    .addTag('Inquiries', 'Lead management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = configService.get<number>('PORT') || 5000;
  await app.listen(port);

  logger.log(`\n🏋️  GymSmart Backend is running!`);
  logger.log(`🚀  API:     http://localhost:${port}/api`);
  logger.log(`📚  Docs:    http://localhost:${port}/api/docs\n`);
}

bootstrap();
