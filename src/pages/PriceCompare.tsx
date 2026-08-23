import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { mockExpandedPriceComparisons } from '../data/mockExpandedPriceComparisons';
import { formatCurrency } from '../utils/formatters';
import { Search, MapPin, Star, Tag, TrendingDown } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const PriceComparePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering products based on query
  const filteredComparisons = mockExpandedPriceComparisons.filter(item =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group items by product name
  const groupedProducts = filteredComparisons.reduce((acc, item) => {
    if (!acc[item.productName]) {
      acc[item.productName] = [];
    }
    acc[item.productName].push(item);
    return acc;
  }, {} as Record<string, typeof mockExpandedPriceComparisons>);

  const popularTags = ["Tomate", "Carne", "Queijo", "Alface", "Óleo", "Arroz", "Frango"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#FF862F] text-sm font-semibold mb-1">
          <Search size={16} />
          <span>COTADOR DE PREÇOS EM VIÇOSA-MG</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Comparar Preços de Fornecedores
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pesquise insumos e descubra instantaneamente o fornecedor mais vantajoso em Viçosa e região.
        </p>
      </div>

      {/* Search & Tag Bar */}
      <Card className="bg-white border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquise por ingrediente (ex: Carne, Queijo, Tomate, Frango)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#FF862F]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className={`text-xs px-3 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap ${
                  searchTerm.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#FF862F] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-[#FF3131] hover:underline px-2 cursor-pointer font-bold"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Grouped Product Results */}
      <div className="space-y-6">
        {Object.keys(groupedProducts).length === 0 ? (
          <Card className="bg-white border border-slate-200 text-center py-12">
            <p className="text-sm text-slate-500">Nenhum insumo ou fornecedor encontrado para "{searchTerm}".</p>
          </Card>
        ) : (
          Object.entries(groupedProducts).map(([productName, suppliers]) => {
            const cheapestSupplier = suppliers.find(s => s.isCheapest) || suppliers[0];
            const maxPrice = Math.max(...suppliers.map(s => s.pricePerUnit));
            const maxSavings = (maxPrice - cheapestSupplier.pricePerUnit);

            return (
              <Card key={productName} className="bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <Tag className="text-[#FF862F]" size={18} />
                    <h3 className="text-lg font-bold text-slate-900">{productName}</h3>
                  </div>

                  {maxSavings > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 w-fit">
                      <TrendingDown size={14} />
                      <span>Economia potencial de até {formatCurrency(maxSavings)}/{cheapestSupplier.unit}</span>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs text-slate-600 min-w-[500px]">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-extrabold text-[11px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">FORNECEDOR</th>
                        <th className="py-3 px-4 text-center">PREÇO /{cheapestSupplier.unit}</th>
                        <th className="py-3 px-4 text-center">DISTÂNCIA</th>
                        <th className="py-3 px-4 text-center">AVALIAÇÃO</th>
                        <th className="py-3 px-4 text-center">DESTAQUE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {suppliers.sort((a, b) => a.pricePerUnit - b.pricePerUnit).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                            {item.supplierName}
                          </td>
                          <td className="py-3.5 px-4 text-center text-sm font-extrabold text-slate-900">
                            {formatCurrency(item.pricePerUnit)}
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-600 font-medium">
                            <span className="flex items-center justify-center gap-1">
                              <MapPin size={12} className="text-emerald-600" />
                              {item.distanceKm} km
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center text-amber-600 font-bold">
                            <span className="flex items-center justify-center gap-1">
                              <Star size={12} className="fill-amber-400 text-amber-400" />
                              {item.rating}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {item.isCheapest ? (
                              <Badge variant="success">⭐ Melhor Opção</Badge>
                            ) : (
                              <span className="text-slate-500 text-[11px] font-semibold">Varejo Padrão</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
