import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()

export class Energy extends Document{
  @Prop()
  hash:string;

  @Prop()
  deviceId:string;

  @Prop()
  energyProducedUnits:number;

  @Prop()
  energyProducedWatt:number;

  @Prop()
  source:string;

  @Prop()
  startTime:Date;

  @Prop()
  totalTimeInSeconds:string;
}

export const EnergySchema = SchemaFactory.createForClass(Energy);