-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `deleted` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deleted` DATETIME(3) NULL;
