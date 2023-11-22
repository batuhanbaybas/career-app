/*
  Warnings:

  - Made the column `userId` on table `JobStatus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JobStatus" ALTER COLUMN "userId" SET NOT NULL;
