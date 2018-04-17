/**
 * Заключить число в границы
 */
export const bound = (v, min, max) => Math.max(min, Math.min(max, v));

/**
 *
 */
export const set = (o, k, v) => ({ ...o, [k]: v });

/**
 *
 */
export const update = (o, k, p) => ({ ...o, [k]: p(o[k], k, o) });

// export const chain = (v) => ({ update: carry(update, [v, null, null]), set })
