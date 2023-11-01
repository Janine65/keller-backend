import { IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateSubplaceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public placeid: number;

  @IsNumber()
  public userid: number;
}

export class UpdateSubplaceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  @IsNotEmpty()
  public placeid: number;

  @IsNumber()
  public userid: number;
}
