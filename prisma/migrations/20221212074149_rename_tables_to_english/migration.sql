/*
  Warnings:

  - You are about to drop the column `texto` on the `Alternativa` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Censo` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Censo` table. All the data in the column will be lost.
  - You are about to drop the column `texto` on the `Pergunta` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Pergunta` table. All the data in the column will be lost.
  - Added the required column `text` to the `Alternativa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Censo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Censo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Pergunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alternativa" DROP COLUMN "texto",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Censo" DROP COLUMN "data",
DROP COLUMN "nome",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "visivel" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Pergunta" DROP COLUMN "texto",
DROP COLUMN "tipo",
ADD COLUMN     "mandatory" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "type" "TipoPergunta" NOT NULL DEFAULT 'UNICA';
