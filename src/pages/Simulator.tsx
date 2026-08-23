import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { mockProducts } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { Calculator, TrendingUp, RefreshCw, ShoppingCart } from 'lucide-react';

export const SimulatorPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[1]); // Prato Executivo
  const [newPrice, setNewPrice] = useState(32.90);
  const [wasteReductionPercent, setWasteReductionPercent] = useState(20);
  const [supplierDiscountPercent, setSupplierDiscountPercent] = useState(10);

  // Price adjustment calculations
  const priceDiff = newPrice - selectedProduct.price;
  const priceImpactMonthly = priceDiff * selectedProduct.salesVolume;

  // Waste reduction calculations
  const currentWasteMonthly = 480; // R$ 480/mês
  const wasteSavingsMonthly = (currentWasteMonthly * wasteReductionPercent) / 100;

  // Supplier discount calculations
  const currentSupplierMonthlyCost = 19880;
  const supplierSavingsMonthly = (currentSupplierMonthlyCost * supplierDiscountPercent) / 100;

  // Combined Total Impact
  const totalCombinedImpact = priceImpactMonthly + wasteSavingsMonthly + supplierSavingsMonthly;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Simulador de Impacto Financeiro
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Simule decisões de preço, redução de desperdício e negociações antes de executá-las no restaurante.
        </p>
      </div>

      {/* Main Combined Impact Hero */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-orange-50/40 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            <Calculator size={16} />
            <span>IMPACTO TOTAL PROJETADO NO LUCRO</span>
          </div>
          <div className="text-4xl md:text-5xl font-black text-emerald-600 mt-1">
            +{formatCurrency(totalCombinedImpact)}
            <span className="text-base font-normal text-slate-500 ml-2">/mês</span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-xl font-medium">
            Resultado combinado das simulações de reajuste de preço, redução de desperdício e troca de fornecedor.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center min-w-[200px] shadow-2xs">
          <span className="text-xs text-slate-500 block font-medium">Lucro Atual Estimado</span>
          <span className="text-lg font-bold text-slate-900">R$ 15.610/mês</span>
          <span className="text-xs text-emerald-700 font-extrabold block mt-2">
            → Novo Lucro: {formatCurrency(15610 + totalCombinedImpact)}
          </span>
        </div>
      </div>

      {/* Simulator Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: Price Adjustment */}
        <Card className="flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-[#FF862F] font-extrabold text-sm mb-3">
              <TrendingUp size={18} />
              <span>1. Alteração de Preço</span>
            </div>

            <label className="text-xs font-bold text-slate-600 block mb-1">Selecione o Produto:</label>
            <select
              value={selectedProduct.id}
              onChange={(e) => {
                const prod = mockProducts.find(p => p.id === e.target.value);
                if (prod) {
                  setSelectedProduct(prod);
                  setNewPrice(prod.price * 1.1); // default 10% raise
                }
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:border-[#FF862F] mb-4"
            >
              {mockProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Atual: {formatCurrency(p.price)})
                </option>
              ))}
            </select>

            <div className="space-y-4 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">Novo Preço Desejado</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(newPrice)}</span>
                </div>
                <input
                  type="range"
                  min={selectedProduct.price * 0.8}
                  max={selectedProduct.price * 1.5}
                  step={0.50}
                  value={newPrice}
                  onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                  className="w-full accent-[#FF862F] cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Volume Mensal:</span>
                  <span className="text-slate-900 font-bold">{selectedProduct.salesVolume} unid</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Lucro Atual do Item:</span>
                  <span className="text-slate-900 font-bold">{formatCurrency(selectedProduct.profit)}/mês</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            <span className="text-xs text-emerald-800 block font-extrabold">Impacto da Alteração</span>
            <span className="text-xl font-black text-emerald-600">+{formatCurrency(priceImpactMonthly)}/mês</span>
          </div>
        </Card>

        {/* Module 2: Waste Reduction */}
        <Card className="flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm mb-3">
              <RefreshCw size={18} />
              <span>2. Redução de Desperdício</span>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-medium">
              Simule a economia ao reduzir o descarte de insumos e hortaliças no estoque.
            </p>

            <div className="space-y-4 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">Meta de Redução de Perdas</span>
                  <span className="text-slate-900 font-bold">{wasteReductionPercent}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={wasteReductionPercent}
                  onChange={(e) => setWasteReductionPercent(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Desperdício Atual:</span>
                  <span className="text-[#FF3131] font-bold">R$ 480/mês</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Economia Estimada:</span>
                  <span className="text-emerald-600 font-bold">+{formatCurrency(wasteSavingsMonthly)}/mês</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <span className="text-xs text-amber-800 block font-extrabold">Economia de Desperdício</span>
            <span className="text-xl font-black text-amber-600">+{formatCurrency(wasteSavingsMonthly)}/mês</span>
          </div>
        </Card>

        {/* Module 3: Supplier Negotiation */}
        <Card className="flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-sky-600 font-extrabold text-sm mb-3">
              <ShoppingCart size={18} />
              <span>3. Desconto de Insumos</span>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-medium">
              Simule a economia ao negociar compras em volume com fornecedores regionais.
            </p>

            <div className="space-y-4 mb-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500 font-medium">Desconto Negociado (%)</span>
                  <span className="text-slate-900 font-bold">{supplierDiscountPercent}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={1}
                  value={supplierDiscountPercent}
                  onChange={(e) => setSupplierDiscountPercent(parseInt(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Custo Atual em Insumos:</span>
                  <span className="text-slate-900 font-bold">R$ 19.880/mês</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Novo Custo Estimado:</span>
                  <span className="text-emerald-600 font-bold">{formatCurrency(currentSupplierMonthlyCost - supplierSavingsMonthly)}/mês</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-center">
            <span className="text-xs text-sky-800 block font-extrabold">Economia em Insumos</span>
            <span className="text-xl font-black text-sky-600">+{formatCurrency(supplierSavingsMonthly)}/mês</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
