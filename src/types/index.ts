export interface KPIMetric {
  current: number;
  previous: number;
  change: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  target: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  status: 'active' | 'inactive';
}

export interface Order {
  id: string;
  customer: string;
  amount: number;
  items: number;
  status: 'pending' | 'processing' | 'completed';
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
  orders: number;
  joined: string;
  status: 'active' | 'inactive';
}

export interface ConversionStep {
  step: string;
  value: number;
  percentage: number;
}

export interface DeviceBreakdown {
  name: string;
  value: number;
  percentage: number;
}
