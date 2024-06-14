import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [UploadController],
})
export class UploadModule {}

