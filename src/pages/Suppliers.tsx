import React from 'react';
import { Card } from '../components/ui/Card';
import { mockSuppliers } from '../data/mockData';
import { MapPin, Star, Phone } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const SuppliersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Fornecedores Cadastrados
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Rede de parceiros e produtores locais da microrregião de Viçosa-MG.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockSuppliers.map((sup) => (
          <Card key={sup.id} className="flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <Badge variant="info">{sup.category}</Badge>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Star size={14} className="fill-amber-400 text-amber-400" /> {sup.rating}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{sup.name}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mb-4 font-medium">
                <MapPin size={12} className="text-emerald-600" /> {sup.location} ({sup.distanceKm} km do seu restaurante)
              </p>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-2 mb-4">
                <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider block">Histórico Recente de Preços:</span>
                <div className="flex justify-around text-center">
                  {sup.priceHistory.map((ph, idx) => (
                    <div key={idx}>
                      <span className="text-[11px] text-slate-500 block font-medium">{ph.month}</span>
                      <span className="font-bold text-slate-900">R$ {ph.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-2xs">
              <Phone size={14} className="text-[#FF862F]" />
              <span>Contatar Fornecedor</span>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};
