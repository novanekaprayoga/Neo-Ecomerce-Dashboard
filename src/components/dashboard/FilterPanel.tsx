'use client';

import React, { useState } from 'react';
import { Button, Card } from '@/components/ui';
import { useFilters } from '@/context/FilterContext';
import { mockCategories, mockRegions } from '@/data/mockData';

export const FilterPanel: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useFilters();
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (type: 'from' | 'to', date: string) => {
    updateFilter('dateRange', {
      ...filters.dateRange,
      [type]: date ? new Date(`${date}T00:00:00`) : null,
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '▼ Hide' : '▶ Show'}
        </Button>
      </div>

      {/* Filter Controls */}
      {isOpen && (
        <Card>
          <div className="space-y-4">
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange.from ? filters.dateRange.from.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateChange('from', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={filters.dateRange.to ? filters.dateRange.to.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateChange('to', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => updateFilter('category', e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {mockCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Region
              </label>
              <select
                value={filters.region || ''}
                onChange={(e) => updateFilter('region', e.target.value || null)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Regions</option>
                {mockRegions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="primary" size="sm" className="flex-1" onClick={() => setIsOpen(false)}>
                Apply Filters
              </Button>
              <Button variant="secondary" size="sm" onClick={resetFilters} className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
