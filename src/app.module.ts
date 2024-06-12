import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnergyModule } from './energy/energy.module';

@Module({
  imports:[ MongooseModule.forRoot('mongodb+srv://UserDb:pepsi658327@cluster0.0hhzm04.mongodb.net/energydb?retryWrites=true&w=majority'),
    EnergyModule
  ],
  controllers: [AppController],
  providers: [AppService],
  
})


// mongodb+srv://UserDb:pepsi658327@cluster0.0hhzm04.mongodb.net/
export class AppModule {}

