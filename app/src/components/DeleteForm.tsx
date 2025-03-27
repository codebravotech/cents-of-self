import { useMutation } from "@apollo/client";
import cx from "classnames";

import { useTransactions } from "../hooks/transaction";
import { client } from "../main";
import { DELETE_TRANSACTION } from "../queries/transaction";
import { useSystemStore } from "../state/system";
import { Transaction } from "../types/__generated__/data/graphql";
import Button from "./Button";

export default function DeleteForm() {
  const { transactionId, setAppMode, setTransactionId } = useSystemStore();
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: async () => {
      handleClose();
      await client.refetchQueries({
        include: "active",
      });
    },
    onError: () => {
      alert("Error creating/updating the transaction, please try again later.");
    },
  });
  const { transactions } = useTransactions();
  const transaction = transactionId
    ? transactions.find(
        (transaction: Transaction) => transaction.id === transactionId,
      )
    : undefined;

  const handleClose = () => {
    setTransactionId(null);
    setAppMode("list_transactions");
  };

  const handleDelete = () => {
    deleteTransaction({ variables: { id: transactionId } });
  };

  return (
    <div className="mb-4 flex h-full min-h-32 w-full flex-col items-center justify-between text-lg">
      <div>
        Are you sure you want to delete transaction "{transaction.title}"? &nbsp;
        <i>(transaction ID: {transactionId})</i>
      </div>
      <div className="flex w-full justify-center gap-2">
        <Button className="self-center" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="self-center" onClick={handleDelete}>
          Confirm Deletion
        </Button>
      </div>
    </div>
  );
}
