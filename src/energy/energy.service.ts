import { Injectable } from "@nestjs/common/interfaces";
import { InjectModel } from "@nestjs/mongoose";
import { promises } from "dns";
import { Model } from "mongoose";
import { interval } from "rxjs";
import { Energy, EnergySchema } from "src/Schemas/energy.schema";


export class EnergyService{
  constructor(@InjectModel(Energy.name) private energyModel:Model<Energy>){}

  async getEnergybylast12months():Promise<any>{
    const twelvemonthago = new Date();
    twelvemonthago.setMonth(twelvemonthago.getMonth() - 12)
    const result = await this.energyModel.aggregate([
      {
        $match: {
          startTime: { $gte: twelvemonthago }
        }
      },
      {
        $group: {
          _id: { $month: "$startTime" },
          totalEnergyProduced: { $sum: "$energyProducedWatt" }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);
    return result.map(month => ({
      month: month._id,
      totalEnergyProduced: month.totalEnergyProduced
    }));
  }
  async Getenrgyproducedbylasthour(): Promise<any>{
    const now = new Date();
    const onehourago = new Date(now.getTime()-60*60*1000);

    const result = await this.energyModel.aggregate([
      {
        $match:{
          startTime:{$gte : onehourago , $lte : now}

        }
      },
      {
        $bucket : {
          groupBy : "$startTime",
          boundaries:[
            onehourago,
            new Date(onehourago.getTime()+15*60*1000),
            new Date(onehourago.getTime()+30*60*1000),
            new Date(onehourago.getTime()+45*60*1000),
            now
          ],
          default : 'other',
          output:{
            totalEnergyProduced : {$sum:'$energyProducedWatt'}
          }

        }
      }
    ]);
    return result.filter(bucket => bucket._id! == "other").map(bucket => ({
      intervalStart : bucket._id,
      totalEnergyProduced:bucket.totalEnergyProduced
    
    }));
  }
}