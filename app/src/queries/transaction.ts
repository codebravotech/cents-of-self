import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query Transactions {
    transactions {
      id
      title
      description
      amount
      fromAccount
      toAccount
      transactionDate
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransaction($transaction: AddTransactionInput!) {
    addTransaction(transaction: $transaction) {
      id
      title
      description
      amount
      fromAccount
      toAccount
      transactionDate
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: Int!, $transaction: UpdateTransactionInput!) {
    updateTransaction(id: $updateTransactionId, transaction: $transaction) {
      id
      title
      description
      amount
      fromAccount
      toAccount
      transactionDate
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($deleteTransactionId: Int!) {
    deleteTransaction(id: $deleteTransactionId)
  }
`;
