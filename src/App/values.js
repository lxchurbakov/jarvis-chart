const VALUES_SAMPLE_COUNT = 10000;

/* Shortcut for the value */
const value = (min, max, open, close, time, volume) => ({ min, max, open, close, time, volume });

/* Just a string time helper */
const toTwo = (v) => (new Array(2 - v.length).fill('0').join('')) + v;

/* Get time from index */
const getTime = (index) => {
  const hours   = Math.floor(index / 60) % 24;
  const minutes = (index % 60);

  return `${toTwo(hours.toString())}:${toTwo(minutes.toString())}`;
};

/* Values array */
const values = [];
const offset = Math.floor(Math.random() * VALUES_SAMPLE_COUNT)

for (let i = 0; i < VALUES_SAMPLE_COUNT; ++i) {
  const open = i > 0 ? values[i - 1].close : Math.random() * 200 + 30;
  const close = Math.max(20, open + Math.random() * 60 - 30);

  const min = Math.min(open, close) - Math.random() * 20;
  const max = Math.max(open, close) + Math.random() * 50;

  const time = getTime(i + offset);

  const volume = (max - min) * (Math.random() + 1)

  values.push(value(min, max, open, close, time, volume));
}

export default values;
