import type {
  RestaurantInfo,
  FinancialEvolution,
  CostDistributionItem,
  ProductItem,
  SupplierItem,
  PriceComparisonItem,
  CollectivePurchaseItem,
  InventoryItem,
  OpportunityItem
} from '../types';

export interface MapClusterItem {
  clusterId: string;
  grupoInsumo: string;
  qtdEstabelecimentos: number;
  estabelecimentos: string[];
  economiaEstimadaMensal: number;
  descontoAtacado: number;
}

export interface OsmCategoryDistribution {
  category: string;
  count: number;
  label: string;
  color: string;
}

export const mockRestaurant: RestaurantInfo = {
  name: "Sabor & Arte",
  city: "Viçosa",
  state: "MG",
  segment: "Restaurante e Lanchonete",
  avatar: "🍽️"
};

export const mockFinancialsMonthly: FinancialEvolution[] = [
  { period: 'Mar', revenue: 46200, costs: 33800, profit: 12400, margin: 26.8 },
  { period: 'Abr', revenue: 48500, costs: 35100, profit: 13400, margin: 27.6 },
  { period: 'Mai', revenue: 49100, costs: 35900, profit: 13200, margin: 26.8 },
  { period: 'Jun', revenue: 50800, costs: 36200, profit: 14600, margin: 28.7 },
  { period: 'Jul', revenue: 51200, costs: 36500, profit: 14700, margin: 28.7 },
  { period: 'Ago', revenue: 52430, costs: 36820, profit: 15610, margin: 29.8 },
];

export const mockCostDistribution: CostDistributionItem[] = [
  { category: 'Carnes e Proteínas', realCost: 19880, percentage: 54, color: '#E85D2C' },
  { category: 'Mão de Obra da Cozinha', realCost: 9200, percentage: 25, color: '#D4A72C' },
  { category: 'Energia, Água e Gás', realCost: 4420, percentage: 12, color: '#2D6A4F' },
  { category: 'Embalagens e Insumos Variados', realCost: 3320, percentage: 9, color: '#6B7280' },
];

// 76 Estabelecimentos do OSM em Viçosa-MG
export const mockOsmCategories: OsmCategoryDistribution[] = [
  { category: 'restaurante', count: 32, label: 'Restaurantes em geral', color: '#8B0000' },
  { category: 'bares', count: 18, label: 'Bares e Botecos', color: '#FFD60A' },
  { category: 'hamburgueria', count: 10, label: 'Hamburguerias', color: '#0077B6' },
  { category: 'pizzaria', count: 4, label: 'Pizzarias', color: '#F4A300' },
  { category: 'lanchonete_fast_food', count: 4, label: 'Lanchonetes / Fast Food', color: '#0077B6' },
  { category: 'cafe_padaria', count: 4, label: 'Cafés e Padarias', color: '#B08968' },
  { category: 'japonesa', count: 2, label: 'Culinária Japonesa', color: '#E85D2C' },
  { category: 'self_service_prato_feito', count: 2, label: 'Self-Service / PF', color: '#8B0000' },
];

// Clusters de Compra Conjunta reais identificados no OSM de Viçosa
export const mockClustersOSM: MapClusterItem[] = [
  {
    clusterId: 'C08',
    grupoInsumo: 'Proteínas e Carnes (hamburgueria, churrascaria, lanchonete)',
    qtdEstabelecimentos: 12,
    estabelecimentos: [
      'Sabor & Arte', 'Hamburgueria do Vale', 'Varanda Grill', 'Picanha & Cia',
      'Cantina do Aluno', 'Lanchonete Campus', 'Burger House Viçosa', 'Esquina do Lanche',
      'Bar & Grelha Santa Rita', 'Churrascaria Viçosa', 'Taverna Burguer', 'Espetinho do Zé'
    ],
    economiaEstimadaMensal: 4608.00, // 12 * 384
    descontoAtacado: 15
  },
  {
    clusterId: 'C01',
    grupoInsumo: 'Bebidas e Insumos de Bar',
    qtdEstabelecimentos: 5,
    estabelecimentos: ['Bar do Chico', 'Boteco da Alameda', 'Cervejaria 385', 'Pub Universitário', 'Espaço Chopp'],
    economiaEstimadaMensal: 1450.00,
    descontoAtacado: 12
  },
  {
    clusterId: 'C05',
    grupoInsumo: 'Massas e Farináceos (pizzaria, italiana)',
    qtdEstabelecimentos: 5,
    estabelecimentos: ['Pizzaria Bella Viçosa', 'Bistro Silvestre', 'Pastelaria Central', 'Cantina Italiana', 'Fornaiolo'],
    economiaEstimadaMensal: 1820.00,
    descontoAtacado: 14
  },
  {
    clusterId: 'C02',
    grupoInsumo: 'Bebidas e Insumos de Bar',
    qtdEstabelecimentos: 5,
    estabelecimentos: ['Bar da Faculdade', 'Distribuidora Gelada', 'Point do Chopp', 'Espetão Bar', 'Resenha Viçosa'],
    economiaEstimadaMensal: 1320.00,
    descontoAtacado: 10
  },
  {
    clusterId: 'C04',
    grupoInsumo: 'Bebidas e Insumos de Bar',
    qtdEstabelecimentos: 3,
    estabelecimentos: ['Lounge Viçosa', 'Adega Central', 'Kiosk Calçadão'],
    economiaEstimadaMensal: 850.00,
    descontoAtacado: 10
  },
  {
    clusterId: 'C03',
    grupoInsumo: 'Bebidas e Insumos de Bar',
    qtdEstabelecimentos: 3,
    estabelecimentos: ['Bar do Zé', 'Esquina Chopp', 'Depósito Gelado'],
    economiaEstimadaMensal: 780.00,
    descontoAtacado: 10
  },
  {
    clusterId: 'C06',
    grupoInsumo: 'Padaria e Confeitaria (café/padaria)',
    qtdEstabelecimentos: 3,
    estabelecimentos: ['Panificadora Viçosa', 'Café da Praça', 'Doceria & Cia'],
    economiaEstimadaMensal: 920.00,
    descontoAtacado: 12
  },
  {
    clusterId: 'C07',
    grupoInsumo: 'Peixes e Especialidades (japonesa)',
    qtdEstabelecimentos: 2,
    estabelecimentos: ['Sushi House Viçosa', 'Oriental Express'],
    economiaEstimadaMensal: 1100.00,
    descontoAtacado: 18
  }
];

export const mockProducts: ProductItem[] = [
  {
    id: 'p1',
    name: 'X-Burger Especial',
    salesVolume: 420,
    price: 40.00,
    cost: 20.00,
    revenue: 16800,
    totalCost: 8400,
    profit: 8400,
    margin: 50.0,
    category: 'Lanches',
    growth: 31.0
  },
  {
    id: 'p2',
    name: 'Prato Executivo (PF)',
    salesVolume: 380,
    price: 30.00,
    cost: 23.15,
    revenue: 11400,
    totalCost: 8800,
    profit: 2600,
    margin: 22.8,
    category: 'Pratos Quentes',
    growth: -4.2
  },
  {
    id: 'p3',
    name: 'Lasanha à Bolonhesa',
    salesVolume: 180,
    price: 35.00,
    cost: 17.50,
    revenue: 6300,
    totalCost: 3150,
    profit: 3150,
    margin: 50.0,
    category: 'Massas',
    growth: 12.5
  },
  {
    id: 'p4',
    name: 'Suco Natural 500ml',
    salesVolume: 520,
    price: 10.00,
    cost: 3.50,
    revenue: 5200,
    totalCost: 1820,
    profit: 3380,
    margin: 65.0,
    category: 'Bebidas',
    growth: 18.2
  },
  {
    id: 'p5',
    name: 'Porção de Batata Frita',
    salesVolume: 290,
    price: 25.00,
    cost: 8.00,
    revenue: 7250,
    totalCost: 2320,
    profit: 4930,
    margin: 68.0,
    category: 'Porções',
    growth: 8.0
  },
  {
    id: 'p6',
    name: 'Sobremesa Pudim',
    salesVolume: 140,
    price: 12.00,
    cost: 4.50,
    revenue: 1680,
    totalCost: 630,
    profit: 1050,
    margin: 62.5,
    category: 'Sobremesas',
    growth: 5.1
  }
];

export const mockPriceComparisons: PriceComparisonItem[] = [
  {
    id: 'pc1',
    supplierId: 'sup1',
    supplierName: 'Hortifruti Santa Rita',
    productName: 'Tomate',
    pricePerUnit: 7.20,
    unit: 'kg',
    distanceKm: 8,
    rating: 4.8,
    isCheapest: true
  },
  {
    id: 'pc2',
    supplierId: 'sup2',
    supplierName: 'Distribuidora Zé das Frutas',
    productName: 'Tomate',
    pricePerUnit: 7.80,
    unit: 'kg',
    distanceKm: 5,
    rating: 4.6
  },
  {
    id: 'pc3',
    supplierId: 'sup3',
    supplierName: 'Mercado Central Viçosa',
    productName: 'Tomate',
    pricePerUnit: 8.90,
    unit: 'kg',
    distanceKm: 3,
    rating: 4.5
  }
];

export const mockCollectivePurchases: CollectivePurchaseItem[] = [
  {
    id: 'cp0',
    title: 'Compra Coletiva de Carne Bovina (Corte Popular)',
    productName: 'Carne Bovina (Patinho/Coxão)',
    individualPrice: 32.00,
    negotiatedPrice: 27.20,
    unit: 'kg',
    participantsCount: 12,
    currentVolume: 840,
    targetVolume: 960, // 12 * 80kg
    totalSavings: 4608, // 960kg * R$4.80 economizados
    deadlineDays: 2,
    supplierName: 'Frigorífico Zona da Mata (Cluster C08)',
    status: 'Próxima do objetivo',
    participatingRestaurants: [
      'Sabor & Arte', 'Hamburgueria do Vale', 'Varanda Grill', 'Picanha & Cia',
      'Cantina do Aluno', 'Lanchonete Campus', 'Burger House Viçosa', 'Esquina do Lanche',
      'Bar & Grelha Santa Rita', 'Churrascaria Viçosa', 'Taverna Burguer', 'Espetinho do Zé'
    ]
  },
  {
    id: 'cp1',
    title: 'Compra Coletiva de Tomate Italiano',
    productName: 'Tomate Italiano',
    individualPrice: 8.90,
    negotiatedPrice: 7.20,
    unit: 'kg',
    participantsCount: 4,
    currentVolume: 150,
    targetVolume: 200,
    totalSavings: 255,
    deadlineDays: 3,
    supplierName: 'Hortifruti Santa Rita',
    status: 'Próxima do objetivo',
    participatingRestaurants: ['Sabor & Arte', 'Restaurante Universitário Simões', 'Pizzaria Bella Viçosa', 'Cantina do Aluno']
  },
  {
    id: 'cp2',
    title: 'Compra de Queijo Mussarela em Bloco',
    productName: 'Queijo Mussarela',
    individualPrice: 38.00,
    negotiatedPrice: 31.50,
    unit: 'kg',
    participantsCount: 6,
    currentVolume: 320,
    targetVolume: 300,
    totalSavings: 2080,
    deadlineDays: 1,
    supplierName: 'Laticínios Zona da Mata (Cluster C05)',
    status: 'Confirmada',
    participatingRestaurants: ['Sabor & Arte', 'Pizzaria Bella Viçosa', 'Hamburgueria do Vale', 'Bistro Silvestre', 'Pastelaria Central', 'Varanda Grill']
  },
  {
    id: 'cp3',
    title: 'Óleo de Soja 900ml (Caixa com 24)',
    productName: 'Óleo de Soja',
    individualPrice: 7.50,
    negotiatedPrice: 5.90,
    unit: 'unid',
    participantsCount: 2,
    currentVolume: 40,
    targetVolume: 100,
    totalSavings: 160,
    deadlineDays: 5,
    supplierName: 'Atacadão Viçosa',
    status: 'Aberta',
    participatingRestaurants: ['Sabor & Arte', 'Lanchonete Campus']
  }
];

export const mockSuppliers: SupplierItem[] = [
  {
    id: 'sup1',
    name: 'Hortifruti Santa Rita',
    category: 'Hortifruti',
    distanceKm: 8,
    rating: 4.8,
    location: 'Bairro Santa Rita, Viçosa-MG',
    priceHistory: [
      { month: 'Jun', price: 7.90 },
      { month: 'Jul', price: 7.50 },
      { month: 'Ago', price: 7.20 }
    ]
  },
  {
    id: 'sup2',
    name: 'Distribuidora Zé das Frutas',
    category: 'Hortifruti',
    distanceKm: 5,
    rating: 4.6,
    location: 'Centro, Viçosa-MG',
    priceHistory: [
      { month: 'Jun', price: 8.20 },
      { month: 'Jul', price: 8.00 },
      { month: 'Ago', price: 7.80 }
    ]
  },
  {
    id: 'sup3',
    name: 'Laticínios Zona da Mata',
    category: 'Laticínios e Frios',
    distanceKm: 12,
    rating: 4.9,
    location: 'Distrito Industrial, Viçosa-MG',
    priceHistory: [
      { month: 'Jun', price: 34.00 },
      { month: 'Jul', price: 33.00 },
      { month: 'Ago', price: 31.50 }
    ]
  },
  {
    id: 'sup4',
    name: 'Atacadão Viçosa',
    category: 'Secos e Molhados',
    distanceKm: 4,
    rating: 4.4,
    location: 'Clélia Bernardes, Viçosa-MG',
    priceHistory: [
      { month: 'Jun', price: 6.20 },
      { month: 'Jul', price: 6.00 },
      { month: 'Ago', price: 5.90 }
    ]
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'inv1',
    productName: 'Tomate Italiano',
    currentStock: 42,
    avgConsumption: 35,
    waste: 2,
    wasteCost: 17.80,
    unit: 'kg',
    status: 'normal'
  },
  {
    id: 'inv2',
    productName: 'Queijo Mussarela',
    currentStock: 18,
    avgConsumption: 14,
    waste: 1,
    wasteCost: 38.00,
    unit: 'kg',
    status: 'normal'
  },
  {
    id: 'inv3',
    productName: 'Peito de Frango',
    currentStock: 8,
    avgConsumption: 21,
    waste: 0,
    wasteCost: 0,
    unit: 'kg',
    status: 'low'
  },
  {
    id: 'inv4',
    productName: 'Alface Americana',
    currentStock: 16,
    avgConsumption: 10,
    waste: 7,
    wasteCost: 480.00,
    unit: 'kg',
    status: 'critical_waste'
  }
];

export const mockOpportunities: OpportunityItem[] = [
  {
    id: 'opp0',
    priority: 'high',
    title: '🥩 Cluster C08: Economia de R$ 384/mês em Carne Bovina',
    description: 'Seu restaurante pertence ao Cluster C08 (12 estabelecimentos de proteína). Entrando na compra coletiva de carne com consumo médio de 80kg/mês, seu custo cai de R$ 32,00 para R$ 27,20/kg (15% de desconto via frigorífico).',
    estimatedImpactMonthly: 384,
    recommendation: 'Confirmar participação na Compra Coletiva do Cluster C08.',
    category: 'supplier',
    actionButtonText: 'Ver Compra Coletiva',
    targetLink: '/compra-coletiva'
  },
  {
    id: 'opp1',
    priority: 'high',
    title: '🔴 Prato Executivo possui baixa margem',
    description: 'O produto representa 23% das vendas totais do restaurante, porém sua margem de lucro está em apenas 22,8% devido ao aumento recente no custo dos insumos.',
    estimatedImpactMonthly: 1140,
    recommendation: 'Ajustar o preço de venda de R$ 29,90 para R$ 32,90 ou renegociar os insumos da proteína principal com fornecedores parceiros.',
    category: 'price',
    actionButtonText: 'Simular reajuste',
    targetLink: '/simulador'
  },
  {
    id: 'opp2',
    priority: 'warning',
    title: '🟡 Desperdício de hortaliças acima do esperado',
    description: 'O consumo e descarte não planejado de alface e folhosas está 22% acima do padrão médio praticado na região de Viçosa.',
    estimatedImpactMonthly: 480,
    recommendation: 'Ajustar o lote de compra semanal com entregas fracionadas e utilizar previsão preditiva de consumo.',
    category: 'waste',
    actionButtonText: 'Ver estoque',
    targetLink: '/estoque'
  },
  {
    id: 'opp3',
    priority: 'opportunity',
    title: '🟢 X-Burger possui alta margem e crescimento acelerado',
    description: 'Produto de destaque com 50% de margem e crescimento de 31% nas vendas no último mês.',
    estimatedImpactMonthly: 850,
    recommendation: 'Destacar o X-Burger no topo do cardápio físico/digital e criar combos promocionais com bebidas de margem >60%.',
    category: 'menu',
    actionButtonText: 'Ver rentabilidade',
    targetLink: '/rentabilidade'
  }
];
