/*
  Warnings:

  - Made the column `status` on table `Jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('Applied', 'Interviewing', 'Offer', 'Rejecte');

-- AlterTable
ALTER TABLE "Jobs" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DEFAULT '';
