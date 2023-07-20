import { ApiProperty } from "@nestjs/swagger";
import { IsArray, Length, IsDecimal } from "class-validator";
import { DetailsPizzaDTO } from "src/pizzas/pizza.dto";

export class CreateOrderDTO {
    @ApiProperty()
    @IsArray()
    @Length(1)
    pizzas: number[]
}

export class DetailsOrderDTO {
    @IsDecimal()
    @ApiProperty()
    id: number;

    @IsArray()
    @ApiProperty()
    pizzas: DetailsPizzaDTO[];

}