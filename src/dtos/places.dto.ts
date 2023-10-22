import { PlaceType } from '@/models/place';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEnum} from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(PlaceType)
  public type: PlaceType;
}

export class UpdatePlaceDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(PlaceType)
  public type: PlaceType;
}
