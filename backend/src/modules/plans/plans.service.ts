import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}
  create(dto: any) {
    return this.prisma.plan.create({ data: dto });
  }
  findAll() {
    return this.prisma.plan.findMany({ where: { isActive: true } });
  }
  findOne(id: number) {
    return this.prisma.plan.findUnique({ where: { id } });
  }
  update(id: number, dto: any) {
    return this.prisma.plan.update({ where: { id }, data: dto });
  }
  remove(id: number) {
    return this.prisma.plan.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
