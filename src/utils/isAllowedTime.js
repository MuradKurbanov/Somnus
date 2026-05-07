export function isAllowedTime() {
  const timeZone = 'Europe/Lisbon';
  const now = new Date();

  const hour = new Date(now.toLocaleString('en-US', { timeZone })).getHours();

  return hour === 4;
}
