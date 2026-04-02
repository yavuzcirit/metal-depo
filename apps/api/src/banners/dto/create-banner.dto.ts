import { IsString, IsOptional, IsBoolean, IsInt, Min, MaxLength, MinLength } from 'class-validator'

export class CreateBannerDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title: string

  @IsString()
  @IsOptional()
  @MaxLength(200)
  subtitle?: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string

  @IsString()
  @MinLength(1)
  image: string

  @IsString()
  @IsOptional()
  link?: string

  @IsBoolean()
  @IsOptional()
  active?: boolean = true

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number = 0

  @IsString()
  @IsOptional()
  page?: string = 'home'
}
