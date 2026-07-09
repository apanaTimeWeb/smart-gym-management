import { Test, TestingModule } from '@nestjs/testing';
import { FindAttendanceService } from '@/modules/attendance/services/find-attendance.service';
import { AttendanceRepository } from '@/modules/attendance/attendance.repository';

describe('FindAttendanceService', () => {
  let service: FindAttendanceService;
  let repository: AttendanceRepository;

  const mockAttendances = [
    { id: 1, memberId: 'uuid-1', date: new Date(), type: 'MEMBER' },
    { id: 2, staffId: 'uuid-2', date: new Date(), type: 'STAFF' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAttendanceService,
        {
          provide: AttendanceRepository,
          useValue: {
            findAllAttendances: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindAttendanceService>(FindAttendanceService);
    repository = module.get<AttendanceRepository>(AttendanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return attendance list from repository', async () => {
    jest.spyOn(repository, 'findAllAttendances').mockResolvedValue(mockAttendances as any);
    const result = await service.findAll({} as any);
    expect(repository.findAllAttendances).toHaveBeenCalled();
    expect(result.data).toEqual(mockAttendances);
  });
});
