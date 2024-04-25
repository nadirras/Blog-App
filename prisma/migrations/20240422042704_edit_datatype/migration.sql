/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `article` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `author_name_key` ON `author`;

-- CreateIndex
CREATE UNIQUE INDEX `article_slug_key` ON `article`(`slug`);
