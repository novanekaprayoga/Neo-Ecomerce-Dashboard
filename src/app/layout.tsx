import type { Metadata } from 'next';
import '@/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { FilterProvider } from '@/context/FilterContext';

export const metadata: Metadata = {
  title: 'Neo Commerce Dashboard',
  description: 'Modern e-commerce analytics dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <FilterProvider>
              {children}
            </FilterProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
