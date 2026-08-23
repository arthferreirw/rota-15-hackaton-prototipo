import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { mockInventory } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { RefreshCw, Plus, Edit2, Trash2, Package } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import type { InventoryItem } from '../types';

export const InventoryPage: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  // Form State
  const [productName, setProductName] = useState('');
  const [currentStock, setCurrentStock] = useState<number>(0);
  const [avgConsumption, setAvgConsumption] = useState<number>(0);
  const [waste, setWaste] = useState<number>(0);
  const [wasteCost, setWasteCost] = useState<number>(0);
  const [unit, setUnit] = useState('kg');

  const totalWasteCost = items.reduce((acc, item) => acc + item.wasteCost, 0);

  const getCalculatedStatus = (item: InventoryItem): 'normal' | 'low' | 'critical_waste' => {
    if (item.avgConsumption > 0 && (item.waste / item.avgConsumption) > 0.15) {
      return 'critical_waste';
    }
    if (item.currentStock < (item.avgConsumption * 0.5)) {
      return 'low';
    }
    return 'normal';
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setProductName('');
    setCurrentStock(10);
    setAvgConsumption(20);
    setWaste(0);
    setWasteCost(0);
    setUnit('kg');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    setProductName(item.productName);
    setCurrentStock(item.currentStock);
    setAvgConsumption(item.avgConsumption);
    setWaste(item.waste);
    setWasteCost(item.wasteCost);
    setUnit(item.unit);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    if (editingItem) {
      setItems(prev => prev.map(item => {
        if (item.id === editingItem.id) {
          const updated = {
            ...item,
            productName,
            currentStock,
            avgConsumption,
            waste,
            wasteCost,
            unit
          };
          updated.status = getCalculatedStatus(updated);
          return updated;
        }
        return item;
      }));
    } else {
      const newItem: InventoryItem = {
        id: 'inv_' + Date.now(),
        productName,
        currentStock,
        avgConsumption,
        waste,
        wasteCost,
        unit,
        status: 'normal'
      };
      newItem.status = getCalculatedStatus(newItem);
      setItems(prev => [...prev, newItem]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#FF862F] text-sm font-semibold mb-1">
            <Package size={16} />
            <span>GESTÃO DE INSUMOS & ESTOQUE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Estoque e Controle de Desperdício
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitore níveis de estoque em tempo real e identifique descarte acima do padrão para reduzir custos operacionais.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-[#FF862F] hover:bg-[#E5721D] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-[#FF862F]/20"
        >
          <Plus size={16} />
          <span>Novo Insumo</span>
        </button>
      </div>

      {/* Hero Waste Alert Banner */}
      <Card className="bg-gradient-to-r from-white via-rose-50/40 to-white border border-[#FF3131]/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FF3131]/10 border border-[#FF3131]/20 flex items-center justify-center text-[#FF3131]">
              <RefreshCw size={24} />
            </div>
            <div>
              <span className="text-xs text-[#FF3131] font-bold uppercase tracking-wider block">
                Alerta de Perda Mensal Recalculado
              </span>
              <div className="text-2xl font-black text-slate-900 mt-0.5">
                {formatCurrency(totalWasteCost)} <span className="text-xs font-normal text-slate-500">/mês em descarte acumulado</span>
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-slate-500">
            <span className="text-slate-900 font-bold block">{items.filter(i => getCalculatedStatus(i) === 'critical_waste').length} insumo(s) com desperdício crítico</span>
            <span>Hortaliças e insumos perecíveis requerem atenção</span>
          </div>
        </div>
      </Card>

      {/* Inventory Table Card */}
      <Card className="bg-white border border-slate-200 p-0 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            Insumos Monitorados ({items.length})
          </h3>
        </div>

        <div className="overflow-x-auto border-t border-slate-200">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100 text-slate-700 uppercase font-extrabold text-[11px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">PRODUTO</th>
                <th className="py-3 px-4 text-center">ESTOQUE ATUAL</th>
                <th className="py-3 px-4 text-center">CONSUMO MÉDIO</th>
                <th className="py-3 px-4 text-center">DESPERDÍCIO (MÊS)</th>
                <th className="py-3 px-4 text-right">CUSTO PERDA</th>
                <th className="py-3 px-4 text-center">SITUAÇÃO</th>
                <th className="py-3 px-4 text-center">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {items.map((item) => {
                const status = getCalculatedStatus(item);
                return (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{item.productName}</td>
                    <td className="py-3.5 px-4 text-center text-slate-900 font-semibold">{item.currentStock} {item.unit}</td>
                    <td className="py-3.5 px-4 text-center text-slate-600 font-medium">{item.avgConsumption} {item.unit}/sem</td>
                    <td className="py-3.5 px-4 text-center text-[#FF3131] font-bold">{item.waste} {item.unit}</td>
                    <td className="py-3.5 px-4 text-right font-black text-slate-900">{formatCurrency(item.wasteCost)}</td>
                    <td className="py-3.5 px-4 text-center">
                      {status === 'critical_waste' && (
                        <Badge variant="danger">Alto Desperdício</Badge>
                      )}
                      {status === 'low' && (
                        <Badge variant="warning">Estoque Baixo</Badge>
                      )}
                      {status === 'normal' && (
                        <Badge variant="success">OK</Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all cursor-pointer border border-slate-300"
                          title="Editar"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 bg-[#FF3131]/10 hover:bg-[#FF3131]/20 text-[#FF3131] rounded-lg transition-all cursor-pointer border border-[#FF3131]/30"
                          title="Excluir"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              {editingItem ? 'Editar Insumo' : 'Adicionar Novo Insumo'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 block mb-1 font-bold">Nome do Produto</label>
                <input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-[#FF862F]"
                  placeholder="Ex: Queijo Mussarela"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Estoque Atual</label>
                  <input
                    type="number"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-[#FF862F]"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Consumo Média/Sem</label>
                  <input
                    type="number"
                    value={avgConsumption}
                    onChange={(e) => setAvgConsumption(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-[#FF862F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Desperdício (Qtd Mês)</label>
                  <input
                    type="number"
                    value={waste}
                    onChange={(e) => setWaste(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-[#FF862F]"
                  />
                </div>
                <div>
                  <label className="text-slate-600 block mb-1 font-bold">Custo Perda (R$ Mês)</label>
                  <input
                    type="number"
                    value={wasteCost}
                    onChange={(e) => setWasteCost(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-[#FF862F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 block mb-1 font-bold">Unidade de Medida</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-[#FF862F]"
                >
                  <option value="kg">Quilograma (kg)</option>
                  <option value="unid">Unidades (unid)</option>
                  <option value="pct">Pacotes (pct)</option>
                  <option value="L">Litros (L)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl cursor-pointer border border-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#FF862F] hover:bg-[#E5721D] text-white font-bold px-4 py-2 rounded-xl cursor-pointer shadow-xs"
                >
                  Salvar Insumo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
