import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set global prefix if needed: app.setGlobalPrefix('api/v1');
  await app.listen(5000);
  console.log('Unified Monolith running on port 5000');
}
bootstrap();
