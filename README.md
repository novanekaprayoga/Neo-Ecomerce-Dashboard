# Neo Commerce Dashboard

A modern, production-ready e-commerce analytics dashboard built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

✨ **Core Features**
- Real-time analytics dashboard with KPI cards
- Interactive charts using Recharts
- Advanced filtering system (date range, category, region)
- Data tables with sorting, pagination, and search
- Fully responsive design (desktop, tablet, mobile)
- Dark mode support

🎨 **UI/UX**
- Clean, modern SaaS-style interface
- Sidebar navigation with route highlighting
- Top navbar with search, notifications, and user profile
- Loading skeletons and spinners
- Empty states for data

🏗️ **Architecture**
- Modular component structure:
  - `components/ui/` - Reusable UI components
  - `components/dashboard/` - Dashboard-specific components
  - `components/charts/` - Chart components
  - `components/table/` - Data table components
- React Context for global state (theme, filters)
- Custom hooks for data management
- TypeScript strict mode
- Mock API data for development

🔧 **Functionality**
- **All buttons are fully functional**:
  - Filters dynamically update displayed data
  - Pagination works seamlessly
  - Sorting reorders data correctly
  - Sidebar navigation routes properly
  - Dropdowns and modals open/close smoothly
- CSV export functionality
- Theme toggling (dark/light mode)
- Responsive layout that works on all devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Icons**: Emoji (can be replaced with icon libraries)

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar/navbar
│   │   ├── page.tsx            # Main dashboard page
│   │   ├── orders/page.tsx     # Orders page
│   │   ├── products/page.tsx   # Products page
│   │   ├── customers/page.tsx  # Customers page
│   │   ├── analytics/page.tsx  # Analytics page
│   │   └── settings/page.tsx   # Settings page
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home (redirects to /dashboard)
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Spinner.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Modal.tsx
│   │   ├── Dropdown.tsx
│   │   └── index.ts
│   ├── dashboard/              # Dashboard components
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── KPICard.tsx
│   │   └── FilterPanel.tsx
│   ├── charts/                 # Chart components
│   │   └── SimpleChart.tsx
│   └── table/                  # Table components
│       └── DataTable.tsx
├── context/                    # React Context
│   ├── ThemeContext.tsx        # Dark mode theme
│   └── FilterContext.tsx       # Global filters
├── hooks/                      # Custom React hooks
│   └── useDataTable.ts         # Pagination, sorting, search
├── lib/                        # Utility functions
│   └── utils.ts               # Formatting, exporting, helpers
├── data/                       # Mock data
│   └── mockData.ts
├── types/                      # TypeScript interfaces
│   └── index.ts
└── globals.css                 # Global styles

```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically redirect to `/dashboard`

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Navigation
- Use the sidebar to navigate between sections: Dashboard, Orders, Products, Customers, Analytics, and Settings
- Toggle dark mode using the sun/moon icon in the navbar
- Access notifications and profile menu in the top-right corner

### Filtering
- Click "Show" in the Filters section to expand filter options
- Apply date ranges, select categories, or filter by region
- Click "Reset" to clear all filters
- Active filters are displayed above the charts

### Data Tables
- **Search**: Use the search box to find items by name or ID
- **Sort**: Click column headers to sort (ascending/descending)
- **Paginate**: Use Previous/Next buttons or click page numbers
- **Export**: Click the "Export to CSV" button to download data

### Charts
- Charts automatically update when filters are applied
- Hover over chart elements for more information
- Charts are fully responsive and adapt to screen size

## Mock Data

The dashboard comes with comprehensive mock data:
- **KPIs**: Revenue, Orders, Conversion Rate, Customers
- **Charts**: Revenue trends, category breakdown, regional distribution
- **Tables**: 10 sample orders and 8 sample products
- **Customers**: 5 sample customer records

All data is stored in `src/data/mockData.ts` and can be easily replaced with API calls.

## Customization

### Changing Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',     // Change primary color
      secondary: '#1F2937',   // Change secondary color
      // ... more colors
    },
  },
},
```

### Adding New Features
1. Create new components in the appropriate `components/` subdirectory
2. Add TypeScript interfaces in `src/types/index.ts`
3. Create mock data in `src/data/mockData.ts`
4. Create new pages in `src/app/dashboard/[feature]/page.tsx`

### Replacing Mock Data
Update API calls in components by replacing mock data imports with actual API calls:
```typescript
// Before
import { mockRecentOrders } from '@/data/mockData';
const data = mockRecentOrders;

// After
const { data } = await fetch('/api/orders').then(r => r.json());
```

## Key Components

### Button
```typescript
<Button variant="primary" size="md" isLoading={false}>
  Click Me
</Button>
```

### Card
```typescript
<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### DataTable
```typescript
<DataTable
  data={items}
  columns={columns}
  pageSize={10}
  searchableFields={['name', 'email']}
/>
```

### KPICard
```typescript
<KPICard
  label="Revenue"
  value={125000}
  change={15.5}
  format="currency"
  trend="up"
/>
```

## Performance Optimizations

- **Code Splitting**: Charts are rendered with fallback simple charts
- **Lazy Loading**: Images and heavy components load on demand
- **Responsive Images**: Tailwind breakpoints for optimal mobile experience
- **CSS Optimization**: Tailwind purges unused styles in production

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Styles not applying
- Ensure Tailwind CSS is properly configured
- Check `globals.css` is imported in layout
- Restart the dev server

### TypeScript errors
- Run `npm run lint` to check for issues
- Ensure all imports are correct
- Verify TypeScript version compatibility

## Future Enhancements

- [ ] Real API integration
- [ ] Advanced authentication system
- [ ] Real-time WebSocket updates
- [ ] Database integration
- [ ] Advanced report generation
- [ ] Custom dashboard widgets
- [ ] User preferences persistence
- [ ] Email notifications

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue on the project repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
