import { Injectable } from '@nestjs/common';
import { InjectRedis} from '@nestjs-modules/ioredis';
import { DateTime } from 'luxon';
import { Redis } from 'ioredis'

@Injectable()
export class EnergyService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getEnergybylast12months(): Promise<any> {
    const result = [];
    const now = DateTime.now();
    for (let i = 0; i < 12; i++) {
      const month = now.minus({ months: i }).toFormat('yyyy-MM');
      const totalEnergyProduced = await this.redis.get(`energy:${month}`);
      result.push({
        month,
        totalEnergyProduced: totalEnergyProduced ? parseFloat(totalEnergyProduced) : 0,
      });
    }
    return result.reverse();
  }

  async Getenrgyproducedbylasthour(): Promise<any> {
    const now = DateTime.now();
    const intervals = [];
    for (let i = 0; i < 4; i++) {
      const intervalStart = now.minus({ minutes: (i + 1) * 15 }).toISO();
      const totalEnergyProduced = await this.redis.get(`energy:${intervalStart}`);
      intervals.push({
        intervalStart,
        totalEnergyProduced: totalEnergyProduced ? parseFloat(totalEnergyProduced) : 0,
      });
    }
    return intervals.reverse();
  }
}
