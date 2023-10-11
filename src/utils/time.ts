export const getTimeSince = (start: Date, end: Date): string => {
  const ms = (start.getTime() - end.getTime());
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.round(((ms % 86400000) % 3600000) / 60000);

  const daysStr = days ? days === 1 ? `${days} day` : `${days} days` : '';
  const hoursStr = hours ? hours === 1 ? `${hours} hour` : `${hours} hours` : '';
  const minutesStr = minutes ? minutes === 1 ? `${minutes} minute` : `${minutes} minutes` : '0 minutes';
  return `${daysStr}${daysStr && (hoursStr || minutesStr) ? ', ' : ''}${hoursStr}${hoursStr && minutesStr ? ' and ' : ''}${minutesStr}`;
}