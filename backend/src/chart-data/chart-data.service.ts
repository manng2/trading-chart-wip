import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IChartData } from 'src/interfaces/chart-data.interface';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class ChartDataService {
  constructor(
    @InjectModel('ChartData') private chartDataModel: Model<IChartData>,
  ) {}

  async getAll(params: { type?: string }): Promise<IChartData[]> {
    try {
      const cond = params.type ? { type: params.type } : {};

      const chartData = await this.chartDataModel.find(cond).exec();

      return chartData;
    } catch {
      throw new ConflictException('Error getting chart logs');
    }
  }

  async create(data: CreateDto): Promise<IChartData> {
    try {
      const chartData = new this.chartDataModel(data);
      const result = await chartData.save();

      return result;
    } catch {
      throw new ConflictException('Error creating chart data');
    }
  }

  async update(data: UpdateDto): Promise<any> {
    try {
      const result = await this.chartDataModel.findOneAndUpdate(
        { _id: new Types.ObjectId(data._id) },
        data,
        { new: true },
      );

      return result;
    } catch {
      throw new ConflictException('Error updating chart data');
    }
  }
}
