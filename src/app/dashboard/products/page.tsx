'use client';

import { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import { Modal, Button, Input } from '@/components/ui';
import { mockTopProducts } from '@/data/mockData';
import { exportToCSV } from '@/lib/utils';

const PRODUCTS_STORAGE_KEY = 'neo-products';

export default function ProductsPage() {
  const [products, setProducts] = useState(() => {
    if (typeof window === 'undefined') {
      return mockTopProducts;
    }

    try {
      const saved = window.localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : mockTopProducts;
    } catch {
      return mockTopProducts;
    }
  });
  const [isExporting, setIsExporting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    id: '',
    name: '',
    category: '',
    sales: '',
    revenue: '',
    status: 'active',
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore storage errors
    }
  }, [products]);

  const handleOpenModal = () => {
    setEditingId(null);
    setForm({ id: '', name: '', category: '', sales: '', revenue: '', status: 'active' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      id: product.id,
      name: product.name,
      category: product.category,
      sales: String(product.sales),
      revenue: String(product.revenue),
      status: product.status,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm({ id: '', name: '', category: '', sales: '', revenue: '', status: 'active' });
  };

  const handleSaveProduct = () => {
    if (!form.id || !form.name || !form.category) {
      return;
    }

    const nextProduct = {
      id: form.id,
      name: form.name,
      category: form.category,
      sales: Number(form.sales || 0),
      revenue: Number(form.revenue || 0),
      status: form.status,
    };

    setProducts((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? nextProduct : item));
      }
      return [nextProduct, ...prev];
    });

    handleCloseModal();
  };

  const handleDeleteProduct = (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const productColumns = [
    { key: 'id', label: 'Product ID', sortable: true, width: '100px' },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'sales', label: 'Sales', format: 'number' as const, sortable: true },
    { key: 'revenue', label: 'Revenue', format: 'currency' as const, sortable: true },
    { key: 'status', label: 'Status', format: 'status' as const, sortable: true },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (product: any) => (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleOpenEdit(product)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const exportData = products.map((product) => ({
        'Product ID': product.id,
        'Product Name': product.name,
        Category: product.category,
        Sales: product.sales,
        Revenue: product.revenue,
        Status: product.status,
      }));
      exportToCSV(exportData, 'products');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Products</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your product catalog</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="primary" size="md" onClick={handleOpenModal}>
            + Add Product
          </Button>
          <Button variant="secondary" size="md" onClick={handleExport} isLoading={isExporting}>
            📥 Export
          </Button>
        </div>
      </div>

      <DataTable
        data={products}
        columns={productColumns}
        title="All Products"
        pageSize={10}
        searchableFields={['name', 'category']}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Product' : 'Add New Product'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" size="md" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleSaveProduct}>
              {editingId ? 'Update Product' : 'Save Product'}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Product ID"
            value={form.id}
            onChange={(event) => setForm({ ...form, id: event.target.value })}
            placeholder="PRD-001"
          />
          <Input
            label="Product Name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Smartphone"
          />
          <Input
            label="Category"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            placeholder="Electronics"
          />
          <Input
            label="Sales"
            type="number"
            value={form.sales}
            onChange={(event) => setForm({ ...form, sales: event.target.value })}
            placeholder="120"
          />
          <Input
            label="Revenue"
            type="number"
            value={form.revenue}
            onChange={(event) => setForm({ ...form, revenue: event.target.value })}
            placeholder="98000"
          />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
            <select
              value={form.status}
              onChange={(event) => setForm({ ...form, status: event.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="out_of_stock">Out of stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
