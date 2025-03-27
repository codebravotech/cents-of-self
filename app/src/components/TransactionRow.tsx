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
  const { title, description, toAccount, fromAccount, amount } = transaction;
  const { appMode, setAppMode } = useSystemStore();

  return (
    <div
      className={cx(
        "grid w-full grid-cols-7 gap-2 rounded-lg bg-[#F2F2F2] px-4 py-2",
      )}
    >
      <div>{title}</div>
      <div className="col-span-2">{description}</div>
      <div>{toAccount}</div>
      <div>{fromAccount}</div>
      <div>{amount}</div>

      <div className="flex gap-10">
        <Icon
          src={updateIcon}
          alt="Update Transaction"
          onClick={() => {
            setAppMode("update_transaction");
          }}
        />
        <Icon
          src={deleteIcon}
          alt="Delete Transaction"
          onClick={() => {
            setAppMode("delete_transaction");
          }}
        />
      </div>
    </div>
  );
}
