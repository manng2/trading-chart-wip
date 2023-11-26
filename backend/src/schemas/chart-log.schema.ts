import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ChartLog {
  @Prop()
  time: number;

  @Prop()
  value: number;
}

export const ChartLogSchema = SchemaFactory.createForClass(ChartLog);
