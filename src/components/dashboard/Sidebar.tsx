'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { isOpen, toggleSidebar } = useSidebar();

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Orders', href: '/dashboard/orders', icon: '📦' },
    { label: 'Products', href: '/dashboard/products', icon: '🛍️' },
    { label: 'Customers', href: '/dashboard/customers', icon: '👥' },
    { label: 'Analytics', href: '/dashboard/analytics', icon: '📈' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen
        bg-white dark:bg-secondary border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 z-40
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        {isOpen && (
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Neo</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>

      {/* Menu */}
      <nav className="py-6 px-3 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-lg transition-colors
              ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
