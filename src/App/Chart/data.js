let lastClose = 50;

export default () => {
  const open = lastClose;
  const close = Math.min(90, Math.max(10, open + (Math.random() * 30) - 15));

  lastClose = close;

  const min = Math.max(5, Math.min(close, open) - Math.random() * 20);
  const max = Math.min(95, Math.max(close, open) + Math.random() * 20);

  return { min, max, close, open };
};
