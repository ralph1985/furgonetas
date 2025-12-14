import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';

const filePath = 'data/offers.json';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const incoming: string[] = body?.order;
    if (!Array.isArray(incoming)) {
      return new Response(JSON.stringify({ error: 'order must be an array' }), { status: 400 });
    }

    const raw = await fs.readFile(filePath, 'utf-8');
    const offers = JSON.parse(raw);

    const orderMap = new Map<string, number>();
    incoming.forEach((id, idx) => orderMap.set(id, idx + 1));

    offers.forEach((offer) => {
      if (orderMap.has(offer.id)) {
        offer.orden = orderMap.get(offer.id);
      }
    });

    await fs.writeFile(filePath, JSON.stringify(offers, null, 2));

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to update order' }), { status: 500 });
  }
};
