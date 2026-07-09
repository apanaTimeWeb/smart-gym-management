import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderService } from '@/modules/store/services/create-order.service';
import { StoreRepository } from '@/modules/store/store.repository';
import { ProductNotFoundException, InsufficientStockException } from '@/modules/store/store.exceptions';

describe('CreateOrderService', () => {
  let service: CreateOrderService;
  let repository: StoreRepository;

  const mockQueryRunner = {
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    },
  };

  const mockDataSource = {
    createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderService,
        {
          provide: StoreRepository,
          useValue: {
            getDataSource: jest.fn().mockReturnValue(mockDataSource),
          },
        },
      ],
    }).compile();

    service = module.get<CreateOrderService>(CreateOrderService);
    repository = module.get<StoreRepository>(StoreRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw ProductNotFoundException when product does not exist', async () => {
    mockQueryRunner.manager.create.mockReturnValue({});
    mockQueryRunner.manager.save.mockResolvedValue({ id: 1, total: 0 });
    mockQueryRunner.manager.findOne.mockResolvedValue(null);

    await expect(
      service.execute({ items: [{ productId: 999, qty: 1 }], method: 'UPI' } as any),
    ).rejects.toThrow(ProductNotFoundException);

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
  });

  it('should throw InsufficientStockException when product stock is too low', async () => {
    mockQueryRunner.manager.create.mockReturnValue({});
    mockQueryRunner.manager.save.mockResolvedValue({ id: 1, total: 0 });
    mockQueryRunner.manager.findOne.mockResolvedValue({ id: 1, name: 'Whey', price: 2500, stock: 0, isActive: true });

    await expect(
      service.execute({ items: [{ productId: 1, qty: 5 }], method: 'UPI' } as any),
    ).rejects.toThrow(InsufficientStockException);

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
  });

  it('should rollback and release query runner on any error', async () => {
    mockQueryRunner.manager.create.mockReturnValue({});
    mockQueryRunner.manager.save.mockRejectedValue(new Error('DB failure'));

    await expect(
      service.execute({ items: [{ productId: 1, qty: 1 }], method: 'UPI' } as any),
    ).rejects.toBeDefined();

    expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
    expect(mockQueryRunner.release).toHaveBeenCalled();
  });
});
