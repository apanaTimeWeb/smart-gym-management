import { Test, TestingModule } from '@nestjs/testing';
import { UpdateMemberService } from '@/modules/members/services/update-member.service';
import { MembersRepository } from '@/modules/members/services/members.repository';
import { MemberNotFoundException } from '@/modules/members/members.exceptions';

describe('UpdateMemberService', () => {
  let service: UpdateMemberService;
  let repository: MembersRepository;

  const mockMember = { id: 'uuid-1', name: 'Old Name', email: 'old@test.com' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateMemberService,
        {
          provide: MembersRepository,
          useValue: {
            findMemberById: jest.fn(),
            updateMember: jest.fn(),
            deleteMember: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateMemberService>(UpdateMemberService);
    repository = module.get<MembersRepository>(MembersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw MemberNotFoundException when updating a non-existent member', async () => {
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(null);
    await expect(service.update('bad-id', { name: 'New Name' } as any)).rejects.toThrow(MemberNotFoundException);
  });

  it('should update the member successfully', async () => {
    const updated = { ...mockMember, name: 'New Name' };
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(mockMember as any);
    jest.spyOn(repository, 'updateMember').mockResolvedValue(updated as any);

    const result = await service.update('uuid-1', { name: 'New Name' } as any);
    expect(repository.updateMember).toHaveBeenCalledWith('uuid-1', { name: 'New Name' });
    expect(result.data).toEqual(updated);
  });

  it('should throw MemberNotFoundException when deleting a non-existent member', async () => {
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(null);
    await expect(service.remove('bad-id')).rejects.toThrow(MemberNotFoundException);
  });

  it('should delete the member successfully', async () => {
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(mockMember as any);
    jest.spyOn(repository, 'deleteMember').mockResolvedValue(undefined);

    const result = await service.remove('uuid-1');
    expect(repository.deleteMember).toHaveBeenCalledWith('uuid-1');
    expect(result).toBeDefined();
  });
});
