'use client';

import { useState, useMemo } from 'react';

export const usePagination = (items: any[], pageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [items, currentPage, pageSize]);

  const totalPages = Math.ceil(items.length / pageSize);

  const goToPage = (page: number) => {
    const pageNum = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNum);
  };

  return {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    totalItems: items.length,
  };
};

type SortDirection = 'asc' | 'desc';

export const useSorting = (items: any[], defaultSort?: { key: string; direction: SortDirection }) => {
  const [sortKey, setSortKey] = useState(defaultSort?.key || '');
  const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSort?.direction || 'asc');

  const sortedItems = useMemo(() => {
    if (!sortKey) return items;

    const sorted = [...items].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  }, [items, sortKey, sortDirection]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return {
    sortedItems,
    sortKey,
    sortDirection,
    handleSort,
  };
};

export const useSearch = (items: any[], searchableFields: string[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter((item) =>
      searchableFields.some((field) =>
        String(item[field]).toLowerCase().includes(query)
      )
    );
  }, [items, searchQuery, searchableFields]);

  return {
    filteredItems,
    searchQuery,
    setSearchQuery,
  };
};

export const useDataTable = (
  items: any[],
  searchableFields: string[] = [],
  pageSize: number = 10
) => {
  const { filteredItems, searchQuery, setSearchQuery } = useSearch(items, searchableFields);
  const { sortedItems, sortKey, sortDirection, handleSort } = useSorting(filteredItems);
  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
  } = usePagination(sortedItems, pageSize);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    searchQuery,
    setSearchQuery,
    sortKey,
    sortDirection,
    handleSort,
    totalItems: filteredItems.length,
  };
};
