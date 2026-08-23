import type { GeoPoint, ClusterGeoData } from '../types';

export type { GeoPoint, ClusterGeoData };

// Coordenadas geoespaciais reais da região urbana de Viçosa-MG

export const vicosaCenter: [number, number] = [-20.7539, -42.8817];

export const mockGeoPoints: GeoPoint[] = [
  // Fornecedores em Viçosa
  {
    id: 'sup-1',
    name: 'Frigorífico Zona da Mata',
    category: 'Frigorífico & Carnes',
    type: 'supplier',
    lat: -20.7420,
    lng: -42.8650,
    neighborhood: 'Distrito Industrial',
    address: 'Av. Industrial, 450'
  },
  {
    id: 'sup-2',
    name: 'Hortifruti Santa Rita',
    category: 'Hortifruti & Produtores',
    type: 'supplier',
    lat: -20.7680,
    lng: -42.8910,
    neighborhood: 'Santa Rita',
    address: 'Rua Santa Rita, 120'
  },
  {
    id: 'sup-3',
    name: 'Laticínios Zona da Mata',
    category: 'Laticínios & Frios',
    type: 'supplier',
    lat: -20.7380,
    lng: -42.8710,
    neighborhood: 'Distrito Industrial II',
    address: 'Rodovia Viçosa-Coimbra km 2'
  },

  // Restaurantes do Cluster C08 (Proteínas e Carnes)
  {
    id: 'rest-1',
    name: 'Restaurante Sabor & Arte (Seu Estabelecimento)',
    category: 'Restaurante / Lanchonete',
    type: 'restaurant',
    lat: -20.7542,
    lng: -42.8821,
    neighborhood: 'Centro',
    clusterId: 'C08',
    address: 'Praça Silviano Brandão, 45'
  },
  {
    id: 'rest-2',
    name: 'Hamburgueria do Vale',
    category: 'Hamburgueria',
    type: 'restaurant',
    lat: -20.7518,
    lng: -42.8795,
    neighborhood: 'Ramos',
    clusterId: 'C08',
    address: 'Rua dos Passos, 180'
  },
  {
    id: 'rest-3',
    name: 'Varanda Grill',
    category: 'Churrascaria & Grelha',
    type: 'restaurant',
    lat: -20.7580,
    lng: -42.8850,
    neighborhood: 'Clélia Bernardes',
    clusterId: 'C08',
    address: 'Av. Santa Rita, 510'
  },
  {
    id: 'rest-4',
    name: 'Cantina do Aluno',
    category: 'Lanchonete',
    type: 'restaurant',
    lat: -20.7610,
    lng: -42.8720,
    neighborhood: 'Campus UFV',
    clusterId: 'C08',
    address: 'Vila Giannetti, casa 12'
  },
  {
    id: 'rest-5',
    name: 'Picanha & Cia',
    category: 'Churrascaria',
    type: 'restaurant',
    lat: -20.7495,
    lng: -42.8840,
    neighborhood: 'Centro',
    clusterId: 'C08',
    address: 'Rua Padre Augusto, 88'
  },
  {
    id: 'rest-6',
    name: 'Lanchonete Campus',
    category: 'Lanchonete',
    type: 'restaurant',
    lat: -20.7590,
    lng: -42.8750,
    neighborhood: 'Campus UFV',
    clusterId: 'C08',
    address: 'Av. PH Rolfs, S/N'
  },

  // Restaurantes do Cluster C05 (Massas & Pizzarias)
  {
    id: 'rest-7',
    name: 'Pizzaria Bella Viçosa',
    category: 'Pizzaria',
    type: 'restaurant',
    lat: -20.7555,
    lng: -42.8810,
    neighborhood: 'Centro',
    clusterId: 'C05',
    address: 'Rua Gomes Barbosa, 310'
  },
  {
    id: 'rest-8',
    name: 'Bistro Silvestre',
    category: 'Italiana & Massas',
    type: 'restaurant',
    lat: -20.7480,
    lng: -42.8870,
    neighborhood: 'Silvestre',
    clusterId: 'C05',
    address: 'Rua Alvarenga, 45'
  },
  {
    id: 'rest-9',
    name: 'Pastelaria Central',
    category: 'Lanchonete',
    type: 'restaurant',
    lat: -20.7530,
    lng: -42.8835,
    neighborhood: 'Centro',
    clusterId: 'C05',
    address: 'Calçadão da Arthur Bernardes, 15'
  },

  // Restaurantes do Cluster C01 (Bares e Bebidas)
  {
    id: 'rest-10',
    name: 'Bar do Chico',
    category: 'Bar',
    type: 'restaurant',
    lat: -20.7560,
    lng: -42.8780,
    neighborhood: 'Ramos',
    clusterId: 'C01',
    address: 'Rua Benevenuto, 90'
  },
  {
    id: 'rest-11',
    name: 'Boteco da Alameda',
    category: 'Bar',
    type: 'restaurant',
    lat: -20.7525,
    lng: -42.8860,
    neighborhood: 'Clélia Bernardes',
    clusterId: 'C01',
    address: 'Alameda das Acácias, 12'
  },
  {
    id: 'rest-12',
    name: 'Cervejaria 385',
    category: 'Bar & Pub',
    type: 'restaurant',
    lat: -20.7570,
    lng: -42.8800,
    neighborhood: 'Centro',
    clusterId: 'C01',
    address: 'Av. PH Rolfs, 385'
  }
];

export const mockClusterGeoData: ClusterGeoData[] = [
  {
    id: 'C08',
    name: 'Cluster C08 — Proteínas e Carnes',
    insumoGroup: 'Carne Bovina, Frango e Embutidos',
    supplierId: 'sup-1',
    supplierName: 'Frigorífico Zona da Mata',
    color: '#E85D2C', // Laranja Rota Gastronômica
    restaurantIds: ['rest-1', 'rest-2', 'rest-3', 'rest-4', 'rest-5', 'rest-6'],
    totalVolumeKgMonth: 960,
    retailPrice: 32.00,
    wholesalePrice: 27.20, // 15% de desconto
    routeDistanceKm: 14.5,
    individualFreightCost: 450.00,
    sharedFreightCost: 90.00,
    monthlySavingsTotal: 4608.00
  },
  {
    id: 'C05',
    name: 'Cluster C05 — Massas e Farináceos',
    insumoGroup: 'Queijo Mussarela, Farinha e Molhos',
    supplierId: 'sup-3',
    supplierName: 'Laticínios Zona da Mata',
    color: '#D4A72C', // Dourado
    restaurantIds: ['rest-7', 'rest-8', 'rest-9'],
    totalVolumeKgMonth: 540,
    retailPrice: 38.00,
    wholesalePrice: 31.50, // 17% de desconto
    routeDistanceKm: 18.2,
    individualFreightCost: 380.00,
    sharedFreightCost: 110.00,
    monthlySavingsTotal: 3510.00
  },
  {
    id: 'C01',
    name: 'Cluster C01 — Bebidas e Insumos de Bar',
    insumoGroup: 'Cervejas, Chopp e Destilados',
    supplierId: 'sup-2',
    supplierName: 'Hortifruti & Distribuidora Santa Rita',
    color: '#FFD60A', // Amarelo
    restaurantIds: ['rest-10', 'rest-11', 'rest-12'],
    totalVolumeKgMonth: 1200,
    retailPrice: 9.50,
    wholesalePrice: 7.80, // 18% de desconto
    routeDistanceKm: 11.8,
    individualFreightCost: 300.00,
    sharedFreightCost: 80.00,
    monthlySavingsTotal: 2040.00
  }
];
