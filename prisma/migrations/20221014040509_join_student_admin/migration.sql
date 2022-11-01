/*
  Warnings:

  - The primary key for the `DataResposta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idAluno` on the `DataResposta` table. All the data in the column will be lost.
  - You are about to drop the column `idAluno` on the `Rascunho` table. All the data in the column will be lost.
  - You are about to drop the `Administrador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idUser` to the `DataResposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `Rascunho` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "AdministadorCenso" DROP CONSTRAINT "AdministadorCenso_idAdministrador_fkey";

-- DropForeignKey
ALTER TABLE "DataResposta" DROP CONSTRAINT "DataResposta_idAluno_fkey";

-- DropForeignKey
ALTER TABLE "Rascunho" DROP CONSTRAINT "Rascunho_idAluno_fkey";

-- AlterTable
ALTER TABLE "DataResposta" DROP CONSTRAINT "DataResposta_pkey",
DROP COLUMN "idAluno",
ADD COLUMN     "idUser" INTEGER NOT NULL,
ADD CONSTRAINT "DataResposta_pkey" PRIMARY KEY ("idUser", "idCenso");

-- AlterTable
ALTER TABLE "Rascunho" DROP COLUMN "idAluno",
ADD COLUMN     "idUser" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Administrador";

-- DropTable
DROP TABLE "Aluno";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "NUSP" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_NUSP_key" ON "User"("NUSP");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DataResposta" ADD CONSTRAINT "DataResposta_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdministadorCenso" ADD CONSTRAINT "AdministadorCenso_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rascunho" ADD CONSTRAINT "Rascunho_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
