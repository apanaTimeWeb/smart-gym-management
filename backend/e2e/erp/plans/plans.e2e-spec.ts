import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('PlansController (e2e)', () => {
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

  it('/api/plans (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/plans').expect(401);
  });

  it('/api/plans (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/plans')
      .send({ name: 'Test Plan', tier: 'BASIC', price1Month: 1000 })
      .expect(401);
  });

  it('/api/plans/1 (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/plans/1').expect(401);
  });
});
