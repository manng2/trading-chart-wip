import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChartLogSchema } from 'src/schemas/chart-log.schema';
import { ChartLogController } from './chart-log.controller';
import { ChartLogService } from './chart-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ChartLog',
        schema: ChartLogSchema,
      },
    ]),
  ],
  controllers: [ChartLogController],
  providers: [ChartLogService],
})
export class ChartLogModule {}
