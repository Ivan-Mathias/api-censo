/*
  Warnings:

  - You are about to drop the `TCLE` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TCLE" DROP CONSTRAINT "TCLE_idCenso_fkey";

-- DropTable
DROP TABLE "TCLE";

-- CreateTable
CREATE TABLE "tcle" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "idCenso" INTEGER NOT NULL,

    CONSTRAINT "tcle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tcle" ADD CONSTRAINT "tcle_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
