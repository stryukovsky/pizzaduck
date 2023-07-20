-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "Pizza_name_key" ON "Pizza"("name");

-- AddForeignKey
ALTER TABLE "PizzasOnOrders" ADD CONSTRAINT "PizzasOnOrders_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzasOnOrders" ADD CONSTRAINT "PizzasOnOrders_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
