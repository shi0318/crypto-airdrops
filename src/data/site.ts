export const SITE = {
  name: 'Top Crypto Airdrops',
  shortName: 'Top Airdrops',
  url: 'https://cryptvews.com',
  description: 'A clear, source-tracked directory of crypto airdrops, reward campaigns, and participation requirements.',
  themeColor: '#10161d',
  accent: '#35d4d9',
  legalName: 'Top Crypto Airdrops',
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE.url).toString();
}

export function localPath(path: string) {
  if (!path.startsWith('/')) return `/${path}`;
  return path;
}
