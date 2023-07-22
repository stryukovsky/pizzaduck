-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('NEW', 'FINISHED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STAFF', 'CUSTOMER');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'NEW',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT '2000-01-01 00:00:00 +00:00',
    "finishedAt" TIMESTAMP(3) NOT NULL DEFAULT '2000-01-01 00:00:00 +00:00',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PizzasOnOrders" (
    "pizzaId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "PizzasOnOrders_pkey" PRIMARY KEY ("pizzaId","orderId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pizza_name_key" ON "Pizza"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzasOnOrders" ADD CONSTRAINT "PizzasOnOrders_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzasOnOrders" ADD CONSTRAINT "PizzasOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
