/*
  Warnings:

  - You are about to drop the column `status` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `statusID` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Made the column `userID` on table `Jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "status",
ADD COLUMN     "statusID" TEXT NOT NULL,
ALTER COLUMN "userID" SET NOT NULL;

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Applied',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Jobs_statusID_idx" ON "Jobs"("statusID");
