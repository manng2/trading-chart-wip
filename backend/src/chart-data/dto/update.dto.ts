import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

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
