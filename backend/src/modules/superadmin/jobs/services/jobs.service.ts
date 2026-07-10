import { Injectable } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-jobs.dto';
import { UpdateJobDto } from '../dto/update-jobs.dto';

@Injectable()
export class JobsService {
  create(createDto: CreateJobDto) {
    return { success: true, message: 'This action adds a new jobs' };
  }

  findAll() {
    return { success: true, message: 'This action returns all jobs' };
  }

  findOne(id: string) {
    return { success: true, message: `This action returns a #${id} jobs` };
  }

  update(id: string, updateDto: UpdateJobDto) {
    return { success: true, message: `This action updates a #${id} jobs` };
  }

  remove(id: string) {
    return { success: true, message: `This action removes a #${id} jobs` };
  }
}
