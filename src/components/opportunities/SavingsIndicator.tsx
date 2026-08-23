import React from 'react';
import { Card } from '../ui/Card';
import { Sparkles, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';

interface SavingsIndicatorProps {
  totalSavingsMonthly: number;
}

export const SavingsIndicator: React.FC<SavingsIndicatorProps> = ({ totalSavingsMonthly }) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-white border border-[#FF862F]/30 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FF862F]/10 border border-[#FF862F]/20 flex items-center justify-center text-[#FF862F]">
            <Sparkles size={24} />
          </div>
          <div>
            <span className="text-xs font-bold text-[#FF862F] uppercase tracking-wider block">
              POTENCIAL ESTIMADO DE ECONOMIA
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              +{formatCurrency(totalSavingsMonthly)}
              <span className="text-xs font-normal text-slate-500"> /mês em caixa</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/oportunidades')}
          className="flex items-center gap-2 bg-[#FF862F] hover:bg-[#E5721D] text-white font-bold text-xs px-4 py-3 rounded-xl transition-all cursor-pointer shadow-xs shadow-[#FF862F]/20"
        >
          <span>Ver 3 Oportunidades Mapeadas</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </Card>
  );
};
