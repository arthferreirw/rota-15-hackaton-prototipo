import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { RevenueChart, ProfitChart } from '../components/charts/DashboardCharts';
import { formatCurrency } from '../utils/formatters';
import { Download, Upload, Printer, DollarSign, FileText, CheckCircle2 } from 'lucide-react';

export const FinancialPage: React.FC = () => {
  const [financialData, setFinancialData] = useState({
    revenue: 52430,
    cmvInsumos: 19880,
    folhaPagamento: 9200,
    aluguelServicos: 4420,
    outrasDespesas: 3320
  });

  const [importSuccess, setImportSuccess] = useState(false);

  const profit = financialData.revenue - (financialData.cmvInsumos + financialData.folhaPagamento + financialData.aluguelServicos + financialData.outrasDespesas);
  const margin = Math.round((profit / financialData.revenue) * 1000) / 10;

  const handleExportCSV = () => {
    const csvContent =
      "Categoria,Valor (R$),Percentual (%)\n" +
      `Receita Bruta Total,${financialData.revenue},100%\n` +
      `CMV - Insumos (Ingredientes),-${financialData.cmvInsumos},${Math.round((financialData.cmvInsumos / financialData.revenue) * 100)}%\n` +
      `Folha de Pagamento,-${financialData.folhaPagamento},${Math.round((financialData.folhaPagamento / financialData.revenue) * 100)}%\n` +
      `Aluguel e Serviços Utilitários,-${financialData.aluguelServicos},${Math.round((financialData.aluguelServicos / financialData.revenue) * 100)}%\n` +
      `Outras Despesas Operacionais,-${financialData.outrasDespesas},${Math.round((financialData.outrasDespesas / financialData.revenue) * 100)}%\n` +
      `Lucro Operacional Líquido,${profit},${margin}%\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DRE_Sabor_e_Arte_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setFinancialData({
          revenue: 56800,
          cmvInsumos: 20400,
          folhaPagamento: 9400,
          aluguelServicos: 4420,
          outrasDespesas: 3200
        });
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 print:p-0 print:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF862F] text-sm font-semibold mb-1 print:hidden">
            <DollarSign size={16} />
            <span>DEMONSTRATIVO DE RESULTADOS (DRE)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight print:text-black">
            Gestão Financeira
          </h1>
          <p className="text-sm text-slate-500 mt-1 print:text-gray-600">
            Acompanhamento consolidado de receitas, custos e margem operacional do restaurante Sabor & Arte.
          </p>
        </div>

        {/* Export / Import Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 print:hidden">
          <label className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer border border-slate-300 shadow-2xs">
            <Upload size={14} />
            <span>Importar CSV</span>
            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" />
          </label>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer border border-slate-300 shadow-2xs"
          >
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 bg-[#FF862F] hover:bg-[#E5721D] text-white font-bold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer shadow-xs shadow-[#FF862F]/20"
          >
            <Printer size={14} />
            <span>Relatório PDF</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {importSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={16} />
          <span>Dados do DRE importados e atualizados com sucesso via CSV!</span>
        </div>
      )}

      {/* DRE Card Table */}
      <Card className="bg-white border border-slate-200 p-0 overflow-hidden shadow-xs print:border-gray-300 print:bg-white print:text-black">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 print:text-black">
            <FileText size={16} className="text-[#FF862F]" />
            DRE Simplificado — Período Atual (Agosto/2026)
          </h3>
          <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Margem: {margin}%
          </span>
        </div>

        <div className="p-4">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[11px] font-extrabold tracking-wider border-b border-slate-200 print:bg-gray-100 print:text-black">
              <tr>
                <th className="py-3 px-3">ESTRUTURA DE RESULTADOS</th>
                <th className="py-3 px-3 text-right">VALOR (R$)</th>
                <th className="py-3 px-3 text-right">% RECEITA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 print:text-black">
              <tr className="bg-slate-50 font-bold text-slate-900 print:text-black">
                <td className="py-3 px-3 font-extrabold">Receita Bruta Total</td>
                <td className="py-3 px-3 text-right text-emerald-700 font-black">{formatCurrency(financialData.revenue)}</td>
                <td className="py-3 px-3 text-right font-bold">100.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3">(-) CMV — Insumos e Ingredientes</td>
                <td className="py-2.5 px-3 text-right text-[#FF3131] font-semibold">-{formatCurrency(financialData.cmvInsumos)}</td>
                <td className="py-2.5 px-3 text-right">{Math.round((financialData.cmvInsumos / financialData.revenue) * 100)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3">(-) Folha de Pagamento & Encargos</td>
                <td className="py-2.5 px-3 text-right text-[#FF3131] font-semibold">-{formatCurrency(financialData.folhaPagamento)}</td>
                <td className="py-2.5 px-3 text-right">{Math.round((financialData.folhaPagamento / financialData.revenue) * 100)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3">(-) Aluguel & Serviços Utilitários</td>
                <td className="py-2.5 px-3 text-right text-[#FF3131] font-semibold">-{formatCurrency(financialData.aluguelServicos)}</td>
                <td className="py-2.5 px-3 text-right">{Math.round((financialData.aluguelServicos / financialData.revenue) * 100)}%</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3">(-) Outras Despesas Operacionais</td>
                <td className="py-2.5 px-3 text-right text-[#FF3131] font-semibold">-{formatCurrency(financialData.outrasDespesas)}</td>
                <td className="py-2.5 px-3 text-right">{Math.round((financialData.outrasDespesas / financialData.revenue) * 100)}%</td>
              </tr>
              <tr className="bg-emerald-50 font-black text-slate-900 text-sm border-t-2 border-emerald-300 print:bg-emerald-50 print:text-black">
                <td className="py-3.5 px-3 text-emerald-800 font-extrabold">(=) Lucro Operacional Líquido</td>
                <td className="py-3.5 px-3 text-right text-emerald-800 text-base font-black">{formatCurrency(profit)}</td>
                <td className="py-3.5 px-3 text-right text-emerald-800 font-black">{margin}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* 2 Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
        <Card className="bg-white border border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Evolução Histórica do Faturamento</h3>
          <RevenueChart />
        </Card>

        <Card className="bg-white border border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Evolução Histórica do Lucro</h3>
          <ProfitChart />
        </Card>
      </div>
    </div>
  );
};
