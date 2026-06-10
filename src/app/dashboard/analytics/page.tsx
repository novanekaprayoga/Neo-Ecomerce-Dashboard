'use client';

import { useMemo } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui';
import { SimpleBarChart, SimplePieChart } from '@/components/charts/SimpleChart';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { useFilters } from '@/context/FilterContext';
import { filterByCategory, filterByDateRange, filterByRegion } from '@/lib/dashboardFilters';
import {
  mockRevenueData,
  mockCategoryData,
  mockRegionData,
  mockConversionFunnel,
  mockDeviceData,
} from '@/data/mockData';

export default function AnalyticsPage() {
  const { filters } = useFilters();
  const searchQuery = filters.searchQuery.trim().toLowerCase();

  const analyticsSections = useMemo(() => {
    const filterItems = <T extends Record<string, unknown>>(
      title: string,
      data: T[],
      fields: Array<keyof T>
    ) => {
      if (!searchQuery || title.toLowerCase().includes(searchQuery)) {
        return data;
      }

      return data.filter((item) =>
        fields.some((field) => String(item[field]).toLowerCase().includes(searchQuery))
      );
    };

    const dateFilteredRevenue = filterByDateRange(mockRevenueData, filters.dateRange);
    const categoryFilteredData = filterByCategory(mockCategoryData, filters.category);
    const regionFilteredData = filterByRegion(mockRegionData, filters.region);

    return {
      revenue: filterItems('Complete Revenue Trend', dateFilteredRevenue, ['date']),
      category: filterItems('Category Distribution', categoryFilteredData, ['name']),
      region: filterItems('Regional Performance', regionFilteredData, ['name']),
      device: filterItems('Traffic by Device', mockDeviceData, ['name']),
      funnel: filterItems('Conversion Funnel', mockConversionFunnel, ['step']),
    };
  }, [filters.category, filters.dateRange, filters.region, searchQuery]);

  const hasResults = Object.values(analyticsSections).some((section) => section.length > 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">Deep dive into your business metrics</p>
      </div>

      <FilterPanel />

      {!hasResults && (
        <Card>
          <CardBody>
            <p className="text-center text-gray-500 dark:text-gray-400">
              No analytics data found for &quot;{filters.searchQuery}&quot;.
            </p>
          </CardBody>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analyticsSections.revenue.length > 0 && (
          <SimpleBarChart
            data={analyticsSections.revenue}
            xKey="date"
            yKey="revenue"
            title="Complete Revenue Trend"
            height={350}
          />
        )}
        {analyticsSections.category.length > 0 && (
          <SimplePieChart
            data={analyticsSections.category}
            nameKey="name"
            valueKey="value"
            title="Category Distribution"
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {analyticsSections.region.length > 0 && (
          <SimplePieChart
            data={analyticsSections.region}
            nameKey="name"
            valueKey="value"
            title="Regional Performance"
          />
        )}
        {analyticsSections.device.length > 0 && (
          <SimplePieChart
            data={analyticsSections.device}
            nameKey="name"
            valueKey="value"
            title="Traffic by Device"
          />
        )}
      </div>

      {analyticsSections.funnel.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {analyticsSections.funnel.map((step, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{step.step}</span>
                    <span className="text-gray-600 dark:text-gray-400">{step.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${step.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
