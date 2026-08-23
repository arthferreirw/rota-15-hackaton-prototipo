import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { OpportunitiesPage } from './pages/Opportunities';
import { ProfitabilityPage } from './pages/Profitability';
import { PriceComparePage } from './pages/PriceCompare';
import { CollectivePurchasePage } from './pages/CollectivePurchase';
import { SimulatorPage } from './pages/Simulator';
import { InventoryPage } from './pages/Inventory';
import { SuppliersPage } from './pages/Suppliers';
import { MapaVicosaPage } from './pages/MapaVicosa';
import { DeliveryMapPage } from './pages/DeliveryMapPage';
import { FinancialPage } from './pages/Financial';
import { SettingsPage } from './pages/Settings';
import { LoginPage } from './pages/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected App Routes */}
        <Route
          path="/*"
          element={
            <AppLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/oportunidades" element={<OpportunitiesPage />} />
                <Route path="/rentabilidade" element={<ProfitabilityPage />} />
                <Route path="/comparar-precos" element={<PriceComparePage />} />
                <Route path="/compra-coletiva" element={<CollectivePurchasePage />} />
                <Route path="/simulador" element={<SimulatorPage />} />
                <Route path="/estoque" element={<InventoryPage />} />
                <Route path="/fornecedores" element={<SuppliersPage />} />
                <Route path="/mapa" element={<MapaVicosaPage />} />
                <Route path="/delivery" element={<DeliveryMapPage />} />
                <Route path="/financeiro" element={<FinancialPage />} />
                <Route path="/configuracoes" element={<SettingsPage />} />
              </Routes>
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
