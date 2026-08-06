export type EditorialKind = 'guide' | 'news';

export interface EditorialArticle {
  slug: string;
  kind: EditorialKind;
  label: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  relatedSlugs: string[];
}

export const EDITORIAL: EditorialArticle[] = [
  {
    slug: 'crypto-airdrop-safety-checklist',
    kind: 'guide',
    label: 'Safety guide',
    title: 'Crypto Airdrop Safety Checklist: A Calm Way to Verify a Campaign',
    description: 'A practical checklist for checking a crypto airdrop before connecting a wallet, sharing data, or spending gas.',
    date: '2026-08-06',
    readTime: '7 min read',
    intro: 'A promising reward is not evidence that a campaign is safe. Use this checklist to separate a useful lead from a risky request before you take an on-chain action.',
    sections: [
      { heading: '1. Start with the official domain', paragraphs: ['Open the project page from a verified project account or a known documentation page. Do not trust a search ad, a shortened URL, or a message that creates urgency.', 'Compare the domain character by character. Airdrop pages are often copied, and a familiar brand name does not make a lookalike domain legitimate.'] },
      { heading: '2. Treat wallet requests as a decision point', paragraphs: ['A directory should help you research; it should not ask for your seed phrase or private key. Never type either secret into a website, form, chat, or support ticket.', 'Before signing, read the wallet prompt and check the network, contract, spender, and requested permission. If the action is not clear, stop and verify it through an independent official channel.'] },
      { heading: '3. Price the participation cost', paragraphs: ['Record every cost before you start: gas, deposits, bridge fees, trading volume, subscription fees, and possible KYC requirements. A reward headline can hide a cost that changes the decision.', 'A campaign that says "free" may still require a funded wallet or a transaction approval. Keep a separate test wallet for experiments and do not fund it with more than you can afford to lose.'] },
      { heading: '4. Read the reward wording literally', paragraphs: ['Words such as points, eligibility, access, and potential reward are not the same as a confirmed token allocation. Our listing pages preserve reward language as a dated snapshot so you can see what was actually written.', 'Use the capture date as a starting point, not as proof that a campaign is still open. Confirm deadlines and terms on the official page before acting.'] },
      { heading: 'A five-minute stop rule', paragraphs: ['If a campaign fails any of the checks above, leave it alone until you have better evidence. A missed campaign can be replaced; an approved malicious transaction may not be reversible.'], bullets: ['Verify the domain and the project social account.', 'Confirm the network and transaction purpose.', 'Estimate every direct and indirect cost.', 'Never share private keys or seed phrases.', 'Save the official source and your own notes.'] },
    ],
    relatedSlugs: ['bitunix-trading-rewards', 'bonkplay-crypto-casino', 'ducat'],
  },
  {
    slug: 'how-to-read-a-crypto-airdrop-listing',
    kind: 'guide',
    label: 'Research guide',
    title: 'How to Read a Crypto Airdrop Listing Without Mistaking Hype for Evidence',
    description: 'Learn how to compare airdrop reward wording, requirements, chains, dates, and verification states in a research-first workflow.',
    date: '2026-08-06',
    readTime: '6 min read',
    intro: 'A listing is a starting point for research. This guide explains how to read the fields on a campaign page and decide what still needs independent verification.',
    sections: [
      { heading: 'Snapshot versus recommendation', paragraphs: ['A source snapshot records what a listing said at a particular time. It does not turn that wording into a guarantee, endorsement, or investment thesis.', 'Start with the capture date, source page, chain, and review state. If one of those fields is missing, lower your confidence rather than filling the gap with assumptions.'] },
      { heading: 'Separate the reward from the action', paragraphs: ['Read the reward and the participation signals as two different questions. "Up to" language describes a ceiling, while a requirement such as trade, deposit, or KYC describes what the user may need to do.', 'Write down the smallest action that appears necessary, then verify whether the official terms add volume thresholds, geographic restrictions, expiry dates, or a waitlist.'] },
      { heading: 'Compare like with like', paragraphs: ['Use chain and requirement labels to compare campaigns with similar costs. A testnet task, a referral program, and an exchange promotion are different products even when all three use the word airdrop.', 'Internal detail pages make that comparison easier by keeping the source wording, date, and uncertainty next to the same safety reminder.'] },
      { heading: 'Build a personal research log', paragraphs: ['Save the page URL, capture date, official domain, and the decision you made. A short log helps you notice when terms change and prevents repeatedly opening the same unverified link.'], bullets: ['What does the source actually promise?', 'What must a participant do?', 'What can change before a reward is distributed?', 'What evidence would change your decision?'] },
    ],
    relatedSlugs: ['cloudbet-crypto-casino', 'planemo-trading', 'solana'],
  },
  {
    slug: 'testnet-airdrop-guide',
    kind: 'guide',
    label: 'Testnet guide',
    title: 'Testnet Airdrop Guide: A Safer Workflow for Early Network Tasks',
    description: 'A practical workflow for researching testnet campaigns, using a separate wallet, and documenting tasks without assuming a reward.',
    date: '2026-08-06',
    readTime: '8 min read',
    intro: 'Testnet campaigns can be useful product research, but testnet activity is not a guaranteed allocation. Use a separate wallet and treat every task as an experiment with an explicit cost.',
    sections: [
      { heading: 'What a testnet campaign can and cannot prove', paragraphs: ['A testnet lets a project observe usage before a production launch. Completing tasks may provide feedback or points, but it does not prove that a token, amount, or eligibility rule will follow.', 'Look for official documentation that explains the network, faucet, supported wallet, and current phase. Keep promotional language separate from technical evidence.'] },
      { heading: 'Use a dedicated test wallet', paragraphs: ['Create a wallet used only for testnet activity. Never reuse a wallet that holds valuable assets, and never share its seed phrase with a faucet, support account, or project form.', 'Bookmark the official network and explorer pages yourself. Fake faucets and fake explorers are common ways to turn a harmless task into a signing or approval trap.'] },
      { heading: 'Record actions instead of chasing volume', paragraphs: ['A simple log is more useful than repeating the same transaction. Note the date, network, contract, transaction hash, task, and any error message.', 'Avoid unnecessary volume. If a task is unclear, ask whether it improves the product or simply increases cost and exposure.'] },
      { heading: 'Current testnet records', paragraphs: ['Our directory currently marks a small set of records as Testnet. The category page is a research index, not a claim that any listed project will distribute a reward.'], bullets: ['Read the project documentation first.', 'Use a separate wallet and small test balances.', 'Keep transaction hashes and screenshots in your own log.', 'Recheck eligibility and deadlines before any later claim.'] },
    ],
    relatedSlugs: ['ducat', 'dac-quantum-chain-testnet', 'litvm-litecoin-virtual-machine-testnet'],
  },
  {
    slug: 'featured-airdrops-weekly-watch',
    kind: 'news',
    label: 'Directory update',
    title: 'Featured Airdrops Watch: What This Directory Captured on August 5, 2026',
    description: 'A dated editorial update explaining the latest featured airdrop snapshot, what changed, and how to use the record set.',
    date: '2026-08-05',
    readTime: '4 min read',
    intro: 'This update explains the current source snapshot behind the directory. It is a record of coverage, not a ranking of the safest or most profitable campaigns.',
    sections: [
      { heading: 'The current snapshot', paragraphs: ['The imported featured, open, newest-first source set contains 286 local records across 24 source pages. Each local page keeps the campaign name, reward wording, requirement labels, chain, logo, source URL, and capture date.', 'The directory is intentionally dated because listings change. A page that appears today may expire, change terms, or become unavailable in a reader\'s jurisdiction.'] },
      { heading: 'What readers should compare', paragraphs: ['Start with the participation cost and verification state rather than the largest number in a headline. Use the chain and requirement fields to compare similar campaign types, then open the detail page for the source trail and safety notice.', 'The list does not use a hidden paid ranking. Sponsored placements, if introduced later, must be labelled and cannot remove a risk note.'] },
      { heading: 'How to use this update', paragraphs: ['Use the homepage for discovery, the detail pages for a dated snapshot, and the safety and research guides for a repeatable workflow. When a source changes, send the exact local URL and evidence through the corrections page.'] },
    ],
    relatedSlugs: ['bitunix-trading-rewards', 'bonkplay-crypto-casino', 'cloudbet-crypto-casino'],
  },
  {
    slug: 'testnet-airdrop-watch',
    kind: 'news',
    label: 'Testnet watch',
    title: 'Testnet Airdrop Watch: Seven Records to Research, Not Promises to Chase',
    description: 'A dated look at the testnet records in the current directory and the evidence that still needs to be checked.',
    date: '2026-08-05',
    readTime: '4 min read',
    intro: 'Seven records in the current source snapshot use the Testnet chain label. This watchlist helps you find them while keeping reward expectations separate from observable activity.',
    sections: [
      { heading: 'Why the category matters', paragraphs: ['Testnet entries usually ask users to try an early product, provide feedback, or complete network actions. Those actions can be useful, but the label alone does not establish a future token distribution.', 'A category page makes the records easier to find and compare without pretending that every project follows the same eligibility rules.'] },
      { heading: 'Evidence to check next', paragraphs: ['For each record, confirm the official documentation, current testnet phase, faucet instructions, supported wallet, and any stated data or KYC requirements. Keep your own transaction log because a listing can change after capture.', 'Do not bridge valuable assets to a test network and do not sign an unknown approval to qualify for points.'] },
      { heading: 'A measured research plan', paragraphs: ['Choose one project, read its documentation, use a dedicated wallet, and complete only the tasks that have a clear product purpose. Revisit the detail page when the project publishes a new phase or claim rule.'] },
    ],
    relatedSlugs: ['ducat', 'dac-quantum-chain-testnet', 'litvm-litecoin-virtual-machine-testnet'],
  },
];

export const GUIDES = EDITORIAL.filter((article) => article.kind === 'guide');
export const NEWS = EDITORIAL.filter((article) => article.kind === 'news');

export function getArticle(slug: string, kind: EditorialKind) {
  return EDITORIAL.find((article) => article.slug === slug && article.kind === kind);
}
