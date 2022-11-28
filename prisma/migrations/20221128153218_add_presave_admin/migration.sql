-- CreateTable
CREATE TABLE "PreCadastroAdmin" (
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PreCadastroAdmin_email_key" ON "PreCadastroAdmin"("email");
