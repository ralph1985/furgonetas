import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

const hiddenPath = path.resolve('data/hidden.json');

async function readHidden(): Promise<string[]> {
  try {
    const raw = await fs.readFile(hiddenPath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeHidden(ids: string[]) {
  await fs.writeFile(hiddenPath, JSON.stringify(ids, null, 2), 'utf-8');
}

export const GET: APIRoute = async () => {
  const ids = await readHidden();
  return new Response(JSON.stringify({ hidden: ids }), {
    headers: { 'content-type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { id, hidden } = body || {};
    if (typeof id !== 'string') {
      return new Response(JSON.stringify({ error: 'id required' }), { status: 400 });
    }
    const current = new Set(await readHidden());
    if (hidden === false) {
      current.delete(id);
    } else {
      current.add(id);
    }
    await writeHidden([...current]);
    return new Response(JSON.stringify({ hidden: [...current] }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'invalid payload' }), { status: 400 });
  }
};
