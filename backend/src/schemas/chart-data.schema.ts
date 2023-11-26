import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ChartData {
  @Prop()
  content: string;

  @Prop()
  time: number;

  @Prop()
  type: string;
}

export const ChartDataSchema = SchemaFactory.createForClass(ChartData);
