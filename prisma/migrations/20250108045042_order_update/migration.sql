/*
  Warnings:

  - You are about to drop the column `status_id` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status_id",
ADD COLUMN     "status" VARCHAR(255),
ADD COLUMN     "user_id" VARCHAR(255);

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category_id";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
