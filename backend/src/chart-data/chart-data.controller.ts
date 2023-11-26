import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ChartDataService } from './chart-data.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('chart-data')
export class ChartDataController {
  constructor(private chartDataService: ChartDataService) {}

  @Get('all')
  async getAll(@Query() queryParams: { type: string }): Promise<any> {
    const data = await this.chartDataService.getAll(queryParams);
    return data;
  }

  @Post('create')
  async create(@Body() createDto: CreateDto): Promise<any> {
    const data = await this.chartDataService.create(createDto);
    return data;
  }

  @Put('update')
  async update(@Body() updateDto: UpdateDto): Promise<any> {
    const data = await this.chartDataService.update(updateDto);
    return data;
  }
}
