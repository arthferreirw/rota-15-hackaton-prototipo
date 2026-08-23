import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  isPositiveGood?: boolean;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  isPositiveGood = true,
  prefix = '',
  suffix = '',
  icon
}) => {
  const isPositive = change ? change > 0 : false;
  const isGood = change ? (isPositiveGood ? isPositive : !isPositive) : true;

  const formattedValue = typeof value === 'number'
    ? value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    : value;

  return (
    <Card className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        {icon && (
          <div className="w-8 h-8 rounded-xl bg-[#FF862F]/10 border border-[#FF862F]/20 flex items-center justify-center text-[#FF862F]">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {prefix}{formattedValue}{suffix}
        </div>

        {change !== undefined && (
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <span className={`flex items-center gap-0.5 ${isGood ? 'text-emerald-600' : 'text-[#FF3131]'}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-slate-400 font-normal">vs. mês anterior</span>
          </div>
        )}
      </div>
    </Card>
  );
};
