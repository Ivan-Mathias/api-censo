/*
  Warnings:

  - You are about to drop the column `date` on the `Censo` table. All the data in the column will be lost.
  - You are about to drop the column `visivel` on the `Censo` table. All the data in the column will be lost.
  - Added the required column `dateClosed` to the `Censo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datePublished` to the `Censo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdated` to the `Censo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Censo" DROP COLUMN "date",
DROP COLUMN "visivel",
ADD COLUMN     "dateClosed" TIMESTAMP(3),
ADD COLUMN     "datePublished" TIMESTAMP(3),
ADD COLUMN     "lastUpdated" TIMESTAMP(3) NOT NULL;
