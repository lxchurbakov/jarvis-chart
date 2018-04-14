/**
 * Возвращает ID окна, над которым сейчас курсор
 */
export const getWindowIdThatIsTouched = (windows, y, threshold = 15) => {
  let result = null;

  windows.forEach((w, i) => {
    if (
      y > w.top &&
      y < (w.height + w.top) &&
      /* Не ловить события, близкие к нижней границе окна, т.к. они должны вести к drag */
      Math.abs((w.height + w.top) - y) > threshold
    )
      result = w.id;
  });

  return result;
};
