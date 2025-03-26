-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,
    "transactionDate" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
