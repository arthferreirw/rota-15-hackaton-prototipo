import React from 'react';
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
  X
} from 'lucide-react';
import { mockRestaurant } from '../../data/mockData';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
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
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-72 md:w-64 bg-white border-r border-slate-200 flex flex-col shadow-xl md:shadow-sm transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header & Mobile Close Button */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <img
            src="/logo.png"
            alt="Rota 15 Logo"
            className="h-10 w-auto object-contain"
          />
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

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              <h2 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {group.title}
              </h2>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#FF862F] text-white shadow-md shadow-[#FF862F]/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#FF3131] text-white">
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
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-lg">
                {mockRestaurant.avatar}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                  {mockRestaurant.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {mockRestaurant.city}-{mockRestaurant.state}
                </div>
              </div>
            </div>

            <NavLink
              to="/configuracoes"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all"
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

