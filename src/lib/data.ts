import { promises as fs } from 'fs';
import path from 'path';

export type Dealer = {
  id: string;
  name: string;
  city?: string;
  sourceId: string;
};

export type Brand = {
  id: string;
  name: string;
  logo?: string;
};

export type Source = {
  id: string;
  name: string;
};

export type Offer = {
  id: string;
  dealerId: string;
  sourceId: string;
  brandId: string;
  modelo?: string;
  motorizacion?: string;
  cambio?: string;
  acabatetapiceria?: string;
  color?: string;
  kms?: number | null;
  pvp?: number | null;
  descuento?: number | null;
  base_imponible?: number | null;
  iva?: number | null;
  iem?: number | null;
  total_contado?: number | null;
  total_financiado?: number | null;
  matriculacion?: number | null;
  otros_costes?: number | null;
  opciones?: { nombre: string; precio: number }[];
  mantenimiento?: string | null;
  enlace?: string | null;
  notas?: string | null;
  etiqueta?: string | null;
  consumo_l_100?: string | number | null;
  ruedas?: string | null;
  caracteristicas?: string | null;
  potencia_cv?: number | null;
  foto?: string | null;
  contacto?: { nombre?: string; telefono?: string; email?: string };
};

export type OfferWithRefs = Offer & {
  dealer?: Dealer;
  brand?: Brand;
  source?: Source;
  hidden?: boolean;
};

async function readJSON<T>(relative: string): Promise<T> {
  const filePath = path.resolve(relative);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function getOffers(): Promise<OfferWithRefs[]> {
  const [offers, dealers, brands, sources, hidden] = await Promise.all([
    readJSON<Offer[]>('data/offers.json'),
    readJSON<Dealer[]>('data/dealers.json'),
    readJSON<Brand[]>('data/brands.json'),
    readJSON<Source[]>('data/sources.json'),
    readJSON<string[]>('data/hidden.json').catch(() => [])
  ]);

  const dealerById = new Map<string, Dealer>(dealers.map((d) => [d.id, d]));
  const brandById = new Map<string, Brand>(brands.map((b) => [b.id, b]));
  const sourceById = new Map<string, Source>(sources.map((s) => [s.id, s]));
  const hiddenSet = new Set<string>(hidden);

  return offers.map((offer) => ({
    ...offer,
    dealer: dealerById.get(offer.dealerId),
    brand: brandById.get(offer.brandId),
    source: sourceById.get(offer.sourceId),
    hidden: hiddenSet.has(offer.id)
  }));
}
