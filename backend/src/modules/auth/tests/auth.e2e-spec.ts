import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from '@/app.module';
import { AuthRepository } from '@/modules/auth/auth.repository';
import { JwtService } from '@nestjs/jwt';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authRepository: AuthRepository;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
    authRepository = moduleFixture.get<AuthRepository>(AuthRepository);
    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/v1/auth/login (POST)', () => {
    it('should return 401 for non-existent email', async () => {
      jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValue(null);
      
      const response = await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({ email: 'wrong@test.com', password: 'wrong' });
        
      expect(response.status).toBe(401);
    });

    it('should return 401 for incorrect password', async () => {
      const mockUser = { id: 1, email: 'test@test.com', password: await bcrypt.hash('correct', 10), isActive: true, role: 'ADMIN' };
      jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValue(mockUser as any);
      
      const response = await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({ email: 'test@test.com', password: 'wrong' });
        
      expect(response.status).toBe(401);
    });

    it('should return 201 and access token for correct credentials', async () => {
      const mockUser = { id: 1, email: 'test@test.com', password: await bcrypt.hash('correct', 10), isActive: true, role: 'ADMIN' };
      jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValue(mockUser as any);
      
      const response = await request(app.getHttpServer())
        .post('/v1/auth/login')
        .send({ email: 'test@test.com', password: 'correct' });
        
      expect(response.status).toBe(201);
      expect(response.body.data.accessToken).toBeDefined();
      expect(response.body.data.user.email).toBe('test@test.com');
    });
  });

  describe('/v1/auth/me (GET)', () => {
    it('should return 401 when no token is provided', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/auth/me');
        
      expect(response.status).toBe(401);
    });

    it('should return 401 for an invalid token', async () => {
      const response = await request(app.getHttpServer())
        .get('/v1/auth/me')
        .set('Authorization', 'Bearer invalidtoken');
        
      expect(response.status).toBe(401);
    });

    it('should return 200 and user profile for a valid token', async () => {
      const mockUser = { id: 1, email: 'test@test.com', role: 'ADMIN' };
      const token = jwtService.sign({ sub: mockUser.id, email: mockUser.email, role: mockUser.role });
      
      jest.spyOn(authRepository, 'findUserById').mockResolvedValue(mockUser as any);
      
      const response = await request(app.getHttpServer())
        .get('/v1/auth/me')
        .set('Authorization', `Bearer ${token}`);
        
      expect(response.status).toBe(200);
      expect(response.body.data.email).toBe('test@test.com');
    });
  });
});
