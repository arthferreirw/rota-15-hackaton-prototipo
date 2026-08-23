import React from 'react';
import { TrendingDown, Fuel, Clock, Leaf, Bike } from 'lucide-react';
import type { DeliveryRoute } from '../../types';

interface RouteOptimizationCardProps {
  activeRoute: DeliveryRoute | null;
  onClearRoute: () => void;
}

export const RouteOptimizationCard: React.FC<RouteOptimizationCardProps> = ({
  activeRoute,
  onClearRoute
}) => {
  if (!activeRoute) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-lg border border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF862F] flex items-center justify-center text-white font-bold shadow-md shadow-[#FF862F]/30">
              <Bike size={22} />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-white">
                Simulador de Economia de Rota
              </h3>
              <p className="text-xs text-slate-300">
                Selecione uma região e clique em <strong className="text-[#FF862F]">"Otimizar Rota"</strong> para agrupar pedidos multi-restaurante.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate estimated fuel & cost savings
  // Assuming 35 km/l for motorcycle, fuel R$ 6.20/l
  const kmSaved = activeRoute.distanceSavedKm;
  const litersSaved = (kmSaved / 35).toFixed(2);
  const moneySaved = (parseFloat(litersSaved) * 6.20).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700/80 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#FF862F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        {/* Left Info */}
        <div className="space-y-2 max-w-lg">
          <div className="flex items-center gap-2 text-[#FF862F] font-bold text-xs uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF862F] animate-ping" />
            <span>Rota Otimizada em Andamento</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Motoboy: {activeRoute.motoboyName}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Agrupamento de <strong className="text-white">{activeRoute.orders.length} pedidos</strong> de restaurantes parceiros para uma mesma viagem.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
          {/* Fuel Savings */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Fuel size={14} className="text-[#FF862F]" />
              <span>Combustível Saved</span>
            </div>
            <div className="text-lg font-black text-white">
              -{activeRoute.fuelSavingsPercent}%
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              ~{litersSaved}L (R$ {moneySaved})
            </div>
          </div>

          {/* Distance Saved */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <TrendingDown size={14} className="text-emerald-400" />
              <span>Km Economizados</span>
            </div>
            <div className="text-lg font-black text-white">
              {activeRoute.distanceSavedKm} km
            </div>
            <div className="text-[10px] text-slate-400">
              Total: {activeRoute.totalDistanceKm} km
            </div>
          </div>

          {/* Time Saved */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Clock size={14} className="text-amber-400" />
              <span>Tempo Estimado</span>
            </div>
            <div className="text-lg font-black text-white">
              {activeRoute.estimatedTimeMin} min
            </div>
            <div className="text-[10px] text-amber-300 font-bold">
              -12 min vs separadas
            </div>
          </div>

          {/* CO2 Impact */}
          <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Leaf size={14} className="text-emerald-400" />
              <span>Emissão CO₂</span>
            </div>
            <div className="text-lg font-black text-white">
              -350g
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              Frota Ecológica
            </div>
          </div>
        </div>

        {/* Reset / Actions */}
        <button
          onClick={onClearRoute}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 border border-white/20 transition-all shrink-0 cursor-pointer"
        >
          Concluir Rota
        </button>
      </div>
    </div>
  );
};
