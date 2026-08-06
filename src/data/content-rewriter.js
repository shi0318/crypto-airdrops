const clean = (value) => String(value || '')
  .replace(/[\u200B-\u200D\uFEFF]/g, '')
  .replace(/^\s*[>→•-]+\s*/, '')
  .replace(/^.+?\s*→\s*/, '')
  .replace(/\$\s+([A-Z0-9])/g, '$$$1')
  .replace(/such a s/gi, 'such as')
  .replace(/\s+/g, ' ')
  .trim();

const finishSentence = (value) => `${value.replace(/[.!?]+$/, '')}.`;
const capitalizeSentences = (value) => value.replace(/(^|[.!?]\s+)([a-z])/g, (_, boundary, letter) => `${boundary}${letter.toUpperCase()}`);

function hashText(value) {
  let hash = 0;
  for (const character of String(value)) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash;
}

function lexicalRewrite(value) {
  return value
    .replace(/\byou can\b/gi, 'participants can')
    .replace(/\byour email\b/gi, 'the email address')
    .replace(/\byour username\b/gi, 'the username')
    .replace(/\byour wallet\b/gi, 'the wallet')
    .replace(/\byour\b/gi, "the participant's")
    .replace(/\byou\b/gi, 'participants')
    .replace(/\busers\b/gi, 'participants')
    .replace(/\bgo to\b/gi, 'access')
    .replace(/\bhead to\b/gi, 'access')
    .replace(/\bnavigate to\b/gi, 'open')
    .replace(/\bclick\b/gi, 'select')
    .replace(/\bcomplete\b/gi, 'finish')
    .replace(/\bconnect\b/gi, 'link')
    .replace(/\baccount\b/gi, 'profile')
    .replace(/\bapp\b/gi, 'application')
    .replace(/\bwebsite\b/gi, 'site')
    .replace(/\bcheck\b/gi, 'verify')
    .replace(/\btrack\b/gi, 'monitor')
    .replace(/\bregister\b/gi, 'create a profile')
    .replace(/\bstart\b/gi, 'begin')
    .replace(/\bchoose\b/gi, 'select')
    .replace(/\breceive\b/gi, 'obtain')
    .replace(/\bpurchase\b/gi, 'acquire')
    .replace(/\bbuy\b/gi, 'acquire')
    .replace(/\bclaim\b/gi, 'collect')
    .replace(/\bclaiming\b/gi, 'activating')
    .replace(/\beligible\b/gi, 'qualifying')
    .replace(/\brequired\b/gi, 'mandatory')
    .replace(/\bavailable\b/gi, 'currently listed')
    .replace(/\bplatform\b/gi, 'service')
    .replace(/\brules\b/gi, 'conditions');
}

function rewriteTitle(value, index, item) {
  const source = clean(value);
  if (/set up|create|sign up|onboarding|log in/i.test(source)) return `Prepare access to ${item.name}`;
  if (/download|install/i.test(source)) return `Install the official ${item.name} application`;
  if (/for mobile players/i.test(source)) return 'Use the mobile participation route';
  if (/add funds|deposit/i.test(source)) return 'Check the funding requirements';
  if (/trade.*earn.*point/i.test(source)) return 'Verify how trading activity earns points';
  if (/monitor|leaderboard|progress/i.test(source)) return 'Track progress and reward status';
  if (/referral|invite/i.test(source)) return 'Review the referral task';
  if (/social|discord|twitter|\bx\b/i.test(source)) return 'Complete the community checks';
  if (/access/i.test(source)) return `Open the ${item.name} campaign interface`;
  let title = source
    .replace(/^Set up or access/i, 'Create or open')
    .replace(/^Set up an?/i, 'Create an')
    .replace(/^Review eligibility for/i, 'Check eligibility for')
    .replace(/^Review promotions/i, 'Compare the available promotions')
    .replace(/^Complete eligible/i, 'Work through eligible')
    .replace(/^Monitor/i, 'Track')
    .replace(/^Use a testnet workflow/i, 'Follow a testnet workflow');
  if (title === source) title = `Complete stage ${index + 1}: ${source}`;
  return title.replace(/\bguide\b/i, 'workflow');
}

function rewriteDetail(value, index) {
  const source = clean(value).replace(/[.]+$/, '');
  if (!source) return '';
  if (/airdropalert|airdropalertcom/i.test(source)) return '';
  if (/well-regarded platforms|improve your .+ setup|\b[A-Z][\w ]+\s*:\s*An? .+ platform for/i.test(source)) return '';
  let rewritten = source
    .replace(/^Go to the verified (.+?) website$/i, 'Open the official $1 site and check the domain before you continue')
    .replace(/^Go to the (.+?) website$/i, 'Open the $1 site and confirm that the address is official')
    .replace(/^Head to the (.+?) registration page$/i, 'Open the $1 registration page from a verified project channel')
    .replace(/^Register with (.+)$/i, 'Choose one of the listed sign-in methods: $1. Then complete the basic profile checks')
    .replace(/^Register →\s*/i, 'Create the account first, then ')
    .replace(/^Create your account/i, 'Complete the initial account setup')
    .replace(/^Finish your profile/i, 'Complete the profile fields')
    .replace(/^Finish the available/i, 'Complete the currently listed')
    .replace(/^Read through/i, 'Review')
    .replace(/^Review the rules/i, 'Read the eligibility rules')
    .replace(/^Check the rules/i, 'Read the eligibility rules')
    .replace(/^Add supported crypto from your account$/i, 'If you proceed, fund the profile only with an asset and network the platform currently supports')
    .replace(/^Add supported crypto/i, 'Fund the profile with a supported asset')
    .replace(/^Add at least/i, 'Deposit at least')
    .replace(/^Add funds/i, 'Fund the account')
    .replace(/^Use the available claim option/i, 'When the campaign marks a reward as claimable, use its claim control')
    .replace(/^Go to the Promotions section and (?:enter|check) (.+)$/i, 'Open Promotions, then locate $1')
    .replace(/^Go to the referral section/i, 'Open the referral area')
    .replace(/^Go to (.+)$/i, 'Open $1 from the project interface')
    .replace(/^Head to (.+)$/i, 'Open $1 from a verified project entry point')
    .replace(/^Navigate to (.+)$/i, 'Open $1 in the project interface')
    .replace(/^Click (.+)$/i, 'Select $1 in the interface')
    .replace(/^Copy your personal referral link/i, 'Save the referral URL assigned to your account')
    .replace(/^Trade spot or futures/i, 'Place eligible spot or futures trades')
    .replace(/^Trade more than/i, 'Use the listed spot and futures markets, which number')
    .replace(/^Complete available quests/i, 'Work through the quests currently shown')
    .replace(/^Connect your/i, 'Link your')
    .replace(/^Install and run/i, 'Install the app and leave it running')
    .replace(/^Download (.+?), and (.+)$/i, 'Install $1. Then $2')
    .replace(/^Download the/i, 'Install the')
    .replace(/^Play eligible games, complete missions, and collect rewards$/i, 'Use only activities marked as eligible, complete the listed missions, and check that each reward is credited')
    .replace(/^Casino gameplay involves risk\. Only deposit what you can afford to lose$/i, 'Treat casino activity as risk-bearing and set a strict loss limit before funding the profile')
    .replace(/^Promotions can include (.+)$/i, 'Check the current terms for $1 because those conditions may change the value of the offer')
    .replace(/^Read the rules before (.+)$/i, 'Confirm the live eligibility terms before $1')
    .replace(/^Reach (.+)$/i, 'The captured participation threshold is $1; confirm that the live campaign still uses it')
    .replace(/^([A-Z][\w@ ]+) is (.+)$/i, 'The captured listing describes $1 as $2')
    .replace(/^(.+?) rewards depend on (.+)$/i, 'Eligibility for $1 rewards is tied to $2; confirm the live rules before participating')
    .replace(/^For mobile players, explore (.+)$/i, 'Mobile users can access $1')
    .replace(/^If you do not hold crypto yet,.+$/i, 'If funding is required, obtain a supported asset through a service available in your region and verify the withdrawal network before sending it to the wallet');

  rewritten = lexicalRewrite(rewritten)
    .replace(/\bwallet connection\b/gi, 'wallet sign-in')
    .replace(/\bMake sure\b/gi, 'Confirm that')
    .replace(/\s+([,.;!?])/g, '$1');

  if (rewritten === source) {
    const lead = ['For this record,', 'At this stage,', 'Before moving on,', 'As part of the workflow,'][index % 4];
    rewritten = `${lead} ${source}`;
  }
  return finishSentence(capitalizeSentences(rewritten));
}

function detectFormat(item) {
  const text = `${item.name} ${item.values.map((value) => `${value.amount} ${value.approx}`).join(' ')} ${item.claimSteps.map((step) => `${step.title} ${step.details.join(' ')}`).join(' ')}`.toLowerCase();
  if (/casino|wager|slot|poker|bet|spin/.test(text)) return 'gaming and wagering';
  if (item.blockchain === 'Testnet' || /testnet|faucet/.test(text)) return 'early network testing';
  if (/game|arcade|play/.test(text)) return 'game or entertainment';
  if (/trade|exchange|perpetual|swap|market/.test(text)) return 'trading and market activity';
  if (/wallet|card|payment|neobank/.test(text)) return 'wallet and payments';
  if (/\bai\b|\bagent\b|machine learning/.test(text)) return 'AI-assisted software';
  if (/validator|\bnode\b/.test(text)) return 'network infrastructure';
  if (/point|xp|mission|quest|referral/.test(text)) return 'points and task activity';
  return 'digital product activity';
}

export function buildAirdropPageContent(item) {
  const requirements = item.requirements.length ? item.requirements.join(', ').replace(/_/g, ' ') : 'no structured requirement';
  const reward = item.values[0]?.amount || 'a campaign reward';
  const firstStep = item.claimSteps[0]?.title || 'the listed participation flow';
  const firstDetail = item.claimSteps[0]?.details[0] || 'the project instructions';
  const format = detectFormat(item);
  const chainLabel = item.blockchain === 'Other' ? 'cross-platform' : item.blockchain;
  const workflowDetail = rewriteDetail(firstDetail, 0).replace(/[.!?]+$/, '');
  const variant = hashText(item.slug) % 4;
  const aboutLeads = [
    `${item.name} is catalogued as a ${chainLabel} campaign focused on ${format}. Its captured reward field reads “${reward}”, and the participation record names ${requirements}. The first stage, “${firstStep}”, describes where the recorded workflow starts; it does not establish a future distribution.`,
    `This entry follows ${item.name}, a ${format} campaign filed under ${chainLabel}. At capture, the offer headline was “${reward}” and its structured participation signals were ${requirements}. The instructions open with “${firstStep}”, so the page should be read as a dated campaign record rather than an allocation notice.`,
    `Three fields define the ${item.name} snapshot: a ${chainLabel} classification, the reward wording “${reward}”, and participation signals of ${requirements}. Together they describe a ${format} workflow beginning with “${firstStep}”. None of those fields confirms that a reward will be paid.`,
    `Filed under ${chainLabel}, ${item.name} centers on ${format}. The source snapshot pairs “${reward}” with ${requirements} as participation signals and starts the recorded process at “${firstStep}”. Because terms can change, this evidence is descriptive rather than predictive.`,
  ];
  const aboutWorkflows = [
    `The first recorded action can be restated as follows: ${workflowDetail}. Later stages add the project-specific tasks and thresholds shown below. Verify current terms, regional access, profile requirements, and transaction costs before proceeding.`,
    `The practical flow begins with this instruction: ${workflowDetail}. The steps that follow preserve the campaign's named features, limits, and actions in a new structure. Recheck each one against the live project page before using funds or a wallet.`,
    `At the beginning of the workflow, participants are directed to do the following: ${workflowDetail}. Remaining actions are organized below by stage. Treat all dates, thresholds, eligibility rules, and costs as details that require a fresh check.`,
    `Participation starts with this captured action: ${workflowDetail}. From there, the guide separates setup, qualifying activity, and reward checks wherever the source provides them. Confirm the current domain and conditions before treating any stage as active.`,
  ];
  const about = [aboutLeads[variant], aboutWorkflows[(variant + 1) % aboutWorkflows.length]];
  const claimSteps = item.claimSteps.map((step, stepIndex) => ({
    title: rewriteTitle(step.title, stepIndex, item),
    details: step.details.map((detail, detailIndex) => rewriteDetail(detail, stepIndex + detailIndex)).filter(Boolean),
  })).filter((step) => step.details.length > 0);
  return { about, claimSteps, linkVariant: variant };
}
