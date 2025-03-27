import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { ReactNode } from "react";

import { useSystemStore } from "../state/system";

export default function Modal({ children }: { children: ReactNode }) {
  const { appMode, setAppMode, setTransactionId } = useSystemStore();
  const isOpen =
    ["create_transaction", "update_transaction", "delete_transaction"].indexOf(
      appMode,
    ) !== -1;
  const close = () => {
    setTransactionId(null);
    setAppMode("list_transactions");
  };

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={close}
      style={{
        borderRadius: "20px",
        backgroundColor: "#F2F2F2",
        width: "80%",
      }}
    >
      <div className="h-full w-full overflow-y-auto">{children}</div>
    </Dialog>
  );
}
