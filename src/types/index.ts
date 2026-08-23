export interface RestaurantInfo {
  name: string;
  city: string;
  state: string;
  segment: string;
  avatar: string;
}

export interface MetricData {
  label: string;
  value: string | number;
  change: number;
  isPositiveGood: boolean;
  prefix?: string;
  suffix?: string;
}

export interface FinancialEvolution {
  period: string; // e.g. 'Jan', 'Fev', etc.
  revenue: number;
  costs: number;
  profit: number;
  margin: number;
}

export interface CostDistributionItem {
  category: string;
  realCost: number;
  percentage: number;
  color: string;
}

export interface ProductItem {
  id: string;
  name: string;
  salesVolume: number;
  price: number;
  cost: number;
  revenue: number;
  totalCost: number;
  profit: number;
  margin: number;
  category: string;
  growth: number; // %
}

export interface SupplierItem {
  id: string;
  name: string;
  category: string;
  distanceKm: number;
  rating: number;
  location: string;
  priceHistory: { month: string; price: number }[];
}

export interface PriceComparisonItem {
  id: string;
  supplierId: string;
  supplierName: string;
  productName: string;
  pricePerUnit: number;
  unit: string;
  distanceKm: number;
  rating: number;
  isCheapest?: boolean;
}

export interface CollectivePurchaseItem {
  id: string;
  title: string;
  productName: string;
  individualPrice: number;
  negotiatedPrice: number;
  unit: string;
  participantsCount: number;
  currentVolume: number;
  targetVolume: number;
  totalSavings: number;
  deadlineDays: number;
  supplierName: string;
  status: 'Aberta' | 'Próxima do objetivo' | 'Confirmada' | 'Encerrada';
  participatingRestaurants: string[];
}

export interface InventoryItem {
  id: string;
  productName: string;
  currentStock: number;
  avgConsumption: number;
  waste: number;
  wasteCost: number;
  unit: string;
  status: 'normal' | 'low' | 'excess' | 'critical_waste';
}

export type PriorityType = 'high' | 'warning' | 'opportunity';

export interface OpportunityItem {
  id: string;
  priority: PriorityType;
  title: string;
  description: string;
  estimatedImpactMonthly: number;
  recommendation: string;
  category: 'price' | 'waste' | 'supplier' | 'menu';
  actionButtonText: string;
  targetLink: string;
}

export interface GeoPoint {
  id: string;
  name: string;
  category: string;
  type: 'restaurant' | 'supplier';
  lat: number;
  lng: number;
  neighborhood: string;
  clusterId?: string;
  address?: string;
}

export interface ClusterGeoData {
  id: string;
  name: string;
  insumoGroup: string;
  supplierId: string;
  supplierName: string;
  color: string;
  restaurantIds: string[];
  totalVolumeKgMonth: number;
  retailPrice: number;
  wholesalePrice: number;
  routeDistanceKm: number;
  individualFreightCost: number;
  sharedFreightCost: number;
  monthlySavingsTotal: number;
}

// === DELIVERY MODULE TYPES ===

export interface DeliveryZone {
  id: string;
  name: string;
  color: string;
  centerLat: number;
  centerLng: number;
  radiusMeters: number;
}

export interface Motoboy {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  status: 'disponivel' | 'em_rota' | 'offline';
  currentLat: number;
  currentLng: number;
  vehicleType: 'moto' | 'bicicleta';
  linkedRestaurantIds: string[];
  rating: number;
  deliveriesCompleted: number;
}

export interface DeliveryOrder {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantEmoji: string;
  customerName: string;
  customerAddress: string;
  customerLat: number;
  customerLng: number;
  zoneId: string;
  items: string;
  totalValue: number;
  status: 'pendente' | 'atribuido' | 'em_rota' | 'entregue';
  createdAt: string;
  assignedMotoboyId?: string;
}

export interface DeliveryRoute {
  id: string;
  motoboyId: string;
  motoboyName: string;
  orders: DeliveryOrder[];
  status: 'planejada' | 'em_andamento' | 'concluida';
  totalDistanceKm: number;
  estimatedTimeMin: number;
  fuelSavingsPercent: number;
  distanceSavedKm: number;
  routeCoordinates: [number, number][];
}


