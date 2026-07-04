import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getSettings() {
    const settings = await this.prisma.settings.findFirst();
    if (!settings) {
      return this.prisma.settings.create({
        data: {
          gymName: 'GymSmart Fitness',
          ownerName: 'Admin',
          phone: '',
          email: '',
          city: '',
          gstNumber: '',
        },
      });
    }
    return settings;
  }

  async updateSettings(dto: any) {
    const settings = await this.prisma.settings.findFirst();
    if (settings) {
      return this.prisma.settings.update({
        where: { id: settings.id },
        data: dto,
      });
    }
    return this.prisma.settings.create({ data: dto });
  }
}
