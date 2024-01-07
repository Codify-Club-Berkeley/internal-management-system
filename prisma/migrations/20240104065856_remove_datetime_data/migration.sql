/*
  Warnings:

  - You are about to drop the column `end` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Meeting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "end";
ALTER TABLE "Meeting" DROP COLUMN "start";
