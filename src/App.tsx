import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import { TransactionsProvider } from './hooks/TransactionsContext';

export function App() {
  return (
    <TransactionsProvider>
      
      <Header />
      <Dashboard />

      <NewTransactionModal isTesting={false} />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
