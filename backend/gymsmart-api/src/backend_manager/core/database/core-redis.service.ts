import { Injectable } from '@nestjs/common';
import { CoreRedisService as GlobalRedisService } from '@/backend_admin/core/redis/core-redis.service';

@Injectable()
export class CoreRedisService {
  constructor(private readonly globalRedis: GlobalRedisService) {}

  getClient(): any {
    return {
      set: (key: string, value: string, ex: string, ttl: number) => {
        return this.globalRedis.setWithTtl(key, value, ttl);
      },
      get: (key: string) => {
        return this.globalRedis.get(key);
      },
    };
  }

  async isReady(): Promise<boolean> {
    try {
      await this.globalRedis.ping();
      return true;
    } catch {
      return false;
    }
  }
}
