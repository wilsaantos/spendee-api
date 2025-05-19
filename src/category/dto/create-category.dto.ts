import { IsString, IsEnum, IsOptional } from 'class-validator';

export enum CategoryTypeEnum {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class CreateCategoryDto {
  @IsString()
  name!: string;

  @IsEnum(CategoryTypeEnum)
  type!: CategoryTypeEnum;

  @IsOptional()
  @IsString()
  color?: string;
}
