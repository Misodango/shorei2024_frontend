/*
  Warnings:

  - Made the column `startTime` on table `Machine` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Machine` MODIFY `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
