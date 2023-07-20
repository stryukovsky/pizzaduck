import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PizzasController {
    constructor(private pizzas: PizzasService) {}
    
    @Post()
    public create(@Body() pizza: Prisma.PizzaCreateInput) {
        return this.pizzas.create(pizza);
    }
}
