import Matrix from 'lib/matrix.js'

const last = (arr) => arr[arr.length - 1];

/**
 * Создаёт Transform Context API - базовый API контекста любого рендера
 *
 * По сути является прокси повторяющим API html5 canvas API. Нужен по нескольким причинам:
 *   1. Не все контексты рендеров предоставляют одинаковый API, этот модуль позволяет их стандартизировать
 *   2. Для некоторых трансформаций нам необходимо дропать текущий scale/translate (подпись рядом с свечой не должна масштабироваться)
 *      Ни в canvas, ни в svg это нельзя сделать нормально, нужно отслеживать применённые трансформации руками.
 *   3. Canvas работает быстрее при кэшировании изменений контекста: в этой обёртке мы отслеживаем изменения и не меняем цвет если это не необходимо
 *
 * Методы:
 *   matrix.push(m) - добавляет матрицу в стэк. Преобразования будут суммироваться
 *   matrix.replace(m) - добавляет матрицу в стэк. Преобразования не будут суммироваться
 *   matrix.pop() - извлекает матрицу из стэка
 *   matrix.get() - получает значение текущей матрицы
 *
 *   screen.width() - получает ширину канвы
 *   screen.height() - получает высоту канвы
 *   screen.inside([x, y]) - получает из экранных координат координаты внтури текущего преобразования
 *   screen.outside([x, y]) - получает из текущих координат их экранные версии
 *
 *   crop.fits() - проверяет, входит ли точка (с учётом текущей матрицы преобразований) в область экрана (видима ли)
 *   crop.raw() - проверяет, входит ли точка (без учёта текущей матрицы преобразований) в область экрана (видима ли
 *
 * Пример:
 *
 *   context.matrix.push(Matrix.translate(10, 10)) - применяет новую матрицу к текущей
 *   // Рисование чего-либо в в координатах 10, 10
 *   context.matrix.pop() - восстановление матрицы

 *   context.matrix.replace(Matrix.identity()) - дропает матрицу, но сохраняет предыдущую в стэк
 *   // Рисование чего-либо в экранных координатах
 *   context.matrix.pop() - восстановление матрицы
 */
export default (options) => {
  let stack = [];

  const syncStack = () => {
    const l = last(stack);

    if (!l.acc) {
      stack.forEach((entry, index) => {
        if (index === 0) {
          entry.acc = entry.matrix;
        } else {
          if (!entry.acc) {
            entry.acc = Matrix.multiply(stack[index - 1].acc, entry.matrix);
          }
        }
      });
    }
  };

  /* Matrix API */

  const matrix = {
    push: (m) => {
      stack.push({ matrix: m, acc: null });
      options.matrix.push(m);
    },
    replace: (m) => {
      stack.push({ matrix: m, acc: m });
      options.matrix.replace(m);
    },
    pop: () => {
      stack.pop();
      options.matrix.pop();
    },
    get: () => {
      if (stack.length === 0) return Matrix.identity();

      syncStack();

      return last(stack).acc;
    },
  };

  const screen = {
    width:  () => options.width,
    height: () => options.height,
    inside:  ([x, y]) => Matrix.apply([x, y], matrix.get()),
    outside: ([x, y]) => Matrix.apply([x, y], matrix.get().reverse()),
  };

  const crop = {
    fits: (x, y) => {
      const [xreal, yreal] = screen.inside([x, y]);
      return crop.raw(xreal, yreal);
    },
    raw: (x, y) => {
      return x >= 0 && x < screen.width() && y >=0 && y < screen.height();
    },
  };

  return { matrix, screen, crop };
};
