import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public brand: string;

  @IsNumber()
  public price: number;
}
