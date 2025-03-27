import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../queries/transaction";

export const useTransactions = () => {
  const { data: transactionsData, loading: transactionsLoading } =
    useQuery(GET_TRANSACTIONS);

  // Data destructuring
  const transactions = transactionsData?.transactions || [];

  return { transactions, transactionsLoading };
};
