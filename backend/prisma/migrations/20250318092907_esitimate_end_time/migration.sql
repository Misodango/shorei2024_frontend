-- AlterTable
ALTER TABLE `Machine` ADD COLUMN `avgDuration` INTEGER NOT NULL DEFAULT 2400,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL DEFAULT '2021-01-01T00:00:00+00:00',
    ADD COLUMN `estimatedEndTime` DATETIME(3) NOT NULL DEFAULT '2021-01-01T00:00:00+00:00',
    ADD COLUMN `startTime` DATETIME(3) NOT NULL DEFAULT '2021-01-01T00:00:00+00:00',
    ADD COLUMN `usageCount` INTEGER NOT NULL DEFAULT 0;
