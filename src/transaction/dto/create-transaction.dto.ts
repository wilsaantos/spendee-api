import {
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
  IsDateString,
  IsEnum,
  IsArray,
} from 'class-validator';
import { CategoryType } from '@prisma/client';

export class CreateTransactionDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  amount!: number;

  @IsDateString()
  date!: string;

  @IsEnum(CategoryType)
  type!: CategoryType;

  @IsUUID()
  accountId!: string;

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  tagIds?: string[];
}
