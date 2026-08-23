import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { mockCollectivePurchases } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { ShoppingBag, Users, Clock, CheckCircle, TrendingDown, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import type { CollectivePurchaseItem } from '../types';

export const CollectivePurchasePage: React.FC = () => {
  const [purchases, setPurchases] = useState<CollectivePurchaseItem[]>(mockCollectivePurchases);

  const handleJoin = (id: string) => {
    setPurchases(prev => prev.map(item => {
      if (item.id === id) {
        const isAlreadyMember = item.participatingRestaurants.includes('Sabor & Arte');
        if (isAlreadyMember) return item;

        const newParticipants = [...item.participatingRestaurants, 'Sabor & Arte'];
        const newVolume = Math.min(item.targetVolume, item.currentVolume + 80);
        return {
          ...item,
          participantsCount: newParticipants.length,
          currentVolume: newVolume,
          participatingRestaurants: newParticipants,
          status: newVolume >= item.targetVolume ? 'Confirmada' : 'Próxima do objetivo'
        };
      }
      return item;
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aberta':
        return <Badge variant="info">Aberta</Badge>;
      case 'Próxima do objetivo':
        return <Badge variant="warning">Próxima do objetivo</Badge>;
      case 'Confirmada':
        return <Badge variant="success">Confirmada</Badge>;
      case 'Encerrada':
        return <Badge variant="neutral">Encerrada</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#FF862F] text-sm font-semibold mb-1">
          <ShoppingBag size={16} />
          <span>DIFERENCIAL ROTA GASTRONÔMICA</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Compras Coletivas entre Restaurantes
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Junte o volume do seu restaurante com outros estabelecimentos de Viçosa para obter preços de grande atacado.
        </p>
      </div>

      {/* Grid of Collective Purchases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {purchases.map((item) => {
          const progressPct = Math.min(100, Math.round((item.currentVolume / item.targetVolume) * 100));
          const isJoined = item.participatingRestaurants.includes('Sabor & Arte');

          return (
            <Card
              key={item.id}
              className={`bg-white border transition-all ${
                isJoined ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
              } flex flex-col justify-between space-y-4 shadow-xs`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {getStatusBadge(item.status)}
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-semibold">
                    <Clock size={14} className="text-[#FF862F]" /> {item.deadlineDays} dias restantes
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Fornecedor parceiro: <strong className="text-slate-800">{item.supplierName}</strong>
                </p>

                {/* Pricing compare box */}
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl grid grid-cols-2 gap-3 text-center mb-4">
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Preço Individual</span>
                    <span className="text-sm font-semibold line-through text-[#FF3131]">
                      {formatCurrency(item.individualPrice)}/{item.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Preço Negociado</span>
                    <span className="text-base font-extrabold text-emerald-600">
                      {formatCurrency(item.negotiatedPrice)}/{item.unit}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progresso do Volume</span>
                    <span className="text-slate-900 font-bold">{item.currentVolume} / {item.targetVolume} {item.unit} ({progressPct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF862F] to-emerald-500 transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Members & Savings metrics */}
                <div className="flex items-center justify-between text-xs border-t border-b border-slate-200 py-2.5 mb-4">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Users size={14} className="text-[#FF862F]" />
                    <strong className="text-slate-900">{item.participantsCount} restaurantes</strong>
                  </span>
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <TrendingDown size={14} /> Economia de {formatCurrency(item.totalSavings)}
                  </span>
                </div>

                {/* Participating tags */}
                <div className="text-[11px] text-slate-500 space-y-1">
                  <strong className="text-slate-700 block font-semibold">Restaurantes Confirmados:</strong>
                  <div className="flex flex-wrap gap-1">
                    {item.participatingRestaurants.map((name, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          name === 'Sabor & Arte'
                            ? 'bg-emerald-100 text-emerald-800 font-extrabold border border-emerald-300'
                            : 'bg-slate-100 text-slate-700 border border-slate-200 font-semibold'
                        }`}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleJoin(item.id)}
                disabled={isJoined}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isJoined
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 cursor-default font-extrabold'
                    : 'bg-[#FF862F] hover:bg-[#E5721D] text-white shadow-xs'
                }`}
              >
                {isJoined ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>✓ Participação Confirmada (Sabor & Arte)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Participar da Compra Coletiva</span>
                  </>
                )}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
