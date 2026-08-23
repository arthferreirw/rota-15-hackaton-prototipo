import React, { useState } from 'react';
import { InteractiveMap } from '../components/map/InteractiveMap';
import { ClusterEconomyPanel } from '../components/map/ClusterEconomyPanel';
import { RouteStatsCard } from '../components/map/RouteStatsCard';
import { mockClusterGeoData } from '../data/vicosaGeoData';
import type { ClusterGeoData, GeoPoint } from '../types';
import { MapPin } from 'lucide-react';

export const MapaVicosaPage: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<ClusterGeoData>(mockClusterGeoData[0]); // Default C08 (Carnes)
  const [selectedPoint, setSelectedPoint] = useState<GeoPoint | null>(null);

  return (
    <div className="space-y-5 h-full flex flex-col bg-white">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[#FF862F] text-xs font-bold uppercase tracking-wider">
            <MapPin size={14} />
            <span>CENTRAL GEOESPACIAL • VIÇOSA-MG</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Rota, Cluster & Economia
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Interaja com os clusters gastronômicos e visualize rotas de frete compartilhado e economias em tempo real.
          </p>
        </div>

        {/* Cluster Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {mockClusterGeoData.map((cluster) => (
            <button
              key={cluster.id}
              onClick={() => {
                setSelectedCluster(cluster);
                setSelectedPoint(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedCluster.id === cluster.id
                  ? 'bg-[#FF862F] text-white shadow-md shadow-[#FF862F]/20 scale-[1.02]'
                  : 'bg-slate-100 text-slate-800 border border-slate-300 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cluster.color }} />
              <span>{cluster.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: 70% Map / 30% Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[600px]">
        {/* Left Column: Interactive Leaflet Map (70% - 8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col space-y-4 min-h-[500px]">
          {/* Map Component */}
          <div className="flex-1 min-h-[480px] relative">
            <InteractiveMap
              selectedCluster={selectedCluster}
              onSelectPoint={(pt) => setSelectedPoint(pt)}
              selectedPointId={selectedPoint?.id}
            />
          </div>

          {/* Quick Route Info Banner under map */}
          <RouteStatsCard cluster={selectedCluster} />
        </div>

        {/* Right Column: Economy & Cluster Details Panel (30% - 4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <ClusterEconomyPanel cluster={selectedCluster} />
        </div>
      </div>
    </div>
  );
};
