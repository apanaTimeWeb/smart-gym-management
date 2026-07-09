import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '@/modules/members/entities/member.entity';
import { MemberStatus } from '@/modules/members/utils/members.enums';

@Injectable()
export class MembersRepository {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async createMember(data: Partial<Member>): Promise<Member> {
    const member = this.memberRepo.create(
      data as import('typeorm').DeepPartial<Member>,
    );
    return this.memberRepo.save(member);
  }

  async findMembers(limit: number): Promise<[Member[], number]> {
    return this.memberRepo.findAndCount({
      take: limit,
      order: { id: 'DESC' },
      relations: ['plan'],
    });
  }

  async findMemberById(id: string): Promise<Member | null> {
    return this.memberRepo.findOne({
      where: { id },
      relations: ['plan', 'payments'],
    });
  }

  async findMemberByEmail(email: string): Promise<Member | null> {
    return this.memberRepo.findOne({ where: { email } });
  }

  async updateMember(id: string, data: any): Promise<Member> {
    await this.memberRepo.update(id, data);
    return this.findMemberById(id) as Promise<Member>;
  }

  async deleteMember(id: string): Promise<void> {
    await this.memberRepo.softDelete(id);
  }

  async getStats() {
    const [total, active, pending, expired] = await Promise.all([
      this.memberRepo.count(),
      this.memberRepo.count({ where: { status: MemberStatus.ACTIVE } }),
      this.memberRepo.count({ where: { status: MemberStatus.PENDING } }),
      this.memberRepo.count({ where: { status: MemberStatus.EXPIRED } }),
    ]);
    return { total, active, pending, expired };
  }
}
