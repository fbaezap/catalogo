import { IsEnum, IsOptional, IsString } from 'class-validator';

export class FindProductDto {
  @IsString()
  @IsOptional()
  public search: string;

  @IsEnum(['id', 'other'])
  @IsOptional()
  public type: 'id' | 'other';
}
