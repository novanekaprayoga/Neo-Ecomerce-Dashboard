// Mock data for dashboard
export const mockKPIData = {
  revenue: {
    current: 1945250000,
    previous: 1522100000,
    change: 27.8,
  },
  orders: {
    current: 1250,
    previous: 980,
    change: 27.6,
  },
  conversionRate: {
    current: 3.45,
    previous: 2.89,
    change: 19.4,
  },
  customers: {
    current: 8920,
    previous: 7840,
    change: 13.8,
  },
};

// Revenue trend data
export const mockRevenueData = [
  { date: '2024-01-01', revenue: 697500000, target: 775000000 },
  { date: '2024-01-02', revenue: 806000000, target: 775000000 },
  { date: '2024-01-03', revenue: 744000000, target: 775000000 },
  { date: '2024-01-04', revenue: 945500000, target: 852500000 },
  { date: '2024-01-05', revenue: 852500000, target: 852500000 },
  { date: '2024-01-06', revenue: 1038500000, target: 930000000 },
  { date: '2024-01-07', revenue: 1116000000, target: 1007500000 },
  { date: '2024-01-08', revenue: 1054000000, target: 1007500000 },
  { date: '2024-01-09', revenue: 1209000000, target: 1085000000 },
  { date: '2024-01-10', revenue: 1271000000, target: 1162500000 },
  { date: '2024-01-11', revenue: 1317500000, target: 1240000000 },
  { date: '2024-01-12', revenue: 1364000000, target: 1317500000 },
  { date: '2024-01-13', revenue: 1426000000, target: 1395000000 },
  { date: '2024-01-14', revenue: 1472500000, target: 1395000000 },
];

// Category breakdown
export const mockCategoryData = [
  { name: 'Electronics', value: 542500000, percentage: 28 },
  { name: 'Clothing', value: 434000000, percentage: 22 },
  { name: 'Home & Garden', value: 403000000, percentage: 21 },
  { name: 'Sports', value: 310000000, percentage: 16 },
  { name: 'Books', value: 255750000, percentage: 13 },
];

// Region data
export const mockRegionData = [
  { name: 'North America', value: 697500000, percentage: 36 },
  { name: 'Europe', value: 589000000, percentage: 30 },
  { name: 'Asia', value: 434000000, percentage: 22 },
  { name: 'South America', value: 139500000, percentage: 7 },
  { name: 'Africa', value: 85250000, percentage: 5 },
];

// Top products
export const mockTopProducts = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    category: 'Electronics',
    sales: 450,
    revenue: 348750000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Premium T-Shirt',
    category: 'Clothing',
    sales: 280,
    revenue: 130200000,
    status: 'active',
  },
  {
    id: '3',
    name: 'Yoga Mat Deluxe',
    category: 'Sports',
    sales: 320,
    revenue: 99200000,
    status: 'active',
  },
  {
    id: '4',
    name: 'Smart Watch Ultra',
    category: 'Electronics',
    sales: 150,
    revenue: 348750000,
    status: 'active',
  },
  {
    id: '5',
    name: 'Coffee Table Modern',
    category: 'Home & Garden',
    sales: 85,
    revenue: 197625000,
    status: 'active',
  },
  {
    id: '6',
    name: 'Running Shoes Sport',
    category: 'Sports',
    sales: 420,
    revenue: 260400000,
    status: 'active',
  },
  {
    id: '7',
    name: 'Bedsheet Premium',
    category: 'Home & Garden',
    sales: 290,
    revenue: 67425000,
    status: 'inactive',
  },
  {
    id: '8',
    name: 'Novel Collection',
    category: 'Books',
    sales: 180,
    revenue: 55800000,
    status: 'active',
  },
];

// Recent orders
export const mockRecentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    amount: 37975000,
    items: 3,
    status: 'completed',
    date: '2024-01-14',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    amount: 28675000,
    items: 2,
    status: 'processing',
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    amount: 80600000,
    items: 4,
    status: 'pending',
    date: '2024-01-13',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Williams',
    amount: 48050000,
    items: 2,
    status: 'completed',
    date: '2024-01-13',
  },
  {
    id: 'ORD-005',
    customer: 'Robert Brown',
    amount: 13795000,
    items: 1,
    status: 'completed',
    date: '2024-01-12',
  },
  {
    id: 'ORD-006',
    customer: 'Emily Davis',
    amount: 65515000,
    items: 5,
    status: 'processing',
    date: '2024-01-12',
  },
  {
    id: 'ORD-007',
    customer: 'David Miller',
    amount: 24180000,
    items: 2,
    status: 'completed',
    date: '2024-01-11',
  },
  {
    id: 'ORD-008',
    customer: 'Lisa Anderson',
    amount: 44795000,
    items: 3,
    status: 'completed',
    date: '2024-01-11',
  },
  {
    id: 'ORD-009',
    customer: 'Chris Taylor',
    amount: 87835000,
    items: 4,
    status: 'pending',
    date: '2024-01-10',
  },
  {
    id: 'ORD-010',
    customer: 'Jessica White',
    amount: 51770000,
    items: 2,
    status: 'completed',
    date: '2024-01-10',
  },
];

// Customers
export const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    totalSpent: 192847500,
    orders: 12,
    joined: '2023-05-15',
    status: 'active',
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane.smith@yahoo.com',
    totalSpent: 137895000,
    orders: 8,
    joined: '2023-06-20',
    status: 'active',
  },
  {
    id: 'CUST-003',
    name: 'Mike Johnson',
    email: 'mike.johnson@outlook.com',
    totalSpent: 242885000,
    orders: 14,
    joined: '2023-04-10',
    status: 'active',
  },
  {
    id: 'CUST-004',
    name: 'Sarah Williams',
    email: 'sarah.williams@acme.com',
    totalSpent: 96607000,
    orders: 5,
    joined: '2023-08-25',
    status: 'inactive',
  },
  {
    id: 'CUST-005',
    name: 'Robert Brown',
    email: 'robert.brown@neo.id',
    totalSpent: 330670000,
    orders: 18,
    joined: '2023-03-15',
    status: 'active',
  },
];

// Categories
export const mockCategories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Beauty',
  'Food & Beverage',
];

// Regions
export const mockRegions = [
  'North America',
  'Europe',
  'Asia',
  'South America',
  'Africa',
  'Middle East',
];

// Conversion funnel
export const mockConversionFunnel = [
  { step: 'Visitors', value: 25000, percentage: 100 },
  { step: 'Add to Cart', value: 8750, percentage: 35 },
  { step: 'Checkout', value: 4375, percentage: 50 },
  { step: 'Purchase', value: 1250, percentage: 28.6 },
];

// Device breakdown
export const mockDeviceData = [
  { name: 'Desktop', value: 45, percentage: 45 },
  { name: 'Mobile', value: 40, percentage: 40 },
  { name: 'Tablet', value: 15, percentage: 15 },
];
