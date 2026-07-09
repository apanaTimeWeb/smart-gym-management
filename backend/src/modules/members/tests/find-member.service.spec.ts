import { Test, TestingModule } from '@nestjs/testing';
import { FindMemberService } from '@/modules/members/services/find-member.service';
import { MembersRepository } from '@/modules/members/members.repository';
import { MemberNotFoundException } from '@/modules/members/members.exceptions';

describe('FindMemberService', () => {
  let service: FindMemberService;
  let repository: MembersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindMemberService,
        {
          provide: MembersRepository,
          useValue: {
            findMemberById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindMemberService>(FindMemberService);
    repository = module.get<MembersRepository>(MembersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw MemberNotFoundException if member is not found', async () => {
    jest.spyOn(repository, 'findMemberById').mockResolvedValue(null);
    
    await expect(service.findOne('test-id')).rejects.toThrow(MemberNotFoundException);
  });
});
