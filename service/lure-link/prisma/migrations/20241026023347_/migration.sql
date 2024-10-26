/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `updatedBy` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Event` table. All the data in the column will be lost.
  - The `id` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "updatedBy",
DROP COLUMN "version",
ADD COLUMN     "type" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ApplyingProjectionUpdater" (
    "id" SERIAL NOT NULL,
    "applyingId" TEXT NOT NULL,
    "recruitmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstPickUpOptionPrefecture" TEXT NOT NULL,
    "firstPickUpOptionAddress" TEXT NOT NULL,
    "firstPickUpOptionDescription" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "secondPickUpOptionPrefecture" TEXT NOT NULL,
    "secondPickUpOptionAddress" TEXT NOT NULL,
    "secondPickUpOptionDescription" TEXT NOT NULL,
    "thirdPickUpOptionPrefecture" TEXT NOT NULL,
    "thirdPickUpOptionAddress" TEXT NOT NULL,
    "thirdPickUpOptionDescription" TEXT NOT NULL,
    "determinePickUpOption" INTEGER,
    "determinePickUpDateTime" TIMESTAMP(3),

    CONSTRAINT "ApplyingProjectionUpdater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecruitmentProjectionUpdater" (
    "id" SERIAL NOT NULL,
    "recruitmentId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "destinationPrefecture" TEXT NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "destinationDescription" TEXT NOT NULL,
    "depaturePrefecture" TEXT NOT NULL,
    "depatureAddress" TEXT NOT NULL,
    "depatureDescription" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "maxParticipant" INTEGER NOT NULL,
    "budget" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "applyingEndDateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecruitmentProjectionUpdater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplyingProjectionUpdater_applyingId_key" ON "ApplyingProjectionUpdater"("applyingId");

-- CreateIndex
CREATE INDEX "ApplyingProjectionUpdater_recruitmentId_idx" ON "ApplyingProjectionUpdater"("recruitmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplyingProjectionUpdater_recruitmentId_userId_key" ON "ApplyingProjectionUpdater"("recruitmentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "RecruitmentProjectionUpdater_recruitmentId_key" ON "RecruitmentProjectionUpdater"("recruitmentId");

-- AddForeignKey
ALTER TABLE "ApplyingProjectionUpdater" ADD CONSTRAINT "ApplyingProjectionUpdater_recruitmentId_fkey" FOREIGN KEY ("recruitmentId") REFERENCES "RecruitmentProjectionUpdater"("recruitmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
