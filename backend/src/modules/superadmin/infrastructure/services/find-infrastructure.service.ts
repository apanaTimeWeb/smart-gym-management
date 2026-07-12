import { Injectable, Logger } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class FindInfrastructureService {
  private readonly logger = new Logger(FindInfrastructureService.name);

  async execute() {
    this.logger.log('Fetching infrastructure telemetry');
    
    const cpus = os.cpus();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    
    return { 
      success: true, 
      data: {
        cpu: {
          model: cpus[0]?.model,
          cores: cpus.length,
          loadAverage: os.loadavg(),
        },
        memory: {
          totalBytes: totalMem,
          freeBytes: freeMem,
          usedPercentage: ((totalMem - freeMem) / totalMem) * 100
        },
        os: {
          platform: os.platform(),
          release: os.release(),
          uptime: os.uptime()
        },
        timestamp: new Date().toISOString()
      } 
    }; 
  }
}
