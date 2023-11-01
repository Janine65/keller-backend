import { IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreatePlacetypeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public icon: string;

  @IsNumber()
  public userid: number;
}

export class UpdatePlacetypeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public icon: string;

  @IsNumber()
  public userid: number;
}
