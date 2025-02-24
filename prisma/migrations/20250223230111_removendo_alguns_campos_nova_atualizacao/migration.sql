/*
  Warnings:

  - You are about to drop the column `customerCpf` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "customerCpf",
DROP COLUMN "customerName";
