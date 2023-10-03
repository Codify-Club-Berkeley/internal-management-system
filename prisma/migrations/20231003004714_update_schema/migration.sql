/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - The `dietaryRestrId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'APPLICANT';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";
ALTER TABLE "User" ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[];
ALTER TABLE "User" DROP COLUMN "dietaryRestrId";
ALTER TABLE "User" ADD COLUMN     "dietaryRestrId" STRING[];
