import { Controller ,  Get } from "@nestjs/common";
import { EnergyService } from "./energy.service";

@Controller('energy')
export class EnergyController{
  constructor(private readonly energyservice :  EnergyService){}

  @Get("last-12-months")
  async getEnergybylast12months(){
    return this.energyservice.getEnergybylast12months();
  }
  @Get('last-hour')
    async Getenrgyproducedbylasthour(){
      return this.energyservice.Getenrgyproducedbylasthour();
    }
  
}