import { IsOptional, IsString, IsBoolean, IsInt, IsIn, Min } from 'class-validator'
import { Type, Transform } from 'class-transformer'

export class QueryProductDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 12

  @IsString()
  @IsOptional()
  category?: string

  @IsString()
  @IsOptional()
  search?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  featured?: boolean

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined
    return value === 'true' || value === true
  })
  active?: boolean

  @IsString()
  @IsIn(['name', 'code', 'createdAt', 'order'])
  @IsOptional()
  sort?: string = 'order'

  @IsString()
  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: string = 'asc'
}
