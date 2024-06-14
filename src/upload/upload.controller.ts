import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RedisService } from '../redis/redis.service';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    if (file.originalname === 'data.json') {
      const filePath = path.join(__dirname, '..', 'data', file.originalname);
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(jsonData);

      await this.redisService.set('uploadedData', data);

      return { message: 'File uploaded and data saved to Redis' };
    } else {
      throw new Error('Invalid file uploaded. Expected "data.json".');
    }
  }
}
