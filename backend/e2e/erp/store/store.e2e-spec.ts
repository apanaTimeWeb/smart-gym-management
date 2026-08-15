import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('StoreController (e2e)', () => {
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

  it('/api/store/products (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/store/products').expect(401);
  });

  it('/api/store/orders (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/store/orders').expect(401);
  });

  it('/api/store/summary (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/store/summary').expect(401);
  });

  it('/api/store/orders (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/store/orders')
      .send({ items: [{ productId: 1, qty: 1 }], method: 'UPI' })
      .expect(401);
  });
});
