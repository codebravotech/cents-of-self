import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { ReactNode } from "react";

import { useSystemStore } from "../state/system";

export default function Modal({ children }: { children: ReactNode }) {
  const { appMode, setAppMode } = useSystemStore();
  const isOpen =
    ["create_transaction", "update_transaction", "delete_transaction"].indexOf(
      appMode,
    ) !== -1;
  const close = () => setAppMode("list_transactions");

  return (
    <Dialog isOpen={isOpen} onDismiss={close}>
      <div>{children}</div>
    </Dialog>
  );
}
