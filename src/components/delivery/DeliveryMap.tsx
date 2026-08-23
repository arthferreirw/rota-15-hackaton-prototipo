import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { vicosaCenter, mockGeoPoints } from '../../data/vicosaGeoData';
import type { DeliveryZone, Motoboy, DeliveryOrder, DeliveryRoute } from '../../types';

// Fix Leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon Helpers
const createRestaurantIcon = (emoji: string, color: string = '#FF862F') => {
  return L.divIcon({
    className: 'custom-restaurant-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 12px;
        border: 2px solid #FFFFFF;
        box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">
        ${emoji}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const createCustomerIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-customer-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #FFFFFF;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 10px;
      ">
        📍
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
};

const createMotoboyIcon = (avatar: string, isSelected: boolean) => {
  return L.divIcon({
    className: 'custom-motoboy-marker',
    html: `
      <div style="
        background-color: ${isSelected ? '#FF862F' : '#0F172A'};
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 3px solid ${isSelected ? '#FF862F' : '#FFFFFF'};
        box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: transform 0.2s;
      ">
        ${avatar}
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

interface DeliveryMapProps {
  zones: DeliveryZone[];
  motoboys: Motoboy[];
  orders: DeliveryOrder[];
  activeRoute: DeliveryRoute | null;
  selectedZoneId: string | null;
  selectedMotoboyId: string | null;
  onSelectZone: (zoneId: string | null) => void;
  onSelectOrder: (orderId: string) => void;
}

export const DeliveryMap: React.FC<DeliveryMapProps> = ({
  zones,
  motoboys,
  orders,
  activeRoute,
  selectedZoneId,
  selectedMotoboyId,
  onSelectZone,
  onSelectOrder
}) => {
  const [routePolyline, setRoutePolyline] = useState<[number, number][]>([]);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // Fetch OSRM geometry when activeRoute changes
  useEffect(() => {
    if (!activeRoute || activeRoute.orders.length === 0) {
      setRoutePolyline([]);
      setIsLoadingRoute(false);
      return;
    }

    const controller = new AbortController();

    const fetchOSRMRoute = async () => {
      setIsLoadingRoute(true);

      const motoboy = motoboys.find(m => m.id === activeRoute.motoboyId);
      const startPoint: [number, number] = motoboy
        ? [motoboy.currentLat, motoboy.currentLng]
        : [activeRoute.orders[0].customerLat, activeRoute.orders[0].customerLng];

      const restIds = Array.from(new Set(activeRoute.orders.map(o => o.restaurantId)));
      const restPoints = restIds
        .map(id => mockGeoPoints.find(p => p.id === id))
        .filter((p): p is typeof mockGeoPoints[0] => Boolean(p))
        .map(p => [p.lat, p.lng] as [number, number]);

      const customerPoints = activeRoute.orders.map(o => [o.customerLat, o.customerLng] as [number, number]);
      const fallbackWaypoints: [number, number][] = [startPoint, ...restPoints, ...customerPoints];

      try {
        const coordinatesString = fallbackWaypoints.map(([lat, lng]) => `${lng},${lat}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full&geometries=geojson`;

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`OSRM error: ${response.status}`);

        const data = await response.json();
        const coords = data?.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;

        if (Array.isArray(coords) && coords.length > 0) {
          setRoutePolyline(coords.map(([lng, lat]) => [lat, lng]));
        } else {
          setRoutePolyline(activeRoute.routeCoordinates?.length > 0 ? activeRoute.routeCoordinates : fallbackWaypoints);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setRoutePolyline(
          activeRoute.routeCoordinates && activeRoute.routeCoordinates.length > 0
            ? activeRoute.routeCoordinates
            : fallbackWaypoints
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingRoute(false);
        }
      }
    };

    void fetchOSRMRoute();

    return () => controller.abort();
  }, [activeRoute, motoboys]);

  // All restaurants in the Viçosa network
  const allRestaurants = mockGeoPoints.filter(p => p.type === 'restaurant');

  // Filter orders by selected zone or motoboy
  const visibleOrders = orders.filter(o => {
    if (selectedZoneId && o.zoneId !== selectedZoneId) return false;
    if (selectedMotoboyId && o.assignedMotoboyId !== selectedMotoboyId) return false;
    return true;
  });

  return (
    <div className="w-full h-full min-h-[500px] rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative z-10">
      <MapContainer
        center={vicosaCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full bg-[#F8FAFC]"
        style={{ height: '100%', minHeight: '500px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Loading Overlay */}
        {isLoadingRoute && (
          <div className="leaflet-top leaflet-right">
            <div className="m-3 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-[11px] font-semibold text-slate-700 shadow-lg backdrop-blur-sm flex items-center gap-2">
              <span className="animate-spin">🌀</span> Calculating optimized street route...
            </div>
          </div>
        )}

        {/* Render Delivery Zones as Circles */}
        {zones.map((zone) => {
          const isSelected = selectedZoneId === zone.id;
          return (
            <Circle
              key={zone.id}
              center={[zone.centerLat, zone.centerLng]}
              radius={zone.radiusMeters}
              eventHandlers={{
                click: () => onSelectZone(isSelected ? null : zone.id)
              }}
              pathOptions={{
                fillColor: zone.color,
                fillOpacity: isSelected ? 0.35 : 0.12,
                color: zone.color,
                weight: isSelected ? 3 : 1.5,
                dashArray: isSelected ? undefined : '4, 6'
              }}
            />
          );
        })}

        {/* Optimized Polyline Route */}
        {routePolyline.length > 0 && (
          <Polyline
            positions={routePolyline}
            pathOptions={{
              color: '#FF862F',
              weight: 5,
              opacity: 0.9,
              lineCap: 'round',
              lineJoin: 'round'
            }}
          />
        )}

        {/* Restaurant Markers (All restaurants in Viçosa) */}
        {allRestaurants.map((rest) => {
          const restaurantOrdersCount = orders.filter(o => o.restaurantId === rest.id).length;
          const isActive = restaurantOrdersCount > 0;
          const markerColor = isActive ? '#FF862F' : '#94A3B8';

          return (
            <Marker
              key={`rest-${rest.id}`}
              position={[rest.lat, rest.lng]}
              icon={createRestaurantIcon('🍽️', markerColor)}
            >
              <Popup>
                <div className="p-2 text-xs space-y-1">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1 mb-1">
                    <span className="font-extrabold text-slate-800 text-sm">{rest.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      isActive ? 'bg-orange-100 text-[#FF862F]' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isActive ? 'ATIVO' : 'REDE PARCEIRA'}
                    </span>
                  </div>
                  <div className="text-slate-500">{rest.address}</div>
                  <div className="text-[11px] font-bold text-slate-700">
                    {restaurantOrdersCount} {restaurantOrdersCount === 1 ? 'pedido pendente' : 'pedidos pendentes'}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Customer Order Markers */}
        {visibleOrders.map((order) => {
          const zone = zones.find(z => z.id === order.zoneId);
          const zoneColor = zone ? zone.color : '#FF862F';

          return (
            <Marker
              key={order.id}
              position={[order.customerLat, order.customerLng]}
              icon={createCustomerIcon(zoneColor)}
              eventHandlers={{
                click: () => onSelectOrder(order.id)
              }}
            >
              <Popup>
                <div className="p-2 text-xs space-y-1.5 min-w-[200px]">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <span className="font-extrabold text-slate-900">{order.customerName}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {zone?.name}
                    </span>
                  </div>
                  <div className="text-slate-600 font-medium">📍 {order.customerAddress}</div>
                  <div className="text-slate-500">
                    {order.restaurantEmoji} <strong className="text-slate-800">{order.restaurantName}</strong>
                  </div>
                  <div className="text-slate-700 font-semibold bg-slate-50 p-1.5 rounded border border-slate-100">
                    📦 {order.items}
                  </div>
                  <div className="flex items-center justify-between pt-1 font-bold text-slate-900">
                    <span>Total: R$ {order.totalValue.toFixed(2)}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      order.status === 'em_rota' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {order.status === 'em_rota' ? 'Em Rota' : 'Pendente'}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Motoboy Markers */}
        {motoboys.map((mb) => {
          const isSelected = selectedMotoboyId === mb.id;
          return (
            <Marker
              key={mb.id}
              position={[mb.currentLat, mb.currentLng]}
              icon={createMotoboyIcon(mb.avatar, isSelected)}
            >
              <Popup>
                <div className="p-2 text-xs space-y-1 min-w-[180px]">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-1 font-extrabold text-slate-900">
                    <span>{mb.avatar}</span>
                    <span>{mb.name}</span>
                  </div>
                  <div className="text-slate-500">Telefone: {mb.phone}</div>
                  <div className="text-slate-500">Status: <strong className="capitalize text-slate-800">{mb.status}</strong></div>
                  <div className="text-slate-500">Veículo: <strong className="capitalize text-slate-800">{mb.vehicleType}</strong></div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
