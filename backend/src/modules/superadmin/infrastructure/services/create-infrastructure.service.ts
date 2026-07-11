import { Injectable } from '@nestjs/common';
@Injectable()
export class CreateInfrastructureService {
  async execute() { return { success: true, module: 'infrastructure' }; }
}
