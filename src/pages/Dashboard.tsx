import React, { useState } from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { SavingsIndicator } from '../components/opportunities/SavingsIndicator';
import { Card } from '../components/ui/Card';
import {
  RevenueChart,
  CostChart,
  ProfitChart,
  CostDistributionChart
} from '../components/charts/DashboardCharts';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { mockOpportunities } from '../data/mockData';
import {
  DollarSign,
  TrendingUp,
  PieChart,
  ShoppingBag,
  Receipt,
  Users2,
  Calendar
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [period, setPeriod] = useState<'semana' | 'mes' | 'personalizado'>('mes');
  const [startDate, setStartDate] = useState('2026-08-01');
  const [endDate, setEndDate] = useState('2026-08-22');

  const getMetricsByPeriod = () => {
    if (period === 'semana') {
      return {
        revenue: 12850,
        revenueChange: 4.2,
        costs: 8940,
        costsChange: 2.1,
        profit: 3910,
        profitChange: 9.5,
        margin: 30.4,
        marginChange: 1.2,
        avgTicket: 29.20,
        avgTicketChange: 2.8,
        orders: 440,
        ordersChange: 5.1
      };
    }
    if (period === 'personalizado') {
      return {
        revenue: 38400,
        revenueChange: 8.4,
        costs: 26900,
        costsChange: 5.2,
        profit: 11500,
        profitChange: 14.1,
        margin: 29.9,
        marginChange: 1.8,
        avgTicket: 28.80,
        avgTicketChange: 3.1,
        orders: 1330,
        ordersChange: 6.9
      };
    }
    return {
      revenue: 52430,
      revenueChange: 12.4,
      costs: 36820,
      costsChange: 8.2,
      profit: 15610,
      profitChange: 18.3,
      margin: 29.8,
      marginChange: 2.1,
      avgTicket: 28.50,
      avgTicketChange: 3.4,
      orders: 1840,
      ordersChange: 8.7
    };
  };

  const metrics = getMetricsByPeriod();

  return (
    <div className="space-y-6">
      {/* Header with Title and Period Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Visão Geral</h1>
          <p className="text-sm text-slate-500 mt-1">
            Plataforma de Inteligência do Restaurante <strong>Sabor & Arte</strong> (Viçosa-MG)
          </p>
        </div>

        {/* Period Selector Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 border border-slate-300 p-1 rounded-xl shadow-2xs">
          <button
            onClick={() => setPeriod('semana')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              period === 'semana'
                ? 'bg-[#FF862F] text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod('mes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              period === 'mes'
                ? 'bg-[#FF862F] text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Mês
          </button>
          <button
            onClick={() => setPeriod('personalizado')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              period === 'personalizado'
                ? 'bg-[#FF862F] text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Personalizado
          </button>
        </div>
      </div>

      {/* Date Picker Inputs if Personalizado */}
      {period === 'personalizado' && (
        <div className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-3 text-xs text-slate-600 w-fit shadow-xs">
          <Calendar size={16} className="text-[#FF862F]" />
          <span>De:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-slate-800 focus:outline-none focus:border-[#FF862F]"
          />
          <span>Até:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-slate-800 focus:outline-none focus:border-[#FF862F]"
          />
        </div>
      )}

      {/* Savings Hero Banner */}
      <SavingsIndicator totalSavingsMonthly={2170} />

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          label="Faturamento"
          value={metrics.revenue}
          change={metrics.revenueChange}
          isPositiveGood={true}
          prefix="R$ "
          icon={<DollarSign size={18} />}
        />
        <MetricCard
          label="Custos Totais"
          value={metrics.costs}
          change={metrics.costsChange}
          isPositiveGood={false}
          prefix="R$ "
          icon={<Receipt size={18} />}
        />
        <MetricCard
          label="Lucro Estimado"
          value={metrics.profit}
          change={metrics.profitChange}
          isPositiveGood={true}
          prefix="R$ "
          icon={<TrendingUp size={18} />}
        />
        <MetricCard
          label="Margem de Lucro"
          value={metrics.margin}
          change={metrics.marginChange}
          isPositiveGood={true}
          suffix="%"
          icon={<PieChart size={18} />}
        />
        <MetricCard
          label="Ticket Médio"
          value={metrics.avgTicket}
          change={metrics.avgTicketChange}
          isPositiveGood={true}
          prefix="R$ "
          icon={<ShoppingBag size={18} />}
        />
        <MetricCard
          label="Nº de Vendas"
          value={metrics.orders}
          change={metrics.ordersChange}
          isPositiveGood={true}
          icon={<Users2 size={18} />}
        />
      </div>

      {/* 2x2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Evolução do Faturamento</h3>
          <RevenueChart />
        </Card>

        <Card className="bg-white border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Evolução do Lucro</h3>
          <ProfitChart />
        </Card>

        <Card className="bg-white border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Evolução dos Custos Totais</h3>
          <CostChart />
        </Card>

        <Card className="bg-white border border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Distribuição dos Principais Custos</h3>
          <CostDistributionChart />
        </Card>
      </div>

      {/* Opportunities Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Oportunidades em Destaque</h2>
          <span className="text-xs text-slate-500">Atualizado em tempo real</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockOpportunities.slice(0, 3).map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </div>
    </div>
  );
};
