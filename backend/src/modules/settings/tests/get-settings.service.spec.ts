import { Test, TestingModule } from '@nestjs/testing';
import { GetSettingsService } from '../services/get-settings.service';
import { SettingsRepository } from '../settings.repository';

describe('GetSettingsService', () => {
  let service: GetSettingsService;
  let repository: SettingsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSettingsService,
        {
          provide: SettingsRepository,
          useValue: {
            findFirst: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetSettingsService>(GetSettingsService);
    repository = module.get<SettingsRepository>(SettingsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
