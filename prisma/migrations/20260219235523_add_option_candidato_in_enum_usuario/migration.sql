-- AlterEnum
ALTER TYPE "TipoUsuario" ADD VALUE 'CANDIDATO';

-- AlterTable
ALTER TABLE "Vagas" ALTER COLUMN "status" DROP DEFAULT;
