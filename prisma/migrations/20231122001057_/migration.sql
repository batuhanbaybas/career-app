-- AlterTable
ALTER TABLE "JobStatus" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE INDEX "JobStatus_userId_idx" ON "JobStatus"("userId");
