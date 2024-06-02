import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnergyModule } from './energy/energy.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://UserDb:pepsi658327@Clustor0.mongodb.net/energy-produced?retryWrites=true&w=majority"),
    EnergyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

