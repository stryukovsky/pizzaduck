import { Body, Controller, Get, Post } from '@nestjs/common';
import { Pizza, Prisma } from '@prisma/client';
import { PizzasService } from './pizzas.service';

@Controller('pizzas')
export class PizzasController {
    constructor(private pizzas: PizzasService) {}
    
    @Post()
    public create(@Body() pizza: Prisma.PizzaCreateInput): Promise<Pizza> {
        return this.pizzas.create(pizza);
    }

    @Get()
    public list(): Promise<Pizza[]> {
        return this.pizzas.list();
    }
}
