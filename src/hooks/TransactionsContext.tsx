import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../services/api';


interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  isNewTransactionModalOpen: boolean;
  handleOpenNewTransactionModal: () => void;
  handleCloseNewTransactionModal: () => void;
}

const TransactionsContext = createContext<TransactionData>(
  {} as TransactionData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(res => {
        setTransactions(res.data.transactions)
      })
  },[])

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions([...transactions, transaction])

  }

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsContext.Provider value={{
      transactions, 
      createTransaction,
      isNewTransactionModalOpen,
      handleCloseNewTransactionModal,
      handleOpenNewTransactionModal
      }}>
      { children }
    </TransactionsContext.Provider>
  )

  
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}