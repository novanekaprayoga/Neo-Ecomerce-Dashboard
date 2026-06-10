'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = dynamic(() => import('@/components/dashboard/Navbar').then(mod => ({ default: mod.Navbar })), {
  ssr: false,
});

function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Sidebar />
      <Navbar />
      <main 
        className={`
          transition-all duration-300 mt-16 p-6
          ${isOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        {isAuthenticated ? (
          children
        ) : (
          <div className="mt-10">
            <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-secondary border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Access Restricted</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Please sign in to view the dashboard and analytics data.
              </p>
              <Link href="/login" className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition-colors">
                Go to Login
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}
