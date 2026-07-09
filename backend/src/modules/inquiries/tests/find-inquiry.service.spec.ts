import { Test, TestingModule } from '@nestjs/testing';
import { FindInquiryService } from '@/modules/inquiries/services/find-inquiry.service';
import { InquiriesRepository } from '@/modules/inquiries/inquiries.repository';

describe('FindInquiryService', () => {
  let service: FindInquiryService;
  let repository: InquiriesRepository;

  const mockInquiries = [
    { id: 1, name: 'Ravi', phone: '9988776655', status: 'NEW' },
    { id: 2, name: 'Priya', phone: '9977665544', status: 'FOLLOW_UP' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindInquiryService,
        {
          provide: InquiriesRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            inquiryRepository: {},
          },
        },
      ],
    }).compile();

    service = module.get<FindInquiryService>(FindInquiryService);
    repository = module.get<InquiriesRepository>(InquiriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all inquiries', async () => {
    jest.spyOn(repository, 'findAll').mockResolvedValue(mockInquiries as any);
    const result = await service.findAll({ limit: 10, page: 1 } as any);
    expect(repository.findAll).toHaveBeenCalled();
    expect(result.data).toBeDefined();
  });
});
