import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';

const filePath = 'data/favorites.json';

export const GET: APIRoute = async () => {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return new Response(raw, { status: 200 });
  } catch {
    return new Response(JSON.stringify([]), { status: 200 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, favorite } = body;
    if (!id || typeof favorite !== 'boolean') {
      return new Response(JSON.stringify({ error: 'id and favorite required' }), { status: 400 });
    }
    let list: string[] = [];
    try {
      list = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    } catch {
      list = [];
    }
    const set = new Set(list);
    if (favorite) set.add(id);
    else set.delete(id);
    const next = Array.from(set);
    await fs.writeFile(filePath, JSON.stringify(next, null, 2));
    return new Response(JSON.stringify({ ok: true, favorites: next }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update favorites' }), { status: 500 });
  }
};
