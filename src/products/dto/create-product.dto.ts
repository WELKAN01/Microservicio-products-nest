import { IsNumber, IsPositive, isPositive, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    public name: string;

    @IsNumber(
        { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 }
    )
    @Min(0)
    public price:number;
}
