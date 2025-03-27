import cx from "classnames";

import "./App.css";
import Button from "./components/Button";
import CreateUpdateForm from "./components/CreateUpdateForm";
import DeleteForm from "./components/DeleteForm";
import Modal from "./components/Modal";
import TransactionsList from "./components/TransactionsList";
import { useAccounts } from "./hooks/account";
import { useTransactions } from "./hooks/transaction";
import { useSystemStore } from "./state/system";
import heardLogo from "/heard.svg";

function App() {
  const { appMode, setAppMode, transactionId } = useSystemStore();
  // GQL Queries
  const { transactions, transactionsLoading } = useTransactions();
  // @ts-expect-error I'm intentionally querying accounts as soon as application is loaded here, so that it's available right away to the create/update form if we open that (already loaded in apollo memory cache)
  // eslint-disable-next-line
  const { accounts } = useAccounts();

  return (
    <div className="flex h-full min-h-[100vh] w-screen flex-col bg-[#0C4A35] pb-10">
      {!transactionsLoading && (
        <>
          <div className="m-5">
            <img src={heardLogo} alt="Heard logo" />
          </div>
          <div className="flex w-full flex-col items-center gap-2 px-10">
            <Button
              className={cx(transactions?.length > 0 && "lg:self-end")}
              onClick={() => {
                setAppMode("create_transaction");
              }}
            >
              Create A New Transaction
            </Button>

            {transactions?.length > 0 && (
              <TransactionsList transactions={transactions} />
            )}
          </div>
        </>
      )}

      {["create_transaction", "update_transaction"].indexOf(appMode) !== -1 && (
        <Modal>
          <CreateUpdateForm />
        </Modal>
      )}

      {appMode === "delete_transaction" && transactionId && (
        <Modal>
          <DeleteForm />
        </Modal>
      )}
    </div>
  );
}

export default App;
