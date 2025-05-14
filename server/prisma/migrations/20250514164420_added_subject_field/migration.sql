/*
  Warnings:

  - You are about to drop the column `type` on the `Expenses` table. All the data in the column will be lost.
  - Added the required column `subject` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "type",
ADD COLUMN     "subject" TEXT NOT NULL;

-- DropEnum
DROP TYPE "TransactionType";
