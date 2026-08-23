import React, { useState } from 'react';
import { Card } from '../ui/Card';
import type { ClusterGeoData } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { DollarSign, Sparkles, Calculator } from 'lucide-react';

interface ClusterEconomyPanelProps {
  cluster: ClusterGeoData;
}

export const ClusterEconomyPanel: React.FC<ClusterEconomyPanelProps> = ({ cluster }) => {
  const [volScale, setVolScale] = useState(1.0);

  const currentVolumeTotal = Math.round(cluster.totalVolumeKgMonth * volScale);
  const retailCostTotal = currentVolumeTotal * cluster.retailPrice;
  const wholesaleCostTotal = currentVolumeTotal * cluster.wholesalePrice;
  const totalSavings = retailCostTotal - wholesaleCostTotal + ((cluster.individualFreightCost - cluster.sharedFreightCost) * cluster.restaurantIds.length);
  const savingsPerRestaurant = totalSavings / cluster.restaurantIds.length;

  return (
    <Card className="bg-white border border-slate-200 flex flex-col justify-between h-full space-y-4">
      <div>
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
          <DollarSign size={16} />
          <span>IMPACTO FINANCEIRO DO CLUSTER</span>
        </div>

        <h3 className="text-lg font-black text-slate-900 leading-snug mb-1">
          {cluster.name}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Fornecedor vinculado: <strong className="text-slate-800">{cluster.supplierName}</strong>
        </p>

        {/* Big Savings Hero Box */}
        <div className="bg-gradient-to-br from-emerald-50 via-white to-orange-50/40 border border-emerald-200 rounded-xl p-4 text-center mb-4">
          <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider block">
            Economia Total Mensal do Grupo
          </span>
          <div className="text-3xl font-black text-emerald-600 my-1">
            +{formatCurrency(totalSavings)}
            <span className="text-xs text-slate-500 font-normal ml-1">/mês</span>
          </div>
          <div className="text-xs text-slate-700 font-semibold">
            ~{formatCurrency(savingsPerRestaurant)}/mês para o seu restaurante
          </div>
        </div>

        {/* Volume Scale Simulator */}
        <div className="space-y-3 bg-slate-50 border border-slate-200 p-3.5 rounded-xl mb-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 flex items-center gap-1 font-semibold">
              <Calculator size={14} className="text-[#FF862F]" /> Simular Volume de Compra:
            </span>
            <span className="text-slate-900 font-bold">{currentVolumeTotal} kg/mês</span>
          </div>

          <input
            type="range"
            min={0.5}
            max={2.0}
            step={0.1}
            value={volScale}
            onChange={(e) => setVolScale(parseFloat(e.target.value))}
            className="w-full accent-[#FF862F] cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-500">
            <span>-50% volume</span>
            <span>Volume Atual</span>
            <span>+100% volume</span>
          </div>
        </div>

        {/* Detail breakdown */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-slate-200">
            <span className="text-slate-500">Preço Varejo Tradicional:</span>
            <span className="text-[#FF3131] line-through font-semibold">{formatCurrency(cluster.retailPrice)}/kg</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-200">
            <span className="text-slate-500">Preço Atacado Negociado:</span>
            <span className="text-emerald-600 font-bold">{formatCurrency(cluster.wholesalePrice)}/kg</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-200">
            <span className="text-slate-500">Desconto de Volume:</span>
            <span className="text-slate-900 font-bold">
              {Math.round(((cluster.retailPrice - cluster.wholesalePrice) / cluster.retailPrice) * 100)}% de desconto
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Economia de Frete Unificado:</span>
            <span className="text-emerald-600 font-bold">
              +{formatCurrency((cluster.individualFreightCost - cluster.sharedFreightCost) * cluster.restaurantIds.length)}/mês
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-500 flex items-center gap-2">
        <Sparkles size={16} className="text-[#FF862F] flex-shrink-0" />
        <span>Os valores recalculam automaticamente ao mudar de cluster no mapa de Viçosa.</span>
      </div>
    </Card>
  );
};
