import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { mockFinancialsMonthly } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';

export const RevenueChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockFinancialsMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF862F" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FF862F" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="period" stroke="#475569" fontSize={11} fontWeight={600} tickLine={false} />
          <YAxis stroke="#475569" fontSize={11} fontWeight={600} tickLine={false} tickFormatter={(val) => `R$${val / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px', color: '#0F172A', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            formatter={(value: any) => [formatCurrency(Number(value)), 'Faturamento']}
          />
          <Area type="monotone" dataKey="revenue" stroke="#FF862F" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ProfitChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockFinancialsMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="period" stroke="#475569" fontSize={11} fontWeight={600} tickLine={false} />
          <YAxis stroke="#475569" fontSize={11} fontWeight={600} tickLine={false} tickFormatter={(val) => `R$${val / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px', color: '#0F172A', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            formatter={(value: any) => [formatCurrency(Number(value)), 'Lucro Estimado']}
          />
          <Area type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CostChart: React.FC = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockFinancialsMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="period" stroke="#475569" fontSize={11} fontWeight={600} tickLine={false} />
          <YAxis stroke="#475569" fontSize={11} fontWeight={600} tickLine={false} tickFormatter={(val) => `R$${val / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px', color: '#0F172A', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            formatter={(value: any) => [formatCurrency(Number(value)), 'Custos Totais']}
          />
          <Line type="monotone" dataKey="costs" stroke="#FF3131" strokeWidth={3} dot={{ fill: '#FF3131', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CostDistributionChart: React.FC = () => {
  const updatedCostDistribution = [
    { name: 'Insumos (Ingredientes)', category: 'Insumos (Ingredientes)', amount: 19880, percentage: 54, color: '#FF862F' },
    { name: 'Folha de Pagamento', category: 'Folha de Pagamento', amount: 9200, percentage: 25, color: '#FF3131' },
    { name: 'Aluguel e Serviços', category: 'Aluguel e Serviços', amount: 4420, percentage: 12, color: '#2563EB' },
    { name: 'Outros Custos', category: 'Outros Custos', amount: 3320, percentage: 9, color: '#475569' },
  ];

  return (
    <div className="h-64 w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 25, left: 0 }}>
          <Pie
            data={updatedCostDistribution}
            cx="50%"
            cy="40%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="amount"
            nameKey="name"
          >
            {updatedCostDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => [formatCurrency(Number(value)), 'Valor']}
            contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', fontSize: '12px', color: '#0F172A', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            itemStyle={{ color: '#0F172A', fontWeight: 600 }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
            formatter={(value) => {
              const item = updatedCostDistribution.find(c => c.name === value || c.category === value);
              return (
                <span style={{ color: '#0F172A', fontWeight: 700 }}>
                  {value}: <span style={{ color: '#475569', fontWeight: 600 }}>{formatCurrency(item?.amount || 0)} ({item?.percentage}%)</span>
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
