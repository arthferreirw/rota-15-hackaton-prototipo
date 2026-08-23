import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { mockProducts } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { Badge } from '../components/ui/Badge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { TrendingUp, Award } from 'lucide-react';

export const ProfitabilityPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'high_margin' | 'low_margin' | 'top_sales'>('all');

  const filteredProducts = mockProducts.filter(p => {
    if (filter === 'high_margin') return p.margin >= 40;
    if (filter === 'low_margin') return p.margin < 30;
    if (filter === 'top_sales') return p.salesVolume >= 300;
    return true;
  });

  const sortedRanking = [...mockProducts].sort((a, b) => b.margin - a.margin);

  const getMarginColor = (margin: number) => {
    if (margin >= 50) return '#10B981'; // Emerald
    if (margin >= 35) return '#F59E0B'; // Amber
    return '#FF3131'; // Red
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#FF862F] text-sm font-semibold mb-1">
          <TrendingUp size={16} />
          <span>ENGENHARIA DE CARDÁPIO & RENTABILIDADE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Rentabilidade por Produto
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Ranking visual de margens de lucro dos itens do cardápio para tomadas de decisão rápidas.
        </p>
      </div>

      {/* Visual Bar Ranking Section */}
      <Card className="bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="text-[#FF862F]" size={18} />
              Ranking de Margem de Lucro (% por Produto)
            </h3>
            <p className="text-xs text-slate-500">
              Produtos no topo possuem a maior rentabilidade. Produtos em vermelho exigem reajuste ou renegociação de insumos.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Alta (&ge;50%)
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Média (35-49%)
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF3131]" /> Baixa (&lt;35%)
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sortedRanking}
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <XAxis type="number" unit="%" domain={[0, 80]} stroke="#475569" fontSize={11} fontWeight={600} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#0F172A"
                fontSize={11}
                tick={{ fill: '#0F172A', fontSize: 11, fontWeight: 700 }}
                width={140}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 p-3 rounded-xl text-xs space-y-1 text-slate-900 shadow-md">
                        <strong className="text-[#FF862F] block">{data.name}</strong>
                        <div>Margem: <span className="font-bold">{data.margin}%</span></div>
                        <div>Preço Venda: {formatCurrency(data.price)}</div>
                        <div>Custo Insumo: {formatCurrency(data.cost)}</div>
                        <div>Lucro/Unidade: {formatCurrency(data.price - data.cost)}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="margin" radius={[0, 6, 6, 0]} barSize={18}>
                {sortedRanking.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getMarginColor(entry.margin)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Filterable Table */}
      <Card className="bg-white border border-slate-200 space-y-4 shadow-xs">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'all' ? 'bg-[#FF862F] text-white shadow-xs' : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            Todos os produtos ({mockProducts.length})
          </button>
          <button
            onClick={() => setFilter('high_margin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'high_margin' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            🟢 Alta Margem (&ge;40%)
          </button>
          <button
            onClick={() => setFilter('low_margin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'low_margin' ? 'bg-[#FF3131] text-white shadow-xs' : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            🔴 Baixa Margem (&lt;30%)
          </button>
          <button
            onClick={() => setFilter('top_sales')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filter === 'top_sales' ? 'bg-amber-500 text-white shadow-xs' : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            ⭐ Mais Vendidos (&ge;300 un)
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs text-slate-600 min-w-[600px]">
            <thead className="bg-slate-100 text-slate-700 uppercase font-extrabold text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">PRODUTO</th>
                <th className="py-3 px-4 text-center">VENDAS (MÊS)</th>
                <th className="py-3 px-4 text-right">PREÇO UNIT.</th>
                <th className="py-3 px-4 text-right">CUSTO UNIT.</th>
                <th className="py-3 px-4 text-right">RECEITA TOTAL</th>
                <th className="py-3 px-4 text-right">LUCRO TOTAL</th>
                <th className="py-3 px-4 text-center">MARGEM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{p.name}</div>
                    <span className="text-[10px] text-slate-500 font-normal">{p.category}</span>
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-800 font-medium">{p.salesVolume} un</td>
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-900">{formatCurrency(p.price)}</td>
                  <td className="py-3.5 px-4 text-right text-[#FF3131] font-semibold">{formatCurrency(p.cost)}</td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900">{formatCurrency(p.revenue)}</td>
                  <td className="py-3.5 px-4 text-right font-black text-emerald-600">{formatCurrency(p.profit)}</td>
                  <td className="py-3.5 px-4 text-center">
                    <Badge variant={p.margin >= 40 ? 'success' : p.margin >= 30 ? 'warning' : 'danger'}>
                      {p.margin}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
