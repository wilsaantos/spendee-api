import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name!: string;

  @IsString()
  type!: string;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsString()
  color?: string;
}
