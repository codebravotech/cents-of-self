import cx from "classnames";

import "./App.css";
import Button from "./components/Button";
import Modal from "./components/Modal";
import TransactionsList from "./components/TransactionsList";
import { useTransactions } from "./hooks/transaction";
import { useSystemStore } from "./state/system";
import heardLogo from "/heard.svg";

function App() {
  const { appMode, setAppMode } = useSystemStore();
  // GQL Queries
  const { transactions, transactionsLoading } = useTransactions();

  return (
    <div className="flex h-screen w-screen flex-col overflow-y-auto bg-[#267365]">
      {!transactionsLoading && (
        <>
          <div className="m-5">
            <img src={heardLogo} alt="Heard logo" />
          </div>
          <div className="flex w-full flex-col items-center gap-2 px-10">
            <Button
              className={cx(transactions?.length > 0 && "self-end")}
              onClick={() => {
                setAppMode("create_transaction");
              }}
            >
              Create A New Transaction
            </Button>

            <TransactionsList transactions={transactions} />
            <>{appMode}</>
          </div>
        </>
      )}

      {appMode === "create_transaction" && <Modal>CREATE TRANSACTION</Modal>}
      {appMode === "update_transaction" && <Modal>UPDATE TRANSACTION</Modal>}
      {appMode === "delete_transaction" && <Modal>DELETE TRANSACTION</Modal>}
    </div>
  );
}

export default App;
