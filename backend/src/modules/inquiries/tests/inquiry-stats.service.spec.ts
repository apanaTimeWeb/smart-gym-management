import { Test, TestingModule } from '@nestjs/testing';
import { InquiryStatsService } from '@/modules/inquiries/services/inquiry-stats.service';
import { InquiriesRepository } from '@/modules/inquiries/inquiries.repository';

describe('InquiryStatsService', () => {
  let service: InquiryStatsService;
  let repository: InquiriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InquiryStatsService,
        {
          provide: InquiriesRepository,
          useValue: {
            getStats: jest.fn(),
            inquiryRepository: {},
          },
        },
      ],
    }).compile();

    service = module.get<InquiryStatsService>(InquiryStatsService);
    repository = module.get<InquiriesRepository>(InquiriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return inquiry stats', async () => {
    const mockStats = { total: 20, new: 5, followUp: 8, converted: 5, lost: 2 };
    jest.spyOn(repository, 'getStats').mockResolvedValue(mockStats as any);

    const result = await service.execute();
    expect(repository.getStats).toHaveBeenCalled();
    expect(result.data).toEqual(mockStats);
  });
});
