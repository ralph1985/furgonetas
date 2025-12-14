import rawOffers from '../../data/offers.json';
import rawDealers from '../../data/dealers.json';
import rawBrands from '../../data/brands.json';
import rawSources from '../../data/sources.json';
import hidden from '../../data/hidden.json';

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
  foto?: string | null;
  contacto?: { nombre?: string; telefono?: string; email?: string };
};

export type OfferWithRefs = Offer & {
  dealer?: Dealer;
  brand?: Brand;
  source?: Source;
};

const dealerById = new Map<string, Dealer>(rawDealers.map((d) => [d.id, d]));
const brandById = new Map<string, Brand>(rawBrands.map((b) => [b.id, b]));
const sourceById = new Map<string, Source>(rawSources.map((s) => [s.id, s]));

export function getOffers(): OfferWithRefs[] {
  const hiddenSet = new Set<string>(hidden as string[]);
  return rawOffers
    .filter((o) => !hiddenSet.has(o.id))
    .map((offer) => ({
      ...offer,
      dealer: dealerById.get(offer.dealerId),
      brand: brandById.get(offer.brandId),
      source: sourceById.get(offer.sourceId)
    }));
}
