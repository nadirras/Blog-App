/*
  Warnings:

  - You are about to drop the column `isSuspend` on the `author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `author` DROP COLUMN `isSuspend`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `loginAttempt` INTEGER NOT NULL DEFAULT 0;
