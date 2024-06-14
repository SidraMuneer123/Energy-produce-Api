import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { RedisModule } from './redis/redis.module';
import { EnergyService } from './energy/energy.service';

@Module({
  imports: [UploadModule, RedisModule],
  controllers: [],
  providers: [EnergyService],
})
export class AppModule {}
