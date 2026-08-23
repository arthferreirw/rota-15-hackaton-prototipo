import React from 'react';
import { Card } from '../components/ui/Card';
import { mockRestaurant } from '../data/mockData';
import { Building2 } from 'lucide-react';


export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Configurações do Restaurante
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Gerencie o perfil do estabelecimento e os parâmetros das regras de inteligência.
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Building2 size={20} className="text-[#FF862F]" />
          <span>Perfil do Estabelecimento</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="text-xs text-slate-500 block mb-1">Nome do Restaurante</label>
            <input
              type="text"
              readOnly
              value={mockRestaurant.name}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Segmento Gastronômico</label>
            <input
              type="text"
              readOnly
              value={mockRestaurant.segment}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Cidade / Estado</label>
            <input
              type="text"
              readOnly
              value={`${mockRestaurant.city} - ${mockRestaurant.state}`}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
