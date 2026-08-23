import type { PriceComparisonItem } from '../types';

export const mockExpandedPriceComparisons: PriceComparisonItem[] = [
  // Tomate Italiano
  { id: 'pc1', supplierId: 'sup1', supplierName: 'Hortifruti Santa Rita', productName: 'Tomate Italiano', pricePerUnit: 7.20, unit: 'kg', distanceKm: 8, rating: 4.8, isCheapest: true },
  { id: 'pc2', supplierId: 'sup2', supplierName: 'Distribuidora Zé das Frutas', productName: 'Tomate Italiano', pricePerUnit: 7.80, unit: 'kg', distanceKm: 5, rating: 4.6 },
  { id: 'pc3', supplierId: 'sup3', supplierName: 'Mercado Central Viçosa', productName: 'Tomate Italiano', pricePerUnit: 8.90, unit: 'kg', distanceKm: 3, rating: 4.5 },

  // Carne Bovina Patinho
  { id: 'pc4', supplierId: 'sup4', supplierName: 'Frigorífico Zona da Mata (Cluster C08)', productName: 'Carne Bovina (Patinho/Coxão)', pricePerUnit: 27.20, unit: 'kg', distanceKm: 14, rating: 4.9, isCheapest: true },
  { id: 'pc5', supplierId: 'sup5', supplierName: 'Açougue Central Viçosa', productName: 'Carne Bovina (Patinho/Coxão)', pricePerUnit: 32.00, unit: 'kg', distanceKm: 2, rating: 4.5 },
  { id: 'pc6', supplierId: 'sup6', supplierName: 'Atacadão Viçosa', productName: 'Carne Bovina (Patinho/Coxão)', pricePerUnit: 34.50, unit: 'kg', distanceKm: 4, rating: 4.3 },

  // Queijo Mussarela
  { id: 'pc7', supplierId: 'sup7', supplierName: 'Laticínios Zona da Mata (Cluster C05)', productName: 'Queijo Mussarela em Bloco', pricePerUnit: 31.50, unit: 'kg', distanceKm: 12, rating: 4.9, isCheapest: true },
  { id: 'pc8', supplierId: 'sup6', supplierName: 'Atacadão Viçosa', productName: 'Queijo Mussarela em Bloco', pricePerUnit: 38.00, unit: 'kg', distanceKm: 4, rating: 4.4 },
  { id: 'pc9', supplierId: 'sup8', supplierName: 'Distribuidora Laticínios São João', productName: 'Queijo Mussarela em Bloco', pricePerUnit: 41.00, unit: 'kg', distanceKm: 9, rating: 4.2 },

  // Alface Americana
  { id: 'pc10', supplierId: 'sup1', supplierName: 'Hortifruti Santa Rita', productName: 'Alface Americana', pricePerUnit: 4.50, unit: 'kg', distanceKm: 8, rating: 4.8, isCheapest: true },
  { id: 'pc11', supplierId: 'sup9', supplierName: 'Feira dos Produtores de Viçosa', productName: 'Alface Americana', pricePerUnit: 5.50, unit: 'kg', distanceKm: 1, rating: 4.7 },

  // Óleo de Soja 900ml
  { id: 'pc12', supplierId: 'sup6', supplierName: 'Atacadão Viçosa', productName: 'Óleo de Soja 900ml', pricePerUnit: 5.90, unit: 'unid', distanceKm: 4, rating: 4.4, isCheapest: true },
  { id: 'pc13', supplierId: 'sup3', supplierName: 'Mercado Central Viçosa', productName: 'Óleo de Soja 900ml', pricePerUnit: 7.50, unit: 'unid', distanceKm: 3, rating: 4.5 },

  // Arroz Tipo 1 5kg
  { id: 'pc14', supplierId: 'sup6', supplierName: 'Atacadão Viçosa', productName: 'Arroz Tipo 1 5kg', pricePerUnit: 22.90, unit: 'pct', distanceKm: 4, rating: 4.4, isCheapest: true },
  { id: 'pc15', supplierId: 'sup10', supplierName: 'Distribuidora ABC Viçosa', productName: 'Arroz Tipo 1 5kg', pricePerUnit: 26.50, unit: 'pct', distanceKm: 6, rating: 4.3 },

  // Farinha de Trigo 1kg
  { id: 'pc16', supplierId: 'sup6', supplierName: 'Atacadão Viçosa', productName: 'Farinha de Trigo Especial 1kg', pricePerUnit: 5.50, unit: 'kg', distanceKm: 4, rating: 4.4, isCheapest: true },
  { id: 'pc17', supplierId: 'sup10', supplierName: 'Distribuidora ABC Viçosa', productName: 'Farinha de Trigo Especial 1kg', pricePerUnit: 6.80, unit: 'kg', distanceKm: 6, rating: 4.3 },

  // Peito de Frango Desossado
  { id: 'pc18', supplierId: 'sup4', supplierName: 'Frigorífico Zona da Mata', productName: 'Peito de Frango Desossado', pricePerUnit: 15.90, unit: 'kg', distanceKm: 14, rating: 4.9, isCheapest: true },
  { id: 'pc19', supplierId: 'sup5', supplierName: 'Açougue Central Viçosa', productName: 'Peito de Frango Desossado', pricePerUnit: 19.50, unit: 'kg', distanceKm: 2, rating: 4.5 }
];
