-- CreateTable
CREATE TABLE "Submissao" (
    "id" SERIAL NOT NULL,
    "idCenso" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "Submissao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Submissao_idCenso_idUsuario_key" ON "Submissao"("idCenso", "idUsuario");

-- AddForeignKey
ALTER TABLE "Submissao" ADD CONSTRAINT "Submissao_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissao" ADD CONSTRAINT "Submissao_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
