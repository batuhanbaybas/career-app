/*
  Warnings:

  - You are about to drop the column `statusID` on the `Jobs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Jobs_statusID_idx";

-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "statusID";
