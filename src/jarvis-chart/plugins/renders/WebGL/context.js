import Transform from 'lib/transform';

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
  context.clearColor(1.0, 0.0, 1.0, 1.0);
  // context.enable(context.COLOR_BUFFER_BIT);

  // Vertex shader program
  const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;

  function loadShader(context, type, source) {
    const shader = context.createShader(type);
    // Send the source to the shader object
    context.shaderSource(shader, source);
    // Compile the shader program
    context.compileShader(shader);
    // See if it compiled successfully
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
    // Create the shader program
    const shaderProgram = context.createProgram();
    context.attachShader(shaderProgram, vertexShader);
    context.attachShader(shaderProgram, fragmentShader);
    context.linkProgram(shaderProgram);
    // If creating the shader program failed, alert
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
      projectionMatrix: context.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: context.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const positionBuffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);

  const positions = [
     // 1.0,  1.0,
    // -1.0,  1.0,
     // 1.0, -1.0,
    // -1.0, -1.0,
    0.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
context.clear(context.COLOR_BUFFER_BIT);

  context.bufferData(context.ARRAY_BUFFER,
                new Float32Array(positions),
                context.STATIC_DRAW);

  const numComponents = 2;  // pull out 2 values per iteration
  const type = context.FLOAT;    // the data in the buffer is 32bit floats
  const normalize = false;  // don't normalize
  const stride = 0;         // how many bytes to get from one set of values to the next
                            // 0 = use type and numComponents above
  const offset = 0;         // how many bytes inside the buffer to start from
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer);
  context.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
  context.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);

  context.useProgram(programInfo.program);

  context.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    // [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  context.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  {
    const offset = 0;
    const vertexCount = 4;
    context.drawArrays(context.TRIANGLE_STRIP, offset, vertexCount);
  }

  // if (gl) {
  //   gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
  //   gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
  //   gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
  //   gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // очистить буфер цвета и буфер глубины.
  // }
  context.$clear = context.clear;

  context.clear = () => {
    // context.$clear(context.COLOR_BUFFER_BIT);
  };

  context.flush = () => { /* nope */ };

  /* Attach Transform API */

  context.api = Transform({
    matrix: {
      push: (matrix) => {
        // const { a, b, c, d, tx, ty } = matrix.getValues();
        //
        // context.save();
        // context.transform(a, b, c, d, tx, ty);
      },
      replace: (matrix) => {
        // const { a, b, c, d, tx, ty } = matrix.getValues();
        //
        // context.save();
        // context.setTransform(a, b, c, d, tx, ty);
      },
      pop: () => {
        // context.restore();
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
