/*
  Warnings:

  - You are about to drop the column `content` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `company` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workType` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Appled',
ADD COLUMN     "workType" TEXT NOT NULL;
