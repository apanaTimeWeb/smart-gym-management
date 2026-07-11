import { Injectable } from '@nestjs/common';

@Injectable()
export class SendBroadcastsService {
  async execute(id: string) { return { success: true, message: 'Job enqueued' }; }
}
