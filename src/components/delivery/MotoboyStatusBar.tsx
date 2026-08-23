import React from 'react';
import type { Motoboy } from '../../types';
import { Bike, Star, CheckCircle, Clock, XCircle } from 'lucide-react';

interface MotoboyStatusBarProps {
  motoboys: Motoboy[];
  selectedMotoboyId: string | null;
  onSelectMotoboy: (motoboyId: string | null) => void;
}

export const MotoboyStatusBar: React.FC<MotoboyStatusBarProps> = ({
  motoboys,
  selectedMotoboyId,
  onSelectMotoboy
}) => {
  const getStatusBadge = (status: Motoboy['status']) => {
    switch (status) {
      case 'disponivel':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle size={10} /> Disponível
          </span>
        );
      case 'em_rota':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <Clock size={10} /> Em Rota
          </span>
        );
      case 'offline':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            <XCircle size={10} /> Offline
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FF862F]/10 text-[#FF862F] flex items-center justify-center font-bold">
            <Bike size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
              Frota de Motoboys Conectados
            </h3>
            <p className="text-[11px] text-slate-500">
              Profissionais compartilhados entre múltiplos estabelecimentos em Viçosa
            </p>
          </div>
        </div>
        
        {selectedMotoboyId && (
          <button
            onClick={() => onSelectMotoboy(null)}
            className="text-xs font-bold text-[#FF862F] hover:underline"
          >
            Limpar seleção
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {motoboys.map((mb) => {
          const isSelected = selectedMotoboyId === mb.id;
          return (
            <div
              key={mb.id}
              onClick={() => onSelectMotoboy(isSelected ? null : mb.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#FF862F] bg-[#FF862F]/5 ring-2 ring-[#FF862F]/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{mb.avatar}</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-800 truncate max-w-[110px]">
                      {mb.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                      <Star size={10} className="fill-amber-400 text-amber-400" />
                      <span>{mb.rating}</span>
                      <span>•</span>
                      <span>{mb.deliveriesCompleted} entregas</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(mb.status)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[10px]">
                <span className="text-slate-500">
                  {mb.linkedRestaurantIds.length} estabelecimentos
                </span>
                <span className="font-bold text-slate-700 uppercase">
                  {mb.vehicleType}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
