import { Test, TestingModule } from '@nestjs/testing';
import { CreateMemberService } from '@/modules/members/services/create-member.service';
import { MembersRepository } from '@/modules/members/services/members.repository';
import { DuplicateEmailException } from '@/modules/members/members.exceptions';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CreateMemberService', () => {
  let service: CreateMemberService;
  let repository: MembersRepository;
  let eventEmitter: EventEmitter2;

  const mockMember = {
    id: 'uuid-1',
    name: 'Rahul Sharma',
    email: 'rahul@test.com',
    phone: '+91 98765 43210',
    status: 'ACTIVE',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateMemberService,
        {
          provide: MembersRepository,
          useValue: {
            findMemberByEmail: jest.fn(),
            createMember: jest.fn(),
          },
        },
        {
          provide: EventEmitter2,
          useValue: { emit: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<CreateMemberService>(CreateMemberService);
    repository = module.get<MembersRepository>(MembersRepository);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw DuplicateEmailException if email already exists', async () => {
    jest.spyOn(repository, 'findMemberByEmail').mockResolvedValue(mockMember as any);
    await expect(
      service.create({ email: 'rahul@test.com', name: 'Rahul', phone: '123', billingCycle: 'ONE_MONTH' } as any),
    ).rejects.toThrow(DuplicateEmailException);
  });

  it('should create a member and emit member.registered event', async () => {
    jest.spyOn(repository, 'findMemberByEmail').mockResolvedValue(null);
    jest.spyOn(repository, 'createMember').mockResolvedValue(mockMember as any);

    const result = await service.create({
      email: 'rahul@test.com',
      name: 'Rahul',
      phone: '123',
      billingCycle: 'ONE_MONTH',
    } as any);

    expect(repository.createMember).toHaveBeenCalled();
    expect(eventEmitter.emit).toHaveBeenCalledWith('member.registered', mockMember);
    expect(result.data).toEqual(mockMember);
  });
});
