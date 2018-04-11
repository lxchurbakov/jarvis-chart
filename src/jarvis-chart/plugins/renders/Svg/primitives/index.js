const circle = (context, { cx, cy, radius, color, matrix, opacity = 1, crop = true }) => {
  /* Auto Crop Element when invisible */
  /* TODO does not work, screen coords are not calculated correctly */
  // if (
  //   crop &&
  //   !context.matrix.crop(cx - radius, cy - radius) &&
  //   !context.matrix.crop(cx + radius, cy + radius)
  // ) return;
  context.push(`
    <circle cx='${cx}' cy='${cy}' r='${radius}' fill='${color}' transform='${matrix ? matrix.toCss() : ''}' fill-opacity='${opacity}' />
  `);
};

const ellipse = (context, { cx, cy, radiusx, radiusy, color, opacity = 1, matrix, crop = true }) => {
  /* Auto Crop Element when invisible */
  /* TODO does not work, screen coords are not calculated correctly */
  // if (
  //   crop &&
  //   !context.matrix.crop(cx - radius, cy - radius) &&
  //   !context.matrix.crop(cx + radius, cy + radius)
  // ) return;
  context.push(`
    <ellipse cx='${cx}' cy='${cy}' rx='${radiusx}' ry='${radiusy}' fill='${color}' transform='${matrix ? matrix.toCss() : ''}' fill-opaicty='${opacity}'/>
  `);
};

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
  context.push(`
    <line x1='${x0}' y1='${y0}' x2='${x1}' y2='${y1}' style='stroke: ${color}; strokeWidth: ${width}' transform='${matrix ? matrix.toCss() : ''}' stroke-opacity='${opacity}' />
  `);
};


const rectangle = (context, { x, y, width, height, opacity = 1, color, matrix }) => {
  context.push(`
    <rect x='${x}' y='${y}' width='${width}' height='${height}' style='fill: ${color}' transform='${matrix ? matrix.toCss() : ''}' fill-opacity='${opacity}' />
  `);
};


const textAlignToTextAnchor = (textAlign) => ({ 'left': 'start', 'center': 'middle', 'right': 'end' })[textAlign];

const text = (context, { x, y, font = "13px arial", text, matrix, textAlign = 'center', color = 'black', opacity = 1, crop = true }) => {
  // if (
  //   crop &&
  //   !context.matrix.crop(x, y)
  // ) return;
  context.push(`
    <text x='${x}' y='${y}' text-anchor='${textAlignToTextAnchor(textAlign)}' fill='${color}' style='font: ${font}' transform='${matrix ? matrix.toCss() : ''}' fill-opacity='${opacity}' >
      ${text}
    </text>
  `);
};

export default { circle, ellipse, group, line, rectangle, text };
