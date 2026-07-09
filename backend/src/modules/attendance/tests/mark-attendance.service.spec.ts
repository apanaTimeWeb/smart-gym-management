import { Test, TestingModule } from '@nestjs/testing';
import { MarkAttendanceService } from '@/modules/attendance/services/mark-attendance.service';
import { AttendanceRepository } from '@/modules/attendance/services/attendance.repository';
import { UserNotLinkedException } from '@/modules/attendance/attendance.exceptions';
import { AttendanceType } from '@/modules/attendance/utils/database.enums';

describe('MarkAttendanceService', () => {
  let service: MarkAttendanceService;
  let repository: AttendanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MarkAttendanceService,
        {
          provide: AttendanceRepository,
          useValue: {
            createAttendance: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MarkAttendanceService>(MarkAttendanceService);
    repository = module.get<AttendanceRepository>(AttendanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw UserNotLinkedException if neither memberId nor staffId is provided', async () => {
    await expect(
      service.mark({ date: new Date().toISOString(), type: AttendanceType.CHECK_IN }),
    ).rejects.toThrow(UserNotLinkedException);
  });
});
