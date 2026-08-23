import React from 'react';
import { OpportunityCard } from '../components/opportunities/OpportunityCard';
import { AiChatbot } from '../components/ai/AiChatbot';
import { mockOpportunities } from '../data/mockData';
import { Sparkles, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const OpportunitiesPage: React.FC = () => {
  const highPriority = mockOpportunities.filter(o => o.priority === 'high');
  const warningPriority = mockOpportunities.filter(o => o.priority === 'warning');
  const opportunityPriority = mockOpportunities.filter(o => o.priority === 'opportunity');

  const totalPotential = mockOpportunities.reduce((acc, o) => acc + o.estimatedImpactMonthly, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#FF862F] text-sm font-semibold mb-1">
          <Sparkles size={16} />
          <span>AGENTE DE INTELIGÊNCIA ARTIFICIAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Oportunidades & Assistente IA
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Análise preditiva em tempo real sobre vazamentos de receita, oportunidades de insumos e assistência conversacional.
        </p>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-orange-50/40 border border-emerald-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Potencial Total de Geração de Caixa Adicional
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1">
            +{formatCurrency(totalPotential)}<span className="text-sm font-normal text-slate-500"> /mês</span>
          </div>
        </div>

        <div className="text-right sm:text-right text-xs text-slate-500">
          <span className="text-slate-900 font-bold block">{mockOpportunities.length} diagnósticos mapeados</span>
          <span>Prontos para execução imediata no restaurante</span>
        </div>
      </div>

      {/* Main Grid: Left Opportunities / Right Chatbot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Opportunities Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* High Priority */}
          {highPriority.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-600 text-sm font-bold">
                <AlertCircle size={18} />
                <span>Alta Prioridade (Ação Necessária)</span>
              </div>
              <div className="space-y-3">
                {highPriority.map(opp => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            </div>
          )}

          {/* Warning Priority */}
          {warningPriority.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600 text-sm font-bold">
                <AlertTriangle size={18} />
                <span>Atenção (Perda de Eficiência)</span>
              </div>
              <div className="space-y-3">
                {warningPriority.map(opp => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            </div>
          )}

          {/* Growth Opportunities */}
          {opportunityPriority.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                <CheckCircle2 size={18} />
                <span>Oportunidades de Crescimento</span>
              </div>
              <div className="space-y-3">
                {opportunityPriority.map(opp => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Chatbot (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-6">
            <AiChatbot />
          </div>
        </div>
      </div>
    </div>
  );
};
