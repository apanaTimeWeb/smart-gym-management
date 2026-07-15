import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  async sendBill(phone: string, billSummary: string): Promise<boolean> {
    try {
      this.logger.log(`\n================== WHATSAPP SIMULATION ==================`);
      this.logger.log(`Sending bill to WhatsApp number: ${phone}`);
      this.logger.log(`Message Content:\n${billSummary}`);
      this.logger.log(`=========================================================\n`);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      this.logger.error(`Failed to send WhatsApp message to ${phone}: ${error.message}`);
      return false;
    }
  }
}
