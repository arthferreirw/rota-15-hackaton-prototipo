import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  Search,
  Bell,
  Sparkles,
  MapPin,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Package,
  Bike,
  ShoppingBag,
  Calculator
} from 'lucide-react';
import { mockRestaurant } from '../../data/mockData';

export const DesktopHeader: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Top Horizontal Navbar Links
  const topNavLinks = [
    { label: 'Geral', path: '/', icon: <LayoutDashboard size={13} /> },
    { label: 'Financeiro', path: '/financeiro', icon: <DollarSign size={13} /> },
    { label: 'Rentabilidade', path: '/rentabilidade', icon: <TrendingUp size={13} /> },
    { label: 'Estoque', path: '/estoque', icon: <Package size={13} /> },
    { label: 'Delivery', path: '/delivery', icon: <Bike size={13} />, badge: '5' },
    { label: 'Comparar Preços', path: '/comparar-precos', icon: <Search size={13} /> },
    { label: 'Compra Coletiva', path: '/compra-coletiva', icon: <ShoppingBag size={13} /> },
    { label: 'Oportunidades', path: '/oportunidades', icon: <Sparkles size={13} />, badge: '3' },
    { label: 'Mapa Viçosa', path: '/mapa', icon: <MapPin size={13} /> },
    { label: 'Simulador', path: '/simulador', icon: <Calculator size={13} /> }
  ];

  // Mock Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Oportunidade Multi-Restaurante (Cluster C08)',
      desc: '15% de desconto em Carne Bovina com o Frigorífico Zona da Mata.',
      time: '10 min atrás',
      unread: true,
      link: '/oportunidades'
    },
    {
      id: 'notif-2',
      title: 'Rotas de Delivery Otimizadas',
      desc: '5 pedidos agrupados na região do Centro de Viçosa.',
      time: '25 min atrás',
      unread: true,
      link: '/delivery'
    },
    {
      id: 'notif-3',
      title: 'Compra Coletiva Aberta',
      desc: 'Cotação de Mussarela Fatiada atingiu o lote mínimo.',
      time: '1h atrás',
      unread: false,
      link: '/compra-coletiva'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Search Items Navigation Mapping
  const searchTargets = [
    { title: 'Visão Geral & Métricas', category: 'Dashboard', path: '/' },
    { title: 'Gestão Financeira & Margens', category: 'Financeiro', path: '/financeiro' },
    { title: 'Análise de Rentabilidade', category: 'Gestão', path: '/rentabilidade' },
    { title: 'Controle de Estoque', category: 'Gestão', path: '/estoque' },
    { title: 'Mapa de Entregas & Delivery', category: 'Logística', path: '/delivery' },
    { title: 'Comparador de Preços em Viçosa', category: 'Compras', path: '/comparar-precos' },
    { title: 'Rede de Fornecedores', category: 'Compras', path: '/fornecedores' },
    { title: 'Compras Coletivas Cluster C08', category: 'Compras', path: '/compra-coletiva' },
    { title: 'Mapa Interativo de Viçosa', category: 'Inteligência', path: '/mapa' },
    { title: 'Simulador de Margem & Custos', category: 'Inteligência', path: '/simulador' }
  ];

  const filteredSearch = searchQuery.trim() === ''
    ? []
    : searchTargets.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearch = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="hidden md:flex items-center justify-between gap-3 px-4 lg:px-6 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-2xs min-h-[56px]">
      {/* Left Search Bar (Fluid Width) */}
      <div className="relative shrink-0 w-64 lg:w-72 xl:w-80" ref={searchRef}>
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3 text-slate-400 pointer-events-none shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Buscar fornecedores, pedidos..."
            className="w-full pl-9 pr-8 py-1.5 text-xs font-semibold bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-[#FF862F] focus:ring-2 focus:ring-[#FF862F]/20 transition-all outline-none"
          />
          {searchQuery ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="absolute right-2.5 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 bg-slate-200/60 rounded border border-slate-300/60 hidden 2xl:inline-block">
              Ctrl K
            </kbd>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && filteredSearch.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 min-w-[260px]">
            <div className="p-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
              Resultados Rápidos
            </div>
            <div className="max-h-64 overflow-y-auto py-1">
              {filteredSearch.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSearch(item.path)}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between group transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#FF862F] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold">
                      {item.category}
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-slate-400 group-hover:text-[#FF862F] transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center Top Navigation Items (Aproveita todo o espaço superior) */}
      <nav className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar py-1 px-2 bg-slate-50/90 border border-slate-200/80 rounded-2xl max-w-fit mx-auto">
        {topNavLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#FF862F] text-white shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
            {item.badge && (
              <span className="px-1.5 py-0.2 rounded-md text-[9px] font-black bg-[#FF3131] text-white">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Right Controls Container */}
      <div className="flex items-center gap-2 lg:gap-3 shrink-0">
        {/* City & Cluster Info Badge */}
        <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs shrink-0">
          <MapPin size={13} className="text-[#FF862F] shrink-0" />
          <span>{mockRestaurant.city}-{mockRestaurant.state}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
          <span className="text-[#FF862F] font-extrabold flex items-center gap-1 shrink-0">
            <Sparkles size={11} />
            Cluster C08
          </span>
        </div>

        {/* Network Status Badge */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-extrabold shrink-0" title="Rede Viçosa Ativa">
          <ShieldCheck size={13} className="text-emerald-600 shrink-0" />
          <span>Rede Ativa</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative shrink-0" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all relative cursor-pointer"
            aria-label="Notificações"
            title="Notificações"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#FF3131] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 md:w-96 max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Notificações
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#FF862F]/10 text-[#FF862F]">
                      {unreadCount} novas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] font-bold text-slate-500 hover:text-[#FF862F] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 size={12} />
                    Lidas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate(notif.link);
                    }}
                    className={`p-3 hover:bg-slate-50 transition-colors cursor-pointer flex items-start gap-2.5 ${
                      notif.unread ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      notif.unread ? 'bg-[#FF862F]' : 'bg-slate-300'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                        {notif.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 shrink-0 hidden sm:block" />

        {/* Restaurant Quick Profile */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-xl bg-[#FF862F]/10 text-[#FF862F] flex items-center justify-center text-sm lg:text-base font-bold shadow-2xs shrink-0">
            {mockRestaurant.avatar}
          </div>
          <div className="hidden xl:block leading-tight min-w-0">
            <div className="text-xs font-extrabold text-slate-900 truncate max-w-[110px]">
              {mockRestaurant.name}
            </div>
            <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              Online
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};


