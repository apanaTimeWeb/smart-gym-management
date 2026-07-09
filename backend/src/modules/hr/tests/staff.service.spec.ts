import { Test, TestingModule } from '@nestjs/testing';
import { StaffService } from '@/modules/hr/services/staff.service';
import { HrRepository } from '@/modules/hr/services/hr.repository';
import { StaffNotFoundException } from '@/modules/hr/hr.exceptions';
import { v4 as uuidv4 } from 'uuid';

describe('StaffService', () => {
  let service: StaffService;
  let repository: HrRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StaffService,
        {
          provide: HrRepository,
          useValue: {
            findStaffById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StaffService>(StaffService);
    repository = module.get<HrRepository>(HrRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw StaffNotFoundException if staff is not found', async () => {
    jest.spyOn(repository, 'findStaffById').mockResolvedValue(null);
    
    await expect(service.findOne(uuidv4())).rejects.toThrow(StaffNotFoundException);
  });
});
