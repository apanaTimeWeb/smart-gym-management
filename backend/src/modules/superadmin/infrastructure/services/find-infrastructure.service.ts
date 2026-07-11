import { Injectable } from '@nestjs/common';
@Injectable()
export class FindInfrastructureService {
  async execute() { return { success: true, module: 'infrastructure' }; }
}
