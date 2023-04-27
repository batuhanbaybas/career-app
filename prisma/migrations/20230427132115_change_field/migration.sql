/*
  Warnings:

  - You are about to drop the column `authorId` on the `Jobs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_authorId_fkey";

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "authorId",
ADD COLUMN     "userID" TEXT;

-- CreateIndex
CREATE INDEX "Jobs_userID_idx" ON "Jobs"("userID");
