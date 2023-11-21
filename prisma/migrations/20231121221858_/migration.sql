/*
  Warnings:

  - You are about to drop the column `jobId` on the `JobStatus` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "JobStatus_jobId_idx";

-- AlterTable
ALTER TABLE "JobStatus" DROP COLUMN "jobId";

-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "jobStatusId" TEXT;

-- CreateIndex
CREATE INDEX "Jobs_jobStatusId_idx" ON "Jobs"("jobStatusId");
