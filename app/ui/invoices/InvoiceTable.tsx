// /app/ui/dashboard/InvoiceTable.tsx

'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';
import { Transaction } from '../../interfaces'; // Adjust the path if necessary

const data: Transaction[] = [
  {
    transaction_id: 'TXN123456',
    amount: 200.0,
    type: 'Money Transfer',
    state: 'Completed',
    balance: 800.0,
  },
  {
    transaction_id: 'TXN123457',
    amount: 150.5,
    type: 'Purchase',
    state: 'Pending',
    balance: 649.5,
  },
  {
    transaction_id: 'TXN123458',
    amount: 320.75,
    type: 'Money Transfer',
    state: 'Failed',
    balance: 649.5,
  },
];

const InvoiceTable: React.FC = () => {
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Transaction ID',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span className="text-gray-700">${amount.toFixed(2)}</span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        let color = '';
        switch (type) {
          case 'Money Transfer':
            color = 'blue';
            break;
          case 'Purchase':
            color = 'green';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{type}</Tag>;
      },
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render: (state: string) => {
        let color = '';
        switch (state) {
          case 'Completed':
            color = 'green';
            break;
          case 'Pending':
            color = 'geekblue';
            break;
          case 'Failed':
            color = 'volcano';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{state}</Tag>;
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: number) => (
        <span className="text-gray-700">${balance.toFixed(2)}</span>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg md:ml-20">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="transaction_id"
      />
    </div>
  );
};

export default InvoiceTable;