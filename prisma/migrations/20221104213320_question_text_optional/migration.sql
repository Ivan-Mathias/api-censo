/*
  Warnings:

  - You are about to drop the column `NUSP` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `senha` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_NUSP_key";

-- AlterTable
ALTER TABLE "Alternativa" ALTER COLUMN "texto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "NUSP",
DROP COLUMN "senha",
ADD COLUMN     "googleId" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "sobrenome" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_googleId_key" ON "Usuario"("googleId");
