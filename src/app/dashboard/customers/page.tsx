'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import { Modal, Button, Input } from '@/components/ui';
import { mockCustomers } from '@/data/mockData';

const CUSTOMERS_STORAGE_KEY = 'neo-customers';

export default function CustomersPage() {
  const [customers, setCustomers] = useState(() => {
    if (typeof window === 'undefined') {
      return mockCustomers;
    }

    try {
      const saved = window.localStorage.getItem(CUSTOMERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : mockCustomers;
    } catch {
      return mockCustomers;
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    totalSpent: '',
    orders: '',
    status: 'active',
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(CUSTOMERS_STORAGE_KEY, JSON.stringify(customers));
    } catch {
      // ignore storage errors
    }
  }, [customers]);

  const handleOpenModal = () => {
    setEditingId(null);
    setForm({ id: '', name: '', email: '', totalSpent: '', orders: '', status: 'active' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer: any) => {
    setEditingId(customer.id);
    setForm({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      totalSpent: String(customer.totalSpent),
      orders: String(customer.orders),
      status: customer.status,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({ id: '', name: '', email: '', totalSpent: '', orders: '', status: 'active' });
  };

  const handleSaveCustomer = () => {
    if (!form.id || !form.name || !form.email) {
      return;
    }

    const nextCustomer = {
      id: form.id,
      name: form.name,
      email: form.email,
      totalSpent: Number(form.totalSpent || 0),
      orders: Number(form.orders || 0),
      status: form.status,
    };

    setCustomers((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextCustomer : item));
      }
      return [nextCustomer, ...prev];
    });

    handleCloseModal();
  };

  const handleDeleteCustomer = (id: string) => {
    if (!window.confirm('Delete this customer?')) return;
    setCustomers((prev) => prev.filter((item) => item.id !== id));
  };

  const customerColumns = [
    { key: 'id', label: 'Customer ID', sortable: true, width: '120px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'totalSpent', label: 'Total Spent', format: 'currency' as const, sortable: true },
    { key: 'orders', label: 'Orders', format: 'number' as const, sortable: true },
    { key: 'status', label: 'Status', format: 'status' as const, sortable: true },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (customer: any) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleOpenEdit(customer)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Customers</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage customer information</p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenModal}>
          + Add Customer
        </Button>
      </div>

      <DataTable
        data={customers}
        columns={customerColumns}
        title="All Customers"
        pageSize={10}
        searchableFields={['name', 'email']}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Customer' : 'Add New Customer'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" size="md" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleSaveCustomer}>
              {editingId ? 'Update Customer' : 'Save Customer'}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Customer ID"
            value={form.id}
            onChange={(event) => setForm({ ...form, id: event.target.value })}
            placeholder="CUST-001"
          />
          <Input
            label="Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="john@example.com"
          />
          <Input
            label="Total Spent"
            type="number"
            value={form.totalSpent}
            onChange={(event) => setForm({ ...form, totalSpent: event.target.value })}
            placeholder="1200"
          />
          <Input
            label="Orders"
            type="number"
            value={form.orders}
            onChange={(event) => setForm({ ...form, orders: event.target.value })}
            placeholder="5"
          />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
