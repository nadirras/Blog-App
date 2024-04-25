/*
  Warnings:

  - The values [PUBLISH] on the enum `article_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `article` MODIFY `status` ENUM('PUBLISHED', 'ARCHIVE') NOT NULL;
