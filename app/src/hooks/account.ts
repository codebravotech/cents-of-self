import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS } from "../queries/account";

export const useAccounts = () => {
  const { data: accountsData, loading: accountsLoading } =
    useQuery(GET_ACCOUNTS);
  const accounts = accountsData?.accounts || [];

  return { accounts, accountsLoading };
};
