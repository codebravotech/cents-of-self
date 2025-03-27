import { Transaction } from "../../generated/prisma";
import {
  AddTransactionInput,
  UpdateTransactionInput,
} from "../types/__generated__/data/graphql";

// Build a mutation payload that will create/connect the Account record in the case that it does not exist, and connect it to the transaction being added/updated if it already does exist
export const buildTransactionMutation = (
  transaction: AddTransactionInput | UpdateTransactionInput
) => {
  const fromAccountId = transaction?.fromAccount;
  const toAccountId = transaction?.toAccount;
  const fromAccount = { id: fromAccountId };
  const toAccount = { id: toAccountId };

  return {
    ...transaction,
    fromAccount: fromAccountId
      ? {
          connectOrCreate: {
            // Note that the create and the where are only the same var because the table record only has the "id" field, else we would need to use only the id in the where and create the entire objec
            where: fromAccount,
            create: fromAccount,
          },
        }
      : undefined,
    toAccount: toAccountId
      ? {
          connectOrCreate: {
            // Note that the create and the where are only the same var because the table record only has the "id" field, else we would need to use only the account id in the where object and create the entire account object in the create object
            where: toAccount,
            create: toAccount,
          },
        }
      : undefined,
  };
};

export const normalizeTransactionResult = (transaction: Transaction) => {
  return {
    ...transaction,
    toAccount: transaction?.toAccountId,
    fromAccount: transaction?.fromAccountId,
  };
};
