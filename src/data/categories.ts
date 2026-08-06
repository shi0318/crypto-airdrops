import { AIRDROPS, type AirdropRecord } from './airdrops';

type AirdropCategory = {
  slug: 'defi' | 'blockchain' | 'ai' | 'meme' | 'gaming';
  name: string;
  description: string;
  pageIntro: string;
  accent: string;
  patterns: RegExp[];
};

export const AIRDROP_CATEGORIES: AirdropCategory[] = [
  {
    slug: 'defi',
    name: 'DeFi',
    description: 'Decentralized finance, exchanges, lending, staking, and onchain liquidity.',
    pageIntro: 'Compare campaigns connected to decentralized exchanges, lending markets, staking, yield products, and other onchain financial tools. Reward language is preserved as a dated record, so verify live terms and transaction costs before participating.',
    accent: '#b6e36b',
    patterns: [/\bdefi\b/i, /\bdex\b/i, /decentralized exchange/i, /\byield\b/i, /\bstaking\b/i, /\blending\b/i, /\bborrow(?:ing)?\b/i, /\bliquidity\b/i, /\bvaults?\b/i, /\bswap(?:per)?\b/i, /\bperpetuals?\b/i, /\bperps?\b/i],
  },
  {
    slug: 'blockchain',
    name: 'Blockchain',
    description: 'Networks, testnets, nodes, bridges, infrastructure, and protocol campaigns.',
    pageIntro: 'Browse records centered on blockchain networks and infrastructure, including testnets, nodes, bridges, validators, and protocol launches. A network label does not confirm a future token, allocation, or eligibility.',
    accent: '#35d4d9',
    patterns: [/\bblockchain\b/i, /\btestnet\b/i, /\bmainnet\b/i, /\bnetwork\b/i, /\bnodes?\b/i, /\bbridges?\b/i, /\brollups?\b/i, /\bvalidators?\b/i, /infrastructure/i, /\bdepin\b/i, /layer[- ]?[12]\b/i],
  },
  {
    slug: 'ai',
    name: 'AI',
    description: 'Artificial intelligence, autonomous agents, models, and machine-learning tools.',
    pageIntro: 'Review campaigns whose captured materials reference artificial intelligence, autonomous agents, model development, or machine-learning products. Confirm what the product actually provides before completing social, wallet, or account tasks.',
    accent: '#9d78ec',
    patterns: [/\bai\b/i, /artificial intelligence/i, /\bagentic\b/i, /\bagents?\b/i, /machine learning/i, /\bmodels?\b/i, /\bneural\b/i, /intelligence/i],
  },
  {
    slug: 'meme',
    name: 'Meme',
    description: 'Meme-led tokens, communities, social campaigns, and culture-driven projects.',
    pageIntro: 'Explore records built around meme tokens and community-led campaigns. These listings can move quickly and often rely on social activity, so independently verify token contracts, domains, and current reward conditions.',
    accent: '#ff8066',
    patterns: [/\bmeme(?:coin|coins)?\b/i, /\bbonk\b/i, /\bdoge\b/i, /\bpepe\b/i, /\bpaws\b/i, /\bboop\b/i, /\bpengu\b/i, /\bmemepay\b/i, /\bmoonbix\b/i],
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    description: 'Blockchain games, playable campaigns, casinos, competitions, and virtual worlds.',
    pageIntro: 'Find campaigns connected to games, playable applications, casinos, competitions, and virtual worlds. Check age and regional restrictions, purchase requirements, and reward rules on the current official site.',
    accent: '#f2c94c',
    patterns: [/\bgames?\b/i, /\bgaming\b/i, /\bplay(?:able)?\b/i, /\bcasino\b/i, /\blottery\b/i, /\bbet(?:ting)?\b/i, /\barcade\b/i, /\bmetaverse\b/i, /\bpvp\b/i],
  },
];

function getSearchDocument(item: AirdropRecord) {
  const values = item.values.flatMap((value) => [value.amount, value.approx]);
  const steps = item.claimSteps.flatMap((step) => [step.title, ...step.details]);

  return [item.name, item.slug, item.ribbon, item.blockchain, ...item.requirements, ...values, ...steps]
    .filter(Boolean)
    .join(' ');
}

export function getCategoryBySlug(slug: string) {
  return AIRDROP_CATEGORIES.find((category) => category.slug === slug);
}

export function getAirdropsForCategory(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) return [];

  return AIRDROPS.filter((item) => {
    const document = getSearchDocument(item);
    return category.patterns.some((pattern) => pattern.test(document));
  });
}
