import { Test, TestingModule } from '@nestjs/testing';
import { UpdateSettingsService } from '@/modules/settings/services/update-settings.service';
import { SettingsRepository } from '@/modules/settings/settings.repository';

describe('UpdateSettingsService', () => {
  let service: UpdateSettingsService;
  let repository: SettingsRepository;

  const mockSettings = { id: 1, gymName: 'Old Gym', ownerName: 'Old Owner' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSettingsService,
        {
          provide: SettingsRepository,
          useValue: {
            findFirst: jest.fn(),
            settingRepository: {
              update: jest.fn(),
              create: jest.fn(),
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UpdateSettingsService>(UpdateSettingsService);
    repository = module.get<SettingsRepository>(SettingsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update existing settings when they exist', async () => {
    const updated = { ...mockSettings, gymName: 'New Gym' };
    jest.spyOn(repository, 'findFirst').mockResolvedValueOnce(mockSettings as any).mockResolvedValueOnce(updated as any);
    jest.spyOn(repository.settingRepository, 'update').mockResolvedValue(undefined as any);

    const result = await service.execute({ gymName: 'New Gym' } as any);
    expect(repository.settingRepository.update).toHaveBeenCalledWith(1, { gymName: 'New Gym' });
    expect((result.data as any).gymName).toBe('New Gym');
  });

  it('should create default settings when none exist', async () => {
    const newSettings = { id: 1, gymName: 'GymSmart Fitness' };
    jest.spyOn(repository, 'findFirst').mockResolvedValue(null);
    jest.spyOn(repository.settingRepository, 'create').mockReturnValue(newSettings as any);
    jest.spyOn(repository.settingRepository, 'save').mockResolvedValue(newSettings as any);

    const result = await service.execute({ gymName: 'GymSmart Fitness' } as any);
    expect(repository.settingRepository.save).toHaveBeenCalled();
    expect(result.data).toEqual(newSettings);
  });
});
