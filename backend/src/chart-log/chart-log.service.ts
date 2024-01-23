import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IChartLog } from 'src/interfaces/chart-log.interface';

@Injectable()
export class ChartLogService {
  constructor(
    @InjectModel('ChartLog') private chartLogModel: Model<IChartLog>,
  ) {}

  async getCount(): Promise<number> {
    try {
      const count = await this.chartLogModel.countDocuments().exec();

      return 200000;
    } catch {
      throw new ConflictException('Error getting chart logs');
    }
  }

  async getAll(queryParams: {
    skip: number;
    limit: number;
  }): Promise<IChartLog[]> {
    try {
      const { skip, limit } = queryParams;
      const chartLogs = await this.chartLogModel
        .find()
        .skip(skip)
        .limit(limit)
        .exec();

      return chartLogs;
    } catch {
      throw new ConflictException('Error getting chart logs');
    }
  }

  async getByLatestTime(time: number): Promise<IChartLog[]> {
    try {
      const chartLogs = await this.chartLogModel
        .find({ time: { $gt: time } })
        .limit(5)
        .exec();

      return chartLogs;
    } catch {
      throw new ConflictException('Error getting chart logs');
    }
  }
}
