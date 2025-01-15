/*
  Warnings:

  - You are about to drop the column `descount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method_id` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `addition` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `portage` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `total_price` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `quantity` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `each_price` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `total_price` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `balance_min` on the `ProductBalance` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `balance` on the `ProductBalance` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `quantity` on the `StockMovements` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_payment_method_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "descount",
DROP COLUMN "payment_method_id",
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0,
ALTER COLUMN "addition" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "portage" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "each_price" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total_price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductBalance" ALTER COLUMN "balance_min" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "balance" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "StockMovements" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "PaymentMethod";
