import { IsString, IsOptional, MinLength } from 'class-validator'

export class UpsertPageContentDto {
  @IsString()
  @MinLength(1)
  key: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  content?: string

  @IsOptional()
  metadata?: Record<string, unknown>
}
