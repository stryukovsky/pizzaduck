import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order, Prisma } from '@prisma/client';
import { CreateOrderDTO, DetailsOrderDTO } from './order.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    public create(@Body() order: CreateOrderDTO): Promise<Order> {
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
