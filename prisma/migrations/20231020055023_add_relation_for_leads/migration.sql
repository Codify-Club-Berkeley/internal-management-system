/*
  Warnings:

  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "_ProjectToUser";

-- CreateTable
CREATE TABLE "_Project Member" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_Project Lead" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Project Member_AB_unique" ON "_Project Member"("A", "B");

-- CreateIndex
CREATE INDEX "_Project Member_B_index" ON "_Project Member"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Project Lead_AB_unique" ON "_Project Lead"("A", "B");

-- CreateIndex
CREATE INDEX "_Project Lead_B_index" ON "_Project Lead"("B");
