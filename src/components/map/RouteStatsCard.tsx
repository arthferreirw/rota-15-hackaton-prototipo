import React from 'react';
import { Card } from '../ui/Card';
import type { ClusterGeoData } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Truck, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface RouteStatsCardProps {
  cluster: ClusterGeoData;
}

export const RouteStatsCard: React.FC<RouteStatsCardProps> = ({ cluster }) => {
  return (
    <Card className="bg-white border border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-[#FF862F] font-bold text-xs uppercase tracking-wider">
          <Truck size={16} />
          <span>ROTA DE ENTREGA CONJUNTA</span>
        </div>
        <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          Frete Otimizado
        </span>
      </div>

      <div className="space-y-3">
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500 block">Origem do Insumo</span>
            <strong className="text-slate-900 flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-emerald-600" /> {cluster.supplierName}
            </strong>
          </div>
          <ArrowRight size={16} className="text-slate-400" />
          <div className="text-right">
            <span className="text-slate-500 block">Destino do Cluster</span>
            <strong className="text-slate-900 mt-0.5 block">
              {cluster.restaurantIds.length} Restaurantes
            </strong>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Frete Individual</span>
            <span className="text-sm font-semibold line-through text-[#FF3131]">
              {formatCurrency(cluster.individualFreightCost)}/mês
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Frete Compartilhado</span>
            <span className="text-sm font-black text-emerald-600">
              {formatCurrency(cluster.sharedFreightCost)}/mês
            </span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
          <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" />
          <span>Rota unificada economiza <strong>{cluster.routeDistanceKm} km</strong> de deslocamento logístico.</span>
        </div>
      </div>
    </Card>
  );
};
