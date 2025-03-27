import { ApolloError, useMutation } from "@apollo/client";
import { omitDeep } from "@apollo/client/utilities";
import cx from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

import { useAccounts } from "../hooks/account";
import { useTransactions } from "../hooks/transaction";
import { client } from "../main";
import { ADD_TRANSACTION, UPDATE_TRANSACTION } from "../queries/transaction";
import { useSystemStore } from "../state/system";
import { Account, Transaction } from "../types/__generated__/data/graphql";
import Button from "./Button";

type AccountSelectOption = { value: string; label: string };
type FormData = {
  id?: string;
  title: string;
  description: string;
  amount: string;
  fromAccount: string;
  toAccount: string;
};

export default function CreateUpdateForm() {
  // State
  const { transactionId, appMode, setAppMode, setTransactionId } =
    useSystemStore();
  const handleClose = () => {
    setTransactionId(null);
    setAppMode("list_transactions");
  };

  // Queries
  const { transactions, transactionsLoading } = useTransactions();
  const { accounts, accountsLoading } = useAccounts();
  const transaction = transactionId
    ? transactions.find(
        (transaction: Transaction) => transaction.id === transactionId,
      )
    : undefined;

  // Mutations
  const [upsertTransaction] = useMutation(
    appMode === "update_transaction" ? UPDATE_TRANSACTION : ADD_TRANSACTION,
    {
      onCompleted: async () => {
        handleClose();
        await client.refetchQueries({
          include: "active",
        });
      },
      onError: () => {
        alert(
          `Error ${appMode === "update_transaction" ? "updating" : "creating"} the transaction, please try again later.`,
        );
      },
    },
  );

  // Component hooks
  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues:
      appMode === "update_transaction" && transaction ? transaction : {},
  });

  // Handle the form submission
  const submit = async (data: FormData) => {
    const id = data.id;

    // Explicity grab the fields here so that things like "__typename" and "transactionDate" can't get submitted to the update function
    // For a more robust way to do this, could use lodash.pick (didn't want to include another dep just for this one case)
    const transaction = {
      title: data.title,
      description: data.description,
      amount: parseFloat(data.amount || "0"),
      toAccount: data.toAccount,
      fromAccount: data.fromAccount,
    };

    // Update the existing transaction
    if (appMode === "update_transaction") {
      await upsertTransaction({
        variables: {
          id,
          transaction,
        },
      });
    } else if (appMode === "create_transaction") {
      // Create a new transaction
      await upsertTransaction({
        variables: {
          transaction,
        },
      });
    }
  };

  // Format the new account user input by replacing all non-whitespace character with underscores and converting to lowercase
  const handleCreatableInputChange = (newValue: string) => {
    const formattedValue = newValue.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
    return formattedValue;
  };

  const accountOptions = accounts.map((account: Account) => ({
    value: account?.id,
    label: account?.id,
  }));
  const labelClass = "text-sm";
  const inputClass = "border border-black rounded-md px-2 py-1 w-full";

  if (transactionsLoading || accountsLoading) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      {appMode === "update_transaction" && transactionId && (
        <div className="bold text-lg">
          Transaction ID:&nbsp;
          <input {...register("id")} value={transactionId} disabled={true} />
        </div>
      )}
      <div>
        <div className={labelClass}>Name</div>
        <input
          className={inputClass}
          {...register("title")}
          placeholder="..."
          required
        />
      </div>
      <div>
        <div className={labelClass}>Description</div>
        <input
          className={inputClass}
          {...register("description")}
          placeholder="..."
          required
        />
      </div>
      <div>
        <div className={labelClass}>Amount (USD)</div>
        <input
          className={inputClass}
          {...register("amount")}
          placeholder="..."
          type="number"
          step=".01"
          required
        />
      </div>
      <div>
        <div className={labelClass}>
          From Account{" "}
          <div>
            <i>
              {accountOptions?.length > 0
                ? "(Select existing account from list or type to create a new account)"
                : "Type to create a new account"}
            </i>
          </div>
        </div>
        <CreatableSelect
          options={accountOptions}
          defaultValue={accountOptions.find(
            (option: SingleValue<AccountSelectOption>) =>
              transaction && option?.value === transaction.fromAccount,
          )}
          onInputChange={handleCreatableInputChange}
          onChange={(option: SingleValue<AccountSelectOption>) =>
            setValue("fromAccount", (option?.value || "").toString())
          }
        />
      </div>
      <div>
        <div className={labelClass}>
          To Account
          <div>
            <i>
              {accountOptions?.length > 0
                ? "(Select existing account from list or type to create a new account)"
                : "Type to create a new account"}
            </i>
          </div>
        </div>

        <CreatableSelect
          options={accountOptions}
          onInputChange={handleCreatableInputChange}
          defaultValue={accountOptions.find(
            (option: SingleValue<AccountSelectOption>) =>
              transaction && option?.value === transaction.toAccount,
          )}
          onChange={(option: SingleValue<AccountSelectOption>) =>
            setValue("toAccount", (option?.value || "").toString())
          }
        />
      </div>

      <div className="flex w-full justify-center gap-2">
        <Button className="self-center" onClick={handleClose}>
          Cancel
        </Button>
        <Button className="self-center">
          <input type="submit"></input>
        </Button>
      </div>
    </form>
  );
}
