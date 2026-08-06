import { AIRDROPS, IMPORT_META } from './airdrops.generated.js';

export type AirdropRecord = (typeof AIRDROPS)[number];
export { AIRDROPS, IMPORT_META };

export const PAGE_SIZE = 24;

export function getPage(page: number) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const start = (safePage - 1) * PAGE_SIZE;
  return { page: safePage, totalPages: Math.max(1, Math.ceil(AIRDROPS.length / PAGE_SIZE)), items: AIRDROPS.slice(start, start + PAGE_SIZE) };
}

export function getRecord(slug: string) {
  return AIRDROPS.find((item) => item.slug === slug);
}

export function formatRequirement(value: string) {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}
