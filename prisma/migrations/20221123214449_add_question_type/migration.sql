-- CreateEnum
CREATE TYPE "TipoPergunta" AS ENUM ('UNICA', 'MULTIPLA', 'TEXTO');

-- AlterTable
ALTER TABLE "Pergunta" ADD COLUMN     "tipo" "TipoPergunta" NOT NULL DEFAULT 'UNICA';
