"use client";

import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle, Input, Button, Badge } from '@/components/ui';
import { formatCurrency, formatNumber, getStatusVariant } from '@/lib/utils';
import { useDataTable } from '@/hooks/useDataTable';
import { useFilters } from '@/context/FilterContext';

interface DataTableColumn {
  key: string;
  label: string;
  format?: 'currency' | 'number' | 'date' | 'status';
  sortable?: boolean;
  width?: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: DataTableColumn[];
  title?: string;
  pageSize?: number;
  searchableFields?: string[];
  onRowClick?: (row: any) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  pageSize = 10,
  searchableFields = [],
  onRowClick,
}) => {
  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDirection,
    handleSort,
    totalItems,
  } = useDataTable(data, searchableFields, pageSize);

  const { filters, updateFilter } = useFilters();

  useEffect(() => {
    if (filters.searchQuery !== searchQuery) {
      setSearchQuery(filters.searchQuery);
    }
  }, [filters.searchQuery, setSearchQuery, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    updateFilter('searchQuery', value);
  };

  const renderCell = (value: any, column: DataTableColumn) => {
    if (!value) return '-';

    switch (column.format) {
      case 'currency':
        return formatCurrency(value);
      case 'number':
        return formatNumber(value);
      case 'status':
        return (
          <Badge variant={getStatusVariant(value)} size="sm">
            {value}
          </Badge>
        );
      default:
        return value;
    }
  };

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}

      <CardBody className="space-y-4">
        {/* Search */}
        {searchableFields.length > 0 && (
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => column.sortable !== false && handleSort(column.key)}
                    className={`
                      px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300
                      ${column.sortable !== false ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                      ${column.width ? `w-${column.width}` : ''}
                    `}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable !== false && sortKey === column.key && (
                        <span className="text-xs">{sortDirection === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => onRowClick?.(item)}
                    className={`
                      border-b border-gray-200 dark:border-gray-700
                      ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''}
                      transition-colors
                    `}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-4 py-3 text-gray-900 dark:text-gray-100"
                      >
                        {column.render ? column.render(item) : renderCell(item[column.key], column)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
            </p>

            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </Button>
                  );
                } else if (
                  (page === currentPage - 2 && currentPage > 3) ||
                  (page === currentPage + 2 && currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={page} className="px-2 py-1">
                      ...
                    </span>
                  );
                }
                return null;
              })}

              <Button
                variant="secondary"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
