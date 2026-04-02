import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsNumber,
  Min,
  MaxLength,
  MinLength,
  IsArray,
  IsPositive,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  code: string

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string

  @IsString()
  @IsOptional()
  slug?: string

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string

  @IsString()
  @IsOptional()
  details?: string

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number

  @IsString()
  @IsOptional()
  @MaxLength(20)
  unit?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[] = []

  @IsString()
  @MinLength(1)
  categoryId: string

  @IsBoolean()
  @IsOptional()
  featured?: boolean = false

  @IsBoolean()
  @IsOptional()
  active?: boolean = true

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number = 0
}
