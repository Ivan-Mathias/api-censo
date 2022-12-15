/*
  Warnings:

  - The values [TEXTO] on the enum `TipoPergunta` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Rascunho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submissao` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipoPergunta_new" AS ENUM ('UNICA', 'MULTIPLA');
ALTER TABLE "Pergunta" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Pergunta" ALTER COLUMN "type" TYPE "TipoPergunta_new" USING ("type"::text::"TipoPergunta_new");
ALTER TYPE "TipoPergunta" RENAME TO "TipoPergunta_old";
ALTER TYPE "TipoPergunta_new" RENAME TO "TipoPergunta";
DROP TYPE "TipoPergunta_old";
ALTER TABLE "Pergunta" ALTER COLUMN "type" SET DEFAULT 'UNICA';
COMMIT;

-- DropForeignKey
ALTER TABLE "Rascunho" DROP CONSTRAINT "Rascunho_idCenso_fkey";

-- DropForeignKey
ALTER TABLE "Rascunho" DROP CONSTRAINT "Rascunho_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Submissao" DROP CONSTRAINT "Submissao_idCenso_fkey";

-- DropForeignKey
ALTER TABLE "Submissao" DROP CONSTRAINT "Submissao_idUsuario_fkey";

-- DropTable
DROP TABLE "Rascunho";

-- DropTable
DROP TABLE "Submissao";
