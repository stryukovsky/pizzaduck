import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { PizzasController } from './pizzas/pizzas.controller';
import { PizzasService } from './pizzas/pizzas.service';

@Module({
  imports: [PrismaModule, ],
  controllers: [AppController, OrdersController, PizzasController],
  providers: [AppService, OrdersService, PizzasService],
})
export class AppModule {}
