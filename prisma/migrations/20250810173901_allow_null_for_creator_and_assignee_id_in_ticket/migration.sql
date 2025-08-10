-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_assigneeId_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_creatorId_fkey`;

-- DropIndex
DROP INDEX `Ticket_assigneeId_fkey` ON `ticket`;

-- DropIndex
DROP INDEX `Ticket_creatorId_fkey` ON `ticket`;

-- AlterTable
ALTER TABLE `ticket` MODIFY `creatorId` INTEGER NULL,
    MODIFY `assigneeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_assigneeId_fkey` FOREIGN KEY (`assigneeId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
