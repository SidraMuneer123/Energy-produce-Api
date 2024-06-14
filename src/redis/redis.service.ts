import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis'; // Ensure the default import is used

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis; // Type is Redis

  onModuleInit() {
    this.redisClient = new Redis({
      host: 'localhost',  
      port: 6379,         
    });
  }

  onModuleDestroy() {
    this.redisClient.quit();
  }

  async set(key: string, value: any) {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async get(key: string): Promise<any> {
    const value = await this.redisClient.get(key);
    return JSON.parse(value);
  }
}
