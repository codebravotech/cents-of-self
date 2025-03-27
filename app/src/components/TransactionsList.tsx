import cx from "classnames";

import { Transaction } from "../types/__generated__/data/graphql";
import TransactionRow from "./TransactionRow";
import TransactionsHeader from "./TransactionsHeader";

export default function TransactionsList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className={cx("flex w-full flex-col items-center gap-2")}>
      <TransactionsHeader />
      {transactions.map((transaction) => (
        <TransactionRow transaction={transaction} />
      ))}
    </div>
  );
}
