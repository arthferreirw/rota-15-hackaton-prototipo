import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Top Header */}
      <MobileHeader onOpenMenu={() => setIsMobileMenuOpen(true)} />

      {/* Navigation Sidebar / Drawer */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Container with Desktop Navbar */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Navbar */}
        <DesktopHeader />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8 bg-white min-w-0">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile Devices */}
      <BottomNav />
    </div>
  );
};
