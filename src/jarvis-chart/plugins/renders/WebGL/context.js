import Transform from 'lib/transform';
import { Matrix } from 'lib/geometry';

// 1.0,  1.0,
// -1.0,  1.0,
// 1.0, -1.0,
// -1.0, -1.0,
// if (gl) {
//   gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
//   gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
//   gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
//   gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // очистить буфер цвета и буфер глубины.
// }


export default (node, options) => {
  const width  = node.offsetWidth;
  const height = node.offsetHeight;

  options.width = width;
  options.height = height;

  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  node.appendChild(canvas);

  const context = canvas.getContext('webgl');

  /* TODO продолжать только если WebGL доступен и работает */
  context.viewport(0, 0, width, height);
  context.clearColor(1.0, 1.0, 1.0, 1.0);

  const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;

    void main() {
      gl_Position = uModelViewMatrix * aVertexPosition;
    }
  `;

  const fsSource = `
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  `;

  function loadShader(context, type, source) {
    const shader = context.createShader(type);
    context.shaderSource(shader, source);
    context.compileShader(shader);
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + context.getShaderInfoLog(shader));
      context.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function initShaderProgram(context, vsSource, fsSource) {
    const vertexShader = loadShader(context, context.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(context, context.FRAGMENT_SHADER, fsSource);
    const shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + context.getProgramInfoLog(shaderProgram));
      return null;
    }
    return shaderProgram;
  }

  const shaderProgram = initShaderProgram(context, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: context.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      modelViewMatrix: context.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const positionBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

  const numComponents = 2;  // pull out 2 values per iteration
  const type = context.FLOAT;    // the data in the buffer is 32bit floats
  const normalize = false;  // don't normalize
  const stride = 0;         // how many bytes to get from one set of values to the next
  const offset = 0;         // how many bytes inside the buffer to start from
                            // 0 = use type and numComponents above

  context.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  context.enableVertexAttribArray(
    programInfo.attribLocations.vertexPosition
  );

  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
  context.useProgram(programInfo.program);

  context.$clear = context.clear;

  context.clear = () => {
    context.$clear(context.COLOR_BUFFER_BIT);

    context.api.matrix.push(Matrix.translate(-1, 1));
    context.api.matrix.push(Matrix.scale(2, -2));
    context.api.matrix.push(Matrix.scale(1/options.width, 1/options.height));
  };

  context.flush = () => {
    context.api.matrix.pop();
    context.api.matrix.pop();
    context.api.matrix.pop();
  };

  /* Attach Transform API */

  context.api = Transform({
    reverse: true,
    matrix: {
      push: (matrix) => {
        const currentMatrix = context.api.matrix.get();

        const { a, b, c, d, tx, ty } = currentMatrix.getValues();

        context.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          [  a,  b, 0, 0,
             c,  d, 0, 0,
             0,  0, 1, 0,
            tx, ty, 0, 1 ]
        );
      },
      replace: (matrix) => {
        const currentMatrix = context.api.matrix.get();

        const { a, b, c, d, tx, ty } = currentMatrix.getValues();

        context.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          [  a,  b, 0, 0,
             c,  d, 0, 0,
             0,  0, 1, 0,
            tx, ty, 0, 1 ]
        );
      },
      pop: () => {
        const currentMatrix = context.api.matrix.get();

        const { a, b, c, d, tx, ty } = currentMatrix.getValues();

        context.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          [  a,  b, 0, 0,
             c,  d, 0, 0,
             0,  0, 1, 0,
            tx, ty, 0, 1 ]
        );
      },
    },
    width,
    height,
    screen: {
      clip: (x, y, width, height) => {
        // context.save();
        // context.beginPath();
        // context.rect(x, y, width, height);
        // context.clip();
      },
      reclip: () => {
        // context.restore();
      },
    },
  });

  context.type = 'webgl';

  return context;
};
