/*
  Warnings:

  - You are about to drop the `Brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pagarme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Brands" DROP CONSTRAINT "Brands_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Pagarme" DROP CONSTRAINT "Pagarme_order_id_fkey";

-- DropTable
DROP TABLE "Brands";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Pagarme";
