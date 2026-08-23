import React from 'react';
import { Card } from '../ui/Card';
import type { OpportunityItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { ArrowRight, AlertCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';

interface OpportunityCardProps {
  opportunity: OpportunityItem;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const navigate = useNavigate();

  const getPriorityTheme = () => {
    switch (opportunity.priority) {
      case 'high':
        return {
          border: 'border-[#FF3131]/30',
          bg: 'bg-white',
          icon: <AlertCircle size={18} className="text-[#FF3131]" />,
          badgeVariant: 'danger' as const,
          badgeLabel: 'ALTA PRIORIDADE'
        };
      case 'warning':
        return {
          border: 'border-amber-400/40',
          bg: 'bg-white',
          icon: <AlertTriangle size={18} className="text-amber-500" />,
          badgeVariant: 'warning' as const,
          badgeLabel: 'ATENÇÃO'
        };
      case 'opportunity':
        return {
          border: 'border-[#FF862F]/30',
          bg: 'bg-white',
          icon: <Sparkles size={18} className="text-[#FF862F]" />,
          badgeVariant: 'primary' as const,
          badgeLabel: 'OPORTUNIDADE'
        };
    }
  };

  const theme = getPriorityTheme();

  return (
    <Card className={`border ${theme.border} ${theme.bg} space-y-4 flex flex-col justify-between h-full shadow-xs`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant={theme.badgeVariant}>{theme.badgeLabel}</Badge>
          <div className="text-xs font-black text-[#FF862F]">
            +{formatCurrency(opportunity.estimatedImpactMonthly)}/mês
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2 leading-snug">
          {theme.icon}
          <span>{opportunity.title}</span>
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {opportunity.description}
        </p>

        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs space-y-1">
          <span className="text-slate-500 font-bold block uppercase text-[10px]">Recomendação Prática</span>
          <span className="text-slate-800 font-medium">{opportunity.recommendation}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(opportunity.targetLink)}
        className="w-full py-2.5 bg-[#FF862F] hover:bg-[#E5721D] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
      >
        <span>{opportunity.actionButtonText}</span>
        <ArrowRight size={14} />
      </button>
    </Card>
  );
};
