export const getWindowIdThatIsTouched = (windows, yRelative, threshold = 0.01) => {
  let top = 0;
  let result = null;

  windows.forEach((w, i) => {
    if (
      yRelative > top &&
      yRelative < (w.weight + top) &&
      /* Не ловить события, близкие к нижней границе окна, т.к. они должны вести к drag */
      Math.abs((w.weight + top) - yRelative) > threshold
    )
      result = w.id;
    top += w.weight;
  });

  return result;
};
