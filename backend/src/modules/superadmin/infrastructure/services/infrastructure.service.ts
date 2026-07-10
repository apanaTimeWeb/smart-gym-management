import { Injectable } from '@nestjs/common';
import { CreateInfrastructureDto } from '../dto/create-infrastructure.dto';
import { UpdateInfrastructureDto } from '../dto/update-infrastructure.dto';

@Injectable()
export class InfrastructureService {
  create(createDto: CreateInfrastructureDto) {
    return { success: true, message: 'This action adds a new infrastructure' };
  }

  findAll() {
    return { success: true, message: 'This action returns all infrastructure' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} infrastructure` };
  }

  update(id: string, updateDto: UpdateInfrastructureDto) {
    return { success: true, message: `This action updates a #${id} infrastructure` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} infrastructure` };
  }
}
