import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChartLogService } from './chart-log.service';

@Controller('chart-log')
export class ChartLogController {
  constructor(private chartLogService: ChartLogService) {}

  @Get('count')
  async getCount(): Promise<any> {
    const data = await this.chartLogService.getCount();
    return data;
  }

  @Get('all')
  async getAll(
    @Query() queryParams: { skip: number; limit: number },
  ): Promise<any> {
    const data = await this.chartLogService.getAll(queryParams);
    return data;
  }

  @Get('by-latest-time/:time')
  async getByLatestTime(@Param('time') time: string): Promise<any> {
    const data = await this.chartLogService.getByLatestTime(Number(time));
    return data;
  }
}
