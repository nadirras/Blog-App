/*
  Warnings:

  - Added the required column `password` to the `author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `author` ADD COLUMN `isSuspend` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` LONGTEXT NOT NULL;
