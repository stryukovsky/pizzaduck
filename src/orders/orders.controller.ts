import { Body, Controller, Get, BadRequestException, ParseIntPipe, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { CreateOrderDTO, DetailsOrderDTO } from './order.dto';
import { PizzasService } from 'src/pizzas/pizzas.service';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService, private pizzasService: PizzasService) {}

    @Post()
    public async create(@Body() order: CreateOrderDTO): Promise<Order> {
        const pizzas = await this.pizzasService.list();
        const pizzaIds = pizzas.map(pizza => pizza.id);
        let orderIsValid = true;
        order.pizzas.forEach(pizzaId => {
            if (!pizzaIds.includes(pizzaId)) {
                orderIsValid = false;
            }
        });
        if (!orderIsValid) {
            throw new BadRequestException("Pizzas mentioned do not exist");
        }
        return this.ordersService.create(order);
    }

    @Get()
    public list(): Promise<Order[]> {
        return this.ordersService.list();
    }

    @Get(":id")
    public details(@Param("id", new ParseIntPipe()) id: number): Promise<DetailsOrderDTO> {
        return this.ordersService.details(id);
    }
}
