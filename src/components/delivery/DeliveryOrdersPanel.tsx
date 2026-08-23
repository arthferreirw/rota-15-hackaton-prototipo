import React from 'react';
import type { DeliveryZone, DeliveryOrder } from '../../types';
import { Package, Zap, MapPin, Clock } from 'lucide-react';

interface DeliveryOrdersPanelProps {
  zones: DeliveryZone[];
  orders: DeliveryOrder[];
  selectedZoneId: string | null;
  onSelectZone: (zoneId: string | null) => void;
  onOptimizeRoute: (zoneId: string) => void;
  isOptimizing: boolean;
}

export const DeliveryOrdersPanel: React.FC<DeliveryOrdersPanelProps> = ({
  zones,
  orders,
  selectedZoneId,
  onSelectZone,
  onOptimizeRoute,
  isOptimizing
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2 tracking-tight">
            <Package size={20} className="text-[#FF862F]" />
            Pedidos por Região
          </h2>
          <p className="text-xs text-slate-500">
            Agrupamento inteligente multi-restaurante por bairro de Viçosa
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-[#FF862F]/10 text-[#FF862F]">
          {orders.filter(o => o.status === 'pendente').length} pendentes
        </span>
      </div>

      {/* Zone Filters Pill List */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectZone(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
            selectedZoneId === null
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Todas Regiões ({orders.length})
        </button>
        {zones.map((zone) => {
          const zoneOrdersCount = orders.filter(o => o.zoneId === zone.id).length;
          const isSelected = selectedZoneId === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(isSelected ? null : zone.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 ${
                isSelected
                  ? 'text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              style={{
                backgroundColor: isSelected ? zone.color : undefined
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: isSelected ? '#FFFFFF' : zone.color }}
              />
              <span>{zone.name}</span>
              <span className="opacity-80">({zoneOrdersCount})</span>
            </button>
          );
        })}
      </div>

      {/* Zone Group Cards */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[580px]">
        {zones
          .filter(zone => !selectedZoneId || zone.id === selectedZoneId)
          .map((zone) => {
            const zoneOrders = orders.filter(o => o.zoneId === zone.id);
            if (zoneOrders.length === 0) return null;

            // Count unique restaurants in this zone
            const uniqueRestaurantIds = Array.from(new Set(zoneOrders.map(o => o.restaurantId)));
            const isMultiRestaurant = uniqueRestaurantIds.length > 1;

            return (
              <div
                key={zone.id}
                className="border border-slate-200 rounded-xl overflow-hidden shadow-xs transition-all hover:border-slate-300"
              >
                {/* Zone Card Header */}
                <div
                  className="p-3 border-b border-slate-200 flex items-center justify-between"
                  style={{ backgroundColor: `${zone.color}10` }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: zone.color }}
                    />
                    <h3 className="font-extrabold text-sm text-slate-900">
                      Região {zone.name}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-500">
                      ({zoneOrders.length} {zoneOrders.length === 1 ? 'pedido' : 'pedidos'})
                    </span>
                  </div>

                  {/* Optimize Button for this zone */}
                  <button
                    onClick={() => onOptimizeRoute(zone.id)}
                    disabled={isOptimizing || zoneOrders.every(o => o.status === 'em_rota')}
                    className="px-3 py-1 rounded-lg text-xs font-extrabold text-white bg-[#FF862F] hover:bg-[#E5721D] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                  >
                    <Zap size={13} />
                    <span>{isOptimizing ? 'Otimizando...' : 'Otimizar Rota'}</span>
                  </button>
                </div>

                {/* Multi-Restaurant Batching Insight Banner */}
                {isMultiRestaurant && (
                  <div className="bg-amber-50 border-b border-amber-200/60 px-3 py-2 flex items-center gap-2 text-[11px] font-bold text-amber-800">
                    <Zap size={14} className="text-amber-600 shrink-0" />
                    <span>
                      Oportunidade Multi-Restaurante: {uniqueRestaurantIds.length} estabelecimentos entregando na mesma região!
                    </span>
                  </div>
                )}

                {/* Orders List inside Zone */}
                <div className="p-3 space-y-2.5 bg-slate-50/50">
                  {zoneOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs space-y-2 hover:border-[#FF862F]/40 transition-all"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{order.restaurantEmoji}</span>
                          <div>
                            <span className="text-xs font-extrabold text-slate-800">
                              {order.restaurantName}
                            </span>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                              <Clock size={10} />
                              <span>{order.createdAt}</span>
                            </div>
                          </div>
                        </div>

                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          order.status === 'em_rota'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {order.status === 'em_rota' ? 'Em Rota' : 'Pendente'}
                        </span>
                      </div>

                      <div className="text-xs font-medium text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        {order.items}
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                        <span className="text-slate-500 truncate max-w-[170px] flex items-center gap-1">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          {order.customerName}
                        </span>
                        <span className="font-extrabold text-slate-900">
                          R$ {order.totalValue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
