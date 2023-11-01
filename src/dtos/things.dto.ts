import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, isNumber } from "class-validator";

export class CreateAlcoholicDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
  
    @IsString()
    @IsNotEmpty()
    public unit_weight: string;
  
    @IsString()
    public country: string;
  
    @IsString()
    public region: string;
  
    @IsNumber()
    public year: number;
  
    @IsArray()
    public grapes: string[];
  
    @IsString()
    public type: string;
  
    @IsNumber()
    public userid: number;
  }

  export class CreateFoodDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
  
    @IsString()
    @IsNotEmpty()
    public unit_weight: string;
  
    @IsBoolean()
    public vacuumed: boolean;
  
    @IsBoolean()
    public sealed: boolean;
    
    @IsNumber()
    public userid: number;
  }
  
  export class CreateNonalcoholicDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
  
    @IsString()
    @IsNotEmpty()
    public unit_weight: string;
  
    @IsNumber()
    public weight: number;
  
    @IsNumber()
    public userid: number;
  }
  
  export class CreateNonfoodDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
  
    @IsString()
    @IsNotEmpty()
    public unit_weight: string;
  
    @IsNumber()
    public userid: number;
  }
    