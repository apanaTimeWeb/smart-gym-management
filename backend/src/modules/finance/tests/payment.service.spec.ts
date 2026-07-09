import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentService } from '@/modules/finance/services/payment.service';
import { FinanceRepository } from '@/modules/finance/services/finance.repository';
import { MemberNotFoundForPaymentException } from '@/modules/finance/finance.exceptions';

describe('PaymentService', () => {
  let service: PaymentService;
  let repository: FinanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: FinanceRepository,
          useValue: {
            findMemberById: jest.fn(),
            processPayment: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    repository = module.get<FinanceRepository>(FinanceRepository);
  });

  it('should throw MemberNotFoundForPaymentException if member does not exist', async () => {
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(null);
    
    await expect(service.createPayment({
      memberId: 'test-id',
      amount: 100,
      method: 'Card',
    })).rejects.toThrow(MemberNotFoundForPaymentException);
  });
});
