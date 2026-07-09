import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/modules/auth/entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findUserByIdForMe(id: string): Promise<Partial<User> | null> {
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'phone',
        'role',
        'branch',
        'isActive',
        'createdAt',
      ],
    });
  }

  async findUserByIdForStrategy(id: string): Promise<Partial<User> | null> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'role', 'branch', 'isActive'],
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    await this.userRepository.update(id, data);
  }
}
