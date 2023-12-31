import { IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public placetypeid: number;

  @IsNumber()
  public userid: number;
}

export class UpdatePlaceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public placetypeid: number;

  @IsNumber()
  public userid: number;
}
