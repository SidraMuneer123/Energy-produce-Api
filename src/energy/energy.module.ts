// src/energy/energy.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Energy, EnergySchema } from '../schemas/energy.schema';
import { EnergyService } from './energy.service';
import { EnergyController } from './energy.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Energy.name, schema: EnergySchema }])],
  providers: [EnergyService],
  controllers: [EnergyController]
})
export class EnergyModule {}
