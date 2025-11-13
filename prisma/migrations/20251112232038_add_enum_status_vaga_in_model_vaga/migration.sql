/*
  Warnings:

  - The `status` column on the `Vagas` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusVaga" AS ENUM ('ABERTA', 'FECHADA', 'PREENCHIDA');

-- AlterTable
ALTER TABLE "Vagas" DROP COLUMN "status",
ADD COLUMN     "status" "StatusVaga" DEFAULT 'ABERTA';
