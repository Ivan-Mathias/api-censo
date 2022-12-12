/*
  Warnings:

  - You are about to drop the column `idPergunta` on the `Alternativa` table. All the data in the column will be lost.
  - The primary key for the `DataResposta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `DataResposta` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `DataResposta` table. All the data in the column will be lost.
  - You are about to drop the column `idAlternativa` on the `Resultado` table. All the data in the column will be lost.
  - You are about to drop the column `idSubmissao` on the `Resultado` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `Alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `DataResposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `DataResposta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionId` to the `Resultado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionId` to the `Resultado` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alternativa" DROP CONSTRAINT "Alternativa_idPergunta_fkey";

-- DropForeignKey
ALTER TABLE "DataResposta" DROP CONSTRAINT "DataResposta_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Resultado" DROP CONSTRAINT "Resultado_idAlternativa_fkey";

-- AlterTable
ALTER TABLE "Alternativa" DROP COLUMN "idPergunta",
ADD COLUMN     "questionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DataResposta" DROP CONSTRAINT "DataResposta_pkey",
DROP COLUMN "data",
DROP COLUMN "idUsuario",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "idUser" INTEGER NOT NULL,
ADD CONSTRAINT "DataResposta_pkey" PRIMARY KEY ("idUser", "idCenso");

-- AlterTable
ALTER TABLE "Resultado" DROP COLUMN "idAlternativa",
DROP COLUMN "idSubmissao",
ADD COLUMN     "optionId" INTEGER NOT NULL,
ADD COLUMN     "submissionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Alternativa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataResposta" ADD CONSTRAINT "DataResposta_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
