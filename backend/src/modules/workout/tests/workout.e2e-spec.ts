import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('WorkoutController (e2e)', () => {
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

  it('/api/workout/exercises (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/workout/exercises').expect(401);
  });

  it('/api/workout/diet-plans (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/workout/diet-plans').expect(401);
  });

  it('/api/workout/exercises (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/workout/exercises')
      .send({ name: 'Push Up', category: 'Strength', muscleGroup: 'Chest' })
      .expect(401);
  });
});
