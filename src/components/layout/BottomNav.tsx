import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  DollarSign,
  Bike,
  Search,
  Sparkles
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navItems = [
    { label: 'Início', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Financeiro', path: '/financeiro', icon: <DollarSign size={20} /> },
    { label: 'Delivery', path: '/delivery', icon: <Bike size={20} />, badge: '5' },
    { label: 'Preços', path: '/comparar-precos', icon: <Search size={20} /> },
    { label: 'Oportunidades', path: '/oportunidades', icon: <Sparkles size={20} />, badge: '3' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive
                  ? 'text-[#FF862F] font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-[#FF3131] text-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1 tracking-tight truncate max-w-[64px]">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
