-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dietaryRestrictions" STRING;

-- DropEnum
DROP TYPE "DietaryRestriction";
