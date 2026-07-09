import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('FinanceController (e2e)', () => {
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

  it('/api/finance/payments (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/finance/payments').expect(401);
  });

  it('/api/finance/summary (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/finance/summary').expect(401);
  });

  it('/api/finance/payments (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/finance/payments')
      .send({ memberId: 'uuid', amount: 1000, method: 'UPI' })
      .expect(401);
  });
});
