/*
  Warnings:

  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Applied';

-- DropTable
DROP TABLE "Status";
