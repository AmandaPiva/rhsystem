-- AlterTable
ALTER TABLE "Candidatos" ADD COLUMN     "dataNascimento" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "rua" TEXT,
    "numero" INTEGER,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "cep" INTEGER,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);
