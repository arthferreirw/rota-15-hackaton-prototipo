import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { vicosaCenter, mockGeoPoints } from '../../data/vicosaGeoData';
import type { ClusterGeoData, GeoPoint } from '../../types';

// Fix Leaflet marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom div icon maker for smooth dark mode styling
const createCustomIcon = (color: string, isSupplier: boolean = false) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: ${isSupplier ? '30px' : '24px'};
        height: ${isSupplier ? '30px' : '24px'};
        border-radius: 50%;
        border: 2px solid #FFFFFF;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${isSupplier ? '14px' : '11px'};
      ">
        ${isSupplier ? '🏬' : '🍽️'}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

interface InteractiveMapProps {
  selectedCluster: ClusterGeoData;
  onSelectPoint: (point: GeoPoint) => void;
  selectedPointId?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedCluster,
  onSelectPoint,
  selectedPointId
}) => {
  type RoutePath = [number, number][];

  const [routePositions, setRoutePositions] = useState<[number, number][][]>([]);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);

  // Find supplier point for the selected cluster
  const supplierPoint = useMemo(
    () => mockGeoPoints.find(p => p.id === selectedCluster.supplierId),
    [selectedCluster.supplierId]
  );

  // Find all restaurant points belonging to the active cluster
  const clusterRestaurants = useMemo(
    () => mockGeoPoints.filter(p => selectedCluster.restaurantIds.includes(p.id)),
    [selectedCluster.restaurantIds]
  );

  useEffect(() => {
    if (!supplierPoint || clusterRestaurants.length === 0) {
      setRoutePositions([]);
      return;
    }

    const controller = new AbortController();

    const loadRoadRoutes = async () => {
      setIsLoadingRoutes(true);

      try {
        const routes: RoutePath[] = await Promise.all(
          clusterRestaurants.map(async (restaurant): Promise<RoutePath> => {
            const url = `https://router.project-osrm.org/route/v1/driving/${supplierPoint.lng},${supplierPoint.lat};${restaurant.lng},${restaurant.lat}?overview=full&geometries=geojson&steps=false&alternatives=false`;
            const response = await fetch(url, { signal: controller.signal });

            if (!response.ok) {
              throw new Error(`OSRM request failed: ${response.status}`);
            }

            const data = await response.json();
            const coordinates = data?.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;

            if (Array.isArray(coordinates) && coordinates.length > 1) {
              return coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
            }

            return [
              [supplierPoint.lat, supplierPoint.lng],
              [restaurant.lat, restaurant.lng]
            ] as RoutePath;
          })
        );

        setRoutePositions(routes);
      } catch {
        setRoutePositions(
          clusterRestaurants.map((restaurant) => [
            [supplierPoint.lat, supplierPoint.lng],
            [restaurant.lat, restaurant.lng]
          ])
        );
      } finally {
        setIsLoadingRoutes(false);
      }
    };

    void loadRoadRoutes();

    return () => controller.abort();
  }, [supplierPoint, clusterRestaurants]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-slate-200 shadow-xl relative z-10">
      <MapContainer
        center={vicosaCenter}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full bg-[#F8FAFC]"
        style={{ height: '100%', minHeight: '500px' }}
      >
        {/* CartoDB Positron Tile Layer (Fundo Claro Otimizado) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Polylines representing logistics routes from supplier to cluster restaurants */}
        {routePositions.map((route, idx) => (
          <Polyline
            key={`route-${idx}`}
            positions={route}
            pathOptions={{
              color: selectedCluster.color,
              weight: 3,
              opacity: 0.8,
              dashArray: '6, 8',
              lineCap: 'round'
            }}
          />
        ))}

        {isLoadingRoutes && (
          <div className="leaflet-top leaflet-right">
            <div className="m-3 rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-[11px] font-semibold text-slate-600 shadow-lg backdrop-blur-sm">
              Calculando rotas nas ruas de Viçosa...
            </div>
          </div>
        )}

        {/* Highlight Circles around cluster restaurants to visualize grouping */}
        {clusterRestaurants.map((point) => (
          <CircleMarker
            key={`circle-${point.id}`}
            center={[point.lat, point.lng]}
            radius={25}
            pathOptions={{
              fillColor: selectedCluster.color,
              fillOpacity: 0.15,
              color: selectedCluster.color,
              weight: 1,
            }}
          />
        ))}

        {/* Render GeoPoints */}
        {mockGeoPoints.map((point) => {
          const isSelectedPoint = selectedPointId === point.id;
          const isSelectedCluster = selectedCluster.restaurantIds.includes(point.id) || point.id === selectedCluster.supplierId;
          const markerColor = point.type === 'supplier'
            ? '#38A169' // Green for suppliers
            : isSelectedPoint
              ? '#FACC15'
              : isSelectedCluster
                ? selectedCluster.color
                : '#6B7280'; // Dim gray for non-selected

          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={createCustomIcon(markerColor, point.type === 'supplier')}
              eventHandlers={{
                click: () => onSelectPoint(point),
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="bg-white text-slate-900 p-3 rounded-lg text-xs space-y-1 min-w-[200px] border border-slate-100 shadow-md">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 mb-1.5">
                    <span className="font-bold text-sm text-[#FF862F]">{point.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      point.type === 'supplier' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {point.type === 'supplier' ? 'FORNECEDOR' : 'RESTAURANTE'}
                    </span>
                  </div>
                  <div><strong className="text-slate-500">Categoria:</strong> {point.category}</div>
                  <div><strong className="text-slate-500">Bairro:</strong> {point.neighborhood}</div>
                  {point.address && <div><strong className="text-slate-500">Endereço:</strong> {point.address}</div>}
                  {point.clusterId && (
                    <div className="text-emerald-700 font-bold mt-1 pt-1 border-t border-slate-200">
                      ✓ Integrante do Cluster {point.clusterId}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
