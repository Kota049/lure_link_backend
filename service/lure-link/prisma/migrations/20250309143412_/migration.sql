/*
  Warnings:

  - Added the required column `depatureLatitude` to the `RecruitmentProjectionUpdater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depatureLongitude` to the `RecruitmentProjectionUpdater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationLatitude` to the `RecruitmentProjectionUpdater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationLongitude` to the `RecruitmentProjectionUpdater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RecruitmentProjectionUpdater` ADD COLUMN `depatureLatitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `depatureLongitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `destinationLatitude` VARCHAR(191) NOT NULL,
    ADD COLUMN `destinationLongitude` VARCHAR(191) NOT NULL;
