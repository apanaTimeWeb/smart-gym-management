import { Injectable } from '@nestjs/common';
@Injectable()
export class DeleteInfrastructureService {
  async execute() { return { success: true, module: 'infrastructure' }; }
}
