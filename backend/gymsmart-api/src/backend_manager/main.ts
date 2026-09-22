// RESPONSIBILITY: Secure NestJS application bootstrap, versioning, validation, observability, and graceful shutdown.
// FLOW: Config validation -> security middleware -> global pipes/guards/interceptors/filters -> HTTP server.
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe, VersioningType } from '@nestjs/common';

import { CoreAppModule } from '@/backend_manager/core/core-app.module';
import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';
import { CoreInputSanitizationPipe } from '@/backend_manager/core/http/core-input-sanitization.pipe';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreAppModule, { bufferLogs: true });
  const config = app.get(CoreConfigService);

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableShutdownHooks();
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.enableCors({ origin: config.trustedFrontendOrigins, credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'] });
  app.useGlobalPipes(
    new CoreInputSanitizationPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      exceptionFactory: (errors: ValidationError[]) => {
        const validationErrors = errors.map((error) => ({ field: error.property, message: Object.values(error.constraints ?? {})[0] ?? 'Invalid value' }));
        return new BadRequestException({ __validation: true, validationErrors });
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('GymSmart Manager API')
    .setDescription('Enterprise Manager API')
    .setVersion('1')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, swaggerConfig));
  await app.listen(config.port);
}

void bootstrap();
