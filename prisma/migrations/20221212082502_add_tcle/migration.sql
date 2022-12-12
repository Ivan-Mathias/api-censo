-- CreateTable
CREATE TABLE "TCLE" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "idCenso" INTEGER NOT NULL,

    CONSTRAINT "TCLE_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TCLE" ADD CONSTRAINT "TCLE_idCenso_fkey" FOREIGN KEY ("idCenso") REFERENCES "Censo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
