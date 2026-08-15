import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('AttendanceController (e2e)', () => {
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

  it('/api/attendance (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/attendance').expect(401);
  });

  it('/api/attendance/stats (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .get('/api/attendance/stats')
      .expect(401);
  });

  it('/api/attendance (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/attendance')
      .send({
        memberId: 'uuid-1',
        date: new Date().toISOString(),
        type: 'MEMBER',
      })
      .expect(401);
  });
});
