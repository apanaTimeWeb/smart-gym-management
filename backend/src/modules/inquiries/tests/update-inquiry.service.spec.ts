import { Test, TestingModule } from '@nestjs/testing';
import { UpdateInquiryService } from '@/modules/inquiries/services/update-inquiry.service';
import { InquiriesRepository } from '@/modules/inquiries/inquiries.repository';
import { InquiryNotFoundException } from '@/modules/inquiries/inquiries.exceptions';

describe('UpdateInquiryService', () => {
  let service: UpdateInquiryService;
  let repository: InquiriesRepository;

  const mockInquiry = { id: 1, name: 'Ravi', status: 'NEW' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateInquiryService,
        {
          provide: InquiriesRepository,
          useValue: {
            inquiryRepository: {
              findOne: jest.fn(),
              update: jest.fn(),
            }
          },
        },
      ],
    }).compile();

    service = module.get<UpdateInquiryService>(UpdateInquiryService);
    repository = module.get<InquiriesRepository>(InquiriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw InquiryNotFoundException when inquiry does not exist', async () => {
    jest.spyOn(repository.inquiryRepository, 'findOne').mockResolvedValue(null);
    await expect(service.execute(999, { status: 'CONVERTED' } as any)).rejects.toThrow(InquiryNotFoundException);
  });

  it('should update inquiry status successfully', async () => {
    const updated = { ...mockInquiry, status: 'CONVERTED' };
    jest.spyOn(repository.inquiryRepository, 'findOne')
      .mockResolvedValueOnce(mockInquiry as any)
      .mockResolvedValueOnce(updated as any);
    jest.spyOn(repository.inquiryRepository, 'update').mockResolvedValue({} as any);

    const result = await service.execute(1, { status: 'CONVERTED' } as any);
    expect(result.data).toEqual(updated);
  });
});
