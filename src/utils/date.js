const DISPLAY_DATE = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDisplayDate(value) {
  const isoDate = String(value).slice(0, 10);
  return DISPLAY_DATE.format(new Date(`${isoDate}T00:00:00Z`));
}
