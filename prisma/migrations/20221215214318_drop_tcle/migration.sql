/*
  Warnings:

  - You are about to drop the `tcle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tcle" DROP CONSTRAINT "tcle_idCenso_fkey";

-- AlterTable
ALTER TABLE "Censo" ADD COLUMN     "tcle" TEXT;

-- DropTable
DROP TABLE "tcle";
