import { Injectable } from "@nestjs/common/interfaces";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
}