import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { AuthRepository } from '@/modules/auth/services/auth.repository';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    authRepository = moduleFixture.get<AuthRepository>(AuthRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/auth/login (POST) - invalid credentials', async () => {
    jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValue(null);
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'wrong@test.com', password: 'wrong' })
      .expect(401);
  });
});
