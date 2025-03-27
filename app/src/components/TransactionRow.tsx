import cx from "classnames";

import { useSystemStore } from "../state/system";
import { Transaction } from "../types/__generated__/data/graphql";
import Icon from "./Icon";
import deleteIcon from "/icons/delete.svg";
import updateIcon from "/icons/update.svg";

export default function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { id, title, description, toAccount, fromAccount, amount } =
    transaction;
  const { setAppMode, setTransactionId } = useSystemStore();

  return (
    <div
      className={cx(
        "flex w-full grid-cols-7 flex-col items-center gap-2 rounded-lg bg-[#F2F2F2] px-4 py-2 lg:grid",
      )}
    >
      <div>{title}</div>
      <div className="col-span-2">{description}</div>
      <div>{fromAccount}</div>
      <div>{toAccount}</div>
      <div>{amount}</div>

      <div className="flex gap-10">
        <Icon
          src={updateIcon}
          alt="Update Transaction"
          onClick={() => {
            setTransactionId(id || null);
            setAppMode("update_transaction");
          }}
        />
        <Icon
          src={deleteIcon}
          alt="Delete Transaction"
          onClick={() => {
            setTransactionId(id || null);
            setAppMode("delete_transaction");
          }}
        />
      </div>
    </div>
  );
}
