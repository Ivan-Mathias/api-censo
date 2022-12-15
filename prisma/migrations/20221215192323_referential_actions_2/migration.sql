-- DropForeignKey
ALTER TABLE "Alternativa" DROP CONSTRAINT "Alternativa_questionId_fkey";

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Pergunta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
