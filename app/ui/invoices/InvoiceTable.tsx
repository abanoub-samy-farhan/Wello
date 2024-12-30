// /app/ui/dashboard/InvoiceTable.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Modal, Button, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';
import { FetchTransactions, ResolveRequest } from '@/app/utils/fetches';
import { Transaction } from '../../interfaces'; // Adjust the path if necessary

const { Link } = Typography;

const InvoiceTable: React.FC = () => {
  // Define the state for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // State to control the visibility of the modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // State to store the currently selected transaction
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Fetch transactions on component mount
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const fetchedTransactions = await FetchTransactions();
        setTransactions(fetchedTransactions);
        console.log('Fetched transactions:', fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
    fetchTransactions();
  }, []);

  // Define the columns for the Ant Design Table
  const columns: ColumnsType<Transaction> = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: Transaction) => {
        if (record.status === 'Pending') {
          return (
            <Link onClick={() => showModal(record)}>
              {id}
            </Link>
          );
        }
        // Otherwise, render as plain text
        return <span className="font-medium">{id}</span>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span className="text-gray-700">${amount}</span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'transaction_type',
      key: 'transaction_type',
      render: (transaction_type: string) => {
        let color = '';
        switch (transaction_type) {
          case 'Send':
          case 'Receive': // Corrected 'Recieve' to 'Receive'
            color = 'green';
            break;
          case 'Purchase':
            color = 'geekblue';
            break;
          case 'Request':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{transaction_type}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'Success':
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
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance: number) => (
        <span className="text-gray-700">${balance}</span>
      ),
    },
  ];

  // Function to show the modal and set the selected transaction
  const showModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  // Function to handle modal OK action
  const handleOk = async () => {

    console.log('Approve transaction:', selectedTransaction);
    await ResolveRequest(selectedTransaction.id, 'Approve');
    setIsModalVisible(false);
    if (selectedTransaction) {
      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === selectedTransaction.id
            ? { ...tx, status: 'Success' }
            : tx
        )
      );
      setSelectedTransaction(null);
    }
  };

  // Function to handle modal Cancel action
  const handleCancel = async () => {
    // Implement the action to be taken when Cancel is clicked
    console.log('Cancel transaction:', selectedTransaction);
    await ResolveRequest(selectedTransaction.id, 'Decline');

    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg md:ml-20">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      <Table
        columns={columns}
        dataSource={transactions}
        pagination={{ pageSize: 10 }}
        rowKey="id" // Ensure 'id' is unique for each transaction
      />

      {/* Modal for pending transactions */}
      <Modal
        title={`Action Needed`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Approve"
        cancelText="Reject"
      >
        {selectedTransaction && (
          <div>
            <p><strong>Transaction ID:</strong> {selectedTransaction.id}</p>
            <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
            <p><strong>Type:</strong> {selectedTransaction.transaction_type}</p>
            <p><strong>Status:</strong> {selectedTransaction.status}</p>
            <p><strong>Balance:</strong> ${selectedTransaction.balance}</p>
            <p>Do you want to approve or reject this transaction?</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InvoiceTable;
