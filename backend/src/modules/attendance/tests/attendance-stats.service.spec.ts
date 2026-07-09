import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceStatsService } from '@/modules/attendance/services/attendance-stats.service';
import { AttendanceRepository } from '@/modules/attendance/services/attendance.repository';

describe('AttendanceStatsService', () => {
  let service: AttendanceStatsService;
  let repository: AttendanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttendanceStatsService,
        {
          provide: AttendanceRepository,
          useValue: {
            getStatsForDateRange: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AttendanceStatsService>(AttendanceStatsService);
    repository = module.get<AttendanceRepository>(AttendanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call repository with today and tomorrow date range', async () => {
    const mockStats = { members: 10, staff: 3, total: 13 };
    jest.spyOn(repository, 'getStatsForDateRange').mockResolvedValue(mockStats as any);

    const result = await service.getTodayStats();
    expect(repository.getStatsForDateRange).toHaveBeenCalledWith(
      expect.any(Date),
      expect.any(Date),
    );
    expect(result.data).toEqual(mockStats);
  });
});
