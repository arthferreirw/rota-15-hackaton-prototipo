import type { DeliveryZone, Motoboy, DeliveryOrder, DeliveryRoute } from '../types';

export const mockDeliveryZones: DeliveryZone[] = [
  {
    id: 'zone-centro',
    name: 'Centro',
    color: '#FF862F', // Laranja
    centerLat: -20.7540,
    centerLng: -42.8820,
    radiusMeters: 450
  },
  {
    id: 'zone-ramos',
    name: 'Ramos',
    color: '#3B82F6', // Azul
    centerLat: -20.7518,
    centerLng: -42.8795,
    radiusMeters: 400
  },
  {
    id: 'zone-ufv',
    name: 'Campus UFV',
    color: '#10B981', // Verde
    centerLat: -20.7600,
    centerLng: -42.8735,
    radiusMeters: 550
  },
  {
    id: 'zone-clelia',
    name: 'Clélia Bernardes',
    color: '#8B5CF6', // Roxo
    centerLat: -20.7565,
    centerLng: -42.8855,
    radiusMeters: 450
  },
  {
    id: 'zone-silvestre',
    name: 'Silvestre',
    color: '#F59E0B', // Âmbar
    centerLat: -20.7480,
    centerLng: -42.8870,
    radiusMeters: 500
  },
  {
    id: 'zone-santarita',
    name: 'Santa Rita',
    color: '#EC4899', // Rosa
    centerLat: -20.7660,
    centerLng: -42.8900,
    radiusMeters: 500
  }
];

export const mockMotoboys: Motoboy[] = [
  {
    id: 'mb-1',
    name: 'Carlos Oliveira',
    phone: '(31) 99876-5432',
    avatar: '🏍️',
    status: 'disponivel',
    currentLat: -20.7535,
    currentLng: -42.8815,
    vehicleType: 'moto',
    linkedRestaurantIds: ['rest-1', 'rest-2', 'rest-7', 'rest-9'], // Sabor & Arte, Hamburgueria do Vale, Pizzaria Bella, Pastelaria Central
    rating: 4.9,
    deliveriesCompleted: 1420
  },
  {
    id: 'mb-2',
    name: 'Lucas Mendes',
    phone: '(31) 99123-4567',
    avatar: '🛵',
    status: 'em_rota',
    currentLat: -20.7595,
    currentLng: -42.8740,
    vehicleType: 'moto',
    linkedRestaurantIds: ['rest-1', 'rest-4', 'rest-6'], // Sabor & Arte, Cantina do Aluno, Lanchonete Campus
    rating: 4.8,
    deliveriesCompleted: 980
  },
  {
    id: 'mb-3',
    name: 'Mateus Silva',
    phone: '(31) 98765-4321',
    avatar: '🚴‍♂️',
    status: 'disponivel',
    currentLat: -20.7550,
    currentLng: -42.8840,
    vehicleType: 'bicicleta',
    linkedRestaurantIds: ['rest-2', 'rest-7', 'rest-12'], // Hamburgueria do Vale, Pizzaria Bella, Cervejaria 385
    rating: 4.7,
    deliveriesCompleted: 640
  },
  {
    id: 'mb-4',
    name: 'Fernanda Costa',
    phone: '(31) 99456-7890',
    avatar: '🏍️',
    status: 'offline',
    currentLat: -20.7490,
    currentLng: -42.8830,
    vehicleType: 'moto',
    linkedRestaurantIds: ['rest-1', 'rest-3', 'rest-8'], // Sabor & Arte, Varanda Grill, Bistro Silvestre
    rating: 4.95,
    deliveriesCompleted: 1850
  }
];

export const mockDeliveryOrders: DeliveryOrder[] = [
  // Pedidos no CENTRO (restaurantes variados)
  {
    id: 'ped-101',
    restaurantId: 'rest-1',
    restaurantName: 'Sabor & Arte',
    restaurantEmoji: '🍽️',
    customerName: 'Ana Beatriz Souza',
    customerAddress: 'Rua Senador Vaz de Melo, 112 - Ap 302',
    customerLat: -20.7548,
    customerLng: -42.8825,
    zoneId: 'zone-centro',
    items: '1x Prato Executivo Bife, 1x Suco de Laranja',
    totalValue: 38.90,
    status: 'pendente',
    createdAt: '10 min atrás'
  },
  {
    id: 'ped-102',
    restaurantId: 'rest-7',
    restaurantName: 'Pizzaria Bella Viçosa',
    restaurantEmoji: '🍕',
    customerName: 'Gabriel Resende',
    customerAddress: 'Praça do Rosário, 45',
    customerLat: -20.7552,
    customerLng: -42.8812,
    zoneId: 'zone-centro',
    items: '1x Pizza Calabrês Média, 1x Guaraná 2L',
    totalValue: 64.00,
    status: 'pendente',
    createdAt: '8 min atrás'
  },
  {
    id: 'ped-103',
    restaurantId: 'rest-2',
    restaurantName: 'Hamburgueria do Vale',
    restaurantEmoji: '🍔',
    customerName: 'Juliana Lima',
    customerAddress: 'Rua Pouso Alegre, 89',
    customerLat: -20.7538,
    customerLng: -42.8832,
    zoneId: 'zone-centro',
    items: '2x Smash Burger Bacon, 1x Batata Rústica',
    totalValue: 52.50,
    status: 'pendente',
    createdAt: '5 min atrás'
  },

  // Pedidos na UFV (Campus) - restaurantes variados
  {
    id: 'ped-104',
    restaurantId: 'rest-1',
    restaurantName: 'Sabor & Arte',
    restaurantEmoji: '🍽️',
    customerName: 'Rodrigo Fonseca (UFV)',
    customerAddress: 'Alojamento Pos-Graduação, Bloco B',
    customerLat: -20.7615,
    customerLng: -42.8730,
    zoneId: 'zone-ufv',
    items: '1x Marmita Fitness Frango, 1x Água de Coco',
    totalValue: 29.00,
    status: 'em_rota',
    assignedMotoboyId: 'mb-2',
    createdAt: '15 min atrás'
  },
  {
    id: 'ped-105',
    restaurantId: 'rest-4',
    restaurantName: 'Cantina do Aluno',
    restaurantEmoji: '🥪',
    customerName: 'Camila Duarte (UFV)',
    customerAddress: 'Departamento de Informática (DPI)',
    customerLat: -20.7598,
    customerLng: -42.8718,
    zoneId: 'zone-ufv',
    items: '3x Salgados Assados, 2x Refrigerante Lata',
    totalValue: 31.50,
    status: 'em_rota',
    assignedMotoboyId: 'mb-2',
    createdAt: '12 min atrás'
  },
  {
    id: 'ped-106',
    restaurantId: 'rest-9',
    restaurantName: 'Pastelaria Central',
    restaurantEmoji: '🥟',
    customerName: 'Thiago Alvarenga',
    customerAddress: 'Vila Giannetti, Casa 28',
    customerLat: -20.7622,
    customerLng: -42.8745,
    zoneId: 'zone-ufv',
    items: '2x Pastel Especial Carne, 1x Caldo de Cana',
    totalValue: 26.00,
    status: 'pendente',
    createdAt: '4 min atrás'
  },

  // Pedidos no RAMOS
  {
    id: 'ped-107',
    restaurantId: 'rest-2',
    restaurantName: 'Hamburgueria do Vale',
    restaurantEmoji: '🍔',
    customerName: 'Marcos Vinícius',
    customerAddress: 'Rua dos Passos, 310',
    customerLat: -20.7512,
    customerLng: -42.8790,
    zoneId: 'zone-ramos',
    items: '1x Monster Burger 200g, 1x Milkshake Chocolate',
    totalValue: 48.00,
    status: 'pendente',
    createdAt: '14 min atrás'
  },
  {
    id: 'ped-108',
    restaurantId: 'rest-1',
    restaurantName: 'Sabor & Arte',
    restaurantEmoji: '🍽️',
    customerName: 'Patrícia Xavier',
    customerAddress: 'Rua Benevenuto, 142',
    customerLat: -20.7524,
    customerLng: -42.8802,
    zoneId: 'zone-ramos',
    items: '1x Executivo Feijoada Completa',
    totalValue: 34.90,
    status: 'pendente',
    createdAt: '9 min atrás'
  },

  // Pedidos no CLÉLIA BERNARDES
  {
    id: 'ped-109',
    restaurantId: 'rest-7',
    restaurantName: 'Pizzaria Bella Viçosa',
    restaurantEmoji: '🍕',
    customerName: 'Fernando Henrique',
    customerAddress: 'Av. Santa Rita, 780 - Ed. Monte Verde',
    customerLat: -20.7572,
    customerLng: -42.8860,
    zoneId: 'zone-clelia',
    items: '1x Pizza Quatro Queijos Grande',
    totalValue: 72.00,
    status: 'pendente',
    createdAt: '18 min atrás'
  },
  {
    id: 'ped-110',
    restaurantId: 'rest-1',
    restaurantName: 'Sabor & Arte',
    restaurantEmoji: '🍽️',
    customerName: 'Larissa Peixoto',
    customerAddress: 'Alameda das Acácias, 95',
    customerLat: -20.7558,
    customerLng: -42.8848,
    zoneId: 'zone-clelia',
    items: '2x Filé à Parmegiana, 1x Vinho da Casa',
    totalValue: 98.00,
    status: 'pendente',
    createdAt: '11 min atrás'
  },

  // Pedidos em SILVESTRE
  {
    id: 'ped-111',
    restaurantId: 'rest-7',
    restaurantName: 'Pizzaria Bella Viçosa',
    restaurantEmoji: '🍕',
    customerName: 'Eduardo Castro',
    customerAddress: 'Rua Alvarenga, 210',
    customerLat: -20.7475,
    customerLng: -42.8865,
    zoneId: 'zone-silvestre',
    items: '1x Calzone Frango Catupiry',
    totalValue: 42.00,
    status: 'pendente',
    createdAt: '16 min atrás'
  },
  {
    id: 'ped-112',
    restaurantId: 'rest-9',
    restaurantName: 'Pastelaria Central',
    restaurantEmoji: '🥟',
    customerName: 'Beatriz Martins',
    customerAddress: 'Rua Silvestre, 88',
    customerLat: -20.7488,
    customerLng: -42.8878,
    zoneId: 'zone-silvestre',
    items: '4x Pastéis Variados, 2x Refrigerante 600ml',
    totalValue: 39.00,
    status: 'pendente',
    createdAt: '3 min atrás'
  }
];

export const mockDeliveryRoutes: DeliveryRoute[] = [
  {
    id: 'route-active-1',
    motoboyId: 'mb-2',
    motoboyName: 'Lucas Mendes',
    orders: [
      mockDeliveryOrders[3], // ped-104 (Sabor & Arte -> UFV)
      mockDeliveryOrders[4]  // ped-105 (Cantina do Aluno -> UFV)
    ],
    status: 'em_andamento',
    totalDistanceKm: 3.4,
    estimatedTimeMin: 14,
    fuelSavingsPercent: 42,
    distanceSavedKm: 2.5,
    routeCoordinates: [
      [-20.7542, -42.8821], // Rest Sabor & Arte
      [-20.7610, -42.8720], // Rest Cantina do Aluno
      [-20.7598, -42.8718], // Cliente UFV 1
      [-20.7615, -42.8730]  // Cliente UFV 2
    ]
  }
];
