const circle = (context, { cx, cy, radius, color, matrix, opacity = 1, crop = true }) => {
  /* Auto Crop Element when invisible */
  /* TODO does not work, screen coords are not calculated correctly */
  // if (
  //   crop &&
  //   !context.matrix.crop(cx - radius, cy - radius) &&
  //   !context.matrix.crop(cx + radius, cy + radius)
  // ) return;

  if (matrix) {
    context.matrix.push(matrix);
  }

  context.beginPath();
  context.arc(cx, cy, radius, 0, 2 * Math.PI);
  context.globalAlpha = opacity;
  context.fillStyle = color;
  context.fill();

  if (matrix) {
    context.matrix.push(matrix);
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
    context.matrix.push(matrix);
  }

  context.beginPath();
  context.ellipse(cx, cy, radiusx, radiusy, 0, 0, 2 * Math.PI);
  context.globalAlpha = opacity;
  context.fillStyle = color;
  context.fill();

  if (matrix) {
    context.matrix.push(matrix);
  }
};

/* */
const group = (context, { matrix }, cb) => {
  if (matrix) {
    context.matrix.push(matrix);
  }

  cb(matrix);

  if (matrix) {
    context.matrix.pop();
  }
};

const line = (context, { x0, y0, x1, y1, width, opacity = 1, color, matrix }) => {
  if (matrix) {
    const { a, b, c, d, tx, ty } = matrix.getValues();
    context.save();
    context.transform(a, b, c, d, tx, ty);
  }

  context.beginPath();
  context.moveTo(x0, y0);
  context.lineTo(x1, y1);
  context.lineWidth = width === 1 ? 0.6 : width;
  context.globalAlpha = opacity;
  context.strokeStyle = color;

  /* Descale line */
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);

  context.stroke();

  context.restore();

  if (matrix) {
    context.restore();
  }
};

const polyline = (context, { points, width, opacity = 1, color, matrix }) => {
  if (matrix) {
    const { a, b, c, d, tx, ty } = matrix.getValues();
    context.save();
    context.transform(a, b, c, d, tx, ty);
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
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);

  context.stroke();

  context.restore();

  if (matrix) {
    context.restore();
  }
};

const rectangle = (context, { x, y, width, height, opacity = 1, color, matrix }) => {
  if (matrix) {
    const { a, b, c, d, tx, ty } = matrix.getValues();
    context.save();
    context.transform(a, b, c, d, tx, ty);
  }

  context.beginPath();
  context.rect(x, y, width, height);
  context.globalAlpha = opacity;
  context.fillStyle = color;
  context.fill();

  if (matrix) {
    context.restore();
  }
};

const text = (context, { x, y, font = "13px arial", text, matrix, textAlign = 'center', color = 'black', opacity = 1, crop = true }) => {
  // if (
  //   crop &&
  //   !context.matrix.crop(x, y)
  // ) return;

  if (matrix) {
    const { a, b, c, d, tx, ty } = matrix.getValues();
    context.save();
    context.transform(a, b, c, d, tx, ty);
  }

  context.font = font;
  context.textAlign = textAlign;
  context.globalAlpha = opacity;
  context.fillStyle = color;
  context.fillText(text, x, y);

  if (matrix) {
    context.restore();
  }
};

export default { circle, ellipse, group, line, polyline, rectangle, text };
