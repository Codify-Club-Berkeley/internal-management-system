-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "location" STRING;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "active" BOOL NOT NULL DEFAULT true;
ALTER TABLE "Project" ADD COLUMN     "clientEmail" STRING;
ALTER TABLE "Project" ADD COLUMN     "clientName" STRING;
ALTER TABLE "Project" ADD COLUMN     "clientPhoneNum" STRING;
ALTER TABLE "Project" ADD COLUMN     "semesters" STRING[];
ALTER TABLE "Project" ADD COLUMN     "techStack" STRING[];

-- CreateTable
CREATE TABLE "_Past Project Member" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Past Project Member_AB_unique" ON "_Past Project Member"("A", "B");

-- CreateIndex
CREATE INDEX "_Past Project Member_B_index" ON "_Past Project Member"("B");
