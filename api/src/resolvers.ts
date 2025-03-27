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

const Query: QueryResolvers = {
  // Get list of all transactions
  transactions: async (_, input, context) => [],
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
