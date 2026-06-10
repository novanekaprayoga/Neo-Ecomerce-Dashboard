import React from 'react';
import { Card, CardBody } from '@/components/ui';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: number;
  change?: number;
  format?: 'currency' | 'number' | 'percentage';
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  change,
  format = 'number',
  icon = '📊',
  trend = 'neutral',
  className = '',
}) => {
  let displayValue = '';

  if (format === 'currency') {
    displayValue = formatCurrency(value);
  } else if (format === 'percentage') {
    displayValue = formatPercentage(value);
  } else {
    displayValue = formatNumber(value);
  }

  const trendColor =
    trend === 'up'
      ? 'text-green-600 dark:text-green-400'
      : trend === 'down'
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-600 dark:text-gray-400';

  const trendIcon = trend === 'up' ? '📈' : trend === 'down' ? '📉' : '→';

  return (
    <Card hover className={className}>
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{displayValue}</h3>
          </div>
          <span className="text-3xl">{icon}</span>
        </div>

        {change !== undefined && (
          <div className={`flex items-center gap-1 ${trendColor}`}>
            <span>{trendIcon}</span>
            <span className="font-semibold">{Math.abs(change).toFixed(1)}%</span>
            <span className="text-xs opacity-75">vs last period</span>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
