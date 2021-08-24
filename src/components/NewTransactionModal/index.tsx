import { FormEvent, useState } from 'react'
import Modal from 'react-modal'

import { useTransactions } from '../../hooks/TransactionsContext';

import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import closeImage from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBoxButton } from './styles';

Modal.setAppElement('body');

type Testing = {
  isTesting: boolean;
}

export function NewTransactionModal({ isTesting }: Testing) {
  const { createTransaction, isNewTransactionModalOpen, handleCloseNewTransactionModal } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    
    try {
      const transaction = {
        title,
        amount,
        category,
        type
      };
  
      await createTransaction(transaction);
  
      setTitle('');
      setAmount(0);
      setCategory('');
  
      handleCloseNewTransactionModal();
    } catch (error) {
        return error;
    }
  }

  return (
    <Modal 
        isOpen={isTesting ? true : isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <button type="button" onClick={handleCloseNewTransactionModal} className="react-modal-close">
          <img src={closeImage} alt="Fechar modal"/>
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar Transação</h2>

            <input 
              placeholder="Título"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />

            <input 
              placeholder="Valor"
              type="number"
              value={amount}
              onChange={event => setAmount(Number(event.target.value))}
            />

            <TransactionTypeContainer>
              <RadioBoxButton
                type="button"
                onClick={() => setType('deposit')}
                isActive={type === 'deposit'}
                activeColor="green"
                data-testid="button-deposit"
              >
               <img src={incomeImage} alt="Entrada"/>
               <span>Entrada</span>
              </RadioBoxButton>


              <RadioBoxButton
                type="button"
                onClick={() => setType('withdraw')}
                isActive={type === 'withdraw'}
                activeColor="red"
                data-testid="button-withdraw"
              >
               <img src={outcomeImage} alt="Saída"/> 
               <span>Saída</span>  
              </RadioBoxButton>

            </TransactionTypeContainer>

            <input 
              placeholder="Categoria"
              value={category}
              onChange={event => setCategory(event.target.value)}
            />
            
            <button type="submit">
              Cadastrar
            </button>
        </Container>
      </Modal>
  )
}
