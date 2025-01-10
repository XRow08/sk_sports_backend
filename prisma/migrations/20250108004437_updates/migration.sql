/*
  Warnings:

  - You are about to drop the column `typeAddressId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `catalog_meta` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isRate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pesoBruto` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `pesoLiq` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `supplier_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tonalidade` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `un` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeIngredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipePreparationMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `likes` to the `RateProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_typeAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subcategory_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_product_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredients" DROP CONSTRAINT "RecipeIngredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipePreparationMethod" DROP CONSTRAINT "RecipePreparationMethod_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_address_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "typeAddressId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "catalog_meta",
DROP COLUMN "isRate",
DROP COLUMN "modelo",
DROP COLUMN "pesoBruto",
DROP COLUMN "pesoLiq",
DROP COLUMN "subcategory_id",
DROP COLUMN "supplier_id",
DROP COLUMN "tonalidade",
DROP COLUMN "un",
DROP COLUMN "url",
ADD COLUMN     "categories" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "club" VARCHAR(255),
ADD COLUMN     "collar" VARCHAR(255),
ADD COLUMN     "composition" VARCHAR(255),
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0.00,
ADD COLUMN     "gender" VARCHAR(255),
ADD COLUMN     "indicate_for" VARCHAR(255),
ADD COLUMN     "size" JSONB[] DEFAULT ARRAY[]::JSONB[],
ADD COLUMN     "sleeve" VARCHAR(255),
ADD COLUMN     "tech" VARCHAR(255),
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RateProduct" ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "title" VARCHAR(255);

-- DropTable
DROP TABLE "Configuration";

-- DropTable
DROP TABLE "Recipe";

-- DropTable
DROP TABLE "RecipeIngredients";

-- DropTable
DROP TABLE "RecipePreparationMethod";

-- DropTable
DROP TABLE "SubCategory";

-- DropTable
DROP TABLE "Supplier";

-- DropTable
DROP TABLE "TypeAddress";
