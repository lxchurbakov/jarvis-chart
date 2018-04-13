export const bound = (v, min, max) => Math.max(min, Math.min(max, v))

export const getWindowIdThatIsTouchedByBottomBorder = (windows, yRelative, threshold = 0.01) => {
  let top = 0;
  let result = null;

  windows.forEach((w, i) => {
    if (i < windows.length - 1)
      if (Math.abs(yRelative - (w.weight + top)) < threshold)
        result = w.id;
    top += w.weight;
  });

  return result;
};

export const resizeWindowsIncreasingWindowWithId = (windows, id, diff) => {
  windows.forEach((w, index) => {
    if (w.id === id) {
      w.weight = bound(w.weight - diff, 0, 1);
      const nw = windows[index + 1];

      nw.weight = bound(nw.weight + diff, 0, 1);
    }
  });

  return windows.slice();
};
