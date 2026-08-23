import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import { mockRestaurant } from '../../data/mockData';

interface MobileHeaderProps {
  onOpenMenu: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onOpenMenu }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between md:hidden shadow-2xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMenu}
          className="p-2 -ml-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
        <img
          src="/logo.png"
          alt="Rota 15 Logo"
          className="h-8 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF862F]/10 text-[#FF862F] text-[11px] font-bold">
          <Sparkles size={12} />
          <span>{mockRestaurant.city}</span>
        </div>
      </div>
    </header>
  );
};
