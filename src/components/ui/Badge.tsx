import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'warning' | 'info' | 'success' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = ''
}) => {
  const variantStyles = {
    primary: 'bg-[#FF862F]/10 text-[#C85000] border-[#FF862F]/40 font-extrabold',
    danger: 'bg-[#FF3131]/10 text-[#D31212] border-[#FF3131]/40 font-extrabold',
    warning: 'bg-amber-100/70 text-amber-900 border-amber-300 font-extrabold',
    info: 'bg-sky-100/70 text-sky-900 border-sky-300 font-extrabold',
    success: 'bg-emerald-100/70 text-emerald-900 border-emerald-300 font-extrabold',
    neutral: 'bg-slate-100 text-slate-800 border-slate-300 font-bold'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] border transition-colors shadow-2xs ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
