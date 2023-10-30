-- CreateTable
CREATE TABLE "Meeting" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "projectId" STRING,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Present" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_Absent" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "_Excused" (
    "A" STRING NOT NULL,
    "B" STRING NOT NULL
);

-- CreateIndex
CREATE INDEX "Meeting_projectId_idx" ON "Meeting"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "_Present_AB_unique" ON "_Present"("A", "B");

-- CreateIndex
CREATE INDEX "_Present_B_index" ON "_Present"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Absent_AB_unique" ON "_Absent"("A", "B");

-- CreateIndex
CREATE INDEX "_Absent_B_index" ON "_Absent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Excused_AB_unique" ON "_Excused"("A", "B");

-- CreateIndex
CREATE INDEX "_Excused_B_index" ON "_Excused"("B");
