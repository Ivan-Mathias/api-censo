/*
  Warnings:

  - Added the required column `idSubmissao` to the `Resultado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resultado" ADD COLUMN     "idSubmissao" TEXT NOT NULL;
