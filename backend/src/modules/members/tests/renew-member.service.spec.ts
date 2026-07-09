import { Test, TestingModule } from '@nestjs/testing';
import { RenewMemberService } from '@/modules/members/services/renew-member.service';
import { MembersRepository } from '@/modules/members/services/members.repository';
import { MemberNotFoundException } from '@/modules/members/members.exceptions';

describe('RenewMemberService', () => {
  let service: RenewMemberService;
  let repository: MembersRepository;

  const mockMember = { id: 'uuid-1', name: 'Rahul', status: 'EXPIRED' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RenewMemberService,
        {
          provide: MembersRepository,
          useValue: {
            findMemberById: jest.fn(),
            updateMember: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RenewMemberService>(RenewMemberService);
    repository = module.get<MembersRepository>(MembersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw MemberNotFoundException when member does not exist', async () => {
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(null);
    await expect(service.renew('bad-id', {} as any)).rejects.toThrow(MemberNotFoundException);
  });

  it('should renew the member and set status to ACTIVE', async () => {
    const renewed = { ...mockMember, status: 'ACTIVE' };
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(mockMember as any);
    jest.spyOn(repository, 'updateMember').mockResolvedValue(renewed as any);

    const result = await service.renew('uuid-1', { months: 1 } as any);
    expect(repository.updateMember).toHaveBeenCalledWith('uuid-1', expect.objectContaining({ status: 'ACTIVE' }));
    expect(result.data).toEqual(renewed);
  });
});
