/*
  Warnings:

  - The primary key for the `DataResposta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUser` on the `DataResposta` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `Rascunho` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idUsuario` to the `DataResposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Rascunho` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdministadorCenso" DROP CONSTRAINT "AdministadorCenso_idAdministrador_fkey";

-- DropForeignKey
ALTER TABLE "DataResposta" DROP CONSTRAINT "DataResposta_idUser_fkey";

-- DropForeignKey
ALTER TABLE "Rascunho" DROP CONSTRAINT "Rascunho_idUser_fkey";

-- AlterTable
ALTER TABLE "DataResposta" DROP CONSTRAINT "DataResposta_pkey",
DROP COLUMN "idUser",
ADD COLUMN     "idUsuario" INTEGER NOT NULL,
ADD CONSTRAINT "DataResposta_pkey" PRIMARY KEY ("idUsuario", "idCenso");

-- AlterTable
ALTER TABLE "Rascunho" DROP COLUMN "idUser",
ADD COLUMN     "idUsuario" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "NUSP" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refreshToken" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "expiracao" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criadoPor" TEXT NOT NULL,
    "idSucessor" INTEGER,

    CONSTRAINT "refreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_NUSP_key" ON "Usuario"("NUSP");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_idSucessor_key" ON "refreshToken"("idSucessor");

-- CreateIndex
CREATE INDEX "refreshToken_idUsuario_idx" ON "refreshToken"("idUsuario");

-- AddForeignKey
ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshToken_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshToken_idSucessor_fkey" FOREIGN KEY ("idSucessor") REFERENCES "refreshToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataResposta" ADD CONSTRAINT "DataResposta_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdministadorCenso" ADD CONSTRAINT "AdministadorCenso_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rascunho" ADD CONSTRAINT "Rascunho_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
