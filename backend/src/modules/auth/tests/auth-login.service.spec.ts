import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginService } from '@/modules/auth/services/auth-login.service';
import { AuthRepository } from '@/modules/auth/services/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { InvalidCredentialsException } from '@/modules/auth/auth.exceptions';

describe('AuthLoginService', () => {
  let service: AuthLoginService;
  let repository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLoginService,
        {
          provide: AuthRepository,
          useValue: {
            findUserByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'test_token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthLoginService>(AuthLoginService);
    repository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw InvalidCredentialsException if user not found', async () => {
    jest.spyOn(repository, 'findUserByEmail').mockResolvedValue(null);
    await expect(
      service.login({ email: 'test@test.com', password: 'password' }),
    ).rejects.toThrow(InvalidCredentialsException);
  });
});
