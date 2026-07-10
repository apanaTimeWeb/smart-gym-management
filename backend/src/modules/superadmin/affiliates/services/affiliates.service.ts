import { DUMMY_AFFILIATES } from '../../superadmin.constants';
import { Injectable } from '@nestjs/common';
import { CreateAffiliateDto } from '../dto/create-affiliates.dto';
import { UpdateAffiliateDto } from '../dto/update-affiliates.dto';

@Injectable()
export class AffiliatesService {
  create(createDto: CreateAffiliateDto) {
    return { success: true, message: 'This action adds a new affiliates' };
  }

  findAll() {
    return { success: true, message: 'Data fetched successfully', data: DUMMY_AFFILIATES };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} affiliates` };
  }

  update(id: string, updateDto: UpdateAffiliateDto) {
    return { success: true, message: `This action updates a #${id} affiliates` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} affiliates` };
  }
}
