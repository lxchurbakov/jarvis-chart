/* Переводим градусы в радианы */
export const toRad    = (alpha)          => (alpha / 360) * Math.PI * 2;

/* Подсчитываем расстояние между двумя точками */
export const distance = (x0, y0, x1, y1) => Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
