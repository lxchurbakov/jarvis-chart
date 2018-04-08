import React from 'react';

import Matrix from '../../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import { Text, Circle, Line, Group } from '../../elements';

const Timeline = ({ data, nth = 1 }) => {
  return (
    <MatrixTransformer transform={matrix => Matrix.join(Matrix.resetScale(matrix, false, true), matrix)}>
      <MatrixTransformer transform={matrix => Matrix.join(Matrix.resetTranslate(matrix, false, true), matrix)}>
        <MatrixTransformer transform={Matrix.transformLeft(Matrix.translate(0, 450))}>
          <Line x0={0} y0={0} x1={2000} y1={0} color="#CCC" width={1} />

          {data.map(({ min, max, open, close }, index) => (
            index % nth === 0
              ? (
                <MatrixTransformer key={index} transform={Matrix.transformLeft(Matrix.translate(index * 10 + 3.5, 0))}>
                  <MatrixTransformer transform={matrix => Matrix.multiply(Matrix.resetScale(matrix), matrix)}>
                    <Circle cx={0} cy={0} color="#15E6C1" radius={3} />
                    <Text x={0} y={20} font="normal 100 13px Open Sans" text="15:04" color="#ccc" textAlign="center" />
                  </MatrixTransformer>
                </MatrixTransformer>
              ) : null
          ))}
        </MatrixTransformer>
      </MatrixTransformer>
    </MatrixTransformer>
  );
};

/*
<MatrixTransformer transform={Matrix.transformLeft(Matrix.translate(0, 25))}>
</MatrixTransformer>



*/

export default Timeline;
