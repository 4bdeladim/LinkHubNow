-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_id_fkey";

-- DropIndex
DROP INDEX "Link_accountId_id_key";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
