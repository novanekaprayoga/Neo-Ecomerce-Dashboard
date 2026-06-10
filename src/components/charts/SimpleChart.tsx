'use client';

import React from 'react';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui';
import { formatCurrency, getChartColor } from '@/lib/utils';

// Since we'll add Recharts after npm install, we'll create a simple bar chart fallback first
interface SimpleChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
  height?: number;
}

export const SimpleBarChart: React.FC<SimpleChartProps> = ({
  data,
  xKey,
  yKey,
  title,
  height = 300,
}) => {
  const maxValue = Math.max(...data.map((item) => item[yKey]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="space-y-4" style={{ height }}>
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">{item[xKey]}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(item[yKey])}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item[yKey] / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

interface PieChartProps {
  data: any[];
  nameKey: string;
  valueKey: string;
  title: string;
}

export const SimplePieChart: React.FC<PieChartProps> = ({
  data,
  nameKey,
  valueKey,
  title,
}) => {
  const total = data.reduce((sum, item) => sum + item[valueKey], 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          {data.map((item, index) => {
            const percentage = ((item[valueKey] / total) * 100).toFixed(1);
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{item[nameKey]}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: getChartColor(index),
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
