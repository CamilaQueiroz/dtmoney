import { render, fireEvent } from '@testing-library/react';

import { NewTransactionModal } from '../../components/NewTransactionModal';

describe('Transaction Modal', () => {
  it('should be able to register a deposit or withdraw', async () => {
    const TransactionModal = render(<NewTransactionModal isTesting={true} />);

    const inputTitle = await TransactionModal.findByPlaceholderText('Título');
    const inputAmount = await TransactionModal.findByPlaceholderText('Valor');
    const inputCategory = await TransactionModal.findByPlaceholderText('Categoria');
    const buttonDeposit = await TransactionModal.findByTestId('button-deposit');
    const buttonWithdraw = await TransactionModal.findByTestId('button-withdraw');
    const buttonSubmit = await TransactionModal.findByText('Cadastrar');

    fireEvent.change(inputTitle, { target : { value: 'Mercado' } })
    fireEvent.change(inputAmount, { target : { value: 250 } })
    fireEvent.change(inputCategory, { target : { value: 'Compras' } })
    
    fireEvent.click(buttonDeposit);
    fireEvent.click(buttonWithdraw);
    fireEvent.click(buttonSubmit);
  })
});