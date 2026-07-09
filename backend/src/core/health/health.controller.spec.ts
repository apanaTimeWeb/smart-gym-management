import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { TerminusModule, HealthCheckService, TypeOrmHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn().mockResolvedValue({ status: 'ok' }),
          },
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: { pingCheck: jest.fn() },
        },
        {
          provide: MemoryHealthIndicator,
          useValue: { checkHeap: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health check ok', async () => {
    const result = await controller.check();
    expect(result).toEqual({ status: 'ok' });
  });
});
