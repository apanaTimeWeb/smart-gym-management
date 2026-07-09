import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';
import { MembersRepository } from '@/modules/members/members.repository';

describe('MembersController (e2e)', () => {
  let app: INestApplication;
  let membersRepository: MembersRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    membersRepository = moduleFixture.get<MembersRepository>(MembersRepository);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/members (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/members').expect(401);
  });

  it('/api/members/stats (GET) - should return 401 without auth token', () => {
    return request(app.getHttpServer()).get('/api/members/stats').expect(401);
  });

  it('/api/members (POST) - should return 401 without auth token', () => {
    return request(app.getHttpServer())
      .post('/api/members')
      .send({ name: 'Test', email: 'test@test.com', phone: '123' })
      .expect(401);
  });
});
