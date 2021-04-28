import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  models: {
    transaction: Model,
  },
  
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6800,
          createdAt: new Date('2021-02-21 09:20:00'),
        },
        {
          id: 2,
          title: 'Salário empresa',
          type: 'deposit',
          category: 'Salário',
          amount: 7500,
          createdAt: new Date('2021-02-05 16:30:00'),
        },
        {
          id: 3,
          title: 'Conta de luz',
          type: 'withdraw',
          category: 'Conta',
          amount: 200,
          createdAt: new Date('2021-02-10 13:00:00'),
        },
        {
          id: 4,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Conta',
          amount: 1200,
          createdAt: new Date('2021-02-10 13:30:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })


    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
  
      return schema.create('transaction', data);
    })

  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
