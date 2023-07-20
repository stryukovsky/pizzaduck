import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Pizza, Prisma } from '@prisma/client';

@Injectable()
export class PizzasService {
    constructor(private prisma: PrismaService) {

    }

    public create(createPizza: Prisma.PizzaCreateInput): Promise<Pizza> {
        return this.prisma.pizza.create({
            data: createPizza
        });
    }
}
