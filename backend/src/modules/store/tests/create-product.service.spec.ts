import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductService } from '../services/create-product.service';
import { StoreRepository } from '../store.repository';

describe('CreateProductService', () => {
  let service: CreateProductService;
  let repository: StoreRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductService,
        {
          provide: StoreRepository,
          useValue: {
            productRepository: {
              create: jest.fn(),
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CreateProductService>(CreateProductService);
    repository = module.get<StoreRepository>(StoreRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
