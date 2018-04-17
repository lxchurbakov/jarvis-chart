/**
 * Высчитывает ID окна, границы которого касается yRelative
 */
export const getWindowIdThatIsTouchedByBottomBorder = (windows, y, threshold = 15) => {
  let result = null;

  windows.forEach((w, i) => {
    if (i < windows.length - 1) {
      if (Math.abs(y - (w.height + w.top)) < threshold) {
        result = w.id;
      }
    }
  });

  return result;
};

/**
 * Изменяет веса окон, увеличивая окно с id.
 */
export const resizeWindowsIncreasingWindowWithId = (windows, id, diff) => {
  windows.forEach((w, index) => {
    if (w.id === id) {
      const nw = windows[index + 1];

      if (w.height - diff < 0)
        diff = w.height;
      if (nw.top - diff < 0)
        diff = nw.top;
      if (nw.height + diff < 0)
        diff = -nw.height;

      w.height = w.height - diff;

      nw.height = nw.height + diff;
      nw.top = nw.top - diff;
    }
  });

  return windows.slice();
};
