/*
  Warnings:

  - A unique constraint covering the columns `[idCenso]` on the table `tcle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tcle_idCenso_key" ON "tcle"("idCenso");
