/*
  Warnings:

  - You are about to drop the column `status` on the `Jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "status",
ADD COLUMN     "applyLink" TEXT DEFAULT '',
ADD COLUMN     "salary" TEXT DEFAULT '';

-- DropEnum
DROP TYPE "status";

-- CreateTable
CREATE TABLE "JobStatus" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "JobStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobStatus_jobId_idx" ON "JobStatus"("jobId");
