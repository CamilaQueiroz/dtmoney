import { useTransactions } from '../../hooks/TransactionsContext';

import incomeImage from '../../assets/income.svg'
import outcomeImage from '../../assets/outcome.svg'
import total from '../../assets/total.svg'


import { Container } from './styles'

export function Summary() {

  const { transactions } = useTransactions();
  const summary = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposit += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.withdraw += transaction.amount
        acc.total -= transaction.amount
      }

      return acc;
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0
  });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImage} alt="Entradas"/>
        </header>
        <strong> 
          {
            new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(summary.deposit)
          } 
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImage} alt="Saídas"/>
        </header>
        <strong> 
          -
          {
            new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(summary.withdraw)
          } 
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={total} alt="Total"/>
        </header>
        <strong> 
          {
            new Intl.NumberFormat('pt-BR', {
              currency: 'BRL',
              style: 'currency',
            }).format(summary.total)
          } 
        </strong>
      </div>
    </Container>
  );
}