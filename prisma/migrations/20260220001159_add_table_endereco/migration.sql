-- AlterTable
ALTER TABLE "Candidatos" ADD COLUMN     "enderecoId" TEXT;

-- AddForeignKey
ALTER TABLE "Candidatos" ADD CONSTRAINT "Candidatos_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "Endereco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
