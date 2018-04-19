import { Matrix } from 'lib/geometry';

const circle = (context, { cx, cy, radius, color, matrix, opacity = 1, crop = true }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  // context.beginPath();
  // context.arc(cx, cy, radius, 0, 2 * Math.PI);
  // context.globalAlpha = opacity;
  // context.fillStyle = color;
  // context.fill();

  if (matrix) {
    context.api.matrix.pop();
  }
};

const ellipse = (context, { cx, cy, radiusx, radiusy, color, opacity = 1, matrix, crop = true }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  // context.beginPath();
  // context.ellipse(cx, cy, radiusx, radiusy, 0, 0, 2 * Math.PI);
  // context.globalAlpha = opacity;
  // context.fillStyle = color;
  // context.fill();

  if (matrix) {
    context.api.matrix.pop();
  }
};

/* */
const group = (context, { matrix }, cb) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  cb(matrix);

  if (matrix) {
    context.api.matrix.pop();
  }
};

const line = (context, { x0, y0, x1, y1, width, opacity = 1, color, matrix, dash = null }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  // context.beginPath();
  // context.moveTo(x0, y0);
  // context.lineTo(x1, y1);
  //
  // context.lineWidth = 1;
  // context.globalAlpha = opacity;
  // context.strokeStyle = color;
  //
  // dash && context.setLineDash(dash);
  //
  // /* Descale line */
  // context.api.matrix.replace(Matrix.identity());
  //
  // context.stroke();
  // context.api.matrix.pop();

  if (matrix) {
    context.api.matrix.pop();
  }
};

const polyline = (context, { points, width, opacity = 1, color, matrix }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  // context.beginPath();
  //
  // points.forEach((point, index) => {
  //   const { x, y } = point;
  //
  //   if (index === 0) {
  //     context.moveTo(x, y);
  //   } else {
  //     context.lineTo(x, y);
  //   }
  // });
  //
  // context.lineWidth = 1;
  // context.globalAlpha = opacity;
  // context.strokeStyle = color;
  //
  // /* Descale line */
  // context.api.matrix.replace(Matrix.identity());
  //
  // context.stroke();
  //
  // context.api.matrix.pop();

  if (matrix) {
    context.api.matrix.pop();
  }
};

const rectangle = (context, { x, y, width, height, opacity = 1, color, matrix }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  // context.beginPath();
  // context.rect(x, y, width, height);
  // context.globalAlpha = opacity;
  // context.fillStyle = color;
  // context.fill();

  if (matrix) {
    context.api.matrix.pop();
  }
};

const text = (context, { x, y, font = "13px arial", text, matrix, textAlign = 'center', color = 'black', opacity = 1, crop = true, drop = false }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  if (drop) {
    context.api.matrix.replace(Matrix.identity());

    console.warnOnce('Использование drop свойства текста и параметров x или y может привести к неправильному позиционированию')
  }

  // context.font = font;
  // context.textAlign = textAlign;
  // context.globalAlpha = opacity;
  // context.fillStyle = color;
  // context.fillText(text, x, y);

  if (drop) {
    context.api.matrix.pop();
  }

  if (matrix) {
    context.api.matrix.pop();
  }
};

export default { circle, ellipse, group, line, polyline, rectangle, text };
