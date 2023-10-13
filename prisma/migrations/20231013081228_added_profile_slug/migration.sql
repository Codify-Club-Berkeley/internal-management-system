/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'EDUCATION';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "slug" STRING NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_slug_key" ON "Profile"("slug");
