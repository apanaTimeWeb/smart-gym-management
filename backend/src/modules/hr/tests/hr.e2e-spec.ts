import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('HrController (e2e)', () => {
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

  it('/api/hr/staff (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/hr/staff').expect(401);
  });

  it('/api/hr/payroll (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/hr/payroll').expect(401);
  });

  it('/api/hr/summary (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/hr/summary').expect(401);
  });

  it('/api/hr/staff (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/hr/staff')
      .send({ name: 'Test', email: 'test@test.com', phone: '123', role: 'Trainer', salary: 25000 })
      .expect(401);
  });
});
