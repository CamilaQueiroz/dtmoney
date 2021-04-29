import React, { useContext } from 'react';

import logoImg from '../../assets/logo.svg';
import { TransactionsContext } from '../../TransactionsContext';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransacionModal: () => void;
}

export function Header({ onOpenNewTransacionModal }: HeaderProps) {
  const transactions = useContext(TransactionsContext);

  console.log('header ' + JSON.stringify(transactions));
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money"/>

        <button type="button" onClick={onOpenNewTransacionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}