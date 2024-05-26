/*
  Warnings:

  - Added the required column `count` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "count" INTEGER NOT NULL;
