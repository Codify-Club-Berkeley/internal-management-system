/*
  Warnings:

  - Made the column `location` on table `Meeting` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientEmail` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientName` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientPhoneNum` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `githubUsername` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `graduationYear` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `joinedYear` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNum` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkedInUrl` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `major` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pronouns` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dietaryRestrictions` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthday` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Meeting" ALTER COLUMN "location" SET NOT NULL;
ALTER TABLE "Meeting" ALTER COLUMN "location" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "description" SET DEFAULT '';
ALTER TABLE "Project" ALTER COLUMN "clientEmail" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "clientEmail" SET DEFAULT '';
ALTER TABLE "Project" ALTER COLUMN "clientName" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "clientName" SET DEFAULT '';
ALTER TABLE "Project" ALTER COLUMN "clientPhoneNum" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "clientPhoneNum" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "firstName" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "lastName" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "lastName" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "bio" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "bio" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "githubUsername" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "githubUsername" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "graduationYear" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "graduationYear" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "joinedYear" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "joinedYear" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "phoneNum" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "phoneNum" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "linkedInUrl" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "linkedInUrl" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "major" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "major" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "pronouns" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "pronouns" SET DEFAULT '';
ALTER TABLE "User" ALTER COLUMN "dietaryRestrictions" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "dietaryRestrictions" SET DEFAULT 'None';
ALTER TABLE "User" ALTER COLUMN "birthday" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "birthday" SET DEFAULT '';
