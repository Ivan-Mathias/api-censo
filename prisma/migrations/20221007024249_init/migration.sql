-- CreateTable
CREATE TABLE "Administrador" (
    "id" SERIAL NOT NULL,
    "NUSP" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "NUSP" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Censo" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "visivel" BOOLEAN NOT NULL,

    CONSTRAINT "Censo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pergunta" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "idCenso" INTEGER NOT NULL,

    CONSTRAINT "Pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alternativa" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "idPergunta" INTEGER NOT NULL,

    CONSTRAINT "Alternativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resultado" (
    "id" SERIAL NOT NULL,
    "resposta" TEXT,
    "idAlternativa" INTEGER NOT NULL,

    CONSTRAINT "Resultado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataResposta" (
    "idAluno" INTEGER NOT NULL,
    "idCenso" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataResposta_pkey" PRIMARY KEY ("idAluno","idCenso")
);

-- CreateTable
CREATE TABLE "AdministadorCenso" (
    "idAdministrador" INTEGER NOT NULL,
    "idCenso" INTEGER NOT NULL,

    CONSTRAINT "AdministadorCenso_pkey" PRIMARY KEY ("idAdministrador","idCenso")
);

-- CreateTable
CREATE TABLE "Rascunho" (
    "id" SERIAL NOT NULL,
    "respostas" TEXT NOT NULL,
    "idCenso" INTEGER NOT NULL,
    "idAluno" INTEGER NOT NULL,

    CONSTRAINT "Rascunho_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_NUSP_key" ON "Administrador"("NUSP");

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "Administrador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_NUSP_key" ON "Aluno"("NUSP");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- AddForeignKey
ALTER TABLE "Pergunta" ADD CONSTRAINT "Pergunta_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alternativa" ADD CONSTRAINT "Alternativa_idPergunta_fkey" FOREIGN KEY ("idPergunta") REFERENCES "Pergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_idAlternativa_fkey" FOREIGN KEY ("idAlternativa") REFERENCES "Alternativa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataResposta" ADD CONSTRAINT "DataResposta_idAluno_fkey" FOREIGN KEY ("idAluno") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataResposta" ADD CONSTRAINT "DataResposta_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdministadorCenso" ADD CONSTRAINT "AdministadorCenso_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES "Administrador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdministadorCenso" ADD CONSTRAINT "AdministadorCenso_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rascunho" ADD CONSTRAINT "Rascunho_idAluno_fkey" FOREIGN KEY ("idAluno") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rascunho" ADD CONSTRAINT "Rascunho_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
