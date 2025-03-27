import { GraphQLDateTime } from "graphql-iso-date";
import {
  AddTransactionInput,
  MutationResolvers,
  QueryResolvers,
  UpdateTransactionInput,
} from "./__generated__/graphql";
import {
  buildTransactionMutation,
  normalizeTransactionResult,
} from "./utils/transaction";
import { Transaction } from "../generated/prisma";

const Query: QueryResolvers = {
  // Get a list of all accounts ordered by id ascending (restrict account information to just id)
  accounts: async (_, input, context) => {
    const { prisma } = context;
    const results = await prisma.account.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
      },
    });
    return results;
  },
  // Get a list of all transactions ordered by id ascending
  transactions: async (_, input, context) => {
    const { prisma } = context;

    const results = await prisma.transaction.findMany({
      orderBy: { id: "asc" },
    });
    return results.map((result: Transaction) =>
      normalizeTransactionResult(result)
    );
  },
};

const Mutation: MutationResolvers = {
  // Add a single transaction
  addTransaction: async (_, input, context) => {
    const transaction = input.transaction as AddTransactionInput;
    const { prisma } = context;
    const result = await prisma.transaction.create({
      data: {
        ...buildTransactionMutation(transaction),
        transactionDate: new Date().toISOString(),
      },
    });

    return normalizeTransactionResult(result);
  },

  // Update a single transaction by id
  updateTransaction: async (_, input, context) => {
    const transaction = input.transaction as UpdateTransactionInput;
    const { prisma } = context;

    const result = await prisma.transaction.update({
      where: {
        id: input?.id,
      },
      data: buildTransactionMutation(transaction),
    });

    return normalizeTransactionResult(result);
  },

  // Delete a single transaction by id
  deleteTransaction: async (_, input, context) => {
    const { id } = input;
    const { prisma } = context;

    const result = await prisma.transaction.delete({
      where: {
        id,
      },
    });

    return result.id;
  },
};

export default {
  DateTime: GraphQLDateTime,
  Query,
  Mutation,
};
