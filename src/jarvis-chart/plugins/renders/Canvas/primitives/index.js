import Matrix from 'lib/matrix';

const circle = (context, { cx, cy, radius, color, matrix, opacity = 1, crop = true }) => {
  /* Auto Crop Element when invisible */
  /* TODO does not work, screen coords are not calculated correctly */
  // if (
  //   crop &&
  //   !context.matrix.crop(cx - radius, cy - radius) &&
  //   !context.matrix.crop(cx + radius, cy + radius)
  // ) return;

  if (matrix) {
    context.api.matrix.push(matrix);
  }

  context.beginPath();
  context.arc(cx, cy, radius, 0, 2 * Math.PI);
  context.globalAlpha = opacity;
  context.fillStyle = color;
  context.fill();

  if (matrix) {
    context.api.matrix.pop();
  }
};


const ellipse = (context, { cx, cy, radiusx, radiusy, color, opacity = 1, matrix, crop = true }) => {
  /* Auto Crop Element when invisible */
  /* TODO does not work, screen coords are not calculated correctly */
  // if (
  //   crop &&
  //   !context.matrix.crop(cx - radius, cy - radius) &&
  //   !context.matrix.crop(cx + radius, cy + radius)
  // ) return;

  if (matrix) {
    context.api.matrix.push(matrix);
  }

  context.beginPath();
  context.ellipse(cx, cy, radiusx, radiusy, 0, 0, 2 * Math.PI);
  context.api.draw.globalAlpha.set(opacity);
  context.api.draw.fillStyle.set(color);
  // context.globalAlpha = opacity;
  // context.fillStyle = color;
  context.fill();

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

const line = (context, { x0, y0, x1, y1, width, opacity = 1, color, matrix }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);

  context.lineWidth = width === 1 ? 0.6 : width;
  context.globalAlpha = opacity;
  context.strokeStyle = color;

  /* Descale line */
  context.api.matrix.replace(Matrix.identity());
  context.stroke();
  context.api.matrix.pop();

  if (matrix) {
    context.api.matrix.pop();
  }
};

const polyline = (context, { points, width, opacity = 1, color, matrix }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  context.beginPath();

  points.forEach((point, index) => {
    const { x, y } = point;

    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });

  context.lineWidth = width === 1 ? 0.6 : width;
  context.globalAlpha = opacity;
  context.strokeStyle = color;

  /* Descale line */
  context.api.matrix.replace(Matrix.identity());

  context.stroke();

  context.api.matrix.pop();

  if (matrix) {
    context.api.matrix.pop();
  }
};

const rectangle = (context, { x, y, width, height, opacity = 1, color, matrix }) => {
  if (matrix) {
    context.api.matrix.push(matrix);
  }

  context.beginPath();
  context.rect(x, y, width, height);
  context.globalAlpha = opacity;
  context.fillStyle = color;
  context.fill();

  if (matrix) {
    context.api.matrix.pop();
  }
};

const text = (context, { x, y, font = "13px arial", text, matrix, textAlign = 'center', color = 'black', opacity = 1, crop = true }) => {
  // if (
  //   crop &&
  //   !context.matrix.crop(x, y)
  // ) return;

  if (matrix) {
    context.api.matrix.push(matrix);
  }

  context.font = font;
  context.textAlign = textAlign;
  context.globalAlpha = opacity;
  context.fillStyle = color;
  context.fillText(text, x, y);

  if (matrix) {
    context.api.matrix.pop();
  }
};

export default { circle, ellipse, group, line, polyline, rectangle, text };
