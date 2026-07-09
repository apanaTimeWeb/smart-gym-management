import { Test, TestingModule } from '@nestjs/testing';
import { MemberStatsService } from '@/modules/members/services/member-stats.service';
import { MembersRepository } from '@/modules/members/services/members.repository';

describe('MemberStatsService', () => {
  let service: MemberStatsService;
  let repository: MembersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberStatsService,
        {
          provide: MembersRepository,
          useValue: {
            getStats: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MemberStatsService>(MemberStatsService);
    repository = module.get<MembersRepository>(MembersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return member stats from repository', async () => {
    const mockStats = { total: 100, active: 80, pending: 10, expired: 10 };
    jest.spyOn(repository, 'getStats').mockResolvedValue(mockStats);

    const result = await service.getStats();
    expect(repository.getStats).toHaveBeenCalled();
    expect(result.data).toEqual(mockStats);
  });
});
