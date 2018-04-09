let done = [];

export default (f) => {
  let done = false;

  return (...args) => {
    if (!done) {
      f(...args);
      done = true;
    }
  };
};
