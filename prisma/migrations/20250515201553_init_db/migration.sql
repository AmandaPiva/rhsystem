-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMIN', 'USUARIO');

-- CreateEnum
CREATE TYPE "EtapasProcessoSeletivo" AS ENUM ('TRIAGEM', 'ENTREVISTA', 'TESTES', 'AVALIACAO', 'CONTRATACAO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "tipo" "TipoUsuario" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "cpf" TEXT,
    "rg" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "status" BOOLEAN DEFAULT true,
    "tipo" "TipoUsuario" NOT NULL,
    "setorId" TEXT,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setor" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "descricao" TEXT,
    "status" BOOLEAN DEFAULT true,

    CONSTRAINT "Setor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vagas" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "descricao" TEXT,
    "status" BOOLEAN DEFAULT true,
    "setorId" TEXT,
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataFinalizacao" TIMESTAMP(3),
    "dataEntradaDoCandidato" TIMESTAMP(3),

    CONSTRAINT "Vagas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidatos" (
    "id" TEXT NOT NULL,
    "nome" TEXT,
    "cpf" TEXT,
    "rg" TEXT,
    "celular" TEXT,
    "email" TEXT,
    "status" BOOLEAN DEFAULT true,
    "vagaId" TEXT,
    "etapa" "EtapasProcessoSeletivo",

    CONSTRAINT "Candidatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ferias" (
    "id" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3),
    "dataFim" TIMESTAMP(3),
    "status" BOOLEAN DEFAULT true,
    "funcionarioId" TEXT,

    CONSTRAINT "Ferias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_cpf_key" ON "Funcionario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_rg_key" ON "Funcionario"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Funcionario_email_key" ON "Funcionario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidatos_cpf_key" ON "Candidatos"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Candidatos_rg_key" ON "Candidatos"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Candidatos_email_key" ON "Candidatos"("email");

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vagas" ADD CONSTRAINT "Vagas_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "Setor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidatos" ADD CONSTRAINT "Candidatos_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vagas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ferias" ADD CONSTRAINT "Ferias_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
