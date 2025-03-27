import { create } from "zustand";

type AppMode =
  | "list_transactions"
  | "create_transaction"
  | "update_transaction"
  | "delete_transaction";

export interface SystemState {
  appMode: AppMode;
  setAppMode: (appMode: AppMode) => void;

  transactionId: number | null;
  setTransactionId: (transactionId: number | null) => void;
}

export const useSystemStore = create<SystemState>()((set /*, get*/) => ({
  appMode: "list_transactions",
  setAppMode: (appMode: AppMode) => set({ appMode }),

  transactionId: null,
  setTransactionId: (transactionId: number | null) => set({ transactionId }),
}));
