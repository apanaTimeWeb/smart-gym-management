import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from '../dto/create-features.dto';
import { UpdateFeatureDto } from '../dto/update-features.dto';

@Injectable()
export class FeaturesService {
  create(createDto: CreateFeatureDto) {
    return { success: true, message: 'This action adds a new features' };
  }

  findAll() {
    return { success: true, message: 'This action returns all features' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} features` };
  }

  update(id: string, updateDto: UpdateFeatureDto) {
    return { success: true, message: `This action updates a #${id} features` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} features` };
  }
}
