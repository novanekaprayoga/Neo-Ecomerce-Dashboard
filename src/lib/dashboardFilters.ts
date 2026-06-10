import type { FilterState } from '@/context/FilterContext';

type DateRange = FilterState['dateRange'];

const toLocalDate = (value: string) => new Date(`${value}T00:00:00`);

export const isWithinDateRange = (value: string, dateRange: DateRange) => {
  const date = toLocalDate(value);
  const from = dateRange.from;
  const to = dateRange.to;

  if (from && date < from) return false;
  if (to && date > to) return false;

  return true;
};

export const filterByDateRange = <T extends { date: string }>(
  items: T[],
  dateRange: DateRange
) => items.filter((item) => isWithinDateRange(item.date, dateRange));

export const filterByCategory = <T extends { category?: string; name?: string }>(
  items: T[],
  category: string | null
) => {
  if (!category) return items;

  return items.filter((item) => item.category === category || item.name === category);
};

export const filterByRegion = <T extends { name: string }>(
  items: T[],
  region: string | null
) => {
  if (!region) return items;

  return items.filter((item) => item.name === region);
};
