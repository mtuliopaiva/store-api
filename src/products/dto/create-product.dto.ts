import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, Min, MinLength, ValidateNested } from "class-validator";



export class FeaturesProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  }
  export class ImageProductDTO {
    @IsUrl()
    url:string

    @IsString()
    @IsNotEmpty()
    description:string;
  }

export class CreateProductDTO {

    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(1)
    value:number;

    @IsNumber()
    @Min(0)
    quantity: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    description: string;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1) 
    @Type(() => FeaturesProductDTO)
    features: FeaturesProductDTO[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1) 
    @Type(() => ImageProductDTO)
    images:ImageProductDTO[];

    @IsString()
    @IsNotEmpty()
    category:string;
}