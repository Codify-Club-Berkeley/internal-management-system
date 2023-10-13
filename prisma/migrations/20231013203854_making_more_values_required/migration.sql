/*
  Warnings:

  - You are about to drop the column `linkedInURL` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "linkedInURL";
ALTER TABLE "User" ADD COLUMN     "linkedInUrl" STRING;
ALTER TABLE "User" ALTER COLUMN "slug" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
