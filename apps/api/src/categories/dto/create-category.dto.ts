import { IsString, IsOptional, IsBoolean, IsInt, IsUrl, Min, MaxLength, MinLength } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string

  @IsString()
  @IsOptional()
  slug?: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string

  @IsString()
  @IsOptional()
  image?: string

  @IsBoolean()
  @IsOptional()
  active?: boolean = true

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number = 0
}
