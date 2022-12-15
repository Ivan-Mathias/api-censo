-- DropForeignKey
ALTER TABLE "Pergunta" DROP CONSTRAINT "Pergunta_idCenso_fkey";

-- DropForeignKey
ALTER TABLE "Resultado" DROP CONSTRAINT "Resultado_optionId_fkey";

-- AddForeignKey
ALTER TABLE "Pergunta" ADD CONSTRAINT "Pergunta_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Alternativa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
