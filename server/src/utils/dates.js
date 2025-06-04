import ms from 'ms';

export const getFutureDate = (duration) => {
  if (!duration) return new Date();
  return new Date(Date.now() + ms(duration));
};
