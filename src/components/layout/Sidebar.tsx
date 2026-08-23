import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  Package,
  Search,
  Users,
  ShoppingBag,
  Sparkles,
  Calculator,
  Settings,
  MapPin,
  Bike,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockRestaurant } from '../../data/mockData';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuGroups = [
    {
      title: 'PRINCIPAL',
      items: [
        { label: 'Visão Geral', path: '/', icon: <LayoutDashboard size={18} /> }
      ]
    },
    {
      title: 'GESTÃO',
      items: [
        { label: 'Financeiro', path: '/financeiro', icon: <DollarSign size={18} /> },
        { label: 'Rentabilidade', path: '/rentabilidade', icon: <TrendingUp size={18} /> },
        { label: 'Estoque', path: '/estoque', icon: <Package size={18} /> }
      ]
    },
    {
      title: 'DELIVERY',
      items: [
        {
          label: 'Mapa de Entregas',
          path: '/delivery',
          icon: <Bike size={18} />,
          badge: '5'
        }
      ]
    },
    {
      title: 'COMPRAS',
      items: [
        { label: 'Comparar Preços', path: '/comparar-precos', icon: <Search size={18} /> },
        { label: 'Fornecedores', path: '/fornecedores', icon: <Users size={18} /> },
        { label: 'Compra Coletiva', path: '/compra-coletiva', icon: <ShoppingBag size={18} /> }
      ]
    },
    {
      title: 'INTELIGÊNCIA',
      items: [
        {
          label: 'Oportunidades',
          path: '/oportunidades',
          icon: <Sparkles size={18} />,
          badge: '3'
        },
        { label: 'Mapa de Viçosa', path: '/mapa', icon: <MapPin size={18} /> },
        { label: 'Simulador', path: '/simulador', icon: <Calculator size={18} /> }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:relative top-0 left-0 z-50 md:z-auto h-screen shrink-0 bg-white border-r border-slate-200 flex flex-col shadow-xl md:shadow-none transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'w-72 md:w-20' : 'w-72 md:w-64'}`}
      >
        {/* Brand Header & Toggle/Close Buttons */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white min-h-[65px]">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src="/logo.png"
              alt="Rota 15 Logo"
              className={`h-9 w-auto object-contain transition-all ${
                isCollapsed ? 'md:h-8' : 'h-9'
              }`}
            />
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
              aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Mobile Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 md:hidden transition-colors cursor-pointer"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-5 scrollbar-thin">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              {!isCollapsed ? (
                <h2 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider transition-opacity duration-200">
                  {group.title}
                </h2>
              ) : (
                <div className="h-px bg-slate-100 mx-2 my-2 hidden md:block" />
              )}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isCollapsed ? 'md:justify-center md:px-2' : 'justify-between px-3'
                      } py-2.5 rounded-xl text-xs font-bold transition-all group relative ${
                        isActive
                          ? 'bg-[#FF862F] text-white shadow-md shadow-[#FF862F]/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="shrink-0">{item.icon}</div>
                      <span className={`${isCollapsed ? 'md:hidden' : 'inline'} truncate`}>
                        {item.label}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#FF3131] text-white shrink-0 ${
                          isCollapsed
                            ? 'md:absolute md:-top-1 md:-right-1 md:px-1 md:py-0 md:text-[9px] md:rounded-full md:shadow-xs'
                            : ''
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Restaurant Profile Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 shrink-0 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-lg shrink-0">
                {mockRestaurant.avatar}
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {mockRestaurant.name}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {mockRestaurant.city}-{mockRestaurant.state}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/configuracoes"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all shrink-0"
              title="Configurações"
            >
              <Settings size={16} />
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};


