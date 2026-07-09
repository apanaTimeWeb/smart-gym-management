import { Test, TestingModule } from '@nestjs/testing';
import { AuthMeService } from '@/modules/auth/services/auth-me.service';
import { AuthRepository } from '@/modules/auth/services/auth.repository';
import { UserNotFoundException } from '@/modules/auth/auth.exceptions';

describe('AuthMeService', () => {
  let service: AuthMeService;
  let repository: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMeService,
        {
          provide: AuthRepository,
          useValue: {
            findUserByIdForMe: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthMeService>(AuthMeService);
    repository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw UserNotFoundException if user not found', async () => {
    jest.spyOn(repository, 'findUserByIdForMe').mockResolvedValue(null);
    await expect(service.getMe('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(UserNotFoundException);
  });
});
