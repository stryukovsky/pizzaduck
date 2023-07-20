import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal } from "class-validator";

export class DetailsPizzaDTO {
    @ApiProperty()
    @IsDecimal()
    id: number;

    @ApiProperty()
    name: string;
}