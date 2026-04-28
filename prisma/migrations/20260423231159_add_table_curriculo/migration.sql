-- CreateTable
CREATE TABLE "Curriculo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "candidatoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curriculo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Curriculo" ADD CONSTRAINT "Curriculo_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
