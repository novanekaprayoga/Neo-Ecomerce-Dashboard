'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { KPICard } from '@/components/dashboard/KPICard';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { SimpleBarChart, SimplePieChart } from '@/components/charts/SimpleChart';
import { DataTable } from '@/components/table/DataTable';
import { Button, Card, CardBody } from '@/components/ui';
import {
  mockKPIData,
  mockRevenueData,
  mockCategoryData,
  mockRegionData,
  mockTopProducts,
  mockRecentOrders,
} from '@/data/mockData';
import { exportToCSV, formatCurrency } from '@/lib/utils';
import { useFilters } from '@/context/FilterContext';
import { filterByCategory, filterByDateRange, filterByRegion } from '@/lib/dashboardFilters';

export default function DashboardPage() {
  const { filters } = useFilters();
  const [isExporting, setIsExporting] = useState(false);
  const [orders, setOrders] = useState(() => mockRecentOrders);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('neo-orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const filteredRevenueData = useMemo(
    () => filterByDateRange(mockRevenueData, filters.dateRange),
    [filters.dateRange]
  );
  const filteredOrders = useMemo(
    () => filterByDateRange(orders, filters.dateRange),
    [filters.dateRange, orders]
  );
  const filteredProducts = useMemo(
    () => filterByCategory(mockTopProducts, filters.category),
    [filters.category]
  );
  const filteredCategoryData = useMemo(
    () => filterByCategory(mockCategoryData, filters.category),
    [filters.category]
  );
  const filteredRegionData = useMemo(
    () => filterByRegion(mockRegionData, filters.region),
    [filters.region]
  );

  // Columns for orders table
  const orderColumns = [
    { key: 'id', label: 'Order ID', sortable: true, width: '120px' },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'amount', label: 'Amount', format: 'currency' as const, sortable: true },
    { key: 'items', label: 'Items', format: 'number' as const, sortable: true },
    { key: 'status', label: 'Status', format: 'status' as const, sortable: true },
    { key: 'date', label: 'Date', sortable: true },
  ];

  // Columns for products table
  const productColumns = [
    { key: 'id', label: 'Product ID', sortable: true, width: '100px' },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'sales', label: 'Sales', format: 'number' as const, sortable: true },
    { key: 'revenue', label: 'Revenue', format: 'currency' as const, sortable: true },
    { key: 'status', label: 'Status', format: 'status' as const, sortable: true },
  ];

  const handleExportOrders = async () => {
    setIsExporting(true);
    try {
      const exportData = filteredOrders.map((order) => ({
        'Order ID': order.id,
        Customer: order.customer,
        Amount: order.amount,
        Items: order.items,
        Status: order.status,
        Date: order.date,
      }));
      exportToCSV(exportData, 'orders');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportProducts = async () => {
    setIsExporting(true);
    try {
      const exportData = filteredProducts.map((product) => ({
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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome to Neo Commerce Analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <KPICard
          className="lg:col-span-2"
          label="Total Revenue"
          value={mockKPIData.revenue.current}
          change={mockKPIData.revenue.change}
          format="currency"
          icon="💰"
          trend="up"
        />
        <KPICard
          label="Total Orders"
          value={mockKPIData.orders.current}
          change={mockKPIData.orders.change}
          format="number"
          icon="📦"
          trend="up"
        />
        <KPICard
          label="Conversion Rate"
          value={mockKPIData.conversionRate.current}
          change={mockKPIData.conversionRate.change}
          format="percentage"
          icon="📊"
          trend="up"
        />
        <KPICard
          label="Total Customers"
          value={mockKPIData.customers.current}
          change={mockKPIData.customers.change}
          format="number"
          icon="👥"
          trend="up"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>

        {/* Active Filters Display */}
        <div className="lg:col-span-3">
          <Card>
            <CardBody>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Active Filters</h3>
                <div className="flex flex-wrap gap-2">
                  {filters.dateRange.from && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      From: {filters.dateRange.from.toLocaleDateString()}
                    </span>
                  )}
                  {filters.dateRange.to && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      To: {filters.dateRange.to.toLocaleDateString()}
                    </span>
                  )}
                  {filters.category && (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                      Category: {filters.category}
                    </span>
                  )}
                  {filters.region && (
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                      Region: {filters.region}
                    </span>
                  )}
                  {filters.searchQuery && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                      Search: {filters.searchQuery}
                    </span>
                  )}
                  {!filters.category && !filters.region && !filters.dateRange.from && !filters.dateRange.to && !filters.searchQuery && (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">No filters applied</span>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRevenueData.length > 0 ? (
          <SimpleBarChart
            data={filteredRevenueData.slice(0, 7)}
            xKey="date"
            yKey="revenue"
            title="Revenue Trend"
            height={300}
          />
        ) : (
          <Card>
            <CardBody className="text-center text-gray-500 dark:text-gray-400">No revenue data for the selected date range.</CardBody>
          </Card>
        )}
        {filteredCategoryData.length > 0 ? (
          <SimplePieChart
            data={filteredCategoryData}
            nameKey="name"
            valueKey="value"
            title="Sales by Category"
          />
        ) : (
          <Card>
            <CardBody className="text-center text-gray-500 dark:text-gray-400">No category data for the selected filter.</CardBody>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRegionData.length > 0 ? (
          <SimplePieChart
            data={filteredRegionData}
            nameKey="name"
            valueKey="value"
            title="Sales by Region"
          />
        ) : (
          <Card>
            <CardBody className="text-center text-gray-500 dark:text-gray-400">No region data for the selected filter.</CardBody>
          </Card>
        )}
        <Card>
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Key Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Avg Order Value</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredOrders.length > 0
                    ? formatCurrency(filteredOrders.reduce((a, b) => a + b.amount, 0) / filteredOrders.length)
                    : formatCurrency(0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Transactions</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredOrders.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Completed Orders</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredOrders.filter((o) => o.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pending Orders</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredOrders.filter((o) => o.status === 'pending').length}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Orders Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExportOrders}
            isLoading={isExporting}
          >
            📥 Export to CSV
          </Button>
        </div>
        <DataTable
          data={filteredOrders}
          columns={orderColumns}
          pageSize={5}
          searchableFields={['id', 'customer']}
        />
      </div>

      {/* Products Table */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Products</h2>
          <Button
            variant="primary"
            size="sm"
            onClick={handleExportProducts}
            isLoading={isExporting}
          >
            📥 Export to CSV
          </Button>
        </div>
        <DataTable
          data={filteredProducts}
          columns={productColumns}
          pageSize={5}
          searchableFields={['name', 'category']}
        />
      </div>
    </div>
  );
}
