import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('SettingsController (e2e)', () => {
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

  it('/api/settings (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/settings').expect(401);
  });

  it('/api/settings (PATCH) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .patch('/api/settings')
      .send({ gymName: 'Updated Gym' })
      .expect(401);
  });
});
