/*
  Warnings:

  - You are about to drop the `PreCadastroAdmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "googleId" DROP NOT NULL,
ALTER COLUMN "nome" DROP NOT NULL;

-- DropTable
DROP TABLE "PreCadastroAdmin";
