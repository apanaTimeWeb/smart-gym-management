import { Test, TestingModule } from '@nestjs/testing';
import { PayrollService } from '@/modules/hr/services/payroll.service';
import { HrRepository } from '@/modules/hr/hr.repository';
import { StaffNotFoundException, PayrollNotFoundException } from '@/modules/hr/hr.exceptions';

describe('PayrollService', () => {
  let service: PayrollService;
  let repository: HrRepository;

  const mockStaff = { id: 'uuid-1', name: 'Rajesh', isActive: true };
  const mockPayroll = { id: 'uuid-p', staffId: 'uuid-1', amount: 35000, status: 'Pending' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayrollService,
        {
          provide: HrRepository,
          useValue: {
            findStaffById: jest.fn(),
            createPayroll: jest.fn(),
            findPayrolls: jest.fn(),
            findPayrollById: jest.fn(),
            updatePayroll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PayrollService>(PayrollService);
    repository = module.get<HrRepository>(HrRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw StaffNotFoundException when creating payroll for non-existent staff', async () => {
    jest.spyOn(repository, 'findStaffById').mockResolvedValue(null);
    await expect(service.create({ staffId: 'bad-id', amount: 1000 } as any)).rejects.toThrow(StaffNotFoundException);
  });

  it('should create payroll successfully', async () => {
    jest.spyOn(repository, 'findStaffById').mockResolvedValue(mockStaff as any);
    jest.spyOn(repository, 'createPayroll').mockResolvedValue(mockPayroll as any);

    const result = await service.create({ staffId: 'uuid-1', amount: 35000 } as any);
    expect(result.data).toEqual(mockPayroll);
  });

  it('should throw PayrollNotFoundException when updating status of non-existent payroll', async () => {
    jest.spyOn(repository, 'findPayrollById').mockResolvedValue(null);
    await expect(service.updateStatus('bad-id', 'Paid')).rejects.toThrow(PayrollNotFoundException);
  });

  it('should update payroll status to Paid', async () => {
    const updated = { ...mockPayroll, status: 'Paid' };
    jest.spyOn(repository, 'findPayrollById').mockResolvedValue(mockPayroll as any);
    jest.spyOn(repository, 'updatePayroll').mockResolvedValue(updated as any);

    const result = await service.updateStatus('uuid-p', 'Paid');
    expect((result.data as any).status).toBe('Paid');
  });
});
