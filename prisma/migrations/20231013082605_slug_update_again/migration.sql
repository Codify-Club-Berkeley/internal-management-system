/*
  Warnings:

  - You are about to drop the column `slug` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `dietaryRestrId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DietaryRestriction" AS ENUM ('VEGAN', 'VEGETARIAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'NUT_FREE', 'OTHER');

-- DropIndex
DROP INDEX "Profile_slug_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "slug";
ALTER TABLE "Profile" ADD COLUMN     "dietaryRestrictions" "DietaryRestriction"[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dietaryRestrId";
ALTER TABLE "User" ADD COLUMN     "slug" STRING;
