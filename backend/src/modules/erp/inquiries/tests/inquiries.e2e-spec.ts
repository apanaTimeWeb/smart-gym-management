import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('InquiriesController (e2e)', () => {
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

  it('/api/inquiries (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/inquiries').expect(401);
  });

  it('/api/inquiries/stats (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/inquiries/stats').expect(401);
  });

  it('/api/inquiries (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/inquiries')
      .send({
        name: 'Test Lead',
        phone: '9999999999',
        email: 'lead@test.com',
        interest: 'Premium',
      })
      .expect(401);
  });
});
