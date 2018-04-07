import React from 'react';

import Matrix from '../../../../matrix';
import MatrixTransformer from '../../providers/MatrixTransformer';

import { Text, Circle, Line, Group } from '../../elements';

const Timeline = ({ data, nth = 1 }) => {
  return (
    <MatrixTransformer transform={matrix => Matrix.join(Matrix.resetTranslate(matrix, false, true), matrix)}>
        <Line x0={0} y0={7.5} x1={2000} y1={7.5} color="#CCC" width={1} />
        {data.map(({ min, max, open, close }, index) => (
          index % nth === 0
            ? (
              <MatrixTransformer key={index} transform={Matrix.transformLeft(Matrix.translate(index * 10 + 3.5, 7.5))}>
                <MatrixTransformer transform={matrix => Matrix.multiply(Matrix.resetScale(matrix), matrix)}>
                  <Circle color="#15E6C1" radius={3} />
                  <MatrixTransformer transform={Matrix.transformLeft(Matrix.translate(0, 25))}>
                    <Text font="13px Open Sans" text="15:04" color="#ccc" textAlign="center" />
                  </MatrixTransformer>
                </MatrixTransformer>
              </MatrixTransformer>
            ) : null
        ))}
    </MatrixTransformer>
  );
};

export default Timeline;
