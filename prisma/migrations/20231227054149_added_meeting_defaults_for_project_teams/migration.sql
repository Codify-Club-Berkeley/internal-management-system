/*
  Warnings:

  - A unique constraint covering the columns `[projectDefaultId]` on the table `Meeting` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "projectDefaultId" STRING;

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_projectDefaultId_key" ON "Meeting"("projectDefaultId");
