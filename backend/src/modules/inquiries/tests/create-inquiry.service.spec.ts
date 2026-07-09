import { Test, TestingModule } from '@nestjs/testing';
import { CreateInquiryService } from '../services/create-inquiry.service';
import { InquiriesRepository } from '../inquiries.repository';

describe('CreateInquiryService', () => {
  let service: CreateInquiryService;
  let repository: InquiriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInquiryService,
        {
          provide: InquiriesRepository,
          useValue: {
            inquiryRepository: {
              create: jest.fn(),
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CreateInquiryService>(CreateInquiryService);
    repository = module.get<InquiriesRepository>(InquiriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
