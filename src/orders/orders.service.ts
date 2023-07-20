import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, OrderPayload, Prisma } from '@prisma/client';
import { CreateOrderDTO, DetailsOrderDTO } from './order.dto';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    public create(order: CreateOrderDTO): Promise<Order> {
        const pizzasArray = order.pizzas.map(pizzaId => { return { pizzaId } });
        return this.prisma.order.create({
            data: {
                pizzas: {
                    create: pizzasArray
                }
            }
        });
    }

    public list(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }

    public async details(id: number): Promise<DetailsOrderDTO> {
        const order = await this.prisma.order.findUnique({
            where: {
                id
            }
        });
        const pizzas = await this.prisma.pizza.findMany({
            where: {
                orders: {
                    some: {
                        orderId: id
                    }
                }
            }
        });
        return {...order, pizzas}
    }
}
