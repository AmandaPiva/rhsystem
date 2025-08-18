-- CreateEnum
CREATE TYPE "EstadoCivil" AS ENUM ('SOLTEIRO', 'CASADO');

-- AlterTable
ALTER TABLE "Funcionario" ADD COLUMN     "dataNascimento" TIMESTAMP(3),
ADD COLUMN     "estadoCivil" "EstadoCivil";
