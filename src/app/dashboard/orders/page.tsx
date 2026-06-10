'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import { Modal, Button, Input } from '@/components/ui';
import { mockRecentOrders } from '@/data/mockData';
import { Order } from '@/types';

const ORDERS_STORAGE_KEY = 'neo-orders';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === 'undefined') {
      return mockRecentOrders as Order[];
    }

    try {
      const saved = window.localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Order[]) : (mockRecentOrders as Order[]);
    } catch {
      return mockRecentOrders as Order[];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: '',
    customer: '',
    amount: '',
    items: '',
    status: 'pending',
    date: '',
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore storage errors
    }
  }, [orders]);

  const handleOpenModal = () => {
    setEditingId(null);
    setForm({ id: '', customer: '', amount: '', items: '', status: 'pending', date: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (order: Order) => {
    setEditingId(order.id);
    setForm({
      id: order.id,
      customer: order.customer,
      amount: String(order.amount),
      items: String(order.items),
      status: order.status,
      date: order.date,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({ id: '', customer: '', amount: '', items: '', status: 'pending', date: '' });
  };

  const handleSaveOrder = () => {
    if (!form.id || !form.customer || !form.amount || !form.items || !form.date) {
      return;
    }

    const nextOrder: Order = {
      id: form.id,
      customer: form.customer,
      amount: Number(form.amount),
      items: Number(form.items),
      status: form.status as Order['status'],
      date: form.date,
    };

    setOrders((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextOrder : item));
      }
      return [nextOrder, ...prev];
    });

    handleCloseModal();
  };

  const handleDeleteOrder = (id: string) => {
    if (!window.confirm('Delete this order?')) return;
    setOrders((prev) => prev.filter((item) => item.id !== id));
  };

  const orderColumns = [
    { key: 'id', label: 'Order ID', sortable: true, width: '120px' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'amount', label: 'Amount', format: 'currency' as const, sortable: true },
    { key: 'items', label: 'Items', format: 'number' as const, sortable: true },
    { key: 'status', label: 'Status', format: 'status' as const, sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (order: any) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleOpenEdit(order)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDeleteOrder(order.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Orders</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and track all customer orders</p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenModal}>
          + Add Order
        </Button>
      </div>

      <DataTable
        data={orders}
        columns={orderColumns}
        title="All Orders"
        pageSize={10}
        searchableFields={['id', 'customer']}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Order' : 'Add New Order'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" size="md" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleSaveOrder}>
              {editingId ? 'Update Order' : 'Save Order'}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Order ID"
            value={form.id}
            onChange={(event) => setForm({ ...form, id: event.target.value })}
            placeholder="ORD-001"
          />
          <Input
            label="Customer"
            value={form.customer}
            onChange={(event) => setForm({ ...form, customer: event.target.value })}
            placeholder="John Doe"
          />
          <Input
            label="Amount"
            type="number"
            value={form.amount}
            onChange={(event) => setForm({ ...form, amount: event.target.value })}
            placeholder="37975"
          />
          <Input
            label="Items"
            type="number"
            value={form.items}
            onChange={(event) => setForm({ ...form, items: event.target.value })}
            placeholder="3"
          />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(event) => setForm({ ...form, date: event.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
}
