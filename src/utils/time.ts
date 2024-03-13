const THREE_HOURS = 10800000;
export const OUR_TIMER_UP = 'We can slide';
export const THEIR_TIMER_UP = 'They can slide';

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

export const getSlideTimer = (now: Date, timer: string | undefined, upString: string): string => {
  if (timer) {
    const timerStart = new Date(timer);
    const timerEnd = new Date(timerStart.getTime() + THREE_HOURS);

    if (now.getTime() >= timerEnd.getTime()) {
      return upString;
    }

    return getTimeSince(timerEnd, now);
  }

  return upString;
}

export const getDateString = (date: Date): string => {
  return date.toLocaleString('default', {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export const getTimeString = (date: Date): string => {
  return date.toLocaleTimeString('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
}

export const getDateTimeString = (date: Date): string => {
  const dateStr = date.toLocaleString('default', {
    month: "long",
    day: "numeric",
  });
  const timeStr = date.toLocaleTimeString('default', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return `${dateStr} at ${timeStr}`;
}