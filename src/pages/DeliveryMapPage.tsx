import React, { useState } from 'react';
import { Bike, RefreshCw } from 'lucide-react';
import { MotoboyStatusBar } from '../components/delivery/MotoboyStatusBar';
import { DeliveryMap } from '../components/delivery/DeliveryMap';
import { DeliveryOrdersPanel } from '../components/delivery/DeliveryOrdersPanel';
import { RouteOptimizationCard } from '../components/delivery/RouteOptimizationCard';
import {
  mockDeliveryZones,
  mockMotoboys,
  mockDeliveryOrders,
  mockDeliveryRoutes
} from '../data/mockDeliveryData';
import { mockGeoPoints } from '../data/vicosaGeoData';
import type { DeliveryRoute, DeliveryOrder } from '../types';

export const DeliveryMapPage: React.FC = () => {
  const [zones] = useState(mockDeliveryZones);
  const [motoboys] = useState(mockMotoboys);
  const [orders, setOrders] = useState<DeliveryOrder[]>(mockDeliveryOrders);
  const [activeRoute, setActiveRoute] = useState<DeliveryRoute | null>(mockDeliveryRoutes[0] || null);

  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [selectedMotoboyId, setSelectedMotoboyId] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Trigger route optimization algorithm for a given zone
  const handleOptimizeRoute = (zoneId: string) => {
    setIsOptimizing(true);

    setTimeout(() => {
      const zoneOrders = orders.filter(o => o.zoneId === zoneId && o.status === 'pendente');
      const targetOrders = zoneOrders.length > 0 ? zoneOrders : orders.filter(o => o.zoneId === zoneId);

      if (targetOrders.length === 0) {
        setIsOptimizing(false);
        return;
      }

      // Pick available motoboy linked to most of these restaurants
      const availableMotoboy = motoboys.find(m => m.status === 'disponivel') || motoboys[0];

      // Mark orders as assigned / em_rota
      const updatedOrders = orders.map(o => {
        if (targetOrders.some(to => to.id === o.id)) {
          return {
            ...o,
            status: 'em_rota' as const,
            assignedMotoboyId: availableMotoboy.id
          };
        }
        return o;
      });

      setOrders(updatedOrders);

      // Extract restaurant and customer waypoints for fallback map polyline
      const restIds = Array.from(new Set(targetOrders.map(o => o.restaurantId)));
      const restWaypoints = restIds
        .map(id => mockGeoPoints.find(p => p.id === id))
        .filter((p): p is typeof mockGeoPoints[0] => Boolean(p))
        .map(p => [p.lat, p.lng] as [number, number]);

      const customerWaypoints = targetOrders.map(o => [o.customerLat, o.customerLng] as [number, number]);

      const routeWaypoints: [number, number][] = [
        [availableMotoboy.currentLat, availableMotoboy.currentLng],
        ...restWaypoints,
        ...customerWaypoints
      ];

      // Create new optimized route
      const newRoute: DeliveryRoute = {
        id: `route-opt-${Date.now()}`,
        motoboyId: availableMotoboy.id,
        motoboyName: availableMotoboy.name,
        orders: targetOrders,
        status: 'em_andamento',
        totalDistanceKm: parseFloat((targetOrders.length * 1.6).toFixed(1)),
        estimatedTimeMin: targetOrders.length * 7 + 5,
        fuelSavingsPercent: Math.min(30 + targetOrders.length * 8, 65),
        distanceSavedKm: parseFloat((targetOrders.length * 1.1).toFixed(1)),
        routeCoordinates: routeWaypoints
      };

      setActiveRoute(newRoute);
      setSelectedZoneId(zoneId);
      setSelectedMotoboyId(availableMotoboy.id);
      setIsOptimizing(false);
    }, 400);
  };

  const handleClearRoute = () => {
    setActiveRoute(null);
  };

  const handleResetDemoData = () => {
    setOrders(mockDeliveryOrders);
    setActiveRoute(mockDeliveryRoutes[0] || null);
    setSelectedZoneId(null);
    setSelectedMotoboyId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF862F] text-xs font-black tracking-wider uppercase mb-1">
            <Bike size={16} />
            <span>LOGÍSTICA COMPARTILHADA MULTI-RESTAURANTE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Mapa de Delivery & Otimização de Rotas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Vincule motoboys a múltiplos estabelecimentos e agrupe entregas por região geográfica de Viçosa para reduzir consumo de combustível e acelerar entregas.
          </p>
        </div>

        <button
          onClick={handleResetDemoData}
          className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-xs shrink-0 self-start sm:self-center cursor-pointer"
        >
          <RefreshCw size={14} className="text-slate-400" />
          <span>Resetar Demonstração</span>
        </button>
      </div>

      {/* Motoboy Fleet Bar */}
      <MotoboyStatusBar
        motoboys={motoboys}
        selectedMotoboyId={selectedMotoboyId}
        onSelectMotoboy={setSelectedMotoboyId}
      />

      {/* Main Map & Orders Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Map Column (8 Cols) */}
        <div className="lg:col-span-8 h-[360px] sm:h-[450px] lg:h-auto lg:min-h-[550px]">
          <DeliveryMap
            zones={zones}
            motoboys={motoboys}
            orders={orders}
            activeRoute={activeRoute}
            selectedZoneId={selectedZoneId}
            selectedMotoboyId={selectedMotoboyId}
            onSelectZone={setSelectedZoneId}
            onSelectOrder={() => {}}
          />
        </div>

        {/* Orders Panel Column (4 Cols) */}
        <div className="lg:col-span-4 h-auto min-h-[350px] lg:min-h-[550px]">
          <DeliveryOrdersPanel
            zones={zones}
            orders={orders}
            selectedZoneId={selectedZoneId}
            onSelectZone={setSelectedZoneId}
            onOptimizeRoute={handleOptimizeRoute}
            isOptimizing={isOptimizing}
          />
        </div>
      </div>

      {/* Route Optimization Savings Card */}
      <RouteOptimizationCard
        activeRoute={activeRoute}
        onClearRoute={handleClearRoute}
      />
    </div>
  );
};
