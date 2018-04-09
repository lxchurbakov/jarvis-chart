const VALUES_SAMPLE_COUNT = 1000;

/* Shortcut for the value */
const value = (min, max, open, close, time) => ({ min, max, open, close, time });

/* Just a string time helper */
const toTwo = (v) => (new Array(2 - v.length).fill('0').join('')) + v;

/* Get time from index */
const getTime = (index) => {
  const hours   = Math.floor(index / 60);
  const minutes = (index % 60);

  return `${toTwo(hours.toString())}:${toTwo(minutes.toString())}`;
};

/* Values array */
const values = [];

for (let i = 0; i < VALUES_SAMPLE_COUNT; ++i) {
  const open = i > 0 ? values[i - 1].close : Math.random() * 200 + 30;
  const close = Math.max(20, open + Math.random() * 60 - 30);

  const min = Math.min(open, close) - Math.random() * 20;
  const max = Math.max(open, close) + Math.random() * 50;

  const time = getTime(i);

  values.push(value(min, max, open, close, time));
}

export default values;
