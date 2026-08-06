import { parse } from 'parse5';

const TRACKING_PARAMS = new Set([
  'af_token',
  'aftm_campaign',
  'aff',
  'aff_id',
  'affiliate',
  'ref',
  'refcode',
  'referral',
  'referral_code',
  'referralcode',
  'utm_campaign',
  'utm_content',
  'utm_medium',
  'utm_source',
  'utm_term',
  'vipcode',
]);

const NON_CAMPAIGN_HOSTS = new Set([
  'airdropalert.com',
  'www.airdropalert.com',
  'bit.ly',
  'discord.com',
  'discord.gg',
  'twitter.com',
  'www.youtube.com',
  'x.com',
  'youtube.com',
]);

const PROMOTIONAL_COPY = [
  /airdropalert/i,
  /eligibility checker/i,
  /palau digital id/i,
  /failed to meet expectations/i,
  /read why/i,
  /stay tuned with/i,
  /^watch\b/i,
  /read our .+ (?:article|guide|series)/i,
  /download the .+ app/i,
];

function hasClass(node, className) {
  const value = getAttribute(node, 'class');
  return value.split(/\s+/).includes(className);
}

function getAttribute(node, name) {
  return node?.attrs?.find((attribute) => attribute.name === name)?.value ?? '';
}

function findFirst(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes ?? []) {
    const match = findFirst(child, predicate);
    if (match) return match;
  }
  return null;
}

function findAll(node, predicate, matches = []) {
  if (predicate(node)) matches.push(node);
  for (const child of node.childNodes ?? []) findAll(child, predicate, matches);
  return matches;
}

function textContent(node) {
  if (!node) return '';
  if (node.nodeName === '#text') return node.value ?? '';
  if (node.nodeName === 'script' || node.nodeName === 'style') return '';
  return (node.childNodes ?? []).map(textContent).join(' ');
}

function cleanText(value) {
  return value
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/^[\s*\-\u2192]+/, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;!?])/g, '$1')
    .trim();
}

function rewriteTitle(value) {
  return cleanText(value)
    .replace(/^Create or log in to\b/i, 'Set up or access')
    .replace(/^Create your\b/i, 'Set up your')
    .replace(/^Create an?\b/i, 'Set up an')
    .replace(/^Check\b/i, 'Review')
    .replace(/^Visit\b/i, 'Open')
    .replace(/^Go to\b/i, 'Open')
    .replace(/^Join\b/i, 'Enter')
    .replace(/^Complete\b/i, 'Finish')
    .replace(/^Claim\b/i, 'Review eligibility for')
    .replace(/^Deposit\b/i, 'Add funds')
    .replace(/^Trade to earn\b/i, 'Complete eligible trading tasks for')
    .replace(/^Track\b/i, 'Monitor');
}

function rewriteInstruction(value) {
  return cleanText(value)
    .replace(/^Visit the official\b/i, 'Open the verified')
    .replace(/^Head to the\b/i, 'Open the')
    .replace(/^Go to\b/i, 'Open')
    .replace(/^Open the\b/i, 'Go to the')
    .replace(/^Sign up\b/i, 'Register')
    .replace(/^Create\b/i, 'Set up')
    .replace(/^Complete\b/i, 'Finish')
    .replace(/^Check\b/i, 'Review')
    .replace(/^Review\b/i, 'Read through')
    .replace(/^Claim\s+(.+)/i, 'Use the available claim option for $1')
    .replace(/^Deposit\b/i, 'Add')
    .replace(/^Follow\b/i, 'Track')
    .replace(/^Join\b/i, 'Enter')
    .replace(/^Connect\b/i, 'Link')
    .replace(/^Verify\b/i, 'Confirm');
}

export function sanitizeExternalUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value.replace(/&amp;/g, '&'));
    if (!['http:', 'https:'].includes(url.protocol)) return '';
    if (url.protocol === 'http:') url.protocol = 'https:';
    for (const key of [...url.searchParams.keys()]) {
      if (TRACKING_PARAMS.has(key.toLowerCase())) url.searchParams.delete(key);
    }
    url.hash = '';
    return url.toString();
  } catch {
    return '';
  }
}

function isCampaignUrl(value) {
  if (!value) return false;
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return !NON_CAMPAIGN_HOSTS.has(hostname) && !hostname.endsWith('.airdropalert.com');
  } catch {
    return false;
  }
}

function parseStep(node) {
  const strong = findFirst(node, (candidate) => candidate.nodeName === 'strong');
  const paragraphs = findAll(node, (candidate) => candidate.nodeName === 'p');
  const strongText = cleanText(textContent(strong));
  const firstInstruction = cleanText(textContent(paragraphs[0]));
  const inferredTitle = firstInstruction.split(/[,;]|\s+and\s+/i)[0];
  const title = rewriteTitle(strongText || inferredTitle);
  const details = [];

  for (const paragraph of paragraphs) {
    const original = cleanText(textContent(paragraph));
    if (!original || original === strongText) continue;
    if (PROMOTIONAL_COPY.some((pattern) => pattern.test(original))) continue;
    const rewritten = rewriteInstruction(original);
    if (rewritten && !details.includes(rewritten)) details.push(rewritten);
  }

  if (!details.length) {
    const fallback = rewriteInstruction(cleanText(textContent(node)).replace(strongText, ''));
    if (fallback) details.push(fallback);
  }

  return title && details.length ? { title, details: details.slice(0, 8) } : null;
}

export function parseAirdropDetail(html) {
  const document = parse(html);
  const websiteButton = findFirst(document, (node) => node.nodeName === 'a' && hasClass(node, 'btn-project-website'));
  const stepList = findFirst(document, (node) => node.nodeName === 'ol' && hasClass(node, 'step-list'));
  const officialUrl = sanitizeExternalUrl(getAttribute(websiteButton, 'href'));
  const stepLinks = stepList
    ? findAll(stepList, (node) => node.nodeName === 'a').map((node) => sanitizeExternalUrl(getAttribute(node, 'href'))).filter(isCampaignUrl)
    : [];
  const claimSteps = stepList
    ? (stepList.childNodes ?? []).filter((node) => node.nodeName === 'li').map(parseStep).filter(Boolean)
    : [];

  return {
    officialUrl,
    campaignUrl: stepLinks[0] || officialUrl,
    claimSteps,
  };
}
