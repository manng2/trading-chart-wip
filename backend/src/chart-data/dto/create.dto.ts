import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  @IsNotEmpty()
  readonly time: number;

  @IsString()
  @IsNotEmpty()
  readonly type: string;
}
