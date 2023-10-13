/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" STRING;
ALTER TABLE "User" ADD COLUMN     "dietaryRestrictions" "DietaryRestriction"[];
ALTER TABLE "User" ADD COLUMN     "githubUsername" STRING;
ALTER TABLE "User" ADD COLUMN     "graduationYear" STRING;
ALTER TABLE "User" ADD COLUMN     "joinedYear" STRING;
ALTER TABLE "User" ADD COLUMN     "linkedInURL" STRING;
ALTER TABLE "User" ADD COLUMN     "phoneNum" STRING;

-- DropTable
DROP TABLE "Profile";
