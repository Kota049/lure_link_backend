-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `streamId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `payload` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ApplyingProjectionUpdater` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applyingId` VARCHAR(191) NOT NULL,
    `recruitmentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `firstPickUpOptionPrefecture` VARCHAR(191) NOT NULL,
    `firstPickUpOptionAddress` VARCHAR(191) NOT NULL,
    `firstPickUpOptionDescription` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `secondPickUpOptionPrefecture` VARCHAR(191) NOT NULL,
    `secondPickUpOptionAddress` VARCHAR(191) NOT NULL,
    `secondPickUpOptionDescription` VARCHAR(191) NOT NULL,
    `thirdPickUpOptionPrefecture` VARCHAR(191) NOT NULL,
    `thirdPickUpOptionAddress` VARCHAR(191) NOT NULL,
    `thirdPickUpOptionDescription` VARCHAR(191) NOT NULL,
    `determinePickUpOption` INTEGER NULL,
    `determinePickUpDateTime` DATETIME(3) NULL,

    UNIQUE INDEX `ApplyingProjectionUpdater_applyingId_key`(`applyingId`),
    INDEX `ApplyingProjectionUpdater_recruitmentId_idx`(`recruitmentId`),
    UNIQUE INDEX `ApplyingProjectionUpdater_recruitmentId_userId_key`(`recruitmentId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecruitmentProjectionUpdater` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recruitmentId` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `destinationPrefecture` VARCHAR(191) NOT NULL,
    `destinationAddress` VARCHAR(191) NOT NULL,
    `destinationDescription` VARCHAR(191) NOT NULL,
    `depaturePrefecture` VARCHAR(191) NOT NULL,
    `depatureAddress` VARCHAR(191) NOT NULL,
    `depatureDescription` VARCHAR(191) NOT NULL,
    `startDateTime` DATETIME(3) NOT NULL,
    `endDateTime` DATETIME(3) NOT NULL,
    `maxParticipant` INTEGER NOT NULL,
    `budget` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `applyingEndDateTime` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RecruitmentProjectionUpdater_recruitmentId_key`(`recruitmentId`),
    INDEX `RecruitmentProjectionUpdater_startDateTime_idx`(`startDateTime` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ApplyingProjectionUpdater` ADD CONSTRAINT `ApplyingProjectionUpdater_recruitmentId_fkey` FOREIGN KEY (`recruitmentId`) REFERENCES `RecruitmentProjectionUpdater`(`recruitmentId`) ON DELETE RESTRICT ON UPDATE CASCADE;
