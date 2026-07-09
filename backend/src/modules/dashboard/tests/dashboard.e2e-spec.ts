import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('DashboardController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/dashboard/kpi (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/dashboard/kpi').expect(401);
  });

  it('/api/dashboard/charts (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .get('/api/dashboard/charts')
      .expect(401);
  });

  it('/api/dashboard/recent (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .get('/api/dashboard/recent')
      .expect(401);
  });
});
