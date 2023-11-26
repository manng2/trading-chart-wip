import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartDataSchema } from 'src/schemas/chart-data.schema';
import { ChartDataController } from './chart-data.controller';
import { ChartDataService } from './chart-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ChartData',
        schema: ChartDataSchema,
      },
    ]),
  ],
  controllers: [ChartDataController],
  providers: [ChartDataService],
})
export class ChartDataModule {}
